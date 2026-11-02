// Product data for the 7 Kang Cai SKUs that are promoted (owner decision 2026-11-02: KD010-A2, KD011-A3, KD001-A3, KD004-B1, KD003-B1, YJ001-A01, YJ001-A02). Source: the factory workbook (Products / Specifications / OEM sheets).
// Rules: only catalog- or factory-sheet-sourced values; no prices, no customer-order data
// (packing-list weights, carton sizes, container loads), no template-prefilled values still marked "to be confirmed".
// null / missing => rendered as "Contact us for details".

export const CATS = {
  frames: { slug: 'adjustable-bed-frames', label: 'Adjustable Bed Frames', bestFor: 'Mattress brands, furniture brands and distributors adding powered adjustable bases to a range.' },
  mattresses: { slug: 'mattresses', label: 'Adjustable Mattresses', bestFor: 'Mattress-led programs, compact comfort collections and independent-living applications.' },
  chairs: { slug: 'leisure-chairs', label: 'Leisure Chairs', bestFor: 'Wellness, lifestyle and hospitality ranges adding powered zero-gravity seating.' },
};

const MOTOR = 'Optional German OKIN or Haojiang motor';
const CONTROL = 'Optional wired remote, wireless remote or Sleepace app';
const POWER = 'Configured for the destination country';
const SIZES3 = '2000 × 1800 / 1500 / 900 mm';
const US_SIZES = 'Twin / Full / Double / Queen / King';
const LIFT_TEST = 'Lifting system endurance tested to 10,000+ cycles';
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const MC = ['Motors and control', MOTOR + '; ' + lc(CONTROL) + '.'];
const THREE = ['Three sizes', '2000 × 1800, 2000 × 1500 and 2000 × 900 mm.'];

const frame = (o) => ({ cat: 'frames', motor: MOTOR, control: CONTROL, power: POWER, ...o });
const mattress = (o) => ({ cat: 'mattresses', motor: MOTOR, control: CONTROL, power: POWER, ...o });
const chair = (o) => ({
  cat: 'chairs', structure: 'Recliner (lie / sit dual-use)', dims: '700 × 1900 × 480 mm', angles: 'Backrest 0–60°; leg rest 0–45°',
  motor: 'Three motors (head / foot / leg); German OKIN motor optional', control: 'Optional wireless remote; voice control',
  clearance: 'Floor clearance 46 cm', power: POWER,
  materials: 'Technology leather or top-grain half-leather, natural latex, high-density foam; high-quality steel',
  functions: 'V-shaped lift for waist support, abdominal compression, one-touch yoga mode; optional vibration massage and USB',
  ...o,
});

export const skus = [
  frame({
    model: 'KD010-A2', name: 'Disassembled Electric Bed Frame',
    lead: 'A split-design electric bed frame: the lifting system is separate from the mattress, with independent backrest and leg rest adjustment.',
    structure: 'Disassembled (lifting system separate from mattress)', dims: '2000 × 900 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–60°; leg rest 0–40°', load: '200 kg', clearance: 'Floor clearance 30 cm',
    materials: 'High-quality steel; eco multi-layer board 15 / 18 mm (high-strength honeycomb aluminum panel also listed)',
    functions: 'Optional voice control, APP, vibration massage, sleep monitoring and anti-snore',
    features: [
      ['Split lifting design', 'The lifting system and the mattress are separate, so the base can be paired with compatible mattresses.'],
      ['Independent adjustment', 'Backrest lift 0–60° and leg rest lift 0–40°.'],
      ['Strong structure', 'High-quality steel for impact resistance; lifting system endurance tested to 10,000+ cycles.'],
      ['Panel options', 'Eco multi-layer board (15 / 18 mm) or a high-strength honeycomb aluminum panel.'],
      MC,
      ['Optional functions', 'Voice control, APP, vibration massage, sleep monitoring and anti-snore.'],
    ],
  }),
  frame({
    model: 'KD011-A3', name: 'Disassembled Electric Bed Frame with Frame',
    lead: 'A split-design electric bed frame with a surround frame, offered for US-style bed sizes.',
    structure: 'Disassembled with surround frame', dims: '2000 × 900 mm', sizes: US_SIZES,
    load: '200 kg', clearance: 'Floor clearance 30 cm', materials: 'High-quality steel',
    features: [
      ['Split structure', 'The lifting system is separate from the mattress and the frame has a surround.'],
      ['US sizes', 'Suited to Twin, Full, Double, Queen and King sizes.'],
      ['Strong structure', 'High-quality steel with a 200 kg load rating and 30 cm floor clearance.'],
      MC,
    ],
  }),
  frame({
    model: 'KD001-A3', variants: [['2000 × 900 mm','2000 × 900 × 270 mm','48.2 kg','52.9 kg','2050 × 950 × 200 mm'],['2000 × 1100 mm','2000 × 1100 × 270 mm','54 kg','59 kg','2050 × 1150 × 200 mm']], name: 'Fixed Electric Bed Frame',
    lead: 'A fixed-structure electric bed frame offered for US-style bed sizes, with a padded sponge surface.',
    structure: 'Fixed', dims: '2000 × 900 mm', sizes: US_SIZES, clearance: 'Floor clearance 27 cm',
    materials: 'High-quality steel; surface padding 1 cm blue super sponge + 1 cm hard white sponge',
    features: [
      ['Fixed structure', 'A fixed-style frame for stable, straightforward installation.'],
      ['US sizes', 'Suited to Twin, Full, Double, Queen and King sizes.'],
      ['Padded surface', '1 cm blue super sponge with 1 cm hard white sponge.'],
      MC,
    ],
  }),

  mattress({
    model: 'KD004-B1', variants: [['Queen 60" × 78" (about 1524 × 1981 mm)','—','90.5 kg','99.4 kg','2020 × 1560 × 330 mm'],['King 72" × 78" (about 1829 × 1981 mm)','—','104.5 kg','114.7 kg','2020 × 1860 × 330 mm']], name: 'Electric Mattress',
    lead: 'A full-wrap, split-head electric mattress that sits on a compatible bed board, with independent backrest and leg rest lift.',
    structure: 'Full-wrap split-head; placed on a bed board', dims: '2000 × 900 × 280 mm (side height 250 mm)', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–55°; leg rest 0–35°', motor: 'Two motors; German OKIN motor (Haojiang optional)',
    control: 'Optional wired remote, wireless remote or Sleepace app; voice and APP',
    materials: 'Knitted fabric (three-in-one quilting), natural latex and high-density foam; high-quality steel',
    functions: 'Deep sleep, zero gravity, memory, anti-snore, vibration massage, reading and movie modes; optional LED lights, USB and sleep monitoring',
    features: [
      ['Full-wrap split-head design', 'The mattress sits directly on a compatible bed board.'],
      ['Independent adjustment', 'Backrest lift 0–55° and leg rest lift 0–35°, driven by two motors.'],
      ['Mattress construction', 'Knitted fabric (three-in-one quilting), natural latex and high-density foam.'],
      ['Preset modes', 'Deep sleep, zero gravity, memory, anti-snore, vibration massage, reading and movie modes.'],
      ['Motors and control', 'German OKIN motor (Haojiang optional); remote, voice and APP control.'],
      ['Durability', LIFT_TEST + '.'],
    ],
  }),
  mattress({
    model: 'KD003-B1', name: 'Electric Mattress',
    lead: 'An electric mattress (2000 × 1500 × 250 mm) with natural latex and two motors.',
    structure: 'Lifting system integrated with mattress', dims: '2000 × 1500 × 250 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–55°; leg rest 0–35°', motor: 'Two motors; German OKIN or Haojiang optional', load: '300 kg', clearance: 'Floor clearance 30 cm',
    control: 'Optional wired remote, wireless remote or Sleepace app; voice and APP',
    materials: 'Knitted fabric (three-in-one quilting), natural latex, suspended cotton / high-density foam, independent pocket springs; high-quality steel',
    functions: 'Optional vibration massage, LED lights, USB ports, sleep monitoring and anti-snore',
    features: [
      ['Two motors', 'Two motors drive independent backrest and leg rest lift (0–55° / 0–35°).'],
      ['Natural latex comfort', 'Natural latex, suspended cotton / high-density foam and independent pocket springs.'],
      ['Load rating', '300 kg load rating with 30 cm floor clearance.'],
      ['Optional functions', 'Vibration massage, LED lights, USB ports, sleep monitoring and anti-snore.'],
    ],
  }),

  chair({
    model: 'YJ001-A01', variants: [['Super-fiber leather version','700 × 1900 × 460 mm','58.1 kg','66 kg','1950 × 750 × 520 mm']], name: 'Yoga Chair A01',
    lead: 'A powered zero-gravity yoga recliner with V-shaped lift support for the waist and a one-touch yoga mode.',
    options: 'Dotted or striped stitching; catalog numbers YJ001-1 (technology leather) and YJ001-3 (top-grain half-leather)',
    features: [
      ['Yoga-focused design', 'V-shaped lift supports the waist and gently compresses the abdomen.'],
      ['One-touch yoga mode', 'A single control moves the chair into the yoga position.'],
      ['Three motors', 'Head, foot and leg motors give backrest 0–60° and leg rest 0–45° adjustment.'],
      ['Material options', 'Technology leather or top-grain half-leather over natural latex and high-density foam.'],
      ['Stitching options', 'Dotted or striped stitching.'],
      ['Optional functions', 'Vibration massage and USB; wireless remote and voice control.'],
    ],
  }),
  chair({
    model: 'YJ001-A02', name: 'Yoga Chair B02',
    lead: 'A powered zero-gravity yoga recliner in the B02 style, with V-shaped lift support and a one-touch yoga mode.',
    options: 'Dotted or striped stitching; catalog numbers YJ002-4 (technology leather) and YJ002-6 (top-grain half-leather)',
    features: [
      ['Yoga-focused design', 'V-shaped lift supports the waist and gently compresses the abdomen.'],
      ['One-touch yoga mode', 'A single control moves the chair into the yoga position.'],
      ['Three motors', 'Head, foot and leg motors give backrest 0–60° and leg rest 0–45° adjustment.'],
      ['Material options', 'Technology leather or top-grain half-leather over natural latex and high-density foam.'],
      ['Stitching options', 'Dotted or striped stitching.'],
    ],
  }),

];
