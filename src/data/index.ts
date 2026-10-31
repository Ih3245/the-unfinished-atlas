import {
  HISTORICAL_PERIODS,
  ARCHIVAL_SOURCES,
  ARCHIVAL_PEOPLE,
  HISTORICAL_EVENTS,
} from './periods-and-sources';
import { PLACES_PART_1 } from './places-part1';
import { PLACES_PART_2 } from './places-part2';
import { ARCHIVAL_ARTIFACTS } from './artifacts';
import { ARCHIVAL_RELATIONSHIPS } from './relationships';
import type {
  Place,
  Artifact,
  HistoricalEvent,
  Person,
  HistoricalPeriod,
  Source,
  TransformationCategory,
  ArtifactType,
  EpistemicStatus,
  CertaintyLevel,
} from '@/types/atlas';

export const PLACES: Place[] = [...PLACES_PART_1, ...PLACES_PART_2];
export const ARTIFACTS: Artifact[] = ARCHIVAL_ARTIFACTS;
export const EVENTS: HistoricalEvent[] = HISTORICAL_EVENTS;
export const PEOPLE: Person[] = ARCHIVAL_PEOPLE;
export const PERIODS: HistoricalPeriod[] = HISTORICAL_PERIODS;
export const SOURCES: Source[] = ARCHIVAL_SOURCES;
export const RELATIONSHIPS = ARCHIVAL_RELATIONSHIPS;

export const CATEGORY_LABELS: Record<TransformationCategory, string> = {
  'submerged-landscape': 'Submerged Landscape',
  'demolished-civic': 'Demolished Civic & Urban Fabric',
  'altered-coastline': 'Altered Coastline',
  'abandoned-settlement': 'Abandoned Settlement',
  'buried-infrastructure': 'Buried & Obsolete Infrastructure',
  'reclaimed-marsh': 'Drained & Subsided Wetland',
};

export const ARTIFACT_TYPE_LABELS: Record<ArtifactType, string> = {
  map: 'Cartographic Survey',
  photograph: 'Photographic Plate',
  letter: 'Correspondence & Slip',
  'architectural-drawing': 'Architectural Drawing',
  'newspaper-excerpt': 'Periodical Excerpt',
  'survey-record': 'Field & Valuation Ledger',
  'oral-history': 'Oral-History Transcript',
};

export const EPISTEMIC_LABELS: Record<
  EpistemicStatus,
  { label: string; shortNote: string }
> = {
  verified: {
    label: 'Verified Record',
    shortNote: 'Corroborated across independent physical or documentary evidence',
  },
  interpreted: {
    label: 'Scholarly Interpretation',
    shortNote: 'Inferred from partial records, marginalia, or spatial correlation',
  },
  unresolved: {
    label: 'Unresolved Question',
    shortNote: 'Contradictory accounts, missing folios, or unexcavated ground',
  },
};

export const CERTAINTY_LABELS: Record<CertaintyLevel, string> = {
  documented: 'Documented',
  approximate: 'Approximate (c.)',
  contested: 'Contested',
  unattributed: 'Unattributed / Missing',
};

export function getPlaceBySlug(slug: string): Place | undefined {
  return PLACES.find((p) => p.slug === slug);
}

export function getPlaceById(id: string): Place | undefined {
  return PLACES.find((p) => p.id === id);
}

export function getArtifactById(id: string): Artifact | undefined {
  return ARTIFACTS.find((a) => a.id === id);
}

export function getEventById(id: string): HistoricalEvent | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getPersonById(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

export function getPeriodById(id: string): HistoricalPeriod | undefined {
  return PERIODS.find((p) => p.id === id);
}

export function getSourceById(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id);
}

export function getAtlasSummaryCounts() {
  const totalPeriodSnapshots = PLACES.reduce(
    (acc, place) => acc + place.periods.length,
    0
  );
  const unresolvedCount = PLACES.reduce(
    (acc, place) =>
      acc + place.claims.filter((c) => c.status === 'unresolved').length,
    0
  );
  return {
    places: PLACES.length,
    artifacts: ARTIFACTS.length,
    eras: PERIODS.length,
    periodSnapshots: totalPeriodSnapshots,
    events: EVENTS.length,
    people: PEOPLE.length,
    sources: SOURCES.length,
    relationships: RELATIONSHIPS.length,
    unresolvedQuestions: unresolvedCount,
  };
}
