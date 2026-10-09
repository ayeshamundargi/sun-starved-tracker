/**
 * Farm Sunlight Balance Meter
 * The signature visual feature showing the sweet spot balance between
 * 🌱 CROP SUNLIGHT vs ⚡ SOLAR ENERGY
 */

import { t } from '../data/i18n.js';

export function renderBalanceMeter({ cropSunlight = 84, solarScore = 91, overallBalance = 88 }) {
  const radius = 64;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;

  let balanceColor = '#2F7D4F';
  if (overallBalance < 60) balanceColor = '#DC2626';
  else if (overallBalance < 75) balanceColor = '#F59E0B';
  else if (overallBalance >= 85) balanceColor = '#8FCF64';

  return `
    <div class="balance-meter-container" role="region" aria-label="Farm Sunlight Balance Meter">
      <div class="meter-header">
        <h3 class="meter-title">⚖️ ${t('farmBalance')}</h3>
        <span class="meter-badge">${overallBalance >= 80 ? t('badgeSweetSpot') : t('badgeNeedsOpt')}</span>
      </div>

      <div class="meter-body">
        <!-- Crop Sunlight Column -->
        <div class="meter-pillar crop-pillar">
          <div class="pillar-icon">🌱</div>
          <div class="pillar-label">${t('cropSunlight')}</div>
          <div class="pillar-value">${cropSunlight}%</div>
          <div class="pillar-bar-track">
            <div class="pillar-bar-fill crop-bar" style="width: ${cropSunlight}%;"></div>
          </div>
          <span class="pillar-caption">PAR (${cropSunlight}%)</span>
        </div>

        <!-- Center Dial / Balance Scale -->
        <div class="meter-center-dial">
          <svg viewBox="0 0 160 160" class="dial-svg">
            <circle cx="80" cy="80" r="${radius}" fill="none" stroke="#E2E8F0" stroke-width="${stroke}" opacity="0.4" />
            <circle cx="80" cy="80" r="${radius}" fill="none" stroke="${balanceColor}" stroke-width="${stroke}"
                    stroke-dasharray="${(overallBalance / 100) * circumference} ${circumference}"
                    stroke-linecap="round"
                    transform="rotate(-90 80 80)"
                    class="score-ring" />
          </svg>
          <div class="dial-content">
            <span class="scale-symbol">⚖️</span>
            <div class="dial-score-num" style="color: ${balanceColor};">${overallBalance}</div>
            <div class="dial-score-label">${t('farmBalance')}</div>
          </div>
        </div>

        <!-- Solar Energy Column -->
        <div class="meter-pillar solar-pillar">
          <div class="pillar-icon">⚡</div>
          <div class="pillar-label">${t('solarEnergy')}</div>
          <div class="pillar-value">${solarScore}%</div>
          <div class="pillar-bar-track">
            <div class="pillar-bar-fill solar-bar" style="width: ${solarScore}%;"></div>
          </div>
          <span class="pillar-caption">${t('solarEnergy')} (${solarScore}%)</span>
        </div>
      </div>

      <div class="meter-footer">
        <span class="objective-tag">${t('subTagline')}</span>
      </div>
    </div>
  `;
}
