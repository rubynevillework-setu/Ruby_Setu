import type { Enterprise } from "@/lib/types";

/**
 * PLACEHOLDER CONTENT.
 *
 * Every record below is invented. These are not real organisations and none
 * of the verification events, certifications or impact figures describe
 * anything that actually happened. They exist so the site can be designed,
 * reviewed and demoed before real profiles are recruited.
 *
 * Replace them one at a time as real enterprises are verified. Set
 * `isSample: false` only once a profile is genuinely checked - the demo
 * banner disappears automatically when no sample records remain.
 */
export const enterprises: Enterprise[] = [
  {
    slug: "sunkoshi-wool-collective",
    name: "Sunkoshi Wool Collective",
    summary:
      "A 140-woman weaving collective in Kavre producing hand-loomed wool throws and scarves for European homeware buyers.",
    sector: "Textiles & apparel",
    location: "Panauti, Kavrepalanchok",
    founded: 2013,
    headcount: "140 weavers, 12 staff",
    products: ["Hand-loomed wool throws", "Felted scarves", "Undyed yarn"],
    exportMarkets: ["Germany", "Denmark", "Japan"],
    capacity:
      "Roughly 900 pieces a month across four looms sheds, with a six to eight week lead time on new designs and a 200-piece minimum order.",
    body: `Sunkoshi began as a winter income scheme for eleven households whose men had left for Gulf construction work. It now employs 140 women within walking distance of their homes, which is the point: the collective has never opened a central factory, because a central factory would mean nobody could weave between school runs and buffalo.

## What they make

The core line is undyed and naturally dyed wool throws in a plain twill, woven on pedal looms at 60cm width and joined by hand. The wool is bought raw from herders in Dolakha and scoured in Panauti.

> "European buyers ask us first about consistency. That was fair. It took us four years to get the tension the same across forty looms." — Sabita Tamang, production lead

## Working with them

They have run two European accounts before and understand sample rounds, lab-dip approval and shipping documentation. They do not have an in-house designer, so buyers who arrive with a technical pack get a much faster result than buyers who arrive with a mood board.`,
    certifications: [
      {
        name: "Guaranteed Fair Trade",
        issuer: "World Fair Trade Organization",
        expiresAt: "2027-06-30",
      },
      {
        name: "GOTS (organic wool line)",
        issuer: "Control Union",
        expiresAt: "2027-02-28",
      },
    ],
    impact: [
      {
        label: "Women employed within 5km of home",
        value: "140",
        source: "Collective payroll, audited by WFTO assessor",
        period: "2025",
      },
      {
        label: "Average monthly earnings vs district agricultural wage",
        value: "2.4×",
        source: "Collective payroll vs DoLIDAR district wage rate",
        period: "2025",
      },
    ],
    verification: [
      {
        id: "v-swc-1",
        method: "documents_sighted",
        checker: "Sanjog",
        checkedAt: "2026-05-14",
        note: "Company registration and PAN certificate sighted in original. Export licence current.",
      },
      {
        id: "v-swc-2",
        method: "site_visit",
        checker: "Sanjog",
        checkedAt: "2026-06-02",
        note: "Full day at the Panauti shed and two satellite sheds. Counted 38 active looms. Payroll book inspected for three months.",
      },
      {
        id: "v-swc-3",
        method: "reference_call",
        checker: "Sanjog",
        checkedAt: "2026-06-09",
        note: "Call with a Hamburg homeware importer, three seasons of orders. Confirmed on-time delivery and one quality dispute resolved.",
      },
      {
        id: "v-swc-4",
        method: "reference_call",
        checker: "Sanjog",
        checkedAt: "2026-06-11",
        note: "Call with the raw wool supplier in Dolakha confirming volumes and payment terms.",
      },
      {
        id: "v-swc-5",
        method: "third_party_certification",
        checker: "Sanjog",
        checkedAt: "2026-06-12",
        note: "WFTO guarantee certificate and GOTS scope certificate on file, both current.",
      },
    ],
    contactName: "Sabita Tamang, production lead",
    isSample: true,
    publishedAt: "2026-06-20",
  },
  {
    slug: "machhapuchhre-coffee-growers",
    name: "Machhapuchhre Coffee Growers",
    summary:
      "A 300-smallholder washed-arabica cooperative in Kaski, exporting green beans in 19-tonne annual lots.",
    sector: "Coffee & tea",
    location: "Lahachok, Kaski",
    founded: 2009,
    headcount: "300 member households, 9 staff",
    products: ["Washed arabica green beans", "Natural process microlots"],
    exportMarkets: ["Netherlands", "South Korea"],
    capacity:
      "About 19 tonnes of green bean a year, harvested December to February. Microlots from 300kg. Cupping scores have run 83–85 for the last three seasons.",
    body: `Coffee arrived in Lahachok as a government diversification scheme and mostly failed, until a handful of farmers stopped selling cherry to middlemen and built a shared wet mill in 2009. The cooperative now handles pulping, fermentation and drying centrally and pays members on quality bands rather than weight alone.

## The offer

Altitude runs 1,100 to 1,400 metres. The house profile is a soft, low-acid cup that does well as a filter single origin and blends without dominating. Members keep the parchment separated by ward, so single-ward microlots are possible from 300kg.

## Working with them

The bottleneck is cash, not coffee. Members are paid at delivery, months before an export payment arrives, so the cooperative can only pre-finance about half the harvest. Buyers who can pay 40% on contract rather than on shipment unlock volume that would otherwise be sold locally at a lower grade.`,
    certifications: [],
    impact: [
      {
        label: "Member households paid on quality band",
        value: "300",
        source: "Cooperative member register",
        period: "2025/26 season",
      },
      {
        label: "Price premium over local cherry buyers",
        value: "+31%",
        source: "Cooperative payment records vs Kaski district cherry rate",
        period: "2025/26 season",
      },
    ],
    verification: [
      {
        id: "v-mcg-1",
        method: "documents_sighted",
        checker: "Sanjog",
        checkedAt: "2026-04-08",
        note: "Cooperative registration under the Cooperative Act and PAN certificate sighted. Export records for two seasons reviewed.",
      },
      {
        id: "v-mcg-2",
        method: "site_visit",
        checker: "Sanjog",
        checkedAt: "2026-04-22",
        note: "Wet mill and drying beds inspected mid-harvest. Member register cross-checked against payment book for 20 randomly chosen households.",
      },
      {
        id: "v-mcg-3",
        method: "reference_call",
        checker: "Sanjog",
        checkedAt: "2026-04-29",
        note: "Call with a Rotterdam green buyer, two seasons. Confirmed cupping consistency and one late shipment caused by road closure.",
      },
      {
        id: "v-mcg-4",
        method: "reference_call",
        checker: "Sanjog",
        checkedAt: "2026-05-03",
        note: "Call with the district cooperative federation confirming good standing and audit history.",
      },
    ],
    contactName: "Deepak Gurung, cooperative manager",
    isSample: true,
    publishedAt: "2026-05-10",
  },
  {
    slug: "patan-metal-craft-cooperative",
    name: "Patan Metal Craft Cooperative",
    summary:
      "Thirty-one lost-wax casters in Lalitpur keeping a Newar metalworking tradition commercially alive through contemporary homeware.",
    sector: "Handicraft & homeware",
    location: "Patan, Lalitpur",
    founded: 2017,
    headcount: "31 artisans, 4 staff",
    products: ["Cast brass vessels", "Oil lamps", "Contract casting"],
    exportMarkets: ["France", "United Kingdom"],
    capacity:
      "Around 400 cast pieces a month. Small-batch work suits them far better than volume; anything over 1,000 units a month goes out to partner workshops and loses the hand-finish.",
    body: `Patan's metal casting is roughly a thousand years old and has spent the last thirty being replaced by imported pressed brass. The cooperative was formed by artisans who wanted the craft to survive as work rather than as heritage display.

## What they make

Lost-wax cast brass and bronze, finished by hand. The commercial line is deliberately contemporary — plain vessels, candle holders, simple oil lamps — because the devotional pieces the workshops are famous for have a narrow export market.

## Working with them

They take contract casting for European designers, which is where most of the recent growth is. Expect a slow first sample round: wax models are made by hand and the first iteration usually needs two revisions.`,
    certifications: [
      {
        name: "Fair Trade Group Nepal membership",
        issuer: "Fair Trade Group Nepal",
        expiresAt: "2026-11-30",
      },
    ],
    impact: [
      {
        label: "Artisans under 35 trained in lost-wax casting",
        value: "14",
        source: "Cooperative training register",
        period: "2021–2026",
      },
      {
        label: "Share of income from export contracts",
        value: "62%",
        source: "Cooperative accounts",
        period: "FY 2025/26",
      },
    ],
    verification: [
      {
        id: "v-pmc-1",
        method: "documents_sighted",
        checker: "Sanjog",
        checkedAt: "2026-07-01",
        note: "Cooperative registration, PAN and VAT certificates sighted. Fair Trade Group Nepal membership confirmed with the secretariat.",
      },
      {
        id: "v-pmc-2",
        method: "site_visit",
        checker: "Sanjog",
        checkedAt: "2026-07-15",
        note: "Two workshops visited during a casting day. Headcount confirmed at 31. Reviewed three months of order records.",
      },
      {
        id: "v-pmc-3",
        method: "reference_call",
        checker: "Sanjog",
        checkedAt: "2026-07-21",
        note: "Call with a Paris homeware brand, four contract runs. Confirmed quality and flagged slow sampling as the main friction.",
      },
      {
        id: "v-pmc-4",
        method: "reference_call",
        checker: "Sanjog",
        checkedAt: "2026-07-24",
        note: "Call with a London retailer who placed one order and did not repeat, for balance. No quality complaint; volume too small for their logistics.",
      },
    ],
    contactName: "Rajendra Shakya, chairperson",
    isSample: true,
    publishedAt: "2026-08-01",
  },
  {
    slug: "terai-fibre-and-paper",
    name: "Terai Fibre & Paper",
    summary:
      "A Chitwan workshop turning agricultural waste into handmade packaging paper, employing 40 people from landless families.",
    sector: "Paper & packaging",
    location: "Ratnanagar, Chitwan",
    founded: 2020,
    headcount: "40 staff",
    products: ["Handmade wrapping sheets", "Rigid box board", "Gift packaging"],
    exportMarkets: [],
    capacity:
      "About 12,000 sheets a month. No export experience yet — this is their first attempt at a European buyer, and they will need help with documentation.",
    body: `The workshop makes paper from sugarcane bagasse and rice straw bought from farms within twenty kilometres, material that is otherwise burned at the field edge. It employs forty people, most of them from landless families who previously worked as seasonal farm labour.

## What they make

Wrapping sheets and rigid board in natural and lightly dyed finishes, sold mostly to Kathmandu retailers and gift packers. Sheet consistency is good; colour consistency across batches is not yet where an export buyer would want it.

## Working with them

Be direct about what this is. They have never exported, have no export licence yet, and would need a patient first buyer willing to run a small trial order and accept a longer timeline. What they have is an unusually clean material story and a workforce that did not previously have year-round work.`,
    certifications: [],
    impact: [
      {
        label: "Tonnes of crop residue diverted from field burning",
        value: "38t",
        source: "Workshop purchase records",
        period: "2025",
      },
      {
        label: "Year-round jobs for previously seasonal workers",
        value: "40",
        source: "Workshop payroll",
        period: "2025",
      },
    ],
    verification: [
      {
        id: "v-tfp-1",
        method: "documents_sighted",
        checker: "Sanjog",
        checkedAt: "2026-08-12",
        note: "Company registration and PAN sighted. No export licence yet — application not started. Recorded as a gap on the profile.",
      },
    ],
    contactName: "Bimala Chaudhary, founder",
    isSample: true,
    publishedAt: "2026-08-18",
  },
];
