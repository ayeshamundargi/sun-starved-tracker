/**
 * Automatic Solar-Panel Positioning & Dual-Axis Actuator Kinematics Display
 * Complete implementation of Specification 6 & Advanced Visual Agrivoltaics HUD:
 * - High-Fidelity 3D/Isometric Agrivoltaic Physical Model (ViewBox 800x480)
 * - Elevated 3.5m Steel Stanchion with Ground Tomato Crops
 * - Telescoping Linear Actuator Hydraulic Piston (Physically extends/retracts with tilt)
 * - Dynamic Ground Shading Projection & Crop PAR Light Penetration
 * - Mode Effects: Rain Runoff Drainage Droplets, Storm Stow Aerodynamic Streamlines, Solar Photons
 * - Dual Cockpit Gauges: Precision Elevation Arc Gauge + Compass Azimuth Tracker
 * - One-Click Angle Presets (0° Stow, 15° Morning, 30° Rain, 35° Sweet Spot, 50° Afternoon, 70° Max PAR)
 * - Industrial Latching Emergency Stop (E-Stop)
 * - Multi-Language i18n support
 */

import { getIotState } from '../services/iotEngine.js';
import { t } from '../data/i18n.js';

export function renderPositioningViewHTML() {
  const iot = getIotState();
  const angle = iot.panelAngleDeg;
  const target = iot.targetAngleDeg;
  const isEstop = iot.isEmergencyStopped;
  const isMoving = iot.isMoving;
  const mode = iot.automationMode;

  // Physical Kinematics Calculations
  const strokeMm = Math.round((angle / 75) * 450 + 50); // 50mm to 500mm
  const groundShadePercent = Math.round(Math.cos((angle * Math.PI) / 180) * 68); // 68% at 0°, ~20% at 75°
  const cropParPercent = Math.round(100 - groundShadePercent * 0.75); // light reaching crops
  const parFlux = Math.round(350 + (angle / 75) * 650); // µmol/m²/s
  const aerodynamicDragCoeff = (Math.sin((angle * Math.PI) / 180) * 1.1 + 0.12).toFixed(2);
  const windThrustN = Math.round(0.5 * 1.225 * Math.pow(iot.windSpeedKmh / 3.6, 2) * 8.5 * parseFloat(aerodynamicDragCoeff));

  return `
    <div class="positioning-view-container">
      <!-- Actuator Header Strip -->
      <div class="card positioning-hero-card ${isEstop ? 'hero-stopped' : ''}">
        <div class="pos-hero-left">
          <div class="actuator-dial-badge ${isEstop ? 'dial-danger' : isMoving ? 'dial-moving' : ''}">
            <span class="dial-val">${angle.toFixed(1)}°</span>
            <span class="dial-lbl">${t('panelAngle', 'CURRENT TILT')}</span>
          </div>
          <div>
            <div class="pos-status-title">
              <strong>${isEstop ? '🛑 ' + t('posEstopActive', 'EMERGENCY STOP ENGAGED') : '⚡ DUAL-AXIS AGRIVOLTAIC ACTUATOR #01'}</strong>
              <span class="badge ${isEstop ? 'badge-danger' : isMoving ? 'badge-warning' : 'badge-success'}">
                ${isEstop ? 'INTERLOCKED & HALTED' : isMoving ? '⚡ ACTUATING PISTON...' : '✓ OPTICAL ENCODER LOCKED'}
              </span>
            </div>
            <p class="text-xs text-muted" style="margin-top:0.25rem;">
              Target: <strong class="text-primary">${target.toFixed(1)}°</strong> · Mechanical Limits: 0.0° (Flat Stow) to 75.0° (Max Steep) · Stroke: <strong>${strokeMm} mm / 500 mm</strong>
            </p>
          </div>
        </div>

        <div class="pos-hero-right">
          ${isEstop ? `
            <button id="btn-reset-estop" class="btn btn-sm btn-primary">
              ✓ Reset E-Stop Safety Interlock
            </button>
          ` : `
            <button id="btn-trigger-estop" class="btn btn-sm btn-danger btn-estop">
              🛑 EMERGENCY STOP (E-STOP)
            </button>
          `}
        </div>
      </div>

      <!-- Main Interactive Display: 3D Agrivoltaic Physical Kinematics Stage -->
      <div class="card visualizer-master-card">
        <div class="card-header-with-action">
          <div class="vis-header-left">
            <div class="pulse-indicator-dot ${isMoving ? 'moving' : 'locked'}"></div>
            <div>
              <h3>📐 Physical Agrivoltaics Kinematics & Crop Light Simulator</h3>
              <p class="text-xs text-muted">
                Interactive dual-axis solar canopy overhead with ground crops, extending hydraulic piston, and live shadow projection.
              </p>
            </div>
          </div>
          <div class="vis-header-badges">
            <span class="badge badge-hardware">[OPTICAL ENCODER ±0.05°]</span>
            <span class="badge badge-accent">MODE: ${mode}</span>
          </div>
        </div>

        <!-- Master SVG Kinematics Stage -->
        <div class="agrivoltaic-stage-wrap">
          ${renderHighTechAgrivoltaicSVG(angle, target, mode, strokeMm, groundShadePercent, parFlux, iot)}
        </div>

        <!-- Telemetry HUD Bar (Below SVG) -->
        <div class="kinematics-hud-bar">
          <div class="hud-pill">
            <span class="hud-icon">📐</span>
            <div class="hud-data">
              <span class="hud-lbl">Panel Tilt Angle</span>
              <strong class="hud-val text-accent">${angle.toFixed(1)}°</strong>
              <small class="hud-sub">Target: ${target.toFixed(1)}°</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">🔩</span>
            <div class="hud-data">
              <span class="hud-lbl">Hydraulic Piston Stroke</span>
              <strong class="hud-val text-primary">${strokeMm} mm</strong>
              <small class="hud-sub">Load: 1.84 kN Thrust</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">🌱</span>
            <div class="hud-data">
              <span class="hud-lbl">Crop PAR Light</span>
              <strong class="hud-val text-success">${parFlux} µmol</strong>
              <small class="hud-sub">${cropParPercent}% Sunlight Received</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">🌾</span>
            <div class="hud-data">
              <span class="hud-lbl">Ground Shading Area</span>
              <strong class="hud-val">${groundShadePercent}%</strong>
              <small class="hud-sub">Root Moisture: ${iot.soilMoisture}%</small>
            </div>
          </div>

          <div class="hud-pill">
            <span class="hud-icon">💨</span>
            <div class="hud-data">
              <span class="hud-lbl">Wind Load On Array</span>
              <strong class="hud-val ${windThrustN > 800 ? 'text-danger' : ''}">${windThrustN} N</strong>
              <small class="hud-sub">Drag Coeff: Cd ${aerodynamicDragCoeff}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Cockpit Instruments & Control Center Grid -->
      <div class="pos-main-grid">

        <!-- Left: Dual Precision Gauges + Live Sensors -->
        <div class="card gauges-sensors-card">
          <div class="card-header-clean">
            <h3>🧭 Dual Precision Actuator Telemetry Cockpit</h3>
            <span class="badge badge-info">Closed-Loop Servo</span>
          </div>

          <div class="cockpit-gauges-row">
            <!-- Semi-Circular Elevation Dial -->
            <div class="gauge-box">
              <div class="gauge-title">TILT ELEVATION ANGLE (0°–75°)</div>
              ${renderElevationGaugeSVG(angle, target)}
              <div class="gauge-footer-tags">
                <span class="tag-zone stow">0° Stow</span>
                <span class="tag-zone opt">35° AI Opt</span>
                <span class="tag-zone steep">75° Max</span>
              </div>
            </div>

            <!-- Azimuth Compass -->
            <div class="gauge-box">
              <div class="gauge-title">SOLAR AZIMUTH TRACKER (360°)</div>
              ${renderAzimuthCompassSVG(198.5)}
              <div class="gauge-footer-tags">
                <span class="tag-zone azimuth">Azimuth: 198.5° SSW</span>
                <span class="tag-zone">Tracking Sol</span>
              </div>
            </div>
          </div>

          <!-- Real-Time Environmental Sensors Feeds -->
          <div class="sensor-feed-strip" style="margin-top:1.25rem;">
            <div class="sensor-feed-pill">
              <span class="s-icon">☀️</span>
              <div>
                <div class="s-label">Solar Irradiance (GHI)</div>
                <strong>${iot.irradianceWpm2} W/m²</strong>
              </div>
            </div>

            <div class="sensor-feed-pill">
              <span class="s-icon">🌧️</span>
              <div>
                <div class="s-label">Precipitation Rain Gauge</div>
                <strong>${iot.rainfallMm} mm</strong>
              </div>
            </div>

            <div class="sensor-feed-pill">
              <span class="s-icon">💨</span>
              <div>
                <div class="s-label">Anemometer Wind Speed</div>
                <strong>${iot.windSpeedKmh} km/h</strong>
              </div>
            </div>

            <div class="sensor-feed-pill">
              <span class="s-icon">💧</span>
              <div>
                <div class="s-label">Soil Root Moisture</div>
                <strong>${iot.soilMoisture}% TDR</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Multi-Mode Governor & Tactile Angle Controller -->
        <div class="card mode-governor-card">
          <div class="card-header-clean">
            <h3>⚙️ Closed-Loop Operating Mode Governor</h3>
            <span class="badge badge-hardware">Safety Interlocked</span>
          </div>

          <div class="mode-buttons-stack">
            <!-- Mode 1: AI Sweet Spot -->
            <button class="mode-select-card ${mode === 'AI_SWEET_SPOT' ? 'selected' : ''}" data-modename="AI_SWEET_SPOT">
              <div class="m-card-header">
                <span class="mode-led ${mode === 'AI_SWEET_SPOT' ? 'led-on-green' : ''}"></span>
                <span class="m-icon">✨</span>
                <strong>AI Sweet Spot Balanced (35.0°)</strong>
              </div>
              <p class="m-card-desc">
                Pareto optimal balance: Generates 2,840W electricity while streaming 940 µmol PAR sunlight directly to tomato flowers.
              </p>
            </button>

            <!-- Mode 2: Rain Runoff -->
            <button class="mode-select-card ${mode === 'RAIN_RUNOFF' ? 'selected' : ''}" data-modename="RAIN_RUNOFF">
              <div class="m-card-header">
                <span class="mode-led ${mode === 'RAIN_RUNOFF' ? 'led-on-blue' : ''}"></span>
                <span class="m-icon">🌧️</span>
                <strong>Rain Runoff Drainage Mode (${iot.schedulerConfig.rainAngleDeg}°)</strong>
              </div>
              <p class="m-card-desc">
                Tilts to ${iot.schedulerConfig.rainAngleDeg}° to guide heavy rainwater away from root zones into swales, preventing erosion.
              </p>
            </button>

            <!-- Mode 3: Storm Stow -->
            <button class="mode-select-card ${mode === 'STORM_STOW' ? 'selected' : ''}" data-modename="STORM_STOW">
              <div class="m-card-header">
                <span class="mode-led ${mode === 'STORM_STOW' ? 'led-on-red' : ''}"></span>
                <span class="m-icon">🌪️</span>
                <strong>Storm Protective Stow (0.0° Flat)</strong>
              </div>
              <p class="m-card-desc">
                Locks array flat against wind shear gusts (&gt;45 km/h). Reduces mechanical drag by 86% and locks actuator brakes.
              </p>
            </button>

            <!-- Mode 4: Manual Override -->
            <button class="mode-select-card ${mode === 'MANUAL' ? 'selected' : ''}" data-modename="MANUAL">
              <div class="m-card-header">
                <span class="mode-led ${mode === 'MANUAL' ? 'led-on-amber' : ''}"></span>
                <span class="m-icon">🛠️</span>
                <strong>Manual Operator Override</strong>
              </div>
              <p class="m-card-desc">
                Manual motor positioning for maintenance, washing, or harvesting clearances. Requires security challenge.
              </p>
            </button>
          </div>

          <!-- Quick Angle Presets & Manual Slider -->
          <div class="manual-override-box">
            <div class="override-top-row">
              <label for="manual-actuator-slider" style="font-weight:800; font-size:0.88rem;">
                🎯 Quick Angle Presets & Tactile Slider:
              </label>
              <span id="manual-slider-val" class="angle-badge-value">${angle.toFixed(1)}°</span>
            </div>

            <!-- Instant One-Click Presets -->
            <div class="angle-presets-grid">
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="0">🌪️ 0° Stow</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="15">🌅 15° AM</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="30">🌧️ 30° Rain</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="35">✨ 35° Opt</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="50">☀️ 50° PM</button>
              <button class="btn btn-xs btn-preset btn-angle-preset" data-angle="70">🌾 70° PAR</button>
            </div>

            <input
              type="range"
              id="manual-actuator-slider"
              min="0"
              max="75"
              step="0.5"
              value="${angle}"
              class="slider w-100"
              style="margin: 0.85rem 0 0.4rem 0;"
            />

            <div class="slider-scale-ticks">
              <span>0° (Flat Stow)</span>
              <span>30° (Rain)</span>
              <span>35° (Sweet Spot)</span>
              <span>75° (Max Steep)</span>
            </div>

            <button id="btn-apply-manual-angle" class="btn btn-sm btn-primary w-100" style="margin-top:0.85rem;">
              🔒 Apply Angle Override (Security Re-Auth Required)
            </button>
          </div>
        </div>
      </div>

      <!-- Movement History Table (Specification 6) -->
      <div class="card history-card" style="margin-top:1.25rem;">
        <div class="card-header-with-action">
          <div>
            <h3>📜 Actuator Movement & Positioning Audit Trail</h3>
            <p class="text-xs text-muted">Complete closed-loop encoder log of automatic triggers, sensor thresholds, and manual adjustments.</p>
          </div>
          <span class="badge badge-subtle">Recorded Events: ${iot.actuatorHistory.length}</span>
        </div>

        <div class="audit-table-wrap">
          <table class="audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Tilted Angle</th>
                <th>Hydraulic Stroke</th>
                <th>Environmental Trigger Rationale</th>
                <th>Actuator Encoder Status</th>
              </tr>
            </thead>
            <tbody>
              ${iot.actuatorHistory.map(h => `
                <tr>
                  <td class="text-xs font-mono">${h.time}</td>
                  <td><strong class="text-primary">${h.angle}°</strong></td>
                  <td class="text-xs font-mono">${Math.round((h.angle / 75) * 450 + 50)} mm</td>
                  <td class="text-sm">${h.reason}</td>
                  <td><span class="badge badge-success">✓ Encoder Locked</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the Master 3D/Isometric Agrivoltaic Physical Simulation SVG (ViewBox 800x480)
 */
function renderHighTechAgrivoltaicSVG(angle, target, mode, strokeMm, shadePercent, parFlux, iot) {
  // Pivot point for solar array
  const cx = 400;
  const cy = 210;

  // Piston geometry
  // Lower actuator anchor on the vertical mast: (375, 340)
  // Torque arm anchor on the rotating panel beam:
  const rad = ((angle) * Math.PI) / 180;
  // Torque arm is offset 90px to the left of pivot on panel underside
  const armLen = 95;
  const armAngle = Math.PI - 0.45 - rad;
  const armX = cx - Math.cos(rad) * 90;
  const armY = cy - Math.sin(rad) * 90 + 20;

  // Shadow projection parameters on ground (y = 420)
  const shadowWidth = Math.max(120, Math.cos(rad) * 380);
  const shadowX = cx - shadowWidth / 2 + Math.sin(rad) * 40;

  // Sun position angle
  const sunElev = Math.max(25, 75 - angle * 0.4);
  const sunX = cx + Math.cos((sunElev * Math.PI) / 180) * 310;
  const sunY = 90 - Math.sin((sunElev * Math.PI) / 180) * 40;

  return `
    <svg viewBox="0 0 800 480" class="agrivoltaic-master-svg" aria-label="3D Agrivoltaic Kinematics Stage">
      <defs>
        <!-- Sky Gradient -->
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0F2438"/>
          <stop offset="60%" stop-color="#163C4D"/>
          <stop offset="100%" stop-color="#2D5A46"/>
        </linearGradient>

        <!-- Ground Soil Gradient -->
        <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5C4033"/>
          <stop offset="30%" stop-color="#4A3525"/>
          <stop offset="100%" stop-color="#2D2018"/>
        </linearGradient>

        <!-- Steel Superstructure Mast Gradient -->
        <linearGradient id="steelMastGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#64748B"/>
          <stop offset="50%" stop-color="#94A3B8"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>

        <!-- Chrome Piston Gradient -->
        <linearGradient id="chromePistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E2E8F0"/>
          <stop offset="45%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#94A3B8"/>
        </linearGradient>

        <!-- Solar Bifacial Glass Surface Gradient -->
        <linearGradient id="bifacialGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284C7"/>
          <stop offset="40%" stop-color="#0369A1"/>
          <stop offset="85%" stop-color="#075985"/>
          <stop offset="100%" stop-color="#0C4A6E"/>
        </linearGradient>

        <!-- Solar Cells Sheen Filter -->
        <linearGradient id="sunbeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(245, 158, 11, 0.45)"/>
          <stop offset="100%" stop-color="rgba(245, 158, 11, 0.0)"/>
        </linearGradient>

        <!-- Crop Shadow Filter -->
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(0, 0, 0, 0.65)"/>
          <stop offset="80%" stop-color="rgba(0, 0, 0, 0.35)"/>
          <stop offset="100%" stop-color="rgba(0, 0, 0, 0)"/>
        </radialGradient>
      </defs>

      <!-- Background Atmosphere -->
      <rect x="0" y="0" width="800" height="480" fill="url(#skyGrad)"/>

      <!-- Ambient Grid Background Lines -->
      <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
        <line x1="0" y1="120" x2="800" y2="120"/>
        <line x1="0" y1="240" x2="800" y2="240"/>
        <line x1="0" y1="360" x2="800" y2="360"/>
        <line x1="200" y1="0" x2="200" y2="480"/>
        <line x1="400" y1="0" x2="400" y2="480"/>
        <line x1="600" y1="0" x2="600" y2="480"/>
      </g>

      <!-- Ground Soil Layer (y = 420 to 480) -->
      <rect x="0" y="420" width="800" height="60" fill="url(#soilGrad)"/>
      <line x1="0" y1="420" x2="800" y2="420" stroke="#78350F" stroke-width="2"/>

      <!-- Dynamic Ground Shadow projected beneath panel -->
      <ellipse cx="${shadowX + shadowWidth/2}" cy="425" rx="${shadowWidth/2}" ry="14" fill="url(#shadowGrad)"/>

      <!-- Tomato Crops Rows Beneath Elevated Panel -->
      <g class="crop-canopy-rows">
        ${renderCropRowSVG(80, 420, 1.0)}
        ${renderCropRowSVG(170, 420, 1.1)}
        ${renderCropRowSVG(260, 420, 1.2)}
        ${renderCropRowSVG(350, 420, 1.25)}
        ${renderCropRowSVG(440, 420, 1.25)}
        ${renderCropRowSVG(530, 420, 1.2)}
        ${renderCropRowSVG(620, 420, 1.1)}
        ${renderCropRowSVG(710, 420, 1.0)}
      </g>

      <!-- Structural Ground Foundation Concrete Footings -->
      <rect x="360" y="410" width="80" height="15" rx="3" fill="#64748B" stroke="#334155" stroke-width="1.5"/>
      <circle cx="370" cy="417" r="3" fill="#1E293B"/>
      <circle cx="430" cy="417" r="3" fill="#1E293B"/>

      <!-- Elevated 3.5m Steel Stanchion Post (H-Beam Mast) -->
      <rect x="388" y="210" width="24" height="202" fill="url(#steelMastGrad)" stroke="#334155" stroke-width="1.5"/>
      <!-- Diagonal Gusset Bracing -->
      <line x1="388" y1="360" x2="350" y2="410" stroke="#475569" stroke-width="4"/>
      <line x1="412" y1="360" x2="450" y2="410" stroke="#475569" stroke-width="4"/>
      <!-- Stanchion Height Tag -->
      <text x="424" y="320" font-size="10" fill="#94A3B8" font-family="monospace">3.5m Agrivoltaic Clearance</text>

      <!-- Radiant Sun in Sky -->
      <g transform="translate(${sunX}, ${sunY})">
        <!-- Sun Corona -->
        <circle cx="0" cy="0" r="36" fill="rgba(245, 158, 11, 0.25)"/>
        <circle cx="0" cy="0" r="24" fill="rgba(251, 191, 36, 0.5)"/>
        <circle cx="0" cy="0" r="16" fill="#FDE047"/>
        <!-- Sun Rays -->
        <g stroke="#F59E0B" stroke-width="2" opacity="0.75">
          <line x1="0" y1="-26" x2="0" y2="-34"/>
          <line x1="0" y1="26" x2="0" y2="34"/>
          <line x1="-26" y1="0" x2="-34" y2="0"/>
          <line x1="26" y1="0" x2="34" y2="0"/>
          <line x1="-18" y1="-18" x2="-24" y2="-24"/>
          <line x1="18" y1="18" x2="24" y2="24"/>
          <line x1="-18" y1="18" x2="-24" y2="24"/>
          <line x1="18" y1="-18" x2="24" y2="-24"/>
        </g>
      </g>

      <!-- Sun Beams shining onto array surface -->
      <polygon points="${sunX},${sunY} ${cx - Math.cos(rad)*190},${cy - Math.sin(rad)*190} ${cx + Math.cos(rad)*190},${cy + Math.sin(rad)*190}" fill="url(#sunbeamGrad)" opacity="0.5"/>

      <!-- Telescoping Hydraulic Linear Actuator Piston -->
      <!-- Piston Lower Mast Pivot Anchor (376, 340) -->
      <circle cx="376" cy="340" r="6" fill="#1E293B" stroke="#94A3B8" stroke-width="2"/>
      <!-- Outer Hydraulic Cylinder Tube -->
      <line x1="376" y1="340" x2="${376 + (armX - 376)*0.5}" y2="${340 + (armY - 340)*0.5}" stroke="#1E293B" stroke-width="14" stroke-linecap="round"/>
      <line x1="376" y1="340" x2="${376 + (armX - 376)*0.5}" y2="${340 + (armY - 340)*0.5}" stroke="#475569" stroke-width="10" stroke-linecap="round"/>
      <!-- Extending Chrome Rod -->
      <line x1="${376 + (armX - 376)*0.45}" y1="${340 + (armY - 340)*0.45}" x2="${armX}" y2="${armY}" stroke="url(#chromePistonGrad)" stroke-width="6" stroke-linecap="round"/>
      <!-- Piston Rod End Clevis Joint -->
      <circle cx="${armX}" cy="${armY}" r="5" fill="#F8FAFC" stroke="#0F172A" stroke-width="2"/>

      <!-- Central Pivot Bearing (400, 210) -->
      <circle cx="${cx}" cy="${cy}" r="14" fill="#1E293B" stroke="#CBD5E1" stroke-width="2.5"/>
      <circle cx="${cx}" cy="${cy}" r="6" fill="#475569"/>

      <!-- ROTATING SOLAR ARRAY (Tilted by -angle around cx, cy) -->
      <g transform="rotate(-${angle}, ${cx}, ${cy})">
        <!-- Structural Torque Tube Backing -->
        <rect x="${cx - 210}" y="${cy - 8}" width="420" height="16" rx="4" fill="#334155" stroke="#1E293B" stroke-width="2"/>

        <!-- Underside Bifacial Reflective Layer -->
        <rect x="${cx - 200}" y="${cy + 6}" width="400" height="5" fill="#38BDF8" opacity="0.6"/>

        <!-- High-Efficiency Bifacial Solar Module -->
        <rect x="${cx - 200}" y="${cy - 20}" width="400" height="24" rx="4" fill="url(#bifacialGlassGrad)" stroke="#0284C7" stroke-width="2.5"/>

        <!-- Photovoltaic Silicon Cell Grid Lines -->
        <g stroke="#38BDF8" stroke-width="1.5" opacity="0.75">
          <line x1="${cx - 160}" y1="${cy - 20}" x2="${cx - 160}" y2="${cy + 4}"/>
          <line x1="${cx - 120}" y1="${cy - 20}" x2="${cx - 120}" y2="${cy + 4}"/>
          <line x1="${cx - 80}" y1="${cy - 20}" x2="${cx - 80}" y2="${cy + 4}"/>
          <line x1="${cx - 40}" y1="${cy - 20}" x2="${cx - 40}" y2="${cy + 4}"/>
          <line x1="${cx}" y1="${cy - 20}" x2="${cx}" y2="${cy + 4}"/>
          <line x1="${cx + 40}" y1="${cy - 20}" x2="${cx + 40}" y2="${cy + 4}"/>
          <line x1="${cx + 80}" y1="${cy - 20}" x2="${cx + 80}" y2="${cy + 4}"/>
          <line x1="${cx + 120}" y1="${cy - 20}" x2="${cx + 120}" y2="${cy + 4}"/>
          <line x1="${cx + 160}" y1="${cy - 20}" x2="${cx + 160}" y2="${cy + 4}"/>
        </g>

        <!-- Anodized Aluminum Clamp Flanges -->
        <rect x="${cx - 204}" y="${cy - 22}" width="8" height="28" rx="2" fill="#E2E8F0"/>
        <rect x="${cx + 196}" y="${cy - 22}" width="8" height="28" rx="2" fill="#E2E8F0"/>

        <!-- Solar Normal Vector (Optical perpendicular indicator) -->
        <line x1="${cx}" y1="${cy - 20}" x2="${cx}" y2="${cy - 110}" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="5 3"/>
        <polygon points="${cx},${cy - 120} ${cx - 5},${cy - 108} ${cx + 5},${cy - 108}" fill="#F59E0B"/>
        <text x="${cx + 12}" y="${cy - 85}" font-size="11" fill="#F59E0B" font-weight="bold">Optic Normal ➔</text>
      </g>

      <!-- TARGET GHOST OUTLINE (if different from current angle) -->
      ${Math.abs(angle - target) > 0.8 ? `
        <g transform="rotate(-${target}, ${cx}, ${cy})" opacity="0.38">
          <rect x="${cx - 200}" y="${cy - 20}" width="400" height="24" rx="4" fill="#94A3B8" stroke="#F8FAFC" stroke-width="2" stroke-dasharray="6 3"/>
          <text x="${cx}" y="${cy - 30}" font-size="12" fill="#FFFFFF" text-anchor="middle" font-weight="bold">TARGET (${target.toFixed(1)}°)</text>
        </g>
      ` : ''}

      <!-- MODE-SPECIFIC VISUAL FX OVERLAYS -->
      <!-- 1. RAIN RUNOFF MODE: Water droplets draining down glass into anti-erosion swale -->
      ${(mode === 'RAIN_RUNOFF' || iot.rainfallMm > 2) ? `
        <g class="rain-fx-layer">
          <!-- Rain streaks in air -->
          <line x1="280" y1="60" x2="270" y2="140" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <line x1="360" y1="40" x2="350" y2="120" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <line x1="480" y1="50" x2="470" y2="130" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <line x1="560" y1="70" x2="550" y2="150" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="10 20" opacity="0.7"/>
          <!-- Droplets on panel drainage edge -->
          <circle cx="${cx - Math.cos(rad)*195}" cy="${cy - Math.sin(rad)*195}" r="4" fill="#38BDF8"/>
          <circle cx="${cx - Math.cos(rad)*195 - 6}" cy="${cy - Math.sin(rad)*195 + 16}" r="3" fill="#38BDF8" opacity="0.7"/>
          <!-- Water runoff banner tag -->
          <rect x="60" y="385" width="220" height="24" rx="4" fill="rgba(14, 165, 233, 0.9)"/>
          <text x="170" y="401" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
            💧 Directed Runoff ➔ Anti-Erosion Swale
          </text>
        </g>
      ` : ''}

      <!-- 2. STORM STOW MODE: Aerodynamic laminar flow arrows skimming flat horizontal profile -->
      ${(mode === 'STORM_STOW' || angle < 4) ? `
        <g class="wind-stow-fx">
          <!-- Wind streamlines over horizontal module -->
          <path d="M 120,${cy - 35} Q 400,${cy - 45} 680,${cy - 35}" fill="none" stroke="#22D3EE" stroke-width="3" stroke-dasharray="12 6" opacity="0.85"/>
          <path d="M 100,${cy - 50} Q 400,${cy - 65} 700,${cy - 50}" fill="none" stroke="#67E8F9" stroke-width="2" stroke-dasharray="8 6" opacity="0.6"/>
          <!-- Laminar drag tag -->
          <rect x="520" y="150" width="230" height="26" rx="4" fill="rgba(6, 182, 212, 0.9)"/>
          <text x="635" y="167" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
            🌪️ Flat Laminar Stow (Drag -86%)
          </text>
        </g>
      ` : ''}

      <!-- 3. AI SWEET SPOT MODE: Optimal Photosynthetic and Photovoltaic Energy Balance -->
      ${mode === 'AI_SWEET_SPOT' ? `
        <g class="sweetspot-fx">
          <rect x="540" y="55" width="230" height="30" rx="6" fill="rgba(34, 197, 94, 0.9)"/>
          <text x="655" y="74" font-size="11" fill="#FFFFFF" font-weight="bold" text-anchor="middle">
            ✨ AI SWEET SPOT (PAR: ${parFlux} µmol)
          </text>
        </g>
      ` : ''}

      <!-- Primary Angle HUD Centerpiece Callout -->
      <g transform="translate(60, 45)">
        <rect x="0" y="0" width="165" height="46" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#38BDF8" stroke-width="1.5"/>
        <text x="14" y="20" font-size="10" fill="#94A3B8" font-weight="bold" font-family="monospace">OPTICAL POSITION</text>
        <text x="14" y="38" font-size="18" fill="#38BDF8" font-weight="900" font-family="monospace">${angle.toFixed(1)}° TILT</text>
      </g>
    </svg>
  `;
}

/**
 * Renders small tomato crop cluster with fruit and foliage
 */
function renderCropRowSVG(x, groundY, scale = 1.0) {
  return `
    <g transform="translate(${x}, ${groundY}) scale(${scale})">
      <!-- Soil mound -->
      <ellipse cx="0" cy="0" rx="35" ry="6" fill="#3E2723"/>
      <!-- Green foliage clusters -->
      <circle cx="-14" cy="-18" r="16" fill="#2E7D32"/>
      <circle cx="14" cy="-18" r="16" fill="#2E7D32"/>
      <circle cx="0" cy="-28" r="18" fill="#388E3C"/>
      <circle cx="-8" cy="-36" r="12" fill="#43A047"/>
      <circle cx="8" cy="-36" r="12" fill="#4CAF50"/>
      <!-- Tomato fruits -->
      <circle cx="-10" cy="-14" r="5" fill="#E53935"/>
      <circle cx="12" cy="-12" r="5.5" fill="#E53935"/>
      <circle cx="2" cy="-22" r="4.5" fill="#EF5350"/>
      <!-- Leaf stems -->
      <path d="M 0,0 L 0,-24" stroke="#1B5E20" stroke-width="2.5"/>
    </g>
  `;
}

/**
 * Precision Elevation Arc Gauge (0° to 75°)
 */
function renderElevationGaugeSVG(angle, target) {
  // Arc angle from 180° (0° tilt) to 105° (75° tilt)
  const arcSweep = (angle / 75) * 110;
  const needleAngle = 180 - (angle / 75) * 110;

  return `
    <svg viewBox="0 0 200 125" class="elevation-gauge-svg">
      <!-- Outer Track Background -->
      <path d="M 25,100 A 75,75 0 0,1 175,100" fill="none" stroke="#334155" stroke-width="12" stroke-linecap="round"/>

      <!-- Safe/Rain/Sweet Spot Zone Highlights -->
      <!-- Stow (0°-5°): Cyan -->
      <path d="M 25,100 A 75,75 0 0,1 32,80" fill="none" stroke="#06B6D4" stroke-width="12"/>
      <!-- Sweet Spot (25°-40°): Green -->
      <path d="M 60,45 A 75,75 0 0,1 98,26" fill="none" stroke="#22C55E" stroke-width="12"/>
      <!-- Rain (28°-32°): Blue -->
      <path d="M 72,38 A 75,75 0 0,1 84,31" fill="none" stroke="#0284C7" stroke-width="12"/>

      <!-- Needle Pointer -->
      <g transform="rotate(${180 - needleAngle}, 100, 100)">
        <polygon points="100,32 96,100 104,100" fill="#F7C948"/>
        <circle cx="100" cy="100" r="8" fill="#1E293B" stroke="#F7C948" stroke-width="2.5"/>
      </g>

      <!-- Center Digital Degree Display -->
      <text x="100" y="88" font-size="18" fill="#F8FAFC" font-weight="900" text-anchor="middle" font-family="monospace">
        ${angle.toFixed(1)}°
      </text>
      <text x="100" y="104" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">
        ACTUATOR TILT
      </text>
    </svg>
  `;
}

/**
 * Solar Azimuth Compass Gauge (360°)
 */
function renderAzimuthCompassSVG(azimuth = 198.5) {
  return `
    <svg viewBox="0 0 200 125" class="azimuth-compass-svg">
      <!-- Compass Outer Dial Ring -->
      <circle cx="100" cy="62" r="50" fill="none" stroke="#334155" stroke-width="2.5"/>
      <circle cx="100" cy="62" r="42" fill="none" stroke="#1E293B" stroke-width="1" stroke-dasharray="3 3"/>

      <!-- Cardinal Direction Ticks -->
      <text x="100" y="24" font-size="9" fill="#EF4444" font-weight="bold" text-anchor="middle">N</text>
      <text x="150" y="65" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">E</text>
      <text x="100" y="106" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">S</text>
      <text x="50" y="65" font-size="9" fill="#94A3B8" font-weight="bold" text-anchor="middle">W</text>

      <!-- Azimuth Vector Needle (Rotated around 100, 62) -->
      <g transform="rotate(${azimuth}, 100, 62)">
        <polygon points="100,24 96,62 104,62" fill="#F59E0B"/>
        <polygon points="100,98 97,62 103,62" fill="#64748B"/>
        <circle cx="100" cy="62" r="5" fill="#0F172A"/>
      </g>

      <!-- Digital Readout -->
      <text x="100" y="120" font-size="10" fill="#38BDF8" font-weight="bold" text-anchor="middle" font-family="monospace">
        ${azimuth}° SSW
      </text>
    </svg>
  `;
}
