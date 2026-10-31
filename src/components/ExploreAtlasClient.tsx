'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PLACES,
  PERIODS,
  CATEGORY_LABELS,
} from '@/data';
import type {
  AtlasRegion,
  TransformationCategory,
  HistoricalEraId,
} from '@/types/atlas';
import {
  filterAndSortPlaces,
  type PlaceSortCriterion,
} from '@/lib/filters';
import { PeriodSceneRenderer } from './PeriodSceneRenderer';
import { SaveToDeskControls } from './SaveToDeskControls';
import styles from '@/app/explore/explore.module.css';

const REGIONS: AtlasRegion[] = [
  'Highland Reservoir Basin',
  'Northern Silted Estuary',
  'Observatory Ridge',
  'Metropolitan Transit Core',
  'Canal & Foundry Ward',
  'Salt Flat Littoral',
];

const CATEGORIES = Object.keys(CATEGORY_LABELS) as TransformationCategory[];

export function ExploreAtlasClient({
  initialEra = 'all',
  initialQuery = '',
}: {
  initialEra?: HistoricalEraId | 'all';
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState<AtlasRegion | 'all'>('all');
  const [category, setCategory] = useState<TransformationCategory | 'all'>('all');
  const [eraId, setEraId] = useState<HistoricalEraId | 'all'>(initialEra);
  const [sort, setSort] = useState<PlaceSortCriterion>('turning-point-asc');
  const [selectedId, setSelectedId] = useState<string>(PLACES[0]!.id);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');

  const filteredPlaces = useMemo(
    () =>
      filterAndSortPlaces(PLACES, {
        query,
        region,
        category,
        eraId,
        sort,
      }),
    [query, region, category, eraId, sort]
  );

  const filteredIdSet = useMemo(
    () => new Set(filteredPlaces.map((p) => p.id)),
    [filteredPlaces]
  );

  // Derive active selected place during render without useEffect state-sync
  const selectedPlace =
    filteredPlaces.find((p) => p.id === selectedId) ??
    filteredPlaces[0] ??
    null;

  const hasActiveFilters =
    query.trim() !== '' ||
    region !== 'all' ||
    category !== 'all' ||
    eraId !== 'all' ||
    sort !== 'turning-point-asc';

  const resetAllFilters = () => {
    setQuery('');
    setRegion('all');
    setCategory('all');
    setEraId('all');
    setSort('turning-point-asc');
  };

  return (
    <div>
      {/* Filter & Search Apparatus */}
      <div className={styles.filterToolbar} role="search" aria-label="Filter and sort atlas locations">
        <div>
          <label htmlFor="explore-search" className="archival-label">
            Search Place, Period, or Subject
          </label>
          <input
            id="explore-search"
            type="search"
            className="archival-input"
            placeholder="e.g., bridge, 1938, siltation, canal…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="explore-region" className="archival-label">
            Geographic Region
          </label>
          <select
            id="explore-region"
            className="archival-select"
            value={region}
            onChange={(e) => setRegion(e.target.value as AtlasRegion | 'all')}
          >
            <option value="all">All Six Regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="explore-category" className="archival-label">
            Transformation Theme
          </label>
          <select
            id="explore-category"
            className="archival-select"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as TransformationCategory | 'all')
            }
          >
            <option value="all">All Transformation Types</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="explore-era" className="archival-label">
            Historical Stratum
          </label>
          <select
            id="explore-era"
            className="archival-select"
            value={eraId}
            onChange={(e) => setEraId(e.target.value as HistoricalEraId | 'all')}
          >
            <option value="all">All Historical Eras</option>
            {PERIODS.map((era) => (
              <option key={era.id} value={era.id}>
                {era.name} ({era.spanLabel})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 10.5rem' }}>
            <label htmlFor="explore-sort" className="archival-label">
              Sort Order
            </label>
            <select
              id="explore-sort"
              className="archival-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as PlaceSortCriterion)}
            >
              <option value="turning-point-asc">Rupture Year (Oldest)</option>
              <option value="turning-point-desc">Rupture Year (Newest)</option>
              <option value="name-asc">Alphabetical (A–Z)</option>
              <option value="evidence-desc">Evidence Density</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="btn-archival btn-secondary"
              style={{ alignSelf: 'flex-end' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Status Bar + Mobile Layout Alternative Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingBlockStart: '1rem',
        }}
      >
        <div className="catalogue-code" aria-live="polite">
          SHOWING {filteredPlaces.length} OF {PLACES.length} CATALOGUED PLACES
          {region !== 'all' ? ` · ${region.toUpperCase()}` : ''}
        </div>

        <div
          className={styles.mobileModeSwitch}
          role="group"
          aria-label="Mobile exploration view mode"
        >
          <button
            type="button"
            onClick={() => setMobileView('map')}
            aria-pressed={mobileView === 'map'}
            className={
              mobileView === 'map'
                ? 'btn-archival'
                : 'btn-archival btn-secondary'
            }
          >
            Cartographic Plate
          </button>
          <button
            type="button"
            onClick={() => setMobileView('list')}
            aria-pressed={mobileView === 'list'}
            className={
              mobileView === 'list'
                ? 'btn-archival'
                : 'btn-archival btn-secondary'
            }
          >
            Gazetteer List ({filteredPlaces.length})
          </button>
        </div>
      </div>

      {filteredPlaces.length === 0 ? (
        <div
          style={{
            marginBlock: '2rem',
            padding: '2.25rem',
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
          }}
        >
          <span className="catalogue-code">EMPTY SURVEY SECTOR</span>
          <h2 style={{ marginBlock: '0.35rem 0.65rem' }}>
            No investigated places match this filter combination
          </h2>
          <p
            style={{
              color: 'var(--ink-secondary)',
              marginBlockEnd: '1.25rem',
            }}
          >
            Try clearing the geographic region or historical stratum restriction
            to inspect all eight places in the demonstration basin.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="btn-archival"
          >
            Reset All Atlas Filters
          </button>
        </div>
      ) : (
        <div className={styles.workspaceGrid}>
          {/* 1. Synchronized Gazetteer List */}
          <div
            className={
              mobileView === 'map' ? styles.hiddenOnMobileMode : undefined
            }
          >
            <div
              className="catalogue-code"
              style={{ marginBlockEnd: '0.6rem' }}
            >
              SYNCHRONIZED GAZETTEER ({filteredPlaces.length})
            </div>
            <div className={styles.gazetteerList} role="list">
              {filteredPlaces.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <div key={place.id} role="listitem">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(place.id);
                        setMobileView('map');
                      }}
                      aria-pressed={isSelected}
                      className={`${styles.gazetteerItem} ${
                        isSelected ? styles.gazetteerItemSelected : ''
                      }`}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBlockEnd: '0.2rem',
                        }}
                        className="catalogue-code"
                      >
                        <span
                          style={{
                            color: isSelected
                              ? 'var(--accent-terracotta)'
                              : undefined,
                            fontWeight: 700,
                          }}
                        >
                          {place.catalogueRef}
                        </span>
                        <span className="tabular-nums">
                          Rupture {place.activeSpan.turningPointYear}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-editorial)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                        }}
                      >
                        {place.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--ink-secondary)',
                          marginBlockStart: '0.15rem',
                        }}
                      >
                        {CATEGORY_LABELS[place.category]} · {place.region}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Illustrated SVG Cartographic Plate */}
          <div
            className={`${styles.mapSheet} ${
              mobileView === 'list' ? styles.hiddenOnMobileMode : ''
            }`}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBlockEnd: '0.55rem',
              }}
              className="catalogue-code"
            >
              <span>COMPOSITE REGIONAL PROJECTION · SECTORS A1–G5</span>
              <span>CLICK ANY MARKER TO SYNCHRONIZE DOSSIER</span>
            </div>

            <svg
              viewBox="0 0 1000 620"
              role="group"
              aria-label="Interactive regional survey map of The Unfinished Atlas"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1000 / 620',
                background: '#EFE8D8',
                border: '1px solid var(--ink-primary)',
              }}
            >
              {/* Coordinate Grid Sectors */}
              {[160, 320, 480, 640, 800].map((x, idx) => (
                <g key={`col-${x}`}>
                  <line
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="620"
                    stroke="#D8D0C2"
                    strokeWidth="0.9"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={x - 135}
                    y="22"
                    fontSize="11"
                    fontFamily="monospace"
                    fill="#54524A"
                  >
                    SEC-{String.fromCharCode(65 + idx)}
                  </text>
                </g>
              ))}
              {[124, 248, 372, 496].map((y, idx) => (
                <g key={`row-${y}`}>
                  <line
                    x1="0"
                    y1={y}
                    x2="1000"
                    y2={y}
                    stroke="#D8D0C2"
                    strokeWidth="0.9"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="12"
                    y={y - 10}
                    fontSize="11"
                    fontFamily="monospace"
                    fill="#54524A"
                  >
                    R-{idx + 1}
                  </text>
                </g>
              ))}

              {/* Sea & Northern Silted Estuary */}
              <path
                d="M 705,0 Q 740,165 820,255 Q 895,350 885,620 L 1000,620 L 1000,0 Z"
                fill="#D5DFDF"
                stroke="#566D70"
                strokeWidth="2"
              />
              {/* Accreted Dune Spit Hatching */}
              <path
                d="M 735,75 Q 785,125 815,195"
                fill="none"
                stroke="#4B4E38"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Highland Contours & Observatory Escarpment */}
              <path
                d="M 35,95 Q 190,55 340,150 T 625,225"
                fill="none"
                stroke="#B8AF9E"
                strokeWidth="1.5"
              />
              <path
                d="M 55,190 Q 210,140 355,225 T 615,275"
                fill="none"
                stroke="#C7BFAE"
                strokeWidth="1.2"
              />

              {/* Reedmere Fen Polder Polygon */}
              <polygon
                points="615,128 722,128 730,206 620,206"
                fill="#E2E5D5"
                stroke="#6B6E52"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />

              {/* Salina Neblina Salt Quadrangle */}
              <rect
                x="785"
                y="435"
                width="95"
                height="68"
                fill="#F9F6EE"
                stroke="#8E3E2A"
                strokeWidth="1.1"
                strokeDasharray="3 3"
              />

              {/* Hydrological Network: Reservoir -> Canal Ward -> Estuary */}
              <ellipse
                cx="215"
                cy="162"
                rx="54"
                ry="26"
                fill="#C3D3D4"
                stroke="#566D70"
                strokeWidth="1.5"
              />
              <path
                d="M 268,165 Q 375,265 458,418 Q 595,305 785,128"
                fill="none"
                stroke="#566D70"
                strokeWidth="2.6"
              />
              {/* Rail Arterial Line */}
              <path
                d="M 320,580 L 484,382 L 512,344 L 842,468"
                fill="none"
                stroke="#8E3E2A"
                strokeWidth="1.5"
                strokeDasharray="8 4"
                strokeOpacity="0.65"
              />

              {/* Geographic Region Labels */}
              <text x="95" y="118" fontSize="13" fontFamily="monospace" fill="#54524A" fontWeight="600">
                HIGHLAND RESERVOIR BASIN
              </text>
              <text x="580" y="96" fontSize="13" fontFamily="monospace" fill="#54524A" fontWeight="600">
                NORTHERN SILTED ESTUARY
              </text>
              <text x="515" y="182" fontSize="12" fontFamily="monospace" fill="#54524A">
                OBSERVATORY RIDGE (482m)
              </text>
              <text x="275" y="458" fontSize="13" fontFamily="monospace" fill="#54524A" fontWeight="600">
                CANAL &amp; FOUNDRY WARD
              </text>
              <text x="720" y="535" fontSize="13" fontFamily="monospace" fill="#54524A" fontWeight="600">
                SALT FLAT LITTORAL
              </text>

              {/* Compass & Scale Legend */}
              <g transform="translate(88, 558)">
                <line x1="0" y1="0" x2="110" y2="0" stroke="#292820" strokeWidth="1.6" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#292820" strokeWidth="1.6" />
                <line x1="55" y1="-3" x2="55" y2="3" stroke="#292820" strokeWidth="1.2" />
                <line x1="110" y1="-5" x2="110" y2="5" stroke="#292820" strokeWidth="1.6" />
                <text x="0" y="-10" fontSize="11" fontFamily="monospace" fill="#292820">
                  SCHEMATIC COMPOSITE SCALE (NON-WGS84)
                </text>
              </g>

              {/* Clickable Place Markers */}
              {PLACES.map((place) => {
                const matches = filteredIdSet.has(place.id);
                const isSelected = selectedPlace?.id === place.id;
                const { x, y } = place.atlasPosition;
                // Offset label slightly for clustered urban core markers so none overlap
                const labelOffsetY =
                  place.id === 'pl-foundry-row'
                    ? 16
                    : place.id === 'pl-st-clement-concourse'
                      ? -24
                      : -10;

                return (
                  <g
                    key={place.id}
                    transform={`translate(${x}, ${y})`}
                    opacity={matches ? 1 : 0.25}
                    onClick={() => {
                      if (matches) setSelectedId(place.id);
                    }}
                    style={{ cursor: matches ? 'pointer' : 'default' }}
                  >
                    <circle r="24" fill="transparent" />
                    {isSelected && (
                      <>
                        <circle
                          r="20"
                          fill="#8E3E2A"
                          fillOpacity="0.14"
                          stroke="#8E3E2A"
                          strokeWidth="1.6"
                        />
                        <line
                          x1="-26"
                          y1="0"
                          x2="26"
                          y2="0"
                          stroke="#8E3E2A"
                          strokeWidth="0.9"
                        />
                        <line
                          x1="0"
                          y1="-26"
                          x2="0"
                          y2="26"
                          stroke="#8E3E2A"
                          strokeWidth="0.9"
                        />
                      </>
                    )}
                    <circle
                      r={isSelected ? '8' : '6'}
                      fill={isSelected ? '#8E3E2A' : '#292820'}
                      stroke="#FFFCF5"
                      strokeWidth="2"
                    />
                    <g transform={`translate(12, ${labelOffsetY})`}>
                      <rect
                        x="0"
                        y="0"
                        width={Math.min(205, place.name.length * 6.8 + 18)}
                        height="21"
                        rx="2"
                        fill={isSelected ? '#292820' : '#FFFCF5'}
                        fillOpacity="0.95"
                        stroke={isSelected ? '#292820' : '#89877F'}
                        strokeWidth="1"
                      />
                      <text
                        x="6"
                        y="14"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="600"
                        fill={isSelected ? '#FFFCF5' : '#292820'}
                      >
                        {place.catalogueRef} · {place.name.slice(0, 20)}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            <p
              className="catalogue-code"
              style={{ marginBlockStart: '0.6rem', lineHeight: 1.45 }}
            >
              <strong>CARTOGRAPHIC NOTE:</strong> Positions above represent a
              synthesized regional demonstration projection showing hydrological
              and infrastructural adjacency (upland dam → canal basin → silted
              estuary), distinct from real-world latitude/longitude coordinates.
            </p>
          </div>

          {/* 3. Selected-Location Detail Inspector Panel */}
          {selectedPlace && (
            <aside
              aria-label="Selected place detail inspector"
              className={styles.inspectorPanel}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBlockEnd: '0.35rem',
                  }}
                  className="catalogue-code"
                >
                  <span style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>
                    SELECTED · {selectedPlace.catalogueRef}
                  </span>
                  <span>
                    ELEV. {selectedPlace.atlasPosition.elevationMeters}m
                  </span>
                </div>
                <h2 style={{ fontSize: 'var(--text-h3)' }}>
                  {selectedPlace.name}
                </h2>
                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    color: 'var(--ink-secondary)',
                    marginBlockStart: '0.2rem',
                  }}
                >
                  {selectedPlace.region} ·{' '}
                  {CATEGORY_LABELS[selectedPlace.category]}
                </div>
              </div>

              <PeriodSceneRenderer
                period={
                  selectedPlace.periods[selectedPlace.periods.length - 1]!
                }
                placeName={selectedPlace.name}
                catalogueRef={selectedPlace.catalogueRef}
                compact
              />

              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--ink-primary)',
                }}
              >
                {selectedPlace.subtitle}
              </p>

              <div
                style={{
                  padding: '0.75rem',
                  background: 'var(--paper-warm)',
                  border: '1px solid var(--rule-fine)',
                  fontSize: 'var(--text-caption)',
                  display: 'grid',
                  gap: '0.35rem',
                }}
              >
                <div>
                  <strong>Chronology:</strong> {selectedPlace.activeSpan.eraSummary}
                </div>
                <div>
                  <strong>Archive Holdings:</strong>{' '}
                  {selectedPlace.artifactIds.length} artifacts ·{' '}
                  {selectedPlace.periods.length} period reconstructions ·{' '}
                  {
                    selectedPlace.claims.filter((c) => c.status === 'unresolved')
                      .length
                  }{' '}
                  unresolved inquiry
                </div>
                <div style={{ color: 'var(--ink-secondary)' }}>
                  {selectedPlace.coordinateDisclaimer}
                </div>
              </div>

              <SaveToDeskControls
                entityType="place"
                entityId={selectedPlace.id}
                label={selectedPlace.name}
                compact
              />

              <div
                style={{
                  display: 'grid',
                  gap: '0.5rem',
                  paddingBlockStart: '0.5rem',
                  borderBlockStart: '1px solid var(--rule-fine)',
                }}
              >
                <Link
                  href={`/places/${selectedPlace.slug}`}
                  className="btn-archival"
                >
                  Open Complete Investigation
                </Link>
                <Link
                  href={`/time-machine?place=${selectedPlace.id}`}
                  className="btn-archival btn-secondary"
                >
                  Inspect in Time Machine
                </Link>
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}
