'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { SearchEntityType } from '@/types/atlas';
import { searchAllEntities } from '@/lib/search';
import { HighlightedText } from './HighlightedText';

const TABS: { value: SearchEntityType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Archive Records' },
  { value: 'place', label: 'Places' },
  { value: 'artifact', label: 'Artifacts' },
  { value: 'event', label: 'Events' },
  { value: 'person', label: 'People' },
  { value: 'period', label: 'Historical Periods' },
  { value: 'source', label: 'Source Fonds' },
];

const CURATED_TERMS = [
  'Vermillion',
  'Solís',
  'siltation',
  '1938',
  'Locks 8 & 9',
  'peat subsidence',
  'FONDS-MFA-1927',
  'Benali',
  'skyglow',
];

export function SearchPageClient({
  initialQuery = '',
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<SearchEntityType | 'all'>('all');

  const allMatches = useMemo(() => searchAllEntities(query, 'all'), [query]);
  const visibleMatches = useMemo(
    () =>
      activeTab === 'all'
        ? allMatches
        : allMatches.filter((m) => m.entityType === activeTab),
    [allMatches, activeTab]
  );

  const countByType = (t: SearchEntityType | 'all') =>
    t === 'all'
      ? allMatches.length
      : allMatches.filter((m) => m.entityType === t).length;

  return (
    <div style={{ paddingBlock: '1.5rem 3rem', display: 'grid', gap: '1.5rem' }}>
      <div
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--ink-primary)',
          padding: '1.35rem',
          display: 'grid',
          gap: '1rem',
        }}
      >
        <div>
          <label htmlFor="full-index-search" className="archival-label">
            Query Places, Artifacts, Events, People, Historical Periods &amp;
            Source Records
          </label>
          <input
            id="full-index-search"
            type="search"
            autoFocus
            className="archival-input"
            placeholder="Enter a place, person, year, accession code, or historical term…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div
          role="tablist"
          aria-label="Filter discovery results by record category"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.value;
            const c = countByType(tab.value);
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.value)}
                style={{
                  minHeight: '38px',
                  padding: '0.35rem 0.75rem',
                  fontFamily: 'var(--font-catalogue)',
                  fontSize: '0.75rem',
                  background: active ? 'var(--ink-primary)' : 'var(--paper-warm)',
                  color: active ? 'var(--paper-chalk)' : 'var(--ink-primary)',
                  border: '1px solid var(--rule-strong)',
                  borderRadius: 'var(--radius-sharp)',
                  cursor: 'pointer',
                }}
              >
                {tab.label} {query.trim() ? `(${c})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {!query.trim() ? (
        <div
          style={{
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
            padding: '1.5rem',
          }}
        >
          <span className="catalogue-code">SUGGESTED INDEX ENTRIES</span>
          <h2 style={{ fontSize: 'var(--text-h3)', marginBlock: '0.25rem 0.75rem' }}>
            Select a curated subject or type above to search all six archival
            tables
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CURATED_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="btn-archival btn-secondary"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : visibleMatches.length === 0 ? (
        <div
          style={{
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
            padding: '1.75rem',
          }}
        >
          <span className="catalogue-code">ZERO MATCHES</span>
          <h2 style={{ fontSize: 'var(--text-h3)', marginBlock: '0.25rem 0.5rem' }}>
            No archival entries match “{query}”
            {activeTab !== 'all' ? ` in ${activeTab} records` : ''}
          </h2>
          <p
            style={{
              color: 'var(--ink-secondary)',
              marginBlockEnd: '1rem',
              fontSize: 'var(--text-body-sm)',
            }}
          >
            {allMatches.length > 0
              ? `However, ${allMatches.length} match(es) exist in other record categories.`
              : 'Try searching by partial surname, four-digit year (e.g., 1938, 1973), or subject keyword.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {activeTab !== 'all' && allMatches.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className="btn-archival"
              >
                Show All {allMatches.length} Matches
              </button>
            )}
            <button
              type="button"
              onClick={() => setQuery('')}
              className="btn-archival btn-secondary"
            >
              Clear Query
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          <div className="catalogue-code" aria-live="polite">
            FOUND {visibleMatches.length} MATCHING RECORD(S) FOR “
            {query.toUpperCase()}”
          </div>

          {visibleMatches.map((item) => (
            <article
              key={`${item.entityType}-${item.id}`}
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.2rem 1.35rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ maxWidth: '48rem' }}>
                <div className="catalogue-code" style={{ marginBlockEnd: '0.2rem' }}>
                  <strong style={{ color: 'var(--accent-terracotta)' }}>
                    {item.catalogueRef}
                  </strong>{' '}
                  · {item.entityBadge} · {item.subtitle}
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBlockEnd: '0.35rem' }}>
                  <Link href={item.href}>
                    <HighlightedText text={item.title} query={query} />
                  </Link>
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  <HighlightedText text={item.snippet} query={query} />
                </p>
              </div>

              <Link
                href={item.href}
                className="btn-archival btn-secondary"
                style={{ alignSelf: 'center' }}
              >
                Open Record
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
