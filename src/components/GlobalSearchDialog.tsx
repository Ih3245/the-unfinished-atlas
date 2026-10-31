'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAllEntities } from '@/lib/search';
import type { SearchEntityType } from '@/types/atlas';
import { HighlightedText } from './HighlightedText';
import { SearchLensIcon, CloseCrossIcon } from './ArchivalIcons';

const SUGGESTED_QUERIES = [
  'Vermillion',
  'Solís',
  '1938',
  'peat subsidence',
  'Locks 8 & 9',
  'FONDS-AWB-38',
];

const CATEGORY_TABS: { value: SearchEntityType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Records' },
  { value: 'place', label: 'Places' },
  { value: 'artifact', label: 'Artifacts' },
  { value: 'event', label: 'Events' },
  { value: 'person', label: 'People' },
  { value: 'period', label: 'Periods' },
  { value: 'source', label: 'Sources' },
];

export function GlobalSearchDialog({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchEntityType | 'all'>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(
    () => searchAllEntities(query, category).slice(0, 12),
    [query, category]
  );

  // Global keyboard shortcut: '/' or Ctrl/Cmd + K
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!dialogRef.current?.open) {
          dialogRef.current?.showModal();
          inputRef.current?.focus();
        }
      } else if (e.key === '/' && !inEditable && !dialogRef.current?.open) {
        e.preventDefault();
        dialogRef.current?.showModal();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [dialogRef]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      const chosen = results[activeIndex] ?? results[0];
      if (chosen) {
        e.preventDefault();
        dialogRef.current?.close();
        router.push(chosen.href);
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="global-search-heading"
      onPointerDown={(e) => {
        const dlg = dialogRef.current;
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
      style={{ maxWidth: 'min(48rem, calc(100% - 1.25rem))' }}
    >
      <div style={{ padding: '1.25rem 1.4rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            marginBlockEnd: '0.85rem',
          }}
        >
          <div>
            <span className="catalogue-code">
              INDEX DISCOVERY · PLACES, ARTIFACTS, EVENTS, PEOPLE, PERIODS & SOURCES
            </span>
            <h2 id="global-search-heading" style={{ fontSize: 'var(--text-h3)' }}>
              Search the Archive
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="btn-archival btn-ghost"
            aria-label="Close global search dialog"
          >
            <CloseCrossIcon size={18} />
          </button>
        </div>

        <div style={{ position: 'relative', marginBlockEnd: '0.75rem' }}>
          <label htmlFor="global-search-input" className="archival-label">
            Query by name, catalogue code, date, material, or historical subject
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              ref={inputRef}
              id="global-search-input"
              type="search"
              autoFocus
              className="archival-input"
              placeholder="e.g., Vermillion, Solís, 1938, FONDS-AWB-38…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              aria-controls="global-search-results"
              aria-activedescendant={
                results[activeIndex]
                  ? `search-opt-${results[activeIndex]!.id}`
                  : undefined
              }
            />
            <Link
              href={query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search'}
              onClick={() => dialogRef.current?.close()}
              className="btn-archival btn-secondary"
              style={{ flexShrink: 0 }}
            >
              <SearchLensIcon size={15} />
              <span>Full Index</span>
            </Link>
          </div>
        </div>

        {/* Entity Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter search results by record type"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            paddingBlockEnd: '0.75rem',
            borderBlockEnd: '1px solid var(--rule-fine)',
          }}
        >
          {CATEGORY_TABS.map((tab) => {
            const active = category === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCategory(tab.value);
                  setActiveIndex(0);
                }}
                style={{
                  minHeight: '36px',
                  padding: '0.3rem 0.65rem',
                  fontFamily: 'var(--font-catalogue)',
                  fontSize: '0.74rem',
                  border: active
                    ? '1px solid var(--ink-primary)'
                    : '1px solid var(--rule-fine)',
                  background: active ? 'var(--ink-primary)' : 'var(--paper-warm)',
                  color: active ? 'var(--paper-chalk)' : 'var(--ink-primary)',
                  borderRadius: 'var(--radius-sharp)',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Results / Suggestions */}
        <div
          id="global-search-results"
          role="listbox"
          aria-label="Matching archival records"
          style={{
            maxHeight: '22rem',
            overflowY: 'auto',
            marginBlockStart: '0.75rem',
          }}
        >
          {!query.trim() ? (
            <div style={{ paddingBlock: '0.5rem' }}>
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--ink-secondary)',
                  marginBlockEnd: '0.65rem',
                }}
              >
                Try an archival query or use ↑ / ↓ arrow keys to step through matches:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {SUGGESTED_QUERIES.map((sq) => (
                  <button
                    key={sq}
                    type="button"
                    onClick={() => {
                      setQuery(sq);
                      setActiveIndex(0);
                      inputRef.current?.focus();
                    }}
                    className="btn-archival btn-secondary"
                    style={{
                      minHeight: '38px',
                      padding: '0.3rem 0.7rem',
                      fontSize: 'var(--text-caption)',
                    }}
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div
              style={{
                padding: '1.5rem 1rem',
                background: 'var(--paper-warm)',
                border: '1px solid var(--rule-fine)',
              }}
            >
              <p style={{ fontWeight: 600, marginBlockEnd: '0.35rem' }}>
                No archival records match “{query}”
                {category !== 'all' ? ` within ${category} records` : ''}.
              </p>
              <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--ink-secondary)' }}>
                Broaden the record category tab above, check spelling, or browse the{' '}
                <Link
                  href="/explore"
                  onClick={() => dialogRef.current?.close()}
                  style={{ fontWeight: 600 }}
                >
                  Interactive Atlas
                </Link>{' '}
                and{' '}
                <Link
                  href="/artifacts"
                  onClick={() => dialogRef.current?.close()}
                  style={{ fontWeight: 600 }}
                >
                  Artifact Cabinet
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '0.45rem',
              }}
            >
              {results.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <li
                    key={`${item.entityType}-${item.id}`}
                    id={`search-opt-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <Link
                      href={item.href}
                      onClick={() => dialogRef.current?.close()}
                      onMouseEnter={() => setActiveIndex(idx)}
                      style={{
                        display: 'block',
                        padding: '0.75rem 0.9rem',
                        textDecoration: 'none',
                        background: isSelected
                          ? 'var(--paper-vellum)'
                          : 'var(--paper-warm)',
                        border: isSelected
                          ? '1px solid var(--accent-terracotta)'
                          : '1px solid var(--rule-fine)',
                        borderRadius: 'var(--radius-sharp)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBlockEnd: '0.2rem',
                        }}
                      >
                        <span className="catalogue-code">
                          {item.catalogueRef} · {item.entityBadge}
                        </span>
                        <span
                          className="catalogue-code"
                          style={{ color: 'var(--accent-terracotta)' }}
                        >
                          Open dossier
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-editorial)',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: 'var(--ink-primary)',
                        }}
                      >
                        <HighlightedText text={item.title} query={query} />
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--ink-secondary)',
                          marginBlockStart: '0.15rem',
                        }}
                      >
                        <HighlightedText text={item.snippet} query={query} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  );
}
