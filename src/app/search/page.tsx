import React from 'react';
import type { Metadata } from 'next';
import { SearchPageClient } from '@/components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Global Discovery & Fonds Index',
  description:
    'Search across places, artifacts, historical events, archival figures, periods, and source deposits.',
};

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const initialQuery = typeof searchParams?.q === 'string' ? searchParams.q : '';

  return (
    <div>
      <section
        style={{
          paddingBlock: '1.75rem 1.25rem',
          borderBlockEnd: '1.5px solid var(--ink-primary)',
        }}
      >
        <div className="atlas-container">
          <span className="catalogue-code">
            APPARATUS VI · CROSS-COLLECTION DISCOVERY
          </span>
          <h1 style={{ marginBlock: '0.25rem 0.5rem' }}>
            Global Archive Discovery
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>
            Search simultaneously across all investigated places, artifacts,
            chronological events, historical figures, periods, and source fonds.
          </p>
        </div>
      </section>

      <section className="atlas-container">
        <SearchPageClient initialQuery={initialQuery} />
      </section>
    </div>
  );
}
