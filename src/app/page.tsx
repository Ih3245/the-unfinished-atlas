import React from 'react';
import Link from 'next/link';
import {
  PLACES,
  ARTIFACTS,
  CATEGORY_LABELS,
  ARTIFACT_TYPE_LABELS,
  getAtlasSummaryCounts,
} from '@/data';
import { HomeCartographicPreview } from '@/components/HomeCartographicPreview';
import { ChronologyStripClient } from '@/components/ChronologyStripClient';
import { PeriodSceneRenderer } from '@/components/PeriodSceneRenderer';
import { ArtifactPlateRenderer } from '@/components/ArtifactPlateRenderer';
import { EpistemicGlyph } from '@/components/ArchivalIcons';
import styles from './page.module.css';

export default function HomePage() {
  const counts = getAtlasSummaryCounts();

  const essayPlace =
    PLACES.find((p) => p.isEditorialEssaySubject) ?? PLACES[1]!;
  const leadInvestigation = PLACES[2]!; // Port Meridian & The Shifting Spit
  const ledgerPlaces = PLACES.filter((p) => p.id !== leadInvestigation.id);

  // Curated cross-medium artifact selection (Ledger, Transcript, Blueprint, Disputed Photo)
  const featuredArtifacts = [
    ARTIFACTS[0]!, // Survey Record
    ARTIFACTS[2]!, // Oral History
    ARTIFACTS[7]!, // Bathymetric Map
    ARTIFACTS[18]!, // Disputed Subterranean Photo
  ];

  // Collect unresolved historical questions across the dataset
  const unresolvedItems = PLACES.flatMap((place) =>
    place.claims
      .filter((c) => c.status === 'unresolved')
      .map((claim) => ({ place, claim }))
  ).slice(0, 6);

  return (
    <div>
      {/* A1. OPENING EDITORIAL ENTRANCE & INTERACTIVE FRONTISPIECE */}
      <section className={styles.openingSection}>
        <div className="atlas-container">
          <div className={styles.frontispieceHeader}>
            <div>
              <h1 className={styles.displayHeadline}>
                Places erased by water, iron, and decree.
              </h1>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <p className={styles.introStatement}>
                <strong>The Unfinished Atlas</strong> investigates settlements,
                transit cathedrals, coastlines, and neighborhoods altered beyond
                recognition—pairing surviving surveys and spoken memory with
                what the historical record still cannot resolve.
              </p>

              {/* Dataset Scale Indication */}
              <div
                className={styles.datasetLedger}
                aria-label="Local archival dataset summary"
              >
                <div>
                  <span className={styles.ledgerMetricValue}>{counts.places}</span>
                  <span className="catalogue-code">Investigated Places</span>
                </div>
                <div>
                  <span className={styles.ledgerMetricValue}>
                    {counts.artifacts}
                  </span>
                  <span className="catalogue-code">Catalogued Artifacts</span>
                </div>
                <div>
                  <span className={styles.ledgerMetricValue}>
                    {counts.eras} Eras / {counts.periodSnapshots} Strata
                  </span>
                  <span className="catalogue-code">Historical Periods</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Cartographic Feature + Synchronized Featured Dossier */}
          <HomeCartographicPreview />
        </div>
      </section>

      {/* A2. INVESTIGATED PLACES — ASYMMETRICAL FOLIO & DOSSIER INDEX */}
      <section className={styles.sectionBlock}>
        <div className="atlas-container">
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
              <span className="catalogue-code">GAZETTEER · SERIES UA-PL-01 TO 08</span>
              <h2 style={{ marginBlockStart: '0.2rem' }}>
                Field Investigations Across Six Regions
              </h2>
            </div>
            <Link href="/explore" className="btn-archival btn-secondary">
              Explore Full Cartographic Index
            </Link>
          </div>

          <div className={styles.placesEditorialGrid}>
            {/* Left: Featured Illustrated Sheet */}
            <article className={styles.leadPlaceSheet}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBlockEnd: '0.6rem',
                  }}
                  className="catalogue-code"
                >
                  <span>{leadInvestigation.catalogueRef} · LITTORAL INQUEST</span>
                  <span>{leadInvestigation.region}</span>
                </div>
                <h3 style={{ fontSize: 'var(--text-h2)', marginBlockEnd: '0.5rem' }}>
                  <Link href={`/places/${leadInvestigation.slug}`}>
                    {leadInvestigation.name}
                  </Link>
                </h3>
                <p
                  style={{
                    color: 'var(--ink-secondary)',
                    fontSize: 'var(--text-body-sm)',
                    marginBlockEnd: '1rem',
                  }}
                >
                  {leadInvestigation.editorialIntro}
                </p>
              </div>

              <figure style={{ margin: 0 }}>
                <PeriodSceneRenderer
                  period={leadInvestigation.periods[2]!}
                  placeName={leadInvestigation.name}
                  catalogueRef={leadInvestigation.catalogueRef}
                  compact
                />
                <figcaption
                  className="catalogue-code"
                  style={{ marginBlockStart: '0.45rem' }}
                >
                  Fig. 1 — {leadInvestigation.name} ({leadInvestigation.periods[2]!.yearLabel}):
                  granite quays stranded 2.9km inland of present surf.
                </figcaption>
              </figure>

              <div>
                <Link
                  href={`/places/${leadInvestigation.slug}`}
                  className="btn-archival"
                >
                  Read Full Investigation
                </Link>
              </div>
            </article>

            {/* Right: Dense Typographic Folio Register */}
            <div className={styles.indexLedgerColumn}>
              {ledgerPlaces.map((place) => (
                <Link
                  key={place.id}
                  href={`/places/${place.slug}`}
                  className={styles.indexLedgerRow}
                >
                  <span
                    className="catalogue-code"
                    style={{ color: 'var(--accent-terracotta)', fontWeight: 600 }}
                  >
                    {place.catalogueRef}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: 'var(--ink-primary)',
                      }}
                    >
                      {place.name}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--ink-secondary)',
                        marginBlockStart: '0.15rem',
                      }}
                    >
                      {CATEGORY_LABELS[place.category]} · {place.region}
                    </div>
                  </div>
                  <span className="catalogue-code tabular-nums">
                    Rupture {place.activeSpan.turningPointYear}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A3. CHRONOLOGICAL STRIP OF SIGNIFICANT TRANSFORMATIONS */}
      <section className={styles.sectionBlock}>
        <div className="atlas-container">
          <ChronologyStripClient />
        </div>
      </section>

      {/* A4. EDITORIAL MONOGRAPH FEATURE ON ONE PLACE */}
      <section className={styles.sectionBlock}>
        <div className="atlas-container">
          <div className={styles.essaySpread}>
            <div>
              <span className="catalogue-code">
                MONOGRAPH ESSAY · {essayPlace.catalogueRef}
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-h1)',
                  marginBlock: '0.35rem 0.85rem',
                }}
              >
                Eleven Nights in November: When Demolition Outran the Viaduct
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-body-lg)',
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  color: 'var(--ink-secondary)',
                  marginBlockEnd: '1rem',
                }}
              >
                {essayPlace.subtitle}
              </p>
              <p
                style={{
                  marginBlockEnd: '0.9rem',
                  fontSize: 'var(--text-body)',
                }}
              >
                {essayPlace.narrativeSections[0]!.body[0]}
              </p>
              <p
                style={{
                  marginBlockEnd: '1.35rem',
                  fontSize: 'var(--text-body)',
                  color: 'var(--ink-secondary)',
                }}
              >
                {essayPlace.narrativeSections[1]!.body[0]}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link href={`/places/${essayPlace.slug}`} className="btn-archival">
                  Examine St. Clement Dossier
                </Link>
                <Link
                  href={`/time-machine?place=${essayPlace.id}&before=sc-1908&after=sc-2024`}
                  className="btn-archival btn-secondary"
                >
                  Open 1908 / 2024 Comparison
                </Link>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <figure style={{ margin: 0 }}>
                <PeriodSceneRenderer
                  period={essayPlace.periods[0]!}
                  placeName={essayPlace.name}
                  catalogueRef={essayPlace.catalogueRef}
                />
                <figcaption
                  className="catalogue-code"
                  style={{ marginBlockStart: '0.5rem' }}
                >
                  Plate II-A — {essayPlace.periods[0]!.yearLabel}: Octavio Solís’s
                  48m clear-span train shed prior to the 1973 floodlit demolition.
                </figcaption>
              </figure>

              <div
                style={{
                  padding: '1rem 1.15rem',
                  background: 'var(--paper-warm)',
                  border: '1px solid var(--rule-strong)',
                }}
              >
                <div className="catalogue-code" style={{ marginBlockEnd: '0.25rem' }}>
                  SURVIVING SUBTERRANEAN TRACE
                </div>
                <p style={{ fontSize: 'var(--text-body-sm)' }}>
                  Beneath today’s surface commuter parking lot, the 1894 vaulted
                  brick parcel undercroft remains unexcavated—still connected by a
                  sealed hydraulic cut toward Lock 8 of Nine-Locks Ward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A5. RECENTLY EXPLORED ARTIFACTS — MEDIUM-SPECIFIC TREATMENTS */}
      <section className={styles.sectionBlock}>
        <div className="atlas-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBlockEnd: '1.5rem',
            }}
          >
            <div>
              <h2>Specimens from the Artifact Cabinet</h2>
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--ink-secondary)',
                  marginBlockStart: '0.25rem',
                }}
              >
                Valuation rolls, oral-history transcripts, copperplate soundings,
                and contested subterranean negatives.
              </p>
            </div>
            <Link href="/artifacts" className="btn-archival btn-secondary">
              Inspect All {counts.artifacts} Artifacts
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 18.5rem), 1fr))',
              gap: '1.35rem',
              alignItems: 'start',
            }}
          >
            {featuredArtifacts.map((art) => (
              <article
                key={art.id}
                style={{
                  display: 'grid',
                  gap: '0.75rem',
                }}
              >
                <ArtifactPlateRenderer artifact={art} />
                <div>
                  <div className="catalogue-code">
                    {art.catalogueRef} · {ARTIFACT_TYPE_LABELS[art.type]} ·{' '}
                    {art.dateDisplay}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.08rem',
                      marginBlock: '0.25rem 0.35rem',
                    }}
                  >
                    <Link href={`/artifacts/${art.id}`}>{art.title}</Link>
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    {art.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* A6. UNRESOLVED HISTORICAL QUESTIONS INQUEST */}
      <section
        style={{
          paddingBlock: 'var(--space-7) var(--space-4)',
        }}
      >
        <div className="atlas-container">
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
              <span className="epistemic-badge epistemic-unresolved">
                <EpistemicGlyph status="unresolved" />
                OPEN ARCHIVAL INQUIRIES
              </span>
              <h2 style={{ marginBlockStart: '0.5rem' }}>
                What the Historical Record Leaves Unanswered
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--ink-secondary)',
                  marginBlockStart: '0.25rem',
                }}
              >
                Excised minute books, withheld tunnel drawings, unrecorded salvage
                lorries, and unexcavated cellars.
              </p>
            </div>
            <Link href="/desk" className="btn-archival">
              Track Inquiries on Your Research Desk
            </Link>
          </div>

          <div className={styles.questionsLedger}>
            {unresolvedItems.map(({ place, claim }) => (
              <article
                key={claim.id}
                style={{
                  background: 'var(--paper-chalk)',
                  border: '1px solid var(--rule-strong)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.85rem',
                }}
              >
                <div>
                  <div
                    className="catalogue-code"
                    style={{
                      color: 'var(--accent-terracotta)',
                      marginBlockEnd: '0.35rem',
                    }}
                  >
                    {place.catalogueRef} · {place.name.toUpperCase()}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '1.12rem',
                      lineHeight: 1.45,
                      color: 'var(--ink-primary)',
                      marginBlockEnd: '0.5rem',
                    }}
                  >
                    {claim.statement}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--text-caption)',
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    <strong>Evidentiary status:</strong> {claim.evidenceNote}
                  </p>
                </div>

                <div>
                  <Link
                    href={`/places/${place.slug}#epistemic-ledger`}
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 600,
                    }}
                  >
                    Examine evidence &amp; sources in {place.catalogueRef}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
