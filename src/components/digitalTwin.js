/**
 * Interactive Farm Digital Twin Component
 * Renders the living agri-voltaic farm:
 * SUN -> SOLAR PANELS -> SHADOW -> CROPS
 * High-performance responsive SVG rendering with smooth real-time kinematics.
 */

import { t } from '../data/i18n.js';

export function renderDigitalTwinSVG({
  sunElevationDeg = 45,
  sunAzimuthDeg = 180,
  panelTiltDeg = 25,
  panelHeight = 3.0,
  panelSpacing = 2.5,
  rowSpacing = 4.0,
  cloudCover = 25,
  cropId = 'tomato',
  growthStageId = 'flowering',
  groundLightPercent = 84,
  shadowLength = 3.2,
  shadowOffset = 1.8,
  hour = 12
}) {
  // SVG canvas bounds
  const width = 800;
  const height = 460;
  const groundY = 380;

  // Calculate sun position in the sky dome (arc from 6am to 6pm)
  // Hour 6 -> x = 60, y = 320; Hour 12 -> x = 400, y = 70; Hour 18 -> x = 740, y = 320
  const normalizedHour = Math.max(6, Math.min(18, hour));
  const sunProgress = (normalizedHour - 6) / 12; // 0 to 1
  const sunX = 80 + (sunProgress * 640);
  // Parabolic sun elevation arc
  const sunArcFactor = Math.sin(sunProgress * Math.PI);
  const sunY = Math.max(60, 360 - (sunArcFactor * 300) - (Math.min(30, sunElevationDeg * 0.4)));

  // Panel physical scaling: 1m ≈ 40px
  const scale = 36;
  const pixelHeight = Math.min(180, Math.max(70, panelHeight * scale));
  const panelCenterX = 400;
  const panelCenterY = groundY - pixelHeight;

  // Stilt positions
  const stiltLeftX = panelCenterX - 45;
  const stiltRightX = panelCenterX + 45;

  // Ground shadow projection
  // Offset depends on sun relative to zenith
  const sunDx = sunX - panelCenterX;
  const shadowDir = sunDx > 0 ? -1 : 1;
  const shadowPixelLength = Math.min(260, Math.max(40, (shadowLength || 3.0) * scale * 0.7));
  const shadowStartX = panelCenterX - (shadowPixelLength * 0.5) - (shadowOffset * scale * 0.3);
  const shadowEndX = shadowStartX + shadowPixelLength;

  // Crop styling
  const cropColor = groundLightPercent > 70 ? '#2F7D4F' : groundLightPercent > 45 ? '#4A7C59' : '#3E5C46';
  const fruitColor = cropId === 'tomato' ? '#E63946' : cropId === 'maize' ? '#F7C948' : '#8FCF64';

  // Sky color based on time of day & clouds
  let skyTop = '#102638';
  let skyBottom = '#9ED4EC';
  if (hour < 7 || hour > 17) {
    skyTop = '#1E293B';
    skyBottom = '#F59E0B'; // Sunrise/Sunset golden hour
  } else if (cloudCover > 60) {
    skyTop = '#475569';
    skyBottom = '#94A3B8'; // Overcast
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" class="digital-twin-svg" aria-label="Interactive Agri-Voltaics Digital Twin">
      <defs>
        <!-- Sky Gradient -->
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${skyTop}" />
          <stop offset="100%" stop-color="${skyBottom}" />
        </linearGradient>

        <!-- Ground Soil Gradient -->
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A3525" />
          <stop offset="25%" stop-color="#362417" />
          <stop offset="100%" stop-color="#21150C" />
        </linearGradient>

        <!-- Sun Glow Filter -->
        <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <!-- Sunlight Cone Gradient -->
        <linearGradient id="sunbeamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFE066" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#F7C948" stop-opacity="0.04" />
        </linearGradient>

        <!-- Panel Shading Gradient -->
        <linearGradient id="pvCellGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1E3A8A" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>

      <!-- Background Sky -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#skyGrad)" rx="16" />

      <!-- Celestial Sun Path Arc (Dotted Reference) -->
      <path d="M 80 340 Q 400 40 720 340" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="5,6" opacity="0.3" />

      <!-- Sunlight Rays / Beam downwards -->
      ${sunElevationDeg > 5 ? `
        <polygon points="${sunX},${sunY} ${Math.max(0, panelCenterX - 220)},${groundY} ${Math.min(width, panelCenterX + 220)},${groundY}" fill="url(#sunbeamGrad)" />
      ` : ''}

      <!-- Animated Sun -->
      <g transform="translate(${sunX}, ${sunY})">
        <circle cx="0" cy="0" r="32" fill="#F7C948" filter="url(#sunGlow)" />
        <circle cx="0" cy="0" r="26" fill="#FFFBEB" />
        <!-- Sun Rays -->
        <g stroke="#F7C948" stroke-width="3" stroke-linecap="round" opacity="0.8">
          <line x1="0" y1="-44" x2="0" y2="-36" />
          <line x1="0" y1="36" x2="0" y2="44" />
          <line x1="-44" y1="0" x2="-36" y2="0" />
          <line x1="36" y1="0" x2="44" y2="0" />
          <line x1="-31" y1="-31" x2="-25" y2="-25" />
          <line x1="25" y1="25" x2="31" y2="31" />
          <line x1="-31" y1="31" x2="-25" y2="25" />
          <line x1="25" y1="-25" x2="31" y2="-31" />
        </g>
        <text x="0" y="4" font-size="11" font-weight="bold" fill="#123B2A" text-anchor="middle" font-family="sans-serif">${hour.toFixed(0)}:00</text>
      </g>

      <!-- Cloud Layer (if cloudCover > 10) -->
      ${cloudCover > 10 ? `
        <g opacity="${Math.min(0.85, cloudCover / 100)}" fill="#FFFFFF">
          <ellipse cx="260" cy="110" rx="65" ry="24" />
          <ellipse cx="300" cy="98" rx="55" ry="28" />
          <ellipse cx="340" cy="115" rx="50" ry="20" />
          <ellipse cx="550" cy="140" rx="75" ry="26" />
          <ellipse cx="590" cy="128" rx="60" ry="30" />
        </g>
      ` : ''}

      <!-- Horizon Distant Trees & Farmland -->
      <path d="M 0 380 Q 180 370 360 380 Q 560 368 800 380 L 800 380 L 0 380 Z" fill="#1E4731" opacity="0.6" />

      <!-- Ground Soil Bed -->
      <rect x="0" y="${groundY}" width="${width}" height="${height - groundY}" fill="url(#groundGrad)" />
      <!-- Turf / Topsoil line -->
      <line x1="0" y1="${groundY}" x2="${width}" y2="${groundY}" stroke="#2F7D4F" stroke-width="4" />

      <!-- Dynamic Ground Cast Shadow -->
      ${sunElevationDeg > 2 ? `
        <ellipse cx="${(shadowStartX + shadowEndX) / 2}" cy="${groundY + 4}"
                 rx="${Math.max(20, (shadowEndX - shadowStartX) / 2)}" ry="10"
                 fill="#000000" opacity="${Math.max(0.18, 0.45 * (1 - cloudCover / 150))}" />
      ` : ''}

      <!-- Agri-Voltaic Mounting Stilts / Pylons (Clearance Height) -->
      <!-- Left Stilt -->
      <line x1="${stiltLeftX}" y1="${groundY}" x2="${stiltLeftX}" y2="${panelCenterY}" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <circle cx="${stiltLeftX}" cy="${groundY}" r="5" fill="#334155" />
      <!-- Right Stilt -->
      <line x1="${stiltRightX}" y1="${groundY}" x2="${stiltRightX}" y2="${panelCenterY}" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <circle cx="${stiltRightX}" cy="${groundY}" r="5" fill="#334155" />
      <!-- Cross Truss Bracing -->
      <line x1="${stiltLeftX}" y1="${groundY - 30}" x2="${stiltRightX}" y2="${panelCenterY + 20}" stroke="#94A3B8" stroke-width="2.5" opacity="0.6" />
      <line x1="${stiltRightX}" y1="${groundY - 30}" x2="${stiltLeftX}" y2="${panelCenterY + 20}" stroke="#94A3B8" stroke-width="2.5" opacity="0.6" />

      <!-- Height Clearance Dimension Marker -->
      <line x1="${stiltLeftX - 35}" y1="${groundY}" x2="${stiltLeftX - 35}" y2="${panelCenterY}" stroke="#F7C948" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="${stiltLeftX - 42}" y1="${groundY}" x2="${stiltLeftX - 28}" y2="${groundY}" stroke="#F7C948" stroke-width="1.5" />
      <line x1="${stiltLeftX - 42}" y1="${panelCenterY}" x2="${stiltLeftX - 28}" y2="${panelCenterY}" stroke="#F7C948" stroke-width="1.5" />
      <text x="${stiltLeftX - 48}" y="${(groundY + panelCenterY) / 2 + 4}" font-size="11" font-weight="bold" fill="#F7C948" text-anchor="end" font-family="sans-serif">${panelHeight}m</text>

      <!-- Solar Panel Array Assembly (Rotated at panelTiltDeg) -->
      <g transform="translate(${panelCenterX}, ${panelCenterY}) rotate(${-panelTiltDeg})">
        <!-- Structural Bracket Pivot -->
        <circle cx="0" cy="0" r="9" fill="#F7C948" stroke="#123B2A" stroke-width="2.5" />

        <!-- Panel Frame -->
        <rect x="-140" y="-18" width="280" height="36" rx="6" fill="#0F172A" stroke="#9ED4EC" stroke-width="3" />

        <!-- PV Solar Cells (Bifacial) -->
        <g fill="url(#pvCellGrad)">
          <rect x="-132" y="-14" width="48" height="28" rx="2" />
          <rect x="-78" y="-14" width="48" height="28" rx="2" />
          <rect x="-24" y="-14" width="48" height="28" rx="2" />
          <rect x="30" y="-14" width="48" height="28" rx="2" />
          <rect x="84" y="-14" width="48" height="28" rx="2" />
        </g>

        <!-- Cell Busbars -->
        <line x1="-132" y1="0" x2="132" y2="0" stroke="#9ED4EC" stroke-width="1" opacity="0.6" />
        <line x1="-108" y1="-14" x2="-108" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="-54" y1="-14" x2="-54" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="0" y1="-14" x2="0" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="54" y1="-14" x2="54" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />
        <line x1="108" y1="-14" x2="108" y2="14" stroke="#9ED4EC" stroke-width="1" opacity="0.5" />

        <!-- Angle Badge Indicator -->
        <text x="148" y="4" font-size="12" font-weight="bold" fill="#F7C948" font-family="sans-serif">${panelTiltDeg}°</text>
      </g>

      <!-- Agricultural Crops Growing Beneath Solar System -->
      <!-- 4 Representative Rows -->
      <!-- Row 1: x = 240 (Direct under left structure) -->
      ${renderCropRowSVG(240, groundY, cropColor, fruitColor, cropId, growthStageId, `${t('row')} 1`)}
      <!-- Row 2: x = 340 (Under panel array center) -->
      ${renderCropRowSVG(340, groundY, cropColor, fruitColor, cropId, growthStageId, `${t('row')} 2`)}
      <!-- Row 3: x = 460 (Under panel array right) -->
      ${renderCropRowSVG(460, groundY, cropColor, fruitColor, cropId, growthStageId, `${t('row')} 3`)}
      <!-- Row 4: x = 560 (Inter-row corridor / open sky) -->
      ${renderCropRowSVG(560, groundY, cropColor, fruitColor, cropId, growthStageId, `${t('row')} 4`)}

      <!-- Ground Sunlight Indicator Ribbon -->
      <g transform="translate(400, 440)">
        <rect x="-140" y="-14" width="280" height="24" rx="12" fill="#123B2A" stroke="#2F7D4F" stroke-width="1.5" />
        <circle cx="-120" cy="-2" r="5" fill="#8FCF64" />
        <text x="0" y="2" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">
          ${t('canopySunlight')}: ${groundLightPercent}% • ${t('shadow')}: ${shadowLength}m
        </text>
      </g>
    </svg>
  `;
}

function renderCropRowSVG(x, baseY, leafColor, fruitColor, cropId, stage, label) {
  // SVG drawing of healthy agricultural crops
  return `
    <g transform="translate(${x}, ${baseY})">
      <!-- Mounded Row Earth -->
      <ellipse cx="0" cy="0" rx="36" ry="6" fill="#2E1C0C" />

      <!-- Main Stems and Foliage -->
      <path d="M 0 0 Q -8 -22 -18 -38 Q -6 -28 0 -12 Q 6 -28 18 -38 Q 8 -22 0 0" fill="${leafColor}" />
      <path d="M 0 -10 Q -15 -35 -28 -48 Q -10 -40 -3 -20 Q 10 -40 28 -48 Q 15 -35 0 -10" fill="${leafColor}" />
      <path d="M 0 -22 Q -12 -52 -22 -66 Q -4 -50 0 -30 Q 4 -50 22 -66 Q 12 -52 0 -22" fill="${leafColor}" />

      <!-- Fruit / Flower sets (if applicable) -->
      ${cropId === 'tomato' ? `
        <circle cx="-12" cy="-35" r="5.5" fill="${fruitColor}" />
        <circle cx="10" cy="-28" r="5" fill="${fruitColor}" />
        <circle cx="-4" cy="-52" r="4" fill="${fruitColor}" />
      ` : cropId === 'maize' ? `
        <rect x="-3" y="-55" width="6" height="16" rx="3" fill="${fruitColor}" />
        <path d="M 0 -58 L -4 -66 M 0 -58 L 4 -66" stroke="#D97706" stroke-width="1.5" />
      ` : ''}

      <!-- Row Label -->
      <text x="0" y="16" font-size="10" font-weight="600" fill="#9ED4EC" text-anchor="middle" font-family="sans-serif">${label}</text>
    </g>
  `;
}
