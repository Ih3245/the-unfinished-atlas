import type { Place } from '@/types/atlas';

export const PLACES_PART_1: Place[] = [
  {
    id: 'pl-vermillion-reach',
    slug: 'vermillion-reach-reservoir',
    catalogueRef: 'UA-PL-01',
    name: 'Valley of Vermillion Reach',
    formerName: 'Parish of Upper Vermillion & Slate Ford',
    subtitle:
      'A slate-quarrying valley parish of eighty-two stone structures submerged beneath twenty-eight meters of municipal reservoir water in November 1938.',
    layoutVariant: 'hydrographic-folio',
    category: 'submerged-landscape',
    region: 'Highland Reservoir Basin',
    atlasPosition: {
      x: 215,
      y: 162,
      elevationMeters: 318,
      gridSector: 'B-2 · Upland Basin',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector B-2); not tied to real-world WGS84 geodetic coordinates.',
    activeSpan: {
      startYear: 1784,
      turningPointYear: 1938,
      eraSummary: 'Settled c. 1784 · Impounded 1938 · Periodic drought emergence',
    },
    currentStatusLabel: 'Submerged · Intermittent low-water trace',
    excerpt:
      'For a century and a half, quarrymen hauled blue-veined roofing slate across the double-arched packhorse bridge at Vermillion Ford. Today the parish lies under forty-two million cubic meters of potable water—resurfacing only when late-summer droughts peel back the silt.',
    editorialIntro:
      'Few erased landscapes preserve their ground plan as crisply as a drowned valley stripped of roofs the week before the sluices closed. Because the Alderney Water Board felled timber rafters to prevent floating debris while leaving dry-stone walls standing to shoulder height, Vermillion Reach remains an intact masonry blueprint resting in cold, anaerobic dark.',
    narrativeSections: [
      {
        heading: 'Quarry Livelihoods & Compulsory Valuation',
        body: [
          'Between 1840 and 1925, the narrow floodplain of the River Vermillion sustained two inclined slate tramways, a cooperative wool-fulling mill, a stone chapel, and sixty-four terraced cottages. Unlike company-owned camps, nearly half the plots were held on multi-generational customary leases that proved difficult for metropolitan assessors to price.',
          'When Parliament ratified the Alderney Water Supply Act in 1934, engineers argued that upland gravity storage would eliminate cholera-prone river intakes downstream. Valuation clerks catalogued every Flagstone threshold and orchard tree, yet compensated leasehold quarry families at less than a third of freehold pasture rates.',
        ],
      },
      {
        heading: 'What the Drawdowns Contradict',
        body: [
          'Official engineering drawings filed in 1939 depict a cleanly cleared basin floor stripped of bridges and machinery. Yet when reservoir volume fell to twenty-one percent during the dry autumn of 2018, field surveyors photographed not only the intact 1812 packhorse bridge, but also a second, unrecorded eastern footbridge abutment.',
          'That emergence corroborated the 1986 cassette testimony of Maren Lindqvist, whose childhood map of parish footpaths had long been dismissed by archivists as nostalgic conflation.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        'Steep-sided glacial trough carrying a braided gravel river, terraced slate spoil heaps, dry-stone pasture enclosures, and a linear village clustering around two river crossings.',
      agentOfChange:
        'Construction of the 46-meter Alderney mass-concrete gravity dam (1935–1938), systematic roof-stripping of all masonry buildings, and permanent valley impoundment.',
      presentTrace:
        'Uniform silver-grey sheet of open water bordered by planted Sitka spruce screens; below the 298m contour line, silted house walls, tramway sleepers, and bridge piers survive intact.',
      survivingMarkers: [
        '1812 double-arch sandstone packhorse bridge (visible below 28% reservoir capacity)',
        'Inclined slate-tramway drum house foundations on the northern scree above high-water mark',
        'Relocated parish churchyard headstones re-erected in strict alphabetical rows at High Alderney',
      ],
    },
    periods: [
      {
        id: 'vr-1898',
        eraId: 'survey-expansion',
        yearLabel: '1898 · Quarry Parish Peak',
        yearStart: 1885,
        yearEnd: 1914,
        title: 'Active Slate Tramway & Braided River Parish',
        summary:
          'Sixty-four inhabited cottages line the river road; narrow-gauge incline wagons carry dressed slate to the valley mouth while orchards occupy the sheltered alluvial terrace.',
        settlementScale: '642 residents across 82 stone structures',
        builtFabric:
          'Coursed rubble-stone cottages, slate-roofed schoolhouse, Methodist chapel, and two water-powered sawing sheds.',
        infrastructureState:
          'Gravity-balanced slate tramway, two masonry bridges, parish cart road, and mill leat.',
        landscapeCondition:
          'Free-flowing River Vermillion with seasonal gravel shoals, pollarded alder banks, and upland sheep enclosures.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Footprints verified against 1898 Ordnance/Parish Cadastral Sheet; eastern orchard boundaries interpolated from tithe schedules.',
        keyChangesFromPrior: [
          'Extension of northern slate incline across upper scree slope',
          'Addition of iron footbridge serving the eastern quarry rows (absent from later condemnation copy)',
        ],
        scene: {
          waterLevelRatio: 0.14,
          waterPolygon: 'M 0,195 Q 160,180 310,205 T 600,190 L 600,218 Q 430,232 305,222 T 0,212 Z',
          terrainContours: [
            'M 0,70 Q 190,95 380,78 T 600,88',
            'M 0,125 Q 200,145 390,132 T 600,138',
            'M 0,285 Q 220,262 410,278 T 600,268',
            'M 0,330 Q 230,310 420,322 T 600,315',
          ],
          paths: [
            {
              id: 'vr-road-1898',
              label: 'Valley Cart Road',
              d: 'M 15,172 Q 185,162 310,184 T 585,170',
              kind: 'road',
            },
            {
              id: 'vr-tram-1898',
              label: 'Slate Incline Tramway',
              d: 'M 120,42 L 245,174 L 560,162',
              kind: 'rail',
              dashed: true,
            },
          ],
          structures: [
            { id: 'vr-s1', label: 'Parish School', x: 248, y: 152, width: 34, height: 18, kind: 'civic', certainty: 'documented' },
            { id: 'vr-s2', label: 'Packhorse Bridge', x: 298, y: 192, width: 18, height: 34, kind: 'infrastructure', certainty: 'documented' },
            { id: 'vr-s3', label: 'Quarry Cottages West', x: 165, y: 154, width: 52, height: 15, kind: 'residential', certainty: 'documented' },
            { id: 'vr-s4', label: 'Fulling Mill', x: 352, y: 182, width: 28, height: 18, kind: 'industrial', certainty: 'documented' },
            { id: 'vr-s5', label: 'East Footbridge', x: 438, y: 188, width: 12, height: 30, kind: 'infrastructure', certainty: 'contested' },
            { id: 'vr-s6', label: 'Chapel & Yard', x: 286, y: 146, width: 26, height: 20, kind: 'civic', certainty: 'documented' },
          ],
          annotations: [
            { id: 'vr-a1', x: 132, y: 60, label: 'Upper Slate Drum', code: 'Q-01' },
            { id: 'vr-a2', x: 304, y: 244, label: '1812 Ford Bridge', code: 'BR-12' },
            { id: 'vr-a3', x: 444, y: 235, label: 'Unmapped Footbridge', code: 'UNR-4' },
          ],
          landUse: [
            { category: 'Pasture & Orchard Terrace', percentage: 58, certainty: 'documented' },
            { category: 'Slate Quarries & Spoil', percentage: 22, certainty: 'documented' },
            { category: 'Village Masonry & Roads', percentage: 12, certainty: 'documented' },
            { category: 'River Channel', percentage: 8, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Synthesized from 1898 Parish Cadastral Sheet and Maren Lindqvist oral parcel overlay.',
        },
      },
      {
        id: 'vr-1938',
        eraId: 'municipal-modernism',
        yearLabel: '1938 · Condemnation & Impoundment',
        yearStart: 1935,
        yearEnd: 1940,
        title: 'Roof-Stripped Ruins Behind the Rising Spillway',
        summary:
          'All residents evacuated by October 1938; timber roofs and church bells removed while rising brown impoundment water submerges the lower meadows behind the new concrete dam.',
        settlementScale: '0 permanent residents (temporary dam workforce camp of 190 on ridge)',
        builtFabric:
          'Unroofed stone shells cut down to lintel height; newly poured 46m mass-concrete gravity dam sealing the eastern gorge.',
        infrastructureState:
          'Twin cast-iron intake tower, submerged cart road, rerouted high-contour forestry perimeter road.',
        landscapeCondition:
          'Expanding slackwater pool drowning alder banks and lifting peat turves.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Documented through Alderney Water Board condemnation ledger and Helena Vance’s October 1938 glass-plate sequence.',
        keyChangesFromPrior: [
          'Erection of Alderney Gravity Dam across eastern narrows',
          'Systematic unroofing of all 82 parish buildings prior to sluice closure',
          'Submergence of valley floor up to the 308m contour',
        ],
        scene: {
          waterLevelRatio: 0.68,
          waterPolygon: 'M 0,118 Q 200,126 390,114 L 538,108 L 538,292 L 0,282 Z',
          terrainContours: [
            'M 0,70 Q 190,95 380,78 T 600,88',
            'M 0,330 Q 230,310 420,322 T 600,315',
          ],
          paths: [
            {
              id: 'vr-perim-1938',
              label: 'High-Contour Service Road',
              d: 'M 10,88 Q 220,104 420,90 L 555,96',
              kind: 'road',
            },
            {
              id: 'vr-dam-1938',
              label: 'Alderney Gravity Dam',
              d: 'M 538,94 L 538,304',
              kind: 'dam',
            },
          ],
          structures: [
            { id: 'vr-s1-38', label: 'Unroofed School Shell', x: 248, y: 152, width: 34, height: 18, kind: 'submerged', certainty: 'documented' },
            { id: 'vr-s2-38', label: 'Drowned Bridge', x: 298, y: 192, width: 18, height: 34, kind: 'submerged', certainty: 'documented' },
            { id: 'vr-s3-38', label: 'Submerged Cottages', x: 165, y: 154, width: 52, height: 15, kind: 'submerged', certainty: 'documented' },
            { id: 'vr-dam-twr', label: 'Valve Intake Tower', x: 512, y: 175, width: 22, height: 22, kind: 'infrastructure', certainty: 'documented' },
          ],
          annotations: [
            { id: 'vr-a1-38', x: 546, y: 145, label: 'Alderney Dam Crest', code: 'DAM-38' },
            { id: 'vr-a2-38', x: 245, y: 140, label: 'Inundated Village Core', code: 'SUB-28M' },
          ],
          landUse: [
            { category: 'Impounded Reservoir Surface', percentage: 69, certainty: 'documented' },
            { category: 'Cleared Buffer Slope', percentage: 21, certainty: 'documented' },
            { category: 'Concrete Dam & Spillway Works', percentage: 10, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Based on November 1938 Water Board fill-stage chart and Vance Plate #44.',
        },
      },
      {
        id: 'vr-2018',
        eraId: 'contemporary-trace',
        yearLabel: '2018 · Autumn Drought Emergence',
        yearStart: 2018,
        yearEnd: 2025,
        title: 'Silt-Draped Foundations at 21% Reservoir Capacity',
        summary:
          'Prolonged late-summer rainfall deficit drops water level nineteen meters below spillway, exposing cracked silt flats, dry-stone gables, and both river bridge crossings.',
        settlementScale: 'Uninhabited protected watershed reserve',
        builtFabric:
          'Silt-encrusted wall footings standing 0.8–1.9m tall; intact sandstone bridge arches; aging concrete spillway exhibiting frost spalling.',
        infrastructureState:
          'Active municipal water intake (operating on lower draw valve), conifer plantation tracks, seasonal drawdown monitoring markers.',
        landscapeCondition:
          'Conifer-ringed reservoir rim framing wide, sun-baked grey sediment benches colonized temporarily by knotweed.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Surveyed during September 2018 reconnaissance; eastern footbridge pier verified in situ, though quarry shaft depth remains unprobed.',
        keyChangesFromPrior: [
          'Accumulation of 0.6m fine silt blanket across lower cottage floors',
          'Re-exposure of unmapped eastern footbridge stone pier',
          'Dense Sitka spruce plantation enclosing upper watershed slopes',
        ],
        scene: {
          waterLevelRatio: 0.28,
          waterPolygon: 'M 335,158 Q 430,152 538,148 L 538,248 Q 425,244 335,232 Z',
          terrainContours: [
            'M 0,70 Q 190,95 380,78 T 600,88',
            'M 0,118 Q 200,126 390,114 L 538,108',
            'M 0,285 Q 220,262 410,278 T 600,268',
          ],
          paths: [
            {
              id: 'vr-perim-2018',
              label: 'Forestry Commission Track',
              d: 'M 10,88 Q 220,104 420,90 L 555,96',
              kind: 'road',
            },
            {
              id: 'vr-silt-road-2018',
              label: 'Re-emerged Silt Cart Trace',
              d: 'M 25,172 Q 185,162 325,184',
              kind: 'contour',
              dashed: true,
            },
            {
              id: 'vr-dam-2018',
              label: 'Alderney Gravity Dam',
              d: 'M 538,94 L 538,304',
              kind: 'dam',
            },
          ],
          structures: [
            { id: 'vr-s1-18', label: 'Exposed School Footings', x: 248, y: 152, width: 34, height: 18, kind: 'ruin', certainty: 'documented' },
            { id: 'vr-s2-18', label: 'Exposed 1812 Bridge', x: 298, y: 192, width: 18, height: 34, kind: 'ruin', certainty: 'documented' },
            { id: 'vr-s3-18', label: 'Cottage Ruins in Silt', x: 165, y: 154, width: 52, height: 15, kind: 'ruin', certainty: 'documented' },
            { id: 'vr-s5-18', label: 'Verified East Pier', x: 438, y: 188, width: 12, height: 30, kind: 'submerged', certainty: 'documented' },
            { id: 'vr-dam-twr-18', label: 'Intake Tower', x: 512, y: 175, width: 22, height: 22, kind: 'infrastructure', certainty: 'documented' },
          ],
          annotations: [
            { id: 'vr-a1-18', x: 155, y: 138, label: 'Exposed Silt Bench', code: 'DRW-21%' },
            { id: 'vr-a2-18', x: 290, y: 242, label: 'Intact Arch Masonry', code: 'VER-18' },
            { id: 'vr-a3-18', x: 390, y: 172, label: 'Residual Pool', code: 'POOL-E' },
          ],
          landUse: [
            { category: 'Exposed Reservoir Silt Flats', percentage: 44, certainty: 'documented' },
            { category: 'Residual Impoundment Pool', percentage: 25, certainty: 'documented' },
            { category: 'Conifer Watershed Plantation', percentage: 23, certainty: 'documented' },
            { category: 'Dam & Spillway Apron', percentage: 8, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Mapped from October 2018 low-water field traverse (Fonds RSF-2025).',
        },
      },
    ],
    claims: [
      {
        id: 'cl-vr-1',
        status: 'verified',
        statement:
          'Eighty-two masonry buildings were unroofed prior to sluice closure on 19 November 1938, leaving lower wall courses standing beneath the waterline.',
        evidenceNote: 'Cross-confirmed by Water Board Contractor Ledger and 2018 drawdown photography.',
        sourceIds: ['src-01', 'src-11', 'src-12'],
      },
      {
        id: 'cl-vr-2',
        status: 'verified',
        statement:
          'An unmapped eastern footbridge pier exists 140 meters downstream of the fulling mill, confirming Maren Lindqvist’s 1986 oral account.',
        evidenceNote: 'Photographed and measured during the September 2018 drawdown.',
        sourceIds: ['src-09', 'src-12'],
      },
      {
        id: 'cl-vr-3',
        status: 'interpreted',
        statement:
          'Leasehold valuation formulas deliberately undercounted garden and quarry-share income to accelerate compulsory purchase before the 1935 municipal budget vote.',
        evidenceNote: 'Inferred from disparities between Annex B tax rolls and surviving private letters.',
        sourceIds: ['src-01'],
      },
      {
        id: 'cl-vr-4',
        status: 'unresolved',
        statement:
          'Whether the parish bell and baptismal font removed in October 1938 were melted for scrap or transferred to an unrecorded diocesan storehouse.',
        evidenceNote: 'Transport receipt signed by contractor carrier lacks a destination parish stamp.',
        sourceIds: ['src-01', 'src-09'],
      },
    ],
    artifactIds: ['art-01', 'art-02', 'art-03', 'art-04', 'art-24'],
    eventIds: ['evt-04', 'evt-12', 'evt-13'],
    personIds: ['per-01', 'per-02', 'per-03'],
    relatedPlaceIds: ['pl-sunken-culvert-ward', 'pl-reedmere-commons'],
    sourceIds: ['src-01', 'src-09', 'src-11', 'src-12'],
    subjects: ['hydraulics', 'inundation', 'quarrying', 'compulsory purchase', 'drought trace'],
    isFeaturedOnHome: true,
  },
  {
    id: 'pl-st-clement-concourse',
    slug: 'st-clement-glass-concourse',
    catalogueRef: 'UA-PL-02',
    name: 'St. Clement Terminus & Glass Concourse',
    formerName: 'Metropolitan Central Passenger Shed',
    subtitle:
      'An 1894 wrought-iron and prismatic-glass railway vault felled over eleven nights in 1973 for an elevated ring highway that stalled four months later.',
    layoutVariant: 'architectural-inquest',
    category: 'demolished-civic',
    region: 'Metropolitan Transit Core',
    atlasPosition: {
      x: 512,
      y: 344,
      elevationMeters: 42,
      gridSector: 'D-4 · Inner Rail Core',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector D-4); composite architectural site not representing a single real-world terminal.',
    activeSpan: {
      startYear: 1894,
      turningPointYear: 1973,
      eraSummary: 'Opened 1894 · Felled November 1973 · Unfinished viaduct stub',
    },
    currentStatusLabel: 'Demolished · Subterranean brick vaults & stalled piers',
    excerpt:
      'Designed by Octavio Solís to flood twelve smoky steam platforms with refracted northern daylight, St. Clement Terminus lasted seventy-nine years before nocturnal wrecking cranes brought down its 48-meter arch—leaving behind a highway ramp that ends in mid-air.',
    editorialIntro:
      'Architectural erasure is sharpest when the replacement project fails to arrive. St. Clement Terminus was not displaced by a functioning boulevard, but by an aborted fiscal forecast: eleven nights of urgent wrecking-ball work in November 1973 followed by half a century of truncated concrete pier stubs, gravel parking, and sealed subterranean parcel vaults.',
    narrativeSections: [
      {
        heading: 'Prismatic Daylight & Iron Cantilevers',
        body: [
          'When St. Clement opened in May 1894, its engineering marvel lay as much below the platforms as above them. Above stood Solís’s pin-jointed wrought-iron arch ribs glazed with ribbed prismatic tiles that scattered glare without trapping locomotive soot. Below lay a two-level vaulted brick undercroft connected by hydraulic parcel lifts directly to the Nine-Locks canal spur.',
          'For seven decades the concourse functioned as the metropolitan threshold for coastal fish trains, quarry migrants, and evening newspaper dispatches, anchoring hundreds of workshops in neighboring Foundry Row.',
        ],
      },
      {
        heading: 'Eleven Nights in November 1973',
        body: [
          'By 1968, declining branch-line receipts and Julian Vestergaard’s Inner Arterial Master Plan cast the iron shed as an obstacle to high-speed elevated traffic. Aware that an emergency heritage preservation petition was scheduled for court review on 20 November 1973, contractors worked under floodlights from 8 to 19 November to sever the main tie-rods.',
          'In March 1974, municipal bond suspension froze the highway contract after only six concrete ramp piers had been cast. The upper concourse became a surface commuter car park; the brick parcel undercroft remained intact beneath asphalt, sealed behind welded steel grates.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        '48-meter-span hinged wrought-iron train shed covering twelve terminal tracks, limestone clock headhouse, and vaulted brick subterranean freight concourse.',
      agentOfChange:
        'Accelerated nocturnal demolition in November 1973 under the Inner Arterial Master Plan, followed by the 1974 municipal highway funding freeze.',
      presentTrace:
        'Surface asphalt commuter lot bisected by six unlinked reinforced-concrete viaduct columns; intact 1894 brick vaulting and hydraulic lift shafts surviving beneath pavement level.',
      survivingMarkers: [
        'Six freestanding 1974 bush-hammered concrete viaduct piers terminating without deck girders',
        'Limestone west boundary wall retaining cast-iron truss bearing sockets at 6.5m intervals',
        'Subterranean brick parcel vaults and glazed tile wayfinding frieze (inaccessible to public)',
      ],
    },
    periods: [
      {
        id: 'sc-1908',
        eraId: 'survey-expansion',
        yearLabel: '1908 · High Steam Concourse',
        yearStart: 1894,
        yearEnd: 1939,
        title: 'Twelve-Track Prismatic Iron Train Shed',
        summary:
          'Full passenger and mail operation across twelve platforms beneath the single-span glass arch, linked via subterranean hydraulic lifts to canal freight.',
        settlementScale: '38,000 daily rail passengers; 420 station & freight staff',
        builtFabric:
          'Ashlar limestone headhouse, 190m wrought-iron lattice arch roof, glazed ticket rotunda, brick freight undercroft.',
        infrastructureState:
          'Twelve ballasted terminal tracks, telegraph signal gantry synchronized to Mount Corvus, underground parcel tramway.',
        landscapeCondition:
          'Dense urban rail throat framed by brick tenements and coal-yard retaining walls.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Exact structural bays documented in Octavio Solís’s 1893 linen contract elevations.',
        keyChangesFromPrior: [
          'Erection of 48m clear-span wrought-iron roof over former timber goods depot',
          'Excavation of vaulted brick parcel undercroft tied to canal basin level',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: ['M 0,48 L 600,48', 'M 0,315 L 600,315'],
          paths: [
            { id: 'sc-tr1', label: 'Terminal Track Fan North', d: 'M 140,125 L 590,125', kind: 'rail' },
            { id: 'sc-tr2', label: 'Terminal Track Fan Mid', d: 'M 140,175 L 590,175', kind: 'rail' },
            { id: 'sc-tr3', label: 'Terminal Track Fan South', d: 'M 140,225 L 590,225', kind: 'rail' },
            { id: 'sc-street', label: 'Terminus Forecourt Plaza', d: 'M 55,30 L 55,330', kind: 'road' },
          ],
          structures: [
            { id: 'sc-head', label: 'Limestone Headhouse', x: 78, y: 88, width: 62, height: 184, kind: 'civic', certainty: 'documented' },
            { id: 'sc-shed', label: '48m Glass Arch Train Shed', x: 142, y: 96, width: 310, height: 168, kind: 'civic', certainty: 'documented' },
            { id: 'sc-sig', label: 'Telegraph Signal Box', x: 486, y: 102, width: 38, height: 24, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sc-lifts', label: 'Parcel Lift Pavilion', x: 190, y: 272, width: 70, height: 28, kind: 'industrial', certainty: 'documented' },
          ],
          annotations: [
            { id: 'sc-a1', x: 245, y: 82, label: 'Solís Iron Arch Span (48m)', code: 'ARC-94' },
            { id: 'sc-a2', x: 84, y: 74, label: 'Clock & Rotunda', code: 'HD-01' },
            { id: 'sc-a3', x: 205, y: 314, label: 'Undercroft Freight Lifts', code: 'SUB-V' },
          ],
          landUse: [
            { category: 'Covered Train Shed & Headhouse', percentage: 56, certainty: 'documented' },
            { category: 'Approach Throat & Sidings', percentage: 28, certainty: 'documented' },
            { category: 'Forecourt & Tramway Loop', percentage: 16, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Derived from 1894 Metropolitan Railway Architect’s Elevation & Plan Folio (Fonds MRA-1894).',
        },
      },
      {
        id: 'sc-1974',
        eraId: 'decommissioning',
        yearLabel: '1974 · Demolition & Viaduct Freeze',
        yearStart: 1973,
        yearEnd: 1976,
        title: 'Rubble Apron & Six Orphaned Viaduct Piers',
        summary:
          'Iron arch trusses torch-cut and cleared; tracks cut back to a temporary two-platform timber halt while six freshly cast highway piers stand stranded across the former concourse.',
        settlementScale: '2,100 daily commuters at truncated outer halt',
        builtFabric:
          'Crushed limestone fill over capped undercroft; six raw reinforced-concrete T-piers; surviving west boundary wall.',
        infrastructureState:
          'Ten of twelve tracks lifted; temporary cinder-block ticket booth; fenced construction trench.',
        landscapeCondition:
          'Windblown rubble plain exposing scarred party walls of adjacent cleared blocks.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Confirmed by Northern Gazette press photographs and Vestergaard’s halted contract progress chart.',
        keyChangesFromPrior: [
          'Complete removal of 1894 headhouse and 48m iron-and-glass arch',
          'Casting of six unspanned concrete highway piers diagonally across former platforms 3–9',
          'Sealing of subterranean brick parcel vaults under rubble overburden',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: ['M 0,48 L 600,48', 'M 0,315 L 600,315'],
          paths: [
            { id: 'sc-tr-trunc', label: 'Truncated Commuter Spur', d: 'M 420,225 L 590,225', kind: 'rail' },
            { id: 'sc-art-align', label: 'Unbuilt Viaduct Alignment', d: 'M 40,295 L 540,75', kind: 'road', dashed: true },
          ],
          structures: [
            { id: 'sc-wall74', label: 'Scarred West Retaining Wall', x: 142, y: 258, width: 310, height: 8, kind: 'ruin', certainty: 'documented' },
            { id: 'sc-vault74', label: 'Sealed Subterranean Undercroft', x: 160, y: 120, width: 220, height: 110, kind: 'submerged', certainty: 'documented' },
            { id: 'sc-p1', label: 'Viaduct Pier 1', x: 115, y: 245, width: 20, height: 20, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sc-p2', label: 'Viaduct Pier 2', x: 195, y: 210, width: 20, height: 20, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sc-p3', label: 'Viaduct Pier 3', x: 275, y: 175, width: 20, height: 20, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sc-p4', label: 'Viaduct Pier 4', x: 355, y: 140, width: 20, height: 20, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sc-halt', label: 'Temporary Cinder-Block Halt', x: 430, y: 204, width: 58, height: 18, kind: 'industrial', certainty: 'documented' },
          ],
          annotations: [
            { id: 'sc-a1-74', x: 245, y: 158, label: 'Orphaned Concrete T-Piers', code: 'PIER-74' },
            { id: 'sc-a2-74', x: 175, y: 110, label: 'Capped Brick Vaults Below', code: 'CAP-1894' },
          ],
          landUse: [
            { category: 'Demolition Gravel & Fenced Apron', percentage: 64, certainty: 'documented' },
            { category: 'Stalled Viaduct Pier Corridor', percentage: 22, certainty: 'documented' },
            { category: 'Truncated Rail Spur', percentage: 14, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Reconstructed from March 1974 Ring-Road Suspension Audit & Gazette microfilm.',
        },
      },
      {
        id: 'sc-2024',
        eraId: 'contemporary-trace',
        yearLabel: '2024 · Asphalt Lot & Undercroft Cavity',
        yearStart: 2005,
        yearEnd: 2026,
        title: 'Surface Parking Around Moss-Stained Viaduct Columns',
        summary:
          'Striped commuter parking occupies the vanished concourse floor; four remaining concrete highway columns rise like modernist monoliths above intact nineteenth-century subterranean vaults.',
        settlementScale: '410 surface parking stalls; transient light-rail stop at eastern edge',
        builtFabric:
          'Asphalt paving, four weathered concrete piers (two demolished in 1998), surviving 1894 west bearing wall, intact underground brick vaults.',
        infrastructureState:
          'Single electrified light-rail platform on eastern margin; storm-water sump pumps draining the sealed undercroft.',
        landscapeCondition:
          'Heat-island tarmac punctuated by volunteer buddleia sprouting from iron truss sockets in the limestone wall.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Surface layout verified; condition of easternmost subterranean lift chambers remains uncertain due to standing water.',
        keyChangesFromPrior: [
          'Paving of demolition apron into metered surface parking (1985)',
          'Conversion of truncated rail spur into single light-rail stop (2006)',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: ['M 0,48 L 600,48', 'M 0,315 L 600,315'],
          paths: [
            { id: 'sc-lrt', label: 'Eastern Light-Rail Line', d: 'M 445,225 L 595,225', kind: 'rail' },
            { id: 'sc-lot-lanes', label: 'Parking Circulation Loop', d: 'M 90,105 L 395,105 L 395,245 L 90,245 Z', kind: 'road' },
          ],
          structures: [
            { id: 'sc-wall24', label: '1894 Socketed Limestone Wall', x: 142, y: 258, width: 310, height: 8, kind: 'ruin', certainty: 'documented' },
            { id: 'sc-vault24', label: 'Hidden Brick Undercroft (Below Grade)', x: 160, y: 120, width: 220, height: 110, kind: 'submerged', certainty: 'approximate' },
            { id: 'sc-p2-24', label: 'Surviving Pier B', x: 195, y: 210, width: 20, height: 20, kind: 'ruin', certainty: 'documented' },
            { id: 'sc-p3-24', label: 'Surviving Pier C', x: 275, y: 175, width: 20, height: 20, kind: 'ruin', certainty: 'documented' },
            { id: 'sc-p4-24', label: 'Surviving Pier D', x: 355, y: 140, width: 20, height: 20, kind: 'ruin', certainty: 'documented' },
            { id: 'sc-lrt-plat', label: 'Light-Rail Canopy', x: 452, y: 206, width: 88, height: 14, kind: 'infrastructure', certainty: 'documented' },
          ],
          annotations: [
            { id: 'sc-a1-24', x: 210, y: 282, label: 'Truss Bearing Sockets in Wall', code: 'TR-1894' },
            { id: 'sc-a2-24', x: 280, y: 160, label: 'Unspanned 1974 Pillars', code: 'STUB-3' },
          ],
          landUse: [
            { category: 'Metered Surface Asphalt Parking', percentage: 71, certainty: 'documented' },
            { category: 'Residual Pier Islands & Scrub', percentage: 15, certainty: 'documented' },
            { category: 'Eastern Light-Rail Stop', percentage: 14, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Field survey 2024 combined with municipal drainage inspection notes.',
        },
      },
    ],
    claims: [
      {
        id: 'cl-sc-1',
        status: 'verified',
        statement:
          'Demolition of the 48-meter wrought-iron arch commenced at 22:00 on 8 November 1973, twelve days prior to a scheduled High Court preservation hearing.',
        evidenceNote: 'Documented in contractor shift dockets and Northern Gazette night dispatches.',
        sourceIds: ['src-02', 'src-10'],
      },
      {
        id: 'cl-sc-2',
        status: 'verified',
        statement:
          'The 1894 brick-vaulted parcel undercroft was never excavated out during demolition; its arches survive beneath 1.4 meters of compacted fill and asphalt.',
        evidenceNote: 'Confirmed by 2011 utility borehole logs and storm-sump maintenance entries.',
        sourceIds: ['src-02', 'src-05'],
      },
      {
        id: 'cl-sc-3',
        status: 'interpreted',
        statement:
          'Traffic demand projections justifying the Inner Arterial demolition relied on industrial freight growth figures that had already turned negative by 1969.',
        evidenceNote: 'Supported by comparing Vestergaard’s 1961 appendix against rail tonnage declines.',
        sourceIds: ['src-02', 'src-08'],
      },
      {
        id: 'cl-sc-4',
        status: 'unresolved',
        statement:
          'Location of the twenty-four foliate cast-iron column capitals and station synchronization clock salvaged under private receipt during demolition week.',
        evidenceNote: 'Salvage manifest #19 lists "ornamental ironwork, 14 tons" sold to an unnamed foundry broker.',
        sourceIds: ['src-02'],
      },
    ],
    artifactIds: ['art-05', 'art-06', 'art-07', 'art-19'],
    eventIds: ['evt-02', 'evt-03', 'evt-10'],
    personIds: ['per-01', 'per-04', 'per-10'],
    relatedPlaceIds: ['pl-foundry-row', 'pl-sunken-culvert-ward', 'pl-corvus-observatory'],
    sourceIds: ['src-02', 'src-05', 'src-10'],
    subjects: ['railway architecture', 'ironwork', 'demolition', 'unbuilt highway', 'subterranean vaults'],
    isEditorialEssaySubject: true,
  },
  {
    id: 'pl-port-meridian-spit',
    slug: 'port-meridian-spit',
    catalogueRef: 'UA-PL-03',
    name: 'Port Meridian & The Shifting Spit',
    formerName: 'Meridian Deep-Water Customs Haven',
    subtitle:
      'A nineteenth-century customs harbor stranded three kilometers inland after an 1879 gale breach and upstream river canalization migrated the coastline.',
    layoutVariant: 'hydrographic-folio',
    category: 'altered-coastline',
    region: 'Northern Silted Estuary',
    atlasPosition: {
      x: 785,
      y: 128,
      elevationMeters: 4,
      gridSector: 'F-1 · Outer Estuary Bar',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector F-1); synthesized littoral morphology for archival demonstration.',
    activeSpan: {
      startYear: 1790,
      turningPointYear: 1879,
      eraSummary: 'Customs port 1790–1879 · Bar silted 1905 · Stranded inland dune plain',
    },
    currentStatusLabel: 'Stranded inland · Masonry beacons amid marram dunes',
    excerpt:
      'Ships drawing five fathoms once moored directly beneath the granite bollards of Port Meridian’s Bonded Quay. Today, anyone standing on that same quay looks across three kilometers of accreted salt marsh and wind-rippled sand ridges before catching sight of open surf.',
    editorialIntro:
      'Coastlines erase settlements without tearing down a single stone. At Port Meridian, granite quays, customs steps, and twin leading-light towers remain structurally sound—yet the sea they were built to govern departed eastward over forty years of relentless sediment accretion.',
    narrativeSections: [
      {
        heading: 'Lead-Line Warnings Ignored',
        body: [
          'Between 1820 and 1875, Port Meridian cleared timber, salted herring, and refined slate for coastal export, sheltered behind a curved four-kilometer shingle spit. When upstream engineers straightened the estuary’s upper meanders and later pumped silt-laden fen water from Reedmere, suspended sediment loads doubled.',
          'Harbor pilot Jonas Halvorsen recorded the shoaling in his private sounding notebooks as early as 1874. Harbor commissioners, anxious to float municipal pier bonds, published selectively deeper high-tide soundings until the three-day equinoctial storm of November 1879 tore a new channel two miles north.',
        ],
      },
      {
        heading: 'Architecture Outliving Its Horizon',
        body: [
          'Deprived of tidal scour, the old harbor basin filled rapidly with fine estuarine warp. By 1908 only flat-bottomed lighters could reach the Bonded Warehouse; by 1934 marram grass had colonized the harbor mouth.',
          'Because no developer ever needed the isolated marshland, Port Meridian escaped demolition. Its octagonal masonry range-lights now align accurately toward a shipping channel that vanished in 1896.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        'Sheltered tidal roadstead behind a narrow shingle barrier spit, edged by granite customs quays, timber slipways, and twin masonry leading lights.',
      agentOfChange:
        'November 1879 storm breach of the outer spit compounded by altered sediment transport from upstream river straightening and fen drainage outfalls.',
      presentTrace:
        'Three kilometers of prograded dune ridges and samphire flats separating the dry granite quay walls and stranded lighthouses from the active surf line.',
      survivingMarkers: [
        'Granite Bonded Quay wall with forged iron mooring rings buried to half-height in dune sand',
        '1848 Inner & Outer Octagonal Range Lighthouses standing 2.9km inland of high water',
        'Timber hull ribs of two abandoned 1890s dredging barges protruding from salt-pan mud',
      ],
    },
    periods: [
      {
        id: 'pm-1868',
        eraId: 'survey-expansion',
        yearLabel: '1868 · Deep-Water Anchorage',
        yearStart: 1850,
        yearEnd: 1878,
        title: 'Active Customs Roadstead Behind Intact Shingle Spit',
        summary:
          'Deep tidal channel scours directly past the granite Bonded Quay; protective outer spit deflects northeast swell while twin range lights guide vessels over the bar.',
        settlementScale: '1,280 residents; 340 annual foreign & coastal vessel clearances',
        builtFabric:
          'Granite ashlar quay, three-story Bonded Customs House, cooperage sheds, twin octagonal masonry lighthouses.',
        infrastructureState:
          'Five-fathom dredged anchorage, semaphore mast, buoyed bar channel, horse-drawn tramway to inland road.',
        landscapeCondition:
          'Open marine lagoon flanked by mobile shingle hook and tidal mudflats.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Bathymetry verified from Capt. Halvorsen’s 1868 lead-line survey (Series IV).',
        keyChangesFromPrior: [
          'Completion of granite Bonded Quay replacing eighteenth-century timber staithes',
          'Alignment of Inner and Outer masonry range lights on 064° bearing',
        ],
        scene: {
          waterLevelRatio: 0.72,
          waterPolygon: 'M 155,0 L 600,0 L 600,360 L 185,360 Q 145,235 162,135 Z',
          terrainContours: [
            'M 45,0 Q 75,180 65,360',
            'M 115,0 Q 132,180 124,360',
          ],
          paths: [
            { id: 'pm-spit-68', label: 'Outer Shingle Barrier Spit', d: 'M 380,0 Q 410,145 365,245', kind: 'coastline' },
            { id: 'pm-chan-68', label: '064° Leading-Light Channel', d: 'M 165,182 L 580,122', kind: 'canal', dashed: true },
          ],
          structures: [
            { id: 'pm-quay68', label: 'Granite Bonded Quay', x: 138, y: 128, width: 22, height: 115, kind: 'infrastructure', certainty: 'documented' },
            { id: 'pm-cust68', label: 'Customs House', x: 96, y: 146, width: 34, height: 42, kind: 'civic', certainty: 'documented' },
            { id: 'pm-lt-in', label: 'Inner Range Light', x: 108, y: 204, width: 16, height: 16, kind: 'infrastructure', certainty: 'documented' },
            { id: 'pm-lt-out', label: 'Outer Spit Light', x: 358, y: 218, width: 16, height: 16, kind: 'infrastructure', certainty: 'documented' },
          ],
          annotations: [
            { id: 'pm-a1-68', x: 245, y: 152, label: '5-Fathom Scour Basin', code: 'SND-5.2F' },
            { id: 'pm-a2-68', x: 392, y: 118, label: 'Protective Shingle Spit', code: 'BAR-1868' },
          ],
          landUse: [
            { category: 'Open Tidal Harbor & Marine Channel', percentage: 68, certainty: 'documented' },
            { category: 'Quayside Town & Customs Yards', percentage: 19, certainty: 'documented' },
            { category: 'Shingle Spit & Foreshore', percentage: 13, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Plotted from Northern Estuary Hydrographic Sounding Book Series IV (1868).',
        },
      },
      {
        id: 'pm-1906',
        eraId: 'survey-expansion',
        yearLabel: '1906 · Breached Spit & Shoaling Basin',
        yearStart: 1880,
        yearEnd: 1918,
        title: 'Severed Barrier & Rapid Inner Mudflat Accretion',
        summary:
          'The 1879 storm gap diverts main river discharge northward; stranded spit welds ashore as silt banks choke the Bonded Quay to less than three feet at high water.',
        settlementScale: '410 residents; customs port status revoked 1904',
        builtFabric:
          'Shuttered Bonded Customs House, decaying timber fish stages, abandoned steam-dredger hulls grounded in mud.',
        infrastructureState:
          'Range lights extinguished (1902); wooden plank causeways laid over soft mud for cockle gatherers.',
        landscapeCondition:
          ' braided intertidal mudbanks rapidly trapping estuarine silt.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Harbor basin mud contours documented; exact month of northern breach stabilization approximated between 1883 and 1886.',
        keyChangesFromPrior: [
          'Breach of outer spit and northward migration of primary tidal outlet',
          'Loss of 4.1 fathoms of water depth along the Bonded Quay',
          'Decommissioning of both 1848 leading lights',
        ],
        scene: {
          waterLevelRatio: 0.42,
          waterPolygon: 'M 365,0 L 600,0 L 600,360 L 420,360 Q 355,220 385,95 Z',
          terrainContours: [
            'M 115,0 Q 132,180 124,360',
            'M 255,40 Q 280,190 270,340',
          ],
          paths: [
            { id: 'pm-oldshore-06', label: '1868 Shoreline Trace', d: 'M 155,0 Q 145,235 185,360', kind: 'contour', dashed: true },
            { id: 'pm-creek-06', label: 'Residual Tidal Gut', d: 'M 162,180 Q 275,195 390,155', kind: 'river' },
          ],
          structures: [
            { id: 'pm-quay06', label: 'Silted Granite Quay', x: 138, y: 128, width: 22, height: 115, kind: 'ruin', certainty: 'documented' },
            { id: 'pm-cust06', label: 'Vacant Customs House', x: 96, y: 146, width: 34, height: 42, kind: 'civic', certainty: 'documented' },
            { id: 'pm-lt-in06', label: 'Extinguished Inner Light', x: 108, y: 204, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
            { id: 'pm-lt-out06', label: 'Stranded Spit Light', x: 358, y: 218, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
            { id: 'pm-dredge', label: 'Grounded Dredger Hulls', x: 230, y: 175, width: 28, height: 12, kind: 'ruin', certainty: 'approximate' },
          ],
          annotations: [
            { id: 'pm-a1-06', x: 220, y: 130, label: 'Accreting Warp Mudflats', code: 'SLT-0.4F' },
            { id: 'pm-a2-06', x: 430, y: 82, label: 'Migrated Surf Line', code: 'CST-1906' },
          ],
          landUse: [
            { category: 'Intertidal Silt & Salt-Pan Warp', percentage: 46, certainty: 'documented' },
            { category: 'Open Outer Sea', percentage: 36, certainty: 'documented' },
            { category: 'Former Port & Dune Fringe', percentage: 18, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Compiled from 1906 Trinity Buoyage Revocation Chart (Fonds NEH-09).',
        },
      },
      {
        id: 'pm-2023',
        eraId: 'contemporary-trace',
        yearLabel: '2023 · Inland Dune & Marsh Plain',
        yearStart: 1995,
        yearEnd: 2026,
        title: 'Granite Quays Three Kilometers from Open Surf',
        summary:
          'Stabilized marram dunes and grazing marsh extend nearly three kilometers seaward of the old quay; both lighthouses stand landlocked amid wind-scoured sand slacks.',
        settlementScale: '38 seasonal residents & coastal bird observatory warden',
        builtFabric:
          'Intact Customs House (partially reroofed as field station), sand-drifted granite quay, two landlocked masonry lighthouses.',
        infrastructureState:
          'Single-track gravel causeway, elevated boardwalk across old harbor basin, solar tide gauge at outer marsh edge.',
        landscapeCondition:
          'Successional coastal dune ridges, samphire creeks, and reedbeds occupying the former five-fathom anchorage.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Contemporary shoreline mapped; subsurface position of the 1852 timber packet pier remains unexcavated beneath Dune Ridge II.',
        keyChangesFromPrior: [
          'Progradation of shoreline an additional 1.8km eastward since 1906',
          'Consolidation of former harbor anchorage into vegetated dune meadow',
        ],
        scene: {
          waterLevelRatio: 0.14,
          waterPolygon: 'M 525,0 L 600,0 L 600,360 L 542,360 Q 512,180 525,0 Z',
          terrainContours: [
            'M 155,0 Q 145,235 185,360',
            'M 295,0 Q 320,180 302,360',
            'M 435,0 Q 455,180 442,360',
          ],
          paths: [
            { id: 'pm-boardwalk', label: 'Marsh Survey Boardwalk', d: 'M 160,185 L 470,192', kind: 'road', dashed: true },
            { id: 'pm-relict-brg', label: 'Obsolete 064° Light Axis', d: 'M 116,212 L 510,152', kind: 'contour', dashed: true },
          ],
          structures: [
            { id: 'pm-quay23', label: 'Landlocked Granite Quay', x: 138, y: 128, width: 22, height: 115, kind: 'ruin', certainty: 'documented' },
            { id: 'pm-cust23', label: 'Former Customs House', x: 96, y: 146, width: 34, height: 42, kind: 'civic', certainty: 'documented' },
            { id: 'pm-lt-in23', label: 'Inland Range Light I', x: 108, y: 204, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
            { id: 'pm-lt-out23', label: 'Inland Range Light II', x: 358, y: 218, width: 16, height: 16, kind: 'ruin', certainty: 'documented' },
          ],
          annotations: [
            { id: 'pm-a1-23', x: 168, y: 115, label: '1868 Quay Wall (3km Inland)', code: 'Q-DRY' },
            { id: 'pm-a2-23', x: 332, y: 254, label: 'Landlocked Spit Beacon', code: 'LT-1848' },
            { id: 'pm-a3-23', x: 534, y: 80, label: 'Present Surf Line', code: 'SEA-23' },
          ],
          landUse: [
            { category: 'Accreted Marram Dunes & Salt Marsh', percentage: 74, certainty: 'documented' },
            { category: 'Relict Port Settlement Fringe', percentage: 14, certainty: 'documented' },
            { category: 'Active Marine Foreshore', percentage: 12, certainty: 'documented' },
          ],
          reconstructionBasis:
            '2023 Littoral Traverse & Historic Shoreline Overlay (Fonds RSF-2025).',
        },
      },
    ],
    claims: [
      {
        id: 'cl-pm-1',
        status: 'verified',
        statement:
          'Harbor depth at the Bonded Quay shoaled from 5.2 fathoms in 1868 to 0.4 fathoms by 1906 following the November 1879 outer spit breach.',
        evidenceNote: 'Directly measured in Northern Estuary Hydrographic Sounding Books IV and VII.',
        sourceIds: ['src-03'],
      },
      {
        id: 'cl-pm-2',
        status: 'interpreted',
        statement:
          'Sediment discharge from the 1911 Reedmere Fen steam-drainage outfall accelerated secondary dune progradation across Port Meridian’s outer bar.',
        evidenceNote: 'Supported by mineralogical match of peat-stained silts in 1924 core samples.',
        sourceIds: ['src-03', 'src-07'],
      },
      {
        id: 'cl-pm-3',
        status: 'unresolved',
        statement:
          'Whether the Port Meridian Harbor Board knowingly suppressed Capt. Halvorsen’s 1877 shoaling memorandum prior to issuing its final £40,000 pier bond.',
        evidenceNote: 'Minute-book pages for October–December 1877 were excised before archival deposit.',
        sourceIds: ['src-03', 'src-10'],
      },
    ],
    artifactIds: ['art-08', 'art-09', 'art-10'],
    eventIds: ['evt-01', 'evt-02', 'evt-05'],
    personIds: ['per-05', 'per-07'],
    relatedPlaceIds: ['pl-reedmere-commons', 'pl-corvus-observatory', 'pl-salina-neblina'],
    sourceIds: ['src-03', 'src-07', 'src-10', 'src-12'],
    subjects: ['coastal geomorphology', 'siltation', 'lighthouses', 'customs port', 'hydrography'],
  },
  {
    id: 'pl-salina-neblina',
    slug: 'salina-neblina-works',
    catalogueRef: 'UA-PL-04',
    name: 'Salina Neblina Evaporation Settlement',
    formerName: 'Campamento Salinero Sector Norte',
    subtitle:
      'An arid littoral company town of forty-four solar brine quadrangles and timber dormitories vacated within a fortnight when water trains ceased in August 1978.',
    layoutVariant: 'field-expedition',
    category: 'abandoned-settlement',
    region: 'Salt Flat Littoral',
    atlasPosition: {
      x: 842,
      y: 468,
      elevationMeters: 6,
      gridSector: 'G-5 · Southern Salt Basin',
    },
    coordinateDisclaimer:
      'Illustrative demonstration projection (Sector G-5); composite industrial extraction settlement.',
    activeSpan: {
      startYear: 1908,
      turningPointYear: 1978,
      eraSummary: 'Founded 1908 · Peak harvest 1929 · Vacated August 1978',
    },
    currentStatusLabel: 'Abandoned · Salt-encrusted timber pans & dry rail spur',
    excerpt:
      'Built where coastal fog meets zero annual runoff, Salina Neblina depended entirely on weekly tank-car deliveries for drinking water while harvesting forty thousand tons of industrial salt a year. When the rail tanker stopped running in August 1978, departure was immediate.',
    editorialIntro:
      'In humid climates, abandoned timber towns rot into topsoil within thirty years. At Salina Neblina, hyper-saline wind spray pickled redwood sluice gates, assay ledgers, and workers’ bunkframes into brittle crystalline fossils while devouring every iron bolt that held them together.',
    narrativeSections: [
      {
        heading: 'Geometry of Solar Crystallization',
        body: [
          'Laid out in 1908 by chemical engineers supplying soda-ash and glassworks, the settlement operated as a hydraulic checkerboard. Wind-driven Archimedean pumps lifted coastal brine into shallow clay-lined concentrator ponds, stepping southward by gravity until rose-tinted halite crusted in the harvesting pans.',
          'Parallel to the pans stood six pitched-roof timber barracks, a company commissary paying in stamped aluminum tokens, an assay laboratory, and a narrow-gauge railway siding whose tank cars supplied every liter of potable water.',
        ],
      },
      {
        heading: 'Aquifer Brining & Sudden Silence',
        body: [
          'Corporate annual reports blamed the 1978 closure solely on cheap synthetic soda ash. Yet foreman Mateo Echeverría’s marginal notes inside the 1974–1976 evaporator ledgers document a local crisis: deep borehole pumping had fractured the clay aquitard, drawing dense bittern downward into the coastal freshwater lens twenty kilometers inland.',
          'Even the exact date of final departure remains contested—rail dispatchers logged the last locomotive on 11 August 1978, whereas two families interviewed in 1989 recalled waiting beside loaded handcarts until 24 August.',
        ],
      },
    ],
    physicalTransformation: {
      originalMorphology:
        'Arid coastal sabkha engineered into forty-four rectilinear evaporation pans, wind-pump towers, narrow-gauge salt sidings, and six timber worker dormitories.',
      agentOfChange:
        'Subsurface salinization, synthetic chemical competition, and abrupt termination of potable water rail deliveries in August 1978.',
      presentTrace:
        'Polygonal halite crusts efflorescing over collapsed redwood sluices; standing timber dormitory frames bleached silver-white; rusted narrow-gauge railbed.',
      survivingMarkers: [
        'Forty-four clay-bunded crystallizer quadrangles encrusted with pink-white halite',
        'Timber assay office shell where payroll books were recovered in 1983',
        'Twelve headless lattice wind-pump towers along the western brine intake trench',
      ],
    },
    periods: [
      {
        id: 'sn-1932',
        eraId: 'municipal-modernism',
        yearLabel: '1932 · Full Solar Harvest Grid',
        yearStart: 1925,
        yearEnd: 1955,
        title: 'Forty-Four Active Brine Pans & Tank-Car Lifeline',
        summary:
          'All evaporation sectors flooded in graduated density gradients; wind-pumps feed northern intake canals while weekly narrow-gauge trains haul bagged salt out and potable water in.',
        settlementScale: '1,080 workers & dependents across six dormitory rows',
        builtFabric:
          'Redwood barracks with shaded verandahs, corrugated assay house, bagging mill, wooden cistern tower.',
        infrastructureState:
          '18 wind-pump towers, gravity brine sluices, electrified narrow-gauge pan tramway, mainline rail spur.',
        landscapeCondition:
          'Engineered brine mirrors set against wind-scoured gypsum flats.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Pan geometry verified from 1932 company engineering plan; seasonal worker headcount varies across commissary ledgers.',
        keyChangesFromPrior: [
          'Doubling of southern crystallizer pans (Sectors C & D)',
          'Installation of overhead potable-water cistern fed by rail tank cars',
        ],
        scene: {
          waterLevelRatio: 0.52,
          waterPolygon: 'M 60,70 L 360,70 L 360,255 L 60,255 Z',
          terrainContours: ['M 0,40 Q 300,28 600,45', 'M 0,325 Q 300,338 600,320'],
          paths: [
            { id: 'sn-rail32', label: 'Potable Water & Salt Rail Spur', d: 'M 385,295 L 600,295', kind: 'rail' },
            { id: 'sn-tram32', label: 'Narrow-Gauge Pan Tramway', d: 'M 75,270 L 430,270 L 430,110', kind: 'rail', dashed: true },
            { id: 'sn-canal32', label: 'Brine Intake Trench', d: 'M 0,85 L 60,85', kind: 'canal' },
          ],
          structures: [
            { id: 'sn-panA', label: 'Concentrator Pans A–B', x: 70, y: 80, width: 135, height: 165, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sn-panC', label: 'Crystallizer Pans C–D', x: 215, y: 80, width: 135, height: 165, kind: 'infrastructure', certainty: 'documented' },
            { id: 'sn-mill', label: 'Bagging Mill & Cistern', x: 392, y: 238, width: 56, height: 42, kind: 'industrial', certainty: 'documented' },
            { id: 'sn-dorm1', label: 'Timber Dormitories 1–3', x: 455, y: 95, width: 92, height: 22, kind: 'residential', certainty: 'documented' },
            { id: 'sn-dorm2', label: 'Timber Dormitories 4–6', x: 455, y: 132, width: 92, height: 22, kind: 'residential', certainty: 'documented' },
            { id: 'sn-assay', label: 'Assay & Payroll Office', x: 455, y: 182, width: 46, height: 26, kind: 'civic', certainty: 'documented' },
          ],
          annotations: [
            { id: 'sn-a1-32', x: 145, y: 64, label: '44 Flooded Brine Quadrangles', code: 'PAN-44' },
            { id: 'sn-a2-32', x: 462, y: 82, label: 'Company Barracks', code: 'DRM-6' },
            { id: 'sn-a3-32', x: 402, y: 315, label: 'Water Tanker Siding', code: 'H2O-RL' },
          ],
          landUse: [
            { category: 'Flooded Solar Brine Quadrangles', percentage: 62, certainty: 'documented' },
            { category: 'Barracks, Mill & Rail Yards', percentage: 20, certainty: 'documented' },
            { category: 'Unworked Sabkha Margin', percentage: 18, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Plotted from Compañía Salinera 1932 Master Pan Diagram (Fonds CSN-78).',
        },
      },
      {
        id: 'sn-1978',
        eraId: 'decommissioning',
        yearLabel: '1978 · Final Tanker & Evacuation',
        yearStart: 1976,
        yearEnd: 1980,
        title: 'Desiccating Pans & Abrupt August Departure',
        summary:
          'Northern intake pumps shut down; half the quadrangles stand crusted in unharvested bittern as the final locomotive clears the siding and workers shutter the barracks.',
        settlementScale: '85 holdout residents departing August 1978',
        builtFabric:
          'Boarded timber dormitories, locked assay office with ledgers left inside, corroded iron bagging hoppers.',
        infrastructureState:
          'Water cistern drained; narrow-gauge locomotives left on dead siding; borehole capped.',
        landscapeCondition:
          'Blinding white salt crust spreading across unmaintained clay bunds.',
        epistemicStatus: 'interpreted',
        certaintyNote:
          'Sequence of pan shutdowns reconstructed from Echeverría’s 1976 notes; exact final departure date contested (11 vs 24 August 1978).',
        keyChangesFromPrior: [
          'Abandonment of Sectors A and B following bittern contamination',
          'Cessation of rail water deliveries and complete settlement depopulation',
        ],
        scene: {
          waterLevelRatio: 0.12,
          waterPolygon: 'M 215,165 L 350,165 L 350,245 L 215,245 Z',
          terrainContours: ['M 0,40 Q 300,28 600,45', 'M 0,325 Q 300,338 600,320'],
          paths: [
            { id: 'sn-rail78', label: 'Discontinued Rail Spur', d: 'M 385,295 L 600,295', kind: 'rail', dashed: true },
          ],
          structures: [
            { id: 'sn-panA78', label: 'Desiccated Pans A–B', x: 70, y: 80, width: 135, height: 165, kind: 'ruin', certainty: 'documented' },
            { id: 'sn-panC78', label: 'Residual Bittern Sector D', x: 215, y: 80, width: 135, height: 165, kind: 'submerged', certainty: 'approximate' },
            { id: 'sn-mill78', label: 'Shuttered Bagging Mill', x: 392, y: 238, width: 56, height: 42, kind: 'ruin', certainty: 'documented' },
            { id: 'sn-dorm1-78', label: 'Vacated Barracks 1–3', x: 455, y: 95, width: 92, height: 22, kind: 'ruin', certainty: 'documented' },
            { id: 'sn-dorm2-78', label: 'Vacated Barracks 4–6', x: 455, y: 132, width: 92, height: 22, kind: 'ruin', certainty: 'documented' },
            { id: 'sn-assay78', label: 'Locked Assay Office', x: 455, y: 182, width: 46, height: 26, kind: 'ruin', certainty: 'documented' },
          ],
          annotations: [
            { id: 'sn-a1-78', x: 92, y: 125, label: 'Dry Halite Polygon Crust', code: 'DRY-AB' },
            { id: 'sn-a2-78', x: 455, y: 224, label: 'Abandoned Ledger Locker', code: 'DOC-78' },
          ],
          landUse: [
            { category: 'Desiccated Salt-Crust Pans', percentage: 52, certainty: 'documented' },
            { category: 'Residual Bittern Pools', percentage: 12, certainty: 'approximate' },
            { category: 'Vacated Timber Settlement', percentage: 18, certainty: 'documented' },
            { category: 'Sabkha Drift', percentage: 18, certainty: 'documented' },
          ],
          reconstructionBasis:
            'Inferred from 1978 union inventory and 1983 archival recovery sketch.',
        },
      },
      {
        id: 'sn-2022',
        eraId: 'contemporary-trace',
        yearLabel: '2022 · Crystalline Ruin Field',
        yearStart: 2010,
        yearEnd: 2026,
        title: 'Salt-Pickled Timber Skeletons & Eroded Bunds',
        summary:
          'Iron fasteners have rusted away completely, collapsing roofs inward while salt-cured redwood wall studs and sluice paddles remain upright amid wind-planed gypsum.',
        settlementScale: 'Uninhabited; occasional geological sampling teams',
        builtFabric:
          'Roof-collapsed redwood barracks frames, salt-crystallized sluice gates, skeletal wind-pump lattice stumps.',
        infrastructureState:
          'Rails lifted for scrap in 1991 leaving raised ballast embankment; collapsed cistern cradle.',
        landscapeCondition:
          'Geometric bund grid softening into hexagonal salt polygons visible from high altitude.',
        epistemicStatus: 'verified',
        certaintyNote:
          'Surface ruins surveyed in 2022; subsurface plume extent of the 1970s brined borehole remains unmapped.',
        keyChangesFromPrior: [
          'Salvage removal of steel rails (1991) and collapse of iron-bolted truss roofs',
          'Halite crystallization preserving timber sluices and paper fragments in dry debris',
        ],
        scene: {
          waterLevelRatio: 0,
          waterPolygon: '',
          terrainContours: [
            'M 0,40 Q 300,28 600,45',
            'M 55,160 Q 210,148 368,168',
            'M 0,325 Q 300,338 600,320',
          ],
          paths: [
            { id: 'sn-emb22', label: 'Stripped Rail Ballast Bed', d: 'M 385,295 L 600,295', kind: 'contour', dashed: true },
          ],
          structures: [
            { id: 'sn-pan22', label: 'Eroded Polygon Bund Grid', x: 70, y: 80, width: 280, height: 165, kind: 'ruin', certainty: 'documented' },
            { id: 'sn-dorm22', label: 'Collapsed Redwood Frames', x: 455, y: 95, width: 92, height: 58, kind: 'ruin', certainty: 'documented' },
            { id: 'sn-assay22', label: 'Assay Shell Footings', x: 455, y: 182, width: 46, height: 26, kind: 'ruin', certainty: 'documented' },
          ],
          annotations: [
            { id: 'sn-a1-22', x: 155, y: 155, label: 'Efflorescent Halite Ridges', code: 'HAL-22' },
            { id: 'sn-a2-22', x: 425, y: 282, label: 'Lifted Rail Embankment', code: 'SCRP-91' },
          ],
          landUse: [
            { category: 'Relict Crystallizer Salt Polygons', percentage: 64, certainty: 'documented' },
            { category: 'Wind-Blown Gypsum & Sabkha', percentage: 26, certainty: 'documented' },
            { category: 'Timber Ruin Footprint', percentage: 10, certainty: 'documented' },
          ],
          reconstructionBasis:
            '2022 Arid Littoral Field Reconnaissance (Fonds RSF-2025).',
        },
      },
    ],
    claims: [
      {
        id: 'cl-sn-1',
        status: 'verified',
        statement:
          'Salina Neblina possessed zero local potable water sources throughout its seventy-year operation, relying exclusively on rail tank-car deliveries.',
        evidenceNote: 'Confirmed by company cistern blueprints and weekly railway water bills.',
        sourceIds: ['src-04'],
      },
      {
        id: 'cl-sn-2',
        status: 'interpreted',
        statement:
          'Deep borehole pumping between 1968 and 1976 ruptured the basal clay seal, contaminating the regional aquifer and forcing closure ahead of market failure.',
        evidenceNote: 'Interpreted from Mateo Echeverría’s marginal density readings in Ledger IX.',
        sourceIds: ['src-04', 'src-09'],
      },
      {
        id: 'cl-sn-3',
        status: 'unresolved',
        statement:
          'Exact date of final human departure in August 1978 (railway log cites 11 August; two oral testimonies cite 24 August) and the whereabouts of the missing 1977–1978 brine logbook.',
        evidenceNote: 'Eighteen-month gap in recovered assay locker papers.',
        sourceIds: ['src-04', 'src-09'],
      },
    ],
    artifactIds: ['art-12', 'art-13', 'art-14'],
    eventIds: ['evt-06', 'evt-11'],
    personIds: ['per-06'],
    relatedPlaceIds: ['pl-port-meridian-spit', 'pl-reedmere-commons'],
    sourceIds: ['src-04', 'src-09', 'src-12'],
    subjects: ['salt extraction', 'company town', 'aquifer salinization', 'arid preservation', 'rail lifeline'],
  },
];
