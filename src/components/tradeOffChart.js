/**
 * Smart Trade-Off Curve (Pareto Frontier) Component
 * Plots CROP SUNLIGHT vs SOLAR GENERATION for all evaluated configurations.
 * Visually proves the algorithm finds the multi-objective Pareto sweet spot!
 */

import { t } from '../data/i18n.js';

export function renderTradeOffChartSVG({ candidates = [], best = null, current = null }) {
  const width = 640;
  const height = 360;
  const pad = { top: 30, right: 40, bottom: 50, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // X Axis: Crop Sunlight (30% to 100%)
  const minX = 30;
  const maxX = 100;
  // Y Axis: Solar Generation (30% to 100%)
  const minY = 30;
  const maxY = 100;

  const toSvgX = (val) => pad.left + ((val - minX) / (maxX - minX)) * plotW;
  const toSvgY = (val) => pad.top + plotH - ((val - minY) / (maxY - minY)) * plotH;

  // Render scatter points
  const dotsSvg = candidates.map((c, i) => {
    const x = toSvgX(c.groundSunlightPercent);
    const y = toSvgY(c.solarScore);
    const isBest = best && c.config.angle === best.config.angle && c.config.height === best.config.height && c.config.spacing === best.config.spacing;
    const isCurrent = current && c.config.angle === current.config.angle && c.config.height === current.config.height;

    if (isBest) return ''; // Will render distinctly on top
    if (isCurrent) return '';

    return `
      <circle cx="${x}" cy="${y}" r="4.5" fill="#2F7D4F" opacity="0.45" class="tradeoff-dot">
        <title>Angle: ${c.config.angle}°, Height: ${c.config.height}m | Crop: ${c.groundSunlightPercent}%, Solar: ${c.solarScore}%, Balance: ${c.overallBalance}</title>
      </circle>
    `;
  }).join('');

  // Current setup dot
  let currentSvg = '';
  if (current) {
    const cx = toSvgX(current.groundSunlightPercent);
    const cy = toSvgY(current.solarScore);
    currentSvg = `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="8" fill="#E2E8F0" stroke="#64748B" stroke-width="2.5" />
        <circle cx="0" cy="0" r="4" fill="#64748B" />
        <rect x="-45" y="-28" width="90" height="20" rx="4" fill="#1E293B" opacity="0.9" />
        <text x="0" y="-14" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">${t('currentSetup')} (${current.overallBalance})</text>
      </g>
    `;
  }

  // Recommended Sweet Spot dot
  let bestSvg = '';
  if (best) {
    const bx = toSvgX(best.groundSunlightPercent);
    const by = toSvgY(best.solarScore);
    bestSvg = `
      <g transform="translate(${bx}, ${by})">
        <circle cx="0" cy="0" r="14" fill="#F7C948" opacity="0.3" class="pulse-ring" />
        <circle cx="0" cy="0" r="9" fill="#F7C948" stroke="#123B2A" stroke-width="3" />
        <text x="0" y="4" font-size="10" font-weight="bold" fill="#123B2A" text-anchor="middle">★</text>
        <rect x="-65" y="-34" width="130" height="24" rx="6" fill="#123B2A" stroke="#F7C948" stroke-width="1.5" />
        <text x="0" y="-18" font-size="11" font-weight="bold" fill="#F7C948" text-anchor="middle" font-family="sans-serif">
          ⭐ ${t('legendSweetSpot')} (${best.overallBalance})
        </text>
      </g>
    `;
  }

  return `
    <div class="tradeoff-card">
      <div class="tradeoff-header">
        <h4 class="tradeoff-title">📈 ${t('tradeoffTitle')}</h4>
        <span class="tradeoff-sub">${t('tradeoffSub')}</span>
      </div>

      <div class="tradeoff-chart-wrapper">
        <svg viewBox="0 0 ${width} ${height}" class="tradeoff-svg" aria-label="Crop Sunlight vs Solar Generation Pareto Curve">
          <!-- Background Grid Lines -->
          <line x1="${pad.left}" y1="${toSvgY(50)}" x2="${width - pad.right}" y2="${toSvgY(50)}" stroke="#E2E8F0" stroke-dasharray="3,3" />
          <line x1="${pad.left}" y1="${toSvgY(75)}" x2="${width - pad.right}" y2="${toSvgY(75)}" stroke="#E2E8F0" stroke-dasharray="3,3" />
          <line x1="${toSvgX(50)}" y1="${pad.top}" x2="${toSvgX(50)}" y2="${height - pad.bottom}" stroke="#E2E8F0" stroke-dasharray="3,3" />
          <line x1="${toSvgX(75)}" y1="${pad.top}" x2="${toSvgX(75)}" y2="${height - pad.bottom}" stroke="#E2E8F0" stroke-dasharray="3,3" />

          <!-- Axes -->
          <line x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}" stroke="#475569" stroke-width="2" />
          <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${height - pad.bottom}" stroke="#475569" stroke-width="2" />

          <!-- Axis Labels -->
          <text x="${width / 2}" y="${height - 12}" font-size="12" font-weight="bold" fill="#123B2A" text-anchor="middle" font-family="sans-serif">
            ${t('cropAxis')}
          </text>
          <text x="18" y="${height / 2}" font-size="12" font-weight="bold" fill="#123B2A" text-anchor="middle" font-family="sans-serif" transform="rotate(-90 18 ${height / 2})">
            ${t('solarAxis')}
          </text>

          <!-- Tick Marks & Values -->
          <text x="${toSvgX(50)}" y="${height - pad.bottom + 18}" font-size="10" fill="#64748B" text-anchor="middle">50%</text>
          <text x="${toSvgX(75)}" y="${height - pad.bottom + 18}" font-size="10" fill="#64748B" text-anchor="middle">75%</text>
          <text x="${toSvgX(100)}" y="${height - pad.bottom + 18}" font-size="10" fill="#64748B" text-anchor="middle">100%</text>

          <text x="${pad.left - 10}" y="${toSvgY(50) + 4}" font-size="10" fill="#64748B" text-anchor="end">50%</text>
          <text x="${pad.left - 10}" y="${toSvgY(75) + 4}" font-size="10" fill="#64748B" text-anchor="end">75%</text>
          <text x="${pad.left - 10}" y="${toSvgY(100) + 4}" font-size="10" fill="#64748B" text-anchor="end">100%</text>

          <!-- Candidate Scatter Dots -->
          ${dotsSvg}

          <!-- Current & Best -->
          ${currentSvg}
          ${bestSvg}
        </svg>
      </div>

      <div class="tradeoff-legend">
        <span class="legend-item"><span class="dot-sample best-dot">★</span> ${t('legendSweetSpot')}</span>
        <span class="legend-item"><span class="dot-sample current-dot">●</span> ${t('legendCurrent')}</span>
        <span class="legend-item"><span class="dot-sample candidate-dot">●</span> ${t('legendCandidates')}</span>
      </div>
    </div>
  `;
}
