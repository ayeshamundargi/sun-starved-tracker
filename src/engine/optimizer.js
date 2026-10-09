/**
 * Agri-Voltaics Multi-Objective Optimization Engine
 * Balances Crop Sunlight Requirements vs Solar Energy Generation.
 *
 * Balance Formula:
 * Balance = wCrop × CropScore + wSolar × SolarScore + wShadow × ShadowScore + wWeather × WeatherScore
 * Default Weights: 0.40 Crop, 0.35 Solar, 0.15 Shadow, 0.10 Weather
 */

import { CROPS_DATA } from '../data/crops.js';
import { getSolarPosition, getIncidenceAngle } from './solarGeometry.js';
import { calculateShadowProfile } from './shadowModel.js';

export const DEFAULT_WEIGHTS = {
  crop: 0.40,
  solar: 0.35,
  shadow: 0.15,
  weather: 0.10
};

/**
 * Evaluates a single configuration candidate
 */
export function evaluateConfiguration({
  config,
  cropId,
  growthStageId,
  weather,
  location,
  solarPosition,
  weights = DEFAULT_WEIGHTS
}) {
  const crop = CROPS_DATA[cropId] || CROPS_DATA.tomato;
  const stage = crop.stages.find(s => s.id === growthStageId) || crop.stages[1]; // default vegetative

  // Compute shadow footprint
  const shadow = calculateShadowProfile({
    panelHeight: config.height,
    panelTiltDeg: config.angle,
    panelSpacing: config.spacing,
    rowSpacing: config.rowSpacing || 4.0,
    sunElevDeg: solarPosition.elevationDeg,
    sunAzimuthDeg: solarPosition.azimuthDeg,
    panelAzimuthDeg: config.azimuth || 180,
    cloudCover: weather.cloudCover,
    ambientRadiation: weather.solarRadiation
  });

  // 1. CROP SUNLIGHT SCORE (0 - 100)
  // Target sunlight percentage derived from crop DLI requirement and stage modifier
  const baseTargetLight = Math.min(95, Math.max(50, (crop.idealMinDLI / 28) * 80 * stage.lightMod));
  const groundLight = shadow.groundSunlightPercent;

  let cropScore = 100;
  if (groundLight < baseTargetLight) {
    // Under-light penalty: crops starve without enough PAR
    const lightDeficit = baseTargetLight - groundLight;
    cropScore = Math.max(10, 100 - (lightDeficit * 2.2));
  } else if (groundLight > 90 && weather.temp > crop.heatStressThreshold) {
    // Scorching penalty: extreme heat causes blossom drop and wilt; panels should provide cooling shade!
    const excess = groundLight - 90;
    cropScore = Math.max(20, 100 - (excess * 2.5));
  } else {
    // In optimal range
    const distFromIdeal = Math.abs(groundLight - baseTargetLight);
    cropScore = Math.max(85, 100 - (distFromIdeal * 0.8));
  }

  // 2. SOLAR ENERGY SCORE (0 - 100)
  // Solar potential based on Angle of Incidence (AOI) with sunlight vector
  const aoi = getIncidenceAngle(
    solarPosition.elevationDeg,
    solarPosition.azimuthDeg,
    config.angle,
    config.azimuth || 180
  );

  const cosFactor = Math.max(0, Math.cos((aoi * Math.PI) / 180));
  // Solar capacity in kW
  const totalWatts = (config.panelCount || 20) * (config.wattage || 450);
  const cloudMultiplier = Math.max(0.15, 1 - (weather.cloudCover / 100) * 0.7);
  const estimatedPowerKW = (totalWatts / 1000) * cosFactor * (weather.solarRadiation / 1000) * cloudMultiplier * 0.92;
  const maxPossiblePowerKW = (totalWatts / 1000) * 1.0 * (weather.solarRadiation / 1000) * 0.92;

  // Normalized Solar Score (0 - 100)
  const solarScore = Math.min(100, Math.max(5, Math.round(
    maxPossiblePowerKW > 0 ? (estimatedPowerKW / maxPossiblePowerKW) * 100 : cosFactor * 100
  )));

  // Daily energy estimate in kWh/day (approximated across day integral)
  const estimatedKWhPerDay = Number((estimatedPowerKW * (crop.idealSunHours || 7.5) * 0.82).toFixed(1));

  // 3. SHADOW SCORE (0 - 100)
  // Penalizes severe continuous blockage under crop rows
  const excessiveShadePenalty = shadow.rowStatus.filter(s => s === 'excessive').length * 22;
  const shadowScore = Math.min(100, Math.max(15, Math.round(
    (1 - shadow.groundShadedRatio * 0.5) * 100 - excessiveShadePenalty
  )));

  // 4. WEATHER SCORE (0 - 100)
  // On cloudy days, diffuse light spreads everywhere, so steeper tilt harms solar without helping crops.
  // On scorching days, panel tilt giving shade protects crops.
  let weatherScore = 80;
  if (weather.cloudCover > 60) {
    // Cloud-adaptive: flatter panels capture hemispherical diffuse sky radiation
    const tiltPenalty = (config.angle - 15) * 0.6;
    weatherScore = Math.min(100, Math.max(20, Math.round(95 - Math.max(0, tiltPenalty))));
  } else if (weather.temp > 30) {
    // Hot day: moderate tilt provides beneficial microclimate canopy cooling
    weatherScore = config.angle >= 28 ? 94 : 72;
  } else {
    weatherScore = 88;
  }

  // 5. OVERALL BALANCE SCORE (0 - 100)
  const overallBalance = Math.min(100, Math.max(0, Math.round(
    (weights.crop * cropScore) +
    (weights.solar * solarScore) +
    (weights.shadow * shadowScore) +
    (weights.weather * weatherScore)
  )));

  return {
    config,
    cropScore: Math.round(cropScore),
    solarScore: Math.round(solarScore),
    shadowScore: Math.round(shadowScore),
    weatherScore: Math.round(weatherScore),
    overallBalance,
    groundSunlightPercent: shadow.groundSunlightPercent,
    estimatedPowerKW: Number(estimatedPowerKW.toFixed(2)),
    estimatedKWhPerDay,
    shadow,
    aoi: Number(aoi.toFixed(1))
  };
}

/**
 * Runs client-side multi-objective optimization across candidate parameter space.
 * Generates and evaluates 35+ configurations to find the optimal Sweet Spot.
 */
export function runOptimization({
  currentConfig,
  cropId,
  growthStageId,
  weather,
  location,
  solarPosition,
  weights = DEFAULT_WEIGHTS
}) {
  const candidateAngles = [15, 20, 25, 30, 35, 40, 45, 50, 55];
  const candidateHeights = [2.5, 3.0, 3.5, 4.0];
  const candidateSpacings = [2.0, 2.5, 3.0, 3.5];

  const evaluations = [];

  // Evaluate current setup first
  const currentEval = evaluateConfiguration({
    config: currentConfig,
    cropId,
    growthStageId,
    weather,
    location,
    solarPosition,
    weights
  });

  // Systematically explore candidate configurations
  candidateAngles.forEach((angle) => {
    candidateHeights.forEach((height) => {
      candidateSpacings.forEach((spacing) => {
        const candidateConfig = {
          ...currentConfig,
          angle,
          height,
          spacing,
          rowSpacing: currentConfig.rowSpacing || 4.0
        };

        const res = evaluateConfiguration({
          config: candidateConfig,
          cropId,
          growthStageId,
          weather,
          location,
          solarPosition,
          weights
        });

        evaluations.push(res);
      });
    });
  });

  // Sort candidates by highest Overall Balance Score
  evaluations.sort((a, b) => b.overallBalance - a.overallBalance);

  const best = evaluations[0];
  const runnerUp1 = evaluations[1] || best;
  const runnerUp2 = evaluations[2] || best;

  // Determine What-If presets
  const cropFirst = [...evaluations].sort((a, b) => b.cropScore - a.cropScore)[0];
  const energyFirst = [...evaluations].sort((a, b) => b.solarScore - a.solarScore)[0];
  const stormStow = evaluateConfiguration({
    config: { ...currentConfig, angle: 10, height: currentConfig.height, spacing: currentConfig.spacing },
    cropId,
    growthStageId,
    weather,
    location,
    solarPosition,
    weights
  });

  // Calculate improvement deltas
  const deltas = {
    cropSunlightDelta: best.groundSunlightPercent - currentEval.groundSunlightPercent,
    solarScoreDelta: best.solarScore - currentEval.solarScore,
    balanceDelta: best.overallBalance - currentEval.overallBalance,
    powerDeltaKW: Number((best.estimatedPowerKW - currentEval.estimatedPowerKW).toFixed(2))
  };

  // Generate dynamic explainable AI reasoning
  const explanation = generateExplanation({
    currentEval,
    best,
    cropId,
    growthStageId,
    weather,
    deltas
  });

  // Technical formulation breakdown
  const technicalSummary = {
    formula: `Balance = (${weights.crop} × ${best.cropScore}) + (${weights.solar} × ${best.solarScore}) + (${weights.shadow} × ${best.shadowScore}) + (${weights.weather} × ${best.weatherScore}) = ${best.overallBalance}`,
    weights,
    candidatesEvaluated: evaluations.length,
    paretoFrontier: evaluations.filter(e => e.cropScore >= 75 && e.solarScore >= 75),
    shadowFormula: 'Shadow Length ≈ Height / tan(Sun Elevation)',
    solarFormula: 'Power = P_rated × cos(AOI) × (GHI / 1000) × η_inverter × cloudFactor'
  };

  return {
    current: currentEval,
    recommended: best,
    candidates: [
      { name: 'Configuration A (Recommended)', ...best },
      { name: 'Configuration B (Alternative)', ...runnerUp1 },
      { name: 'Configuration C (Wide Clearance)', ...runnerUp2 }
    ],
    whatIfScenarios: {
      current: currentEval,
      recommended: best,
      cropFirst,
      energyFirst,
      stormStow
    },
    allEvaluations: evaluations,
    deltas,
    explanation,
    technicalSummary
  };
}

/**
 * Generates transparent farmer-friendly explanation dynamically
 */
function generateExplanation({ currentEval, best, cropId, growthStageId, weather, deltas }) {
  const crop = CROPS_DATA[cropId] || CROPS_DATA.tomato;
  const stage = crop.stages.find(s => s.id === growthStageId) || crop.stages[1];

  let reason = '';

  if (best.config.angle !== currentEval.config.angle) {
    if (best.config.angle > currentEval.config.angle) {
      reason += `Tilting panels slightly steeper from ${currentEval.config.angle}° to ${best.config.angle}° allows ${deltas.cropSunlightDelta > 0 ? '+' + deltas.cropSunlightDelta + '%' : ''} more ambient sunlight to stream between the solar rows directly onto the ${crop.name} canopy during its high-demand ${stage.name} phase. `;
    } else {
      reason += `Lowering the tilt from ${currentEval.config.angle}° to ${best.config.angle}° maintains excellent panel irradiance while scattering light evenly to avoid dense shadow bands. `;
    }
  }

  if (best.config.height > currentEval.config.height) {
    reason += `Increasing clearance height to ${best.config.height}m elevates the panel shadow cone, softening ground shadow boundaries and ensuring inner crop rows receive diffuse photosynthetic radiation. `;
  }

  if (weather.cloudCover > 50) {
    reason += `With ${weather.cloudCover}% cloud cover today, scattered light is dominant; this position captures diffuse sunlight from all directions without starving the crop. `;
  } else if (weather.temp > 30) {
    reason += `Under today's high temperature (${weather.temp}°C), this angle creates beneficial microclimate shading during peak afternoon heat, reducing crop water loss and heat stress. `;
  }

  reason += `This strikes the optimal farm balance of ${best.overallBalance}/100, generating ${best.estimatedPowerKW} kW renewable power while preserving peak ${crop.name} productivity.`;

  return reason;
}
