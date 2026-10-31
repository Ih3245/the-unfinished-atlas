'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ARTIFACTS,
  PLACES,
  PERIODS,
  ARTIFACT_TYPE_LABELS,
  CERTAINTY_LABELS,
} from '@/data';
import type {
  ArtifactType,
  CertaintyLevel,
  HistoricalEraId,
} from '@/types/atlas';
import {
  filterAndSortArtifacts,
  type ArtifactSortCriterion,
} from '@/lib/filters';
import { ArtifactPlateRenderer } from './ArtifactPlateRenderer';
import { SaveToDeskControls } from './SaveToDeskControls';

const ALL_TYPES = Object.keys(ARTIFACT_TYPE_LABELS) as ArtifactType[];
const ALL_CERTAINTIES: CertaintyLevel[] = [
  'documented',
  'approximate',
  'contested',
  'unattributed',
];

function toggleArrayItem<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function ArtifactCabinetClient() {
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ArtifactType[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [selectedEras, setSelectedEras] = useState<HistoricalEraId[]>([]);
  const [selectedCertainties, setSelectedCertainties] = useState<
    CertaintyLevel[]
  >([]);
  const [sort, setSort] = useState<ArtifactSortCriterion>('catalogue-asc');

  const filtered = useMemo(
    () =>
      filterAndSortArtifacts(ARTIFACTS, {
        query,
        types: selectedTypes,
        placeIds: selectedPlaces,
        eraIds: selectedEras,
        certainties: selectedCertainties,
        sort,
      }),
    [
      query,
      selectedTypes,
      selectedPlaces,
      selectedEras,
      selectedCertainties,
      sort,
    ]
  );

  const activeFilterCount =
    (query.trim() ? 1 : 0) +
    selectedTypes.length +
    selectedPlaces.length +
    selectedEras.length +
    selectedCertainties.length;

  const clearAll = () => {
    setQuery('');
    setSelectedTypes([]);
    setSelectedPlaces([]);
    setSelectedEras([]);
    setSelectedCertainties([]);
    setSort('catalogue-asc');
  };

  return (
    <div style={{ paddingBlock: '1.5rem 2.5rem', display: 'grid', gap: '1.5rem' }}>
      {/* Search, Sort & Multi-Select Facet Console */}
      <div
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--rule-strong)',
          padding: '1.25rem',
          display: 'grid',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
            gap: '1rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label htmlFor="cab-search" className="archival-label">
              Search Title, Transcription, Creator, or Provenance
            </label>
            <input
              id="cab-search"
              type="search"
              className="archival-input"
              placeholder="e.g., Vance, Baumé, undated, Lock 4, alder…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cab-sort" className="archival-label">
              Sort Cabinet Order
            </label>
            <select
              id="cab-sort"
              className="archival-select"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as ArtifactSortCriterion)
              }
            >
              <option value="catalogue-asc">Accession Number (UA-AR-01…)</option>
              <option value="date-asc">Chronological (Oldest; undated last)</option>
              <option value="date-desc">Chronological (Newest; undated last)</option>
              <option value="title-asc">Title (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Multi-Select Filter Group 1: Artifact Mediums */}
        <div>
          <span className="archival-label">
            Artifact Mediums (Multi-Select)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {ALL_TYPES.map((t) => {
              const active = selectedTypes.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setSelectedTypes((prev) => toggleArrayItem(prev, t))
                  }
                  style={{
                    minHeight: '38px',
                    padding: '0.35rem 0.7rem',
                    fontFamily: 'var(--font-catalogue)',
                    fontSize: '0.75rem',
                    background: active
                      ? 'var(--ink-primary)'
                      : 'var(--paper-warm)',
                    color: active ? 'var(--paper-chalk)' : 'var(--ink-primary)',
                    border: active
                      ? '1px solid var(--ink-primary)'
                      : '1px solid var(--rule-strong)',
                    borderRadius: 'var(--radius-sharp)',
                    cursor: 'pointer',
                  }}
                >
                  {active ? '✓ ' : ''}
                  {ARTIFACT_TYPE_LABELS[t]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Select Filter Group 2: Associated Places & Date/Attribution Certainty */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
            gap: '1rem',
            paddingBlockStart: '0.75rem',
            borderBlockStart: '1px solid var(--rule-fine)',
          }}
        >
          <div>
            <span className="archival-label">
              Associated Places (Multi-Select)
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {PLACES.map((pl) => {
                const active = selectedPlaces.includes(pl.id);
                return (
                  <button
                    key={pl.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedPlaces((prev) => toggleArrayItem(prev, pl.id))
                    }
                    style={{
                      minHeight: '36px',
                      padding: '0.28rem 0.6rem',
                      fontFamily: 'var(--font-catalogue)',
                      fontSize: '0.72rem',
                      background: active
                        ? 'var(--accent-terracotta)'
                        : 'var(--paper-warm)',
                      color: active
                        ? 'var(--paper-chalk)'
                        : 'var(--ink-primary)',
                      border: active
                        ? '1px solid var(--accent-terracotta)'
                        : '1px solid var(--rule-strong)',
                      borderRadius: 'var(--radius-sharp)',
                      cursor: 'pointer',
                    }}
                  >
                    {active ? '✓ ' : ''}
                    {pl.catalogueRef} · {pl.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="archival-label">
              Dating &amp; Attribution Certainty (Multi-Select)
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {ALL_CERTAINTIES.map((cert) => {
                const active = selectedCertainties.includes(cert);
                return (
                  <button
                    key={cert}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedCertainties((prev) =>
                        toggleArrayItem(prev, cert)
                      )
                    }
                    style={{
                      minHeight: '36px',
                      padding: '0.28rem 0.6rem',
                      fontFamily: 'var(--font-catalogue)',
                      fontSize: '0.72rem',
                      background: active
                        ? 'var(--olive-text)'
                        : 'var(--paper-warm)',
                      color: active
                        ? 'var(--paper-chalk)'
                        : 'var(--ink-primary)',
                      border: active
                        ? '1px solid var(--olive-text)'
                        : '1px solid var(--rule-strong)',
                      borderRadius: 'var(--radius-sharp)',
                      cursor: 'pointer',
                    }}
                  >
                    {active ? '✓ ' : ''}
                    {CERTAINTY_LABELS[cert]}
                  </button>
                );
              })}
            </div>

            <span
              className="archival-label"
              style={{ marginBlockStart: '0.65rem' }}
            >
              Historical Era (Multi-Select)
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {PERIODS.map((era) => {
                const active = selectedEras.includes(era.id);
                return (
                  <button
                    key={era.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedEras((prev) => toggleArrayItem(prev, era.id))
                    }
                    style={{
                      minHeight: '36px',
                      padding: '0.25rem 0.55rem',
                      fontFamily: 'var(--font-catalogue)',
                      fontSize: '0.71rem',
                      background: active
                        ? 'var(--ink-primary)'
                        : 'var(--paper-warm)',
                      color: active
                        ? 'var(--paper-chalk)'
                        : 'var(--ink-primary)',
                      border: '1px solid var(--rule-strong)',
                      borderRadius: 'var(--radius-sharp)',
                      cursor: 'pointer',
                    }}
                  >
                    {active ? '✓ ' : ''}
                    {era.spanLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Result Count & Clear Filters Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingBlockStart: '0.75rem',
            borderBlockStart: '1px solid var(--rule-fine)',
          }}
        >
          <span className="catalogue-code" aria-live="polite">
            DISPLAYING {filtered.length} OF {ARTIFACTS.length} ARCHIVAL
            SPECIMENS
            {activeFilterCount > 0
              ? ` (${activeFilterCount} ACTIVE FILTERS)`
              : ''}
          </span>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="btn-archival btn-secondary"
              style={{ minHeight: '38px', padding: '0.35rem 0.8rem' }}
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Specimens Grid with Medium-Specific Renderings */}
      {filtered.length === 0 ? (
        <div
          style={{
            padding: '2.25rem',
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
          }}
        >
          <span className="catalogue-code">NO MATCHING SPECIMENS</span>
          <h2 style={{ marginBlock: '0.35rem 0.65rem' }}>
            No artifacts satisfy all selected cabinet facets
          </h2>
          <p
            style={{
              color: 'var(--ink-secondary)',
              marginBlockEnd: '1.25rem',
            }}
          >
            Deselect one or more medium or certainty chips above, or reset the
            cabinet to examine all twenty-eight archival items.
          </p>
          <button type="button" onClick={clearAll} className="btn-archival">
            Reset Cabinet Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 21rem), 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {filtered.map((art) => {
            const place = PLACES.find((p) => p.id === art.placeId);
            const hasUncertainMeta =
              art.dateCertainty !== 'documented' ||
              art.attributionCertainty !== 'documented' ||
              art.yearSort === null;

            return (
              <article
                key={art.id}
                style={{
                  background: 'var(--paper-chalk)',
                  border: '1px solid var(--rule-strong)',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.9rem',
                }}
              >
                <div style={{ display: 'grid', gap: '0.8rem' }}>
                  <ArtifactPlateRenderer artifact={art} />

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                      }}
                      className="catalogue-code"
                    >
                      <span>
                        {art.catalogueRef} · {ARTIFACT_TYPE_LABELS[art.type]}
                      </span>
                      <span
                        style={{
                          color: hasUncertainMeta
                            ? 'var(--accent-terracotta)'
                            : undefined,
                          fontWeight: hasUncertainMeta ? 700 : 400,
                        }}
                      >
                        {art.dateDisplay}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: '1.16rem',
                        marginBlock: '0.3rem 0.4rem',
                      }}
                    >
                      <Link href={`/artifacts/${art.id}`}>{art.title}</Link>
                    </h2>

                    <p
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--ink-secondary)',
                        marginBlockEnd: '0.5rem',
                      }}
                    >
                      {art.summary}
                    </p>

                    <div
                      style={{
                        fontSize: 'var(--text-caption)',
                        color: 'var(--ink-secondary)',
                      }}
                    >
                      <strong>Attribution:</strong> {art.creator} (
                      {CERTAINTY_LABELS[art.attributionCertainty]})
                      {art.dateNote && (
                        <div style={{ color: 'var(--ochre-text)', marginBlockStart: '0.2rem' }}>
                          <strong>Dating note:</strong> {art.dateNote}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    paddingBlockStart: '0.75rem',
                    borderBlockStart: '1px solid var(--rule-fine)',
                    display: 'grid',
                    gap: '0.6rem',
                  }}
                >
                  {place && (
                    <div style={{ fontSize: 'var(--text-caption)' }}>
                      Associated Place:{' '}
                      <Link
                        href={`/places/${place.slug}`}
                        style={{ fontWeight: 600 }}
                      >
                        {place.catalogueRef} · {place.name}
                      </Link>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <Link
                      href={`/artifacts/${art.id}`}
                      className="btn-archival btn-secondary"
                      style={{
                        padding: '0.45rem 0.8rem',
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      Examine Record
                    </Link>
                    <SaveToDeskControls
                      entityType="artifact"
                      entityId={art.id}
                      label={art.title}
                      compact
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
