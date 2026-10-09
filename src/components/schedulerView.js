/**
 * Intelligent Wet-Sensor Scheduling & Environmental Automation Config
 * Covers Specification 10 & 14:
 * - Configurable triggers: Rain threshold, Rain angle, Restore delay, Soil moisture, Battery reserve, Tracking intervals
 * - State machine priority visualization: High-Wind > Rain > Low-Battery > AI Sweet Spot
 * - Interactive parameter persistence
 */

import { getIotState, updateSchedulerConfig } from '../services/iotEngine.js';

export function renderSchedulerViewHTML() {
  const iot = getIotState();
  const cfg = iot.schedulerConfig;

  return `
    <div class="scheduler-view-container">
      <!-- Header -->
      <div class="card scheduler-hero-card">
        <div>
          <h2>⏱️ Environmental Automation Scheduler & State Machine</h2>
          <p class="text-sm text-muted">
            Configure threshold rules, rain runoff drainage angles, camera capture periods, and priority safety interlocks.
          </p>
        </div>
        <button id="btn-save-scheduler-cfg" class="btn btn-sm btn-primary">
          💾 Save Automation Configuration
        </button>
      </div>

      <!-- Priority State Machine Visualization Strip -->
      <div class="card state-machine-card">
        <h3 style="margin-bottom:0.5rem;">🛡️ Closed-Loop Priority State Machine</h3>
        <p class="text-xs text-muted" style="margin-bottom:1rem;">
          To prevent command conflicts, the hardware edge governor strictly prioritizes safety interlocks over standard solar tracking.
        </p>

        <div class="state-hierarchy-chain">
          <div class="state-node node-priority-1">
            <div class="p-rank">PRIORITY 1</div>
            <strong>🌪️ High-Wind Protection</strong>
            <span class="p-action">Wind &ge; ${cfg.windStowSpeedKmh} km/h ➔ Flat Stow (0°)</span>
          </div>

          <div class="chain-arrow">➔</div>

          <div class="state-node node-priority-2">
            <div class="p-rank">PRIORITY 2</div>
            <strong>🌧️ Rain Runoff Management</strong>
            <span class="p-action">Rain &ge; ${cfg.rainThresholdMm}mm ➔ Tilt to ${cfg.rainAngleDeg}°</span>
          </div>

          <div class="chain-arrow">➔</div>

          <div class="state-node node-priority-3">
            <div class="p-rank">PRIORITY 3</div>
            <strong>🔋 Low-Battery Load Shedding</strong>
            <span class="p-action">Charge &le; ${cfg.batteryReserveCutoff}% ➔ Grid Transfer</span>
          </div>

          <div class="chain-arrow">➔</div>

          <div class="state-node node-priority-4">
            <div class="p-rank">PRIORITY 4</div>
            <strong>✨ AI Sweet Spot Tracking</strong>
            <span class="p-action">Nominal Conditions ➔ 35° Tilt</span>
          </div>
        </div>
      </div>

      <!-- Config Form Grid -->
      <div class="scheduler-form-grid">

        <!-- Section 1: Rain & Soil Sensors -->
        <div class="card">
          <h3>🌧️ Rain & Soil Sensor Automations</h3>
          <p class="text-xs text-muted" style="margin-bottom:1.25rem;">Adjust precipitation runoff angles and irrigation moisture setpoints.</p>

          <div class="form-group-item">
            <label>Rain Detection Threshold (mm)</label>
            <input type="number" step="0.5" id="cfg-rain-threshold" class="form-input" value="${cfg.rainThresholdMm}" />
            <span class="text-xs text-muted">Triggers automatic runoff positioning when rainfall exceeds this value.</span>
          </div>

          <div class="form-group-item">
            <label>Configured Rain Response Angle (° Tilt)</label>
            <input type="number" step="1" min="15" max="60" id="cfg-rain-angle" class="form-input" value="${cfg.rainAngleDeg}" />
            <span class="text-xs text-muted">Determined by panel physical mounting and drainage channel direction.</span>
          </div>

          <div class="form-group-item">
            <label>Delay Before Restoring Solar Tracking (Minutes)</label>
            <input type="number" id="cfg-rain-delay" class="form-input" value="${cfg.rainRestoreDelayMins}" />
            <span class="text-xs text-muted">Prevents rapid back-and-forth tilt cycling during intermittent showers.</span>
          </div>

          <div class="form-group-item">
            <label>Soil Moisture Irrigation Trigger (%)</label>
            <input type="number" id="cfg-soil-threshold" class="form-input" value="${cfg.soilMoistureThreshold}" />
            <span class="text-xs text-muted">Energizes drip irrigation valves when root moisture drops below this value.</span>
          </div>
        </div>

        <!-- Section 2: Camera Capture Schedule & Electrical Safeguards -->
        <div class="card">
          <h3>📷 Camera Schedule & Safety Limits</h3>
          <p class="text-xs text-muted" style="margin-bottom:1.25rem;">Configure the 3 daily capture time windows and battery reserve cutoffs.</p>

          <div class="form-group-item">
            <label>🌅 Morning Image Capture Window</label>
            <input type="time" id="cfg-cam-morning" class="form-input" value="${cfg.morningCaptureTime}" />
            <span class="text-xs text-muted">Evaluates morning dew, stomatal opening, and sunrise light exposure.</span>
          </div>

          <div class="form-group-item">
            <label>☀️ Afternoon Image Capture Window</label>
            <input type="time" id="cfg-cam-afternoon" class="form-input" value="${cfg.afternoonCaptureTime}" />
            <span class="text-xs text-muted">Evaluates midday solar irradiance, canopy scorch, and thermal cooling.</span>
          </div>

          <div class="form-group-item">
            <label>🌙 Night Image Capture Window (Infrared NV)</label>
            <input type="time" id="cfg-cam-night" class="form-input" value="${cfg.nightCaptureTime}" />
            <span class="text-xs text-muted">Low-light / infrared thermal scan for nocturnal leaf respiration and chill.</span>
          </div>

          <div class="form-group-item">
            <label>🔋 Battery Critical Reserve Cutoff (%)</label>
            <input type="number" id="cfg-battery-cutoff" class="form-input" value="${cfg.batteryReserveCutoff}" />
            <span class="text-xs text-muted">Enforces load shedding and triggers external grid transfer at or below this level.</span>
          </div>

          <div class="form-group-item">
            <label>💨 High-Wind Protective Stow Threshold (km/h)</label>
            <input type="number" id="cfg-wind-stow" class="form-input" value="${cfg.windStowSpeedKmh}" />
            <span class="text-xs text-muted">Wind gusts equal or higher immediately trigger flat 0° stow.</span>
          </div>
        </div>

      </div>
    </div>
  `;
}
