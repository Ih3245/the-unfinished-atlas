import React from 'react';
import type { Metadata } from 'next';
import { ARTIFACTS } from '@/data';
import { ArtifactCabinetClient } from '@/components/ArtifactCabinetClient';

export const metadata: Metadata = {
  title: 'Artifact Cabinet',
  description:
    'Search and filter twenty-eight archival maps, silver-gelatin contact plates, architectural sections, survey rolls, and oral-history transcripts.',
};

export default function ArtifactsPage() {
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
            APPARATUS III · MATERIAL &amp; DOCUMENTARY DEPOSIT ({ARTIFACTS.length}{' '}
            SPECIMENS)
          </span>
          <h1 style={{ marginBlock: '0.25rem 0.5rem' }}>
            The Artifact Cabinet
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>
            Examine primary surveys, architectural drawings, contact prints,
            letters, press clippings, and oral-history transcripts—including
            undated items and records with contested attribution.
          </p>
        </div>
      </section>

      <section className="atlas-container">
        <ArtifactCabinetClient />
      </section>
    </div>
  );
}
