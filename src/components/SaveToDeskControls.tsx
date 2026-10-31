'use client';

import React, { useRef, useState } from 'react';
import { useResearchDesk } from './ResearchDeskProvider';
import { BookmarkRibbonIcon, FolioBoardIcon, CloseCrossIcon } from './ArchivalIcons';

interface SaveToDeskControlsProps {
  entityType: 'place' | 'artifact';
  entityId: string;
  label: string;
  compact?: boolean;
}

export function SaveToDeskControls({
  entityType,
  entityId,
  label,
  compact = false,
}: SaveToDeskControlsProps) {
  const {
    desk,
    isHydrated,
    togglePlaceBookmark,
    toggleArtifactSave,
    pinEntityToBoard,
    addNewBoard,
  } = useResearchDesk();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string>('');
  const [pinNote, setPinNote] = useState('');
  const [newBoardName, setNewBoardName] = useState('');

  const isSaved =
    isHydrated &&
    (entityType === 'place'
      ? desk.bookmarkedPlaceIds.includes(entityId)
      : desk.savedArtifactIds.includes(entityId));

  const openBoardDialog = () => {
    const defaultId = desk.activeBoardId ?? desk.boards[0]?.id ?? '';
    setSelectedBoardId(defaultId);
    setPinNote('');
    setNewBoardName('');
    dialogRef.current?.showModal();
  };

  const handleToggleSave = () => {
    if (entityType === 'place') {
      togglePlaceBookmark(entityId, label);
    } else {
      toggleArtifactSave(entityId, label);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardName.trim()) {
      addNewBoard(newBoardName.trim(), `Created while investigating ${label}`);
      // Next render will have the board, or we can close and notify
      dialogRef.current?.close();
      return;
    }
    if (!selectedBoardId) return;
    pinEntityToBoard(selectedBoardId, entityType, entityId, label, pinNote);
    dialogRef.current?.close();
  };

  return (
    <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <button
        type="button"
        onClick={handleToggleSave}
        aria-pressed={isSaved}
        className={isSaved ? 'btn-archival btn-terracotta' : 'btn-archival btn-secondary'}
        style={
          compact
            ? { padding: '0.45rem 0.8rem', fontSize: 'var(--text-caption)' }
            : undefined
        }
      >
        <BookmarkRibbonIcon size={15} filled={isSaved} />
        <span>
          {isSaved
            ? entityType === 'place'
              ? 'Bookmarked'
              : 'Saved in Desk'
            : entityType === 'place'
              ? 'Bookmark Place'
              : 'Save Artifact'}
        </span>
      </button>

      <button
        type="button"
        onClick={openBoardDialog}
        className="btn-archival btn-secondary"
        style={
          compact
            ? { padding: '0.45rem 0.8rem', fontSize: 'var(--text-caption)' }
            : undefined
        }
      >
        <FolioBoardIcon size={15} />
        <span>Pin to Board</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`pin-dialog-title-${entityId}`}
        onPointerDown={(e) => {
          const dlg = dialogRef.current;
          if (!dlg) return;
          const r = dlg.getBoundingClientRect();
          const outside =
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom;
          if (outside) dlg.close();
        }}
      >
        <div style={{ padding: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBlockEnd: '1rem',
              paddingBlockEnd: '0.75rem',
              borderBlockEnd: '1px solid var(--rule-fine)',
            }}
          >
            <div>
              <span className="catalogue-code">RESEARCH DESK · LOCAL WORKSPACE</span>
              <h2
                id={`pin-dialog-title-${entityId}`}
                style={{ fontSize: 'var(--text-h3)', marginBlockStart: '0.2rem' }}
              >
                Pin “{label}” to an Investigation Board
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn-archival btn-ghost"
              aria-label="Close board pin dialog"
            >
              <CloseCrossIcon size={18} />
            </button>
          </div>

          <form onSubmit={handlePinSubmit} style={{ display: 'grid', gap: '1rem' }}>
            {desk.boards.length > 0 ? (
              <div>
                <label
                  htmlFor={`board-select-${entityId}`}
                  className="archival-label"
                >
                  Choose Existing Investigation Board
                </label>
                <select
                  id={`board-select-${entityId}`}
                  className="archival-select"
                  value={selectedBoardId}
                  onChange={(e) => setSelectedBoardId(e.target.value)}
                >
                  {desk.boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.items.length} items)
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--ink-secondary)' }}>
                No boards exist yet. Enter a title below to start your first board.
              </p>
            )}

            <div>
              <label htmlFor={`pin-note-${entityId}`} className="archival-label">
                Field Margin Note (Optional)
              </label>
              <input
                id={`pin-note-${entityId}`}
                type="text"
                className="archival-input"
                placeholder="e.g., Compare against 1938 drawdown survey…"
                value={pinNote}
                onChange={(e) => setPinNote(e.target.value)}
              />
            </div>

            <div
              style={{
                paddingBlockStart: '0.75rem',
                borderBlockStart: '1px dashed var(--rule-fine)',
              }}
            >
              <label
                htmlFor={`quick-new-board-${entityId}`}
                className="archival-label"
              >
                Or Create a New Board Instead
              </label>
              <input
                id={`quick-new-board-${entityId}`}
                type="text"
                className="archival-input"
                placeholder="New board title (leave blank to use selected board)"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.65rem',
                marginBlockStart: '0.5rem',
              }}
            >
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn-archival btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-archival">
                {newBoardName.trim() ? 'Create Board' : 'Pin Record'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
