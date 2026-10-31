'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PLACES, CATEGORY_LABELS } from '@/data';

export function HomeCartographicPreview() {
  const defaultFeatured =
    PLACES.find((p) => p.isFeaturedOnHome) ?? PLACES[0]!;
  const [selectedId, setSelectedId] = useState<string>(defaultFeatured.id);

  const activePlace =
    PLACES.find((p) => p.id === selectedId) ?? defaultFeatured;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
        gap: '1.25rem',
        alignItems: 'stretch',
      }}
    >
      {/* Interactive SVG Cartographic Frontispiece Plate */}
      <div
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--rule-strong)',
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
            marginBlockEnd: '0.5rem',
          }}
          className="catalogue-code"
        >
          <span>PLATE 0 · COMPOSITE BASIN INDEX (ILLUSTRATIVE)</span>
          <span>SELECT ANY SURVEY MARKER</span>
        </div>

        <svg
          viewBox="0 0 1000 540"
          role="group"
          aria-label="Interactive frontispiece map of eight investigated places"
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1000 / 540',
            background: '#EFE8D8',
            border: '1px solid var(--rule-fine)',
          }}
        >
          {/* Graticule Lines */}
          {[200, 400, 600, 800].map((gx) => (
            <line
              key={`gx-${gx}`}
              x1={gx}
              y1="0"
              x2={gx}
              y2="540"
              stroke="#D8D0C2"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
          {[135, 270, 405].map((gy) => (
            <line
              key={`gy-${gy}`}
              x1="0"
              y1={gy}
              x2="1000"
              y2={gy}
              stroke="#D8D0C2"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Littoral Coastline & Estuary Water */}
          <path
            d="M 720,0 Q 745,145 815,235 Q 890,330 875,540 L 1000,540 L 1000,0 Z"
            fill="#D5DFDF"
            stroke="#566D70"
            strokeWidth="1.8"
          />

          {/* Upland Contours & River System */}
          <path
            d="M 40,95 Q 190,65 320,155 T 595,215"
            fill="none"
            stroke="#B8AF9E"
            strokeWidth="1.4"
          />
          <path
            d="M 165,152 Q 335,245 462,405 Q 585,320 778,132"
            fill="none"
            stroke="#566D70"
            strokeWidth="2.4"
          />
          {/* Reservoir Impoundment Pool */}
          <ellipse
            cx="215"
            cy="155"
            rx="46"
            ry="22"
            fill="#C3D3D4"
            stroke="#566D70"
            strokeWidth="1.3"
          />

          {/* Connecting Archival Cross-References */}
          <line
            x1="215"
            y1="155"
            x2="458"
            y2="395"
            stroke="#8E3E2A"
            strokeWidth="1.1"
            strokeDasharray="5 4"
            strokeOpacity="0.55"
          />
          <line
            x1="565"
            y1="195"
            x2="785"
            y2="122"
            stroke="#4B4E38"
            strokeWidth="1.1"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
          />
          <line
            x1="565"
            y1="195"
            x2="512"
            y2="325"
            stroke="#4B4E38"
            strokeWidth="1.1"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
          />

          {/* Region Watermarks */}
          <text x="85" y="105" fontSize="13" fontFamily="monospace" fill="#54524A">
            HIGHLAND BASIN
          </text>
          <text x="605" y="75" fontSize="13" fontFamily="monospace" fill="#54524A">
            NORTHERN ESTUARY
          </text>
          <text x="330" y="475" fontSize="13" fontFamily="monospace" fill="#54524A">
            CANAL &amp; FOUNDRY WARD
          </text>
          <text x="710" y="495" fontSize="13" fontFamily="monospace" fill="#54524A">
            SALT LITTORAL
          </text>

          {/* Interactive Place Markers */}
          {PLACES.map((place) => {
            const py = Math.round(place.atlasPosition.y * 0.86);
            const px = place.atlasPosition.x;
            const isSelected = place.id === activePlace.id;

            return (
              <g
                key={place.id}
                transform={`translate(${px}, ${py})`}
                onClick={() => setSelectedId(place.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Invisible 44px equivalent SVG hit target */}
                <circle r="24" fill="transparent" />
                {isSelected && (
                  <circle
                    r="16"
                    fill="none"
                    stroke="#8E3E2A"
                    strokeWidth="1.8"
                  />
                )}
                <circle
                  r={isSelected ? '7.5' : '5.5'}
                  fill={isSelected ? '#8E3E2A' : '#292820'}
                  stroke="#FFFCF5"
                  strokeWidth="1.8"
                />
                <rect
                  x="11"
                  y="-11"
                  width="74"
                  height="20"
                  rx="2"
                  fill={isSelected ? '#292820' : '#FFFCF5'}
                  stroke={isSelected ? '#292820' : '#B8AF9E'}
                  strokeWidth="1"
                />
                <text
                  x="17"
                  y="3"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="600"
                  fill={isSelected ? '#FFFCF5' : '#292820'}
                >
                  {place.catalogueRef}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Accessible Keyboard Selector Buttons for Map Pins */}
        <div
          role="group"
          aria-label="Select featured place on frontispiece map"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginBlockStart: '0.65rem',
          }}
        >
          {PLACES.map((p) => {
            const active = p.id === activePlace.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                aria-pressed={active}
                style={{
                  minHeight: '36px',
                  padding: '0.25rem 0.55rem',
                  fontFamily: 'var(--font-catalogue)',
                  fontSize: '0.72rem',
                  background: active ? 'var(--ink-primary)' : 'var(--paper-warm)',
                  color: active ? 'var(--paper-chalk)' : 'var(--ink-primary)',
                  border: active
                    ? '1px solid var(--ink-primary)'
                    : '1px solid var(--rule-strong)',
                  borderRadius: 'var(--radius-sharp)',
                  cursor: 'pointer',
                }}
              >
                {p.catalogueRef}
              </button>
            );
          })}
        </div>
      </div>

      {/* Synchronized Featured Location Dossier Card */}
      <article
        aria-live="polite"
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--ink-primary)',
          padding: '1.35rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              paddingBlockEnd: '0.65rem',
              borderBlockEnd: '1px solid var(--rule-fine)',
              marginBlockEnd: '0.85rem',
            }}
          >
            <span
              className="catalogue-code"
              style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}
            >
              FEATURED DOSSIER · REF. {activePlace.catalogueRef}
            </span>
            <span className="catalogue-code">
              {activePlace.atlasPosition.gridSector}
            </span>
          </div>

          <h2 style={{ fontSize: 'var(--text-h2)', marginBlockEnd: '0.35rem' }}>
            {activePlace.name}
          </h2>
          {activePlace.formerName && (
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                color: 'var(--ink-secondary)',
                marginBlockEnd: '0.75rem',
              }}
            >
              Formerly {activePlace.formerName}
            </div>
          )}

          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--ink-primary)',
              marginBlockEnd: '1rem',
            }}
          >
            {activePlace.excerpt}
          </p>

          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '0.65rem',
              margin: 0,
              paddingBlock: '0.75rem',
              borderBlock: '1px solid var(--rule-fine)',
              fontSize: 'var(--text-caption)',
            }}
          >
            <div>
              <dt className="catalogue-code">CLASSIFICATION</dt>
              <dd style={{ margin: '0.15rem 0 0', fontWeight: 600 }}>
                {CATEGORY_LABELS[activePlace.category]}
              </dd>
            </div>
            <div>
              <dt className="catalogue-code">RUPTURE YEAR</dt>
              <dd
                className="tabular-nums"
                style={{ margin: '0.15rem 0 0', fontWeight: 600 }}
              >
                {activePlace.activeSpan.turningPointYear} ({activePlace.periods.length}{' '}
                strata)
              </dd>
            </div>
            <div>
              <dt className="catalogue-code">SURVIVING EVIDENCE</dt>
              <dd
                className="tabular-nums"
                style={{ margin: '0.15rem 0 0', fontWeight: 600 }}
              >
                {activePlace.artifactIds.length} artifacts ·{' '}
                {activePlace.claims.length} claims
              </dd>
            </div>
            <div>
              <dt className="catalogue-code">PRESENT STATE</dt>
              <dd style={{ margin: '0.15rem 0 0', fontWeight: 600 }}>
                {activePlace.currentStatusLabel}
              </dd>
            </div>
          </dl>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          <Link href={`/places/${activePlace.slug}`} className="btn-archival">
            Investigate Dossier
          </Link>
          <Link
            href={`/time-machine?place=${activePlace.id}`}
            className="btn-archival btn-secondary"
          >
            Compare Periods
          </Link>
        </div>
      </article>
    </div>
  );
}
