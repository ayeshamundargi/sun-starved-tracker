/**
 * Interactive System Simulator Console
 * Covers Specification 15: Functional Demonstration Requirements
 * Provides interactive one-click incident scenarios and live hardware sliders
 * to demonstrate all 16 prompt requirements to hackathon judges & agricultural engineers.
 */

import {
  getIotState,
  simulateBatteryLow20,
  simulateRainDetection,
  simulateHighWindGust,
  simulateSolarFailure,
  simulateRestoreSolar,
  simulateGridFailure,
  simulateRestoreGrid,
  simulateNetworkCut,
  simulateRestoreNetwork,
  triggerEmergencyStop,
  resetEmergencyStop,
  setManualSliders,
  setAutomationMode
} from '../services/iotEngine.js';

export function renderSimulatorViewHTML() {
  const iot = getIotState();

  return `
    <div class="simulator-view-container">
      <!-- Simulator Hero Banner -->
      <div class="card simulator-hero-card">
        <div>
          <div class="hero-tag">🎮 HACKATHON & JURY TESTING CONSOLE</div>
          <h2>Interactive System Simulator & Hardware Stress-Tester</h2>
          <p class="text-sm text-muted">
            Test all automatic protection rules, priority state transitions, emergency load shedding, offline edge autonomy, and grid transfers in real time.
          </p>
        </div>
        <button id="btn-sim-restore-all" class="btn btn-sm btn-accent">
          🔄 Restore All Systems to Nominal State
        </button>
      </div>

      <!-- Current State HUD Strip -->
      <div class="card sim-hud-strip">
        <div class="sim-hud-item">
          <span class="hud-lbl">Network Mode</span>
          <strong class="${iot.networkMode === 'CLOUD_CONNECTED' ? 'text-success' : 'text-warning'}">
            ${iot.networkMode}
          </strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Actuator Angle</span>
          <strong>${iot.panelAngleDeg}° (Target: ${iot.targetAngleDeg}°)</strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Battery SoC</span>
          <strong class="${iot.battery.chargePercent <= 20 ? 'text-danger' : 'text-success'}">
            ${iot.battery.chargePercent}% (${iot.battery.chargingState})
          </strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Grid Connection</span>
          <strong>${iot.gridStatus}</strong>
        </div>
        <div class="sim-hud-item">
          <span class="hud-lbl">Queued Offline Packets</span>
          <strong>${iot.offlineQueueCount} packets</strong>
        </div>
      </div>

      <!-- Grid of Test Buttons -->
      <div class="sim-scenarios-grid">

        <!-- Scenario 1: Low Battery -->
        <div class="card sim-scenario-card ${iot.battery.chargePercent <= 20 ? 'active-test' : ''}">
          <div class="scen-icon">🔋</div>
          <div class="scen-body">
            <h4>1. Low Battery Reserve (≤ 20%)</h4>
            <p class="text-xs text-muted">
              Drops battery to 19.5%. Triggers critical alert, sheds non-essential pump load, and transfers to backup grid electricity.
            </p>
          </div>
          <button id="sim-btn-low-battery" class="btn btn-sm btn-danger">
            Trigger Low Battery (&le; 20%)
          </button>
        </div>

        <!-- Scenario 2: Rain Detection -->
        <div class="card sim-scenario-card ${iot.rainfallMm > 0 ? 'active-test' : ''}">
          <div class="scen-icon">🌧️</div>
          <div class="scen-body">
            <h4>2. Rain Runoff & Drainage</h4>
            <p class="text-xs text-muted">
              Injects 14.5mm rain. Automatically actuates panels to configured ${iot.schedulerConfig.rainAngleDeg}° runoff angle and pauses drip irrigation.
            </p>
          </div>
          <button id="sim-btn-rain" class="btn btn-sm btn-primary">
            Trigger Rain Event (14.5mm)
          </button>
        </div>

        <!-- Scenario 3: High Wind Gust -->
        <div class="card sim-scenario-card ${iot.windSpeedKmh >= 45 ? 'active-test' : ''}">
          <div class="scen-icon">🌪️</div>
          <div class="scen-body">
            <h4>3. High-Wind Storm Stow</h4>
            <p class="text-xs text-muted">
              Injects 52 km/h wind gust. Priority 1 override immediately moves panels flat to 0° to prevent mechanical structure torque.
            </p>
          </div>
          <button id="sim-btn-wind" class="btn btn-sm btn-danger">
            Trigger Wind Gust (52 km/h)
          </button>
        </div>

        <!-- Scenario 4: Solar String Disconnect -->
        <div class="card sim-scenario-card ${iot.solarPanelStatus === 'Disconnected' ? 'active-test' : ''}">
          <div class="scen-icon">⚡</div>
          <div class="scen-body">
            <h4>4. Solar Panel DC Disconnect</h4>
            <p class="text-xs text-muted">
              Simulates DC combiner isolator trip. Generation drops to 0W and system switches seamlessly to battery storage.
            </p>
          </div>
          <button id="sim-btn-solar-fault" class="btn btn-sm btn-outline">
            Simulate DC Disconnect
          </button>
        </div>

        <!-- Scenario 5: External Grid Failure -->
        <div class="card sim-scenario-card ${iot.gridStatus.includes('Islanded') ? 'active-test' : ''}">
          <div class="scen-icon">🔌</div>
          <div class="scen-body">
            <h4>5. External Grid Blackout</h4>
            <p class="text-xs text-muted">
              Cuts 230V grid. Anti-islanding relay safely isolates solar farm into self-sustaining microgrid without unsafe backfeed.
            </p>
          </div>
          <button id="sim-btn-grid-fault" class="btn btn-sm btn-outline">
            Simulate Grid Outage
          </button>
        </div>

        <!-- Scenario 6: Network Loss & Edge Autonomy -->
        <div class="card sim-scenario-card ${iot.networkMode === 'LOCAL_AUTONOMOUS' ? 'active-test' : ''}">
          <div class="scen-icon">📡</div>
          <div class="scen-body">
            <h4>6. Network Failure (Edge Autonomy)</h4>
            <p class="text-xs text-muted">
              Simulates internet disconnection. Verifies that local industrial controller continues solar tracking and rain protection offline.
            </p>
          </div>
          <button id="sim-btn-network-cut" class="btn btn-sm btn-warning">
            Cut Internet Connection
          </button>
        </div>

        <!-- Scenario 7: Network Restoration & Data Sync -->
        <div class="card sim-scenario-card">
          <div class="scen-icon">🔄</div>
          <div class="scen-body">
            <h4>7. Reconnect & Synchronize</h4>
            <p class="text-xs text-muted">
              Restores network communication. Flushes buffered local telemetry queue to the cloud database without losing data.
            </p>
          </div>
          <button id="sim-btn-network-restore" class="btn btn-sm btn-success">
            Restore & Sync Queue
          </button>
        </div>

        <!-- Scenario 8: Emergency Stop (E-Stop) -->
        <div class="card sim-scenario-card ${iot.isEmergencyStopped ? 'active-test' : ''}">
          <div class="scen-icon">🛑</div>
          <div class="scen-body">
            <h4>8. Emergency Stop (E-Stop)</h4>
            <p class="text-xs text-muted">
              Isolates all linear drive motors immediately. Freezes actuator position in hardware and engages safety interlock.
            </p>
          </div>
          <button id="sim-btn-estop-toggle" class="btn btn-sm btn-danger">
            ${iot.isEmergencyStopped ? 'Reset E-Stop Interlock' : 'Engage Emergency Stop'}
          </button>
        </div>

      </div>

      <!-- Live Interactive Hardware Sliders -->
      <div class="card" style="margin-top:1.5rem;">
        <h3>🎛️ Live Sensor Sliders (Continuous Hardware Input)</h3>
        <p class="text-xs text-muted" style="margin-bottom:1.25rem;">
          Drag sliders to dynamically alter sensor values and observe responsive closed-loop adjustments.
        </p>

        <div class="sliders-grid">
          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Solar Generation (Watts)</label>
              <strong id="val-slider-watts">${iot.solarPowerOutputWatts} W</strong>
            </div>
            <input type="range" id="sim-slider-watts" min="0" max="3600" step="50" value="${iot.solarPowerOutputWatts}" class="form-range" style="width:100%;" />
          </div>

          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Battery State of Charge (%)</label>
              <strong id="val-slider-soc">${iot.battery.chargePercent}%</strong>
            </div>
            <input type="range" id="sim-slider-soc" min="5" max="100" step="1" value="${iot.battery.chargePercent}" class="form-range" style="width:100%;" />
          </div>

          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Wind Velocity (km/h)</label>
              <strong id="val-slider-wind">${iot.windSpeedKmh} km/h</strong>
            </div>
            <input type="range" id="sim-slider-wind" min="0" max="65" step="1" value="${iot.windSpeedKmh}" class="form-range" style="width:100%;" />
          </div>

          <div class="slider-item">
            <div style="display:flex; justify-content:space-between;">
              <label>Rain Precipitation (mm)</label>
              <strong id="val-slider-rain">${iot.rainfallMm} mm</strong>
            </div>
            <input type="range" id="sim-slider-rain" min="0" max="30" step="0.5" value="${iot.rainfallMm}" class="form-range" style="width:100%;" />
          </div>
        </div>
      </div>
    </div>
  `;
}
