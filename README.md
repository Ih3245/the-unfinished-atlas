# The Unfinished Atlas

**An interactive digital archive, cartographic comparison observatory, and personal research workspace dedicated to places transformed or erased by time.**

Built with **Next.js 14 (App Router)**, **React 18**, **strict TypeScript**, **Token-First Custom CSS & CSS Modules**, **custom parametric SVG & HTML5 2D Canvas visualizations**, and **local browser persistence (`localStorage`)**—requiring **zero API keys, zero paid services, and zero external databases**. Ready for 1-click deployment on **Vercel's free tier**.

---

## 1. Product Concept & Epistemic Design

*The Unfinished Atlas* investigates vanished settlements, submerged valleys, demolished civic infrastructure, altered coastlines, and transformed neighborhoods as multi-layered historical evidence rather than flat encyclopedia entries.

Every place record explicitly distinguishes between:
- **Verified Evidence** (`Verified`) — attested by multiple independent physical surveys or primary archival ledgers.
- **Historical Interpretations & Reconstructions** (`Interpreted` / `Approximate`) — inferred from partial drawings, acoustic soundings, or indirect testimony.
- **Unresolved & Contested Questions** (`Contested`) — contradictions and gaps in the surviving record that remain open to investigation.

### Art Direction
Inspired by physical archival folios, 19th-century hydrographic survey sheets, independent cultural magazines, and cartographers' working notebooks:
- Warm rag-paper (`#F5F1E8`), chalk folio leaves (`#FFFCF5`), iron-gall ink (`#292820`), archival olive (`#4B4E38`), survey ochre (`#7A4F13`), and oxidized terracotta (`#8E3E2A`) — every text token mathematically verified against **WCAG 2.2 AA** (`≥ 6.30:1`).
- Editorial serif display (`Newsreader`), clean grotesque interface controls (`Plus Jakarta Sans`), and monospace accession codes (`IBM Plex Mono`).
- Full design specification documented in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

---

## 2. Implemented Routes & Experiences

| Route | Experience | Key Capabilities |
|---|---|---|
| `/` | **Home — The Atlas Entrance** | Editorial masthead, interactive regional survey preview, featured dossier (`UA-PL-01`), live dataset counters, asymmetrical place index, interactive *Chronology of Erasure* strip, deep monograph feature, recent artifacts, and open historical questions. |
| `/explore` | **Explore — The Interactive Atlas** | Custom offline SVG cartographic basin map (explicitly labeled as an illustrative regional projection alongside reference coordinates), clickable pins synchronized with a filterable/sortable dossier list, search by place/period/subject, mobile-friendly stacked mode, and one-click filter reset. |
| `/places/[slug]` | **Place Investigation Pages** | **8 complete place records** authored across **4 distinct editorial monograph layouts** (`hydrographic-folio`, `architectural-inquest`, `field-expedition`, `dossier-monograph`), interactive period switcher with vector scene reconstruction, verified/interpreted/contested claims ledger, connected artifacts, people, events, sources, and related places. |
| `/time-machine` | **Time Machine — Historical Comparison** | Select any place and any two historical eras (`Pre-1900` through `Post-1990`), inspect parametric SVG reconstructions via a **draggable & keyboard-accessible split-curtain slider** or **side-by-side plates**, compare land use/population/built footprint deltas, and review reconstructed vs. verified elements. |
| `/artifacts` & `/artifacts/[id]` | **Artifact Cabinet & Facsimile Plate** | **28 archival artifacts** spanning **7 mediums** (maps, photographs, letters, architectural drawings, newspaper excerpts, survey records, oral histories), filterable by place/period/medium/certainty and sortable chronologically (handling undated `yearSort: null` items gracefully). Dedicated inspection routes include zoomable facsimile plates, diplomatic transcriptions, provenance chains, and cross-references. |
| `/observatory` | **Connection Observatory** | Force-relaxed network graph connecting **8 places, 28 artifacts, 14 events, and 10 historical figures** across **42 typed relationships**. Supports **3 synchronized views**: interactive **SVG Vector**, HiDPI **HTML5 2D `<canvas>`**, and an **Accessible Ledger Table**, plus entity-type toggles (shape + color + label), ego-network isolation, and keyboard node selection. |
| `/desk` | **Personal Research Desk** | Persistent client-side workspace backed by SSR-safe `localStorage` (`unfinished_atlas_desk_v1`). Bookmark places and artifacts, create/rename/delete custom **Research Boards**, reorder pinned items, write research notes, track open investigation questions, and **export/import validated JSON board files**. |
| `/search` + Modal | **Global Cross-Entity Search** | Instant `<dialog>` quick-search modal (`/` or `Ctrl+K`) and full `/search` page indexing Places, Artifacts, Events, People, Sources, and Unresolved Questions with highlighted match snippets. |

---

## 3. Data Provenance & Honesty Disclosure

In accordance with strict archival integrity rules:
- **Fictional Demonstration Dataset:** All 8 places, 28 artifacts, 14 historical events, 10 biographical records, and 12 archival source citations in `src/data/` are **original fictional demonstration records** created specifically for *The Unfinished Atlas* to showcase multi-layered historical investigation, contested evidence, and cartographic comparison without fabricating claims about real-world archives.
- **Original Vector & Canvas Visuals (CC0 / Project-Authored):** All maps, period reconstructions (`PeriodSceneRenderer`), artifact facsimiles (`ArtifactPlateRenderer`), and network graphs are procedurally rendered in-browser using SVG and HTML5 Canvas—zero hotlinked third-party images that could rot or require external attribution.
- **Local-Only Persistence:** Bookmarks, research boards, notes, and investigation questions in the Research Desk are stored **exclusively in your browser's `localStorage`**. Clearing browser site data removes local boards unless exported first via **Export Board JSON**.

---

## 4. Architecture & Dependency Rationale

```text
the-unfinished-atlas/
├── DESIGN_SYSTEM.md               # Canonical visual, typographic & accessibility system
├── src/
│   ├── app/                       # Next.js 14 App Router pages & route-specific CSS Modules
│   ├── components/                # Interactive client & server components (SVG, Canvas, Dialogs, Desk)
│   ├── data/                      # Version-controlled, strictly typed archival dataset
│   ├── lib/                       # Pure domain logic: integrity validator, filters, graph layout, search, storage
│   ├── styles/                    # tokens.css (design tokens) & globals.css (print-inspired primitives)
│   ├── types/                     # Strict TypeScript domain interfaces (atlas.ts)
│   └── __tests__/                 # Vitest automated unit & user-journey verification suite
```

### Dependencies Explained
We deliberately kept runtime dependencies to the bare minimum:
- **`next` (`14.2.35`) & `react` / `react-dom` (`18.3.1`):** Provides static generation (`generateStaticParams` for all place and artifact routes), App Router layouts, and automatic route-level code splitting for fast free-tier hosting on Vercel.
- **`vitest` (devDependency):** Fast TypeScript test runner verifying dataset referential integrity, faceted search/filtering, cross-entity search, Observatory graph construction, and Research Desk persistence/JSON import validation.
- **Zero UI, map-tile, state-management, or CSS runtime libraries** — keeping the client bundle lean, dependency-free, and immune to third-party service outages.

---

## 5. Local Development & Verification

### Prerequisites
- **Node.js** `18.18+` or `20+`
- **npm** `9+`

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Run strict TypeScript type-checking
npm run typecheck

# 4. Run ESLint verification
npm run lint

# 5. Run automated dataset & core journey tests (Vitest)
npm test

# 6. Build static & server-rendered production bundle
npm run build
```

---

## 6. Deploying to Vercel (Free Tier — Zero Configuration)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository (`the-unfinished-atlas`).
3. Leave all build settings at their Next.js defaults:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Environment Variables:** *None required* (no API keys, secrets, or database URLs).
4. Click **Deploy**. Every route—including static place dossiers, artifact facsimiles, Time Machine comparisons, Observatory visualizations, and the local Research Desk—works immediately out of the box.

---

## 7. Known Limitations & Future Extensions

- **Client-Local Research Desk:** Because no external database or authentication provider is used, Research Desk boards do not sync automatically across devices; cross-device sharing is supported via the built-in **Export / Import Board JSON** workflow.
- **Illustrative Coordinate System:** The Explore basin map uses an illustrative regional projection (`0–1000 × 0–620`) paired with approximate reference coordinates rather than satellite slippy-map tiles, ensuring 100% offline/free-tier reliability without external tile providers.
