'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { ResearchDeskState } from '@/types/atlas';
import {
  createDefaultDeskState,
  loadDeskStateFromStorage,
  saveDeskStateToStorage,
  toggleBookmarkedPlace,
  toggleSavedArtifact,
  createBoard,
  renameBoard,
  deleteBoard,
  addItemToBoard,
  removeItemFromBoard,
  reorderBoardItem,
  upsertBoardNote,
  deleteBoardNote,
  addBoardQuestion,
  cycleBoardQuestionStatus,
  removeBoardQuestion,
  serializeBoardForExport,
  validateAndImportBoardJson,
  type BoardImportValidationResult,
} from '@/lib/desk-storage';

export interface ToastMessage {
  id: string;
  tone: 'info' | 'success' | 'error';
  text: string;
}

interface ResearchDeskContextValue {
  desk: ResearchDeskState;
  isHydrated: boolean;
  storageAvailable: boolean;
  storageError: string | null;
  notify: (text: string, tone?: ToastMessage['tone']) => void;
  togglePlaceBookmark: (placeId: string, placeName?: string) => void;
  toggleArtifactSave: (artifactId: string, artifactTitle?: string) => void;
  setActiveBoard: (boardId: string) => void;
  addNewBoard: (name: string, description: string) => void;
  updateBoardDetails: (boardId: string, name: string, description: string) => void;
  removeBoard: (boardId: string) => void;
  pinEntityToBoard: (
    boardId: string,
    entityType: 'place' | 'artifact',
    entityId: string,
    label: string,
    pinNote?: string
  ) => boolean;
  unpinItemFromBoard: (boardId: string, itemId: string) => void;
  moveBoardItem: (boardId: string, itemId: string, direction: 'up' | 'down') => void;
  saveNoteOnBoard: (
    boardId: string,
    note: { id?: string; title: string; content: string; linkedEntityId?: string }
  ) => void;
  removeNoteFromBoard: (boardId: string, noteId: string) => void;
  addQuestionToBoard: (boardId: string, prompt: string) => void;
  advanceQuestionStatus: (boardId: string, questionId: string) => void;
  deleteQuestionFromBoard: (boardId: string, questionId: string) => void;
  exportBoardJson: (boardId: string) => string | null;
  importBoardJson: (rawJson: string) => BoardImportValidationResult;
}

const ResearchDeskContext = createContext<ResearchDeskContextValue | null>(null);

export function ResearchDeskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [desk, setDesk] = useState<ResearchDeskState>(() =>
    createDefaultDeskState()
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const loaded = loadDeskStateFromStorage();
    setDesk(loaded.state);
    setStorageAvailable(loaded.storageAvailable);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast(null);
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback(
    (text: string, tone: ToastMessage['tone'] = 'success') => {
      setToast({
        id: `${Date.now()}`,
        tone,
        text,
      });
    },
    []
  );

  const commitState = useCallback(
    (updater: (prev: ResearchDeskState) => ResearchDeskState) => {
      setDesk((prev) => {
        const next = updater(prev);
        const res = saveDeskStateToStorage(next);
        if (!res.saved && res.error) {
          setStorageError(res.error);
        } else {
          setStorageError(null);
        }
        return next;
      });
    },
    []
  );

  const togglePlaceBookmark = useCallback(
    (placeId: string, placeName = 'Place') => {
      setDesk((prev) => {
        const wasBookmarked = prev.bookmarkedPlaceIds.includes(placeId);
        const next = toggleBookmarkedPlace(prev, placeId);
        saveDeskStateToStorage(next);
        notify(
          wasBookmarked
            ? `Removed "${placeName}" from Research Desk bookmarks.`
            : `Bookmarked "${placeName}" to your local Research Desk.`,
          'info'
        );
        return next;
      });
    },
    [notify]
  );

  const toggleArtifactSave = useCallback(
    (artifactId: string, artifactTitle = 'Artifact') => {
      setDesk((prev) => {
        const wasSaved = prev.savedArtifactIds.includes(artifactId);
        const next = toggleSavedArtifact(prev, artifactId);
        saveDeskStateToStorage(next);
        notify(
          wasSaved
            ? `Removed "${artifactTitle}" from saved artifacts.`
            : `Saved "${artifactTitle}" to your Research Desk cabinet.`,
          'info'
        );
        return next;
      });
    },
    [notify]
  );

  const setActiveBoard = useCallback(
    (boardId: string) => {
      commitState((prev) => ({ ...prev, activeBoardId: boardId }));
    },
    [commitState]
  );

  const addNewBoard = useCallback(
    (name: string, description: string) => {
      commitState((prev) => createBoard(prev, name, description));
      notify(`Created investigation board "${name.trim()}".`);
    },
    [commitState, notify]
  );

  const updateBoardDetails = useCallback(
    (boardId: string, name: string, description: string) => {
      commitState((prev) => renameBoard(prev, boardId, name, description));
      notify(`Updated board "${name.trim()}".`);
    },
    [commitState, notify]
  );

  const removeBoard = useCallback(
    (boardId: string) => {
      commitState((prev) => deleteBoard(prev, boardId));
      notify('Deleted investigation board from local storage.', 'info');
    },
    [commitState, notify]
  );

  const pinEntityToBoard = useCallback(
    (
      boardId: string,
      entityType: 'place' | 'artifact',
      entityId: string,
      label: string,
      pinNote?: string
    ): boolean => {
      let added = false;
      setDesk((prev) => {
        const { nextState, duplicate } = addItemToBoard(
          prev,
          boardId,
          entityType,
          entityId,
          pinNote
        );
        const boardName =
          prev.boards.find((b) => b.id === boardId)?.name ?? 'board';
        if (duplicate) {
          notify(`"${label}" is already pinned on "${boardName}".`, 'info');
          added = false;
          return prev;
        }
        saveDeskStateToStorage(nextState);
        notify(`Pinned "${label}" onto "${boardName}".`);
        added = true;
        return nextState;
      });
      return added;
    },
    [notify]
  );

  const unpinItemFromBoard = useCallback(
    (boardId: string, itemId: string) => {
      commitState((prev) => removeItemFromBoard(prev, boardId, itemId));
      notify('Removed item from board.', 'info');
    },
    [commitState, notify]
  );

  const moveBoardItem = useCallback(
    (boardId: string, itemId: string, direction: 'up' | 'down') => {
      commitState((prev) => reorderBoardItem(prev, boardId, itemId, direction));
    },
    [commitState]
  );

  const saveNoteOnBoard = useCallback(
    (
      boardId: string,
      note: { id?: string; title: string; content: string; linkedEntityId?: string }
    ) => {
      commitState((prev) => upsertBoardNote(prev, boardId, note));
      notify(note.id ? 'Updated research note.' : 'Added research note to board.');
    },
    [commitState, notify]
  );

  const removeNoteFromBoard = useCallback(
    (boardId: string, noteId: string) => {
      commitState((prev) => deleteBoardNote(prev, boardId, noteId));
      notify('Deleted research note.', 'info');
    },
    [commitState, notify]
  );

  const addQuestionToBoard = useCallback(
    (boardId: string, prompt: string) => {
      commitState((prev) => addBoardQuestion(prev, boardId, prompt));
      notify('Logged open investigation question.');
    },
    [commitState, notify]
  );

  const advanceQuestionStatus = useCallback(
    (boardId: string, questionId: string) => {
      commitState((prev) => cycleBoardQuestionStatus(prev, boardId, questionId));
    },
    [commitState]
  );

  const deleteQuestionFromBoard = useCallback(
    (boardId: string, questionId: string) => {
      commitState((prev) => removeBoardQuestion(prev, boardId, questionId));
      notify('Removed investigation question.', 'info');
    },
    [commitState, notify]
  );

  const exportBoardJson = useCallback(
    (boardId: string): string | null => {
      const target = desk.boards.find((b) => b.id === boardId);
      if (!target) return null;
      return serializeBoardForExport(target);
    },
    [desk.boards]
  );

  const importBoardJson = useCallback(
    (rawJson: string): BoardImportValidationResult => {
      const validation = validateAndImportBoardJson(rawJson, desk.boards);
      if (validation.ok && validation.board) {
        const imported = validation.board;
        commitState((prev) => ({
          ...prev,
          boards: [...prev.boards, imported],
          activeBoardId: imported.id,
        }));
        notify(`Imported board "${imported.name}" into your Research Desk.`);
      }
      return validation;
    },
    [desk.boards, commitState, notify]
  );

  return (
    <ResearchDeskContext.Provider
      value={{
        desk,
        isHydrated,
        storageAvailable,
        storageError,
        notify,
        togglePlaceBookmark,
        toggleArtifactSave,
        setActiveBoard,
        addNewBoard,
        updateBoardDetails,
        removeBoard,
        pinEntityToBoard,
        unpinItemFromBoard,
        moveBoardItem,
        saveNoteOnBoard,
        removeNoteFromBoard,
        addQuestionToBoard,
        advanceQuestionStatus,
        deleteQuestionFromBoard,
        exportBoardJson,
        importBoardJson,
      }}
    >
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          insetBlockEnd: '1.25rem',
          insetInlineEnd: '1.25rem',
          zIndex: 900,
          maxWidth: 'min(26rem, calc(100vw - 2.5rem))',
          pointerEvents: toast ? 'auto' : 'none',
        }}
      >
        {toast && (
          <div
            role={toast.tone === 'error' ? 'alert' : 'status'}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '0.75rem',
              padding: '0.8rem 1rem',
              background:
                toast.tone === 'error'
                  ? 'var(--terracotta-tint)'
                  : 'var(--ink-primary)',
              color:
                toast.tone === 'error'
                  ? 'var(--accent-terracotta)'
                  : 'var(--paper-chalk)',
              border:
                toast.tone === 'error'
                  ? '1px solid var(--accent-terracotta)'
                  : '1px solid var(--ink-primary)',
              borderRadius: 'var(--radius-folio)',
              boxShadow: 'var(--shadow-elevated)',
              fontSize: 'var(--text-body-sm)',
            }}
          >
            <span>
              <strong style={{ fontFamily: 'var(--font-catalogue)', marginInlineEnd: '0.45rem' }}>
                {toast.tone === 'error' ? '[ERROR]' : '[DESK]'}
              </strong>
              {toast.text}
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '0.2rem 0.35rem',
                fontFamily: 'var(--font-catalogue)',
                fontSize: '0.85rem',
                minHeight: '28px',
                minWidth: '28px',
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </ResearchDeskContext.Provider>
  );
}

export function useResearchDesk() {
  const ctx = useContext(ResearchDeskContext);
  if (!ctx) {
    throw new Error('useResearchDesk must be used within a ResearchDeskProvider');
  }
  return ctx;
}
