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
const US_SIZES = 'Twin / Full / Double / Queen / King';

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
    model: 'KD010-A2', carton: '1040 × 940 × 290 mm', loading: '248 sets per container (container type confirmed in the quotation)', name: 'Disassembled Electric Bed Frame',
    lead: 'A split-design electric bed frame: the lifting system is separate from the mattress, with backrest and leg rest adjustment.',
    structure: 'Disassembled (lifting system separate from mattress)', dims: '2000 × 900 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–60°; leg rest 0–40°', load: '200 kg', clearance: 'Floor clearance about 30 cm',
    materials: 'High-quality steel; eco multi-layer board 15 / 18 mm or high-strength honeycomb aluminum panel; fabric options with high-density sponge',
    motor: 'Two motors; German OKIN', control: null, power: null,
    features: [
      ['Split lifting design', 'The lifting system and the mattress are separate, so the base can be paired with compatible mattresses.'],
      ['Adjustment', 'Backrest lift 0–60° and leg rest lift 0–40° (catalog figures).'],
      ['Strong structure', 'High-quality steel; the catalog states an endurance test of the lifting system of 10,000+ cycles.'],
      ['Panel options', 'Eco multi-layer board (15 / 18 mm) or a high-strength honeycomb aluminum panel.'],
      ['Load rating', '200 kg listed; the test method is available on request.'],
      ['Motors', 'Two motors, German OKIN.'],
    ],
  }),
  frame({
    model: 'KD011-A3', carton: '1030 × 930 × 210 mm', loading: '156 sets per container (container type confirmed in the quotation)', name: 'Disassembled Electric Bed Frame with Frame',
    lead: 'A split-design electric bed frame with a surround frame, listed in US-style bed sizes.',
    structure: 'Disassembled with surround frame', dims: '2000 × 900 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–60°; leg rest 0–40°', load: '200 kg', clearance: 'Floor clearance about 30 cm', materials: null,
    motor: 'Two motors; German OKIN', control: null, power: null,
    features: [
      ['Split structure', 'The lifting system is separate from the mattress and the frame has a surround.'],
      ['Adjustment', 'Backrest lift 0–60° and leg rest lift 0–40°.'],
      ['Motors', 'Two motors, German OKIN.'],
      ['US sizes', 'Listed for Twin, Full, Double, Queen and King sizes.'],
      ['Load and clearance', '200 kg listed load rating (test method on request) with about 30 cm floor clearance.'],
    ],
  }),
  frame({
    model: 'KD001-A3', carton: '2000 × 900: 2050 × 950 × 200 mm; 2000 × 1100: 2050 × 1150 × 200 mm', weights: 'About 52 kg (2000 × 900) and 56.4 kg (2000 × 1100), carton included', loading: '146 sets in a 40-foot container', name: 'Fixed Electric Bed Frame',
    lead: 'A fixed-structure electric bed frame, listed in 2000 × 900 mm and 2000 × 1100 mm, with a padded sponge surface.',
    structure: 'Fixed', dims: '2000 × 900 mm; 2000 × 1100 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–60°; leg rest 0–40°', clearance: 'Floor clearance about 27 cm',
    materials: 'Surface padding: 1 cm blue super sponge + 1 cm hard white sponge',
    motor: 'Two motors; German OKIN', control: null, power: null,
    features: [
      ['Fixed structure', 'A fixed-style frame for stable, straightforward installation.'],
      ['Adjustment', 'Backrest lift 0–60° and leg rest lift 0–40°.'],
      ['Motors', 'Two motors, German OKIN.'],
      ['Listed sizes', '2000 × 900 mm and 2000 × 1100 mm, in Twin, Full, Double, Queen and King nominal sizes.'],
      ['Padded surface', '1 cm blue super sponge with 1 cm hard white sponge.'],
    ],
  }),

  mattress({
    model: 'KD004-B1', carton: '2050 × 950 × 310 mm', loading: '110 sets per container (container type confirmed in the quotation)', name: 'Electric Mattress',
    lead: 'A full-wrap electric mattress that sits on a compatible bed board, with independent backrest and leg rest lift.',
    structure: 'Full-wrap; placed on a bed board', dims: '2000 × 900 × 280 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–60°; leg rest 0–40°', motor: 'Two motors; German OKIN',
    control: 'Optional wired remote, wireless remote or Sleepace app; voice and APP', power: null,
    materials: 'Knitted fabric (three-in-one quilting), natural latex and high-density foam; high-quality steel',
    functions: 'Deep sleep, zero gravity, one-touch reset, anti-snore, vibration massage, reading and movie modes; optional LED lights, USB and sleep monitoring',
    features: [
      ['Full-wrap design', 'The mattress sits directly on a compatible bed board.'],
      ['Independent adjustment', 'Backrest lift 0–60° and leg rest lift 0–40°, driven by two motors.'],
      ['Mattress construction', 'Knitted fabric (three-in-one quilting), natural latex and high-density foam; configurable to customer requirements.'],
      ['Preset modes', 'Deep sleep, zero gravity, one-touch reset, anti-snore, vibration massage, reading and movie modes.'],
      ['Motors and control', 'Two motors, German OKIN. Optional wired or wireless remote, Sleepace app, voice and APP.'],
      ['Durability', 'The catalog states an endurance test of the lifting system of 10,000+ cycles.'],
    ],
  }),
  mattress({
    model: 'KD003-B1', carton: '1520 × 1020 × 200 mm', loading: '95 sets per container (container type confirmed in the quotation)', name: 'Electric Mattress',
    lead: 'A split-design electric mattress (2000 × 1500 × 250 mm): the lifting system is separate from the mattress, with natural latex and two motors.',
    structure: 'Disassembled (lifting system separate from mattress)', dims: '2000 × 1500 × 250 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–60°; leg rest 0–40°', motor: 'Two motors; German OKIN', load: '300 kg', clearance: 'Floor clearance about 30 cm',
    control: null, power: null,
    materials: 'Knitted fabric (three-in-one quilting), natural latex, suspended cotton / high-density foam, independent pocket springs; high-quality steel',
    features: [
      ['Two motors', 'Two German OKIN motors drive independent backrest and leg rest lift (0–60° / 0–40°).'],
      ['Natural latex comfort', 'Natural latex, suspended cotton / high-density foam and independent pocket springs.'],
      ['Load rating', '300 kg listed load rating (test method on request) with about 30 cm floor clearance.'],
      ['Durability', 'The catalog states an endurance test of the lifting system of 10,000+ cycles.'],
    ],
  }),

  chair({
    model: 'YJ001-A01', carton: '1950 × 750 × 520 mm', weights: 'Net 58.1 kg; gross 66 kg (recent shipment)', name: 'Yoga Chair A01',
    lead: 'A powered zero-gravity yoga recliner with V-shaped lift support for the waist and a one-touch yoga mode.',
    options: 'Technology leather with striped stitching (catalog YJ001-1); the top-grain half-leather dotted style is model A02',
    materials: 'Technology leather, natural latex, high-density foam; high-quality steel',
    power: null, motor: 'Three motors (head / foot / leg); German OKIN',
    features: [
      ['Yoga-focused design', 'V-shaped lift supports the waist and gently compresses the abdomen.'],
      ['One-touch yoga mode', 'A single control moves the chair into the yoga position.'],
      ['Three motors', 'Head, foot and leg motors; backrest 0–60° and leg rest 0–45°.'],
      ['Upholstery', 'Technology leather over natural latex and high-density foam. The top-grain half-leather version is model A02.'],
      ['Striped stitching', 'Segmented striped stitching; the dotted (tufted) style is model A02.'],
      ['Optional functions', 'Vibration massage and USB; wireless remote and voice control.'],
    ],
  }),
  chair({
    model: 'YJ001-A02', name: 'Yoga Chair A02',
    lead: 'The top-grain half-leather version of the yoga recliner, with dotted (tufted) stitching and the same three-motor lift system and yoga functions as A01.',
    options: 'Top-grain half-leather with dotted stitching (catalog YJ001-3)',
    materials: 'Top-grain half-leather, natural latex, high-density foam; high-quality steel',
    motor: 'Three motors (head / foot / leg); German OKIN', power: null,
    features: [
      ['Top-grain half-leather', 'Top-grain half-leather upholstery over natural latex and high-density foam.'],
      ['Dotted stitching', 'Dotted (tufted) stitching; the striped technology-leather style is model A01.'],
      ['Yoga-focused design', 'V-shaped lift supports the waist and gently compresses the abdomen.'],
      ['One-touch yoga mode', 'A single control moves the chair into the yoga position.'],
      ['Three motors', 'Head, foot and leg motors, the same as A01; backrest 0–60° and leg rest 0–45°.'],
      ['Optional functions', 'Vibration massage and USB; wireless remote and voice control.'],
    ],
  }),
];
