import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="atlas-container"
      style={{ paddingBlock: 'var(--space-8)' }}
    >
      <div
        style={{
          maxWidth: '42rem',
          padding: '2.25rem',
          background: 'var(--paper-chalk)',
          border: '1px solid var(--ink-primary)',
        }}
      >
        <span className="catalogue-code">
          FOLIO MISSING · ERR-404 · UNINDEXED PARCEL
        </span>
        <h1 style={{ marginBlock: '0.5rem 1rem' }}>
          This archival record could not be located
        </h1>
        <p
          style={{
            color: 'var(--ink-secondary)',
            marginBlockEnd: '1.5rem',
          }}
        >
          The requested place slug, artifact accession number, or folio route is
          absent from the local deposit—much like the withheld 1959 drawings for
          Locks 8 and 9.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link href="/explore" className="btn-archival">
            Open Interactive Atlas
          </Link>
          <Link href="/artifacts" className="btn-archival btn-secondary">
            Browse Artifact Cabinet
          </Link>
          <Link href="/search" className="btn-archival btn-secondary">
            Search Full Index
          </Link>
        </div>
      </div>
    </section>
  );
}
