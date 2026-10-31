import type {
  HistoricalPeriod,
  Source,
  Person,
  HistoricalEvent,
} from '@/types/atlas';

export const HISTORICAL_PERIODS: HistoricalPeriod[] = [
  {
    id: 'pre-industrial',
    catalogueRef: 'UA-ERA-I',
    name: 'Vernacular Commons & Tidal Parish',
    spanLabel: '1760–1859',
    startYear: 1760,
    endYear: 1859,
    characterization:
      'Settlement patterns governed by seasonal water tables, manual quarrying, tidal channels, and customary grazing or reed-cutting rights prior to centralized engineering surveys.',
    cartographicNote:
      'Surviving maps from this stratum rely on parish tithe sketches and estate boundary walks rather than triangulated geodetic grids.',
  },
  {
    id: 'survey-expansion',
    catalogueRef: 'UA-ERA-II',
    name: 'Triangulation, Rail & Hydraulic Expansion',
    spanLabel: '1860–1918',
    startYear: 1860,
    endYear: 1918,
    characterization:
      'Rapid infrastructural inscription across littoral and upland zones: iron railway termini, optical meridian stations, steam-pumped fen drainage, and company extraction grids.',
    cartographicNote:
      'First appearance of standardized contour intervals, fire-insurance parcel sheets, and hydrographic sounding ledgers.',
  },
  {
    id: 'municipal-modernism',
    catalogueRef: 'UA-ERA-III',
    name: 'Civic Inundation & Concrete Vaulting',
    spanLabel: '1919–1968',
    startYear: 1919,
    endYear: 1968,
    characterization:
      'High-modernist regional planning marked by valley-scale water supply dams, canal culverting, slum-clearance ordinances, and the subordination of peripheral valleys to metropolitan utilities.',
    cartographicNote:
      'Dual documentation era: meticulous pre-demolition condemnation surveys paired with idealized master-plan overlays that were frequently left half-built.',
  },
  {
    id: 'decommissioning',
    catalogueRef: 'UA-ERA-IV',
    name: 'Obsolescence, Demolition & Withdrawal',
    spanLabel: '1969–1998',
    startYear: 1969,
    endYear: 1998,
    characterization:
      'Retreat of heavy extraction and nineteenth-century transit architecture: nocturnal demolition of glass concourses, closure of brine works, and abandonment of silted harbors.',
    cartographicNote:
      'Official maps often lag behind physical erasure, continuing to print stations, sidings, and piers years after their dismantling.',
  },
  {
    id: 'contemporary-trace',
    catalogueRef: 'UA-ERA-V',
    name: 'Residual Trace & Forensic Resurfacing',
    spanLabel: '1999–2026',
    startYear: 1999,
    endYear: 2026,
    characterization:
      'Drought drawdowns, peat subsidence, and citizen-led oral history projects expose buried infrastructures and contest earlier narratives of inevitable disappearance.',
    cartographicNote:
      'Composite stratum combining low-water LiDAR traces, surviving structural fragments, and unresolved archival gaps.',
  },
];

export const ARCHIVAL_SOURCES: Source[] = [
  {
    id: 'src-01',
    catalogueRef: 'UA-SRC-01',
    title: 'Alderney Water Board Condemnation & Valuation Roll (1934–1938)',
    repository: 'Unfinished Atlas Demonstration Archive — Civic Works Division',
    fondsCode: 'FONDS-AWB-38',
    yearDisplay: '1934–1938',
    sourceKind: 'municipal-commission',
    completenessNote:
      'Folios 1–114 survive intact; Annex C (tenant compensation appeals for dry-stone quarry cottages) was water-damaged prior to microfilming in 1971.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-02',
    catalogueRef: 'UA-SRC-02',
    title: 'Metropolitan Railway Architect’s Elevation & Demolition Ledger',
    repository: 'Unfinished Atlas Demonstration Archive — Built Heritage Fonds',
    fondsCode: 'FONDS-MRA-1894',
    yearDisplay: '1892–1974',
    sourceKind: 'cartographic-survey',
    completenessNote:
      'Includes original linen ink drawings of St. Clement Terminus and incomplete contractor salvage receipts from November 1973.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-03',
    catalogueRef: 'UA-SRC-03',
    title: 'Northern Estuary Hydrographic Sounding Books, Series IV–IX',
    repository: 'Unfinished Atlas Demonstration Archive — Maritime & Littoral Shelf',
    fondsCode: 'FONDS-NEH-09',
    yearDisplay: '1854–1952',
    sourceKind: 'cartographic-survey',
    completenessNote:
      'Lead-line depth measurements recorded every three years except 1915–1919 and 1940–1945; datum baseline shifted by 0.4m in 1902.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-04',
    catalogueRef: 'UA-SRC-04',
    title: 'Compañía Salinera de Neblina Payroll & Evaporator Field Books',
    repository: 'Unfinished Atlas Demonstration Archive — Industrial Extraction Series',
    fondsCode: 'FONDS-CSN-78',
    yearDisplay: '1908–1978',
    sourceKind: 'personal-papers',
    completenessNote:
      'Recovered from the assay office locker in 1983; final eighteen months of brine density logs are missing.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-05',
    catalogueRef: 'UA-SRC-05',
    title: 'Municipal Drainage & Canal Culverting Engineering Dossiers',
    repository: 'Unfinished Atlas Demonstration Archive — Subterranean Infrastructure',
    fondsCode: 'FONDS-MDC-55',
    yearDisplay: '1949–1961',
    sourceKind: 'municipal-commission',
    completenessNote:
      'Contains structural pour sections for Locks 1 through 7; as-built drawings for Locks 8 and 9 were never deposited.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-06',
    catalogueRef: 'UA-SRC-06',
    title: 'Mount Corvus Meridian Circle Observation & Time-Ball Logbooks',
    repository: 'Unfinished Atlas Demonstration Archive — Scientific Instruments Collection',
    fondsCode: 'FONDS-MCM-1882',
    yearDisplay: '1882–1964',
    sourceKind: 'personal-papers',
    completenessNote:
      'Continuous nightly star-transit entries with atmospheric refraction notes; final volume includes decommissioning inventory.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-07',
    catalogueRef: 'UA-SRC-07',
    title: 'Reedmere Fen Drainage Commission & Commoners’ Petition Rolls',
    repository: 'Unfinished Atlas Demonstration Archive — Agrarian & Wetland Holdings',
    fondsCode: 'FONDS-RFD-1911',
    yearDisplay: '1838–1924',
    sourceKind: 'municipal-commission',
    completenessNote:
      'Preserves 142 household signatures contesting steam drainage; accompanying hand-tinted reed-bed map survives in two conflicting drafts.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-08',
    catalogueRef: 'UA-SRC-08',
    title: 'Mercantile Fire Assurance Co. Block & Courtyard Atlas (Ward 4)',
    repository: 'Unfinished Atlas Demonstration Archive — Cadastral Folio Room',
    fondsCode: 'FONDS-MFA-1927',
    yearDisplay: '1904–1959',
    sourceKind: 'cartographic-survey',
    completenessNote:
      'Paste-over correction slips obscure earlier 1904 building footprints beneath 1936 warehouse expansions.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-09',
    catalogueRef: 'UA-SRC-09',
    title: 'Displaced Residents & Trades Oral History Cassette Project',
    repository: 'Unfinished Atlas Demonstration Archive — Spoken Memory Deposit',
    fondsCode: 'FONDS-OHP-1986',
    yearDisplay: '1984–1993',
    sourceKind: 'oral-history-deposit',
    completenessNote:
      'Thirty-eight magnetic tape interviews recorded decades after displacement; recollections occasionally diverge on street numbering and dates.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-10',
    catalogueRef: 'UA-SRC-10',
    title: 'The Northern Gazette & Harbor Intelligencer Microfilm Run',
    repository: 'Unfinished Atlas Demonstration Archive — Periodical Room',
    fondsCode: 'FONDS-NGH-MICRO',
    yearDisplay: '1875–1976',
    sourceKind: 'periodical-microfilm',
    completenessNote:
      'Weekly shipping and civic notices; several November 1973 editions suffered crease-shadowing during 1980s filming.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-11',
    catalogueRef: 'UA-SRC-11',
    title: 'Helena Vance Field Glass-Plate & Contact Print Archive',
    repository: 'Unfinished Atlas Demonstration Archive — Photographic Plates Cabinet',
    fondsCode: 'FONDS-HV-PLATES',
    yearDisplay: '1929–1958',
    sourceKind: 'personal-papers',
    completenessNote:
      'Ninety-four 4×5 inch silver-gelatin negatives; sleeve captions written in grease pencil by a later cataloguer contain three disputed site labels.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
  {
    id: 'src-12',
    catalogueRef: 'UA-SRC-12',
    title: 'Regional Subsidence & Drought Drawdown Field Reconnaissance (2004–2025)',
    repository: 'Unfinished Atlas Demonstration Archive — Contemporary Field Unit',
    fondsCode: 'FONDS-RSF-2025',
    yearDisplay: '2004–2025',
    sourceKind: 'cartographic-survey',
    completenessNote:
      'Non-invasive surface measurements taken during exceptional low-water intervals and agricultural trench inspections.',
    rightsAndProvenance:
      'Curated fictional demonstration record authored for The Unfinished Atlas (CC0 Public Domain Dedication).',
    isFictionalDemonstrationSource: true,
  },
];

export const ARCHIVAL_PEOPLE: Person[] = [
  {
    id: 'per-01',
    catalogueRef: 'UA-PER-01',
    name: 'Helena Vance',
    lifespanDisplay: '1898–1979',
    role: 'Independent Topographic Photographer',
    affiliation: 'Northern Antiquarian & Field Survey Circle',
    biography:
      'Trained as an architectural draughtswoman before documenting valleys, canal basins, and iron rail sheds slated for municipal clearance between 1929 and 1958.',
    epistemicNote:
      'Her negative sleeves provide the sole visual record of inner courtyards in Vermillion Reach and Nine-Locks Ward, though three undated plates remain contested.',
    placeIds: ['pl-vermillion-reach', 'pl-sunken-culvert-ward', 'pl-st-clement-concourse'],
    artifactIds: ['art-02', 'art-11', 'art-19'],
    eventIds: ['evt-04', 'evt-07'],
  },
  {
    id: 'per-02',
    catalogueRef: 'UA-PER-02',
    name: 'Arthur Pendelton',
    lifespanDisplay: '1884–1956',
    role: 'Chief Hydraulic Engineer',
    affiliation: 'Alderney Metropolitan Water Board',
    biography:
      'Principal designer of the Alderney Gravity Dam and later consultant on the concrete vaulting of the Nine-Locks industrial canal network.',
    epistemicNote:
      'His official reports frame inundation and culverting as hygienic imperatives, omitting the tenant objections preserved in private correspondence.',
    placeIds: ['pl-vermillion-reach', 'pl-sunken-culvert-ward'],
    artifactIds: ['art-01', 'art-04', 'art-15'],
    eventIds: ['evt-04', 'evt-07'],
  },
  {
    id: 'per-03',
    catalogueRef: 'UA-PER-03',
    name: 'Maren Lindqvist',
    lifespanDisplay: '1921–2011',
    role: 'Schoolteacher’s Daughter & Oral Witness',
    affiliation: 'Vermillion Reach Parish Association',
    biography:
      'Evacuated from Vermillion Reach at age seventeen in October 1938; spent four decades compiling household parcel lists from former neighbors.',
    epistemicNote:
      'Her 1986 recorded testimony identifies a submerged footbridge absent from the Water Board’s 1935 condemnation survey.',
    placeIds: ['pl-vermillion-reach'],
    artifactIds: ['art-03', 'art-07'],
    eventIds: ['evt-04', 'evt-13'],
  },
  {
    id: 'per-04',
    catalogueRef: 'UA-PER-04',
    name: 'Octavio Solís',
    lifespanDisplay: '1846–1914',
    role: 'Structural Ironmaster & Architect',
    affiliation: 'Metropolitan Central Railway Co.',
    biography:
      'Engineered the 48-meter cantilevered lattice trusses and prismatic skylight vaults of St. Clement Terminus as well as the iron time-ball mast atop Mount Corvus.',
    epistemicNote:
      'His calculation notebooks survive, but the whereabouts of the disassembled cast-iron column capitals removed in 1973 remain unknown.',
    placeIds: ['pl-st-clement-concourse', 'pl-corvus-observatory'],
    artifactIds: ['art-05', 'art-17'],
    eventIds: ['evt-02', 'evt-03'],
  },
  {
    id: 'per-05',
    catalogueRef: 'UA-PER-05',
    name: 'Capt. Jonas Halvorsen',
    lifespanDisplay: '1832–1903',
    role: 'Estuary Pilot & Hydrographer',
    affiliation: 'Port Meridian Customs & Trinity Buoyage Office',
    biography:
      'Conducted thirty years of lead-line soundings across the Northern Silted Estuary, warning as early as 1874 that upstream river straightening would choke Port Meridian.',
    epistemicNote:
      'His private sounding charts systematically record shallower bar depths than the Harbor Board’s promotional shipping circulars of the same decade.',
    placeIds: ['pl-port-meridian-spit', 'pl-reedmere-commons'],
    artifactIds: ['art-08', 'art-10'],
    eventIds: ['evt-01', 'evt-05'],
  },
  {
    id: 'per-06',
    catalogueRef: 'UA-PER-06',
    name: 'Mateo Echeverría',
    lifespanDisplay: '1929–2008',
    role: 'Brine Pan Foreman & Union Secretary',
    affiliation: 'Salina Neblina Extraction Collective',
    biography:
      'Supervised solar crystallization sectors B and C at Salina Neblina for twenty-six years and locked the assay office when the last water train departed in 1978.',
    epistemicNote:
      'Left marginal annotations inside company ledgers explaining aquifer drawdown patterns never acknowledged by corporate geologists.',
    placeIds: ['pl-salina-neblina'],
    artifactIds: ['art-12', 'art-14'],
    eventIds: ['evt-10'],
  },
  {
    id: 'per-07',
    catalogueRef: 'UA-PER-07',
    name: 'Dr. Clara Niemann',
    lifespanDisplay: '1904–1988',
    role: 'Positional Astronomer',
    affiliation: 'Mount Corvus Transit Observatory',
    biography:
      'Directed meridian transit observations and telegraph time-signal synchronization from 1939 until the observatory’s closure in 1964.',
    epistemicNote:
      'Authored a meticulous skyglow brightness log demonstrating the creeping atmospheric luminance of the expanding metropolis below.',
    placeIds: ['pl-corvus-observatory', 'pl-port-meridian-spit'],
    artifactIds: ['art-18', 'art-20'],
    eventIds: ['evt-09'],
  },
  {
    id: 'per-08',
    catalogueRef: 'UA-PER-08',
    name: 'Thomas Greer',
    lifespanDisplay: '1861–1931',
    role: 'Reed-Cutter & Commons Petitioner',
    affiliation: 'Reedmere Fen Commoners’ Committee',
    biography:
      'Spokesperson for forty-eight wetland households during the 1909–1911 parliamentary inquiry into steam-pumped drainage of Reedmere Fen.',
    epistemicNote:
      'Dictated boundary testimony naming eel-weirs and submerged causeways that modern trenching only rediscovered a century later.',
    placeIds: ['pl-reedmere-commons'],
    artifactIds: ['art-21', 'art-23'],
    eventIds: ['evt-05', 'evt-14'],
  },
  {
    id: 'per-09',
    catalogueRef: 'UA-PER-09',
    name: 'Soraia Benali',
    lifespanDisplay: '1936–present',
    role: 'Typesetter & Community Archivist',
    affiliation: 'Foundry Row Mutual Printshop & Oral Archive',
    biography:
      'Apprenticed in a courtyard letterpress shop on Tinplate Alley before the 1962 clearance; initiated the 1984 cassette project interviewing former residents of Ward 4.',
    epistemicNote:
      'Reconstructed parcel occupancy maps from memory and union dues cards, revealing workshop households omitted from municipal census summaries.',
    placeIds: ['pl-foundry-row', 'pl-sunken-culvert-ward'],
    artifactIds: ['art-25', 'art-27', 'art-28'],
    eventIds: ['evt-08', 'evt-11'],
  },
  {
    id: 'per-10',
    catalogueRef: 'UA-PER-10',
    name: 'julian Vestergaard',
    lifespanDisplay: '1914–1992',
    role: 'Regional Highway & Clearance Planner',
    affiliation: 'Metropolitan Ring-Road & Renewal Authority',
    biography:
      'Architect of the 1961 Inner Arterial Master Plan that mandated the clearance of Foundry Row and the demolition of St. Clement Terminus.',
    epistemicNote:
      'Only forty percent of his planned viaduct loop was ever poured, leaving wide asphalt severance strips where dense neighborhoods previously stood.',
    placeIds: ['pl-foundry-row', 'pl-st-clement-concourse'],
    artifactIds: ['art-06', 'art-26'],
    eventIds: ['evt-08', 'evt-09', 'evt-10'],
  },
];

// Normalize proper capitalization on Julian Vestergaard
ARCHIVAL_PEOPLE[9]!.name = 'Julian Vestergaard';

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 'evt-01',
    catalogueRef: 'UA-EVT-01',
    title: 'Equinoctial Bar Breach at Port Meridian',
    year: 1879,
    dateDisplay: '14–16 November 1879',
    dateCertainty: 'documented',
    eraId: 'survey-expansion',
    summary:
      'A three-day northeast gale breached the outer shingle spit protecting Port Meridian, redirecting tidal scour away from the customs quay.',
    consequence:
      'Initiated rapid siltation of the main anchorage; within twenty-five years deep-draft vessels could no longer cross the inner bar.',
    epistemicStatus: 'verified',
    placeIds: ['pl-port-meridian-spit'],
    artifactIds: ['art-08', 'art-09'],
    personIds: ['per-05'],
    sourceIds: ['src-03', 'src-10'],
  },
  {
    id: 'evt-02',
    catalogueRef: 'UA-EVT-02',
    title: 'Inauguration of Mount Corvus Meridian Circle & Time-Ball',
    year: 1882,
    dateDisplay: '21 June 1882',
    dateCertainty: 'documented',
    eraId: 'survey-expansion',
    summary:
      'First daily 13:00 telegraph drop of the copper time-ball atop Mount Corvus, synchronizing harbor chronometers at Port Meridian and railway clocks across the basin.',
    consequence:
      'Linked upland optical astronomy directly to coastal navigation and metropolitan rail scheduling for eight decades.',
    epistemicStatus: 'verified',
    placeIds: ['pl-corvus-observatory', 'pl-port-meridian-spit', 'pl-st-clement-concourse'],
    artifactIds: ['art-17'],
    personIds: ['per-04'],
    sourceIds: ['src-06'],
  },
  {
    id: 'evt-03',
    catalogueRef: 'UA-EVT-03',
    title: 'Opening of St. Clement Glass Concourse',
    year: 1894,
    dateDisplay: '3 May 1894',
    dateCertainty: 'documented',
    eraId: 'survey-expansion',
    summary:
      'Completion of Octavio Solís’s single-span wrought-iron and prismatic-glass train shed serving twelve regional and littoral lines.',
    consequence:
      'Anchored mercantile workshops and boarding courtyards throughout adjacent Foundry Row and Nine-Locks Ward.',
    epistemicStatus: 'verified',
    placeIds: ['pl-st-clement-concourse', 'pl-foundry-row'],
    artifactIds: ['art-05'],
    personIds: ['per-04'],
    sourceIds: ['src-02', 'src-10'],
  },
  {
    id: 'evt-04',
    catalogueRef: 'UA-EVT-04',
    title: 'Closing of the Alderney Sluices & Inundation of Vermillion Reach',
    year: 1938,
    dateDisplay: '19 November 1938',
    dateCertainty: 'documented',
    eraId: 'municipal-modernism',
    summary:
      'Following compulsory purchase and roof removal across eighty-two stone buildings, reservoir impoundment submerged the valley floor to a depth of twenty-eight meters.',
    consequence:
      'Erased an entire slate-quarrying parish while supplying potable water to the expanding industrial wards downstream.',
    epistemicStatus: 'verified',
    placeIds: ['pl-vermillion-reach'],
    artifactIds: ['art-01', 'art-02', 'art-03', 'art-04'],
    personIds: ['per-01', 'per-02', 'per-03'],
    sourceIds: ['src-01', 'src-11'],
  },
  {
    id: 'evt-05',
    catalogueRef: 'UA-EVT-05',
    title: 'Commissioning of Reedmere Steam Pumping Stations A & B',
    year: 1911,
    dateDisplay: 'April–September 1911',
    dateCertainty: 'documented',
    eraId: 'survey-expansion',
    summary:
      'Twin coal-fired centrifugal pumps lowered the Reedmere water table by 2.6 meters, converting 3,400 hectares of seasonal reed commons into rectilinear arable polders.',
    consequence:
      'Terminated customary eel-weir and reed-thatch livelihoods and triggered slow aerobic oxidation and shrinkage of deep fen peat.',
    epistemicStatus: 'verified',
    placeIds: ['pl-reedmere-commons', 'pl-port-meridian-spit'],
    artifactIds: ['art-21', 'art-22'],
    personIds: ['per-05', 'per-08'],
    sourceIds: ['src-07'],
  },
  {
    id: 'evt-06',
    catalogueRef: 'UA-EVT-06',
    title: 'Peak Brine Harvest & Narrow-Gauge Electrification at Salina Neblina',
    year: 1929,
    dateDisplay: 'c. 1928–1930',
    dateCertainty: 'approximate',
    eraId: 'municipal-modernism',
    summary:
      'Expansion of Salina Neblina to forty-four solar crystallizer quadrangles housing 1,100 seasonal and permanent workers along an arid coastal basin.',
    consequence:
      'Over-pumping of basal freshwater lenses began altering subsurface salinity gradients long before economic collapse.',
    epistemicStatus: 'interpreted',
    placeIds: ['pl-salina-neblina'],
    artifactIds: ['art-12', 'art-13'],
    personIds: [],
    sourceIds: ['src-04'],
  },
  {
    id: 'evt-07',
    catalogueRef: 'UA-EVT-07',
    title: 'Reinforced Concrete Decking of Nine-Locks Canal Basin',
    year: 1955,
    dateDisplay: '1952–1958',
    dateCertainty: 'documented',
    eraId: 'municipal-modernism',
    summary:
      'Municipal contractors encased three polluted industrial canal branches beneath box-girder concrete slabs, paving an administrative parking esplanade directly overhead.',
    consequence:
      'Severed warehouse loading wharves from water access and sealed nineteenth-century masonry lock chambers underground intact.',
    epistemicStatus: 'verified',
    placeIds: ['pl-sunken-culvert-ward', 'pl-foundry-row'],
    artifactIds: ['art-15', 'art-16', 'art-19'],
    personIds: ['per-01', 'per-02'],
    sourceIds: ['src-05', 'src-11'],
  },
  {
    id: 'evt-08',
    catalogueRef: 'UA-EVT-08',
    title: 'Ward 4 Hygiene & Arterial Clearance Ordinance',
    year: 1962,
    dateDisplay: '12 March 1962',
    dateCertainty: 'documented',
    eraId: 'municipal-modernism',
    summary:
      'Compulsory condemnation of sixteen courtyard blocks along Foundry Row and Tinplate Alley to carve an eight-lane approach corridor toward St. Clement.',
    consequence:
      'Dispersed over 2,400 residents and forty-seven small metalworking and printing shops; half the cleared land remained gravel lots for twenty years.',
    epistemicStatus: 'verified',
    placeIds: ['pl-foundry-row', 'pl-sunken-culvert-ward'],
    artifactIds: ['art-25', 'art-26', 'art-27'],
    personIds: ['per-09', 'per-10'],
    sourceIds: ['src-08', 'src-09'],
  },
  {
    id: 'evt-09',
    catalogueRef: 'UA-EVT-09',
    title: 'Extinguishing of the Mount Corvus Meridian Program',
    year: 1964,
    dateDisplay: '31 October 1964',
    dateCertainty: 'documented',
    eraId: 'municipal-modernism',
    summary:
      'Citing radio time-signal adoption and mercury-vapor streetlight glare from the metropolitan core, authorities dismantled the 1882 brass transit instrument.',
    consequence:
      'The masonry dome and telegraph battery house were left unstaffed on the ridge, gradually stripped of copper sheathing.',
    epistemicStatus: 'verified',
    placeIds: ['pl-corvus-observatory'],
    artifactIds: ['art-18', 'art-20'],
    personIds: ['per-07', 'per-10'],
    sourceIds: ['src-06'],
  },
  {
    id: 'evt-10',
    catalogueRef: 'UA-EVT-10',
    title: 'Nocturnal Demolition of St. Clement Concourse & Viaduct Freeze',
    year: 1973,
    dateDisplay: '8–19 November 1973',
    dateCertainty: 'documented',
    eraId: 'decommissioning',
    summary:
      'Demolition crews felled the 1894 iron-and-glass train shed over eleven nights ahead of a preservation injunction; four months later, municipal bond defaults halted the replacement viaduct.',
    consequence:
      'Left unlinked concrete pier stubs standing beside exposed brick vaulting of the former subterranean parcels concourse.',
    epistemicStatus: 'verified',
    placeIds: ['pl-st-clement-concourse', 'pl-foundry-row'],
    artifactIds: ['art-06', 'art-07'],
    personIds: ['per-10'],
    sourceIds: ['src-02', 'src-10'],
  },
  {
    id: 'evt-11',
    catalogueRef: 'UA-EVT-11',
    title: 'Final Water-Train Departure from Salina Neblina',
    year: 1978,
    dateDisplay: 'August 1978 (exact day disputed)',
    dateCertainty: 'contested',
    eraId: 'decommissioning',
    summary:
      'Following aquifer brining and synthetic soda-ash competition, rail water deliveries ceased and remaining families vacated Salina Neblina within two weeks.',
    consequence:
      'Salt crusts rapidly engulfed timber sluices and dormitory sills, preserving paper records in arid micro-conditions while corroding all ironwork.',
    epistemicStatus: 'interpreted',
    placeIds: ['pl-salina-neblina'],
    artifactIds: ['art-14'],
    personIds: ['per-06'],
    sourceIds: ['src-04', 'src-09'],
  },
  {
    id: 'evt-12',
    catalogueRef: 'UA-EVT-12',
    title: 'Ward 4 Spoken Memory & Parcel Reconstruction Workshops',
    year: 1986,
    dateDisplay: '1984–1987',
    dateCertainty: 'documented',
    eraId: 'decommissioning',
    summary:
      'Former typesetter Soraia Benali convened displaced neighbors over fire-insurance sheets to annotate unrecorded courtyard workshops and alleys.',
    consequence:
      'Exposed substantial discrepancies between official 1961 "derelict vacancy" claims and actual household occupancy.',
    epistemicStatus: 'verified',
    placeIds: ['pl-foundry-row', 'pl-vermillion-reach'],
    artifactIds: ['art-27', 'art-28'],
    personIds: ['per-03', 'per-09'],
    sourceIds: ['src-09'],
  },
  {
    id: 'evt-13',
    catalogueRef: 'UA-EVT-13',
    title: 'Severe Autumn Drawdown Exposure at Vermillion Reach',
    year: 2018,
    dateDisplay: 'September–October 2018',
    dateCertainty: 'documented',
    eraId: 'contemporary-trace',
    summary:
      'Reservoir storage dropped to 21% capacity, exposing the stone packhorse bridge, quarry tramway bed, and schoolhouse threshold for thirty-nine days.',
    consequence:
      'Confirmed Maren Lindqvist’s disputed memory of an eastern footbridge abutment absent from the 1935 Water Board survey.',
    epistemicStatus: 'verified',
    placeIds: ['pl-vermillion-reach'],
    artifactIds: ['art-24'],
    personIds: ['per-03'],
    sourceIds: ['src-12'],
  },
  {
    id: 'evt-14',
    catalogueRef: 'UA-EVT-14',
    title: 'Peat Subsidence Emergence of the Reedmere Timber Causeway',
    year: 2022,
    dateDisplay: 'Spring 2022',
    dateCertainty: 'documented',
    eraId: 'contemporary-trace',
    summary:
      'After 110 years of drainage-induced peat shrinkage totaling 1.9 meters, plowshares struck waterlogged alder-wood pilings matching pre-1911 oral descriptions.',
    consequence:
      'Prompted re-evaluation of pre-drainage wetland mobility and raised unresolved questions about the age of the deeper brushwood trackway.',
    epistemicStatus: 'unresolved',
    placeIds: ['pl-reedmere-commons'],
    artifactIds: ['art-23'],
    personIds: ['per-08'],
    sourceIds: ['src-07', 'src-12'],
  },
];
