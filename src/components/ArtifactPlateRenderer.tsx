import React from 'react';
import type { Artifact } from '@/types/atlas';
import { ARTIFACT_TYPE_LABELS, CERTAINTY_LABELS } from '@/data';

interface ArtifactPlateRendererProps {
  artifact: Artifact;
  detailed?: boolean;
}

/**
 * Renders medium-appropriate archival plates rather than repeating identical image cards:
 * - Maps & Architectural Drawings: SVG cartographic/orthographic plates
 * - Photographs: Silver-gelatin contact sheet frames with registration marks
 * - Letters, Newspaper Excerpts & Oral Histories: Typeset documentary facsimiles
 * - Survey Records: Ruled cadastral & hydrographic ledger tables
 */
export function ArtifactPlateRenderer({
  artifact,
  detailed = false,
}: ArtifactPlateRendererProps) {
  const { visualSpec } = artifact;
  const toneHex =
    visualSpec.accentTone === 'terracotta'
      ? '#8E3E2A'
      : visualSpec.accentTone === 'olive'
        ? '#4B4E38'
        : visualSpec.accentTone === 'slate'
          ? '#44585B'
          : '#292820';

  if (
    visualSpec.plateStyle === 'epistolary-leaf' ||
    visualSpec.plateStyle === 'newsprint-clipping' ||
    visualSpec.plateStyle === 'phonograph-transcript'
  ) {
    const isNews = visualSpec.plateStyle === 'newsprint-clipping';
    const isOral = visualSpec.plateStyle === 'phonograph-transcript';

    return (
      <div
        style={{
          background: isNews ? '#EFE8D8' : 'var(--paper-chalk)',
          border: '1px solid var(--rule-strong)',
          padding: detailed ? '1.5rem' : '1.1rem',
          fontFamily: isNews ? 'var(--font-editorial)' : 'var(--font-catalogue)',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
            paddingBlockEnd: '0.55rem',
            marginBlockEnd: '0.75rem',
            borderBlockEnd: isNews
              ? '2px double var(--ink-primary)'
              : '1px dashed var(--rule-strong)',
            fontFamily: 'var(--font-catalogue)',
            fontSize: '0.72rem',
            color: toneHex,
          }}
        >
          <span>
            {isOral
              ? 'SPOKEN MEMORY TRANSCRIPT'
              : isNews
                ? 'MICROFILM CLIPPING FACSIMILE'
                : 'ARCHIVAL DOCUMENT LEAF'}
          </span>
          <span>{artifact.catalogueRef}</span>
        </div>

        <blockquote
          style={{
            margin: 0,
            fontSize: detailed ? '1.02rem' : '0.88rem',
            lineHeight: 1.58,
            color: 'var(--ink-primary)',
            fontStyle: isNews ? 'normal' : 'normal',
          }}
        >
          {artifact.excerptOrTranscription ?? artifact.summary}
        </blockquote>

        <div
          style={{
            marginBlockStart: '0.85rem',
            paddingBlockStart: '0.5rem',
            borderBlockStart: '1px solid var(--rule-fine)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontFamily: 'var(--font-catalogue)',
            fontSize: '0.72rem',
            color: 'var(--ink-secondary)',
          }}
        >
          <span>{artifact.accessionNote}</span>
          <span>Date status: {CERTAINTY_LABELS[artifact.dateCertainty]}</span>
        </div>
      </div>
    );
  }

  if (visualSpec.plateStyle === 'cadastral-ledger') {
    const rows = visualSpec.ledgerRows ?? [];
    return (
      <div
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--rule-strong)',
          padding: detailed ? '1.25rem' : '0.95rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-catalogue)',
            fontSize: '0.72rem',
            color: toneHex,
            paddingBlockEnd: '0.5rem',
            borderBlockEnd: '1.5px solid var(--ink-primary)',
            marginBlockEnd: '0.6rem',
          }}
        >
          <span>SURVEY & VALUATION FOLIO EXTRACT</span>
          <span>{artifact.catalogueRef}</span>
        </div>
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          {rows.map((r) => (
            <div
              key={r.col1}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(7.5rem, 1fr))',
                gap: '0.45rem',
                paddingBlock: '0.35rem',
                borderBlockEnd: '1px dotted var(--rule-strong)',
                fontFamily: 'var(--font-catalogue)',
                fontSize: '0.76rem',
              }}
            >
              <strong style={{ color: 'var(--ink-primary)' }}>{r.col1}</strong>
              <span style={{ color: 'var(--ink-secondary)' }}>{r.col2}</span>
              <span style={{ color: toneHex, fontWeight: 600 }}>{r.col3}</span>
            </div>
          ))}
        </div>
        {detailed && artifact.excerptOrTranscription && (
          <p
            style={{
              marginBlockStart: '0.85rem',
              fontFamily: 'var(--font-catalogue)',
              fontSize: '0.8rem',
              color: 'var(--ink-secondary)',
              background: 'var(--paper-vellum)',
              padding: '0.65rem 0.8rem',
            }}
          >
            {artifact.excerptOrTranscription}
          </p>
        )}
      </div>
    );
  }

  // Vector Plates: Topographic Sheet, Orthographic Blueprint, Silver-Gelatin Contact Plate
  const isBlueprint = visualSpec.plateStyle === 'orthographic-blueprint';
  const isPhoto = visualSpec.plateStyle === 'silver-gelatin-plate';

  const bgFill = isBlueprint ? '#E8ECEA' : isPhoto ? '#DDD7C9' : '#F3EDE0';
  const lineStroke = isBlueprint ? '#2D4448' : isPhoto ? '#292820' : toneHex;

  return (
    <svg
      viewBox="0 0 380 220"
      role="img"
      aria-label={`Illustrative ${ARTIFACT_TYPE_LABELS[artifact.type]} plate for ${artifact.title}`}
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: '380 / 220',
        border: '1px solid var(--rule-strong)',
        background: bgFill,
      }}
    >
      {/* Frame & Registration Marks */}
      <rect
        x="8"
        y="8"
        width="364"
        height="204"
        fill="none"
        stroke={lineStroke}
        strokeWidth="1"
      />

      {isBlueprint && (
        <g stroke={lineStroke} strokeOpacity="0.16" strokeWidth="0.6">
          {[36, 68, 100, 132, 164, 196].map((y) => (
            <line key={`hy-${y}`} x1="8" y1={y} x2="372" y2={y} />
          ))}
          {[54, 108, 162, 216, 270, 324].map((x) => (
            <line key={`vx-${x}`} x1={x} y1="8" x2={x} y2="212" />
          ))}
          {/* Orthographic Arch / Structural Section */}
          <path
            d="M 48,158 Q 190,26 332,158"
            fill="none"
            stroke={lineStroke}
            strokeOpacity="0.88"
            strokeWidth="2"
          />
          <path
            d="M 62,158 Q 190,46 318,158"
            fill="none"
            stroke={lineStroke}
            strokeOpacity="0.7"
            strokeWidth="1.1"
            strokeDasharray="4 2"
          />
          <line
            x1="32"
            y1="158"
            x2="348"
            y2="158"
            stroke={lineStroke}
            strokeOpacity="0.9"
            strokeWidth="1.6"
          />
          <rect
            x="84"
            y="162"
            width="64"
            height="28"
            fill="none"
            stroke={lineStroke}
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />
          <rect
            x="162"
            y="162"
            width="64"
            height="28"
            fill="none"
            stroke={lineStroke}
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />
          <rect
            x="240"
            y="162"
            width="52"
            height="28"
            fill="none"
            stroke={lineStroke}
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />
        </g>
      )}

      {isPhoto && (
        <g>
          {/* Contact Negative Border & Tonal Architectural Silhouette */}
          <rect x="20" y="24" width="340" height="164" fill="#CFC8B8" stroke="#292820" strokeWidth="1.2" />
          <path d="M 20,148 L 118,124 L 210,138 L 360,118 L 360,188 L 20,188 Z" fill="#9E9889" />
          <rect x="78" y="88" width="54" height="52" fill="#54524A" fillOpacity="0.75" />
          <polygon points="78,88 105,66 132,88" fill="none" stroke="#292820" strokeDasharray="3 2" />
          <path d="M 185,152 Q 212,124 240,152 Q 268,124 295,152" fill="none" stroke="#292820" strokeWidth="2.2" />
          <text x="26" y="38" fontSize="8" fontFamily="monospace" fill="#292820">
            NEGATIVE CONTACT RECONSTRUCTION · 4×5 IN.
          </text>
        </g>
      )}

      {!isBlueprint && !isPhoto && (
        <g fill="none" stroke={lineStroke}>
          {/* Topographic / Bathymetric Survey Curves */}
          <path d="M 18,64 Q 130,38 225,78 T 362,62" strokeWidth="0.9" strokeOpacity="0.55" />
          <path d="M 18,104 Q 145,82 238,118 T 362,102" strokeWidth="1.2" strokeOpacity="0.75" />
          <path d="M 18,146 Q 152,126 248,154 T 362,144" strokeWidth="1.6" />
          <line
            x1="48"
            y1="168"
            x2="332"
            y2="78"
            stroke="#8E3E2A"
            strokeWidth="1.2"
            strokeDasharray="5 3"
          />
          <circle cx="330" cy="44" r="14" strokeWidth="0.9" />
          <line x1="330" y1="26" x2="330" y2="62" strokeWidth="0.9" />
          <line x1="312" y1="44" x2="348" y2="44" strokeWidth="0.9" />
        </g>
      )}

      {/* Callout Labels */}
      {(visualSpec.calloutLabels ?? []).map((lbl) => (
        <g key={lbl.text} transform={`translate(${lbl.x}, ${lbl.y})`}>
          <circle r="2.8" fill="#8E3E2A" />
          <rect
            x="6"
            y="-9"
            width={Math.min(165, lbl.text.length * 5.2 + 12)}
            height="15"
            fill="#FFFCF5"
            fillOpacity="0.92"
            stroke={lineStroke}
            strokeWidth="0.7"
          />
          <text x="10" y="2" fontSize="7.8" fontFamily="monospace" fill="#292820">
            {lbl.text}
          </text>
        </g>
      ))}

      {/* Plate Footer Legend */}
      <rect x="9" y="191" width="362" height="20" fill="#FFFCF5" fillOpacity="0.92" />
      <text x="16" y="204" fontSize="8.2" fontFamily="monospace" fill="#292820">
        {artifact.catalogueRef} · {ARTIFACT_TYPE_LABELS[artifact.type].toUpperCase()} · {artifact.dateDisplay}
      </text>
    </svg>
  );
}
