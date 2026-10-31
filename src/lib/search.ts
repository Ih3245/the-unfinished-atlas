import {
  PLACES,
  ARTIFACTS,
  EVENTS,
  PEOPLE,
  PERIODS,
  SOURCES,
  ARTIFACT_TYPE_LABELS,
  CATEGORY_LABELS,
} from '@/data';
import type { SearchEntityType } from '@/types/atlas';
import { normalizeText } from './filters';

export interface SearchResultItem {
  id: string;
  entityType: SearchEntityType;
  entityBadge: string;
  catalogueRef: string;
  title: string;
  subtitle: string;
  snippet: string;
  href: string;
  score: number;
}

export interface HighlightSegment {
  text: string;
  highlighted: boolean;
}

function extractContextualSnippet(
  corpus: string,
  rawQuery: string,
  fallback: string,
  maxLength = 165
): string {
  const cleanQuery = rawQuery.trim();
  if (!cleanQuery) return fallback.slice(0, maxLength);

  const lowerCorpus = corpus.toLowerCase();
  const tokens = cleanQuery.toLowerCase().split(/\s+/).filter(Boolean);
  let matchIndex = lowerCorpus.indexOf(cleanQuery.toLowerCase());
  if (matchIndex === -1 && tokens[0]) {
    matchIndex = lowerCorpus.indexOf(tokens[0]);
  }

  if (matchIndex === -1) {
    return fallback.length > maxLength
      ? `${fallback.slice(0, maxLength - 1)}…`
      : fallback;
  }

  const start = Math.max(0, matchIndex - 52);
  const end = Math.min(corpus.length, matchIndex + maxLength - 40);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < corpus.length ? '…' : '';
  return `${prefix}${corpus.slice(start, end).trim()}${suffix}`;
}

export function highlightSnippetSegments(
  text: string,
  query: string
): HighlightSegment[] {
  const trimmed = query.trim();
  if (!trimmed) return [{ text, highlighted: false }];

  const escapedTokens = trimmed
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escapedTokens.length === 0) {
    return [{ text, highlighted: false }];
  }

  const pattern = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
  const parts = text.split(pattern);
  const tokenLowers = new Set(
    trimmed
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length >= 2)
  );

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      highlighted: tokenLowers.has(part.toLowerCase()),
    }));
}

export function searchAllEntities(
  rawQuery: string,
  filterType: SearchEntityType | 'all' = 'all'
): SearchResultItem[] {
  const normQuery = normalizeText(rawQuery);
  if (!normQuery) return [];

  const tokens = normQuery.split(' ').filter(Boolean);
  const results: SearchResultItem[] = [];

  const computeScore = (
    title: string,
    ref: string,
    subtitle: string,
    body: string
  ): number => {
    const nTitle = normalizeText(title);
    const nRef = normalizeText(ref);
    const nSub = normalizeText(subtitle);
    const nBody = normalizeText(body);
    const full = `${nTitle} ${nRef} ${nSub} ${nBody}`;

    if (!tokens.every((t) => full.includes(t))) {
      return 0;
    }

    let score = 10;
    if (nRef === normQuery) score += 100;
    else if (nRef.includes(normQuery)) score += 60;
    if (nTitle.includes(normQuery)) score += 50;
    for (const tok of tokens) {
      if (nTitle.includes(tok)) score += 18;
      if (nSub.includes(tok)) score += 10;
    }
    return score;
  };

  if (filterType === 'all' || filterType === 'place') {
    for (const place of PLACES) {
      const body = [
        place.formerName ?? '',
        place.excerpt,
        place.editorialIntro,
        ...place.subjects,
        ...place.claims.map((c) => c.statement),
      ].join(' · ');
      const score = computeScore(
        place.name,
        place.catalogueRef,
        `${place.region} ${CATEGORY_LABELS[place.category]}`,
        body
      );
      if (score > 0) {
        results.push({
          id: place.id,
          entityType: 'place',
          entityBadge: 'Place Investigation',
          catalogueRef: place.catalogueRef,
          title: place.name,
          subtitle: `${place.region} · ${place.activeSpan.eraSummary}`,
          snippet: extractContextualSnippet(body, rawQuery, place.excerpt),
          href: `/places/${place.slug}`,
          score,
        });
      }
    }
  }

  if (filterType === 'all' || filterType === 'artifact') {
    for (const art of ARTIFACTS) {
      const body = [
        art.summary,
        art.excerptOrTranscription ?? '',
        art.provenance,
        art.medium,
        ...art.subjects,
      ].join(' · ');
      const subtitle = `${ARTIFACT_TYPE_LABELS[art.type]} · ${art.dateDisplay} · ${art.creator}`;
      const score = computeScore(art.title, art.catalogueRef, subtitle, body);
      if (score > 0) {
        results.push({
          id: art.id,
          entityType: 'artifact',
          entityBadge: ARTIFACT_TYPE_LABELS[art.type],
          catalogueRef: art.catalogueRef,
          title: art.title,
          subtitle,
          snippet: extractContextualSnippet(body, rawQuery, art.summary),
          href: `/artifacts/${art.id}`,
          score,
        });
      }
    }
  }

  if (filterType === 'all' || filterType === 'event') {
    for (const evt of EVENTS) {
      const body = `${evt.summary} · ${evt.consequence}`;
      const score = computeScore(evt.title, evt.catalogueRef, evt.dateDisplay, body);
      if (score > 0) {
        const primaryPlace = PLACES.find((p) => p.id === evt.placeIds[0]);
        results.push({
          id: evt.id,
          entityType: 'event',
          entityBadge: 'Historical Event',
          catalogueRef: evt.catalogueRef,
          title: evt.title,
          subtitle: `${evt.dateDisplay}${primaryPlace ? ` · ${primaryPlace.name}` : ''}`,
          snippet: extractContextualSnippet(body, rawQuery, evt.summary),
          href: primaryPlace
            ? `/places/${primaryPlace.slug}#chronology`
            : `/observatory?node=${evt.id}`,
          score,
        });
      }
    }
  }

  if (filterType === 'all' || filterType === 'person') {
    for (const per of PEOPLE) {
      const body = `${per.biography} · ${per.epistemicNote} · ${per.affiliation}`;
      const subtitle = `${per.role} (${per.lifespanDisplay})`;
      const score = computeScore(per.name, per.catalogueRef, subtitle, body);
      if (score > 0) {
        const linkedPlace = PLACES.find((p) => p.id === per.placeIds[0]);
        results.push({
          id: per.id,
          entityType: 'person',
          entityBadge: 'Archival Figure',
          catalogueRef: per.catalogueRef,
          title: per.name,
          subtitle,
          snippet: extractContextualSnippet(body, rawQuery, per.biography),
          href: `/observatory?node=${per.id}${linkedPlace ? `&from=${linkedPlace.slug}` : ''}`,
          score,
        });
      }
    }
  }

  if (filterType === 'all' || filterType === 'period') {
    for (const era of PERIODS) {
      const body = `${era.characterization} · ${era.cartographicNote}`;
      const score = computeScore(era.name, era.catalogueRef, era.spanLabel, body);
      if (score > 0) {
        results.push({
          id: era.id,
          entityType: 'period',
          entityBadge: 'Historical Period',
          catalogueRef: era.catalogueRef,
          title: `${era.name} (${era.spanLabel})`,
          subtitle: `Canonical Atlas Stratum · ${era.spanLabel}`,
          snippet: extractContextualSnippet(body, rawQuery, era.characterization),
          href: `/explore?era=${era.id}`,
          score,
        });
      }
    }
  }

  if (filterType === 'all' || filterType === 'source') {
    for (const src of SOURCES) {
      const body = `${src.repository} · ${src.fondsCode} · ${src.completenessNote}`;
      const subtitle = `${src.fondsCode} · ${src.yearDisplay}`;
      const score = computeScore(src.title, src.catalogueRef, subtitle, body);
      if (score > 0) {
        const citingPlace = PLACES.find((p) => p.sourceIds.includes(src.id));
        results.push({
          id: src.id,
          entityType: 'source',
          entityBadge: 'Source Fonds',
          catalogueRef: src.catalogueRef,
          title: src.title,
          subtitle,
          snippet: extractContextualSnippet(body, rawQuery, src.completenessNote),
          href: citingPlace
            ? `/places/${citingPlace.slug}#sources`
            : `/artifacts`,
          score,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
