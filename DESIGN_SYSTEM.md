# DESIGN_SYSTEM.md

---

## 1. Project overview

- **Website / product name:** The Unfinished Atlas
- **Website type:** Interactive cartographic cultural archive, historical comparison observatory, and personal research workspace
- **Surface profile:** Content / Editorial / Docs + App / Product UI (hybrid cultural institution flagship publication & exploratory research workbench)
- **Platform:** Web (responsive from 360px mobile viewports up to 4K desktop displays)
- **Target users:** Cultural historians, urban archaeologists, architects, cartography enthusiasts, students, and general readers investigating vanished or transformed places
- **Main design goal:** Combine the tactile authority of a physical archival folio, an independent cultural quarterly, and a cartographer's field notebook with zero SaaS-template clichés, explicit epistemic honesty (separating verified facts, interpretations, and unresolved questions), and accessible client-side research tooling.

## 2. Brand direction

- **Visual style:** Warm archival editorial, print-led cartographic monograph, fine hairline ledger composition
- **Mood & tone:** Scholarly, unhurried, forensic, materially grounded, candid about historical uncertainty
- **Design personality:** Independent cultural institution & cartographic press (`editorial-humanist` + `archival-technical`)
- **Design concept (one sentence):** *A working cartographic folio on warm rag paper where every place is examined as stratified physical evidence—indexed by monospace accession codes, separated by fine survey rules, and cross-referenced through explicit epistemic stamps (`Verified`, `Interpreted`, `Contested`).*
- **Adversarial-review verdict:** Covering the masthead title still unmistakably identifies *The Unfinished Atlas*: the warm rag-paper field (`#F5F1E8`), double-ruled folio masthead, monospace catalogue call numbers (`UA-PL-01`, `UA-AR-14`), parametric vector/canvas survey plates, and four distinct place monograph layouts (`hydrographic-folio`, `architectural-inquest`, `field-expedition`, `dossier-monograph`) cannot be mistaken for a SaaS template or travel blog. *Weakness caught and fixed during build:* touch targets on secondary entity filter pills and the Observatory keyboard `<select>` initially sat at `38px–40px`; all interactive controls were raised to a strict `44px` minimum height across viewports.
- **Reference style used:** Reasoned from named archival and editorial exemplars (live design-gallery scraping omitted in favor of primary institutional vernaculars):
  1. *Cabinet Magazine* & *Places Journal* — asymmetrical print columns, long-form reading measure (`66ch`), and scholarly pull-figures with numbered captions.
  2. *David Rumsey Map Collection* & *Ordnance Survey 19th-Century County Series* — graticule ticks, north arrows, hachured/layered water contours, and margin datum blocks.
  3. * Wellcome Collection* & *Smithsonian Transcription Center* — side-by-side facsimile plate inspection paired with diplomatic transcriptions and uncertainty badges.
  4. * Edward Tufte's Visual Explanations* — multi-channel encoding (shape + color + text label) in the Connection Observatory so meaning never relies on hue alone.
- **Voice & UX copy:** Active, precise curatorial prose written from the investigator's perspective. Zero marketing filler or AI buzzwords. Primary actions use specific archival verbs (`Investigate Dossier`, `Compare Eras`, `Bookmark`, `Pin to Board`, `Export Board JSON`, `Reset All Filters`). Empty, error, and import-validation states explain the exact cause in plain language and offer an immediate recovery action. All sample records carry an explicit provenance notice identifying them as fictional demonstration records authored for *The Unfinished Atlas*.

## 3. Color system

Every color in the interface maps to a semantic CSS custom property in `src/styles/tokens.css`. Raw `#000000` and `#FFFFFF` are strictly banned.

| Role | Token | Color Name | Hex | OKLCH Approximation | Computed Contrast & Usage |
|---|---|---|---|---|---|
| 60% — Dominant | `--paper-warm` | Warm Rag Paper | `#F5F1E8` | `oklch(0.958 0.014 86)` | Primary page background and ledger field |
| 30% — Secondary | `--paper-chalk` | Chalk Folio Leaf | `#FFFCF5` | `oklch(0.990 0.008 88)` | Raised specimen sheets, masthead, dialogs, active panels |
| 30% — Secondary | `--paper-vellum` | Recessed Vellum | `#EAE3D3` | `oklch(0.916 0.020 84)` | Table headers, secondary badges, recessed wells |
| 30% — Secondary | `--paper-sunken` | Sunken Folio | `#E2DAC8` | `oklch(0.890 0.023 83)` | Pressed states and deep inset wells |
| Ink — Primary | `--ink-primary` | Iron-Gall Ink | `#292820` | `oklch(0.275 0.013 98)` | `13.13:1` on `--paper-warm`; body prose, headlines, primary borders |
| Ink — Secondary | `--ink-secondary` | Graphite Note | `#54524A` | `oklch(0.440 0.012 95)` | `6.94:1` on `--paper-warm`; captions, metadata, secondary copy |
| 10% — Accent | `--accent-terracotta` | Oxidized Terracotta | `#8E3E2A` | `oklch(0.495 0.118 36)` | `6.49:1` on `--paper-warm`; `7.13:1` with `--paper-chalk` text; CTAs, active tabs, focus rings, contested stamps |
| Accent Hover/Active | `--accent-terracotta-hover` / `-active` | Fired Umber | `#753120` / `#5E2618` | `oklch(0.430 0.106 36)` | Interactive hover and active-pressed states for terracotta actions |
| Accent Mark | `--accent-terracotta-mark` | Survey Red Chalk | `#A6503A` | `oklch(0.556 0.122 37)` | Non-text cartographic pins, slider handles, and decorative rules |
| Epistemic — Verified | `--olive-text` / `--olive-tint` | Archival Olive | `#4B4E38` / `#E9EBDF` | `oklch(0.418 0.036 112)` | `7.62:1` on `--paper-warm`; verified evidentiary stamps & artifact nodes |
| Epistemic — Approx. | `--ochre-text` / `--ochre-tint` | Survey Ochre | `#7A4F13` / `#F4EAD8` | `oklch(0.485 0.092 70)` | `6.30:1` on `--paper-warm`; approximate/interpreted stamps & event nodes |
| Hydrography | `--water-fill` / `--water-stroke` | Estuary Slate | `#D5DFDF` / `#566D70` | `oklch(0.892 0.014 198)` | Submerged basins, reservoirs, tidal channels in SVG/Canvas maps |
| Structural Rules | `--rule-fine` / `--rule-strong` | Fine Hairline / Ledger Rule | `#D8D0C2` / `#B8AF9E` | `oklch(0.860 0.019 82)` | Non-text archival dividers, table rules, and graticule ticks |

**Usage rules:**
- **Backgrounds:** Light-mode archival paper hierarchy (`--paper-warm` field → `--paper-chalk` specimen plates → `--paper-vellum` metadata strips). Dark mode is intentionally omitted per the brief's strict art-direction mandate against dark-mode-first layouts.
- **Text:** Never use `--pencil-graticule` (`#89877F`) for prose or labels; all readable text uses `--ink-primary`, `--ink-secondary`, `--accent-terracotta`, `--olive-text`, or `--ochre-text` (all verified `≥ 6.30:1`).
- **Buttons:** Primary actions use solid `--ink-primary` with `--paper-chalk` text (`btn-archival`) or `--accent-terracotta` (`btn-terracotta`); secondary actions use `--paper-chalk` with a `1px solid var(--ink-primary)` frame (`btn-secondary`).
- **Cards / Specimen Sheets:** Crisp `2px` corners (`--radius-sharp`), `1px` hairline rules (`--rule-strong` or `--ink-primary`), and subtle warm-ink paper shadow (`--shadow-sheet`) only where elevation is needed.
- **Highlights / Focus:** High-contrast `2px solid var(--accent-terracotta)` focus ring with `2px` offset on `:focus-visible`. Search matches highlight with `--ochre-tint` background and `1px` bottom border.

## 4. Typography system

- **Brand personality:** Scholarly cartographic press & cultural monograph
- **Font family / pairing:**
  - **Editorial Headings & Prose Display:** `Newsreader` (self-hosted WOFF2 via `next/font/local` in `src/app/fonts/`, weights 400–600, regular & italic; fallbacks: `'Iowan Old Style', 'Palatino Linotype', Georgia, serif`)
  - **Interface Controls & Dense Tables:** `Plus Jakarta Sans` (weights 400/500/600/700; fallbacks: `'Segoe UI', system-ui, -apple-system, sans-serif`)
  - **Archival Call Numbers, Coordinates & Stamps:** `IBM Plex Mono` (weights 400/500/600; fallbacks: `'Cascadia Mono', 'Consolas', ui-monospace, monospace`)
- **Why these fonts fit the personality:** `Newsreader` brings crisp book-press serifs and authentic italics suited to historical narrative, `Plus Jakarta Sans` keeps dense filter bars and comparison controls clean at small sizes, and `IBM Plex Mono` gives accession numbers and coordinate readouts the unmistakable cadence of typed archival index cards.
- **Type scale (defined once in `src/styles/tokens.css`):**
  - `--text-display`: `clamp(2.25rem, 4.1vw + 0.8rem, 4.15rem)` (`line-height: 1.07`, `letter-spacing: -0.02em`)
  - `--text-h1`: `clamp(1.9rem, 2.8vw + 0.85rem, 3.1rem)` (`line-height: 1.12`)
  - `--text-h2`: `clamp(1.45rem, 1.6vw + 0.85rem, 2.15rem)` (`line-height: 1.18`)
  - `--text-h3`: `clamp(1.175rem, 0.75vw + 0.9rem, 1.45rem)` (`line-height: 1.25`)
  - `--text-body-lg`: `clamp(1.0625rem, 0.35vw + 0.98rem, 1.2rem)` (`line-height: 1.6`)
  - `--text-body`: `1rem` (`16px` strict floor, `line-height: 1.65`)
  - `--text-body-sm`: `0.875rem` (`14px`, supporting metadata & compact cards)
  - `--text-caption`: `0.78125rem` (`12.5px`, monospace catalogue codes & stamps, `letter-spacing: 0.04em`)
  - `--text-button`: `0.875rem` (`14px`, weight `600`, `letter-spacing: 0.01em`)
- **Line-height / line-length:** Body copy runs at `1.65` line-height constrained to `--measure-reading: 66ch` so long-form place investigations never stretch across wide monitors.
- **Responsive rules:** Fluid `clamp()` sizing adapts smoothly from `360px` to `1440px+` without clipping or `text-overflow: ellipsis` on headlines.

## 5. Layout system

- **Container widths:** `--container-max: 82rem` (`1312px`) centered with `padding-inline: clamp(1rem, 3vw, 2.5rem)`.
- **Section spacing:** Driven by `--space-1` (`0.25rem`) through `--space-9` (`6.25rem`), separated by `.double-rule` (`4px` double border) or `.hairline-rule` (`1px` border).
- **Grid rules:** Asymmetrical editorial grids (`1.15fr 0.85fr` entrance folio, `1.35fr 0.95fr` Explore split, `320px 1fr` sidebar dossiers, and varied 4-variant place monograph templates) collapsing cleanly to `1fr` on mobile viewports (`< 960px`) with `min-width: 0` on every grid child to guarantee zero horizontal overflow.
- **Page anatomy / section order:**
  - **Home (`/`):** Masthead → Asymmetrical Entrance Folio (Editorial statement + Interactive Cartographic Survey Plate + Featured Dossier + Dataset Ledger Counters) → Selected Place Investigations (varied asymmetric index) → Interactive Chronology of Erasure Strip → Deep Monograph Excerpt (`St. Clement's Rail Concourse`) → Recently Catalogued Artifacts → Unresolved Historical Questions Ledger → Colophon Footer.
  - **Explore (`/explore`):** Folio Header → Multi-facet Filter & Search Bar → Synchronized Split View (Custom SVG Regional Map with clickable pins + Result List + Selected Place Dossier Inspector).
  - **Place Investigation (`/places/[slug]`):** Breadcrumb & Epistemic Stamp Header → Variant-specific Monograph Layout (`hydrographic-folio`, `architectural-inquest`, `field-expedition`, or `dossier-monograph`) → Period State Switcher & Vector Reconstruction → Verified/Interpreted/Unresolved Claims Ledger → Connected Artifacts, People & Events → Archival Sources & Related Places.
  - **Time Machine (`/time-machine`):** Place & Dual-Era Selector Bar → Interactive Draggable Split-Curtain SVG Comparison (plus Side-by-Side mode) → Structured Transformation Metrics Table → Epistemic Certainty Breakdown.
  - **Artifact Cabinet (`/artifacts` & `/artifacts/[id]`):** Faceted Search & Medium/Certainty Filters → Varied Specimen Grid → Deep Facsimile Inspection Route with Zoomable Plate, Diplomatic Transcription, Provenance Chain & Cross-References.
  - **Connection Observatory (`/observatory`):** Search & Entity-Type Shape Filter Bar → 3-Mode Visualization (`SVG Vector`, `HTML5 Canvas`, and `Accessible Ledger Table`) + Ego-Network Isolation + Selected Node Inspector.
  - **Research Desk (`/desk`):** Bookmarked Places & Artifacts → Multi-Board Workspace (Create/Rename/Delete Boards, Reorder Pinned Items, Attach Markdown-lite Research Notes, Track Open Investigation Questions, Export/Import Validated Board JSON).
  - **Global Search (`/search` + Modal):** Instant `/` or `Ctrl+K` `<dialog>` modal + full `/search` route grouped across Places, Artifacts, Events, People, Sources, and Unresolved Questions with highlighted match snippets.
- **Hero composition:** Asymmetrical two-column editorial folio opening (`1.15fr` typographic manifesto + dataset counters paired with `0.85fr` interactive regional cartographic preview and featured place callout), fitting comfortably above the fold on laptop viewports without generic centered SaaS buttons.
- **Mobile-first behavior & breakpoints:** Mobile (`360px–640px`), Tablet (`641px–960px`), Desktop (`961px–1312px+`). Wide tables use `@container (width < 600px)` stacked `data-label` cards so mobile viewports never horizontally scroll.

## 6. Component system

- **Component base / library:** Native semantic HTML5 + React 18 + custom CSS tokens and CSS Modules (`tokens.css`, `globals.css`, `*.module.css`). Zero external UI component libraries.
- **Chart / data-viz engine:** Custom parametric SVG (`PeriodSceneRenderer`, `ArtifactPlateRenderer`, `ExploreAtlasClient`, `ObservatoryClient`) + custom HiDPI HTML5 2D `<canvas>` network renderer (`ObservatoryCanvasView` in `ObservatoryClient.tsx`).
- **Buttons (`.btn-archival`):** Minimum `44px × 44px` hit target, `2px` radius, `1px` solid border, explicit hover, `:focus-visible`, `:active` (`translateY(1px)`), and `:disabled` states. Variants: Primary Ink, `.btn-terracotta`, `.btn-secondary`.
- **Epistemic Badges (`.stamp`):** `.stamp-verified` (olive), `.stamp-approximate` / `.stamp-interpreted` (ochre), `.stamp-contested` (terracotta) — always pairing an icon/glyph or text label with border + tint.
- **Masthead (`AtlasMasthead`):** Sticky top folio bar with accession edition tag, primary route links with `aria-current="page"`, live Research Desk item counter badge, and quick-search modal trigger (`/`).
- **Dialogs (`GlobalSearchDialog`, `SaveToDeskControls`):** Native `<dialog>` opened via `.showModal()`, styled `::backdrop`, `overscroll-behavior: contain`, automatic `Escape` and backdrop dismissal, and focus restoration.
- **Forms & Inputs (`.archival-input`, `.archival-select`, `.archival-textarea`):** `min-height: 44px`, explicit `<label htmlFor="...">` pairing, `16px`/`0.9375rem` legible text, and crisp terracotta `:focus-visible` outlines.

## 7. Card & section style

- **Chosen style:** Flat archival specimen sheets framed by `1px` hairline rules (`--rule-strong` or `--ink-primary`) and double-rule section dividers.
- **Radius:** `--radius-sharp: 2px` on buttons, stamps, inputs, and specimen plates; `--radius-folio: 4px` maximum on modal sheets. Zero pill-shaped cards or `16px+` rounded SaaS boxes.
- **Shadow / elevation:** Flat paper hierarchy by default; `--shadow-sheet` on raised interactive plates and `--shadow-elevated` strictly reserved for modal `<dialog>` sheets and toast notifications.
- **Gradients & Glassmorphism:** None (`0` gradients, `0` `backdrop-filter` blurs).

## 8. Icon system

- **Icon library:** Custom 1.5px-stroke inline SVG cartographic & archival glyphs in `src/components/ArchivalIcons.tsx` (compass rose, bookmark ribbon, pin, magnifying glass, split comparison arrows, network nodes, ledger checkmarks). Zero emojis used as UI icons.
- **Icon size:** `16px` inline with button/stamp labels; `20px–28px` for cartographic north arrows and empty-state emblems.
- **Usage rules:** Decorative icons carry `aria-hidden="true"`; icon-only controls carry explicit `aria-label` attributes.

## 9. Image & asset rules

- **Visual assets:** 100% original, deterministic, version-controlled SVG cartographic reconstructions (`PeriodSceneRenderer.tsx`), medium-specific archival facsimile plates (`ArtifactPlateRenderer.tsx`), and HTML5 `<canvas>` projections. Zero external hotlinked stock photos that could break or violate licensing.
- **Aspect ratio & CLS:** Every SVG and `<canvas>` viewport declares explicit `viewBox` and CSS `aspect-ratio` (`960 / 620`, `760 / 440`, `4 / 3`) so Cumulative Layout Shift (CLS) is `0`.
- **Honesty & Provenance:** Reconstructed scenes and facsimile plates carry explicit `ILLUSTRATIVE RECONSTRUCTION` or `ARCHIVAL FACSIMILE PLATE` captions so synthetic visuals are never misrepresented as authentic historical photographs.

## 10. Animation & interaction system

- **Animation engine:** Restrained CSS transitions (`--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)`, `150ms–240ms`) animating only `transform`, `opacity`, `background-color`, and `border-color`.
- **Interaction states:** Every interactive control implements `default`, `:hover`, `:focus-visible` (`2px solid var(--accent-terracotta)`), `:active` (`translateY(1px)`), and `:disabled` (`opacity: 0.48`, `cursor: not-allowed`).
- **Toast & persistence feedback:** `ResearchDeskProvider` renders an accessible `role="status" aria-live="polite"` toast strip in the bottom-right corner whenever bookmarks, boards, notes, questions, or JSON imports/exports succeed or fail.
- **Data view states:** Every filtered/searched view (`Explore`, `Artifact Cabinet`, `Observatory`, `Search`, `Research Desk`) implements tailored empty states with one-click filter reset or starter actions, plus inline JSON import error messaging with retry capability.
- **Reduced-motion support:** `@media (prefers-reduced-motion: reduce)` in `globals.css` collapses all transition/animation durations to `0.01ms` and disables smooth scroll behavior.
- **Performance:** Route-level code splitting via Next.js App Router, statically bundled TypeScript dataset (zero runtime waterfall fetches), `display: swap` web fonts with local fallbacks, and `devicePixelRatio`-bounded `<canvas>` redraws.

## 11. Accessibility rules

- **Contrast:** Every foreground/background text pair is mathematically verified `≥ 6.30:1` (exceeding WCAG 2.2 AA `4.5:1` for normal text and `3:1` for UI components).
- **Keyboard navigation:** Global `.skip-link` jumps straight to `#main-content`; `/` and `Ctrl+K` open global search (safely ignored when focus is inside inputs/textareas); Time Machine split slider supports Left/Right arrow keys via native `<input type="range">`; Observatory provides both clickable SVG/Canvas nodes, a synchronized keyboard `<select>` node jumper, and a full `<table>` ledger view.
- **Multi-channel encoding:** Epistemic certainty uses color + border style + uppercase text label; Observatory entity types use distinct geometric shapes (Double Circle, Square, Diamond, Hexagon) + color + text legend.

## 12. Anti-AI-slop rules

- **Approved palette (only colors allowed):** `#F5F1E8`, `#FFFCF5`, `#EAE3D3`, `#E2DAC8`, `#292820`, `#54524A`, `#8E3E2A`, `#753120`, `#5E2618`, `#A6503A`, `#F5E5DF`, `#4B4E38`, `#6B6E52`, `#E9EBDF`, `#7A4F13`, `#9B6A23`, `#F4EAD8`, `#D5DFDF`, `#566D70`, `#D8D0C2`, `#B8AF9E`, `#89877F` (plus `#F2ECE0`, `#E4DDD0`, `#C9BFAE` survey sheet tints inside SVG/Canvas plates).
- **Pure `#000`/`#fff` used?** **No.** Replaced everywhere by iron-gall ink (`#292820`) and chalk folio paper (`#FFFCF5`).
- **Concept-test verdict:** Passed — reads immediately as an independent archival monograph and cartographic research tool rather than a generic SaaS app.
- **Project-specific exceptions to the generic gate:** Section 3 of the product brief explicitly mandates *"Fine rules and carefully controlled borders"* (`#D8D0C2`) to evoke physical archival ledgers and cartographic plates. Accordingly, `1px` hairline and `4px` double archival rules are deliberately used for structural separation alongside paper-tint contrast.

## 13. Future page instructions

Every future route, monograph layout, or visualization added to *The Unfinished Atlas* must import tokens exclusively from `src/styles/tokens.css`, preserve the `Newsreader` + `Plus Jakarta Sans` + `IBM Plex Mono` typographic hierarchy, enforce the `44px` minimum touch target floor, and maintain explicit epistemic certainty badges (`Verified`, `Interpreted`, `Approximate`, `Contested`).

## 14. Update policy

Whenever a token, typographic step, visualization encoding, or component pattern changes in `src/styles/tokens.css` or `src/components/`, update `DESIGN_SYSTEM.md` in the same commit so documentation and production code never drift apart.
