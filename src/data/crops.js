/**
 * Agri-Voltaics Crop Knowledge Configuration
 * Prototype agronomic database detailing Daily Light Integral (DLI),
 * Photosynthetically Active Radiation (PAR) thresholds, and growth-stage modifiers.
 * Label: "Prototype crop-light requirement"
 */

export const CROPS_DATA = {
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    icon: '🍅',
    scientificName: 'Solanum lycopersicum',
    lightCategory: 'High Sunlight',
    minDLI: 16,        // mol/m²/day
    idealMinDLI: 22,
    idealMaxDLI: 30,
    maxToleratedDLI: 36,
    idealPAR: 650,     // µmol/m²/s
    minSunHours: 6.5,
    idealSunHours: 8.5,
    shadeTolerance: 2, // 1 (low) to 5 (shade-loving)
    heatStressThreshold: 32, // °C where afternoon agrivoltaic shade reduces blossom drop
    notes: 'Agrivoltaic sweet spot: Midday shading cools canopy, preventing blossom drop while retaining 85%+ photosynthetic efficiency.',
    varieties: ['Roma', 'Beefsteak', 'Cherry', 'Arka Rakshak', 'Pusa Ruby'],
    stages: [
      { id: 'seedling', name: 'Seedling', lightMod: 0.75, sensitivity: 3, desc: 'Tender sprouts, vulnerable to scorching' },
      { id: 'vegetative', name: 'Vegetative', lightMod: 0.95, sensitivity: 4, desc: 'Rapid leaf & stem expansion' },
      { id: 'flowering', name: 'Flowering', lightMod: 1.15, sensitivity: 5, desc: 'Critical bloom phase, demands balanced warmth and PAR' },
      { id: 'fruiting', name: 'Fruiting', lightMod: 1.20, sensitivity: 5, desc: 'Fruit set and ripening, maximum energy assimilation' },
      { id: 'mature', name: 'Mature / Harvest', lightMod: 0.85, sensitivity: 2, desc: 'Ripening ready for picking' }
    ]
  },
  wheat: {
    id: 'wheat',
    name: 'Wheat',
    icon: '🌾',
    scientificName: 'Triticum aestivum',
    lightCategory: 'Moderate-High Sunlight',
    minDLI: 14,
    idealMinDLI: 20,
    idealMaxDLI: 28,
    maxToleratedDLI: 34,
    idealPAR: 580,
    minSunHours: 6.0,
    idealSunHours: 8.0,
    shadeTolerance: 3,
    heatStressThreshold: 30,
    notes: 'Agrivoltaic sweet spot: High clearance panels (3.5m+) prevent terminal heat stress during grain filling stage.',
    varieties: ['HD 2967', 'PBW 343', 'Lok 1', 'Sharbati', 'Durum'],
    stages: [
      { id: 'seedling', name: 'Germination / Crown Root', lightMod: 0.80, sensitivity: 3, desc: 'Root anchor and early shoot' },
      { id: 'vegetative', name: 'Tillering & Jointing', lightMod: 0.95, sensitivity: 4, desc: 'Tillers emerge, canopy builds' },
      { id: 'flowering', name: 'Booting & Heading', lightMod: 1.10, sensitivity: 5, desc: 'Spikelets develop' },
      { id: 'fruiting', name: 'Grain Filling', lightMod: 1.15, sensitivity: 5, desc: 'Starch accumulation, heat sensitive' },
      { id: 'mature', name: 'Ripening / Golden', lightMod: 0.75, sensitivity: 2, desc: 'Dry down before harvest' }
    ]
  },
  maize: {
    id: 'maize',
    name: 'Maize (Corn)',
    icon: '🌽',
    scientificName: 'Zea mays',
    lightCategory: 'High Sunlight (C4 Plant)',
    minDLI: 18,
    idealMinDLI: 24,
    idealMaxDLI: 34,
    maxToleratedDLI: 40,
    idealPAR: 750,
    minSunHours: 7.0,
    idealSunHours: 9.0,
    shadeTolerance: 1,
    heatStressThreshold: 35,
    notes: 'C4 photosynthetic pathway requires high light; spacing panels at 3.5m-4.5m with steeper angles prevents yield loss.',
    varieties: ['Sweet Corn', 'Field Corn', 'DHM 117', 'Pioneer Hybrid', 'Ganga 5'],
    stages: [
      { id: 'seedling', name: 'Emergence (VE-V4)', lightMod: 0.80, sensitivity: 3, desc: 'Early vegetative leaf collars' },
      { id: 'vegetative', name: 'Knee-high to Tassel (V6-V12)', lightMod: 1.05, sensitivity: 4, desc: 'Rapid biomass accumulation' },
      { id: 'flowering', name: 'Silking & Tasseling (R1)', lightMod: 1.25, sensitivity: 5, desc: 'Pollen shedding and ear fertilization' },
      { id: 'fruiting', name: 'Milk to Dent (R2-R5)', lightMod: 1.20, sensitivity: 5, desc: 'Kernel filling stage' },
      { id: 'mature', name: 'Black Layer (R6)', lightMod: 0.80, sensitivity: 2, desc: 'Kernel physiological maturity' }
    ]
  },
  rice: {
    id: 'rice',
    name: 'Rice (Paddy)',
    icon: '🍚',
    scientificName: 'Oryza sativa',
    lightCategory: 'Moderate Sunlight',
    minDLI: 13,
    idealMinDLI: 18,
    idealMaxDLI: 26,
    maxToleratedDLI: 32,
    idealPAR: 520,
    minSunHours: 5.5,
    idealSunHours: 7.5,
    shadeTolerance: 3,
    heatStressThreshold: 33,
    notes: 'Paddy water reflection provides secondary albedo illumination back to bifacial solar modules!',
    varieties: ['Basmati', 'Sona Masoori', 'IR 64', 'Jasmine', 'Swarna'],
    stages: [
      { id: 'seedling', name: 'Nursery / Transformed', lightMod: 0.75, sensitivity: 3, desc: 'Transplanting into wet fields' },
      { id: 'vegetative', name: 'Tillering', lightMod: 0.95, sensitivity: 4, desc: 'Stem multiplying' },
      { id: 'flowering', name: 'Panicle Initiation & Heading', lightMod: 1.15, sensitivity: 5, desc: 'Panicle emergence above flood' },
      { id: 'fruiting', name: 'Grain Milking & Dough', lightMod: 1.10, sensitivity: 4, desc: 'Golden grains form' },
      { id: 'mature', name: 'Golden Harvest', lightMod: 0.70, sensitivity: 2, desc: 'Field drained for cutting' }
    ]
  },
  potato: {
    id: 'potato',
    name: 'Potato',
    icon: '🥔',
    scientificName: 'Solanum tuberosum',
    lightCategory: 'Moderate Sunlight (Cool Season)',
    minDLI: 12,
    idealMinDLI: 16,
    idealMaxDLI: 24,
    maxToleratedDLI: 28,
    idealPAR: 480,
    minSunHours: 5.0,
    idealSunHours: 7.0,
    shadeTolerance: 4,
    heatStressThreshold: 28,
    notes: 'Outstanding agrivoltaic candidate: Excessive soil heat halts tuber bulking. Overhead panels provide cool ground shade.',
    varieties: ['Kufri Jyoti', 'Russet Burbank', 'Kufri Chandramukhi', 'Yukon Gold', 'Kufri Pukhraj'],
    stages: [
      { id: 'seedling', name: 'Sprout Emergence', lightMod: 0.70, sensitivity: 2, desc: 'Eyes sprout through mound' },
      { id: 'vegetative', name: 'Vegetative Growth', lightMod: 0.90, sensitivity: 3, desc: 'Vigorous green foliage' },
      { id: 'flowering', name: 'Tuber Initiation & Flowering', lightMod: 1.10, sensitivity: 5, desc: 'Underground stolons hook into tubers' },
      { id: 'fruiting', name: 'Tuber Bulking', lightMod: 1.05, sensitivity: 4, desc: 'Tubers swell rapidly in cool soil' },
      { id: 'mature', name: 'Vines Senesce', lightMod: 0.65, sensitivity: 1, desc: 'Skin sets for digging' }
    ]
  },
  vegetables: {
    id: 'vegetables',
    name: 'Vegetables (Leafy / Greens)',
    icon: '🥬',
    scientificName: 'Brassica & Lactuca spp.',
    lightCategory: 'Low-Moderate (Partial Shade Tolerant)',
    minDLI: 10,
    idealMinDLI: 14,
    idealMaxDLI: 20,
    maxToleratedDLI: 24,
    idealPAR: 400,
    minSunHours: 4.5,
    idealSunHours: 6.5,
    shadeTolerance: 5,
    heatStressThreshold: 27,
    notes: 'Natural agrivoltaic champions: Spinach, lettuce, and brassicas thrive under solar panel shade, yielding crisper, sweeter leaves.',
    varieties: ['Spinach (Palak)', 'Lettuce', 'Cabbage', 'Broccoli', 'Swiss Chard'],
    stages: [
      { id: 'seedling', name: 'Microgreen / Cotyledon', lightMod: 0.70, sensitivity: 3, desc: 'First true leaves' },
      { id: 'vegetative', name: 'Rosette & Leaf Expansion', lightMod: 1.00, sensitivity: 4, desc: 'Primary edible leaf growth' },
      { id: 'flowering', name: 'Heading / Pre-Bolting', lightMod: 1.05, sensitivity: 4, desc: 'Head tightens; shade prevents bolting' },
      { id: 'fruiting', name: 'Full Head / Leaf Density', lightMod: 0.95, sensitivity: 3, desc: 'Full harvest weight' },
      { id: 'mature', name: 'Harvest Prime', lightMod: 0.70, sensitivity: 2, desc: 'Cut and pack stage' }
    ]
  },
  other: {
    id: 'other',
    name: 'Custom / Other Crop',
    icon: '🌱',
    scientificName: 'Agricultural crop',
    lightCategory: 'Configurable Sunlight',
    minDLI: 14,
    idealMinDLI: 18,
    idealMaxDLI: 26,
    maxToleratedDLI: 32,
    idealPAR: 550,
    minSunHours: 6.0,
    idealSunHours: 8.0,
    shadeTolerance: 3,
    heatStressThreshold: 32,
    notes: 'Configurable baseline prototype. User can adjust target sunlight sensitivity in farm settings.',
    varieties: ['Standard Variety', 'Hybrid Selection', 'Heritage Seed'],
    stages: [
      { id: 'seedling', name: 'Seedling', lightMod: 0.75, sensitivity: 3, desc: 'Initial germination' },
      { id: 'vegetative', name: 'Vegetative', lightMod: 0.95, sensitivity: 4, desc: 'Canopy growth' },
      { id: 'flowering', name: 'Flowering / Bloom', lightMod: 1.15, sensitivity: 5, desc: 'Reproductive initiation' },
      { id: 'fruiting', name: 'Fruiting / Filling', lightMod: 1.15, sensitivity: 5, desc: 'Yield formation' },
      { id: 'mature', name: 'Mature', lightMod: 0.80, sensitivity: 2, desc: 'Harvest ready' }
    ]
  }
};
