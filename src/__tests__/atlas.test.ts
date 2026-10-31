import { describe, it, expect } from 'vitest';
import { PLACES, ARTIFACTS, getPlaceBySlug, getAtlasSummaryCounts } from '@/data';
import { validateDatasetIntegrity } from '@/lib/integrity';
import { filterAndSortPlaces, filterAndSortArtifacts } from '@/lib/filters';
import { buildObservatoryGraph, getEntityConnections } from '@/lib/graph';
import { searchAllEntities, highlightSnippetSegments } from '@/lib/search';
import {
  createDefaultDeskState,
  toggleBookmarkedPlace,
  toggleSavedArtifact,
  createBoard,
  renameBoard,
  addItemToBoard,
  reorderBoardItem,
  removeItemFromBoard,
  upsertBoardNote,
  addBoardQuestion,
  cycleBoardQuestionStatus,
  serializeBoardForExport,
  validateAndImportBoardJson,
} from '@/lib/desk-storage';

describe('Dataset Referential Integrity & Minimum Thresholds', () => {
  it('passes full referential integrity across all entities and exceeds dataset minimums', () => {
    const report = validateDatasetIntegrity();
    expect(report.errors).toEqual([]);
    expect(report.valid).toBe(true);
    expect(report.counts.places).toBeGreaterThanOrEqual(8);
    expect(report.counts.artifacts).toBeGreaterThanOrEqual(24);
    expect(report.counts.events).toBeGreaterThanOrEqual(12);
    expect(report.counts.relationships).toBeGreaterThanOrEqual(35);
  });

  it('provides varied layout variants, period states, and epistemic claims on every place', () => {
    const variants = new Set(PLACES.map((p) => p.layoutVariant));
    expect(variants.size).toBeGreaterThanOrEqual(4);

    for (const place of PLACES) {
      expect(place.periods.length).toBeGreaterThanOrEqual(3);
      const statuses = new Set(place.claims.map((c) => c.status));
      expect(statuses.has('verified')).toBe(true);
      expect(statuses.has('unresolved')).toBe(true);
    }
  });

  it('computes accurate live dataset summary counts for the homepage ledger', () => {
    const counts = getAtlasSummaryCounts();
    expect(counts.places).toBe(PLACES.length);
    expect(counts.artifacts).toBe(ARTIFACTS.length);
    expect(counts.unresolvedQuestions).toBeGreaterThanOrEqual(8);
  });
});

describe('Explore Atlas & Artifact Cabinet Filtering and Sorting', () => {
  it('filters places by search query, region, category, and era simultaneously', () => {
    const byRegion = filterAndSortPlaces(PLACES, {
      region: 'Northern Silted Estuary',
    });
    expect(byRegion.length).toBe(2);

    const bySubjectAndCategory = filterAndSortPlaces(PLACES, {
      query: 'footbridge',
      category: 'submerged-landscape',
    });
    expect(bySubjectAndCategory.map((p) => p.id)).toEqual(['pl-vermillion-reach']);
  });

  it('sorts places chronologically and alphabetically', () => {
    const asc = filterAndSortPlaces(PLACES, { sort: 'turning-point-asc' });
    expect(asc[0]!.activeSpan.turningPointYear).toBeLessThanOrEqual(
      asc[asc.length - 1]!.activeSpan.turningPointYear
    );

    const alpha = filterAndSortPlaces(PLACES, { sort: 'name-asc' });
    expect(alpha[0]!.name.localeCompare(alpha[1]!.name)).toBeLessThanOrEqual(0);
  });

  it('supports multi-select artifact filters and places undated items cleanly at the end when sorting by date', () => {
    const multi = filterAndSortArtifacts(ARTIFACTS, {
      types: ['photograph', 'oral-history'],
      certainties: ['contested', 'unattributed'],
    });
    expect(multi.length).toBeGreaterThanOrEqual(2);
    expect(
      multi.every((a) => a.type === 'photograph' || a.type === 'oral-history')
    ).toBe(true);

    const dateSorted = filterAndSortArtifacts(ARTIFACTS, { sort: 'date-asc' });
    const firstNullIdx = dateSorted.findIndex((a) => a.yearSort === null);
    expect(firstNullIdx).toBeGreaterThan(0);
    // Every entry after firstNullIdx must also have yearSort === null
    for (let i = firstNullIdx; i < dateSorted.length; i++) {
      expect(dateSorted[i]!.yearSort).toBeNull();
    }
  });
});

describe('Global Discovery Search & Highlighting', () => {
  it('searches across places, artifacts, events, people, periods, and sources', () => {
    const solisResults = searchAllEntities('Solís'); // accent-insensitive match
    expect(solisResults.length).toBeGreaterThanOrEqual(3);
    const entityTypes = new Set(solisResults.map((r) => r.entityType));
    expect(entityTypes.has('person')).toBe(true);
    expect(entityTypes.has('artifact')).toBe(true);

    const sourceMatch = searchAllEntities('FONDS-AWB-38', 'source');
    expect(sourceMatch.length).toBe(1);
    expect(sourceMatch[0]!.entityType).toBe('source');

    const periodMatch = searchAllEntities('Triangulation', 'period');
    expect(periodMatch.length).toBe(1);
    expect(periodMatch[0]!.entityType).toBe('period');
  });

  it('segments text accurately for query highlighting without breaking original case', () => {
    const segments = highlightSnippetSegments(
      'Alderney Dam submerged Vermillion Ford in 1938.',
      'vermillion 1938'
    );
    const highlightedTexts = segments
      .filter((s) => s.highlighted)
      .map((s) => s.text);
    expect(highlightedTexts).toEqual(['Vermillion', '1938']);
  });
});

describe('Relationship Observatory Graph & Neighbor Lookup', () => {
  it('builds a connected graph and retrieves immediate connections for a selected node', () => {
    const graph = buildObservatoryGraph();
    expect(graph.nodes.length).toBeGreaterThanOrEqual(50);
    expect(graph.edges.length).toBeGreaterThanOrEqual(45);

    const neighbors = getEntityConnections(graph, 'pl-st-clement-concourse');
    expect(neighbors.length).toBeGreaterThanOrEqual(4);
    expect(neighbors.some((n) => n.node.id === 'per-04')).toBe(true);
  });

  it('isolates entity types when filtered', () => {
    const placesAndPeopleOnly = buildObservatoryGraph(['place', 'person']);
    expect(
      placesAndPeopleOnly.nodes.every(
        (n) => n.entityType === 'place' || n.entityType === 'person'
      )
    ).toBe(true);
  });
});

describe('Research Desk Operations & Import/Export Validation', () => {
  it('supports bookmarking, board creation, item reordering, notes, and questions', () => {
    let state = createDefaultDeskState();
    state = toggleBookmarkedPlace(state, 'pl-port-meridian-spit');
    expect(state.bookmarkedPlaceIds).toContain('pl-port-meridian-spit');

    state = toggleSavedArtifact(state, 'art-08');
    expect(state.savedArtifactIds).toContain('art-08');

    state = createBoard(state, 'Coastal Siltation Study', 'Tracking estuary bars');
    const boardId = state.activeBoardId!;
    expect(state.boards.find((b) => b.id === boardId)?.name).toBe(
      'Coastal Siltation Study'
    );

    const add1 = addItemToBoard(state, boardId, 'place', 'pl-port-meridian-spit');
    expect(add1.duplicate).toBe(false);
    state = add1.nextState;

    // Duplicate protection
    const addDup = addItemToBoard(state, boardId, 'place', 'pl-port-meridian-spit');
    expect(addDup.duplicate).toBe(true);

    const add2 = addItemToBoard(state, boardId, 'artifact', 'art-08');
    state = add2.nextState;

    const secondItemId = state.boards.find((b) => b.id === boardId)!.items[1]!.id;
    state = reorderBoardItem(state, boardId, secondItemId, 'up');
    expect(
      state.boards.find((b) => b.id === boardId)!.items[0]!.entityId
    ).toBe('art-08');

    state = upsertBoardNote(state, boardId, {
      title: 'Halvorsen Discrepancy',
      content: 'Compare 1877 bond circular against Pocket Book 7.',
    });
    expect(state.boards.find((b) => b.id === boardId)!.notes).toHaveLength(1);

    state = addBoardQuestion(
      state,
      boardId,
      'Where are the excised Oct–Dec 1877 Harbor Board minute pages?'
    );
    const qId = state.boards.find((b) => b.id === boardId)!.questions[0]!.id;
    state = cycleBoardQuestionStatus(state, boardId, qId);
    expect(
      state.boards.find((b) => b.id === boardId)!.questions[0]!.status
    ).toBe('investigating');

    state = renameBoard(state, boardId, 'Northern Estuary Inquiry', 'Updated scope');
    expect(state.boards.find((b) => b.id === boardId)!.name).toBe(
      'Northern Estuary Inquiry'
    );

    state = removeItemFromBoard(state, boardId, secondItemId);
    expect(state.boards.find((b) => b.id === boardId)!.items).toHaveLength(1);
  });

  it('exports a board to JSON and re-imports it cleanly while rejecting invalid payloads', () => {
    const state = createDefaultDeskState();
    const board = state.boards[0]!;
    const exportedJson = serializeBoardForExport(board);

    const reimported = validateAndImportBoardJson(exportedJson, state.boards);
    expect(reimported.ok).toBe(true);
    expect(reimported.board?.name).toContain('Oral Memory vs. Official Survey');
    expect(reimported.board?.items.length).toBe(board.items.length);

    // Malformed JSON
    const malformed = validateAndImportBoardJson('{ broken json');
    expect(malformed.ok).toBe(false);
    expect(malformed.error).toContain('Malformed JSON');

    // Wrong format header
    const wrongFormat = validateAndImportBoardJson(
      JSON.stringify({ atlasExportFormat: 'wrong', board: {} })
    );
    expect(wrongFormat.ok).toBe(false);

    // Unknown entity IDs & duplicates gracefully stripped with warnings
    const dirtyPayload = JSON.stringify({
      atlasExportFormat: 'unfinished-atlas-board-v1',
      exportedAt: new Date().toISOString(),
      board: {
        id: 'brd-dirty',
        name: 'Dirty Import Test',
        description: '',
        items: [
          { id: '1', entityType: 'place', entityId: 'pl-vermillion-reach' },
          { id: '2', entityType: 'place', entityId: 'pl-vermillion-reach' },
          { id: '3', entityType: 'artifact', entityId: 'art-nonexistent-999' },
        ],
        notes: [{ id: 'n1', title: 'Valid', content: 'Kept note' }],
        questions: [],
      },
    });
    const cleaned = validateAndImportBoardJson(dirtyPayload, []);
    expect(cleaned.ok).toBe(true);
    expect(cleaned.board?.items).toHaveLength(1);
    expect(cleaned.warnings.length).toBe(2);
  });

  it('resolves place detail slugs and confirms dynamic Time Machine periods differ', () => {
    const place = getPlaceBySlug('vermillion-reach-reservoir');
    expect(place).toBeDefined();
    expect(place!.periods[0]!.scene.waterLevelRatio).not.toBe(
      place!.periods[1]!.scene.waterLevelRatio
    );
  });
});
