import React from 'react';
import type { Metadata } from 'next';
import { ResearchDeskClient } from '@/components/ResearchDeskClient';

export const metadata: Metadata = {
  title: 'Research Desk — Personal Investigation Workspace',
  description:
    'Organize bookmarked places, saved archival artifacts, personal field notes, and open historical questions in local browser storage with JSON export and validated import.',
};

export default function ResearchDeskPage() {
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
            APPARATUS V · ACCOUNT-FREE LOCAL RESEARCH ROOM
          </span>
          <h1 style={{ marginBlock: '0.25rem 0.5rem' }}>
            Personal Research Desk
          </h1>
          <p style={{ color: 'var(--ink-secondary)' }}>
            Assemble cross-place investigation boards, reorder material
            evidence, draft research notes, and export validated JSON dossiers.
          </p>
        </div>
      </section>

      <section className="atlas-container">
        <ResearchDeskClient />
      </section>
    </div>
  );
}
