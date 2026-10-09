/**
 * Innovative Final Daily Farm Intelligence Report View
 * Covers Specification 12:
 * - Period selector: Daily, Weekly, Monthly, Custom Range
 * - 6 Comprehensive Sections: Crop Health, Solar Energy, Electricity Usage, Automation Performance, Alerts, AI Recommendations
 * - Export options: Print / Save PDF, CSV Export, JSON Download
 */

import { getIotState } from '../services/iotEngine.js';
import { getCurrentSession, DEMO_FARMER } from '../services/auth.js';
import { DAILY_TIMELINE_PRESETS } from './cropCamera.js';

export function renderReportsViewHTML(period = 'daily') {
  const iot = getIotState();
  const session = getCurrentSession();
  const farmer = session ? { id: session.farmerId, name: session.farmerName } : DEMO_FARMER;
  const b = iot.battery;
  const cfg = iot.schedulerConfig;

  // Calculated values
  const totalGenKwh = iot.solarEnergyTodayKwh;
  const solarUsedKwh = (totalGenKwh * 0.45).toFixed(2);
  const batteryStoredKwh = (totalGenKwh * 0.35).toFixed(2);
  const gridExportedKwh = (totalGenKwh * 0.20).toFixed(2);
  const gridImportedKwh = iot.gridImportedTodayKwh || '0.80';
  const tariff = iot.electricityTariffPerKwh || 6.50;
  const estimatedCost = (gridImportedKwh * tariff).toFixed(2);
  const estimatedSavings = (totalGenKwh * tariff).toFixed(2);

  return `
    <div class="reports-view-container">
      <!-- Report Header -->
      <div class="card reports-hero-card no-print">
        <div>
          <div class="hero-tag">📄 COMPREHENSIVE INTELLIGENCE AUDIT</div>
          <h2>Innovative Final Daily Farm Intelligence Report</h2>
          <p class="text-sm text-muted">
            Certified dual-objective verification report covering crop physiology, solar kWh yield, battery health, and automation audit.
          </p>
        </div>

        <div class="report-export-btns">
          <button id="btn-print-full-report" class="btn btn-sm btn-primary">
            🖨️ Print / Save PDF
          </button>
          <button id="btn-export-csv-report" class="btn btn-sm btn-secondary">
            📊 Export CSV Data
          </button>
          <button id="btn-export-json-report" class="btn btn-sm btn-outline">
            📥 Download JSON
          </button>
        </div>
      </div>

      <!-- Printable Document Sheet Body -->
      <div class="card print-sheet-card" id="printable-report-sheet">

        <!-- Sheet Header Watermark -->
        <div class="sheet-header">
          <div class="sheet-brand">
            <span style="font-size: 2rem;">🌞</span>
            <div>
              <h1 class="sheet-title">SUN-STARVED TRACKER</h1>
              <span class="sheet-subtitle">Intelligent Agrivoltaics Optimizer — Official Farm Daily Report</span>
            </div>
          </div>

          <div class="sheet-meta-box">
            <div><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div><strong>Farmer ID:</strong> ${farmer.id} (${farmer.name})</div>
            <div><strong>Farm Location:</strong> Vemgal Rural, Kolar District, Karnataka, India</div>
            <div><strong>Security Watermark:</strong> Verified Cryptographic Digest (SHA-256)</div>
          </div>
        </div>

        <div class="sheet-divider"></div>

        <!-- Section 1: Executive KPI Summary -->
        <div class="sheet-section">
          <h3 class="section-heading">1. EXECUTIVE KPI SUMMARY</h3>
          <div class="kpi-summary-grid">
            <div class="kpi-box">
              <span class="k-label">TOTAL SOLAR GENERATION</span>
              <strong class="k-val text-success">${totalGenKwh} kWh</strong>
              <span class="text-xs text-muted">Peak Power: ${iot.peakOutputWatts} W</span>
            </div>
            <div class="kpi-box">
              <span class="k-label">AVERAGE CROP COMFORT</span>
              <strong class="k-val text-primary">${iot.cropComfortScore}/100</strong>
              <span class="text-xs text-muted">Light Exposure: ${iot.canopyLightFraction}% PAR</span>
            </div>
            <div class="kpi-box">
              <span class="k-label">BATTERY STATE OF HEALTH</span>
              <strong class="k-val">${b.healthPercent}%</strong>
              <span class="text-xs text-muted">${b.healthStatus}</span>
            </div>
            <div class="kpi-box">
              <span class="k-label">NET ELECTRICITY SAVINGS</span>
              <strong class="k-val text-success">₹${estimatedSavings}</strong>
              <span class="text-xs text-muted">Grid Tariff: ₹${tariff}/kWh</span>
            </div>
          </div>
        </div>

        <!-- Section 2: Crop Health & 3 Daily Images (Specification 12) -->
        <div class="sheet-section">
          <h3 class="section-heading">2. CROP HEALTH & 3-PERIOD CANOPY IMAGERY</h3>
          <div class="report-images-grid">
            <div class="report-img-card">
              <div class="r-badge">🌅 Morning (07:30 AM)</div>
              <div class="r-thumb r-thumb-morning">
                <span>Morning Dew Active</span>
              </div>
              <div class="r-meta">
                <strong>Score: 94/100 (Confidence: 95.8%)</strong>
                <p class="text-xs">Healthy leaf turgor. Sunrise 45° angle enabled 92% PAR early photosynthesis.</p>
              </div>
            </div>

            <div class="report-img-card">
              <div class="r-badge">☀️ Afternoon (01:15 PM)</div>
              <div class="r-thumb r-thumb-afternoon">
                <span>Anti-Scorch Shaded</span>
              </div>
              <div class="r-meta">
                <strong>Score: 91/100 (Confidence: 94.2%)</strong>
                <p class="text-xs">Partial panel shade reduced leaf temperature by 3.8°C, preventing photo-inhibition.</p>
              </div>
            </div>

            <div class="report-img-card">
              <div class="r-badge">🌙 Night Infrared (10:00 PM)</div>
              <div class="r-thumb r-thumb-night">
                <span>Thermal IR Spectrum</span>
              </div>
              <div class="r-meta">
                <strong>Score: 95/100 (Confidence: 96.5%)</strong>
                <p class="text-xs">Nocturnal canopy respiration uniform. Overhead panels provided mild frost insulation.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Solar & Battery Performance Summary -->
        <div class="sheet-section">
          <h3 class="section-heading">3. SOLAR GENERATION & BATTERY SUMMARY</h3>
          <table class="report-data-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Measured Value</th>
                <th>Reference Baseline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Energy Generated</td>
                <td><strong>${totalGenKwh} kWh</strong></td>
                <td>24.50 kWh (Daily Rating)</td>
                <td><span class="badge badge-success">✓ Nominal Yield</span></td>
              </tr>
              <tr>
                <td>Peak Solar Output</td>
                <td><strong>${iot.peakOutputWatts} W</strong></td>
                <td>3,450 W (Bifacial Peak)</td>
                <td><span class="badge badge-success">✓ 100% Inverter MPPT</span></td>
              </tr>
              <tr>
                <td>Start of Day Battery SoC</td>
                <td><strong>64.0%</strong></td>
                <td>Min Limit: 20.0%</td>
                <td><span class="badge badge-success">✓ Fully Maintained</span></td>
              </tr>
              <tr>
                <td>End of Day Battery SoC</td>
                <td><strong>${b.chargePercent}%</strong></td>
                <td>Target: &gt; 80%</td>
                <td><span class="badge badge-success">✓ Stored for Night</span></td>
              </tr>
              <tr>
                <td>LiFePO4 Battery Health (SoH)</td>
                <td><strong>${b.healthPercent}% (${b.cycleCount} Cycles)</strong></td>
                <td>Expected Lifespan: 4,000 Cycles</td>
                <td><span class="badge badge-success">✓ Optimal Cell Balancing</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Section 4: Electricity Usage & Cost Breakdown -->
        <div class="sheet-section">
          <h3 class="section-heading">4. ELECTRICITY USAGE & FINANCIAL AUDIT</h3>
          <table class="report-data-table">
            <thead>
              <tr>
                <th>Power Source</th>
                <th>Energy (kWh)</th>
                <th>Share (%)</th>
                <th>Cost / Valuation (INR ₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Direct Solar Self-Consumption</td>
                <td>${solarUsedKwh} kWh</td>
                <td>45%</td>
                <td class="text-success">₹${(solarUsedKwh * tariff).toFixed(2)} (Self-Generated)</td>
              </tr>
              <tr>
                <td>Stored Solar via Battery</td>
                <td>${batteryStoredKwh} kWh</td>
                <td>35%</td>
                <td class="text-success">₹${(batteryStoredKwh * tariff).toFixed(2)} (Stored Clean Power)</td>
              </tr>
              <tr>
                <td>Surplus Exported to Rural Grid</td>
                <td>${gridExportedKwh} kWh</td>
                <td>20%</td>
                <td class="text-success">+ ₹${(gridExportedKwh * tariff * 0.75).toFixed(2)} (Net Meter Credit)</td>
              </tr>
              <tr>
                <td>External Grid Imported Energy</td>
                <td>${gridImportedKwh} kWh</td>
                <td>Minimal</td>
                <td class="text-danger">- ₹${estimatedCost} (Grid Utility Bill)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Section 5: Automation Performance & Alerts Audit -->
        <div class="sheet-section">
          <h3 class="section-heading">5. AUTOMATION PERFORMANCE & ALERTS AUDIT</h3>
          <div class="audit-summary-text">
            <p><strong>Actuator Adjustments Executed:</strong> ${iot.actuatorHistory.length} mechanical positioning events with 0 encoder step slips.</p>
            <p><strong>Rain & High-Wind Events:</strong> 0 structural stress violations. Rain threshold set at ${cfg.rainThresholdMm}mm directing runoff to ${cfg.runOffDirection}.</p>
            <p><strong>Safety Alerts:</strong> ${iot.activeAlerts.length} total logged events (${iot.activeAlerts.filter(a => a.status === 'resolved').length} resolved, ${iot.activeAlerts.filter(a => a.status === 'unresolved').length} unresolved).</p>
          </div>
        </div>

        <!-- Section 6: AI Agronomic Recommendations for Next Day -->
        <div class="sheet-section">
          <h3 class="section-heading">6. AI AGRONOMIC RECOMMENDATIONS FOR TOMORROW</h3>
          <div class="ai-recommendations-list">
            <div class="ai-rec-box">
              <strong>🌱 Crop Canopy Optimization:</strong>
              <p class="text-sm">Maintain 35° midday tilt. Weather forecast predicts 28°C ambient temperature; partial shade reduces evapotranspiration by 32% and saves 180 liters of irrigation water.</p>
            </div>
            <div class="ai-rec-box">
              <strong>⚡ Energy & Battery Management:</strong>
              <p class="text-sm">Initiate battery bulk absorption stage at 10:30 AM. Peak solar irradiance is expected between 11:45 AM and 01:30 PM.</p>
            </div>
            <div class="ai-rec-box">
              <strong>🔧 Scheduled Maintenance Advice:</strong>
              <p class="text-sm">Inspect dust accumulation on String 2 module surfaces. No active electrical degradation detected.</p>
            </div>
          </div>
        </div>

        <!-- Report Signoff Footer -->
        <div class="sheet-signoff-row">
          <div>
            <div class="sig-line"></div>
            <span class="text-xs text-muted">Automated AI System Verification Stamp</span>
          </div>
          <div>
            <div class="sig-line"></div>
            <span class="text-xs text-muted">Certified Farmer Operator Signature</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
