import React from 'react';
import type { Metadata } from 'next';
import { PERIODS } from '@/data';
import type { HistoricalEraId } from '@/types/atlas';
import { ExploreAtlasClient } from '@/components/ExploreAtlasClient';
import styles from './explore.module.css';

export const metadata: Metadata = {
  title: 'Interactive Cartographic Atlas',
  description:
    'Filter, search, and inspect eight transformed or erased places across an interactive regional survey map and synchronized archival gazetteer.',
};

export default function ExplorePage({
  searchParams,
}: {
  searchParams?: { era?: string; q?: string };
}) {
  const validEraIds = new Set<string>(PERIODS.map((p) => p.id));
  const initialEra =
    searchParams?.era && validEraIds.has(searchParams.era)
      ? (searchParams.era as HistoricalEraId)
      : 'all';
  const initialQuery = typeof searchParams?.q === 'string' ? searchParams.q : '';

  return (
    <div>
      <section className={styles.headerBand}>
        <div className="atlas-container">
          <span className="catalogue-code">
            APPARATUS I · REGIONAL SURVEY &amp; GAZETTEER
          </span>
          <h1 style={{ marginBlock: '0.25rem 0.5rem' }}>
            Explore the Interactive Atlas
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>
            Filter by hydrological basin, transformation theme, or historical
            stratum. Every record in the map projection is accessible equally
            through the synchronized gazetteer list.
          </p>
        </div>
      </section>

      <section className="atlas-container">
        <ExploreAtlasClient
          initialEra={initialEra}
          initialQuery={initialQuery}
        />
      </section>
    </div>
  );
}
