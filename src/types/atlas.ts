export type EpistemicStatus = 'verified' | 'interpreted' | 'unresolved';

export type CertaintyLevel =
  | 'documented'
  | 'approximate'
  | 'contested'
  | 'unattributed';

export type TransformationCategory =
  | 'submerged-landscape'
  | 'demolished-civic'
  | 'altered-coastline'
  | 'abandoned-settlement'
  | 'buried-infrastructure'
  | 'reclaimed-marsh';

export type AtlasRegion =
  | 'Highland Reservoir Basin'
  | 'Northern Silted Estuary'
  | 'Metropolitan Transit Core'
  | 'Salt Flat Littoral'
  | 'Canal & Foundry Ward'
  | 'Observatory Ridge';

export type HistoricalEraId =
  | 'pre-industrial'
  | 'survey-expansion'
  | 'municipal-modernism'
  | 'decommissioning'
  | 'contemporary-trace';

export type PlaceLayoutVariant =
  | 'dossier-monograph'
  | 'hydrographic-folio'
  | 'architectural-inquest'
  | 'field-expedition';

export type ArtifactType =
  | 'map'
  | 'photograph'
  | 'letter'
  | 'architectural-drawing'
  | 'newspaper-excerpt'
  | 'survey-record'
  | 'oral-history';

export type GraphEntityType = 'place' | 'artifact' | 'event' | 'person';

export type SearchEntityType =
  | 'place'
  | 'artifact'
  | 'event'
  | 'person'
  | 'period'
  | 'source';

export interface VectorStructure {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: 'civic' | 'residential' | 'industrial' | 'ruin' | 'submerged' | 'infrastructure';
  certainty: CertaintyLevel;
}

export interface VectorPathLayer {
  id: string;
  label: string;
  d: string;
  kind: 'river' | 'coastline' | 'rail' | 'canal' | 'road' | 'dam' | 'contour';
  dashed?: boolean;
}

export interface VectorAnnotation {
  id: string;
  x: number;
  y: number;
  label: string;
  code: string;
}

export interface LandUseMetric {
  category: string;
  percentage: number;
  certainty: CertaintyLevel;
}

export interface VectorSceneSpec {
  waterLevelRatio: number; // 0 to 1, controls water fill polygon/elevation
  waterPolygon: string;
  terrainContours: string[];
  paths: VectorPathLayer[];
  structures: VectorStructure[];
  annotations: VectorAnnotation[];
  landUse: LandUseMetric[];
  reconstructionBasis: string;
}

export interface HistoricalPeriodState {
  id: string;
  eraId: HistoricalEraId;
  yearLabel: string;
  yearStart: number;
  yearEnd: number;
  title: string;
  summary: string;
  settlementScale: string;
  builtFabric: string;
  infrastructureState: string;
  landscapeCondition: string;
  epistemicStatus: EpistemicStatus;
  certaintyNote: string;
  keyChangesFromPrior: string[];
  scene: VectorSceneSpec;
}

export interface EpistemicClaim {
  id: string;
  status: EpistemicStatus;
  statement: string;
  evidenceNote: string;
  sourceIds: string[];
}

export interface HistoricalPeriod {
  id: HistoricalEraId;
  catalogueRef: string;
  name: string;
  spanLabel: string;
  startYear: number;
  endYear: number;
  characterization: string;
  cartographicNote: string;
}

export interface Place {
  id: string;
  slug: string;
  catalogueRef: string;
  name: string;
  formerName?: string;
  subtitle: string;
  layoutVariant: PlaceLayoutVariant;
  category: TransformationCategory;
  region: AtlasRegion;
  atlasPosition: {
    x: number; // 0 - 1000 SVG coordinate space
    y: number; // 0 - 620 SVG coordinate space
    elevationMeters: number;
    gridSector: string;
  };
  coordinateDisclaimer: string;
  activeSpan: {
    startYear: number;
    turningPointYear: number;
    eraSummary: string;
  };
  currentStatusLabel: string;
  excerpt: string;
  editorialIntro: string;
  narrativeSections: {
    heading: string;
    body: string[];
  }[];
  physicalTransformation: {
    originalMorphology: string;
    agentOfChange: string;
    presentTrace: string;
    survivingMarkers: string[];
  };
  periods: HistoricalPeriodState[];
  claims: EpistemicClaim[];
  artifactIds: string[];
  eventIds: string[];
  personIds: string[];
  relatedPlaceIds: string[];
  sourceIds: string[];
  subjects: string[];
  isFeaturedOnHome?: boolean;
  isEditorialEssaySubject?: boolean;
}

export interface ArtifactVisualSpec {
  plateStyle:
    | 'topographic-sheet'
    | 'orthographic-blueprint'
    | 'silver-gelatin-plate'
    | 'epistolary-leaf'
    | 'newsprint-clipping'
    | 'cadastral-ledger'
    | 'phonograph-transcript';
  gridLines?: number;
  compassAngle?: number;
  accentTone: 'ink' | 'terracotta' | 'olive' | 'slate';
  figurePaths?: string[];
  calloutLabels?: { x: number; y: number; text: string }[];
  ledgerRows?: { col1: string; col2: string; col3: string }[];
}

export interface Artifact {
  id: string;
  catalogueRef: string;
  title: string;
  type: ArtifactType;
  dateDisplay: string;
  yearSort: number | null; // null when date is missing/undated
  dateCertainty: CertaintyLevel;
  dateNote?: string;
  creator: string;
  attributionCertainty: CertaintyLevel;
  placeId: string;
  relatedPlaceIds: string[];
  eraId: HistoricalEraId;
  physicalSpecs: string;
  medium: string;
  summary: string;
  excerptOrTranscription?: string;
  archivalCommentary: string;
  provenance: string;
  accessionNote: string;
  sourceId: string;
  rightsStatement: string;
  visualSpec: ArtifactVisualSpec;
  subjects: string[];
}

export interface HistoricalEvent {
  id: string;
  catalogueRef: string;
  title: string;
  year: number;
  dateDisplay: string;
  dateCertainty: CertaintyLevel;
  eraId: HistoricalEraId;
  summary: string;
  consequence: string;
  epistemicStatus: EpistemicStatus;
  placeIds: string[];
  artifactIds: string[];
  personIds: string[];
  sourceIds: string[];
}

export interface Person {
  id: string;
  catalogueRef: string;
  name: string;
  lifespanDisplay: string;
  role: string;
  affiliation: string;
  biography: string;
  epistemicNote: string;
  placeIds: string[];
  artifactIds: string[];
  eventIds: string[];
}

export interface Source {
  id: string;
  catalogueRef: string;
  title: string;
  repository: string;
  fondsCode: string;
  yearDisplay: string;
  sourceKind:
    | 'cartographic-survey'
    | 'municipal-commission'
    | 'oral-history-deposit'
    | 'periodical-microfilm'
    | 'personal-papers';
  completenessNote: string;
  rightsAndProvenance: string;
  isFictionalDemonstrationSource: true;
}

export interface Relationship {
  id: string;
  fromId: string;
  fromType: GraphEntityType;
  toId: string;
  toType: GraphEntityType;
  label: string;
  detail: string;
  certainty: CertaintyLevel;
  weight: 1 | 2 | 3;
}

export interface ResearchBoardItem {
  id: string; // unique entry id within board
  entityType: 'place' | 'artifact';
  entityId: string;
  addedAt: string;
  pinNote?: string;
}

export interface ResearchNote {
  id: string;
  title: string;
  content: string;
  linkedEntityId?: string;
  updatedAt: string;
}

export interface InvestigationQuestion {
  id: string;
  prompt: string;
  status: 'open' | 'investigating' | 'resolved-in-notes';
  createdAt: string;
}

export interface ResearchBoard {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  items: ResearchBoardItem[];
  notes: ResearchNote[];
  questions: InvestigationQuestion[];
}

export interface ResearchDeskState {
  schemaVersion: 1;
  bookmarkedPlaceIds: string[];
  savedArtifactIds: string[];
  boards: ResearchBoard[];
  activeBoardId: string | null;
}

export interface ExportedBoardPayload {
  atlasExportFormat: 'unfinished-atlas-board-v1';
  exportedAt: string;
  board: ResearchBoard;
}
