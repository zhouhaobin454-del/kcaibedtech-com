// Product data for the 34 Kang Cai SKUs. Source: the factory workbook (Products / Specifications / OEM sheets).
// Rules: only catalog- or factory-sheet-sourced values; no prices, no customer-order data
// (packing-list weights, carton sizes, container loads), no template-prefilled values still marked "to be confirmed".
// null / missing => rendered as "Contact us for details".

export const CATS = {
  frames: { slug: 'adjustable-bed-frames', label: 'Adjustable Bed Frames', bestFor: 'Mattress brands, furniture brands and distributors adding powered adjustable bases to a range.' },
  mattresses: { slug: 'mattresses', label: 'Adjustable Mattresses', bestFor: 'Mattress-led programs, compact comfort collections and independent-living applications.' },
  beds: { slug: 'smart-beds', label: 'Smart Beds', bestFor: 'Contemporary bedroom ranges requiring a complete, clean integrated smart bed design.' },
  chairs: { slug: 'leisure-chairs', label: 'Leisure Chairs', bestFor: 'Wellness, lifestyle and hospitality ranges adding powered zero-gravity seating.' },
  bases: { slug: 'bed-bases', label: 'Bed Bases', bestFor: 'Furniture collections and mattress-support programs that need slatted foundations.' },
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
const base = (o) => ({ cat: 'bases', sizes: SIZES3, dims: SIZES3, ...o });
const bed = (o) => ({ cat: 'beds', structure: 'Leather upholstered frame', materials: 'Leather upholstered frame', ...o });
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
    model: 'KD008-A1', name: 'Multifunctional Electric Bed Frame',
    lead: 'A multifunctional electric bed frame (2000 × 900 mm) shown in multiple lifted positions, with guardrail and castor forms in the catalog.',
    structure: 'Multifunctional frame', dims: '2000 × 900 mm',
    features: [
      ['Multifunctional design', 'Catalog presentation covers multiple lifted postures as well as guardrail and castor forms.'],
      ['Motors', MOTOR + '.'],
      ['Control options', CONTROL + '.'],
    ],
  }),
  frame({
    model: 'KD005-A1', name: 'Five-Zone Electric Bed Frame',
    lead: 'A five-zone electric bed frame (2000 × 900 mm) with electric backrest and leg rest adjustment.',
    structure: 'Five-zone frame', dims: '2000 × 900 mm',
    features: [
      ['Five-zone structure', 'A five-zone frame with electric backrest and leg rest lift.'],
      ['Motors', MOTOR + '.'],
      ['Control options', CONTROL + '.'],
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
  frame({
    model: 'KD007-A1', name: 'Jacket Electric Bed Frame',
    lead: 'A jacket-style electric bed frame (2000 × 900 mm) built on a rubber-cup elastic slat structure.',
    structure: 'Jacket style (rubber-cup elastic slats)', dims: '2000 × 900 mm',
    features: [
      ['Rubber-cup slat structure', 'Elastic rubber cups carry the slats for a resilient sleeping surface.'],
      ['Motors', MOTOR + '.'],
      ['Control options', CONTROL + '.'],
    ],
  }),
  frame({
    model: 'KD001-A7', name: 'Electric Bed Frame with Frame, Rear Removable (Wall Hugger)',
    lead: 'A wall-hugger electric bed frame with a surround frame, available in three sizes.',
    structure: 'Surround frame, rear-moving (wall hugger)', dims: SIZES3, sizes: SIZES3,
    features: [
      ['Wall hugger movement', 'The rear-moving structure keeps the bed close to the wall.'],
      ['Surround frame', 'A framed design for a finished bedside look.'],
      THREE,
      MC,
    ],
  }),
  frame({
    model: 'KD001-A8', name: 'Fixed Electric Bed Frame with Frame',
    lead: 'A fixed electric bed frame (2000 × 900 mm) with a surround frame.',
    structure: 'Fixed with surround frame', dims: '2000 × 900 mm',
    features: [
      ['Fixed structure', 'A fixed-style frame with a surround.'],
      ['Motors', MOTOR + '.'],
      ['Control options', CONTROL + '.'],
    ],
  }),
  frame({
    model: 'KD001-A6', name: 'Fixed Electric Bed Frame (Aluminum Plate)',
    lead: 'A fixed electric bed frame with a metal / aluminum-plate bed surface, available in three sizes.',
    structure: 'Fixed', dims: SIZES3, sizes: SIZES3, materials: 'Metal / aluminum-plate bed surface',
    features: [
      ['Aluminum-plate surface', 'A metal / aluminum-plate bed surface.'],
      ['Fixed structure', 'A fixed-style frame for stable installation.'],
      THREE,
      MC,
    ],
  }),
  frame({
    model: 'KD004-A3', name: 'Rear Relocated (Wall Hugger) Electric Bed Frame',
    lead: 'A wall-hugger electric bed frame with a metal-plate bed surface, available in three sizes.',
    structure: 'Rear relocated (wall hugger)', dims: SIZES3, sizes: SIZES3, materials: 'Metal-plate bed surface',
    features: [
      ['Wall hugger movement', 'The rear-relocating structure keeps the bed close to the wall.'],
      ['Metal-plate surface', 'A metal-plate bed surface.'],
      THREE,
      MC,
    ],
  }),
  frame({
    model: 'KD006-A1', name: 'Hanging Electric Bed Frame',
    lead: 'A hanging-type electric bed frame with a metal-plate bed surface, available in three sizes.',
    structure: 'Hanging type', dims: SIZES3, sizes: SIZES3, materials: 'Metal-plate bed surface',
    features: [
      ['Hanging structure', 'A hanging-type frame design.'],
      ['Metal-plate surface', 'A metal-plate bed surface.'],
      THREE,
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
    model: 'KD001-B1', name: 'Electric Mattress',
    lead: 'An integrated electric mattress (2000 × 1800 × 500 mm) shown together with the KR001 upholstered bed frame.',
    structure: 'Lifting system integrated with mattress', dims: '2000 × 1800 × 500 mm (side height 300 mm)',
    angles: 'Backrest 0–55°; leg rest 0–35°', pair: 'KR001',
    materials: 'Knitted fabric (three-in-one quilting), eco-friendly comfort filling, suspended cotton, high-density foam, mini pocket springs; high-quality steel',
    functions: 'Optional voice control, APP control, vibration massage, LED lights, USB ports, sleep monitoring and anti-snore',
    features: [
      ['Integrated design', 'The lifting system and the mattress are integrated into one product.'],
      ['Independent adjustment', 'Backrest lift 0–55° and leg rest lift 0–35°.'],
      ['Mattress construction', 'Knitted three-in-one quilted fabric, suspended cotton, high-density foam and mini pocket springs.'],
      ['Durability', LIFT_TEST + '; high-quality steel resists impact.'],
      ['Optional functions', 'Voice control, APP control, vibration massage, LED lights, USB ports, sleep monitoring and anti-snore.'],
      ['Bed pairing', 'Shown as a set with the KR001 leather upholstered bed frame.'],
    ],
  }),
  mattress({
    model: 'KD001-B2', name: 'Electric Mattress',
    lead: 'An integrated electric mattress (2000 × 1800 × 530 mm) with breathable 3D material and pocket springs, shown with the KR002 bed frame.',
    structure: 'Lifting system integrated with mattress; can be used directly on the floor', dims: '2000 × 1800 × 530 mm (side height 280 mm)',
    angles: 'Backrest 0–55°; leg rest 0–35°', pair: 'KR002',
    materials: 'Knitted fabric (three-in-one quilting), eco-friendly breathable 3D material, Q-bounce cotton, high-density foam, independent pocket springs; high-quality steel',
    functions: 'Optional voice control, APP control, vibration massage, LED lights, USB ports, sleep monitoring and anti-snore',
    features: [
      ['Integrated design', 'The lifting system and the mattress are integrated; the product can also be used directly on the floor.'],
      ['Independent adjustment', 'Backrest lift 0–55° and leg rest lift 0–35°.'],
      ['Breathable construction', 'Eco-friendly breathable 3D material, Q-bounce cotton, high-density foam and independent pocket springs.'],
      ['Optional functions', 'Voice control, APP control, vibration massage, LED lights, USB ports, sleep monitoring and anti-snore.'],
      ['Bed pairing', 'Shown as a set with the KR002 bed frame.'],
    ],
  }),
  mattress({
    model: 'KD002-B1', name: 'Motion Mattress',
    lead: 'An integrated motion mattress (2000 × 1800 × 280 mm) with left / right independent backrest lift, shown with the KR003 bed frame.',
    structure: 'Lifting system integrated with mattress; full-wrap split-head, on a bed board or on the floor with added feet', dims: '2000 × 1800 × 280 mm (side height 250 mm)',
    angles: 'Backrest 0–55°; leg rest 0–35°', pair: 'KR003',
    materials: 'Knitted fabric (three-in-one quilting), graphene Q-bounce cotton, mini pocket springs, high-strength honeycomb aluminum board (eco-friendly, lightweight); high-quality steel',
    functions: 'Optional voice control, APP control, vibration massage, LED lights, USB ports, sleep monitoring and anti-snore',
    features: [
      ['Left / right backrest lift', 'The backrest can lift independently on the left and right sides, with a separate leg rest lift.'],
      ['Flexible placement', 'Full-wrap split-head design for use on a bed board, or on the floor with added feet.'],
      ['Lightweight support', 'High-strength honeycomb aluminum board that is eco-friendly and light.'],
      ['Mattress construction', 'Graphene Q-bounce cotton and mini pocket springs under knitted quilted fabric.'],
      ['Bed pairing', 'Shown as a set with the KR003 bed frame.'],
    ],
  }),
  mattress({
    model: 'KD003-B1', name: 'Electric Mattress',
    lead: 'An electric mattress (2000 × 1500 × 250 mm) with natural latex and two motors, shown with the KR004 bed frame.',
    structure: 'Lifting system integrated with mattress', dims: '2000 × 1500 × 250 mm', sizes: US_SIZES + ' (catalog nominal sizes)',
    angles: 'Backrest 0–55°; leg rest 0–35°', motor: 'Two motors; German OKIN or Haojiang optional', load: '300 kg', clearance: 'Floor clearance 30 cm', pair: 'KR004',
    control: 'Optional wired remote, wireless remote or Sleepace app; voice and APP',
    materials: 'Knitted fabric (three-in-one quilting), natural latex, suspended cotton / high-density foam, independent pocket springs; high-quality steel',
    functions: 'Optional vibration massage, LED lights, USB ports, sleep monitoring and anti-snore',
    features: [
      ['Two motors', 'Two motors drive independent backrest and leg rest lift (0–55° / 0–35°).'],
      ['Natural latex comfort', 'Natural latex, suspended cotton / high-density foam and independent pocket springs.'],
      ['Load rating', '300 kg load rating with 30 cm floor clearance.'],
      ['Optional functions', 'Vibration massage, LED lights, USB ports, sleep monitoring and anti-snore.'],
      ['Bed pairing', 'Shown as a set with the KR004 bed frame.'],
    ],
  }),
  mattress({
    model: 'KD008-B1', name: 'Electric Mattress', lead: 'An electric mattress sized 1800 × 2000 × 530 mm.', dims: '1800 × 2000 × 530 mm',
    features: [['Mattress size', '1800 × 2000 × 530 mm.'], ['Motors', MOTOR + '.'], ['Control options', CONTROL + '.']],
  }),
  mattress({
    model: 'KD001-B3', name: 'Electric Mattress', lead: 'An electric mattress sized 2000 × 1800 mm.', dims: '2000 × 1800 mm',
    features: [['Mattress size', '2000 × 1800 mm.'], ['Motors', MOTOR + '.'], ['Control options', CONTROL + '.']],
  }),
  mattress({
    model: 'KD004-B3', name: 'Adjustable Mattress', lead: 'An adjustable mattress sized 2000 × 1800 × 280 mm; the catalog also shows a 2000 × 1800 mm version.', dims: '2000 × 1800 × 280 mm',
    features: [['Mattress size', '2000 × 1800 × 280 mm, with a 2000 × 1800 mm version shown in the catalog.'], ['Motors', MOTOR + '.'], ['Control options', CONTROL + '.']],
  }),
  mattress({
    model: 'KD002-B2', name: 'Adjustable Mattress', lead: 'An adjustable mattress sized 2000 × 1800 × 280 mm.', dims: '2000 × 1800 × 280 mm',
    features: [['Mattress size', '2000 × 1800 × 280 mm.'], ['Motors', MOTOR + '.'], ['Control options', CONTROL + '.']],
  }),

  bed({ model: 'KR001', name: 'Leather Upholstered Bed Frame', lead: 'A leather-upholstered smart bed frame (2000 × 1800 mm) paired with the KD001-B1 integrated electric mattress.', dims: '2000 × 1800 mm', pair: 'KD001-B1' }),
  bed({ model: 'KR002', name: 'Leather Upholstered Bed Frame', lead: 'A leather-upholstered smart bed frame (2000 × 1800 mm) paired with the KD001-B2 integrated electric mattress.', dims: '2000 × 1800 mm', pair: 'KD001-B2' }),
  bed({ model: 'KR003', name: 'Leather Upholstered Bed Frame', lead: 'A leather-upholstered smart bed frame (2000 × 1800 mm) paired with the KD002-B1 motion mattress.', dims: '2000 × 1800 mm', pair: 'KD002-B1' }),
  bed({ model: 'KR004', name: 'Leather Upholstered Bed Frame', lead: 'A leather-upholstered smart bed frame (2000 × 1500 mm) paired with the KD003-B1 electric mattress.', dims: '2000 × 1500 mm', pair: 'KD003-B1' }),

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

  base({ model: 'KP001', name: 'Fiberglass Slatted Bed Base', lead: 'A slatted bed base built with fiberglass slats, available in three sizes.', structure: 'Slatted base', materials: 'Fiberglass slats', features: [['Fiberglass slats', 'Slats made of fiberglass.'], THREE] }),
  base({ model: 'KP002', name: 'Movable Folding Slatted Bed Base', lead: 'A movable, foldable slatted bed base, available in three sizes.', structure: 'Movable and foldable slatted base', features: [['Movable and foldable', 'Folds and moves for easier handling.'], THREE] }),
  base({ model: 'KP003', name: 'Full Rubber-Cup Slatted Bed Base', lead: 'A slatted bed base on a full rubber-cup (elastic rubber cushion) slat structure, available in three sizes.', structure: 'Full rubber-cup slat structure', features: [['Full rubber-cup structure', 'Elastic rubber cups carry the slats across the whole base.'], THREE] }),
  base({ model: 'KP004', name: 'Solid Wood Slatted Bed Base', lead: 'A slatted bed base with solid wood slats, available in three sizes.', structure: 'Solid wood slatted base', materials: 'Solid wood slats', features: [['Solid wood slats', 'Slats made of solid wood.'], THREE] }),
  base({ model: 'KP005', name: 'Deluxe Rubber-Cup Slatted Bed Base', lead: 'A deluxe slatted bed base with rubber-cup board-slat construction, available in three sizes.', structure: 'Deluxe rubber-cup board-slat structure', features: [['Deluxe rubber-cup construction', 'Board slats carried on elastic rubber cups.'], THREE] }),
  base({ model: 'KP006', name: 'Poplar Double-Row Slatted Bed Base', lead: 'A slatted bed base with double-row poplar slats on a steel frame, available in three sizes.', structure: 'Double-row slatted base', materials: 'Poplar double-row slats; steel frame', features: [['Double-row poplar slats', 'Poplar slats arranged in two rows.'], ['Steel frame', 'Slats are carried on a steel frame.'], THREE] }),
  base({ model: 'KP007', name: 'Solid Wood Folding Slatted Bed Base', lead: 'A folding slatted bed base with solid wood slats, available in three sizes.', structure: 'Folding slatted base', materials: 'Solid wood slats', features: [['Solid wood slats', 'Slats made of solid wood.'], ['Folding design', 'Folds for easier shipping and handling.'], THREE] }),
  base({ model: 'KP008', name: 'Ordinary Three-Row Slatted Bed Base', lead: 'A standard slatted bed base with three rows of slats, available in three sizes.', structure: 'Three-row slatted base', features: [['Three-row slats', 'Slats arranged in three rows.'], THREE] }),
];
