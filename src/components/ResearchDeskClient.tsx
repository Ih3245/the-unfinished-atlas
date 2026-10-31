'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  PLACES,
  ARTIFACTS,
  ARTIFACT_TYPE_LABELS,
  CATEGORY_LABELS,
  getPlaceById,
  getArtifactById,
} from '@/data';
import { useResearchDesk } from './ResearchDeskProvider';
import type { BoardImportValidationResult } from '@/lib/desk-storage';
import { CloseCrossIcon } from './ArchivalIcons';

export function ResearchDeskClient() {
  const {
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
  } = useResearchDesk();

  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');

  // Rename active board state
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [editBoardName, setEditBoardName] = useState('');
  const [editBoardDesc, setEditBoardDesc] = useState('');

  // Quick-add entity to active board
  const [pickerValue, setPickerValue] = useState<string>(`place:${PLACES[0]!.id}`);
  const [pickerPinNote, setPickerPinNote] = useState('');

  // Note editor state
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>(undefined);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Investigation question input
  const [questionInput, setQuestionInput] = useState('');

  // JSON Import Dialog & state
  const importDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const [rawImportText, setRawImportText] = useState('');
  const [importFeedback, setImportFeedback] =
    useState<BoardImportValidationResult | null>(null);

  const activeBoard =
    desk.boards.find((b) => b.id === desk.activeBoardId) ??
    desk.boards[0] ??
    null;

  const bookmarkedPlaces = desk.bookmarkedPlaceIds
    .map((id) => getPlaceById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const savedArtifacts = desk.savedArtifactIds
    .map((id) => getArtifactById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    addNewBoard(newBoardName, newBoardDesc);
    setNewBoardName('');
    setNewBoardDesc('');
  };

  const startBoardRename = () => {
    if (!activeBoard) return;
    setEditBoardName(activeBoard.name);
    setEditBoardDesc(activeBoard.description);
    setIsEditingBoard(true);
  };

  const handleBoardRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBoard || !editBoardName.trim()) return;
    updateBoardDetails(activeBoard.id, editBoardName, editBoardDesc);
    setIsEditingBoard(false);
  };

  const handleQuickAddEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBoard || !pickerValue) return;
    const [typePart, idPart] = pickerValue.split(':');
    if ((typePart !== 'place' && typePart !== 'artifact') || !idPart) return;
    const label =
      typePart === 'place'
        ? getPlaceById(idPart)?.name ?? idPart
        : getArtifactById(idPart)?.title ?? idPart;
    pinEntityToBoard(activeBoard.id, typePart, idPart, label, pickerPinNote);
    setPickerPinNote('');
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBoard || !noteContent.trim()) return;
    saveNoteOnBoard(activeBoard.id, {
      id: editingNoteId,
      title: noteTitle,
      content: noteContent,
    });
    setEditingNoteId(undefined);
    setNoteTitle('');
    setNoteContent('');
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBoard || !questionInput.trim()) return;
    addQuestionToBoard(activeBoard.id, questionInput);
    setQuestionInput('');
  };

  const handleExportActiveBoard = () => {
    if (!activeBoard) return;
    const json = exportBoardJson(activeBoard.id);
    if (!json) return;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const slug = activeBoard.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `unfinished-atlas-board-${slug || 'export'}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    notify(`Downloaded "${activeBoard.name}" as JSON.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      setRawImportText(content);
      setImportFeedback(null);
    };
    reader.onerror = () => {
      setImportFeedback({
        ok: false,
        warnings: [],
        error: 'Could not read the selected file from disk.',
      });
    };
    reader.readAsText(file);
  };

  const handleValidateAndImport = (e: React.FormEvent) => {
    e.preventDefault();
    const res = importBoardJson(rawImportText);
    setImportFeedback(res);
    if (res.ok && res.warnings.length === 0) {
      setRawImportText('');
      importDialogRef.current?.close();
    }
  };

  if (!isHydrated) {
    return (
      <div
        style={{
          paddingBlock: '2.5rem',
          color: 'var(--ink-secondary)',
          fontFamily: 'var(--font-catalogue)',
        }}
      >
        LOADING LOCAL RESEARCH DESK FROM BROWSER STORAGE…
      </div>
    );
  }

  return (
    <div style={{ paddingBlock: '1.5rem 3rem', display: 'grid', gap: '2rem' }}>
      {/* Local-Only Storage Disclosure & Error Banner */}
      <div
        style={{
          padding: '0.9rem 1.15rem',
          background: storageError
            ? 'var(--terracotta-tint)'
            : 'var(--paper-vellum)',
          border: `1px solid ${
            storageError ? 'var(--accent-terracotta)' : 'var(--rule-strong)'
          }`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem',
          fontSize: 'var(--text-body-sm)',
        }}
      >
        <div>
          <strong className="catalogue-code">
            {storageAvailable
              ? 'LOCAL BROWSER WORKSPACE (NO ACCOUNT OR CLOUD SYNC)'
              : 'STORAGE RESTRICTED'}
          </strong>
          <p style={{ marginBlockStart: '0.2rem', color: 'var(--ink-secondary)' }}>
            {storageError ??
              'Your bookmarks, boards, notes, and open questions are saved exclusively in this browser’s localStorage. Export boards as JSON files whenever you wish to archive or transfer your work.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setImportFeedback(null);
            importDialogRef.current?.showModal();
          }}
          className="btn-archival btn-secondary"
        >
          Import Board (.JSON)
        </button>
      </div>

      {/* Saved Tray: Bookmarked Places & Saved Artifacts */}
      <section
        aria-labelledby="saved-tray-heading"
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 21rem), 1fr))',
          gap: '1.35rem',
        }}
      >
        {/* Bookmarked Places */}
        <div
          style={{
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
            padding: '1.25rem',
          }}
        >
          <span className="catalogue-code">SAVED PLACES TRAY</span>
          <h2
            id="saved-tray-heading"
            style={{ fontSize: 'var(--text-h3)', marginBlock: '0.2rem 0.85rem' }}
          >
            Bookmarked Places ({bookmarkedPlaces.length})
          </h2>

          {bookmarkedPlaces.length === 0 ? (
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--ink-secondary)',
              }}
            >
              No places bookmarked yet. Visit the{' '}
              <Link href="/explore">Interactive Atlas</Link> to bookmark sites
              for comparison.
            </p>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '0.6rem',
              }}
            >
              {bookmarkedPlaces.map((pl) => (
                <li
                  key={pl.id}
                  style={{
                    padding: '0.7rem 0.85rem',
                    background: 'var(--paper-warm)',
                    border: '1px solid var(--rule-fine)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div>
                    <span className="catalogue-code">
                      {pl.catalogueRef} · {CATEGORY_LABELS[pl.category]}
                    </span>
                    <div>
                      <Link
                        href={`/places/${pl.slug}`}
                        style={{ fontWeight: 600 }}
                      >
                        {pl.name}
                      </Link>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {activeBoard && (
                      <button
                        type="button"
                        onClick={() =>
                          pinEntityToBoard(
                            activeBoard.id,
                            'place',
                            pl.id,
                            pl.name
                          )
                        }
                        className="btn-archival btn-secondary"
                        style={{
                          minHeight: '36px',
                          padding: '0.25rem 0.6rem',
                          fontSize: 'var(--text-caption)',
                        }}
                      >
                        + Active Board
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => togglePlaceBookmark(pl.id, pl.name)}
                      className="btn-archival btn-ghost"
                      aria-label={`Remove ${pl.name} from bookmarks`}
                      style={{
                        minHeight: '36px',
                        padding: '0.25rem 0.5rem',
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Saved Artifacts */}
        <div
          style={{
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
            padding: '1.25rem',
          }}
        >
          <span className="catalogue-code">SAVED SPECIMENS TRAY</span>
          <h2
            style={{ fontSize: 'var(--text-h3)', marginBlock: '0.2rem 0.85rem' }}
          >
            Saved Artifacts ({savedArtifacts.length})
          </h2>

          {savedArtifacts.length === 0 ? (
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--ink-secondary)',
              }}
            >
              No artifacts saved yet. Browse the{' '}
              <Link href="/artifacts">Artifact Cabinet</Link> to collect primary
              documents and plates.
            </p>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '0.6rem',
              }}
            >
              {savedArtifacts.map((art) => (
                <li
                  key={art.id}
                  style={{
                    padding: '0.7rem 0.85rem',
                    background: 'var(--paper-warm)',
                    border: '1px solid var(--rule-fine)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ maxWidth: '20rem' }}>
                    <span className="catalogue-code">
                      {art.catalogueRef} · {ARTIFACT_TYPE_LABELS[art.type]}
                    </span>
                    <div>
                      <Link
                        href={`/artifacts/${art.id}`}
                        style={{ fontWeight: 600, fontSize: 'var(--text-body-sm)' }}
                      >
                        {art.title}
                      </Link>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {activeBoard && (
                      <button
                        type="button"
                        onClick={() =>
                          pinEntityToBoard(
                            activeBoard.id,
                            'artifact',
                            art.id,
                            art.title
                          )
                        }
                        className="btn-archival btn-secondary"
                        style={{
                          minHeight: '36px',
                          padding: '0.25rem 0.6rem',
                          fontSize: 'var(--text-caption)',
                        }}
                      >
                        + Active Board
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleArtifactSave(art.id, art.title)}
                      className="btn-archival btn-ghost"
                      aria-label={`Remove ${art.title} from saved artifacts`}
                      style={{
                        minHeight: '36px',
                        padding: '0.25rem 0.5rem',
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Investigation Boards Manager */}
      <section
        aria-labelledby="boards-workspace-heading"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          paddingBlockStart: '1rem',
          borderBlockStart: '1.5px solid var(--ink-primary)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span className="catalogue-code">NAMED INVESTIGATION BOARDS</span>
            <h2 id="boards-workspace-heading" style={{ marginBlockStart: '0.2rem' }}>
              Board Dossiers, Field Notes &amp; Open Questions
            </h2>
          </div>
        </div>

        {/* Board Switcher + Create New Board Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              background: 'var(--paper-chalk)',
              border: '1px solid var(--rule-strong)',
              padding: '1.15rem',
              display: 'grid',
              gap: '0.65rem',
            }}
          >
            <span className="catalogue-code">
              YOUR BOARDS ({desk.boards.length})
            </span>
            {desk.boards.length === 0 ? (
              <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--ink-secondary)' }}>
                No boards remain. Create a new named investigation board in the
                adjacent form or import a JSON dossier.
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '0.45rem' }}>
                {desk.boards.map((b) => {
                  const isActive = activeBoard?.id === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setActiveBoard(b.id);
                        setIsEditingBoard(false);
                      }}
                      aria-pressed={isActive}
                      style={{
                        textAlign: 'start',
                        padding: '0.75rem 0.9rem',
                        background: isActive
                          ? 'var(--paper-vellum)'
                          : 'var(--paper-warm)',
                        border: isActive
                          ? '2px solid var(--accent-terracotta)'
                          : '1px solid var(--rule-strong)',
                        borderRadius: 'var(--radius-sharp)',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      <strong style={{ display: 'block', color: 'var(--ink-primary)' }}>
                        {b.name}
                      </strong>
                      <span className="catalogue-code">
                        {b.items.length} pinned · {b.notes.length} notes ·{' '}
                        {b.questions.length} questions
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <form
            onSubmit={handleCreateBoard}
            style={{
              background: 'var(--paper-chalk)',
              border: '1px solid var(--rule-strong)',
              padding: '1.15rem',
              display: 'grid',
              gap: '0.75rem',
            }}
          >
            <span className="catalogue-code">START NEW INVESTIGATION BOARD</span>
            <div>
              <label htmlFor="new-board-name" className="archival-label">
                Board Title (Required)
              </label>
              <input
                id="new-board-name"
                type="text"
                required
                className="archival-input"
                placeholder="e.g., Unbuilt Viaducts & Subterranean Cuts"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="new-board-desc" className="archival-label">
                Scope / Hypothesis
              </label>
              <input
                id="new-board-desc"
                type="text"
                className="archival-input"
                placeholder="Brief research premise…"
                value={newBoardDesc}
                onChange={(e) => setNewBoardDesc(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn-archival">
                Create Investigation Board
              </button>
            </div>
          </form>
        </div>

        {/* Active Board Workspace */}
        {activeBoard && (
          <div
            style={{
              background: 'var(--paper-chalk)',
              border: '1.5px solid var(--ink-primary)',
              padding: 'clamp(1.15rem, 2.5vw, 1.85rem)',
              display: 'grid',
              gap: '1.75rem',
            }}
          >
            {/* Active Board Header, Rename & Export/Delete */}
            <div
              style={{
                paddingBlockEnd: '1.15rem',
                borderBlockEnd: '1px solid var(--rule-strong)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {isEditingBoard ? (
                <form
                  onSubmit={handleBoardRenameSubmit}
                  style={{
                    display: 'grid',
                    gap: '0.65rem',
                    flex: '1 1 22rem',
                  }}
                >
                  <div>
                    <label htmlFor="edit-board-name" className="archival-label">
                      Rename Board Title
                    </label>
                    <input
                      id="edit-board-name"
                      type="text"
                      required
                      className="archival-input"
                      value={editBoardName}
                      onChange={(e) => setEditBoardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-board-desc" className="archival-label">
                      Edit Scope Description
                    </label>
                    <input
                      id="edit-board-desc"
                      type="text"
                      className="archival-input"
                      value={editBoardDesc}
                      onChange={(e) => setEditBoardDesc(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" className="btn-archival">
                      Save Board Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingBoard(false)}
                      className="btn-archival btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <span
                    className="catalogue-code"
                    style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}
                  >
                    ACTIVE BOARD · UPDATED{' '}
                    {activeBoard.updatedAt.slice(0, 10)}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-h2)', marginBlock: '0.2rem 0.35rem' }}>
                    {activeBoard.name}
                  </h3>
                  {activeBoard.description && (
                    <p style={{ color: 'var(--ink-secondary)', fontSize: 'var(--text-body-sm)' }}>
                      {activeBoard.description}
                    </p>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {!isEditingBoard && (
                  <button
                    type="button"
                    onClick={startBoardRename}
                    className="btn-archival btn-secondary"
                  >
                    Rename / Edit
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleExportActiveBoard}
                  className="btn-archival"
                >
                  Export Board (.JSON)
                </button>
                <button
                  type="button"
                  onClick={() => deleteDialogRef.current?.showModal()}
                  className="btn-archival btn-secondary"
                  style={{ color: 'var(--accent-terracotta)' }}
                >
                  Delete Board
                </button>
              </div>
            </div>

            {/* Pinned Places & Artifacts with Reorder & Remove */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              <h4 style={{ fontSize: 'var(--text-h3)' }}>
                1. Pinned Places &amp; Artifacts ({activeBoard.items.length})
              </h4>

              <form
                onSubmit={handleQuickAddEntity}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
                  gap: '0.65rem',
                  alignItems: 'end',
                  padding: '0.9rem',
                  background: 'var(--paper-warm)',
                  border: '1px solid var(--rule-fine)',
                }}
              >
                <div>
                  <label htmlFor="desk-entity-picker" className="archival-label">
                    Add Record from Archive
                  </label>
                  <select
                    id="desk-entity-picker"
                    className="archival-select"
                    value={pickerValue}
                    onChange={(e) => setPickerValue(e.target.value)}
                  >
                    <optgroup label="Places (8)">
                      {PLACES.map((p) => (
                        <option key={p.id} value={`place:${p.id}`}>
                          {p.catalogueRef} · {p.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Artifacts (28)">
                      {ARTIFACTS.map((a) => (
                        <option key={a.id} value={`artifact:${a.id}`}>
                          {a.catalogueRef} · {a.title.slice(0, 48)}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label htmlFor="desk-pin-note" className="archival-label">
                    Pin Annotation (Optional)
                  </label>
                  <input
                    id="desk-pin-note"
                    type="text"
                    className="archival-input"
                    placeholder="Why this record matters to the board…"
                    value={pickerPinNote}
                    onChange={(e) => setPickerPinNote(e.target.value)}
                  />
                </div>

                <div>
                  <button type="submit" className="btn-archival">
                    Pin to Active Board
                  </button>
                </div>
              </form>

              {activeBoard.items.length === 0 ? (
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  This board currently holds no pinned items. Select a place or
                  artifact above—or click “Pin to Board” on any dossier page.
                </p>
              ) : (
                <ol
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'grid',
                    gap: '0.6rem',
                  }}
                >
                  {activeBoard.items.map((item, idx) => {
                    const place =
                      item.entityType === 'place'
                        ? getPlaceById(item.entityId)
                        : undefined;
                    const artifact =
                      item.entityType === 'artifact'
                        ? getArtifactById(item.entityId)
                        : undefined;
                    const title =
                      place?.name ?? artifact?.title ?? item.entityId;
                    const refCode =
                      place?.catalogueRef ?? artifact?.catalogueRef ?? 'REF';
                    const href = place
                      ? `/places/${place.slug}`
                      : `/artifacts/${item.entityId}`;

                    return (
                      <li
                        key={item.id}
                        style={{
                          padding: '0.85rem 1rem',
                          background: 'var(--paper-warm)',
                          border: '1px solid var(--rule-strong)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.75rem',
                        }}
                      >
                        <div>
                          <span className="catalogue-code">
                            #{idx + 1} · {item.entityType.toUpperCase()} ·{' '}
                            {refCode}
                          </span>
                          <div style={{ fontWeight: 600 }}>
                            <Link href={href}>{title}</Link>
                          </div>
                          {item.pinNote && (
                            <p
                              style={{
                                fontSize: 'var(--text-caption)',
                                color: 'var(--ink-secondary)',
                                marginBlockStart: '0.2rem',
                              }}
                            >
                              Margin note: {item.pinNote}
                            </p>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              moveBoardItem(activeBoard.id, item.id, 'up')
                            }
                            className="btn-archival btn-secondary"
                            aria-label={`Move ${title} up`}
                            style={{ minHeight: '38px', padding: '0.25rem 0.6rem' }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            disabled={idx === activeBoard.items.length - 1}
                            onClick={() =>
                              moveBoardItem(activeBoard.id, item.id, 'down')
                            }
                            className="btn-archival btn-secondary"
                            aria-label={`Move ${title} down`}
                            style={{ minHeight: '38px', padding: '0.25rem 0.6rem' }}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              unpinItemFromBoard(activeBoard.id, item.id)
                            }
                            className="btn-archival btn-secondary"
                            aria-label={`Remove ${title} from board`}
                            style={{
                              minHeight: '38px',
                              padding: '0.25rem 0.65rem',
                              fontSize: 'var(--text-caption)',
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            {/* 2. Research Notes & 3. Open Investigation Questions */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 21rem), 1fr))',
                gap: '1.5rem',
                paddingBlockStart: '1.25rem',
                borderBlockStart: '1px solid var(--rule-strong)',
              }}
            >
              {/* Research Notes */}
              <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
                <h4 style={{ fontSize: 'var(--text-h3)' }}>
                  2. Personal Research Notes ({activeBoard.notes.length})
                </h4>

                <form
                  onSubmit={handleNoteSubmit}
                  style={{ display: 'grid', gap: '0.65rem' }}
                >
                  <div>
                    <label htmlFor="note-title" className="archival-label">
                      Note Heading
                    </label>
                    <input
                      id="note-title"
                      type="text"
                      className="archival-input"
                      placeholder="e.g., Discrepancy in 1961 Vacancy Statistics"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="note-body" className="archival-label">
                      Observation / Synthesis (Required)
                    </label>
                    <textarea
                      id="note-body"
                      required
                      className="archival-textarea"
                      placeholder="Write your research synthesis, source comparison, or field hypothesis…"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" className="btn-archival">
                      {editingNoteId ? 'Update Note' : 'Save Research Note'}
                    </button>
                    {editingNoteId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNoteId(undefined);
                          setNoteTitle('');
                          setNoteContent('');
                        }}
                        className="btn-archival btn-secondary"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                {activeBoard.notes.map((nt) => (
                  <article
                    key={nt.id}
                    style={{
                      padding: '1rem',
                      background: 'var(--paper-warm)',
                      border: '1px solid var(--rule-strong)',
                      display: 'grid',
                      gap: '0.45rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                      }}
                    >
                      <strong>{nt.title}</strong>
                      <span className="catalogue-code">
                        {nt.updatedAt.slice(0, 10)}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {nt.content}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNoteId(nt.id);
                          setNoteTitle(nt.title);
                          setNoteContent(nt.content);
                        }}
                        className="btn-archival btn-secondary"
                        style={{
                          minHeight: '36px',
                          padding: '0.2rem 0.65rem',
                          fontSize: 'var(--text-caption)',
                        }}
                      >
                        Edit Note
                      </button>
                      <button
                        type="button"
                        onClick={() => removeNoteFromBoard(activeBoard.id, nt.id)}
                        className="btn-archival btn-ghost"
                        style={{
                          minHeight: '36px',
                          padding: '0.2rem 0.65rem',
                          fontSize: 'var(--text-caption)',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Open Investigation Questions */}
              <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
                <h4 style={{ fontSize: 'var(--text-h3)' }}>
                  3. Questions to Investigate ({activeBoard.questions.length})
                </h4>

                <form
                  onSubmit={handleQuestionSubmit}
                  style={{ display: 'grid', gap: '0.65rem' }}
                >
                  <div>
                    <label htmlFor="question-prompt" className="archival-label">
                      Log an Unanswered Question
                    </label>
                    <input
                      id="question-prompt"
                      type="text"
                      required
                      className="archival-input"
                      placeholder="e.g., Where were the 24 cast-iron capitals hauled on Lorry 7?"
                      value={questionInput}
                      onChange={(e) => setQuestionInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn-archival btn-secondary">
                      Add Investigation Question
                    </button>
                  </div>
                </form>

                {activeBoard.questions.length === 0 ? (
                  <p
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    No questions logged on this board yet.
                  </p>
                ) : (
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'grid',
                      gap: '0.6rem',
                    }}
                  >
                    {activeBoard.questions.map((q) => (
                      <li
                        key={q.id}
                        style={{
                          padding: '0.85rem 1rem',
                          background: 'var(--paper-warm)',
                          border: '1px solid var(--rule-strong)',
                          display: 'grid',
                          gap: '0.5rem',
                        }}
                      >
                        <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>
                          {q.prompt}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              advanceQuestionStatus(activeBoard.id, q.id)
                            }
                            className="btn-archival btn-secondary"
                            style={{
                              minHeight: '36px',
                              padding: '0.2rem 0.65rem',
                              fontSize: 'var(--text-caption)',
                            }}
                          >
                            Status:{' '}
                            {q.status === 'open'
                              ? 'Open (click to advance)'
                              : q.status === 'investigating'
                                ? 'Investigating'
                                : 'Resolved in Notes'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              deleteQuestionFromBoard(activeBoard.id, q.id)
                            }
                            className="btn-archival btn-ghost"
                            style={{
                              minHeight: '36px',
                              padding: '0.2rem 0.55rem',
                              fontSize: 'var(--text-caption)',
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Delete Board Confirmation Dialog */}
      <dialog
        ref={deleteDialogRef}
        aria-labelledby="del-board-title"
      >
        <div style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
          <h2 id="del-board-title" style={{ fontSize: 'var(--text-h3)' }}>
            Delete “{activeBoard?.name}” from local storage?
          </h2>
          <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--ink-secondary)' }}>
            This removes the board, its pinned sequence, and its notes from this
            browser. Export the board as JSON first if you may need it later.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
            <button
              type="button"
              autoFocus
              onClick={() => deleteDialogRef.current?.close()}
              className="btn-archival btn-secondary"
            >
              Keep Board
            </button>
            <button
              type="button"
              onClick={() => {
                if (activeBoard) removeBoard(activeBoard.id);
                deleteDialogRef.current?.close();
              }}
              className="btn-archival btn-terracotta"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </dialog>

      {/* Validated JSON Import Dialog */}
      <dialog
        ref={importDialogRef}
        aria-labelledby="import-board-title"
        onPointerDown={(e) => {
          const dlg = importDialogRef.current;
          if (!dlg) return;
          const r = dlg.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          ) {
            dlg.close();
          }
        }}
      >
        <div style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <span className="catalogue-code">SCHEMA VALIDATED IMPORT</span>
              <h2 id="import-board-title" style={{ fontSize: 'var(--text-h3)' }}>
                Import an Exported Investigation Board
              </h2>
            </div>
            <button
              type="button"
              onClick={() => importDialogRef.current?.close()}
              className="btn-archival btn-ghost"
              aria-label="Close import dialog"
            >
              <CloseCrossIcon size={18} />
            </button>
          </div>

          <form onSubmit={handleValidateAndImport} style={{ display: 'grid', gap: '0.85rem' }}>
            <div>
              <label htmlFor="json-file-input" className="archival-label">
                Select Exported .JSON File
              </label>
              <input
                id="json-file-input"
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="archival-input"
              />
            </div>

            <div>
              <label htmlFor="json-paste-area" className="archival-label">
                Or Paste Board JSON Payload Directly
              </label>
              <textarea
                id="json-paste-area"
                className="archival-textarea"
                placeholder='{"atlasExportFormat": "unfinished-atlas-board-v1", "board": { ... }}'
                value={rawImportText}
                onChange={(e) => {
                  setRawImportText(e.target.value);
                  setImportFeedback(null);
                }}
              />
            </div>

            {importFeedback && !importFeedback.ok && (
              <div
                role="alert"
                style={{
                  padding: '0.8rem',
                  background: 'var(--terracotta-tint)',
                  color: 'var(--accent-terracotta)',
                  border: '1px solid var(--accent-terracotta)',
                  fontSize: 'var(--text-body-sm)',
                }}
              >
                <strong>Import Rejected:</strong> {importFeedback.error}
              </div>
            )}

            {importFeedback &&
              importFeedback.ok &&
              importFeedback.warnings.length > 0 && (
                <div
                  role="status"
                  style={{
                    padding: '0.8rem',
                    background: 'var(--olive-tint)',
                    color: 'var(--olive-text)',
                    border: '1px solid var(--olive-mark)',
                    fontSize: 'var(--text-body-sm)',
                  }}
                >
                  <strong>
                    Board Imported with {importFeedback.warnings.length}{' '}
                    Sanitization Notice(s):
                  </strong>
                  <ul style={{ margin: '0.35rem 0 0', paddingInlineStart: '1.1rem' }}>
                    {importFeedback.warnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => importDialogRef.current?.close()}
                className="btn-archival btn-secondary"
              >
                Close
              </button>
              <button type="submit" className="btn-archival">
                Validate &amp; Import Board
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
