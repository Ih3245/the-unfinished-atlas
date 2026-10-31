import React from 'react';
import type { HistoricalPeriodState, VectorStructure } from '@/types/atlas';

export interface SceneLayerVisibility {
  water: boolean;
  structures: boolean;
  infrastructure: boolean;
  annotations: boolean;
}

interface PeriodSceneRendererProps {
  period: HistoricalPeriodState;
  placeName: string;
  catalogueRef: string;
  layers?: SceneLayerVisibility;
  compact?: boolean;
}

function getStructureStyle(kind: VectorStructure['kind']) {
  switch (kind) {
    case 'civic':
      return { fill: '#8E3E2A', fillOpacity: 0.24, stroke: '#8E3E2A' };
    case 'residential':
      return { fill: '#292820', fillOpacity: 0.16, stroke: '#292820' };
    case 'industrial':
      return { fill: '#4B4E38', fillOpacity: 0.24, stroke: '#4B4E38' };
    case 'infrastructure':
      return { fill: '#7A4F13', fillOpacity: 0.26, stroke: '#7A4F13' };
    case 'ruin':
      return { fill: '#89877F', fillOpacity: 0.18, stroke: '#54524A' };
    case 'submerged':
      return { fill: '#566D70', fillOpacity: 0.18, stroke: '#44585B' };
  }
}

export function PeriodSceneRenderer({
  period,
  placeName,
  catalogueRef,
  layers = {
    water: true,
    structures: true,
    infrastructure: true,
    annotations: true,
  },
  compact = false,
}: PeriodSceneRendererProps) {
  const { scene } = period;
  const patternPrefix = `pat-${period.id}`;

  return (
    <svg
      viewBox="0 0 600 360"
      role="img"
      aria-label={`Illustrative archival vector reconstruction of ${placeName} during ${period.yearLabel}: ${period.title}`}
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: '600 / 360',
        background: '#F3EDE0',
        border: '1px solid var(--rule-strong)',
      }}
    >
      <defs>
        <pattern
          id={`${patternPrefix}-grid`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#D8D0C2"
            strokeWidth="0.65"
          />
        </pattern>
        <pattern
          id={`${patternPrefix}-water`}
          width="18"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="10" fill="#D5DFDF" />
          <path
            d="M 0 5 Q 4.5 2.5 9 5 T 18 5"
            fill="none"
            stroke="#738C8F"
            strokeWidth="0.8"
            strokeOpacity="0.65"
          />
        </pattern>
      </defs>

      {/* Survey Grid Paper Backdrop */}
      <rect width="600" height="360" fill={`url(#${patternPrefix}-grid)`} />

      {/* Topographic Contours */}
      <g fill="none" stroke="#B7AE9D" strokeWidth="1.1">
        {scene.terrainContours.map((d, idx) => (
          <path key={`${period.id}-cnt-${idx}`} d={d} />
        ))}
      </g>

      {/* Water / Inundation / Brine Stratum */}
      {layers.water && scene.waterPolygon && (
        <g>
          <path
            d={scene.waterPolygon}
            fill={`url(#${patternPrefix}-water)`}
            stroke="#566D70"
            strokeWidth="1.35"
          />
        </g>
      )}

      {/* Linear Infrastructure (Roads, Rails, Canals, Dams, Relict Contours) */}
      {layers.infrastructure && (
        <g fill="none">
          {scene.paths.map((pathItem) => {
            const strokeColor =
              pathItem.kind === 'dam'
                ? '#292820'
                : pathItem.kind === 'rail'
                  ? '#8E3E2A'
                  : pathItem.kind === 'river' || pathItem.kind === 'canal'
                    ? '#476164'
                    : pathItem.kind === 'coastline'
                      ? '#4B4E38'
                      : '#54524A';
            const strokeW =
              pathItem.kind === 'dam'
                ? 5
                : pathItem.kind === 'road' || pathItem.kind === 'canal'
                  ? 2.2
                  : 1.5;

            return (
              <path
                key={pathItem.id}
                d={pathItem.d}
                stroke={strokeColor}
                strokeWidth={strokeW}
                strokeDasharray={
                  pathItem.dashed
                    ? '5 3.5'
                    : pathItem.kind === 'rail'
                      ? '7 2.5'
                      : undefined
                }
              />
            );
          })}
        </g>
      )}

      {/* Built Structures & Ruins */}
      {layers.structures && (
        <g>
          {scene.structures.map((st) => {
            const style = getStructureStyle(st.kind);
            const isUncertain =
              st.certainty === 'contested' ||
              st.certainty === 'approximate' ||
              st.kind === 'ruin' ||
              st.kind === 'submerged';

            return (
              <g key={st.id}>
                <rect
                  x={st.x}
                  y={st.y}
                  width={st.width}
                  height={st.height}
                  fill={style.fill}
                  fillOpacity={style.fillOpacity}
                  stroke={style.stroke}
                  strokeWidth="1.4"
                  strokeDasharray={isUncertain ? '3.5 2.5' : undefined}
                />
                {!compact && st.width >= 30 && (
                  <text
                    x={st.x + 4}
                    y={st.y + Math.min(st.height - 4, 12)}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fill="#292820"
                  >
                    {st.label.slice(0, 18)}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* Archival Callouts & Reference Pins */}
      {layers.annotations && !compact && (
        <g>
          {scene.annotations.map((ann) => (
            <g key={ann.id} transform={`translate(${ann.x}, ${ann.y})`}>
              <circle r="3.2" fill="#8E3E2A" />
              <circle r="6" fill="none" stroke="#8E3E2A" strokeWidth="0.9" />
              <rect
                x="8"
                y="-10"
                width={Math.min(168, ann.label.length * 5.4 + 42)}
                height="18"
                rx="1.5"
                fill="#FFFCF5"
                fillOpacity="0.93"
                stroke="#B8AF9E"
                strokeWidth="0.8"
              />
              <text
                x="12"
                y="2"
                fontSize="8.8"
                fontFamily="monospace"
                fill="#292820"
              >
                [{ann.code}] {ann.label}
              </text>
            </g>
          ))}
        </g>
      )}

      {/* Cartographic Frame Header & Scale Bar */}
      <rect
        x="8"
        y="8"
        width="584"
        height="344"
        fill="none"
        stroke="#292820"
        strokeWidth="0.9"
      />
      <g transform="translate(16, 24)">
        <rect
          x="-2"
          y="-11"
          width="245"
          height="18"
          fill="#FFFCF5"
          fillOpacity="0.9"
        />
        <text fontSize="9.5" fontFamily="monospace" fill="#292820" fontWeight="600">
          {catalogueRef} · {period.yearLabel.toUpperCase()}
        </text>
      </g>

      {/* Illustrative Reconstruction Disclaimer Stamp & Scale */}
      <g transform="translate(16, 342)">
        <rect
          x="-2"
          y="-11"
          width="270"
          height="15"
          fill="#FFFCF5"
          fillOpacity="0.88"
        />
        <text fontSize="8.2" fontFamily="monospace" fill="#54524A">
          ILLUSTRATIVE VECTOR RECONSTRUCTION · NOT GEODETIC
        </text>
      </g>
      <g transform="translate(502, 336)">
        <line x1="0" y1="4" x2="72" y2="4" stroke="#292820" strokeWidth="1.2" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#292820" strokeWidth="1.2" />
        <line x1="36" y1="1" x2="36" y2="7" stroke="#292820" strokeWidth="1" />
        <line x1="72" y1="0" x2="72" y2="8" stroke="#292820" strokeWidth="1.2" />
        <text x="0" y="-3" fontSize="8" fontFamily="monospace" fill="#292820">
          0 ··· 250m (est.)
        </text>
      </g>
    </svg>
  );
}
