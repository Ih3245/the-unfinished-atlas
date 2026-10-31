'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  PLACES,
  EPISTEMIC_LABELS,
  CERTAINTY_LABELS,
} from '@/data';
import {
  PeriodSceneRenderer,
  type SceneLayerVisibility,
} from './PeriodSceneRenderer';
import { EpistemicGlyph, StrataSliderIcon } from './ArchivalIcons';

export function TimeMachineClient({
  initialPlaceId,
  initialBeforeId,
  initialAfterId,
}: {
  initialPlaceId?: string;
  initialBeforeId?: string;
  initialAfterId?: string;
}) {
  const defaultPlace =
    PLACES.find((p) => p.id === initialPlaceId) ?? PLACES[0]!;

  const [placeId, setPlaceId] = useState<string>(defaultPlace.id);
  const activePlace = PLACES.find((p) => p.id === placeId) ?? PLACES[0]!;

  const [beforeId, setBeforeId] = useState<string>(
    initialBeforeId && activePlace.periods.some((p) => p.id === initialBeforeId)
      ? initialBeforeId
      : activePlace.periods[0]!.id
  );
  const [afterId, setAfterId] = useState<string>(
    initialAfterId && activePlace.periods.some((p) => p.id === initialAfterId)
      ? initialAfterId
      : activePlace.periods[activePlace.periods.length - 1]!.id
  );

  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [layers, setLayers] = useState<SceneLayerVisibility>({
    water: true,
    structures: true,
    infrastructure: true,
    annotations: true,
  });

  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);

  // Derive valid periods for the currently selected place safely during render
  const periodA =
    activePlace.periods.find((p) => p.id === beforeId) ??
    activePlace.periods[0]!;
  const periodB =
    activePlace.periods.find((p) => p.id === afterId) ??
    activePlace.periods[activePlace.periods.length - 1]!;

  const handlePlaceChange = (nextPlaceId: string) => {
    const nextPlace = PLACES.find((p) => p.id === nextPlaceId) ?? PLACES[0]!;
    setPlaceId(nextPlace.id);
    setBeforeId(nextPlace.periods[0]!.id);
    setAfterId(nextPlace.periods[nextPlace.periods.length - 1]!.id);
  };

  const stepChronology = () => {
    const periods = activePlace.periods;
    if (periods.length < 2) return;
    const idxA = periods.findIndex((p) => p.id === periodA.id);
    const nextA = (idxA + 1) % periods.length;
    const nextB = (nextA + 1) % periods.length;
    setBeforeId(periods[nextA]!.id);
    setAfterId(periods[nextB]!.id);
  };

  const updateSliderFromClientX = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.max(4, Math.min(96, Math.round(pct))));
  };

  const toggleLayer = (key: keyof SceneLayerVisibility) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'grid', gap: '1.75rem', paddingBlock: '1.5rem 2.5rem' }}>
      {/* 1. Control Console: Place & Dual Historical Period Selectors */}
      <div
        style={{
          background: 'var(--paper-chalk)',
          border: '1px solid var(--ink-primary)',
          padding: '1.25rem',
          display: 'grid',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))',
            gap: '1rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label htmlFor="tm-place" className="archival-label">
              1. Select Investigated Place
            </label>
            <select
              id="tm-place"
              className="archival-select"
              value={activePlace.id}
              onChange={(e) => handlePlaceChange(e.target.value)}
            >
              {PLACES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.catalogueRef} · {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tm-period-a" className="archival-label">
              2. Stratum A (Left / Earlier State)
            </label>
            <select
              id="tm-period-a"
              className="archival-select"
              value={periodA.id}
              onChange={(e) => setBeforeId(e.target.value)}
            >
              {activePlace.periods.map((per) => (
                <option key={per.id} value={per.id}>
                  {per.yearLabel} — {per.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tm-period-b" className="archival-label">
              3. Stratum B (Right / Comparison State)
            </label>
            <select
              id="tm-period-b"
              className="archival-select"
              value={periodB.id}
              onChange={(e) => setAfterId(e.target.value)}
            >
              {activePlace.periods.map((per) => (
                <option key={per.id} value={per.id}>
                  {per.yearLabel} — {per.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Period Stepper, View Switcher & Vector Layer Toggles */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingBlockStart: '0.85rem',
            borderBlockStart: '1px solid var(--rule-fine)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={stepChronology}
              className="btn-archival btn-secondary"
            >
              Cycle Available Periods
            </button>
            <button
              type="button"
              onClick={() => {
                const prevA = periodA.id;
                setBeforeId(periodB.id);
                setAfterId(prevA);
              }}
              className="btn-archival btn-secondary"
            >
              Swap A ↔ B
            </button>
            <button
              type="button"
              onClick={() =>
                setViewMode((v) =>
                  v === 'slider' ? 'side-by-side' : 'slider'
                )
              }
              className="btn-archival btn-secondary"
            >
              <StrataSliderIcon size={16} />
              <span>
                {viewMode === 'slider'
                  ? 'Switch to Side-by-Side Plates'
                  : 'Switch to Overlay Slider'}
              </span>
            </button>
          </div>

          {/* Vector Layer Checkboxes */}
          <fieldset
            style={{
              border: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem 1rem',
              alignItems: 'center',
            }}
          >
            <legend
              className="catalogue-code"
              style={{ float: 'left', marginInlineEnd: '0.35rem' }}
            >
              LAYERS:
            </legend>
            {(
              [
                ['water', 'Water / Brine'],
                ['structures', 'Structures & Ruins'],
                ['infrastructure', 'Roads / Rails / Dams'],
                ['annotations', 'Callouts'],
              ] as const
            ).map(([key, lbl]) => (
              <label
                key={key}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: 'var(--text-caption)',
                  cursor: 'pointer',
                  minHeight: '36px',
                }}
              >
                <input
                  type="checkbox"
                  checked={layers[key]}
                  onChange={() => toggleLayer(key)}
                />
                <span>{lbl}</span>
              </label>
            ))}
          </fieldset>
        </div>

        {periodA.id === periodB.id && (
          <p
            role="status"
            style={{
              padding: '0.6rem 0.85rem',
              background: 'var(--ochre-tint)',
              color: 'var(--ochre-text)',
              border: '1px solid var(--ochre-mark)',
              fontSize: 'var(--text-body-sm)',
            }}
          >
            Stratum A and Stratum B are currently set to the same period (
            {periodA.yearLabel}). Select two distinct historical periods above
            to inspect morphological change.
          </p>
        )}
      </div>

      {/* 2. Interactive Visual Comparison Stage */}
      {viewMode === 'slider' ? (
        <div
          style={{
            background: 'var(--paper-chalk)',
            border: '1px solid var(--rule-strong)',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBlockEnd: '0.65rem',
            }}
          >
            <span
              className="catalogue-code"
              style={{ color: 'var(--olive-text)', fontWeight: 700 }}
            >
              LEFT PLATE (A): {periodA.yearLabel.toUpperCase()}
            </span>
            <span
              className="catalogue-code"
              style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}
            >
              RIGHT PLATE (B): {periodB.yearLabel.toUpperCase()}
            </span>
          </div>

          {/* Draggable Overlay Container */}
          <div
            ref={stageRef}
            onPointerDown={(e) => {
              draggingRef.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              updateSliderFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!draggingRef.current) return;
              updateSliderFromClientX(e.clientX);
            }}
            onPointerUp={() => {
              draggingRef.current = false;
            }}
            onPointerCancel={() => {
              draggingRef.current = false;
            }}
            style={{
              position: 'relative',
              userSelect: 'none',
              touchAction: 'pan-y',
              cursor: 'ew-resize',
            }}
          >
            {/* Base Plate: Stratum B */}
            <PeriodSceneRenderer
              period={periodB}
              placeName={activePlace.name}
              catalogueRef={activePlace.catalogueRef}
              layers={layers}
            />

            {/* Clipped Top Plate: Stratum A */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(0 ${100 - splitPercent}% 0 0)`,
                pointerEvents: 'none',
              }}
            >
              <PeriodSceneRenderer
                period={periodA}
                placeName={activePlace.name}
                catalogueRef={activePlace.catalogueRef}
                layers={layers}
              />
            </div>

            {/* Vertical Split Divider Handle */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                insetBlock: 0,
                left: `${splitPercent}%`,
                width: '2px',
                background: 'var(--accent-terracotta)',
                transform: 'translateX(-1px)',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '2px',
                  background: 'var(--ink-primary)',
                  color: 'var(--paper-chalk)',
                  border: '1.5px solid var(--paper-chalk)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-catalogue)',
                  fontSize: '0.75rem',
                  boxShadow: 'var(--shadow-elevated)',
                }}
              >
                ◄►
              </div>
            </div>
          </div>

          {/* Keyboard-Accessible Range Input Control + Illustrative Reconstruction Disclosure */}
          <div
            style={{
              marginBlockStart: '0.9rem',
              display: 'grid',
              gap: '0.45rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                flexWrap: 'wrap',
              }}
            >
              <label
                htmlFor="tm-range-slider"
                className="catalogue-code"
                style={{ fontWeight: 600 }}
              >
                COMPARISON CURTAIN ({splitPercent}% STRATUM A):
              </label>
              <input
                id="tm-range-slider"
                type="range"
                min={4}
                max={96}
                value={splitPercent}
                onChange={(e) => setSplitPercent(Number(e.target.value))}
                style={{
                  flex: '1 1 14rem',
                  minHeight: '44px',
                  accentColor: 'var(--accent-terracotta)',
                }}
              />
            </div>

            <p className="catalogue-code">
              <strong>RECONSTRUCTION DISCLOSURE:</strong> Plates above are
              clearly labeled illustrative vector reconstructions synthesized
              from local survey records—never presented as historical
              photographs. Dashed structure outlines indicate approximate,
              contested, or ruined/submerged footprints.
            </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
            gap: '1.25rem',
          }}
        >
          {[
            { label: 'STRATUM A', period: periodA },
            { label: 'STRATUM B', period: periodB },
          ].map(({ label, period }) => (
            <figure
              key={`${label}-${period.id}`}
              style={{
                margin: 0,
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1rem',
              }}
            >
              <div className="catalogue-code" style={{ marginBlockEnd: '0.45rem' }}>
                {label} · {period.yearLabel}
              </div>
              <PeriodSceneRenderer
                period={period}
                placeName={activePlace.name}
                catalogueRef={activePlace.catalogueRef}
                layers={layers}
              />
              <figcaption
                className="catalogue-code"
                style={{ marginBlockStart: '0.45rem' }}
              >
                {period.scene.reconstructionBasis}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* 3. Side-by-Side Morphological, Infrastructure & Certainty Diff */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 21rem), 1fr))',
          gap: '1.35rem',
        }}
      >
        {[
          { tag: 'STRATUM A', data: periodA, accent: 'var(--olive-text)' },
          {
            tag: 'STRATUM B',
            data: periodB,
            accent: 'var(--accent-terracotta)',
          },
        ].map(({ tag, data, accent }) => (
          <section
            key={`${tag}-${data.id}`}
            aria-label={`${tag}: ${data.yearLabel}`}
            style={{
              background: 'var(--paper-chalk)',
              border: '1px solid var(--rule-strong)',
              padding: '1.35rem',
              display: 'grid',
              gap: '0.95rem',
              alignContent: 'start',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                paddingBlockEnd: '0.6rem',
                borderBlockEnd: '1px solid var(--rule-fine)',
              }}
            >
              <span
                className="catalogue-code"
                style={{ color: accent, fontWeight: 700 }}
              >
                {tag} · {data.yearLabel}
              </span>
              <span
                className={`epistemic-badge epistemic-${data.epistemicStatus}`}
              >
                <EpistemicGlyph status={data.epistemicStatus} />
                {EPISTEMIC_LABELS[data.epistemicStatus].label}
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-h3)' }}>{data.title}</h2>
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--ink-secondary)',
                  marginBlockStart: '0.35rem',
                }}
              >
                {data.summary}
              </p>
            </div>

            <dl
              style={{
                margin: 0,
                display: 'grid',
                gap: '0.6rem',
                fontSize: 'var(--text-body-sm)',
                paddingBlock: '0.75rem',
                borderBlock: '1px solid var(--rule-fine)',
              }}
            >
              <div>
                <dt className="catalogue-code">SETTLEMENT &amp; OCCUPANCY</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>{data.settlementScale}</dd>
              </div>
              <div>
                <dt className="catalogue-code">BUILT FABRIC</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>{data.builtFabric}</dd>
              </div>
              <div>
                <dt className="catalogue-code">INFRASTRUCTURE</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>
                  {data.infrastructureState}
                </dd>
              </div>
              <div>
                <dt className="catalogue-code">LANDSCAPE &amp; HYDROLOGY</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>
                  {data.landscapeCondition}
                </dd>
              </div>
            </dl>

            {/* Land-Use Share Bars (Paired with numbers & certainty text, never color alone) */}
            <div>
              <div className="catalogue-code" style={{ marginBlockEnd: '0.45rem' }}>
                ESTIMATED LAND-USE DISTRIBUTION
              </div>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {data.scene.landUse.map((lu) => (
                  <div key={lu.category}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'var(--text-caption)',
                        marginBlockEnd: '0.15rem',
                      }}
                    >
                      <span>
                        {lu.category}{' '}
                        <span className="catalogue-code">
                          ({CERTAINTY_LABELS[lu.certainty]})
                        </span>
                      </span>
                      <strong className="tabular-nums">{lu.percentage}%</strong>
                    </div>
                    <div
                      style={{
                        height: '8px',
                        background: 'var(--paper-vellum)',
                        border: '1px solid var(--rule-strong)',
                      }}
                    >
                      <div
                        style={{
                          width: `${lu.percentage}%`,
                          height: '100%',
                          background: accent,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Transformations & Known vs. Uncertain Basis */}
            <div
              style={{
                background: 'var(--paper-warm)',
                border: '1px solid var(--rule-fine)',
                padding: '0.85rem',
                fontSize: 'var(--text-caption)',
              }}
            >
              <strong style={{ display: 'block', marginBlockEnd: '0.3rem' }}>
                Documented Changes in This Stratum:
              </strong>
              <ul
                style={{
                  margin: '0 0 0.6rem',
                  paddingInlineStart: '1.1rem',
                  display: 'grid',
                  gap: '0.25rem',
                }}
              >
                {data.keyChangesFromPrior.map((chg) => (
                  <li key={chg}>{chg}</li>
                ))}
              </ul>
              <div style={{ color: 'var(--ink-secondary)' }}>
                <strong>Known vs. Reconstructed:</strong> {data.certaintyNote}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer Cross-Link to Full Place Dossier */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.15rem 1.35rem',
          background: 'var(--paper-vellum)',
          border: '1px solid var(--rule-strong)',
        }}
      >
        <div>
          <span className="catalogue-code">{activePlace.catalogueRef}</span>
          <strong style={{ display: 'block', fontFamily: 'var(--font-editorial)', fontSize: '1.15rem' }}>
            Continue investigating {activePlace.name}
          </strong>
        </div>
        <Link
          href={`/places/${activePlace.slug}`}
          className="btn-archival"
        >
          Open Full Place Dossier &amp; Artifacts
        </Link>
      </div>
    </div>
  );
}
