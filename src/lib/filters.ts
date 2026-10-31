import type {
  Place,
  Artifact,
  AtlasRegion,
  TransformationCategory,
  HistoricalEraId,
  ArtifactType,
  CertaintyLevel,
} from '@/types/atlas';

export type PlaceSortCriterion =
  | 'turning-point-asc'
  | 'turning-point-desc'
  | 'name-asc'
  | 'evidence-desc';

export interface PlaceFilterOptions {
  query?: string;
  region?: AtlasRegion | 'all';
  category?: TransformationCategory | 'all';
  eraId?: HistoricalEraId | 'all';
  sort?: PlaceSortCriterion;
}

export type ArtifactSortCriterion =
  | 'date-asc'
  | 'date-desc'
  | 'title-asc'
  | 'catalogue-asc';

export interface ArtifactFilterOptions {
  query?: string;
  types?: ArtifactType[];
  placeIds?: string[];
  eraIds?: HistoricalEraId[];
  certainties?: CertaintyLevel[];
  sort?: ArtifactSortCriterion;
}

export function normalizeText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function filterAndSortPlaces(
  places: Place[],
  options: PlaceFilterOptions
): Place[] {
  const normalizedQuery = options.query ? normalizeText(options.query) : '';
  const tokens = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : [];

  const filtered = places.filter((place) => {
    if (options.region && options.region !== 'all' && place.region !== options.region) {
      return false;
    }
    if (
      options.category &&
      options.category !== 'all' &&
      place.category !== options.category
    ) {
      return false;
    }
    if (options.eraId && options.eraId !== 'all') {
      const matchesEra = place.periods.some((p) => p.eraId === options.eraId);
      if (!matchesEra) return false;
    }

    if (tokens.length > 0) {
      const searchableBlob = normalizeText(
        [
          place.name,
          place.formerName ?? '',
          place.catalogueRef,
          place.subtitle,
          place.excerpt,
          place.region,
          place.currentStatusLabel,
          place.activeSpan.eraSummary,
          String(place.activeSpan.startYear),
          String(place.activeSpan.turningPointYear),
          ...place.subjects,
          ...place.claims.map((c) => c.statement),
          ...place.narrativeSections.flatMap((s) => [s.heading, ...s.body]),
          ...place.periods.map(
            (p) =>
              `${p.yearLabel} ${p.title} ${p.summary} ${p.keyChangesFromPrior.join(' ')}`
          ),
        ].join(' ')
      );
      return tokens.every((tok) => searchableBlob.includes(tok));
    }

    return true;
  });

  const sort = options.sort ?? 'turning-point-asc';

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case 'turning-point-asc':
        return a.activeSpan.turningPointYear - b.activeSpan.turningPointYear;
      case 'turning-point-desc':
        return b.activeSpan.turningPointYear - a.activeSpan.turningPointYear;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'evidence-desc': {
        const scoreA = a.artifactIds.length + a.claims.length + a.eventIds.length;
        const scoreB = b.artifactIds.length + b.claims.length + b.eventIds.length;
        return scoreB - scoreA || a.name.localeCompare(b.name);
      }
    }
  });
}

export function filterAndSortArtifacts(
  artifacts: Artifact[],
  options: ArtifactFilterOptions
): Artifact[] {
  const normalizedQuery = options.query ? normalizeText(options.query) : '';
  const tokens = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : [];

  const filtered = artifacts.filter((artifact) => {
    if (options.types && options.types.length > 0) {
      if (!options.types.includes(artifact.type)) return false;
    }

    if (options.placeIds && options.placeIds.length > 0) {
      const matchesPrimary = options.placeIds.includes(artifact.placeId);
      const matchesRelated = artifact.relatedPlaceIds.some((id) =>
        options.placeIds!.includes(id)
      );
      if (!matchesPrimary && !matchesRelated) return false;
    }

    if (options.eraIds && options.eraIds.length > 0) {
      if (!options.eraIds.includes(artifact.eraId)) return false;
    }

    if (options.certainties && options.certainties.length > 0) {
      const matchesDateCert = options.certainties.includes(artifact.dateCertainty);
      const matchesAttrCert = options.certainties.includes(
        artifact.attributionCertainty
      );
      if (!matchesDateCert && !matchesAttrCert) return false;
    }

    if (tokens.length > 0) {
      const searchableBlob = normalizeText(
        [
          artifact.title,
          artifact.catalogueRef,
          artifact.creator,
          artifact.dateDisplay,
          artifact.medium,
          artifact.summary,
          artifact.excerptOrTranscription ?? '',
          artifact.provenance,
          ...artifact.subjects,
        ].join(' ')
      );
      return tokens.every((tok) => searchableBlob.includes(tok));
    }

    return true;
  });

  const sort = options.sort ?? 'catalogue-asc';

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case 'date-asc': {
        if (a.yearSort === null && b.yearSort === null) {
          return a.catalogueRef.localeCompare(b.catalogueRef);
        }
        if (a.yearSort === null) return 1;
        if (b.yearSort === null) return -1;
        return a.yearSort - b.yearSort || a.catalogueRef.localeCompare(b.catalogueRef);
      }
      case 'date-desc': {
        if (a.yearSort === null && b.yearSort === null) {
          return a.catalogueRef.localeCompare(b.catalogueRef);
        }
        if (a.yearSort === null) return 1;
        if (b.yearSort === null) return -1;
        return b.yearSort - a.yearSort || a.catalogueRef.localeCompare(b.catalogueRef);
      }
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'catalogue-asc':
        return a.catalogueRef.localeCompare(b.catalogueRef);
    }
  });
}
