import React from 'react';
import Link from 'next/link';
import { getAtlasSummaryCounts } from '@/data';
import { CompassMark } from './ArchivalIcons';

export function AtlasFooter() {
  const counts = getAtlasSummaryCounts();

  return (
    <footer
      style={{
        marginBlockStart: 'var(--space-8)',
        backgroundColor: 'var(--paper-vellum)',
        borderBlockStart: '1.5px solid var(--ink-primary)',
        paddingBlock: 'var(--space-7) var(--space-6)',
      }}
    >
      <div className="atlas-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
            gap: '2.25rem',
            paddingBlockEnd: '2.25rem',
            borderBlockEnd: '1px solid var(--rule-strong)',
          }}
        >
          {/* Colophon Statement */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                marginBlockEnd: '0.75rem',
              }}
            >
              <CompassMark size={20} />
              <strong
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '1.25rem',
                }}
              >
                The Unfinished Atlas
              </strong>
            </div>
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--ink-secondary)',
                marginBlockEnd: '0.85rem',
              }}
            >
              An independent cartographic monograph and digital research room
              examining drowned valleys, stranded ports, demolished concourses,
              and buried urban waterways.
            </p>
            <div className="catalogue-code">
              CURRENT DEPOSIT: {counts.places} PLACES · {counts.artifacts}{' '}
              ARTIFACTS · {counts.events} EVENTS · {counts.unresolvedQuestions}{' '}
              OPEN QUESTIONS
            </div>
          </div>

          {/* Primary Apparatus */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-catalogue)',
                fontSize: 'var(--text-caption)',
                letterSpacing: '0.06em',
                marginBlockEnd: '0.85rem',
                color: 'var(--ink-secondary)',
              }}
            >
              RESEARCH APPARATUS
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '0.45rem',
                fontSize: 'var(--text-body-sm)',
              }}
            >
              <li>
                <Link href="/explore">I. Interactive Cartographic Atlas</Link>
              </li>
              <li>
                <Link href="/time-machine">II. Historical Period Time Machine</Link>
              </li>
              <li>
                <Link href="/artifacts">III. Archival Artifact Cabinet</Link>
              </li>
              <li>
                <Link href="/observatory">IV. Entity Relationship Observatory</Link>
              </li>
              <li>
                <Link href="/desk">V. Personal Research Desk (Local JSON)</Link>
              </li>
              <li>
                <Link href="/search">VI. Global Discovery &amp; Fonds Index</Link>
              </li>
            </ul>
          </div>

          {/* Epistemic & Provenance Notice */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-catalogue)',
                fontSize: 'var(--text-caption)',
                letterSpacing: '0.06em',
                marginBlockEnd: '0.85rem',
                color: 'var(--ink-secondary)',
              }}
            >
              HISTORICAL INTEGRITY &amp; STORAGE
            </h2>
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--ink-secondary)',
                marginBlockEnd: '0.75rem',
              }}
            >
              <strong>Demonstration Fonds Disclosure:</strong> Records in this
              edition are curated composite archival demonstrations authored to
              model evidentiary contradiction, missing dates, and counter-mapping
              without fabricating real-world citations.
            </p>
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--ink-secondary)',
              }}
            >
              <strong>Local-Only Workspace:</strong> Bookmarks, boards, and notes
              reside strictly in your browser’s <code>localStorage</code> and are
              never transmitted to a remote server. Use JSON export on the
              Research Desk for portable backups.
            </p>
          </div>
        </div>

        <div
          style={{
            paddingBlockStart: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
          className="catalogue-code"
        >
          <span>COLOPHON · SET IN NEWSREADER, PLUS JAKARTA SANS &amp; IBM PLEX MONO</span>
          <span>CC0 DEMONSTRATION DATASET &amp; ORIGINAL VECTOR RECONSTRUCTIONS</span>
        </div>
      </div>
    </footer>
  );
}
