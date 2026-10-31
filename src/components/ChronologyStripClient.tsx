'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { EVENTS, PLACES, EPISTEMIC_LABELS } from '@/data';
import { EpistemicGlyph } from './ArchivalIcons';

export function ChronologyStripClient() {
  const railRef = useRef<HTMLDivElement>(null);
  const sortedEvents = [...EVENTS].sort((a, b) => a.year - b.year);
  const [activeDot, setActiveDot] = useState(0);

  const scrollRail = (direction: 'prev' | 'next') => {
    const el = railRef.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = 340 * (direction === 'next' ? 1 : -1);
    el.scrollBy({
      left: step,
      behavior: reduced ? 'auto' : 'smooth',
    });
    setActiveDot((prev) =>
      direction === 'next'
        ? Math.min(sortedEvents.length - 1, prev + 1)
        : Math.max(0, prev - 1)
    );
  };

  return (
    <div
      role="region"
      aria-label="Chronological strip of significant landscape and urban transformations"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBlockEnd: '1rem',
        }}
      >
        <div>
          <h2>Chronology of Ruptures &amp; Resurfacings (1879–2022)</h2>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--ink-secondary)',
              marginBlockStart: '0.25rem',
            }}
          >
            Fourteen dated turning points linking gale breaches, dam closures,
            nocturnal demolitions, and drought emergences.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => scrollRail('prev')}
            className="btn-archival btn-secondary"
            aria-label="Scroll chronology earlier"
          >
            Earlier
          </button>
          <button
            type="button"
            onClick={() => scrollRail('next')}
            className="btn-archival btn-secondary"
            aria-label="Scroll chronology later"
          >
            Later
          </button>
        </div>
      </div>

      {/* Edge-Faded Snap Carousel Track (No Visible Native Scrollbar) */}
      <div
        ref={railRef}
        tabIndex={0}
        className="chronology-rail"
        style={{
          maskImage:
            'linear-gradient(to right, #000 0%, #000 calc(100% - 2.2rem), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, #000 0%, #000 calc(100% - 2.2rem), transparent 100%)',
        }}
      >
        {sortedEvents.map((evt, idx) => {
          const primaryPlace = PLACES.find((p) => p.id === evt.placeIds[0]);
          return (
            <article
              key={evt.id}
              onFocus={() => setActiveDot(idx)}
              className="chronology-stop"
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBlockEnd: '0.5rem',
                  }}
                >
                  <span
                    className="tabular-nums"
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '1.65rem',
                      fontWeight: 600,
                      lineHeight: 1,
                      color: 'var(--accent-terracotta)',
                    }}
                  >
                    {evt.year}
                  </span>
                  <span className={`epistemic-badge epistemic-${evt.epistemicStatus}`}>
                    <EpistemicGlyph status={evt.epistemicStatus} />
                    {EPISTEMIC_LABELS[evt.epistemicStatus].label}
                  </span>
                </div>

                <div className="catalogue-code" style={{ marginBlockEnd: '0.3rem' }}>
                  {evt.catalogueRef} · {evt.dateDisplay}
                </div>
                <h3 style={{ fontSize: '1.08rem', marginBlockEnd: '0.45rem' }}>
                  {evt.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  {evt.summary}
                </p>
              </div>

              {primaryPlace && (
                <div
                  style={{
                    paddingBlockStart: '0.6rem',
                    borderBlockStart: '1px solid var(--rule-fine)',
                    fontSize: 'var(--text-caption)',
                  }}
                >
                  <Link
                    href={`/places/${primaryPlace.slug}`}
                    style={{ fontWeight: 600 }}
                  >
                    {primaryPlace.catalogueRef} · {primaryPlace.name}
                  </Link>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Position Indicator Dots (Never Color Alone — Sizing + Border) */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          gap: '0.35rem',
          marginBlockStart: '0.65rem',
          alignItems: 'center',
        }}
      >
        {sortedEvents.map((evt, idx) => (
          <span
            key={evt.id}
            style={{
              width: idx === activeDot ? '1.35rem' : '0.45rem',
              height: '0.45rem',
              background:
                idx === activeDot
                  ? 'var(--accent-terracotta)'
                  : 'var(--rule-strong)',
              borderRadius: '1px',
              transition: 'width 160ms ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
