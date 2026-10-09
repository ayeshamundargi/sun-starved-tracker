/**
 * Demo Farm Dataset for College / Hackathon Presentations
 * Preloaded realistic farm scenario labeled: 🟣 DEMO DATA.
 * Calculations are executed through the live mathematical engine!
 */

export const DEMO_FARM = {
  id: 'demo-farm-green-valley',
  isDemo: true,
  name: 'Green Valley Farm',
  size: 5,
  unit: 'Acre',
  cropId: 'tomato',
  cropName: 'Tomato',
  cropVariety: 'Arka Rakshak (High-yield hybrid)',
  growthStage: 'flowering',
  growthStageName: 'Flowering & Early Fruit',
  irrigation: 'Drip Irrigation with Canopy Sensors',
  hasPanels: true,
  soilType: 'Red Sandy Loam (Well Drained)',
  orientation: 'North-South Rows (180° Azimuth)',
  plantSpacingCm: 45,
  plantHeightM: 0.85,
  rowSpacingM: 4.0,

  location: {
    source: 'DEMO', // DEMO | LIVE | MANUAL | CACHED
    label: 'Demo Location (Kolar Agricultural Belt)',
    lat: 13.1368,
    lon: 78.1292,
    accuracy: 10,
    elevation: 822, // meters
    village: 'Vemgal Rural',
    district: 'Kolar',
    state: 'Karnataka',
    country: 'India'
  },

  solar: {
    panelType: 'Bifacial Monocrystalline PERC',
    wattage: 450, // Watts per panel
    panelCount: 20,
    angle: 25, // degrees tilt (Current setup)
    height: 3.0, // meters clearance
    panelSpacing: 2.5, // meters inter-module gap
    rowSpacing: 4.0, // meters between solar rows
    dimensions: { length: 2.1, width: 1.05 }, // meters
    azimuth: 180, // Facing South
    inverterEfficiency: 0.96
  },

  weather: {
    source: 'DEMO',
    timestamp: '2026-10-08T12:00:00Z',
    temp: 24, // °C
    humidity: 62, // %
    cloudCover: 25, // %
    rainProb: 20, // %
    windSpeed: 12, // km/h
    solarRadiation: 650, // W/m² (GHI)
    directNormalRadiation: 740, // W/m² (DNI)
    diffuseRadiation: 160, // W/m²
    uvIndex: 7.2,
    conditionText: 'Partly Sunny / Ideal Solar',
    conditionIcon: '🌤️',
    sunrise: '06:08',
    sunset: '18:19',
    hourlyForecast: [
      { hour: '06:00', temp: 18, cloud: 40, rad: 80, rain: 10 },
      { hour: '08:00', temp: 20, cloud: 30, rad: 340, rain: 10 },
      { hour: '10:00', temp: 22, cloud: 25, rad: 580, rain: 15 },
      { hour: '12:00', temp: 24, cloud: 25, rad: 650, rain: 20 },
      { hour: '14:00', temp: 26, cloud: 35, rad: 560, rain: 25 },
      { hour: '16:00', temp: 23, cloud: 45, rad: 310, rain: 20 },
      { hour: '18:00', temp: 21, cloud: 50, rad: 60, rain: 15 }
    ],
    dailyForecast: [
      { day: 'Today', tempMax: 26, tempMin: 18, rain: 20, condition: '🌤️' },
      { day: 'Tomorrow', tempMax: 27, tempMin: 19, rain: 15, condition: '☀️' },
      { day: 'Day 3', tempMax: 25, tempMin: 18, rain: 35, condition: '🌦️' },
      { day: 'Day 4', tempMax: 28, tempMin: 20, rain: 10, condition: '☀️' },
      { day: 'Day 5', tempMax: 27, tempMin: 19, rain: 25, condition: '⛅' },
      { day: 'Day 6', tempMax: 26, tempMin: 18, rain: 40, condition: '🌧️' },
      { day: 'Day 7', tempMax: 27, tempMin: 19, rain: 20, condition: '🌤️' }
    ]
  },

  cropAnalysis: {
    source: 'DEMO',
    detectedCrop: 'Tomato (Solanum lycopersicum)',
    condition: 'Healthy Vegetative-Bloom Canopy',
    healthScore: 92,
    confidence: '89% Prototype CV Confidence',
    leafColoration: 'Vibrant Deep Chlorophyll Green',
    sunlightStatus: 'Moderate Sunlight (Borderline Shaded at 25° Tilt)',
    notes: 'Canopy is healthy. Midday sunlight under current 25° tilt is 68%, slightly below flowering target (78-85%).'
  }
};
