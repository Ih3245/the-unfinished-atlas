import { getPlaceById, getArtifactById } from '@/data';
import type {
  ResearchDeskState,
  ResearchBoard,
  ResearchBoardItem,
  ResearchNote,
  InvestigationQuestion,
  ExportedBoardPayload,
} from '@/types/atlas';

export const DESK_STORAGE_KEY = 'unfinished_atlas_research_desk_v1';

export interface BoardImportValidationResult {
  ok: boolean;
  board?: ResearchBoard;
  warnings: string[];
  error?: string;
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createDefaultDeskState(): ResearchDeskState {
  const now = new Date().toISOString();
  const starterBoardId = 'brd-submerged-and-buried';
  return {
    schemaVersion: 1,
    bookmarkedPlaceIds: ['pl-vermillion-reach'],
    savedArtifactIds: ['art-03', 'art-24'],
    activeBoardId: starterBoardId,
    boards: [
      {
        id: starterBoardId,
        name: 'Oral Memory vs. Official Survey',
        description:
          'Comparing vernacular witness descriptions against state condemnation and drainage maps.',
        createdAt: now,
        updatedAt: now,
        items: [
          {
            id: 'item-seed-1',
            entityType: 'place',
            entityId: 'pl-vermillion-reach',
            addedAt: now,
            pinNote: '2018 drawdown verified the eastern quarry footbridge.',
          },
          {
            id: 'item-seed-2',
            entityType: 'artifact',
            entityId: 'art-03',
            addedAt: now,
            pinNote: 'Maren Lindqvist 1986 cassette transcript (Tape T-04).',
          },
        ],
        notes: [
          {
            id: 'note-seed-1',
            title: 'Unmapped Footbridges & Submerged Trackways',
            content:
              'Both Vermillion Reach (Tape T-04) and Reedmere Fen (1910 Greer deposition) preserve infrastructure in spoken testimony that official surveyors omitted because it carried no ratable freehold value.',
            linkedEntityId: 'pl-vermillion-reach',
            updatedAt: now,
          },
        ],
        questions: [
          {
            id: 'q-seed-1',
            prompt:
              'Did Arthur Pendelton’s office also omit informal towpath crossings when culverting Locks 8 and 9?',
            status: 'investigating',
            createdAt: now,
          },
        ],
      },
    ],
  };
}

export function loadDeskStateFromStorage(): {
  state: ResearchDeskState;
  storageAvailable: boolean;
} {
  if (typeof window === 'undefined') {
    return { state: createDefaultDeskState(), storageAvailable: false };
  }
  try {
    const raw = window.localStorage.getItem(DESK_STORAGE_KEY);
    if (!raw) {
      return { state: createDefaultDeskState(), storageAvailable: true };
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('schemaVersion' in parsed) ||
      !('boards' in parsed) ||
      !Array.isArray((parsed as ResearchDeskState).boards)
    ) {
      return { state: createDefaultDeskState(), storageAvailable: true };
    }
    const cast = parsed as ResearchDeskState;
    return {
      state: {
        schemaVersion: 1,
        bookmarkedPlaceIds: Array.isArray(cast.bookmarkedPlaceIds)
          ? cast.bookmarkedPlaceIds.filter((x): x is string => typeof x === 'string')
          : [],
        savedArtifactIds: Array.isArray(cast.savedArtifactIds)
          ? cast.savedArtifactIds.filter((x): x is string => typeof x === 'string')
          : [],
        boards: cast.boards,
        activeBoardId:
          typeof cast.activeBoardId === 'string'
            ? cast.activeBoardId
            : cast.boards[0]?.id ?? null,
      },
      storageAvailable: true,
    };
  } catch {
    return { state: createDefaultDeskState(), storageAvailable: false };
  }
}

export function saveDeskStateToStorage(state: ResearchDeskState): {
  saved: boolean;
  error?: string;
} {
  if (typeof window === 'undefined') {
    return { saved: false, error: 'Browser storage is unavailable during server rendering.' };
  }
  try {
    window.localStorage.setItem(DESK_STORAGE_KEY, JSON.stringify(state));
    return { saved: true };
  } catch {
    return {
      saved: false,
      error:
        'Could not write to browser localStorage (storage quota reached or private-browsing lock). Export your board as JSON to preserve your work.',
    };
  }
}

// Pure immutable reducers for Research Desk operations (testable in Node & browser)

export function toggleBookmarkedPlace(
  state: ResearchDeskState,
  placeId: string
): ResearchDeskState {
  const exists = state.bookmarkedPlaceIds.includes(placeId);
  return {
    ...state,
    bookmarkedPlaceIds: exists
      ? state.bookmarkedPlaceIds.filter((id) => id !== placeId)
      : [...state.bookmarkedPlaceIds, placeId],
  };
}

export function toggleSavedArtifact(
  state: ResearchDeskState,
  artifactId: string
): ResearchDeskState {
  const exists = state.savedArtifactIds.includes(artifactId);
  return {
    ...state,
    savedArtifactIds: exists
      ? state.savedArtifactIds.filter((id) => id !== artifactId)
      : [...state.savedArtifactIds, artifactId],
  };
}

export function createBoard(
  state: ResearchDeskState,
  name: string,
  description: string
): ResearchDeskState {
  const cleanName = name.trim();
  if (!cleanName) return state;
  const now = new Date().toISOString();
  const newBoard: ResearchBoard = {
    id: makeId('brd'),
    name: cleanName,
    description: description.trim(),
    createdAt: now,
    updatedAt: now,
    items: [],
    notes: [],
    questions: [],
  };
  return {
    ...state,
    boards: [...state.boards, newBoard],
    activeBoardId: newBoard.id,
  };
}

export function renameBoard(
  state: ResearchDeskState,
  boardId: string,
  name: string,
  description: string
): ResearchDeskState {
  const cleanName = name.trim();
  if (!cleanName) return state;
  const now = new Date().toISOString();
  return {
    ...state,
    boards: state.boards.map((b) =>
      b.id === boardId
        ? { ...b, name: cleanName, description: description.trim(), updatedAt: now }
        : b
    ),
  };
}

export function deleteBoard(
  state: ResearchDeskState,
  boardId: string
): ResearchDeskState {
  const remaining = state.boards.filter((b) => b.id !== boardId);
  return {
    ...state,
    boards: remaining,
    activeBoardId:
      state.activeBoardId === boardId ? remaining[0]?.id ?? null : state.activeBoardId,
  };
}

export function addItemToBoard(
  state: ResearchDeskState,
  boardId: string,
  entityType: 'place' | 'artifact',
  entityId: string,
  pinNote?: string
): { nextState: ResearchDeskState; duplicate: boolean } {
  const target = state.boards.find((b) => b.id === boardId);
  if (!target) return { nextState: state, duplicate: false };

  const alreadyOnBoard = target.items.some(
    (item) => item.entityType === entityType && item.entityId === entityId
  );
  if (alreadyOnBoard) {
    return { nextState: state, duplicate: true };
  }

  const now = new Date().toISOString();
  const newItem: ResearchBoardItem = {
    id: makeId('item'),
    entityType,
    entityId,
    addedAt: now,
    pinNote: pinNote?.trim() || undefined,
  };

  return {
    duplicate: false,
    nextState: {
      ...state,
      boards: state.boards.map((b) =>
        b.id === boardId
          ? { ...b, items: [...b.items, newItem], updatedAt: now }
          : b
      ),
    },
  };
}

export function removeItemFromBoard(
  state: ResearchDeskState,
  boardId: string,
  itemId: string
): ResearchDeskState {
  const now = new Date().toISOString();
  return {
    ...state,
    boards: state.boards.map((b) =>
      b.id === boardId
        ? {
            ...b,
            items: b.items.filter((i) => i.id !== itemId),
            updatedAt: now,
          }
        : b
    ),
  };
}

export function reorderBoardItem(
  state: ResearchDeskState,
  boardId: string,
  itemId: string,
  direction: 'up' | 'down'
): ResearchDeskState {
  const now = new Date().toISOString();
  return {
    ...state,
    boards: state.boards.map((b) => {
      if (b.id !== boardId) return b;
      const idx = b.items.findIndex((i) => i.id === itemId);
      if (idx === -1) return b;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= b.items.length) return b;
      const copy = [...b.items];
      const current = copy[idx]!;
      const target = copy[swapIdx]!;
      copy[idx] = target;
      copy[swapIdx] = current;
      return { ...b, items: copy, updatedAt: now };
    }),
  };
}

export function upsertBoardNote(
  state: ResearchDeskState,
  boardId: string,
  note: { id?: string; title: string; content: string; linkedEntityId?: string }
): ResearchDeskState {
  const cleanTitle = note.title.trim() || 'Untitled Research Note';
  const cleanContent = note.content.trim();
  if (!cleanContent) return state;
  const now = new Date().toISOString();

  return {
    ...state,
    boards: state.boards.map((b) => {
      if (b.id !== boardId) return b;
      if (note.id && b.notes.some((n) => n.id === note.id)) {
        return {
          ...b,
          updatedAt: now,
          notes: b.notes.map((n) =>
            n.id === note.id
              ? {
                  ...n,
                  title: cleanTitle,
                  content: cleanContent,
                  linkedEntityId: note.linkedEntityId || undefined,
                  updatedAt: now,
                }
              : n
          ),
        };
      }
      const created: ResearchNote = {
        id: makeId('note'),
        title: cleanTitle,
        content: cleanContent,
        linkedEntityId: note.linkedEntityId || undefined,
        updatedAt: now,
      };
      return {
        ...b,
        updatedAt: now,
        notes: [created, ...b.notes],
      };
    }),
  };
}

export function deleteBoardNote(
  state: ResearchDeskState,
  boardId: string,
  noteId: string
): ResearchDeskState {
  const now = new Date().toISOString();
  return {
    ...state,
    boards: state.boards.map((b) =>
      b.id === boardId
        ? { ...b, notes: b.notes.filter((n) => n.id !== noteId), updatedAt: now }
        : b
    ),
  };
}

export function addBoardQuestion(
  state: ResearchDeskState,
  boardId: string,
  prompt: string
): ResearchDeskState {
  const clean = prompt.trim();
  if (!clean) return state;
  const now = new Date().toISOString();
  const q: InvestigationQuestion = {
    id: makeId('q'),
    prompt: clean,
    status: 'open',
    createdAt: now,
  };
  return {
    ...state,
    boards: state.boards.map((b) =>
      b.id === boardId
        ? { ...b, questions: [...b.questions, q], updatedAt: now }
        : b
    ),
  };
}

export function cycleBoardQuestionStatus(
  state: ResearchDeskState,
  boardId: string,
  questionId: string
): ResearchDeskState {
  const order: InvestigationQuestion['status'][] = [
    'open',
    'investigating',
    'resolved-in-notes',
  ];
  const now = new Date().toISOString();
  return {
    ...state,
    boards: state.boards.map((b) => {
      if (b.id !== boardId) return b;
      return {
        ...b,
        updatedAt: now,
        questions: b.questions.map((q) => {
          if (q.id !== questionId) return q;
          const next = order[(order.indexOf(q.status) + 1) % order.length]!;
          return { ...q, status: next };
        }),
      };
    }),
  };
}

export function removeBoardQuestion(
  state: ResearchDeskState,
  boardId: string,
  questionId: string
): ResearchDeskState {
  const now = new Date().toISOString();
  return {
    ...state,
    boards: state.boards.map((b) =>
      b.id === boardId
        ? {
            ...b,
            questions: b.questions.filter((q) => q.id !== questionId),
            updatedAt: now,
          }
        : b
    ),
  };
}

export function serializeBoardForExport(board: ResearchBoard): string {
  const payload: ExportedBoardPayload = {
    atlasExportFormat: 'unfinished-atlas-board-v1',
    exportedAt: new Date().toISOString(),
    board,
  };
  return JSON.stringify(payload, null, 2);
}

export function validateAndImportBoardJson(
  rawJson: string,
  existingBoards: ResearchBoard[] = []
): BoardImportValidationResult {
  if (!rawJson || !rawJson.trim()) {
    return {
      ok: false,
      warnings: [],
      error: 'The imported file is empty. Provide a valid Unfinished Atlas board JSON file.',
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return {
      ok: false,
      warnings: [],
      error: 'Malformed JSON syntax. Check that the file was not truncated or edited improperly.',
    };
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      ok: false,
      warnings: [],
      error: 'Invalid root structure: expected a JSON object containing an exported board.',
    };
  }

  const root = parsed as Record<string, unknown>;
  if (root.atlasExportFormat !== 'unfinished-atlas-board-v1') {
    return {
      ok: false,
      warnings: [],
      error:
        'Unrecognized export format header. Expected "atlasExportFormat": "unfinished-atlas-board-v1".',
    };
  }

  const rawBoard = root.board;
  if (typeof rawBoard !== 'object' || rawBoard === null || Array.isArray(rawBoard)) {
    return {
      ok: false,
      warnings: [],
      error: 'Missing or invalid "board" record inside export payload.',
    };
  }

  const b = rawBoard as Record<string, unknown>;
  if (typeof b.name !== 'string' || b.name.trim().length === 0) {
    return {
      ok: false,
      warnings: [],
      error: 'Board validation failed: "board.name" must be a non-empty string.',
    };
  }

  if (!Array.isArray(b.items) || !Array.isArray(b.notes) || !Array.isArray(b.questions)) {
    return {
      ok: false,
      warnings: [],
      error:
        'Board validation failed: "items", "notes", and "questions" must all be arrays.',
    };
  }

  const warnings: string[] = [];
  const now = new Date().toISOString();

  // Deduplicate & verify items against known dataset IDs
  const seenEntityKeys = new Set<string>();
  const validItems: ResearchBoardItem[] = [];

  for (const rawItem of b.items) {
    if (typeof rawItem !== 'object' || rawItem === null) {
      warnings.push('Skipped a malformed board item entry.');
      continue;
    }
    const it = rawItem as Record<string, unknown>;
    const entityType = it.entityType;
    const entityId = it.entityId;
    if (
      (entityType !== 'place' && entityType !== 'artifact') ||
      typeof entityId !== 'string'
    ) {
      warnings.push('Skipped an item with missing entityType or entityId.');
      continue;
    }

    const existsInArchive =
      entityType === 'place'
        ? Boolean(getPlaceById(entityId))
        : Boolean(getArtifactById(entityId));

    if (!existsInArchive) {
      warnings.push(
        `Skipped unknown ${entityType} reference "${entityId}" not present in local archive.`
      );
      continue;
    }

    const dedupeKey = `${entityType}:${entityId}`;
    if (seenEntityKeys.has(dedupeKey)) {
      warnings.push(`Removed duplicate ${entityType} "${entityId}" during import.`);
      continue;
    }
    seenEntityKeys.add(dedupeKey);

    validItems.push({
      id: typeof it.id === 'string' && it.id.trim() ? it.id : makeId('item'),
      entityType,
      entityId,
      addedAt: typeof it.addedAt === 'string' ? it.addedAt : now,
      pinNote: typeof it.pinNote === 'string' ? it.pinNote.slice(0, 500) : undefined,
    });
  }

  const validNotes: ResearchNote[] = [];
  for (const rawNote of b.notes) {
    if (typeof rawNote !== 'object' || rawNote === null) {
      warnings.push('Skipped a malformed note entry.');
      continue;
    }
    const nt = rawNote as Record<string, unknown>;
    if (typeof nt.content !== 'string' || !nt.content.trim()) {
      warnings.push('Skipped an empty research note.');
      continue;
    }
    validNotes.push({
      id: typeof nt.id === 'string' && nt.id.trim() ? nt.id : makeId('note'),
      title:
        typeof nt.title === 'string' && nt.title.trim()
          ? nt.title.trim().slice(0, 160)
          : 'Imported Note',
      content: nt.content.trim().slice(0, 5000),
      linkedEntityId:
        typeof nt.linkedEntityId === 'string' ? nt.linkedEntityId : undefined,
      updatedAt: typeof nt.updatedAt === 'string' ? nt.updatedAt : now,
    });
  }

  const validQuestions: InvestigationQuestion[] = [];
  for (const rawQ of b.questions) {
    if (typeof rawQ !== 'object' || rawQ === null) continue;
    const q = rawQ as Record<string, unknown>;
    if (typeof q.prompt !== 'string' || !q.prompt.trim()) continue;
    const status =
      q.status === 'open' ||
      q.status === 'investigating' ||
      q.status === 'resolved-in-notes'
        ? q.status
        : 'open';
    validQuestions.push({
      id: typeof q.id === 'string' && q.id.trim() ? q.id : makeId('q'),
      prompt: q.prompt.trim().slice(0, 400),
      status,
      createdAt: typeof q.createdAt === 'string' ? q.createdAt : now,
    });
  }

  const existingIds = new Set(existingBoards.map((eb) => eb.id));
  const existingNames = new Set(existingBoards.map((eb) => eb.name.toLowerCase()));
  let assignedId =
    typeof b.id === 'string' && b.id.trim() ? b.id.trim() : makeId('brd');
  if (existingIds.has(assignedId)) {
    assignedId = makeId('brd-imp');
    warnings.push(
      'A board with this ID already existed on your Desk; imported as a separate copy.'
    );
  }

  let assignedName = b.name.trim().slice(0, 120);
  if (existingNames.has(assignedName.toLowerCase())) {
    assignedName = `${assignedName} (Imported)`;
  }

  const sanitizedBoard: ResearchBoard = {
    id: assignedId,
    name: assignedName,
    description:
      typeof b.description === 'string' ? b.description.trim().slice(0, 400) : '',
    createdAt: typeof b.createdAt === 'string' ? b.createdAt : now,
    updatedAt: now,
    items: validItems,
    notes: validNotes,
    questions: validQuestions,
  };

  return {
    ok: true,
    board: sanitizedBoard,
    warnings,
  };
}
