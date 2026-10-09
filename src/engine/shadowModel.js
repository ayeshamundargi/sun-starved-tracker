/**
 * 2D Mathematical Agri-Voltaics Shadow & PAR Irradiance Model
 * Approximates ground shadow footprint:
 * Shadow Length ≈ Panel Height / tan(Sun Elevation Angle)
 * Accounts for panel tilt, inter-row spacing, and canopy light interception.
 */

export function calculateShadowProfile({
  panelHeight,      // meters (e.g. 3.0m)
  panelTiltDeg,     // degrees (e.g. 25°)
  panelWidth = 2.0, // meters (e.g. 2m wide panel)
  panelSpacing,     // meters between panels along row (e.g. 2.5m)
  rowSpacing,       // meters between adjacent panel rows (e.g. 4.0m)
  sunElevDeg,       // degrees
  sunAzimuthDeg = 180,
  panelAzimuthDeg = 180,
  cloudCover = 25,  // %
  ambientRadiation = 650 // W/m²
}) {
  if (sunElevDeg <= 2) {
    // Night or dawn/dusk horizon
    return {
      shadowLength: 0,
      shadowOffset: 0,
      shadedFraction: 0,
      groundSunlightPercent: 0,
      rowLightDistribution: [0, 0, 0, 0],
      rowStatus: ['none', 'none', 'none', 'none'],
      parUnderPanels: 0,
      parBetweenPanels: 0
    };
  }

  const elevRad = (sunElevDeg * Math.PI) / 180;
  const tiltRad = (panelTiltDeg * Math.PI) / 180;

  // Panel effective vertical projected aperture
  const projectedPanelHeight = panelWidth * Math.sin(tiltRad);
  const totalEffectiveHeight = panelHeight + (projectedPanelHeight / 2);

  // Core formula: Shadow Length ≈ Height / tan(Elevation)
  const tanElev = Math.max(0.08, Math.tan(elevRad));
  const rawShadowLength = totalEffectiveHeight / tanElev;

  // Shadow direction / offset along row axis vs perpendicular
  const deltaAzimuthRad = ((sunAzimuthDeg - panelAzimuthDeg) * Math.PI) / 180;
  const shadowPerpendicular = rawShadowLength * Math.cos(deltaAzimuthRad);

  // Apparent ground coverage: panel projection + shadow cast
  const panelGroundFootprint = panelWidth * Math.cos(tiltRad);
  const effectiveShadowBand = Math.abs(shadowPerpendicular) + (panelGroundFootprint * 0.5);

  // Shaded fraction across repeating row pitch (rowSpacing)
  // Gaps between rows allow direct sun penetration
  const groundShadedRatio = Math.min(0.92, Math.max(0.08, effectiveShadowBand / rowSpacing));

  // Diffuse light transmittance: clouds scatter light, softening harsh shadows
  const diffuseFraction = Math.min(0.85, 0.2 + (cloudCover / 100) * 0.6);
  const directTransmittance = 1 - groundShadedRatio;

  // Overall ground sunlight percentage reaches the crops
  // Even in shadow, crops receive diffuse sky radiation
  const groundSunlightPercent = Math.min(100, Math.round(
    ((directTransmittance * (1 - diffuseFraction)) + diffuseFraction) * 100
  ));

  // Row-by-Row Sunlight Distribution (4 representative crop rows under & between structures)
  // Row 1: Direct underneath the panel stilt line
  // Row 2: Inner canopy margin (partial shade)
  // Row 3: Inter-row sun corridor (open sky lane)
  // Row 4: Outer row receiving periodic angle sweeps
  const diffuseBase = diffuseFraction * 100;

  // Dynamic light per row based on sun position and shadow projection
  const shadowCenterOffset = shadowPerpendicular;
  const rowPositions = [-rowSpacing * 0.35, -rowSpacing * 0.1, rowSpacing * 0.15, rowSpacing * 0.4];

  const rowLightDistribution = rowPositions.map((pos) => {
    const distToShadowCenter = Math.abs(pos - (shadowCenterOffset % rowSpacing));
    const shadowWidthHalf = effectiveShadowBand * 0.5;

    let rowDirectSun = 1.0;
    if (distToShadowCenter < shadowWidthHalf) {
      // In primary umbra/penumbra
      rowDirectSun = Math.max(0.12, (distToShadowCenter / shadowWidthHalf) * 0.7);
    }

    const rowPercent = Math.round(diffuseBase + (rowDirectSun * (100 - diffuseBase)));
    return Math.max(10, Math.min(100, rowPercent));
  });

  // Categorize each row status
  // 🟢 High (>75%), 🟡 Moderate (50-75%), 🟠 Low (30-50%), 🔴 Excessive shading (<30%)
  const rowStatus = rowLightDistribution.map((pct) => {
    if (pct >= 75) return 'high';
    if (pct >= 50) return 'moderate';
    if (pct >= 30) return 'low';
    return 'excessive';
  });

  // Photosynthetically Active Radiation (PAR) estimate in µmol/m²/s
  // 1 W/m² solar irradiance ≈ 2.1 µmol/m²/s PAR in solar spectrum
  const fullPAR = ambientRadiation * 2.1;
  const parUnderPanels = Math.round(fullPAR * (diffuseFraction * 0.75));
  const parBetweenPanels = Math.round(fullPAR * (0.95 - (groundShadedRatio * 0.2)));

  return {
    shadowLength: Number(rawShadowLength.toFixed(2)),
    shadowOffset: Number(shadowPerpendicular.toFixed(2)),
    groundShadedRatio: Number(groundShadedRatio.toFixed(3)),
    groundSunlightPercent,
    rowLightDistribution,
    rowStatus,
    parUnderPanels,
    parBetweenPanels
  };
}
