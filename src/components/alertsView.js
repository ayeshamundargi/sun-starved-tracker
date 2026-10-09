/**
 * Solar Panel Failure Detection & Emergency Alerts Center
 * Covers Specification 8:
 * - Monitors array output, inverters, battery, network, sensors, crop health
 * - Alerts with Severity, Timestamp, Affected Component, Operating Mode, Recommended Action
 * - Notification states: Unresolved, Acknowledged, Resolved
 * - Phone SMS & Push notification dispatch simulation
 * - Audio alarm chime toggle
 */

import { getIotState, acknowledgeAlert, resolveAlert } from '../services/iotEngine.js';

export function renderAlertsViewHTML(filterStatus = 'all') {
  const iot = getIotState();
  const alerts = iot.activeAlerts;

  const filtered = filterStatus === 'all'
    ? alerts
    : alerts.filter(a => a.status === filterStatus);

  const unresolvedCount = alerts.filter(a => a.status === 'unresolved').length;

  return `
    <div class="alerts-view-container">
      <!-- Alerts Header Strip -->
      <div class="card alerts-hero-card">
        <div class="alerts-hero-left">
          <div class="alerts-bell-badge ${unresolvedCount > 0 ? 'bell-alarm' : ''}">
            <span class="bell-icon">🔔</span>
            ${unresolvedCount > 0 ? `<span class="alarm-count">${unresolvedCount}</span>` : ''}
          </div>
          <div>
            <h2>Emergency Alerts & Incident Center</h2>
            <p class="text-sm text-muted">
              Real-time monitoring across solar inverters, battery safety, actuators, weather sensors, and crop health.
            </p>
          </div>
        </div>

        <div class="alerts-hero-right">
          <div class="alert-filter-pills">
            <button class="btn btn-xs ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'} btn-alert-filter" data-filter="all">All (${alerts.length})</button>
            <button class="btn btn-xs ${filterStatus === 'unresolved' ? 'btn-primary' : 'btn-outline'} btn-alert-filter" data-filter="unresolved">Unresolved (${unresolvedCount})</button>
            <button class="btn btn-xs ${filterStatus === 'acknowledged' ? 'btn-primary' : 'btn-outline'} btn-alert-filter" data-filter="acknowledged">Acknowledged</button>
            <button class="btn btn-xs ${filterStatus === 'resolved' ? 'btn-primary' : 'btn-outline'} btn-alert-filter" data-filter="resolved">Resolved</button>
          </div>
        </div>
      </div>

      <!-- Main Alerts Cards List -->
      <div class="alerts-cards-list">
        ${filtered.length === 0 ? `
          <div class="card text-center" style="padding: 2.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🟢</div>
            <h3>No Active Alerts Found</h3>
            <p class="text-muted text-sm">All agri-voltaic subsystems, battery cells, and inverters operating within nominal safety margins.</p>
          </div>
        ` : filtered.map(a => `
          <div class="card alert-detail-card card-severity-${a.severity} ${a.status === 'resolved' ? 'card-resolved' : ''}">
            <div class="alert-top-row">
              <div class="alert-title-group">
                <span class="alert-symbol">${a.severity === 'critical' ? '🚨' : a.severity === 'warning' ? '⚠️' : 'ℹ️'}</span>
                <div>
                  <h3 class="alert-name">${a.title}</h3>
                  <div class="alert-meta-line">
                    <span class="badge ${a.severity === 'critical' ? 'badge-danger' : a.severity === 'warning' ? 'badge-warning' : 'badge-subtle'}">${a.severity.toUpperCase()}</span>
                    <span>🕒 ${a.time}</span>
                    <span>📂 Category: <strong>${a.category || 'SYSTEM'}</strong></span>
                  </div>
                </div>
              </div>

              <div class="alert-status-badge-wrap">
                <span class="badge badge-status-${a.status}">
                  ${a.status === 'resolved' ? '✓ RESOLVED' : a.status === 'acknowledged' ? '👁️ ACKNOWLEDGED' : '🔴 UNRESOLVED'}
                </span>
              </div>
            </div>

            <p class="alert-desc-text">${a.message}</p>

            <!-- Technical Detail Grid -->
            <div class="alert-specs-grid">
              <div class="spec-cell">
                <span class="spec-label">Affected Component:</span>
                <strong>${a.affectedComponent || 'Central Agrivoltaic Inverter Bus'}</strong>
              </div>
              <div class="spec-cell">
                <span class="spec-label">Operating Mode When Triggered:</span>
                <strong>${a.operatingMode || 'AI_SWEET_SPOT'}</strong>
              </div>
              <div class="spec-cell full-width">
                <span class="spec-label">Recommended Action:</span>
                <span class="action-recommendation">${a.recommendedAction || 'Inspect physical module connections and monitor battery reserves.'}</span>
              </div>
            </div>

            <!-- Resolution Controls -->
            <div class="alert-actions-row">
              <div class="dispatch-tag text-xs text-muted">
                📲 Simulated SMS Alert sent to: <strong>+91 98765 43210</strong>
              </div>
              <div class="alert-btns-group">
                ${a.status === 'unresolved' ? `
                  <button class="btn btn-xs btn-outline btn-ack-alert" data-alertid="${a.id}">
                    👁️ Acknowledge
                  </button>
                ` : ''}
                ${a.status !== 'resolved' ? `
                  <button class="btn btn-xs btn-primary btn-resolve-alert" data-alertid="${a.id}">
                    ✓ Mark as Resolved
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
