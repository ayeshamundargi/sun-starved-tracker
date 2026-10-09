/**
 * Virtual Actuator Controller Component
 * Simulates motorized solar tracking slew-drive actuators.
 * Labeled: “Virtual actuator simulation”
 */

import { t } from '../data/i18n.js';

export function renderActuatorControl({
  currentAngle = 25,
  targetAngle = 35,
  status = 'ready', // ready | moving | reached
  progress = 0
}) {
  const isMoving = status === 'moving';
  const isReached = status === 'reached';

  return `
    <div class="actuator-card" role="region" aria-label="Virtual Actuator Control">
      <div class="actuator-header">
        <div class="actuator-badge">⚙️ ${t('actuatorTitle')}</div>
        <span class="actuator-protocol">Protocol: IEEE 802.15.4 / RS485 Ready</span>
      </div>

      <div class="actuator-body">
        <div class="actuator-telemetry">
          <div class="telemetry-item">
            <span class="tel-label">${t('currentAngle')}</span>
            <span class="tel-val current-tilt-val">${currentAngle}°</span>
          </div>
          <div class="actuator-arrow">➔</div>
          <div class="telemetry-item">
            <span class="tel-label">${t('targetSweetSpot')}</span>
            <span class="tel-val target-tilt-val">${targetAngle}°</span>
          </div>
        </div>

        <div class="actuator-motor-state">
          <div class="motor-indicator ${isMoving ? 'motor-active' : ''}">
            <span class="motor-icon">${isMoving ? '🔄' : isReached ? '✓' : '⚙️'}</span>
            <div class="motor-text">
              <span class="motor-status-title">
                ${isMoving ? t('actuatorAligning') : isReached ? t('actuatorReached') : t('actuatorReady')}
              </span>
              <span class="motor-sub">Linear Slew Drive: 24V DC • 42W Peak Motor Draw</span>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <button id="btn-actuator-move" class="btn btn-primary btn-actuator ${isMoving ? 'loading' : ''}" ${isMoving ? 'disabled' : ''}>
          ${isMoving ? '⚙️ ' + t('actuatorAligning') + ' (' + targetAngle + '°)' : isReached ? t('actuatorReached') + ' (' + targetAngle + '°)' : t('btnApplyAngle') + ' (' + targetAngle + '°)'}
        </button>

        <!-- Hardware Integration Drawer Note -->
        <div class="hardware-note">
          <small>${t('actuatorDisclaimer')}</small>
        </div>
      </div>
    </div>
  `;
}
