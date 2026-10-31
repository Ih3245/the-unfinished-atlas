'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useResearchDesk } from './ResearchDeskProvider';
import { GlobalSearchDialog } from './GlobalSearchDialog';
import {
  CompassMark,
  SearchLensIcon,
  MenuRulesIcon,
  CloseCrossIcon,
} from './ArchivalIcons';
import styles from './AtlasMasthead.module.css';

const PRIMARY_NAV = [
  { href: '/explore', label: 'Interactive Atlas', code: 'I' },
  { href: '/time-machine', label: 'Time Machine', code: 'II' },
  { href: '/artifacts', label: 'Artifact Cabinet', code: 'III' },
  { href: '/observatory', label: 'Observatory', code: 'IV' },
  { href: '/desk', label: 'Research Desk', code: 'V' },
];

export function AtlasMasthead() {
  const pathname = usePathname();
  const { desk, isHydrated } = useResearchDesk();
  const searchDialogRef = useRef<HTMLDialogElement>(null);
  const mobileDrawerRef = useRef<HTMLDialogElement>(null);

  const savedTotal = isHydrated
    ? desk.bookmarkedPlaceIds.length + desk.savedArtifactIds.length
    : 0;

  const isRouteActive = (href: string) => {
    if (href === '/explore' && pathname.startsWith('/places')) return true;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={styles.masthead}>
      <div className="atlas-container">
        {/* Top Archival Folio Strip */}
        <div className={styles.topLedger}>
          <span className="catalogue-code">
            FOLIO SERIES IV · ARCHIVE OF TRANSFORMED &amp; ERASED PLACES
          </span>
          <span className={`catalogue-code ${styles.topLedgerRight}`}>
            DEMONSTRATION RESEARCH EDITION · NO EXTERNAL TRACKERS
          </span>
        </div>

        {/* Main Navigation Row */}
        <div className={styles.mainBar}>
          <Link href="/" className={styles.brandLink}>
            <CompassMark size={24} className={styles.brandCompass} />
            <div>
              <span className={styles.brandTitle}>The Unfinished Atlas</span>
              <span className={styles.brandSub}>Cartographic &amp; Material Inquiry</span>
            </div>
          </Link>

          <nav aria-label="Primary archive sections" className={styles.desktopNav}>
            <ul className={styles.navList}>
              {PRIMARY_NAV.map((item) => {
                const active = isRouteActive(item.href);
                const isDesk = item.href === '/desk';
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                    >
                      <span className={styles.navRoman}>{item.code}.</span>
                      <span>{item.label}</span>
                      {isDesk && isHydrated && savedTotal > 0 && (
                        <span
                          className={styles.deskCount}
                          aria-label={`${savedTotal} saved records`}
                        >
                          {savedTotal}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => searchDialogRef.current?.showModal()}
              className={styles.searchTrigger}
              aria-label="Open global archive search (shortcut slash)"
            >
              <SearchLensIcon size={16} />
              <span className={styles.searchTriggerLabel}>Search</span>
              <kbd className={styles.kbdHint}>/</kbd>
            </button>

            <button
              type="button"
              onClick={() => mobileDrawerRef.current?.showModal()}
              className={styles.mobileMenuBtn}
              aria-label="Open navigation menu"
            >
              <MenuRulesIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Global Search Modal Dialog */}
      <GlobalSearchDialog dialogRef={searchDialogRef} />

      {/* Mobile Navigation Drawer Dialog */}
      <dialog
        ref={mobileDrawerRef}
        aria-labelledby="mobile-nav-heading"
        className={styles.mobileDialog}
        onPointerDown={(e) => {
          const dlg = mobileDrawerRef.current;
          if (!dlg) return;
          const r = dlg.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          ) {
            dlg.close();
          }
        }}
      >
        <div className={styles.mobileDrawerInner}>
          <div className={styles.mobileDrawerHeader}>
            <div>
              <span className="catalogue-code">ARCHIVE DIRECTORY</span>
              <h2 id="mobile-nav-heading" style={{ fontSize: 'var(--text-h3)' }}>
                The Unfinished Atlas
              </h2>
            </div>
            <button
              type="button"
              onClick={() => mobileDrawerRef.current?.close()}
              className="btn-archival btn-ghost"
              aria-label="Close navigation menu"
            >
              <CloseCrossIcon size={20} />
            </button>
          </div>

          <nav aria-label="Mobile archive navigation">
            <ul className={styles.mobileNavList}>
              <li>
                <Link
                  href="/"
                  onClick={() => mobileDrawerRef.current?.close()}
                  aria-current={pathname === '/' ? 'page' : undefined}
                  className={styles.mobileNavItem}
                >
                  <span className="catalogue-code">00</span>
                  <span>Atlas Entrance (Home)</span>
                </Link>
              </li>
              {PRIMARY_NAV.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => mobileDrawerRef.current?.close()}
                      aria-current={active ? 'page' : undefined}
                      className={`${styles.mobileNavItem} ${active ? styles.mobileNavItemActive : ''}`}
                    >
                      <span className="catalogue-code">{item.code}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/search"
                  onClick={() => mobileDrawerRef.current?.close()}
                  aria-current={pathname === '/search' ? 'page' : undefined}
                  className={styles.mobileNavItem}
                >
                  <span className="catalogue-code">VI</span>
                  <span>Global Discovery Index</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
