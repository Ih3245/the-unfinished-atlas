import React from 'react';
import type { Metadata } from 'next';
import { ObservatoryClient } from '@/components/ObservatoryClient';

export const metadata: Metadata = {
  title: 'Relationship Observatory',
  description:
    'Explore the archival network linking places, surviving artifacts, historical turning points, surveyors, and witnesses.',
};

export default function ObservatoryPage({
  searchParams,
}: {
  searchParams?: { node?: string };
}) {
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
            APPARATUS IV · MULTI-ENTITY EVIDENTIARY NETWORK
          </span>
          <h1 style={{ marginBlock: '0.25rem 0.5rem' }}>
            The Relationship Observatory
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>
            Trace how engineers, witnesses, storms, ordinances, and surviving
            documents connect disparate erased landscapes across the basin.
          </p>
        </div>
      </section>

      <section className="atlas-container">
        <ObservatoryClient initialNodeId={searchParams?.node} />
      </section>
    </div>
  );
}
