import type { Place } from '@/types/atlas';

export const PLACES_PART_2: Place[] = [
  {
    id: 'pl-sunken-culvert-ward',
    slug: 'sunken-culvert-ward',
    catalogueRef: 'UA-PL-05',
    name: 'Nine-Locks & Buried Canal Ward',
    formerName: 'Junction Basin & Bargemen’s Wharves',
    subtitle:
      'Three intersecting nineteenth-century industrial canals vaulted over in concrete between 1952 and 1958, sealing granite lock chambers beneath an administrative plaza.',
    layoutVariant: 'dossier-monograph',
    category: 'buried-infrastructure',
    region: 'Canal & Foundry Ward',
    atlasPosition: {
      x: 458,
      y: 418,
      elevationMeters: 26,
      gridSector: 'D-5 · Lower Canal Basin',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector D-5); synthesized urban-hydraulic site.',
    activeSpan: {
      startYear: 1819,
      turningPointYear: 1955,
      eraSummary: 'Excavated 1819 · Decked in concrete 1952–1958 · Active storm culvert',
    },
    currentStatusLabel: 'Subterranean · Intact lock chambers under civic plaza',
    excerpt:
      'Office workers crossing Civic Plaza walk four meters above nine dressed-granite lock chambers where coal barges once queued lantern-to-lantern. Only cast-iron ventilation grilles warm with subterranean river air betray the hidden waterway underfoot.',
    editorialIntro:
      'Cities rarely fill their obsolete canals with solid earth; earth is expensive and blocks drainage. By decking the Nine-Locks Junction in box-girder concrete, post-war engineers preserved an entire maritime streetscape—bollards, balance-beam sockets, and tiled towpath taverns—inside permanent artificial midnight.',
    narrativeSections: [
      {
        heading: 'The Tri-Branch Bargemen’s Quarter',
        body: [
          'Cut in 1819 to step foundry barges down twelve meters from the upland coal seam to the tidal river, Nine-Locks formed a tight amphibious neighborhood. Second-story warehouse jib-cranes swung directly over narrow boats while ground-floor chandlers, rope-walks, and lock-keepers’ cottages opened onto cobbled towpaths.',
          'As rail haulage captured bulk freight after 1920, stagnant basin water accumulated dye-works effluent and foundry slag, offering municipal sanitarians a ready case for enclosure.',
        ],
      },
      {
        heading: 'Missing As-Built Sheets for Locks 8 & 9',
        body: [
          'Under Arthur Pendelton’s 1951 Culverting Scheme, contractors poured reinforced concrete decks directly onto the nineteenth-century quay walls, bricking up waterside warehouse doors at basement level. Above the slab rose the Municipal Revenue Annex and a four-acre flagged plaza.',
          'Curiously, while engineering dossiers preserve full cross-sections for Locks 1 through 7, the as-built sheets for Locks 8 and 9 were never deposited—leaving unresolved how the southern spur connects to the undercroft beneath St. Clement Terminus.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        'Y-shaped canal junction stepping through nine granite-lined lock chambers, flanked by cobbled towpaths, cast-iron roving bridges, and four-story brick wharf warehouses.',
      agentOfChange:
        '1952–1958 Municipal Canal Culverting Scheme encasing open water channels beneath box-girder concrete slabs and surface plaza paving.',
      presentTrace:
        'Wind-swept modernist concrete plaza and municipal annex; below street grade, water still flows through unlit granite locks visible only during storm-sewer inspections.',
      survivingMarkers: [
        'Row of nine hexagonal cast-iron air-relief vents tracing the exact curve of the buried canal',
        'Warehouse buildings on Wharf Row whose "ground-floor" windows are actually former second-story loading doors',
        'Granite milepost "0 · JUNCTION" protruding 30cm above asphalt behind the Revenue Annex loading bay',
      ],
    },
    periods: [
      {
        id: 'nl-1912',
        eraId: 'survey-expansion',
        yearLabel: '1912 · Open Canal Junction',
        yearStart: 1880,
        yearEnd: 1935,
        title: 'Active Nine-Lock Flight & Wharf Warehouses',
        summary:
          'Three open canal branches converge in a turning basin; horse-drawn and steam narrowboats step down nine granite locks bordered by continuous brick wharves.',
        settlementScale: '1,850 ward residents; ~90 daily barge lockages',
        builtFabric:
          'Four-story brick crane warehouses, granite lock chambers with oak mitre gates, iron roving bridges, lock-keepers’ cottages.',
        infrastructureState:
          'Open navigable waterway, cobbled towpaths, hydraulic freight spur toward St. Clement undercroft.',
        landscapeCondition:
          'Coal-smoke industrial water corridor tightly enclosed by masonry.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Mapped from 1912 Mercantile Fire Assurance Sheet 14 and canal toll registers.',
        keyChangesFromPrior: [
          'Addition of hydraulic freight tunnel connecting Lock 8 basin toward St. Clement Terminus',
        ],
        scene: {
          waterLevelRatio: 0.36,
          waterPolygon: 'M 0,150 L 290,150 L 520,55 L 545,82 L 325,175 L 560,275 L 535,302 L 285,192 L 0,192 Z',
          terrainContours: ['M 0,120 L 270,120 L 495,30', 'M 0,222 L 270,222 L 505,325'],
          paths: [
            { id: 'nl-tow12', label: 'Cobbled North Towpath', d: 'M 10,138 L 285,138 L 510,45', kind: 'road' },
            { id: 'nl-spur12', label: 'Terminus Freight Spur', d: 'M 335,142 L 335,20', kind: 'canal', dashed: true },
          ],
          structures: [
            { id: 'nl-whf1', label: 'North Wharf Warehouses', x: 55, y: 82, width: 175, height: 42, kind: 'industrial', certainty: 'documented' },
            { id: 'nl-whf2', label: 'South Chandlery Row', x: 65, y: 215, width: 165, height: 38, kind: 'residential', certainty: 'documented' },
            { id: 'nl-lck1', label: 'Granite Locks 1–5', x: 110, y: 148, width: 130, height: 46, kind: 'infrastructure', certainty: 'documented' },
            { id: 'nl-lck8', label: 'Junction Locks 8–9', x: 355, y: 205, width: 95, height: 36, kind: 'infrastructure', certainty: 'documented' },
            { id: 'nl-kpr', label: 'Toll & Lock House', x: 262, y: 214, width: 34, height: 26, kind: 'civic', certainty: 'documented' },
          ],
          annotations: [
            { id: 'nl-a1-12', x: 135, y: 140, label: 'Open Granite Lock Flight', code: 'LCK-1/5' },
            { id: 'nl-a2-12', x: 342, y: 42, label: 'St. Clement Hydraulic Cut', code: 'CUT-N' },
          ],
          landUse: [
            { category: 'Wharf Warehouses & Workshops', percentage: 48, certainty: 'documented' },
            { category: 'Open Canal Basin & Towpaths', percentage: 32, certainty: 'documented' },
            { category: 'Courtyard Housing', percentage: 20, certainty: 'documented' },
          ],
          reconstructionBasis:
            '1912 Fire Assurance Ward 4 Sheet & Canal Navigation Ledger.',
        },
      },
      {
        id: 'nl-1957',
        eraId: 'municipal-modernism',
        yearLabel: '1957 · Box-Girder Culverting',
        yearStart: 1952,
        yearEnd: 1960,
        title: 'Concrete Deck Pouring Over Drained Lock Chambers',
        summary:
          'Oak lock gates pinned open; precast concrete beams lowered across granite copings while south chandleries are demolished for plaza staging.',
        settlementScale: '620 remaining residents; barge navigation permanently closed',
        builtFabric:
          'Reinforced-concrete box culvert roof, bricked-up lower warehouse bays, cleared southern staging apron.',
        infrastructureState:
          'Canal converted to covered storm interceptor; hexagonal vent shafts installed at each former lock head.',
        landscapeCondition:
          'Open construction trench transitioning to elevated paved deck.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Locks 1–7 verified from Fonds MDC-55 pour sheets; Locks 8–9 alignment reconstructed without deposited drawings.',
        keyChangesFromPrior: [
          'Removal of roving bridges and capping of open water beneath concrete slab',
          'Demolition of South Chandlery Row and Toll House',
        ],
        scene: {
          waterLevelRatio: 0.1,
          waterPolygon: 'M 380,215 L 555,282 L 535,302 L 365,232 Z',
          terrainContours: ['M 0,120 L 270,120 L 495,30'],
          paths: [
            { id: 'nl-culv57', label: 'Poured Concrete Culvert Deck', d: 'M 0,170 L 295,170 L 525,70', kind: 'dam' },
            { id: 'nl-spur57', label: 'Unrecorded North Culvert Tie', d: 'M 335,152 L 335,20', kind: 'contour', dashed: true },
          ],
          structures: [
            { id: 'nl-whf1-57', label: 'Converted North Warehouses', x: 55, y: 82, width: 175, height: 42, kind: 'industrial', certainty: 'documented' },
            { id: 'nl-slab57', label: 'Box-Girder Concrete Roof', x: 20, y: 146, width: 285, height: 50, kind: 'infrastructure', certainty: 'documented' },
            { id: 'nl-lck8-57', label: 'Undocumented Pour Sector (Locks 8–9)', x: 355, y: 205, width: 110, height: 42, kind: 'submerged', certainty: 'contested' },
          ],
          annotations: [
            { id: 'nl-a1-57', x: 120, y: 138, label: 'Precast Slab Over Locks 1–5', code: 'SLB-55' },
            { id: 'nl-a2-57', x: 365, y: 266, label: 'Missing As-Built Sector', code: 'GAP-8/9' },
          ],
          landUse: [
            { category: 'Concrete Culvert & Staging Deck', percentage: 54, certainty: 'documented' },
            { category: 'Retained North Warehouses', percentage: 28, certainty: 'documented' },
            { category: 'Uncovered Lower Outfall Trench', percentage: 18, certainty: 'approximate' },
          ],
          reconstructionBasis:
            '1956 Municipal Culverting Progress Dossier & Helena Vance Plate #81.',
        },
      },
      {
        id: 'nl-2025',
        eraId: 'contemporary-trace',
        yearLabel: '2025 · Civic Plaza Over Hidden Waterway',
        yearStart: 2000,
        yearEnd: 2026,
        title: 'Flagstone Esplanade & Subterranean Vent Line',
        summary:
          'Granite-paved Civic Plaza and Revenue Annex mask all trace of water save nine hexagonal vent shafts emitting river damp and echoing weir flow after rain.',
        settlementScale: '3,200 daytime office & loft occupants',
        builtFabric:
          '1961 Revenue Annex slab block, loft-converted north warehouses with buried ground stories, intact granite locks 4m below plaza.',
        infrastructureState:
          'Active subterranean storm-water conduit; locked sewer-inspection manhole in Annex courtyard.',
        landscapeCondition:
          'Hardscaped urban plaza with raised planter boxes positioned to avoid culvert crown loads.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Surface layout verified; hydraulic continuity between Lock 8 and St. Clement undercroft remains unconfirmed.',
        keyChangesFromPrior: [
          'Completion of Civic Plaza paving and Municipal Revenue Annex above junction basin',
          'Adaptive reuse of upper warehouse stories while lower wharf doors remain entombed below street grade',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: ['M 0,60 L 600,60', 'M 0,320 L 600,320'],
          paths: [
            { id: 'nl-ghost25', label: 'Buried Canal Alignment (4m Below)', d: 'M 0,170 L 295,170 L 525,70', kind: 'contour', dashed: true },
            { id: 'nl-ghost25b', label: 'Buried South Branch (Contested)', d: 'M 295,170 L 545,288', kind: 'contour', dashed: true },
          ],
          structures: [
            { id: 'nl-whf1-25', label: 'Wharf Row Lofts (Entombed Base)', x: 55, y: 82, width: 175, height: 42, kind: 'residential', certainty: 'documented' },
            { id: 'nl-plaza25', label: 'Civic Esplanade Paving', x: 40, y: 136, width: 320, height: 95, kind: 'civic', certainty: 'documented' },
            { id: 'nl-annex25', label: 'Municipal Revenue Annex', x: 255, y: 228, width: 165, height: 64, kind: 'civic', certainty: 'documented' },
            { id: 'nl-sublocks', label: 'Sealed Granite Locks (Subterranean)', x: 110, y: 148, width: 130, height: 46, kind: 'submerged', certainty: 'documented' },
          ],
          annotations: [
            { id: 'nl-a1-25', x: 125, y: 130, label: '9 Hexagonal Iron Air Vents', code: 'VNT-9' },
            { id: 'nl-a2-25', x: 270, y: 308, label: 'Protruding 1819 Milepost', code: 'MP-0' },
          ],
          landUse: [
            { category: 'Civic Plaza & Revenue Annex', percentage: 68, certainty: 'documented' },
            { category: 'Converted Wharf Warehouses', percentage: 22, certainty: 'documented' },
            { category: 'Service Alleys & Vent Corridors', percentage: 10, certainty: 'documented' },
          ],
          reconstructionBasis:
            '2025 Surface Utility & Subterranean Acoustic Trace Survey.',
        },
      },
    ],
    claims: [
      {
        id: 'cl-nl-1',
        status: 'verified',
        statement:
          'Granite lock chambers 1 through 7 were left structurally intact beneath the 1955 precast concrete deck rather than demolished or backfilled.',
        evidenceNote: 'Confirmed by 1956 engineering pour cross-sections and municipal storm-conduit inspection logs.',
        sourceIds: ['src-05', 'src-11'],
      },
      {
        id: 'cl-nl-2',
        status: 'interpreted',
        statement:
          'Raised planter beds on Civic Plaza follow an irregular diagonal because engineers could not place soil surcharge directly over the thin crown of Lock 6.',
        evidenceNote: 'Deduced by overlaying 1912 Fire Assurance parcel lines onto current plaza paving.',
        sourceIds: ['src-05', 'src-08'],
      },
      {
        id: 'cl-nl-3',
        status: 'unresolved',
        statement:
          'Why as-built drawings for Locks 8 and 9 were withheld from the 1959 municipal deposit, and whether the flooded freight cut into St. Clement undercroft remains passable.',
        evidenceNote: 'Folder MDC-55/9 contains only an index slip stamped "Retained by Chief Engineer."',
        sourceIds: ['src-02', 'src-05'],
      },
    ],
    artifactIds: ['art-11', 'art-15', 'art-16', 'art-19'],
    eventIds: ['evt-07', 'evt-08'],
    personIds: ['per-01', 'per-02', 'per-09'],
    relatedPlaceIds: ['pl-st-clement-concourse', 'pl-foundry-row', 'pl-vermillion-reach'],
    sourceIds: ['src-05', 'src-08', 'src-11'],
    subjects: ['buried rivers', 'canals', 'culverting', 'modernist plaza', 'subterranean heritage'],
  },
  {
    id: 'pl-corvus-observatory',
    slug: 'corvus-meridian-observatory',
    catalogueRef: 'UA-PL-06',
    name: 'Mount Corvus Transit Observatory',
    formerName: 'Basin Prime Meridian & Telegraph Time Station',
    subtitle:
      'An 1882 basalt-ridge astronomical station and copper time-ball mast rendered blind by metropolitan skyglow and silenced by radio time signals in 1964.',
    layoutVariant: 'architectural-inquest',
    category: 'buried-infrastructure',
    region: 'Observatory Ridge',
    atlasPosition: {
      x: 565,
      y: 205,
      elevationMeters: 482,
      gridSector: 'E-2 · Basalt Escarpment',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector E-2); fictionalized local prime-meridian facility.',
    activeSpan: {
      startYear: 1882,
      turningPointYear: 1964,
      eraSummary: 'First transit 1882 · Extinguished October 1964 · Slit-shuttered shell',
    },
    currentStatusLabel: 'Decommissioned · Empty meridian pier & severed telegraph trace',
    excerpt:
      'For eighty-two years, harbor captains at Port Meridian and train dispatchers at St. Clement set their chronometers by the 13:00 drop of Mount Corvus’s gilded copper ball—until the city’s own mercury-vapor streetlights erased the reference stars that calibrated it.',
    editorialIntro:
      'Mount Corvus was not destroyed by catastrophe; it was blinded by the city it synchronized. Every streetlamp wired along the new arterial highways brightened the southern horizon by another tenth of a magnitude, until sixth-magnitude clock stars vanished into orange haze.',
    narrativeSections: [
      {
        heading: 'Stone Piers Isolated from Bedrock Tremor',
        body: [
          'Built atop a wind-scoured basalt crag visible simultaneously from the estuary anchorage and the central rail throat, the station housed a six-inch brass meridian transit circle mounted on twin sandstone piers sunk four meters clear of the surrounding floorboards so footsteps could never jar the crosshairs.',
          'Each clear night, astronomers timed stellar meridian crossings against a Riefler vacuum pendulum clock inside the subterranean vault, triggering a telegraph relay at 13:00 sharp that dropped the roof time-ball and pulsed railway master clocks.',
        ],
      },
      {
        heading: 'Clara Niemann’s Skyglow Ledger',
        body: [
          'Between 1948 and 1964, director Dr. Clara Niemann logged not only star transits, but also zenith sky brightness readings. Her notebooks chart an inexorable photonic tide advancing from the metropolitan core as sodium and mercury highway lamps replaced shielded gas mantles.',
          'On 31 October 1964, following national adoption of continuous shortwave time broadcasts, technicians unbolted the transit circle. The granite meridian marker stone still stands 120 meters south of the shutter-rusted dome, slicing an overgrown scrub ridge along a local prime meridian no chart has used since 1965.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        'Dressed-basalt meridian hall with roll-away roof shutter, iron time-ball mast engineered by Octavio Solís, subterranean clock cellar, and pole telegraph line.',
      agentOfChange:
        'Atmospheric light pollution from post-war metropolitan expansion combined with obsolescence of optical-telegraphic timekeeping in October 1964.',
      presentTrace:
        'Unstaffed masonry meridian pavilion with welded steel roof slit, bare sandstone instrument piers, felled telegraph pole stumps, and overgrown south-meridian mire stone.',
      survivingMarkers: [
        'Twin isolated sandstone transit piers inscribed with 1882 spirit-level benchmarks',
        'South Meridian Collimator Obelisk standing 120m down-ridge in birch scrub',
        'Rusted iron mast collar where Solís’s copper time-ball mechanism sat until 1964',
      ],
    },
    periods: [
      {
        id: 'mc-1905',
        eraId: 'survey-expansion',
        yearLabel: '1905 · Active Optical Meridian & Time-Ball',
        yearStart: 1882,
        yearEnd: 1938,
        title: 'Dark-Sky Transit Hall & Daily 13:00 Telegraph Drop',
        summary:
          'Unobstructed sixth-magnitude night skies; meridian shutter opens nightly along true north-south axis while overhead telegraph wires carry time pulses down-ridge.',
        settlementScale: '4 resident astronomers & telegraphist',
        builtFabric:
          'Basalt meridian hall, rotating copper dome, 14m iron time-ball mast, stone collimator obelisks north and south.',
        infrastructureState:
          'Dedicated twin-wire telegraph line to St. Clement and Port Meridian, subterranean constant-temperature clock vault.',
        landscapeCondition:
          'Treeless grazed basalt ridge kept clear of brush to prevent thermal air plumes along sightline.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Instrument piers and sightline documented in 1882 commissioning plates (Fonds MCM-1882).',
        keyChangesFromPrior: [
          'Installation of Riefler vacuum pendulum clock in bedrock cellar (1901)',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: [
            'M 40,295 Q 300,255 560,300',
            'M 80,210 Q 300,165 520,215',
            'M 140,120 Q 300,85 460,125',
          ],
          paths: [
            { id: 'mc-mer05', label: '0°00′ Local Meridian Sightline', d: 'M 300,20 L 300,340', kind: 'contour', dashed: true },
            { id: 'mc-tel05', label: 'Time-Signal Telegraph Line', d: 'M 332,175 L 580,285', kind: 'rail' },
            { id: 'mc-rd05', label: 'Ridge Carriage Track', d: 'M 30,275 Q 175,220 265,182', kind: 'road' },
          ],
          structures: [
            { id: 'mc-hall05', label: 'Meridian Transit Hall & Mast', x: 268, y: 152, width: 64, height: 42, kind: 'civic', certainty: 'documented' },
            { id: 'mc-colN', label: 'North Collimator Pier', x: 292, y: 48, width: 16, height: 16, kind: 'infrastructure', certainty: 'documented' },
            { id: 'mc-colS', label: 'South Collimator Obelisk', x: 292, y: 292, width: 16, height: 16, kind: 'infrastructure', certainty: 'documented' },
            { id: 'mc-qtr05', label: 'Astronomer’s Quarters', x: 195, y: 164, width: 52, height: 28, kind: 'residential', certainty: 'documented' },
          ],
          annotations: [
            { id: 'mc-a1-05', x: 342, y: 146, label: 'Solís Copper Time-Ball Mast', code: 'TB-13:00' },
            { id: 'mc-a2-05', x: 315, y: 312, label: 'Clear South Meridian Axis', code: 'MER-S' },
          ],
          landUse: [
            { category: 'Cleared Optical Sightline Turf', percentage: 72, certainty: 'documented' },
            { category: 'Observatory Compound & Piers', percentage: 16, certainty: 'documented' },
            { category: 'Telegraph Easement & Track', percentage: 12, certainty: 'documented' },
          ],
          reconstructionBasis:
            '1905 Mount Corvus Site & Meridian Alignment Plan (Fonds MCM-1882).',
        },
      },
      {
        id: 'mc-1964',
        eraId: 'municipal-modernism',
        yearLabel: '1964 · Skyglow Blindness & Closure',
        yearStart: 1958,
        yearEnd: 1966,
        title: 'Dismantling Under Metropolitan Mercury Glare',
        summary:
          'Southern horizon washed out below 35° elevation by arterial highway lighting; brass transit circle crated for removal and telegraph circuit permanently grounded.',
        settlementScale: '1 caretaker technician during October decommissioning',
        builtFabric:
          'Shuttered meridian slit, dismantled time-ball mast, crated optical assembly, battery shed.',
        infrastructureState:
          'Telegraph poles disconnected; newly erected municipal VHF relay mast 180m east.',
        landscapeCondition:
          'Unmown ridge turf encroached by seedling birch along southern sightline.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Documented in Dr. Niemann’s final October 1964 decommissioning inventory.',
        keyChangesFromPrior: [
          'Removal of 1882 brass transit circle and copper time-ball',
          'Loss of low-declination star visibility due to metropolitan skyglow dome',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: [
            'M 40,295 Q 300,255 560,300',
            'M 80,210 Q 300,165 520,215',
            'M 140,120 Q 300,85 460,125',
          ],
          paths: [
            { id: 'mc-mer64', label: 'Decommissioned Meridian Axis', d: 'M 300,20 L 300,340', kind: 'contour', dashed: true },
            { id: 'mc-rd64', label: 'Service Access Road', d: 'M 30,275 Q 175,220 265,182', kind: 'road' },
          ],
          structures: [
            { id: 'mc-hall64', label: 'Stripped Meridian Hall', x: 268, y: 152, width: 64, height: 42, kind: 'ruin', certainty: 'documented' },
            { id: 'mc-colN64', label: 'North Collimator Pier', x: 292, y: 48, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
            { id: 'mc-colS64', label: 'South Obelisk (Glare Zone)', x: 292, y: 292, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
            { id: 'mc-vhf64', label: 'Municipal VHF Relay Lattice', x: 448, y: 168, width: 22, height: 22, kind: 'infrastructure', certainty: 'documented' },
          ],
          annotations: [
            { id: 'mc-a1-64', x: 245, y: 138, label: 'Welded Transit Roof Slit', code: 'CLS-64' },
            { id: 'mc-a2-64', x: 442, y: 206, label: 'Replacement Radio Relay', code: 'VHF-01' },
          ],
          landUse: [
            { category: 'Scrub-Encroaching Ridge', percentage: 70, certainty: 'documented' },
            { category: 'Vacated Observatory Masonry', percentage: 16, certainty: 'documented' },
            { category: 'Radio Tower Compound', percentage: 14, certainty: 'documented' },
          ],
          reconstructionBasis:
            '1964 Decommissioning Inventory & Skyglow Horizon Plot.',
        },
      },
      {
        id: 'mc-2024',
        eraId: 'contemporary-trace',
        yearLabel: '2024 · Overgrown Meridian Shell',
        yearStart: 2008,
        yearEnd: 2026,
        title: 'Sandstone Piers Inside a Birch-Shrouded Shell',
        summary:
          'Dense secondary birch woodland now blocks both horizon and collimator obelisks; inside the unroofed quarters and sealed transit room, twin bedrock piers remain immovable.',
        settlementScale: 'Unstaffed; ridge hiking trail passes outer wall',
        builtFabric:
          'Weathered basalt meridian shell with steel-plated slit, roofless quarters ruin, moss-covered south obelisk.',
        infrastructureState:
          'Footpath stile and interpretive survey benchmark; 1964 VHF tower removed in 2009.',
        landscapeCondition:
          'Closed-canopy upland birch and pine completely obscuring the 1882 optical sightlines.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Building shell surveyed; destination of the crated 1882 brass transit circle remains unresolved after a 1971 museum warehouse transfer.',
        keyChangesFromPrior: [
          'Canopy closure across the formerly treeless meridian sightline',
          'Collapse of astronomer’s residence timber roof (c. 1994)',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: [
            'M 40,295 Q 300,255 560,300',
            'M 80,210 Q 300,165 520,215',
          ],
          paths: [
            { id: 'mc-trail24', label: 'Escarpment Footpath', d: 'M 20,260 Q 190,210 340,215 T 580,240', kind: 'road', dashed: true },
          ],
          structures: [
            { id: 'mc-hall24', label: 'Sealed Basalt Meridian Shell', x: 268, y: 152, width: 64, height: 42, kind: 'ruin', certainty: 'documented' },
            { id: 'mc-colS24', label: 'Woodland-Buried Obelisk', x: 292, y: 292, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
            { id: 'mc-qtr24', label: 'Roofless Quarters Footings', x: 195, y: 164, width: 52, height: 28, kind: 'ruin', certainty: 'documented' },
          ],
          annotations: [
            { id: 'mc-a1-24', x: 265, y: 136, label: 'Intact Bedrock Transit Piers', code: 'PIER-82' },
            { id: 'mc-a2-24', x: 314, y: 304, label: 'Obelisk Hidden in Birch Canopy', code: 'OBL-S' },
          ],
          landUse: [
            { category: 'Secondary Birch & Pine Canopy', percentage: 86, certainty: 'documented' },
            { category: 'Masonry Ruin & Trail Clearing', percentage: 14, certainty: 'documented' },
          ],
          reconstructionBasis:
            '2024 Escarpment Heritage Condition Assessment (Fonds RSF-2025).',
        },
      },
    ],
    claims: [
      {
        id: 'cl-mc-1',
        status: 'verified',
        statement:
          'Zenith and southern sky brightness at Mount Corvus increased sixfold between 1948 and 1963, obscuring sixth-magnitude clock reference stars below 35° altitude.',
        evidenceNote: 'Quantified in Dr. Clara Niemann’s photometer logbooks (Volumes XI–XIV).',
        sourceIds: ['src-06'],
      },
      {
        id: 'cl-mc-2',
        status: 'interpreted',
        statement:
          'Retention of the local Corvus Prime Meridian on harbor dredging charts until 1952 caused a systematic 14-meter longitudinal offset when overlaid carelessly onto national grids.',
        evidenceNote: 'Explains datum discrepancy noted in Northern Estuary Hydrographic Series IX.',
        sourceIds: ['src-03', 'src-06'],
      },
      {
        id: 'cl-mc-3',
        status: 'unresolved',
        statement:
          'Present whereabouts of the 1882 six-inch brass transit circle and Riefler vacuum pendulum clock crated on 29 October 1964.',
        evidenceNote: 'Ministry voucher records delivery to Polytechnic Annex Store B, demolished in 1979 with no onward manifest.',
        sourceIds: ['src-06'],
      },
    ],
    artifactIds: ['art-17', 'art-18', 'art-20'],
    eventIds: ['evt-02', 'evt-09'],
    personIds: ['per-04', 'per-07', 'per-10'],
    relatedPlaceIds: ['pl-port-meridian-spit', 'pl-st-clement-concourse'],
    sourceIds: ['src-03', 'src-06', 'src-12'],
    subjects: ['astronomy', 'timekeeping', 'light pollution', 'telegraphy', 'obsolete science'],
  },
  {
    id: 'pl-reedmere-commons',
    slug: 'reedmere-commons',
    catalogueRef: 'UA-PL-07',
    name: 'Reedmere Fen & Eel-Weir Commons',
    formerName: 'Great Reedmere Open Fen',
    subtitle:
      'A seasonal wetland commons of stilted reed-cutters’ dwellings pumped dry in 1911 into geometric grain polders, where shrinking peat is now exposing buried timber trackways.',
    layoutVariant: 'field-expedition',
    category: 'reclaimed-marsh',
    region: 'Northern Silted Estuary',
    atlasPosition: {
      x: 668,
      y: 164,
      elevationMeters: -1,
      gridSector: 'E-1 · Inner Fen Basin',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector E-1); composite drained-fen landscape.',
    activeSpan: {
      startYear: 1760,
      turningPointYear: 1911,
      eraSummary: 'Wetland commons pre-1911 · Steam-drained 1911 · Peat subsidence emergence 2022',
    },
    currentStatusLabel: 'Subsided polder (-1.9m) · Exhumed timber causeways',
    excerpt:
      'When coal-fired pumps drained Reedmere Fen in 1911, surveyors promised permanent black-earth wheat fields. They did not calculate that dried peat oxidizes into thin air—lowering the ground nearly two meters in a century until ancient waterlogged causeways broke back through the furrows.',
    editorialIntro:
      'Drainage appears on nineteenth-century maps as an irreversible triumph of straight lines over meandering water. Reedmere demonstrates the opposite: once exposed to oxygen, desiccated fen peat shrinks centimeter by centimeter each summer, slowly returning the land toward sea level while exhuming the wooden infrastructure of the wetland society it displaced.',
    narrativeSections: [
      {
        heading: 'Amphibious Custom & The 1910 Inquiry',
        body: [
          'Prior to 1911, Reedmere fluctuated seasonally between winter open mere and summer sedge meadow. Forty-eight commoner households occupied timber-framed dwellings raised on oak piles along gravel islands, harvesting roofing reed, willow osiers, wildfowl, and silver eels guided into woven wattle weirs.',
          'During the 1909–1910 Drainage Commission hearings, commoner spokesperson Thomas Greer presented a petition warning that deep pumping would destroy both eel fisheries and island wells. Commissioners dismissed customary rights lacking parchment deeds and energized Pumping Stations A and B in April 1911.',
        ],
      },
      {
        heading: 'The Iron Post & Resurfacing Alder Pilings',
        body: [
          'To monitor compaction, engineers drove a cast-iron benchmark post flush into the mineral clay beneath the peat in September 1911, its cap level with the turf. Today that iron cap stands 1.92 meters above the surrounding plowsoil.',
          'In Spring 2022, deep subsoiling struck a double row of dressed alder pilings and brushwood fascines running diagonally across Polder Lot 14—matching the exact bearing of the "Old Weir Causeway" described in Greer’s 1910 testimony but omitted from every official map.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        '3,400-hectare seasonal freshwater fen with braided meres, gravel holms, stilted timber cottages, wattle eel-weirs, and submerged brushwood causeways.',
      agentOfChange:
        '1911 steam-pumped drainage, rectilinear ditch enclosure, and 110 years of aerobic peat oxidation and wind-blow deflation.',
      presentTrace:
        'Flat, below-sea-level arable fields gridded by deep trapezoidal drains and high river embankments; protruding 1911 subsidence post and newly exposed alder causeway timbers.',
      survivingMarkers: [
        '1911 Cast-Iron Peat Subsidence Post standing 1.92m proud of present ground surface',
        'Brick chimney and engine shell of Steam Pumping Station A (superseded by electric screw pumps)',
        'Waterlogged alder-wood causeway pilings exposed in Polder Lot 14 trench (2022)',
      ],
    },
    periods: [
      {
        id: 'rm-1888',
        eraId: 'pre-industrial',
        yearLabel: '1888 · Open Fen & Eel-Weir Commons',
        yearStart: 1760,
        yearEnd: 1910,
        title: 'Seasonal Mere, Gravel Holms & Wattle Weirs',
        summary:
          'Braided channels link shallow open meres around low gravel islands; reed-cutters travel by punt and submerged alder-brush causeways between stilted cottages.',
        settlementScale: '310 commoners across 48 island & margin households',
        builtFabric:
          'Oak-piled timber cottages thatched in local Phragmites reed, woven willow eel-weirs, submerged alder causeway.',
        infrastructureState:
          'Shallow punt lodes, seasonal timber causeway, natural tidal sluice toward Port Meridian estuary.',
        landscapeCondition:
          'Saturated deep peat fen acting as winter flood sponge and silt trap.',
        epistemicStatus: 'interpreted',
        certaintyNote:
          'Mere margins vary between the two surviving hand-tinted drafts in Fonds RFD-1911; causeway line verified by 2022 trenching.',
        keyChangesFromPrior: [
          'Maintenance of customary wattle eel-weirs across main eastern outfall channel',
        ],
        scene: {
          waterLevelRatio: 0.58,
          waterPolygon: 'M 40,65 Q 195,40 330,95 T 575,85 L 575,275 Q 410,310 250,255 T 35,265 Z',
          terrainContours: [
            'M 165,135 Q 235,120 265,165 Q 225,205 160,182 Z',
            'M 380,150 Q 435,140 450,185 Q 405,210 372,180 Z',
          ],
          paths: [
            { id: 'rm-csw88', label: 'Submerged Alder Causeway', d: 'M 25,215 L 175,168 L 385,172', kind: 'road', dashed: true },
            { id: 'rm-lode88', label: 'East Eel-Weir Outfall Channel', d: 'M 445,172 Q 520,175 600,158', kind: 'river' },
          ],
          structures: [
            { id: 'rm-holm1', label: 'West Holm Stilted Cottages', x: 185, y: 148, width: 52, height: 26, kind: 'residential', certainty: 'documented' },
            { id: 'rm-holm2', label: 'East Reed-Staithe Sheds', x: 392, y: 162, width: 38, height: 20, kind: 'industrial', certainty: 'approximate' },
            { id: 'rm-weir', label: 'Customary Wattle Eel-Weirs', x: 478, y: 158, width: 16, height: 34, kind: 'infrastructure', certainty: 'documented' },
          ],
          annotations: [
            { id: 'rm-a1-88', x: 182, y: 132, label: 'Gravel Holm Dwellings', code: 'HLM-W' },
            { id: 'rm-a2-88', x: 280, y: 192, label: 'Alder Brushwood Track', code: 'CSW-1' },
            { id: 'rm-a3-88', x: 472, y: 212, label: 'Eel-Weir Stakes', code: 'WR-04' },
          ],
          landUse: [
            { category: 'Seasonal Open Mere & Reedbed', percentage: 78, certainty: 'approximate' },
            { category: 'Gravel Holm Enclosures', percentage: 14, certainty: 'documented' },
            { category: 'Tidal Outfall Lodes', percentage: 8, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Composite of 1909 Commoners’ Petition Draft Map B and Thomas Greer boundary testimony.',
        },
      },
      {
        id: 'rm-1914',
        eraId: 'survey-expansion',
        yearLabel: '1914 · Newly Pumped Geometric Polder',
        yearStart: 1911,
        yearEnd: 1930,
        title: 'Rectilinear Collector Drains & Steam Outfall',
        summary:
          'Twin coal-fired pumping engines empty the mere into a embanked high-level catchwater channel; peat surface stands level with the 1911 benchmark cap across surveyed ten-acre lots.',
        settlementScale: '115 tenant plowmen & pump enginemen (37 commoner families displaced)',
        builtFabric:
          'Brick Steam Pumping Stations A & B, iron benchmark post flush with ground, rectilinear farmsteads.',
        infrastructureState:
          '28km of trapezoidal collector ditches, raised clay river embankment, coal barge staithe.',
        landscapeCondition:
          'Freshly plowed black peat standing +0.7m above mean estuary tide.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Exact lot lines and initial +0.7m peat datum recorded in 1912 Drainage Award Survey.',
        keyChangesFromPrior: [
          'Elimination of open mere and dismantling of all wattle eel-weirs',
          'Excavation of orthogonal collector ditches and embanked high-level outfall',
        ],
        scene: {
          waterLevelRatio: 0.08,
          waterPolygon: 'M 0,46 L 600,46 L 600,64 L 0,64 Z',
          terrainContours: ['M 0,72 L 600,72'],
          paths: [
            { id: 'rm-d1', label: 'Main Collector Drain', d: 'M 40,180 L 545,180', kind: 'canal' },
            { id: 'rm-d2', label: 'Cross Drain Lot 7', d: 'M 180,64 L 180,320', kind: 'canal' },
            { id: 'rm-d3', label: 'Cross Drain Lot 14', d: 'M 360,64 L 360,320', kind: 'canal' },
            { id: 'rm-rd14', label: 'Straight Drove Road', d: 'M 20,255 L 580,255', kind: 'road' },
          ],
          structures: [
            { id: 'rm-pmpA', label: 'Steam Pumping Station A', x: 525, y: 66, width: 42, height: 32, kind: 'industrial', certainty: 'documented' },
            { id: 'rm-post14', label: '1911 Datum Post (Flush)', x: 245, y: 142, width: 12, height: 12, kind: 'infrastructure', certainty: 'documented' },
            { id: 'rm-frm14', label: 'Commission Tenement Farm', x: 95, y: 215, width: 46, height: 26, kind: 'residential', certainty: 'documented' },
          ],
          annotations: [
            { id: 'rm-a1-14', x: 485, y: 115, label: 'Coal Steam Pump Outfall', code: 'PMP-A' },
            { id: 'rm-a2-14', x: 228, y: 128, label: 'Benchmark Flush (+0.7m)', code: 'BM-0.0' },
          ],
          landUse: [
            { category: 'Drained Black-Peat Arable Lots', percentage: 84, certainty: 'documented' },
            { category: 'Collector Drains & Catchwater Bank', percentage: 12, certainty: 'documented' },
            { category: 'Pump Works & Droveways', percentage: 4, certainty: 'documented' },
          ],
          reconstructionBasis:
            '1912 Reedmere Drainage Commission Final Allotment Plan (Fonds RFD-1911).',
        },
      },
      {
        id: 'rm-2023',
        eraId: 'contemporary-trace',
        yearLabel: '2023 · Subsided Basin & Exhumed Causeway',
        yearStart: 2015,
        yearEnd: 2026,
        title: 'Sunken Fields (-1.2m Datum) & Resurfacing Alder Timbers',
        summary:
          'Peat oxidation has dropped field level 1.92 meters below the 1911 datum cap; electric pumps lift water four meters UP into the embanked river while ancient timber pilings emerge in Lot 14.',
        settlementScale: '42 mechanized farm residents; wetland restoration trial on Lot 14',
        builtFabric:
          'Roofless brick shell of 1911 Steam Station A beside modern steel screw-pump housing; 1.92m exposed iron post.',
        infrastructureState:
          'Continuous electric pumping required to prevent re-flooding; reinforced clay floodbanks towering above field roofs.',
        landscapeCondition:
          'Deflated mineral-skirted peat bowl where buried gravel holms and brushwood trackways now protrude as ridges.',
        epistemicStatus: 'unresolved',
        certaintyNote:
          'Subsidence measured at 1.92m; cutting date of deeper brushwood layer beneath the alder pilings remains undated pending dendrochronology.',
        keyChangesFromPrior: [
          'Loss of 1.92 vertical meters of peat soil through aerobic oxidation and wind erosion',
          'Emergence of pre-1911 alder-wood causeway across Polder Lot 14',
        ],
        scene: {
          waterLevelRatio: 0.16,
          waterPolygon: 'M 0,42 L 600,42 L 600,66 L 0,66 Z M 362,152 L 455,152 L 455,212 L 362,212 Z',
          terrainContours: [
            'M 0,74 L 600,74',
            'M 165,135 Q 235,120 265,165 Q 225,205 160,182 Z',
          ],
          paths: [
            { id: 'rm-d1-23', label: 'Deepened Main Drain', d: 'M 40,180 L 545,180', kind: 'canal' },
            { id: 'rm-csw23', label: 'Exhumed Alder Causeway Trace', d: 'M 145,178 L 415,172', kind: 'contour', dashed: true },
            { id: 'rm-rd23', label: 'Buckled Peat Drove Road', d: 'M 20,255 Q 290,244 580,255', kind: 'road' },
          ],
          structures: [
            { id: 'rm-pmpA23', label: '1911 Steam Shell & Electric Pump', x: 525, y: 68, width: 48, height: 34, kind: 'ruin', certainty: 'documented' },
            { id: 'rm-post23', label: 'Exposed 1.92m Iron Post', x: 245, y: 142, width: 12, height: 12, kind: 'infrastructure', certainty: 'documented' },
            { id: 'rm-trench23', label: 'Lot 14 Re-Wetted Timber Trench', x: 365, y: 155, width: 86, height: 52, kind: 'submerged', certainty: 'documented' },
          ],
          annotations: [
            { id: 'rm-a1-23', x: 215, y: 126, label: 'Iron Post +1.92m Above Soil', code: 'SUB-1.9M' },
            { id: 'rm-a2-23', x: 368, y: 226, label: 'Exhumed Alder Pilings (2022)', code: 'TIM-14' },
            { id: 'rm-a3-23', x: 25, y: 34, label: 'Perched River Above Fields', code: 'RIV+4M' },
          ],
          landUse: [
            { category: 'Subsided Arable Peat Bowl', percentage: 72, certainty: 'documented' },
            { category: 'High Floodbanks & Pump Drains', percentage: 16, certainty: 'documented' },
            { category: 'Re-Wetted Archaeological Buffer', percentage: 12, certainty: 'documented' },
          ],
          reconstructionBasis:
            '2023 Fen Subsidence Transect & Lot 14 Timber Recording Sheet.',
        },
      },
    ],
    claims: [
      {
        id: 'cl-rm-1',
        status: 'verified',
        statement:
          'Ground elevation around the September 1911 Reedmere cast-iron benchmark post has fallen 1.92 meters due to peat wastage following steam drainage.',
        evidenceNote: 'Direct spirit-level measurement recorded in Fonds RSF-2025.',
        sourceIds: ['src-07', 'src-12'],
      },
      {
        id: 'cl-rm-2',
        status: 'verified',
        statement:
          'Waterlogged alder pilings uncovered in Lot 14 align within four degrees of the customary causeway bearing dictated by Thomas Greer in 1910.',
        evidenceNote: 'Confirmed by overlaying 2022 trench GPS plane onto Petition Roll testimony.',
        sourceIds: ['src-07', 'src-12'],
      },
      {
        id: 'cl-rm-3',
        status: 'unresolved',
        statement:
          'Whether the lower hazel-brushwood mattress beneath the alder pilings dates to eighteenth-century reed-cutters or represents a prehistoric wetland trackway.',
        evidenceNote: 'Diffuse ring growth in alder and hazel samples precluded tree-ring dating; radiocarbon assay pending.',
        sourceIds: ['src-12'],
      },
    ],
    artifactIds: ['art-21', 'art-22', 'art-23'],
    eventIds: ['evt-05', 'evt-14'],
    personIds: ['per-05', 'per-08'],
    relatedPlaceIds: ['pl-port-meridian-spit', 'pl-vermillion-reach', 'pl-salina-neblina'],
    sourceIds: ['src-03', 'src-07', 'src-12'],
    subjects: ['wetland commons', 'peat subsidence', 'drainage engineering', 'customary rights', 'archaeology'],
  },
  {
    id: 'pl-foundry-row',
    slug: 'foundry-row-tenements',
    catalogueRef: 'UA-PL-08',
    name: 'Old Foundry Row & Tinplate Quarter',
    formerName: 'Ward 4 Courtyard Precinct',
    subtitle:
      'Sixteen courtyard blocks of metalworking shops, mutual printrooms, and boarding tenements cleared in 1962 for an arterial approach corridor and reconstructed from memory.',
    layoutVariant: 'dossier-monograph',
    category: 'demolished-civic',
    region: 'Canal & Foundry Ward',
    atlasPosition: {
      x: 484,
      y: 382,
      elevationMeters: 31,
      gridSector: 'D-4 · Ward 4 Severance Strip',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector D-4); composite urban clearance precinct.',
    activeSpan: {
      startYear: 1842,
      turningPointYear: 1962,
      eraSummary: 'Built 1842–1905 · Cleared March 1962 · Reconstructed in oral cartography 1986',
    },
    currentStatusLabel: 'Erased street grid · Arterial berm & acoustic barrier',
    excerpt:
      'Municipal clearance maps colored Ward 4 solid black for "obsolete industrial blight." Twenty-four years later, former apprentices laid tracing paper over those same insurance sheets and wrote back forty-seven courtyard workshops, three bakeries, and a multilingual letterpress cooperative.',
    editorialIntro:
      'When an entire street network is erased—curbs pried up, alley names deleted from postal directories, parcel lines merged into highway verges—official archives tend to inherit the categories of the demolition order. Foundry Row survives in our record only because its former residents contested the blankness of the map.',
    narrativeSections: [
      {
        heading: 'Paste-Over Slips in the Insurance Folio',
        body: [
          'Sandwiched between the St. Clement railway throat and the Nine-Locks canal basin, Foundry Row evolved as an intricate honeycomb of street-front brick tenements enclosing glazed inner work-yards. Tinplate stampers, brass instrument finishers supplying Mount Corvus, and union job-printers shared shaft power and courtyard hand-pumps.',
          'Because Mercantile Fire Assurance clerks updated their Ward 4 folio between 1904 and 1959 by gluing lithographed correction slips directly over older buildings, the physical atlas volume holds three generations of courtyard morphology stacked one atop another.',
        ],
      },
      {
        heading: 'Counter-Mapping the 1962 Clearance',
        body: [
          'Julian Vestergaard’s 1961 hygiene assessment classified seventy-eight percent of Foundry Row parcels as "vacant or structurally exhausted," authorizing rapid clearance in March 1962. Yet when typesetter Soraia Benali convened former neighbors in 1984–1987 with enlarged photostats of the 1954 insurance sheet, witnesses documented active households and trade shops in nearly every supposedly vacant court.',
          'Today a sunken six-lane approach cutting and earthwork acoustic berm slice diagonally across old Tinplate Alley; only a single chamfered red-brick corner pub wall—incorporated into an electrical substation—preserves the pre-1962 street angle.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        'Sixteen dense perimeter-block brick tenements pierced by narrow carriage pend-archways leading into skylit metalworking and printing courtyards.',
      agentOfChange:
        '1962 Ward 4 Hygiene & Arterial Clearance Ordinance demolishing the entire street grid for an approach road cutting and wide gravel severance buffers.',
      presentTrace:
        'Depressed six-lane arterial roadway, grassy earthwork noise berms, distribution warehouse sheds, and one surviving chamfered brick corner embedded in a utility substation.',
      survivingMarkers: [
        'Chamfered brick wall of former Tinplate Arms bearing ghost-painted street sign "TINPLATE ALLEY · W.4"',
        '22-meter granite curb remnant preserved inside a fenced railway electrical compound',
        'Layered paste-over Fire Assurance Sheet 9 annotated during the 1986 oral-cartography workshops',
      ],
    },
    periods: [
      {
        id: 'fr-1927',
        eraId: 'municipal-modernism',
        yearLabel: '1927 · Courtyard Workshop Honeycomb',
        yearStart: 1904,
        yearEnd: 1958,
        title: 'Sixteen Tenement Courts & Tinplate Alley',
        summary:
          'Continuous streetwalls along Foundry Row and Tinplate Alley enclose bustling inner glazed workshops, mutual printrooms, and shared courtyard cisterns.',
        settlementScale: '2,640 residents & 47 small courtyard workshops',
        builtFabric:
          'Three- and four-story load-bearing brick tenements, timber-truss courtyard tinplate shops, pend-arch passages.',
        infrastructureState:
          'Granite setts paving, overhead belt-drive line shafts, tramway stop linking north to St. Clement.',
        landscapeCondition:
          'High-density fine-grain urban fabric with small fig and vine planters in inner yards.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Outer masonry footprints verified from Fire Assurance Sheet 9; inner workshop trades added from 1986 oral-history overlay.',
        keyChangesFromPrior: [
          'Roofing-over of central yards C and F with sawtooth skylight glazing for letterpress and brass shops',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: ['M 0,40 L 600,40', 'M 0,320 L 600,320'],
          paths: [
            { id: 'fr-st1', label: 'Old Foundry Row', d: 'M 20,115 L 580,115', kind: 'road' },
            { id: 'fr-st2', label: 'Tinplate Alley', d: 'M 20,235 L 580,235', kind: 'road' },
            { id: 'fr-st3', label: 'Brassfounders Cross', d: 'M 210,30 L 210,330', kind: 'road' },
            { id: 'fr-st4', label: 'Lock-Gate Lane', d: 'M 415,30 L 415,330', kind: 'road' },
          ],
          structures: [
            { id: 'fr-b1', label: 'Courts A–C (Tinplate Stampers)', x: 55, y: 132, width: 138, height: 86, kind: 'industrial', certainty: 'documented' },
            { id: 'fr-b2', label: 'Courts D–G (Mutual Printshop)', x: 228, y: 132, width: 170, height: 86, kind: 'residential', certainty: 'documented' },
            { id: 'fr-b3', label: 'Courts H–K (Brass Finishers)', x: 432, y: 132, width: 122, height: 86, kind: 'industrial', certainty: 'documented' },
            { id: 'fr-b4', label: 'North Tenement Row', x: 55, y: 54, width: 342, height: 46, kind: 'residential', certainty: 'documented' },
            { id: 'fr-b5', label: 'South Boarding Courts', x: 228, y: 252, width: 170, height: 52, kind: 'residential', certainty: 'documented' },
          ],
          annotations: [
            { id: 'fr-a1-27', x: 245, y: 125, label: 'Benali Printshop Courtyard', code: 'CRT-F' },
            { id: 'fr-a2-27', x: 64, y: 254, label: 'Tinplate Arms Corner', code: 'W4-01' },
          ],
          landUse: [
            { category: 'Tenement Housing & Ground Shops', percentage: 52, certainty: 'documented' },
            { category: 'Inner Courtyard Workshops', percentage: 30, certainty: 'documented' },
            { category: 'Granite-Paved Streets & Alleys', percentage: 18, certainty: 'documented' },
          ],
          reconstructionBasis:
            '1927/1954 Mercantile Fire Assurance Sheet 9 + Benali 1986 Annotated Overlay.',
        },
      },
      {
        id: 'fr-1965',
        eraId: 'municipal-modernism',
        yearLabel: '1965 · Clearance Severance Plain',
        yearStart: 1962,
        yearEnd: 1978,
        title: 'Erased Street Grid & Diagonal Arterial Excavation',
        summary:
          'All sixteen courtyard blocks felled and crushed into brick-dust fill; a diagonal six-lane trench slices across vanished Tinplate Alley while orphaned margin lots sit vacant.',
        settlementScale: '0 residents (entire population relocated or dispersed 1962)',
        builtFabric:
          'Retaining-wall highway trench, single surviving brick pub gable grafted onto transformer house.',
        infrastructureState:
          'Six-lane sunken arterial approach road (terminating abruptly south of St. Clement after 1974 freeze).',
        landscapeCondition:
          'Wide crushed-brick wasteland colonized by willowherb along fenced highway shoulders.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Clearance perimeter documented in 1963 Renewal Authority completion map.',
        keyChangesFromPrior: [
          'Total erasure of Tinplate Alley, Brassfounders Cross, and sixteen perimeter blocks',
          'Excavation of diagonal sunken arterial roadway ignoring all historic parcel boundaries',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: ['M 0,40 L 600,40', 'M 0,320 L 600,320'],
          paths: [
            { id: 'fr-hwy65', label: 'Sunken Six-Lane Arterial Cutting', d: 'M 0,295 L 600,72', kind: 'road' },
            { id: 'fr-ghost65', label: 'Erased Tinplate Alley Trace', d: 'M 20,235 L 580,235', kind: 'contour', dashed: true },
          ],
          structures: [
            { id: 'fr-sub65', label: 'Substation (Surviving 1884 Wall)', x: 55, y: 218, width: 32, height: 22, kind: 'ruin', certainty: 'documented' },
            { id: 'fr-vac1', label: 'Cleared Crushed-Brick Lot North', x: 85, y: 65, width: 220, height: 95, kind: 'ruin', certainty: 'documented' },
            { id: 'fr-vac2', label: 'Cleared Severance Triangle South', x: 320, y: 198, width: 220, height: 96, kind: 'ruin', certainty: 'documented' },
          ],
          annotations: [
            { id: 'fr-a1-65', x: 315, y: 152, label: 'Diagonal Arterial Cut', code: 'ART-62' },
            { id: 'fr-a2-65', x: 52, y: 256, label: 'Sole Surviving Brick Corner', code: 'REM-1' },
          ],
          landUse: [
            { category: 'Vacant Cleared Rubble Lots', percentage: 58, certainty: 'documented' },
            { category: 'Sunken Arterial Roadway & Slopes', percentage: 38, certainty: 'documented' },
            { category: 'Utility Compound', percentage: 4, certainty: 'documented' },
          ],
          reconstructionBasis:
            '1965 Metropolitan Renewal Authority Clearance Audit Sheet.',
        },
      },
      {
        id: 'fr-2024',
        eraId: 'contemporary-trace',
        yearLabel: '2024 · Bermed Logistics & Substation Ghost Wall',
        yearStart: 2000,
        yearEnd: 2026,
        title: 'Acoustic Earth Berms & Windowless Distribution Sheds',
        summary:
          'Corrugated logistics depots and planted noise berms occupy the twenty-year rubble triangles, completely disconnecting St. Clement from Civic Plaza save for one ghost-lettered brick corner.',
        settlementScale: '0 residents; ~180 daytime depot workers',
        builtFabric:
          'Two steel-clad distribution warehouses, planted acoustic earth berms, 1884 brick corner embedded in electrical substation.',
        infrastructureState:
          'High-volume arterial distributor road with pedestrian footbridge lacking wheelchair ramps.',
        landscapeCondition:
          'Engineered turf berms and security fencing obliterating any visual sense of the pre-1962 courtyard grain.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Contemporary footprint verified; depth of unexcavated tenement cellars beneath Warehouse B remains uncertain.',
        keyChangesFromPrior: [
          'Infill of vacant clearance triangles with single-story steel distribution sheds (1988–1996)',
          'Construction of 4m grassed earthwork acoustic berms along arterial cutting',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: [
            'M 15,265 L 560,62',
            'M 45,318 L 595,108',
          ],
          paths: [
            { id: 'fr-hwy24', label: 'Arterial Distributor Corridor', d: 'M 0,295 L 600,72', kind: 'road' },
          ],
          structures: [
            { id: 'fr-sub24', label: 'Substation & Ghost Sign Wall', x: 55, y: 218, width: 32, height: 22, kind: 'ruin', certainty: 'documented' },
            { id: 'fr-whA', label: 'Logistics Depot North', x: 92, y: 62, width: 195, height: 88, kind: 'industrial', certainty: 'documented' },
            { id: 'fr-whB', label: 'Distribution Shed South', x: 345, y: 204, width: 205, height: 92, kind: 'industrial', certainty: 'documented' },
          ],
          annotations: [
            { id: 'fr-a1-24', x: 52, y: 256, label: '"TINPLATE ALLEY" Ghost Sign', code: 'SGN-W4' },
            { id: 'fr-a2-24', x: 355, y: 192, label: 'Unprobed Cellar Fill Below', code: 'CEL-?' },
          ],
          landUse: [
            { category: 'Logistics Sheds & Loading Aprons', percentage: 52, certainty: 'documented' },
            { category: 'Arterial Roadway & Acoustic Berms', percentage: 44, certainty: 'documented' },
            { category: 'Substation Heritage Fragment', percentage: 4, certainty: 'documented' },
          ],
          reconstructionBasis:
            '2024 Ward 4 Field Walk & Substation Masonry Recording.',
        },
      },
    ],
    claims: [
      {
        id: 'cl-fr-1',
        status: 'verified',
        statement:
          'At least thirty-nine courtyard workshops classified as "derelict/vacant" in the 1961 clearance schedule were actively paying trade-guild or electricity tariffs through December 1961.',
        evidenceNote: 'Demonstrated by cross-checking Soraia Benali’s collected tariff receipts against Renewal Schedule IV.',
        sourceIds: ['src-08', 'src-09'],
      },
      {
        id: 'cl-fr-2',
        status: 'interpreted',
        statement:
          'Mercantile Fire Assurance clerks left 1904 paste-over layers unstripped on Sheet 9 because courtyard masonry walls remained unchanged even as internal trades shifted three times.',
        evidenceNote: 'Observed via raking-light inspection of Folio 9 thickness.',
        sourceIds: ['src-08'],
      },
      {
        id: 'cl-fr-3',
        status: 'unresolved',
        statement:
          'Whether the vaulted brick type-foundry cellars beneath Courts D–G were crushed prior to grading or sealed intact beneath Logistics Shed South.',
        evidenceNote: '1962 demolition voucher specifies "clearance to curb level only" on blocks east of Brassfounders Cross.',
        sourceIds: ['src-08', 'src-09'],
      },
    ],
    artifactIds: ['art-25', 'art-26', 'art-27', 'art-28'],
    eventIds: ['evt-03', 'evt-07', 'evt-08', 'evt-10', 'evt-12'],
    personIds: ['per-09', 'per-10'],
    relatedPlaceIds: ['pl-st-clement-concourse', 'pl-sunken-culvert-ward'],
    sourceIds: ['src-08', 'src-09', 'src-10'],
    subjects: ['slum clearance', 'counter-mapping', 'oral history', 'letterpress', 'urban severance'],
  },
];
