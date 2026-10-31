import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PLACES,
  CATEGORY_LABELS,
  ARTIFACT_TYPE_LABELS,
  EPISTEMIC_LABELS,
  CERTAINTY_LABELS,
  getPlaceBySlug,
  getArtifactById,
  getEventById,
  getPersonById,
  getPlaceById,
  getSourceById,
} from '@/data';
import { PeriodSceneRenderer } from '@/components/PeriodSceneRenderer';
import { ArtifactPlateRenderer } from '@/components/ArtifactPlateRenderer';
import { SaveToDeskControls } from '@/components/SaveToDeskControls';
import { EpistemicGlyph } from '@/components/ArchivalIcons';
import styles from './place.module.css';

export function generateStaticParams() {
  return PLACES.map((place) => ({ slug: place.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const place = getPlaceBySlug(params.slug);
  if (!place) {
    return { title: 'Missing Place Record' };
  }
  return {
    title: `${place.name} (${place.catalogueRef})`,
    description: place.subtitle,
  };
}

export default function PlaceInvestigationPage({
  params,
}: {
  params: { slug: string };
}) {
  const place = getPlaceBySlug(params.slug);
  if (!place) {
    notFound();
  }

  const artifacts = place.artifactIds
    .map((id) => getArtifactById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const events = place.eventIds
    .map((id) => getEventById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .sort((a, b) => a.year - b.year);
  const people = place.personIds
    .map((id) => getPersonById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedPlaces = place.relatedPlaceIds
    .map((id) => getPlaceById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const sources = place.sourceIds
    .map((id) => getSourceById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const verifiedClaims = place.claims.filter((c) => c.status === 'verified');
  const interpretedClaims = place.claims.filter(
    (c) => c.status === 'interpreted'
  );
  const unresolvedClaims = place.claims.filter(
    (c) => c.status === 'unresolved'
  );

  const variantHeaderClass =
    place.layoutVariant === 'architectural-inquest'
      ? styles.architecturalHeader
      : place.layoutVariant === 'hydrographic-folio'
        ? styles.hydrographicHeader
        : '';

  const variantLabel =
    place.layoutVariant === 'hydrographic-folio'
      ? 'HYDROGRAPHIC & BATHYMETRIC FOLIO'
      : place.layoutVariant === 'architectural-inquest'
        ? 'STRUCTURAL & ARCHITECTURAL INQUEST'
        : place.layoutVariant === 'field-expedition'
          ? 'FIELD RECONNAISSANCE & TRANSECT DOSSIER'
          : 'URBAN CADASTRAL & ORAL MONOGRAPH';

  return (
    <article>
      {/* 1. Editorial Dossier Header (Varied by layoutVariant) */}
      <header className={`${styles.dossierHeader} ${variantHeaderClass}`}>
        <div className="atlas-container">
          <div className={styles.breadcrumbRow}>
            <nav aria-label="Breadcrumb" className="catalogue-code">
              <Link href="/">ATLAS</Link> /{' '}
              <Link href="/explore">GAZETTEER</Link> /{' '}
              <strong style={{ color: 'var(--accent-terracotta)' }}>
                {place.catalogueRef}
              </strong>
            </nav>
            <span className="catalogue-code">{variantLabel}</span>
          </div>

          <div className={styles.headerSplit}>
            <div>
              <h1 style={{ marginBlockEnd: '0.45rem' }}>{place.name}</h1>
              {place.formerName && (
                <div
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: 'var(--ink-secondary)',
                    marginBlockEnd: '0.85rem',
                  }}
                >
                  Recorded prior to rupture as: {place.formerName}
                </div>
              )}

              <p
                style={{
                  fontSize: 'var(--text-body-lg)',
                  marginBlockEnd: '1.25rem',
                }}
              >
                {place.editorialIntro}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  alignItems: 'center',
                }}
              >
                <SaveToDeskControls
                  entityType="place"
                  entityId={place.id}
                  label={place.name}
                />
                <Link
                  href={`/time-machine?place=${place.id}`}
                  className="btn-archival"
                >
                  Compare Strata in Time Machine
                </Link>
              </div>
            </div>

            {/* Metadata & Demonstration Provenance Box */}
            <div className={styles.metaLedger}>
              <div
                className="catalogue-code"
                style={{
                  paddingBlockEnd: '0.45rem',
                  borderBlockEnd: '1px solid var(--rule-fine)',
                }}
              >
                PARCEL METADATA · {place.catalogueRef}
              </div>

              <dl
                style={{
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '0.65rem',
                  fontSize: 'var(--text-body-sm)',
                }}
              >
                <div>
                  <dt className="catalogue-code">REGION</dt>
                  <dd style={{ margin: '0.1rem 0 0', fontWeight: 600 }}>
                    {place.region}
                  </dd>
                </div>
                <div>
                  <dt className="catalogue-code">CLASSIFICATION</dt>
                  <dd style={{ margin: '0.1rem 0 0', fontWeight: 600 }}>
                    {CATEGORY_LABELS[place.category]}
                  </dd>
                </div>
                <div>
                  <dt className="catalogue-code">ACTIVE SPAN</dt>
                  <dd
                    className="tabular-nums"
                    style={{ margin: '0.1rem 0 0', fontWeight: 600 }}
                  >
                    {place.activeSpan.startYear} →{' '}
                    {place.activeSpan.turningPointYear}
                  </dd>
                </div>
                <div>
                  <dt className="catalogue-code">ATLAS SECTOR</dt>
                  <dd
                    className="tabular-nums"
                    style={{ margin: '0.1rem 0 0', fontWeight: 600 }}
                  >
                    {place.atlasPosition.gridSector} ({place.atlasPosition.elevationMeters}m)
                  </dd>
                </div>
              </dl>

              <div
                style={{
                  paddingBlockStart: '0.55rem',
                  borderBlockStart: '1px solid var(--rule-fine)',
                  fontSize: 'var(--text-caption)',
                  color: 'var(--ink-secondary)',
                }}
              >
                <strong>Present Condition:</strong> {place.currentStatusLabel}
                <br />
                <strong>Cartographic Status:</strong> {place.coordinateDisclaimer}
              </div>
            </div>
          </div>

          {/* Layout Variant Feature: Architectural Inquest opens directly with primary orthographic plate */}
          {place.layoutVariant === 'architectural-inquest' && (
            <figure style={{ margin: '1.75rem 0 0' }}>
              <PeriodSceneRenderer
                period={place.periods[0]!}
                placeName={place.name}
                catalogueRef={place.catalogueRef}
              />
              <figcaption
                className="catalogue-code"
                style={{ marginBlockStart: '0.45rem' }}
              >
                PRIMARY ARCHITECTURAL RECONSTRUCTION — {place.periods[0]!.yearLabel}:{' '}
                {place.periods[0]!.scene.reconstructionBasis}
              </figcaption>
            </figure>
          )}
        </div>
      </header>

      {/* Sticky Section Wayfinding TOC */}
      <nav aria-label="Dossier sections" className={styles.sectionNavStrip}>
        <div className="atlas-container">
          <ul className={styles.sectionNavLinks}>
            <li>
              <a href="#narrative">01. Historical Inquiry</a>
            </li>
            <li>
              <a href="#transformation">02. Physical Transformation</a>
            </li>
            <li>
              <a href="#chronology">03. Chronological Strata ({place.periods.length})</a>
            </li>
            <li>
              <a href="#epistemic-ledger">
                04. Verified vs. Unresolved ({place.claims.length})
              </a>
            </li>
            <li>
              <a href="#artifacts">
                05. Archival Artifacts ({artifacts.length})
              </a>
            </li>
            <li>
              <a href="#connections">06. Network &amp; Sources</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 2. Historical Inquiry & Field Markers */}
      <section id="narrative" className={styles.dossierSection}>
        <div className="atlas-container">
          <div className={styles.narrativeGrid}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {place.narrativeSections.map((sec) => (
                <div key={sec.heading}>
                  <h2 style={{ marginBlockEnd: '0.7rem' }}>{sec.heading}</h2>
                  <div style={{ display: 'grid', gap: '0.85rem' }}>
                    {sec.body.map((para, pIdx) => (
                      <p key={`${sec.heading}-${pIdx}`}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Surviving Field Markers Sidebar */}
            <aside
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.35rem',
              }}
            >
              <span className="catalogue-code">
                FIELD RECONNAISSANCE · SURVIVING TRACES
              </span>
              <h3 style={{ marginBlock: '0.3rem 0.75rem' }}>
                What Remains Visible on the Ground
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingInlineStart: '1.15rem',
                  display: 'grid',
                  gap: '0.6rem',
                  fontSize: 'var(--text-body-sm)',
                }}
              >
                {place.physicalTransformation.survivingMarkers.map((marker) => (
                  <li key={marker}>{marker}</li>
                ))}
              </ul>

              <div
                style={{
                  marginBlockStart: '1.15rem',
                  paddingBlockStart: '0.85rem',
                  borderBlockStart: '1px solid var(--rule-fine)',
                }}
              >
                <div className="catalogue-code" style={{ marginBlockEnd: '0.35rem' }}>
                  INDEXED SUBJECTS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {place.subjects.map((subj) => (
                    <Link
                      key={subj}
                      href={`/search?q=${encodeURIComponent(subj)}`}
                      className="catalogue-code"
                      style={{
                        padding: '0.2rem 0.5rem',
                        background: 'var(--paper-warm)',
                        border: '1px solid var(--rule-strong)',
                        textDecoration: 'none',
                      }}
                    >
                      {subj}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. Physical Transformation Anatomy */}
      <section id="transformation" className={styles.dossierSection}>
        <div className="atlas-container">
          <span className="catalogue-code">MORPHOLOGICAL ANATOMY</span>
          <h2 style={{ marginBlockStart: '0.2rem' }}>
            Three Stages of Physical Transformation
          </h2>

          <div className={styles.transformationGrid}>
            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.25rem',
              }}
            >
              <div className="catalogue-code" style={{ color: 'var(--olive-text)' }}>
                I. EARLIER MORPHOLOGY
              </div>
              <p style={{ marginBlockStart: '0.5rem', fontSize: 'var(--text-body-sm)' }}>
                {place.physicalTransformation.originalMorphology}
              </p>
            </div>

            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.25rem',
              }}
            >
              <div
                className="catalogue-code"
                style={{ color: 'var(--accent-terracotta)' }}
              >
                II. AGENT OF ERASURE / RUPTURE
              </div>
              <p style={{ marginBlockStart: '0.5rem', fontSize: 'var(--text-body-sm)' }}>
                {place.physicalTransformation.agentOfChange}
              </p>
            </div>

            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.25rem',
              }}
            >
              <div className="catalogue-code">III. PRESENT RESIDUAL STATE</div>
              <p style={{ marginBlockStart: '0.5rem', fontSize: 'var(--text-body-sm)' }}>
                {place.physicalTransformation.presentTrace}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Chronological Strata & Linked Events */}
      <section id="chronology" className={styles.dossierSection}>
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
              <span className="catalogue-code">STRATIGRAPHIC SEQUENCE</span>
              <h2 style={{ marginBlockStart: '0.2rem' }}>
                Recorded Historical Periods &amp; Turning Points
              </h2>
            </div>
            <Link
              href={`/time-machine?place=${place.id}`}
              className="btn-archival btn-secondary"
            >
              Launch Interactive Slider Comparison
            </Link>
          </div>

          <div className={styles.periodsGrid}>
            {place.periods.map((period) => (
              <div
                key={period.id}
                style={{
                  background: 'var(--paper-chalk)',
                  border: '1px solid var(--rule-strong)',
                  padding: '1.15rem',
                  display: 'grid',
                  gap: '0.8rem',
                  alignContent: 'start',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span className="catalogue-code">{period.yearLabel}</span>
                  <span
                    className={`epistemic-badge epistemic-${period.epistemicStatus}`}
                  >
                    <EpistemicGlyph status={period.epistemicStatus} />
                    {EPISTEMIC_LABELS[period.epistemicStatus].label}
                  </span>
                </div>

                <PeriodSceneRenderer
                  period={period}
                  placeName={place.name}
                  catalogueRef={place.catalogueRef}
                  compact
                />

                <h3 style={{ fontSize: '1.12rem' }}>{period.title}</h3>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  {period.summary}
                </p>

                <div
                  style={{
                    fontSize: 'var(--text-caption)',
                    paddingBlockStart: '0.55rem',
                    borderBlockStart: '1px solid var(--rule-fine)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  <strong>Scale:</strong> {period.settlementScale}
                  <br />
                  <strong>Basis:</strong> {period.certaintyNote}
                </div>
              </div>
            ))}
          </div>

          {/* Dated Historical Events Table */}
          {events.length > 0 && (
            <div style={{ marginBlockStart: '2rem' }}>
              <div className="table-wrapper" tabIndex={0} role="region" aria-label={`Historical events at ${place.name}`}>
                <table className="archival-table">
                  <caption>
                    DATED EVENTS RECORDED AT {place.name.toUpperCase()} ({events.length})
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Event &amp; Ref</th>
                      <th scope="col">Date &amp; Certainty</th>
                      <th scope="col">Summary &amp; Consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((evt) => (
                      <tr key={evt.id}>
                        <th scope="row">
                          <span className="catalogue-code">{evt.catalogueRef}</span>
                          <div>{evt.title}</div>
                        </th>
                        <td data-label="Date" className="tabular-nums">
                          <strong>{evt.dateDisplay}</strong>
                          <div className="catalogue-code">
                            {CERTAINTY_LABELS[evt.dateCertainty]}
                          </div>
                        </td>
                        <td data-label="Impact">
                          {evt.summary}{' '}
                          <span style={{ color: 'var(--ink-secondary)' }}>
                            {evt.consequence}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Epistemic Distinction: Verified Facts vs. Interpretations vs. Unresolved Questions */}
      <section id="epistemic-ledger" className={styles.dossierSection}>
        <div className="atlas-container">
          <span className="catalogue-code">EVIDENTIARY AUDIT</span>
          <h2 style={{ marginBlockStart: '0.2rem' }}>
            Facts, Interpretations &amp; Unresolved Questions
          </h2>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--ink-secondary)',
              marginBlockStart: '0.25rem',
            }}
          >
            The archive separates corroborated physical or documentary proof from
            scholarly inference and open historical contradictions.
          </p>

          <div className={styles.epistemicColumns}>
            {/* Verified Facts */}
            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--olive-mark)',
                padding: '1.25rem',
              }}
            >
              <span className="epistemic-badge epistemic-verified">
                <EpistemicGlyph status="verified" />
                VERIFIED FACTS ({verifiedClaims.length})
              </span>
              <div style={{ display: 'grid', gap: '1rem', marginBlockStart: '1rem' }}>
                {verifiedClaims.map((cl) => (
                  <div
                    key={cl.id}
                    style={{
                      paddingBlockEnd: '0.85rem',
                      borderBlockEnd: '1px solid var(--rule-fine)',
                    }}
                  >
                    <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>
                      {cl.statement}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-caption)',
                        color: 'var(--ink-secondary)',
                        marginBlockStart: '0.3rem',
                      }}
                    >
                      Basis: {cl.evidenceNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretations */}
            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--ochre-mark)',
                padding: '1.25rem',
              }}
            >
              <span className="epistemic-badge epistemic-interpreted">
                <EpistemicGlyph status="interpreted" />
                INTERPRETATIONS ({interpretedClaims.length})
              </span>
              <div style={{ display: 'grid', gap: '1rem', marginBlockStart: '1rem' }}>
                {interpretedClaims.length === 0 ? (
                  <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--ink-secondary)' }}>
                    No secondary interpretive claims logged for this parcel.
                  </p>
                ) : (
                  interpretedClaims.map((cl) => (
                    <div
                      key={cl.id}
                      style={{
                        paddingBlockEnd: '0.85rem',
                        borderBlockEnd: '1px solid var(--rule-fine)',
                      }}
                    >
                      <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>
                        {cl.statement}
                      </p>
                      <p
                        style={{
                          fontSize: 'var(--text-caption)',
                          color: 'var(--ink-secondary)',
                          marginBlockStart: '0.3rem',
                        }}
                      >
                        Inference: {cl.evidenceNote}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Unresolved Questions */}
            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--accent-terracotta)',
                padding: '1.25rem',
              }}
            >
              <span className="epistemic-badge epistemic-unresolved">
                <EpistemicGlyph status="unresolved" />
                UNRESOLVED QUESTIONS ({unresolvedClaims.length})
              </span>
              <div style={{ display: 'grid', gap: '1rem', marginBlockStart: '1rem' }}>
                {unresolvedClaims.map((cl) => (
                  <div
                    key={cl.id}
                    style={{
                      paddingBlockEnd: '0.85rem',
                      borderBlockEnd: '1px solid var(--rule-fine)',
                    }}
                  >
                    <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 500 }}>
                      {cl.statement}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-caption)',
                        color: 'var(--ink-secondary)',
                        marginBlockStart: '0.3rem',
                      }}
                    >
                      Archival gap: {cl.evidenceNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Associated Archival Artifacts */}
      <section id="artifacts" className={styles.dossierSection}>
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
              <span className="catalogue-code">PRIMARY MATERIAL EVIDENCE</span>
              <h2 style={{ marginBlockStart: '0.2rem' }}>
                Associated Artifacts ({artifacts.length})
              </h2>
            </div>
            <Link href="/artifacts" className="btn-archival btn-secondary">
              Open Full Artifact Cabinet
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '1.5rem',
            }}
          >
            {artifacts.map((art) => (
              <article
                key={art.id}
                style={{
                  background: 'var(--paper-chalk)',
                  border: '1px solid var(--rule-strong)',
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.85rem',
                }}
              >
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <ArtifactPlateRenderer artifact={art} />
                  <div>
                    <div className="catalogue-code">
                      {art.catalogueRef} · {ARTIFACT_TYPE_LABELS[art.type]} ·{' '}
                      {art.dateDisplay}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', marginBlock: '0.25rem 0.35rem' }}>
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
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    paddingBlockStart: '0.65rem',
                    borderBlockStart: '1px solid var(--rule-fine)',
                  }}
                >
                  <Link
                    href={`/artifacts/${art.id}`}
                    style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}
                  >
                    Inspect Plate &amp; Provenance
                  </Link>
                  <SaveToDeskControls
                    entityType="artifact"
                    entityId={art.id}
                    label={art.title}
                    compact
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Connected People, Related Places & Source Fonds */}
      <section id="connections" style={{ paddingBlock: '2.5rem 1rem' }}>
        <div className="atlas-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '2rem',
            }}
          >
            {/* Connected People */}
            <div>
              <span className="catalogue-code">WITNESSES, SURVEYORS &amp; PLANNERS</span>
              <h2 style={{ fontSize: 'var(--text-h3)', marginBlock: '0.25rem 1rem' }}>
                Connected Figures ({people.length})
              </h2>
              <div style={{ display: 'grid', gap: '0.85rem' }}>
                {people.map((person) => (
                  <div
                    key={person.id}
                    style={{
                      background: 'var(--paper-chalk)',
                      border: '1px solid var(--rule-strong)',
                      padding: '1rem',
                    }}
                  >
                    <div className="catalogue-code">
                      {person.catalogueRef} · {person.lifespanDisplay}
                    </div>
                    <strong
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '1.12rem',
                      }}
                    >
                      {person.name} — {person.role}
                    </strong>
                    <p
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--ink-secondary)',
                        marginBlock: '0.35rem 0.5rem',
                      }}
                    >
                      {person.biography}
                    </p>
                    <Link
                      href={`/observatory?node=${person.id}`}
                      style={{ fontSize: 'var(--text-caption)', fontWeight: 600 }}
                    >
                      Trace in Relationship Observatory
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Places */}
            <div>
              <span className="catalogue-code">SPATIAL &amp; INFRASTRUCTURAL LINKS</span>
              <h2 style={{ fontSize: 'var(--text-h3)', marginBlock: '0.25rem 1rem' }}>
                Connected Places ({relatedPlaces.length})
              </h2>
              <div style={{ display: 'grid', gap: '0.85rem' }}>
                {relatedPlaces.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/places/${rp.slug}`}
                    style={{
                      display: 'block',
                      background: 'var(--paper-chalk)',
                      border: '1px solid var(--rule-strong)',
                      padding: '1rem',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      className="catalogue-code"
                      style={{ color: 'var(--accent-terracotta)' }}
                    >
                      {rp.catalogueRef} · {rp.region}
                    </div>
                    <strong
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '1.15rem',
                        marginBlock: '0.2rem',
                      }}
                    >
                      {rp.name}
                    </strong>
                    <span
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--ink-secondary)',
                      }}
                    >
                      {rp.subtitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Source Apparatus */}
            <div id="sources">
              <span className="catalogue-code">ARCHIVAL PROVENANCE LEDGER</span>
              <h2 style={{ fontSize: 'var(--text-h3)', marginBlock: '0.25rem 1rem' }}>
                Cited Source Fonds ({sources.length})
              </h2>
              <div style={{ display: 'grid', gap: '0.85rem' }}>
                {sources.map((src) => (
                  <div
                    key={src.id}
                    style={{
                      background: 'var(--paper-vellum)',
                      border: '1px solid var(--rule-strong)',
                      padding: '1rem',
                    }}
                  >
                    <div className="catalogue-code">
                      {src.catalogueRef} · {src.fondsCode} ({src.yearDisplay})
                    </div>
                    <strong style={{ display: 'block', marginBlock: '0.2rem' }}>
                      {src.title}
                    </strong>
                    <p
                      style={{
                        fontSize: 'var(--text-caption)',
                        color: 'var(--ink-secondary)',
                        marginBlockEnd: '0.35rem',
                      }}
                    >
                      {src.completenessNote}
                    </p>
                    <div className="catalogue-code">{src.rightsAndProvenance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
