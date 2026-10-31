import React from 'react';
import type { Metadata } from 'next';
import { TimeMachineClient } from '@/components/TimeMachineClient';

export const metadata: Metadata = {
  title: 'Time Machine — Historical Stratum Comparison',
  description:
    'Compare historical periods side by side and via an interactive vector reconstruction curtain across eight transformed landscapes.',
};

export default function TimeMachinePage({
  searchParams,
}: {
  searchParams?: { place?: string; before?: string; after?: string };
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
            APPARATUS II · DIACHRONIC VECTOR COMPARISON
          </span>
          <h1 style={{ marginBlock: '0.25rem 0.5rem' }}>
            Historical Time Machine
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>
            Select any place in the archive and compare two historical periods
            to inspect shifts in hydrology, built fabric, infrastructure, and
            evidentiary certainty.
          </p>
        </div>
      </section>

      <section className="atlas-container">
        <TimeMachineClient
          initialPlaceId={searchParams?.place}
          initialBeforeId={searchParams?.before}
          initialAfterId={searchParams?.after}
        />
      </section>
    </div>
  );
}
