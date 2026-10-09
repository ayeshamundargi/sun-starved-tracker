/**
 * Crop Row Sunlight Heatmap Component
 * Displays row-by-row microclimate sunlight reception dynamically translated
 */

import { t } from '../data/i18n.js';

export function renderHeatmap({ rowLightDistribution = [78, 86, 92, 84], rowStatus = ['high', 'high', 'high', 'high'], parBetweenPanels = 1150 }) {
  const rowLabels = [
    { title: t('row1'), desc: t('row1') },
    { title: t('row2'), desc: t('row2') },
    { title: t('row3'), desc: t('row3') },
    { title: t('row4'), desc: t('row4') }
  ];

  const statusConfigs = {
    high: { label: t('highLight'), color: '#2F7D4F', bg: '#E8F5E9', icon: '🟢' },
    moderate: { label: t('modLight'), color: '#D97706', bg: '#FEF3C7', icon: '🟡' },
    low: { label: t('lowLight'), color: '#EA580C', bg: '#FFEDD5', icon: '🟠' },
    excessive: { label: t('excessShade'), color: '#DC2626', bg: '#FEE2E2', icon: '🔴' }
  };

  const rowsHtml = rowLightDistribution.map((pct, idx) => {
    const statusKey = rowStatus[idx] || (pct >= 75 ? 'high' : pct >= 50 ? 'moderate' : pct >= 30 ? 'low' : 'excessive');
    const cfg = statusConfigs[statusKey];
    const rowPAR = Math.round((pct / 100) * (parBetweenPanels || 1200));

    return `
      <div class="heatmap-row-card" style="border-left: 5px solid ${cfg.color};">
        <div class="heatmap-row-info">
          <div class="heatmap-row-name">${cfg.icon} ${rowLabels[idx].title}</div>
          <div class="heatmap-row-desc">${cfg.label}</div>
        </div>
        <div class="heatmap-row-metrics">
          <div class="heatmap-row-pct" style="color: ${cfg.color}; font-weight: bold;">${pct}% Light</div>
          <div class="heatmap-row-par">${rowPAR} µmol/m²/s PAR</div>
        </div>
        <div class="heatmap-progress-bar">
          <div class="heatmap-progress-fill" style="width: ${pct}%; background-color: ${cfg.color};"></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="heatmap-container" role="region" aria-label="Crop Row Sunlight Heatmap">
      <div class="heatmap-header">
        <h4 class="heatmap-title">🌱 ${t('heatmapTitle')}</h4>
        <span class="heatmap-sub">${t('heatmapSub')}</span>
      </div>

      <div class="heatmap-grid">
        ${rowsHtml}
      </div>

      <div class="heatmap-legend">
        <span>🟢 ${t('highLight')}</span>
        <span>🟡 ${t('modLight')}</span>
        <span>🟠 ${t('lowLight')}</span>
        <span>🔴 ${t('excessShade')}</span>
      </div>
    </div>
  `;
}
