/**
 * Smart Farm Dashboard Component
 * Renders the 13 live-status cards, energy distribution flows,
 * weather-aware smart irrigation controls, real-time IoT activity log,
 * and emergency alert center with audio chimes.
 */

import { getIotState } from '../services/iotEngine.js';
import { getCurrentSession, DEMO_FARMER } from '../services/auth.js';

export function renderDashboardHTML() {
  const iot = getIotState();
  const session = getCurrentSession();
  const farmer = session ? { id: session.farmerId, name: session.farmerName } : DEMO_FARMER;

  // Time format
  const updateSecAgo = Math.max(0, Math.floor((Date.now() - new Date(iot.lastUpdateTime).getTime()) / 1000));

  return `
    <div class="dashboard-page-container">
      <!-- Farmer & System Status Quick Header -->
      <div class="card dash-top-bar">
        <div class="dash-user-info">
          <span class="user-badge-icon">👨‍🌾</span>
          <div>
            <div class="user-greeting">Welcome, <strong>${farmer.name}</strong></div>
            <div class="user-id-sub">Farmer ID: <code class="farmer-code">${farmer.id}</code> · 📍 Vemgal Rural, Kolar</div>
          </div>
        </div>

        <div class="dash-automation-pill-box">
          <span class="badge-label">Active Automation Mode:</span>
          <div class="mode-dropdown-wrap">
            <select id="dash-automation-select" class="form-select mode-select">
              <option value="AI_SWEET_SPOT" ${iot.automationMode === 'AI_SWEET_SPOT' ? 'selected' : ''}>✨ AI Sweet Spot (35° Balanced)</option>
              <option value="CROP_FIRST" ${iot.automationMode === 'CROP_FIRST' ? 'selected' : ''}>🌱 Crop-First Canopy Light (55°)</option>
              <option value="ENERGY_FIRST" ${iot.automationMode === 'ENERGY_FIRST' ? 'selected' : ''}>⚡ Solar-Max Generation (18°)</option>
              <option value="ANTI_SCORCH" ${iot.automationMode === 'ANTI_SCORCH' ? 'selected' : ''}>🛡️ Anti-Scorch Shade Shield (10°)</option>
              <option value="STORM_STOW" ${iot.automationMode === 'STORM_STOW' ? 'selected' : ''}>🌪️ Storm Stow Flat (0° Safe)</option>
              <option value="BATTERY_PRIORITY" ${iot.automationMode === 'BATTERY_PRIORITY' ? 'selected' : ''}>🔋 Battery Rapid Charge (22°)</option>
              <option value="MANUAL" ${iot.automationMode === 'MANUAL' ? 'selected' : ''}>🔧 Manual Operator Control</option>
            </select>
          </div>
        </div>

        <div class="dash-quick-actions">
          <button id="btn-simulate-rain" class="btn btn-sm btn-outline" title="Simulate rainfall event">
            🌧️ Simulate Rain
          </button>
          <button id="btn-toggle-sound" class="btn btn-sm btn-outline" title="Toggle audio chime alerts">
            🔔 Audio Chime: ON
          </button>
        </div>
      </div>

      <!-- Active Emergency Alerts Strip -->
      <div id="dash-alerts-container" class="dash-alerts-area">
        ${renderAlertsHTML(iot.activeAlerts)}
      </div>

      <!-- THE 13 LIVE-STATUS CARDS GRID -->
      <div class="status-cards-grid">

        <!-- Card 1: Solar Panel Status -->
        <div class="card status-card card-panel-status ${iot.solarPanelStatus === 'Working' ? 'border-success' : iot.solarPanelStatus === 'Warning' ? 'border-warning' : 'border-danger'}">
          <div class="card-header-row">
            <span class="card-icon">☀️</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">1. Solar Panel Status</div>
          <div class="card-main-val">
            <span class="status-indicator-dot ${iot.solarPanelStatus === 'Working' ? 'dot-success' : iot.solarPanelStatus === 'Warning' ? 'dot-warning' : 'dot-danger'}"></span>
            <span id="metric-panel-status">${iot.solarPanelStatus}</span>
          </div>
          <div class="card-sub-metric" id="metric-panel-reason">${iot.solarPanelStatusReason}</div>
          <div class="card-footer-controls">
            <button class="btn btn-xs btn-outline btn-panel-toggle" data-status="Working">Working</button>
            <button class="btn btn-xs btn-outline btn-panel-toggle" data-status="Warning">Warning</button>
            <button class="btn btn-xs btn-outline btn-panel-toggle" data-status="Disconnected">Disconnect</button>
          </div>
        </div>

        <!-- Card 2: Solar Energy Today -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">⚡</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">2. Solar Energy Today</div>
          <div class="card-main-val">
            <span id="metric-energy-kwh">${iot.solarEnergyTodayKwh}</span> <span class="metric-unit">kWh</span>
          </div>
          <div class="card-sub-metric">Peak Potential: 24.5 kWh/day · Efficiency: 97.4%</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill" style="width: ${(iot.solarEnergyTodayKwh / 24.5 * 100).toFixed(0)}%;"></div>
          </div>
        </div>

        <!-- Card 3: Current Power Output -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🔆</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">3. Current Power Output</div>
          <div class="card-main-val">
            <span id="metric-power-watts">${iot.solarPowerOutputWatts}</span> <span class="metric-unit">W</span>
          </div>
          <div class="card-sub-metric">Peak Cap: 3,450 W · Bifacial Boost: +12%</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill" style="width: ${(iot.solarPowerOutputWatts / 3450 * 100).toFixed(0)}%;"></div>
          </div>
        </div>

        <!-- Card 4: Battery Charge & Health -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🔋</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">4. Battery SoC & Health</div>
          <div class="card-main-val">
            <span id="metric-battery-soc">${iot.battery.chargePercent}</span><span class="metric-unit">%</span>
            <span class="badge badge-success" style="font-size:0.75rem; margin-left:0.5rem;">${iot.battery.chargingState}</span>
          </div>
          <div class="card-sub-metric">Health: <strong>${iot.battery.healthPercent}%</strong> (${iot.battery.healthStatus}) · 52.8V</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill fill-battery" style="width: ${iot.battery.chargePercent}%;"></div>
          </div>
        </div>

        <!-- Card 5: Estimated Remaining Backup Time -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">⏱️</span>
            <span class="badge badge-source badge-ai">[AI PREDICTION]</span>
          </div>
          <div class="card-metric-title">5. Remaining Backup Time</div>
          <div class="card-main-val">
            <span id="metric-backup-hours">${iot.battery.estimatedBackupHours}</span> <span class="metric-unit">Hours</span>
          </div>
          <div class="card-sub-metric">Powers Drip Pump (450W) + IoT Gateways (40W)</div>
          <span class="text-xs text-success">✓ Zero blackout risk</span>
        </div>

        <!-- Card 6: Crop Health Status -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🌱</span>
            <span class="badge badge-source badge-ai">[AI PREDICTION]</span>
          </div>
          <div class="card-metric-title">6. Crop Health Status</div>
          <div class="card-main-val" style="font-size:1.25rem;">
            <span id="metric-crop-status">${iot.cropHealthStatus}</span>
          </div>
          <div class="card-sub-metric">Comfort Score: <strong>${iot.cropComfortScore}/100</strong> · Light: ${iot.canopyLightFraction}%</div>
          <a href="#camera" class="text-xs" style="color:var(--color-agri-fresh); font-weight:600;">View Camera Diagnostics ➔</a>
        </div>

        <!-- Card 7: Soil Moisture & Temperature -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">💧</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">7. Soil Moisture & Temp</div>
          <div class="card-main-val">
            <span id="metric-soil-moisture">${iot.soilMoisture}</span><span class="metric-unit">%</span>
            <span style="font-size:1.1rem; color:var(--text-secondary); margin-left:0.5rem;">${iot.soilTemperatureC}°C</span>
          </div>
          <div class="card-sub-metric">Optimal Target: 40-60% · Sensor Depth: 15cm</div>
          <div class="card-mini-bar">
            <div class="mini-progress-fill" style="width: ${iot.soilMoisture}%; background:#0284C7;"></div>
          </div>
        </div>

        <!-- Card 8: Rainfall & Weather -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🌦️</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">8. Rainfall & Weather</div>
          <div class="card-main-val">
            <span id="metric-rainfall">${iot.rainfallMm}</span> <span class="metric-unit">mm</span>
          </div>
          <div class="card-sub-metric">${iot.weatherConditionText} · ${iot.ambientTempC}°C · ${iot.windSpeedKmh} km/h</div>
          <span class="text-xs text-muted">Next 3h Rain Prob: ${iot.rainProbabilityNext3h}%</span>
        </div>

        <!-- Card 9: Solar Panel Angle -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">📐</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">9. Solar Panel Tilt Angle</div>
          <div class="card-main-val">
            <span id="metric-panel-angle">${iot.panelAngleDeg}</span><span class="metric-unit">°</span>
          </div>
          <div class="card-sub-metric">Target: ${iot.targetAngleDeg}° · Actuator: Synchronized</div>
          <div class="card-footer-controls">
            <a href="#optimize" class="btn btn-xs btn-outline">Adjust Actuator ⚙️</a>
          </div>
        </div>

        <!-- Card 10: Main Grid Electricity Status -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🔌</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">10. Main Grid Status</div>
          <div class="card-main-val" style="font-size:1.2rem;">
            <span id="metric-grid-status">${iot.gridStatus}</span>
          </div>
          <div class="card-sub-metric">Export Feed: ${iot.gridFeedWatts}W · Farm House Load: ${iot.farmConsumptionWatts}W</div>
          <span class="badge badge-success text-xs">Bi-Directional Net Metered</span>
        </div>

        <!-- Card 11: Network Connectivity -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">📶</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">11. Network Connectivity</div>
          <div class="card-main-val" style="font-size:1.15rem;">
            <span id="metric-network-status">${iot.networkConnectivity}</span>
          </div>
          <div class="card-sub-metric">Signal: ${iot.signalStrengthDbm} dBm · Latency: 42ms</div>
          <span class="badge badge-success text-xs">Local Mesh Active</span>
        </div>

        <!-- Card 12: Active Automation Mode -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">🤖</span>
            <span class="badge badge-source badge-ai">[AI PREDICTION]</span>
          </div>
          <div class="card-metric-title">12. Active Automation</div>
          <div class="card-main-val" style="font-size:1.25rem;">
            <span id="metric-auto-mode">${formatModeName(iot.automationMode)}</span>
          </div>
          <div class="card-sub-metric">Sweet spot balance: Crop PAR 82% | Power 2.8kW</div>
          <span class="badge badge-success text-xs">Closed-Loop AI Governor</span>
        </div>

        <!-- Card 13: Last Sensor Update Time -->
        <div class="card status-card">
          <div class="card-header-row">
            <span class="card-icon">⏱️</span>
            <span class="badge badge-source badge-hardware">[HARDWARE IoT]</span>
          </div>
          <div class="card-metric-title">13. Last Sensor Update</div>
          <div class="card-main-val">
            <span class="live-dot pulse"></span>
            <span id="metric-last-update">${updateSecAgo}s ago</span>
          </div>
          <div class="card-sub-metric">Update Frequency: Every 3 seconds via LoRa/CAN-bus</div>
          <span class="text-xs text-muted">Hardware Clock: ${new Date(iot.lastUpdateTime).toLocaleTimeString()}</span>
        </div>

      </div>

      <!-- WEATHER-AWARE SMART IRRIGATION & POWER FLOW SECTION -->
      <div class="dash-lower-grid">
        <!-- Weather-Aware Irrigation Box -->
        <div class="card irrigation-card">
          <div class="card-header-with-action">
            <div>
              <h3>🌧️ Weather-Aware Smart Irrigation</h3>
              <p class="text-sm text-muted">Suspends irrigation if rain is predicted, preventing crop waterlogging and saving pump electricity.</p>
            </div>
            <span class="badge ${iot.irrigation.pumpState === 'PUMPING' ? 'badge-live' : iot.irrigation.pumpState === 'HELD_RAIN_FORECAST' ? 'badge-cached' : 'badge-subtle'}">
              PUMP: ${iot.irrigation.pumpState}
            </span>
          </div>

          <div class="irrigation-stats-strip">
            <div class="irrig-stat">
              <span class="stat-lbl">Control Mode</span>
              <strong id="irrig-mode-display">${iot.irrigation.mode}</strong>
            </div>
            <div class="irrig-stat">
              <span class="stat-lbl">Soil Moisture</span>
              <strong>${iot.soilMoisture}%</strong>
            </div>
            <div class="irrig-stat">
              <span class="stat-lbl">Trigger Threshold</span>
              <strong>&lt; ${iot.irrigation.moistureThreshold}%</strong>
            </div>
            <div class="irrig-stat">
              <span class="stat-lbl">Pumped Today</span>
              <strong>${iot.irrigation.litersPumpedToday} L</strong>
            </div>
          </div>

          <div class="irrigation-actions-bar">
            <button id="btn-irrig-mode-auto" class="btn btn-sm ${iot.irrigation.mode === 'AUTO' ? 'btn-primary' : 'btn-outline'}">
              🤖 Auto (Weather-Aware)
            </button>
            <button id="btn-irrig-pump-on" class="btn btn-sm btn-outline">
              ⚡ Start Pump (Manual)
            </button>
            <button id="btn-irrig-pump-off" class="btn btn-sm btn-outline">
              ⏹️ Stop Pump
            </button>
          </div>
        </div>

        <!-- Real-Time IoT Telemetry Event Feed -->
        <div class="card activity-log-card">
          <div class="card-header-with-action">
            <h3>📡 Real-Time IoT Activity Stream</h3>
            <span class="badge badge-source badge-hardware">[LIVE BUS FEED]</span>
          </div>
          <div class="activity-feed-list" id="iot-activity-feed">
            ${renderLogsHTML(iot.activityLogs)}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAlertsHTML(alerts) {
  if (!alerts || alerts.length === 0) return '';
  return alerts.map(a => `
    <div class="alert-banner alert-${a.severity}" id="${a.id}">
      <div class="alert-icon">${a.severity === 'critical' ? '🚨' : a.severity === 'warning' ? '⚠️' : 'ℹ️'}</div>
      <div class="alert-body">
        <strong>${a.title}</strong> — ${a.message}
        <span class="alert-time text-xs">(${a.time})</span>
      </div>
      <button class="btn-dismiss-alert" data-alertid="${a.id}">✕</button>
    </div>
  `).join('');
}

function renderLogsHTML(logs) {
  if (!logs || logs.length === 0) {
    return '<div class="text-xs text-muted">Listening for incoming CAN-bus telemetry packets...</div>';
  }
  return logs.slice(0, 10).map(l => `
    <div class="log-entry">
      <span class="log-time">${l.time}</span>
      <span class="log-msg">${l.message}</span>
    </div>
  `).join('');
}

function formatModeName(mode) {
  const map = {
    AI_SWEET_SPOT: '✨ AI Sweet Spot (35°)',
    CROP_FIRST: '🌱 Crop-First (55°)',
    ENERGY_FIRST: '⚡ Solar-Max (18°)',
    STORM_STOW: '🌪️ Storm Stow (0°)',
    ANTI_SCORCH: '🛡️ Anti-Scorch (10°)',
    BATTERY_PRIORITY: '🔋 Battery Priority (22°)',
    MANUAL: '🔧 Manual Control'
  };
  return map[mode] || mode;
}
