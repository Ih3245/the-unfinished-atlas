import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ARTIFACTS,
  ARTIFACT_TYPE_LABELS,
  CERTAINTY_LABELS,
  getArtifactById,
  getPlaceById,
  getSourceById,
  getPeriodById,
} from '@/data';
import { ArtifactPlateRenderer } from '@/components/ArtifactPlateRenderer';
import { SaveToDeskControls } from '@/components/SaveToDeskControls';

export function generateStaticParams() {
  return ARTIFACTS.map((a) => ({ id: a.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const art = getArtifactById(params.id);
  if (!art) return { title: 'Missing Artifact' };
  return {
    title: `${art.title} (${art.catalogueRef})`,
    description: art.summary,
  };
}

export default function ArtifactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const artifact = getArtifactById(params.id);
  if (!artifact) {
    notFound();
  }

  const primaryPlace = getPlaceById(artifact.placeId);
  const relatedPlaces = artifact.relatedPlaceIds
    .map((id) => getPlaceById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const source = getSourceById(artifact.sourceId);
  const era = getPeriodById(artifact.eraId);

  const siblingArtifacts = ARTIFACTS.filter(
    (a) => a.placeId === artifact.placeId && a.id !== artifact.id
  ).slice(0, 3);

  return (
    <article
      className="atlas-container"
      style={{ paddingBlock: '2rem 3rem', display: 'grid', gap: '2rem' }}
    >
      {/* Breadcrumb & Accession Header */}
      <header
        style={{
          paddingBlockEnd: '1.5rem',
          borderBlockEnd: '1.5px solid var(--ink-primary)',
        }}
      >
        <nav aria-label="Breadcrumb" className="catalogue-code">
          <Link href="/">ATLAS</Link> /{' '}
          <Link href="/artifacts">ARTIFACT CABINET</Link> /{' '}
          <strong style={{ color: 'var(--accent-terracotta)' }}>
            {artifact.catalogueRef}
          </strong>
        </nav>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.25rem',
            marginBlockStart: '0.85rem',
          }}
        >
          <div style={{ maxWidth: '48rem' }}>
            <span className="catalogue-code">
              {ARTIFACT_TYPE_LABELS[artifact.type].toUpperCase()} ·{' '}
              {artifact.dateDisplay}
            </span>
            <h1 style={{ marginBlock: '0.25rem 0.65rem' }}>{artifact.title}</h1>
            <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--ink-secondary)' }}>
              {artifact.summary}
            </p>
          </div>

          <SaveToDeskControls
            entityType="artifact"
            entityId={artifact.id}
            label={artifact.title}
          />
        </div>
      </header>

      {/* Main Examination Split: Plate / Transcript + Archival Metadata */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Detailed Plate & Verbatim Excerpt */}
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <figure style={{ margin: 0 }}>
            <ArtifactPlateRenderer artifact={artifact} detailed />
            <figcaption
              className="catalogue-code"
              style={{ marginBlockStart: '0.5rem' }}
            >
              {artifact.catalogueRef} — {artifact.physicalSpecs} ({artifact.medium})
            </figcaption>
          </figure>

          {artifact.excerptOrTranscription && (
            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.35rem',
              }}
            >
              <div className="catalogue-code" style={{ marginBlockEnd: '0.45rem' }}>
                TRANSCRIPTION / DOCUMENTARY EXTRACT
              </div>
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                {artifact.excerptOrTranscription}
              </blockquote>
            </div>
          )}

          <div
            style={{
              background: 'var(--paper-vellum)',
              border: '1px solid var(--rule-strong)',
              padding: '1.35rem',
            }}
          >
            <div className="catalogue-code" style={{ marginBlockEnd: '0.35rem' }}>
              CURATORIAL &amp; FORENSIC COMMENTARY
            </div>
            <p style={{ fontSize: 'var(--text-body)' }}>
              {artifact.archivalCommentary}
            </p>
          </div>
        </div>

        {/* Right: Metadata, Uncertainty Handling, Provenance & Place Links */}
        <aside style={{ display: 'grid', gap: '1.25rem' }}>
          <div
            style={{
              background: 'var(--paper-chalk)',
              border: '1px solid var(--ink-primary)',
              padding: '1.35rem',
              display: 'grid',
              gap: '0.8rem',
            }}
          >
            <div
              className="catalogue-code"
              style={{
                paddingBlockEnd: '0.45rem',
                borderBlockEnd: '1px solid var(--rule-fine)',
              }}
            >
              CATALOGUE SPECIFICATION · {artifact.catalogueRef}
            </div>

            <dl
              style={{
                margin: 0,
                display: 'grid',
                gap: '0.65rem',
                fontSize: 'var(--text-body-sm)',
              }}
            >
              <div>
                <dt className="catalogue-code">DATE / CHRONOLOGY</dt>
                <dd style={{ margin: '0.15rem 0 0', fontWeight: 600 }}>
                  {artifact.dateDisplay} ({CERTAINTY_LABELS[artifact.dateCertainty]}
                  {artifact.yearSort === null ? ' · Missing exact year' : ''})
                </dd>
                {artifact.dateNote && (
                  <dd
                    style={{
                      margin: '0.2rem 0 0',
                      fontSize: 'var(--text-caption)',
                      color: 'var(--ochre-text)',
                    }}
                  >
                    Note: {artifact.dateNote}
                  </dd>
                )}
              </div>

              <div>
                <dt className="catalogue-code">CREATOR / ATTRIBUTION</dt>
                <dd style={{ margin: '0.15rem 0 0', fontWeight: 600 }}>
                  {artifact.creator} (
                  {CERTAINTY_LABELS[artifact.attributionCertainty]})
                </dd>
              </div>

              {era && (
                <div>
                  <dt className="catalogue-code">HISTORICAL STRATUM</dt>
                  <dd style={{ margin: '0.15rem 0 0' }}>
                    {era.name} ({era.spanLabel})
                  </dd>
                </div>
              )}

              <div>
                <dt className="catalogue-code">PHYSICAL DESCRIPTION</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>
                  {artifact.physicalSpecs} · {artifact.medium}
                </dd>
              </div>

              <div>
                <dt className="catalogue-code">PROVENANCE &amp; ACCESSION</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>
                  {artifact.provenance} ({artifact.accessionNote})
                </dd>
              </div>

              <div>
                <dt className="catalogue-code">SOURCE &amp; RIGHTS</dt>
                <dd style={{ margin: '0.15rem 0 0' }}>
                  {source ? `${source.title} (${source.fondsCode}) — ` : ''}
                  {artifact.rightsStatement}
                </dd>
              </div>
            </dl>
          </div>

          {/* Related-Place Navigation */}
          {primaryPlace && (
            <div
              style={{
                background: 'var(--paper-chalk)',
                border: '1px solid var(--rule-strong)',
                padding: '1.25rem',
                display: 'grid',
                gap: '0.75rem',
              }}
            >
              <span className="catalogue-code">ASSOCIATED PLACE DOSSIERS</span>
              <div>
                <div
                  className="catalogue-code"
                  style={{ color: 'var(--accent-terracotta)' }}
                >
                  PRIMARY · {primaryPlace.catalogueRef}
                </div>
                <h2 style={{ fontSize: '1.2rem', marginBlock: '0.2rem 0.4rem' }}>
                  <Link href={`/places/${primaryPlace.slug}`}>
                    {primaryPlace.name}
                  </Link>
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--ink-secondary)',
                    marginBlockEnd: '0.75rem',
                  }}
                >
                  {primaryPlace.subtitle}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <Link
                    href={`/places/${primaryPlace.slug}`}
                    className="btn-archival"
                  >
                    Open Place Investigation
                  </Link>
                  <Link
                    href={`/observatory?node=${artifact.id}`}
                    className="btn-archival btn-secondary"
                  >
                    View in Network Graph
                  </Link>
                </div>
              </div>

              {relatedPlaces.length > 0 && (
                <div
                  style={{
                    paddingBlockStart: '0.75rem',
                    borderBlockStart: '1px solid var(--rule-fine)',
                  }}
                >
                  <div className="catalogue-code" style={{ marginBlockEnd: '0.35rem' }}>
                    CROSS-REFERENCED PLACES
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingInlineStart: '1.1rem',
                      fontSize: 'var(--text-body-sm)',
                    }}
                  >
                    {relatedPlaces.map((rp) => (
                      <li key={rp.id}>
                        <Link href={`/places/${rp.slug}`}>
                          {rp.catalogueRef} · {rp.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Sibling Artifacts from Same Place */}
      {siblingArtifacts.length > 0 && primaryPlace && (
        <section
          style={{
            paddingBlockStart: '1.75rem',
            borderBlockStart: '1px solid var(--rule-strong)',
          }}
        >
          <span className="catalogue-code">COMPANION EVIDENCE</span>
          <h2 style={{ marginBlock: '0.2rem 1rem', fontSize: 'var(--text-h3)' }}>
            Other Artifacts from {primaryPlace.name}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 17rem), 1fr))',
              gap: '1rem',
            }}
          >
            {siblingArtifacts.map((sib) => (
              <Link
                key={sib.id}
                href={`/artifacts/${sib.id}`}
                style={{
                  display: 'block',
                  padding: '1rem',
                  background: 'var(--paper-chalk)',
                  border: '1px solid var(--rule-strong)',
                  textDecoration: 'none',
                }}
              >
                <span className="catalogue-code">
                  {sib.catalogueRef} · {ARTIFACT_TYPE_LABELS[sib.type]}
                </span>
                <strong
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1.08rem',
                    marginBlock: '0.25rem',
                  }}
                >
                  {sib.title}
                </strong>
                <span className="catalogue-code">{sib.dateDisplay}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
