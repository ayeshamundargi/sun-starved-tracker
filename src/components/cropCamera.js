/**
 * Crop Health Camera Monitoring Module
 * - 3 Daily Captures: Morning, Afternoon, Night (with low-light / infrared mode)
 * - Configurable capture schedules and camera locations (Zone A, Zone B, Inverter Canopy)
 * - Live webcam capture via getUserMedia + file upload + preset agrivoltaic field scans
 * - AI Crop Condition Assessment: Health score, confidence, symptoms, bounding box overlays
 * - Daily Timeline Comparison: Morning vs Afternoon vs Night side-by-side
 */

import { t } from '../data/i18n.js';

// Pre-packaged realistic agrivoltaic SVG / Canvas captures for the 3 daily slots
export const DAILY_TIMELINE_PRESETS = {
  morning: {
    slot: 'Morning (07:30 AM)',
    period: '06:00 AM - 10:00 AM',
    time: 'Today, 07:30 AM',
    camera: 'Camera #1 (Zone A - South Tomato Trellis)',
    crop: 'Tomato (Arka Rakshak)',
    mode: 'Visible Spectrum (Morning Dew & Stomatal Opening)',
    healthScore: 94,
    confidence: '95.8%',
    condition: 'Optimal Morning Vigor',
    symptoms: 'None. Leaves fully turgid with early morning dew evaporation.',
    leafColoration: 'Vibrant Chlorophyll Emerald (#2F7D4F)',
    ambientTemp: '20.4°C',
    canopyTemp: '19.8°C',
    lightReceived: '92% PAR (Panel tilted 45° to let morning sun through)',
    // Base64 or styled SVG representation
    type: 'morning'
  },
  afternoon: {
    slot: 'Afternoon (01:15 PM)',
    period: '11:00 AM - 03:00 PM',
    time: 'Today, 01:15 PM',
    camera: 'Camera #1 (Zone A - South Tomato Trellis)',
    crop: 'Tomato (Arka Rakshak)',
    mode: 'Visible Spectrum (Peak Irradiance & Transpiration)',
    healthScore: 91,
    confidence: '94.2%',
    condition: 'Healthy Under-Array Shade Protection',
    symptoms: 'No scorch or curling. Panel partial shading reduced leaf temperature by 3.8°C.',
    leafColoration: 'Rich Forest Green (#276749)',
    ambientTemp: '28.6°C',
    canopyTemp: '24.8°C (-3.8°C cooling effect)',
    lightReceived: '82% PAR (Sweet spot 35° tilt preventing photo-inhibition)',
    type: 'afternoon'
  },
  night: {
    slot: 'Night (10:00 PM)',
    period: '08:00 PM - 05:00 AM',
    time: 'Yesterday, 10:00 PM',
    camera: 'Camera #1 (Zone A - South Tomato Trellis)',
    crop: 'Tomato (Arka Rakshak)',
    mode: 'Infrared (IR) / Low-Light Thermal Night Vision',
    healthScore: 95,
    confidence: '96.5%',
    condition: 'Nocturnal Canopy Rest & Respiration',
    symptoms: 'Optimal thermal uniformity. No fungal condensation or cold-stress patches.',
    leafColoration: 'Monochrome IR Reflectance (NDVI Equivalent 0.82)',
    ambientTemp: '18.2°C',
    canopyTemp: '18.9°C (Soil heat retention under panels)',
    lightReceived: '0% PAR (Nocturnal Dark Period)',
    type: 'night'
  }
};

export function renderCropTimelineView(activeSlot = 'morning', cameraSettings = {}) {
  const currentItem = DAILY_TIMELINE_PRESETS[activeSlot] || DAILY_TIMELINE_PRESETS.morning;

  return `
    <div class="crop-camera-container">
      <!-- Camera Configuration Bar -->
      <div class="card camera-config-strip">
        <div class="config-item">
          <label class="config-label">📷 Active Camera Unit</label>
          <select id="camera-select" class="form-select">
            <option value="cam-1" ${cameraSettings.selectedCamera === 'cam-1' ? 'selected' : ''}>Camera 1: Zone A (Tomato Trellis - South)</option>
            <option value="cam-2" ${cameraSettings.selectedCamera === 'cam-2' ? 'selected' : ''}>Camera 2: Zone B (Maize Intercrop - North)</option>
            <option value="cam-3" ${cameraSettings.selectedCamera === 'cam-3' ? 'selected' : ''}>Camera 3: Inverter Canopy Under-Array</option>
          </select>
        </div>
        <div class="config-item">
          <label class="config-label">🌱 Monitored Crop</label>
          <select id="camera-crop-select" class="form-select">
            <option value="tomato">Tomato (Solanum lycopersicum)</option>
            <option value="maize">Maize / Sweet Corn (Zea mays)</option>
            <option value="lettuce">Leafy Greens / Spinach</option>
          </select>
        </div>
        <div class="config-item">
          <label class="config-label">⏰ Capture Schedule</label>
          <div class="schedule-pill-group">
            <span class="badge badge-subtle">🌅 Morning: 07:30</span>
            <span class="badge badge-subtle">☀️ Afternoon: 13:15</span>
            <span class="badge badge-subtle">🌙 Night: 22:00</span>
          </div>
        </div>
      </div>

      <!-- 3-Slot Daily Timeline Navigation -->
      <div class="timeline-slot-picker">
        <button class="slot-tab-btn ${activeSlot === 'morning' ? 'active' : ''}" data-slot="morning">
          <div class="slot-icon">🌅</div>
          <div class="slot-meta">
            <div class="slot-title">1. MORNING CAPTURE</div>
            <div class="slot-time">07:30 AM (Dew & Vigor)</div>
          </div>
          <span class="slot-score-tag score-good">Score: 94</span>
        </button>

        <button class="slot-tab-btn ${activeSlot === 'afternoon' ? 'active' : ''}" data-slot="afternoon">
          <div class="slot-icon">☀️</div>
          <div class="slot-meta">
            <div class="slot-title">2. AFTERNOON CAPTURE</div>
            <div class="slot-time">01:15 PM (Anti-Scorch)</div>
          </div>
          <span class="slot-score-tag score-good">Score: 91</span>
        </button>

        <button class="slot-tab-btn ${activeSlot === 'night' ? 'active' : ''}" data-slot="night">
          <div class="slot-icon">🌙</div>
          <div class="slot-meta">
            <div class="slot-title">3. NIGHT CAPTURE (IR)</div>
            <div class="slot-time">10:00 PM (Infrared Respiration)</div>
          </div>
          <span class="slot-score-tag score-good">Score: 95</span>
        </button>
      </div>

      <!-- Main Camera Viewport & Live Assessment Grid -->
      <div class="camera-main-grid">
        <!-- Visualizer Frame -->
        <div class="card viewport-card">
          <div class="viewport-header">
            <div class="viewport-title-group">
              <span class="live-dot pulse"></span>
              <strong>${currentItem.slot}</strong>
              <span class="badge ${activeSlot === 'night' ? 'badge-ir' : 'badge-live'}">
                ${activeSlot === 'night' ? '🔭 INFRARED LOW-LIGHT NV' : '📷 OPTICAL 4K SENSOR'}
              </span>
            </div>
            <div class="viewport-actions">
              <button id="btn-trigger-webcam" class="btn btn-sm btn-secondary" title="Open Local Device Camera">
                📷 Open Webcam
              </button>
              <label class="btn btn-sm btn-secondary btn-file-label" title="Upload Custom Photo">
                📁 Upload Photo
                <input type="file" id="camera-file-input" accept="image/*" style="display:none;" />
              </label>
              <button id="btn-toggle-anomaly-mask" class="btn btn-sm btn-accent" title="Highlight Leaf Diagnostic Areas">
                🎯 Toggle AI Mask
              </button>
            </div>
          </div>

          <!-- Video / Canvas Feed -->
          <div class="viewport-stage ${activeSlot === 'night' ? 'stage-night-ir' : ''}" id="camera-viewport-stage">
            <div id="webcam-live-container" style="display:none; width:100%; height:100%; position:relative;">
              <video id="live-camera-video" autoplay playsinline style="width:100%; height:100%; object-fit:cover; border-radius:12px;"></video>
              <button id="btn-snap-photo" class="btn btn-sm btn-primary" style="position:absolute; bottom:15px; left:50%; transform:translateX(-50%); z-index:10;">
                📸 Snap Frame
              </button>
            </div>

            <div id="sample-photo-container" style="width:100%; height:100%; position:relative;">
              ${renderFieldPhotoSVG(activeSlot)}
              <div id="ai-anomaly-overlay" class="anomaly-overlay" style="display: block;">
                ${renderAnomalyOverlaySVG(activeSlot)}
              </div>
            </div>
          </div>

          <!-- Timestamp watermark footer -->
          <div class="viewport-footer">
            <span>📅 ${currentItem.time}</span>
            <span>📍 ${currentItem.camera}</span>
            <span>🌡️ Canopy Temp: <strong>${currentItem.canopyTemp}</strong></span>
          </div>
        </div>

        <!-- AI Condition Assessment Panel -->
        <div class="card assessment-card">
          <div class="assessment-header">
            <h3>🌱 AI Leaf Condition Diagnostic</h3>
            <span class="badge badge-success">AI Confidence: ${currentItem.confidence}</span>
          </div>

          <div class="score-hero">
            <div class="score-circle">
              <span class="score-val">${currentItem.healthScore}</span>
              <span class="score-lbl">/ 100</span>
            </div>
            <div class="score-text">
              <div class="score-status-text">${currentItem.condition}</div>
              <div class="score-subtext">${currentItem.symptoms}</div>
            </div>
          </div>

          <div class="metric-tiles-grid">
            <div class="metric-tile">
              <span class="tile-icon">🍃</span>
              <div class="tile-content">
                <span class="tile-label">Leaf Chlorophyll Color</span>
                <span class="tile-val">${currentItem.leafColoration}</span>
              </div>
            </div>

            <div class="metric-tile">
              <span class="tile-icon">☀️</span>
              <div class="tile-content">
                <span class="tile-label">Sunlight Under Solar Panels</span>
                <span class="tile-val">${currentItem.lightReceived}</span>
              </div>
            </div>

            <div class="metric-tile">
              <span class="tile-icon">🌡️</span>
              <div class="tile-content">
                <span class="tile-label">Microclimate Thermal Offset</span>
                <span class="tile-val">${currentItem.ambientTemp} Ambient vs ${currentItem.canopyTemp}</span>
              </div>
            </div>

            <div class="metric-tile">
              <span class="tile-icon">💧</span>
              <div class="tile-content">
                <span class="tile-label">Stomatal Transpiration</span>
                <span class="tile-val">${activeSlot === 'night' ? 'Resting (Nocturnal Respiration)' : 'High Vigorous (Dew Active)'}</span>
              </div>
            </div>
          </div>

          <!-- Agronomic AI Recommendation -->
          <div class="agronomic-tip-box">
            <div class="tip-title">🤖 Agrivoltaic Decision Recommendation</div>
            <p class="tip-desc">
              ${activeSlot === 'morning'
                ? 'Morning light penetration is optimal at 45° tilt. Early sun activates photosynthesis while avoiding ground moisture loss.'
                : activeSlot === 'afternoon'
                ? 'Midday panel angle of 35° effectively shields crops from intense direct radiation. Leaf surface temperature is 3.8°C lower than unshaded reference plants.'
                : 'Night infrared scan reveals uniform leaf temperature without cold spots or mildew condensation. Inverter panels act as a mild radiative blanket preventing ground frost.'
              }
            </p>
          </div>

          <!-- Quick Test Sample Switches -->
          <div class="sample-switcher-bar">
            <span class="text-xs text-muted">Test Diagnostics:</span>
            <button class="btn btn-xs btn-outline" id="btn-sample-healthy">Healthy Canopy</button>
            <button class="btn btn-xs btn-outline" id="btn-sample-wilting">Wilting / Sun-Scorch</button>
            <button class="btn btn-xs btn-outline" id="btn-sample-shade">Low Sunlight Etiolation</button>
          </div>
        </div>
      </div>

      <!-- Side-by-Side 3-Capture Daily Comparison Strip -->
      <div class="card timeline-strip-card">
        <h4 style="margin-bottom: 0.75rem;">📅 Daily 3-Period Evolution (Morning ➔ Afternoon ➔ Night)</h4>
        <div class="strip-columns-grid">
          <div class="strip-col ${activeSlot === 'morning' ? 'col-active' : ''}">
            <div class="strip-label">🌅 MORNING (07:30 AM)</div>
            <div class="strip-thumb strip-morning">
              <span>Dew Active · 94/100</span>
            </div>
            <p class="strip-desc">Vigorous chlorophyll response with sunrise solar tracking.</p>
          </div>
          <div class="strip-col ${activeSlot === 'afternoon' ? 'col-active' : ''}">
            <div class="strip-label">☀️ AFTERNOON (01:15 PM)</div>
            <div class="strip-thumb strip-afternoon">
              <span>Cooling Shade · 91/100</span>
            </div>
            <p class="strip-desc">Anti-scorch solar shading prevents canopy wilting.</p>
          </div>
          <div class="strip-col ${activeSlot === 'night' ? 'col-active' : ''}">
            <div class="strip-label">🌙 NIGHT IR (10:00 PM)</div>
            <div class="strip-thumb strip-night">
              <span>Infrared NV · 95/100</span>
            </div>
            <p class="strip-desc">Thermal retention beneath panels shields against night chill.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Generate high-resolution agricultural vector scenes for the 3 daily slots
function renderFieldPhotoSVG(slot) {
  if (slot === 'night') {
    // Night Infrared Low-Light Scene
    return `
      <svg viewBox="0 0 640 400" class="crop-photo-svg" style="background:#0F172A;">
        <defs>
          <filter id="irGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <!-- Night sky -->
        <rect width="640" height="400" fill="#0A0F1D" />
        <!-- Low-light IR Scan Lines -->
        <pattern id="scanlines" width="640" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="640" y2="0" stroke="rgba(34, 197, 94, 0.08)" stroke-width="1"/>
        </pattern>
        <rect width="640" height="400" fill="url(#scanlines)" />
        
        <!-- Overhead Solar Panel Structure silhouette in IR -->
        <rect x="80" y="30" width="480" height="45" rx="4" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.6"/>
        <line x1="160" y1="75" x2="160" y2="280" stroke="#334155" stroke-width="3"/>
        <line x1="480" y1="75" x2="480" y2="280" stroke="#334155" stroke-width="3"/>

        <!-- Ground Soil IR false-color -->
        <rect x="0" y="270" width="640" height="130" fill="#111827"/>
        
        <!-- Tomato Crop Plants Glowing in Infrared Thermal Wavelength -->
        <g filter="url(#irGlow)">
          <!-- Plant 1 -->
          <path d="M120 280 Q 140 230 110 190 Q 150 170 170 210 Q 190 260 170 280 Z" fill="#22C55E" opacity="0.85"/>
          <circle cx="130" cy="205" r="9" fill="#10B981"/>
          <circle cx="155" cy="235" r="8" fill="#10B981"/>

          <!-- Plant 2 (Center) -->
          <path d="M280 280 Q 260 210 320 160 Q 360 210 330 240 Q 350 260 340 280 Z" fill="#4ADE80" opacity="0.95"/>
          <circle cx="310" cy="180" r="11" fill="#22C55E"/>
          <circle cx="340" cy="210" r="9" fill="#22C55E"/>
          <circle cx="280" cy="230" r="10" fill="#22C55E"/>

          <!-- Plant 3 -->
          <path d="M460 280 Q 480 220 440 180 Q 500 170 510 210 Q 520 250 500 280 Z" fill="#22C55E" opacity="0.85"/>
          <circle cx="475" cy="195" r="9" fill="#10B981"/>
        </g>
        
        <!-- Thermal Legend HUD -->
        <rect x="20" y="20" width="160" height="24" rx="4" fill="rgba(0,0,0,0.7)"/>
        <text x="28" y="36" fill="#4ADE80" font-size="11" font-family="monospace">IR THERMAL: 18.9°C</text>
      </svg>
    `;
  }

  if (slot === 'afternoon') {
    // Afternoon High-Noon with Dynamic Panel Shading
    return `
      <svg viewBox="0 0 640 400" class="crop-photo-svg" style="background:#E0F2FE;">
        <!-- Clear Sky -->
        <rect width="640" height="260" fill="url(#afternoonSkyGrad)"/>
        <defs>
          <linearGradient id="afternoonSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="100%" stop-color="#BAE6FD"/>
          </linearGradient>
        </defs>

        <!-- Sun Beam Angle -->
        <polygon points="320,0 200,400 480,400" fill="rgba(255,255,255,0.18)"/>

        <!-- Agri-voltaic Canopy overhead (Tilted 35°) -->
        <polygon points="120,40 520,70 510,95 110,65" fill="#1E293B" stroke="#0284C7" stroke-width="2"/>
        <rect x="130" y="45" width="85" height="18" fill="#0284C7" opacity="0.8"/>
        <rect x="225" y="52" width="85" height="18" fill="#0284C7" opacity="0.8"/>
        <rect x="320" y="59" width="85" height="18" fill="#0284C7" opacity="0.8"/>
        <rect x="415" y="66" width="85" height="18" fill="#0284C7" opacity="0.8"/>

        <!-- Structural Steel Stilts -->
        <line x1="200" y1="50" x2="200" y2="280" stroke="#64748B" stroke-width="4"/>
        <line x1="440" y1="65" x2="440" y2="280" stroke="#64748B" stroke-width="4"/>

        <!-- Ground Soil -->
        <rect x="0" y="270" width="640" height="130" fill="#451A03"/>

        <!-- Diffuse Partial Shadow On Ground (Protective microclimate) -->
        <polygon points="180,270 460,270 480,400 160,400" fill="rgba(0,0,0,0.22)"/>

        <!-- Healthy Lush Tomato Plants Under Shade -->
        <!-- Plant 1 (Left) -->
        <path d="M120 280 Q 90 230 130 180 Q 170 170 160 220 Q 180 260 160 280 Z" fill="#15803D"/>
        <circle cx="125" cy="205" r="8" fill="#DC2626"/>

        <!-- Plant 2 (Protected Center) -->
        <path d="M260 280 Q 230 200 290 150 Q 350 140 340 200 Q 360 240 330 280 Z" fill="#16A34A"/>
        <circle cx="280" cy="180" r="10" fill="#DC2626"/>
        <circle cx="315" cy="200" r="9" fill="#DC2626"/>
        <circle cx="265" cy="225" r="9" fill="#EA580C"/>

        <!-- Plant 3 (Right) -->
        <path d="M440 280 Q 420 210 470 170 Q 520 180 500 230 Q 510 260 480 280 Z" fill="#15803D"/>
        <circle cx="465" cy="195" r="9" fill="#DC2626"/>

        <!-- Sun Badge -->
        <circle cx="560" cy="50" r="28" fill="#FBBF24"/>
      </svg>
    `;
  }

  // Morning Scene (Golden sunrise, dew, gentle angle)
  return `
    <svg viewBox="0 0 640 400" class="crop-photo-svg" style="background:#FEF3C7;">
      <defs>
        <linearGradient id="morningSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FDE68A"/>
          <stop offset="100%" stop-color="#FEF08A"/>
        </linearGradient>
      </defs>
      <!-- Sunrise Horizon -->
      <rect width="640" height="260" fill="url(#morningSky)"/>
      <circle cx="100" cy="130" r="45" fill="#F59E0B" opacity="0.65"/>

      <!-- Agri-voltaic Canopy in Morning Tilt (45°) -->
      <polygon points="180,60 520,30 525,55 185,85" fill="#1E293B" stroke="#0369A1" stroke-width="2"/>
      <line x1="260" y1="65" x2="260" y2="280" stroke="#64748B" stroke-width="4"/>
      <line x1="460" y1="40" x2="460" y2="280" stroke="#64748B" stroke-width="4"/>

      <!-- Soil -->
      <rect x="0" y="270" width="640" height="130" fill="#3E2723"/>

      <!-- Tomato Crop Plants In Morning Dew -->
      <path d="M140 280 Q 110 220 160 170 Q 200 160 190 210 Q 210 250 180 280 Z" fill="#2E7D32"/>
      <circle cx="150" cy="190" r="9" fill="#EF4444"/>

      <!-- Center Plant -->
      <path d="M290 280 Q 250 190 320 140 Q 380 130 370 190 Q 390 230 360 280 Z" fill="#388E3C"/>
      <circle cx="310" cy="170" r="10" fill="#EF4444"/>
      <circle cx="345" cy="190" r="9" fill="#EF4444"/>

      <!-- Right Plant -->
      <path d="M470 280 Q 440 210 490 160 Q 540 170 520 220 Q 530 250 500 280 Z" fill="#2E7D32"/>
      <circle cx="490" cy="185" r="9" fill="#EF4444"/>
    </svg>
  `;
}

// AI Diagnostic Anomaly Bounding Boxes Overlay
function renderAnomalyOverlaySVG(slot) {
  if (slot === 'night') {
    return `
      <svg viewBox="0 0 640 400" class="overlay-svg">
        <rect x="250" y="145" width="130" height="130" fill="none" stroke="#22C55E" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="254" y="140" fill="#22C55E" font-size="11" font-weight="bold" font-family="monospace">✓ CANOPY RESPIRATION: NORMAL</text>
      </svg>
    `;
  }
  return `
    <svg viewBox="0 0 640 400" class="overlay-svg">
      <!-- Bounding Box Zone 1 -->
      <rect x="245" y="130" width="145" height="145" fill="none" stroke="#10B981" stroke-width="2"/>
      <rect x="245" y="110" width="135" height="20" fill="#10B981"/>
      <text x="250" y="124" fill="#FFFFFF" font-size="10" font-weight="bold">HEALTHY CANOPY: 94%</text>

      <!-- Target Point -->
      <circle cx="310" cy="170" r="4" fill="#EF4444"/>
      <line x1="310" y1="160" x2="310" y2="180" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="300" y1="170" x2="320" y2="170" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>
  `;
}
