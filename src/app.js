/**
 * SUN-STARVED TRACKER — Application Core Orchestrator
 * Agri-Voltaics Optimizer Progressive Web App
 */

import { DEMO_FARM } from './data/demoData.js';
import { CROPS_DATA } from './data/crops.js';
import { I18N_DATA, getLanguage, setLanguage, t, initI18n } from './data/i18n.js';
import {
  openDatabase,
  getAllFarms,
  getFarm,
  saveFarm,
  deleteFarm,
  saveFarmPhoto,
  getFarmPhoto,
  saveOptimizationResult
} from './services/db.js';
import { fetchFarmWeather } from './services/weather.js';
import { getBrowserLocation, getLastKnownLocation } from './services/location.js';
import { extractExifGPS } from './services/exif.js';
import { getSolarPosition } from './engine/solarGeometry.js';
import { calculateShadowProfile } from './engine/shadowModel.js';
import { runOptimization, evaluateConfiguration } from './engine/optimizer.js';
import { renderDigitalTwinSVG } from './components/digitalTwin.js';
import { renderBalanceMeter } from './components/balanceMeter.js';
import { renderTradeOffChartSVG } from './components/tradeOffChart.js';
import { renderHeatmap } from './components/heatmap.js';
import { renderActuatorControl } from './components/actuator.js';
import { renderDashboardHTML } from './components/dashboard.js';
import { renderCropTimelineView } from './components/cropCamera.js';
import { renderEnergyViewHTML } from './components/energyView.js';
import { renderPositioningViewHTML } from './components/positioningView.js';
import { renderAlertsViewHTML } from './components/alertsView.js';
import { renderSchedulerViewHTML } from './components/schedulerView.js';
import { renderSimulatorViewHTML } from './components/simulatorView.js';
import { renderReportsViewHTML } from './components/reportsView.js';
import {
  renderSupportViewHTML,
  saveFeedbackEntry,
  saveServiceRequest
} from './components/supportView.js';
import {
  renderSecurityDashboardView,
  renderLoginModalHTML,
  renderRegisterModalHTML,
  renderOtpModalHTML,
  renderBiometricScannerModalHTML,
  renderReauthChallengeModalHTML
} from './components/securityView.js';
import {
  startIotEngine,
  getIotState,
  subscribeIot,
  setAutomationMode,
  togglePanelHardwareStatus,
  toggleIrrigationPumpManual,
  setIrrigationModeAuto,
  triggerSimulatedRain,
  triggerAudioChime,
  dismissAlert,
  simulateSolarFailure,
  simulateRestoreSolar,
  simulateBatteryLow20,
  simulateRainDetection,
  simulateHighWindGust,
  simulateGridFailure,
  simulateRestoreGrid,
  simulateNetworkCut,
  simulateRestoreNetwork,
  triggerEmergencyStop,
  resetEmergencyStop,
  setManualSliders,
  setActuatorAngle,
  acknowledgeAlert,
  resolveAlert,
  updateSchedulerConfig,
  diagnoseSolarOutput
} from './services/iotEngine.js';
import {
  loginFarmer,
  registerFarmer,
  sendPhoneOtp,
  verifyPhoneOtp,
  authenticateBiometric,
  getCurrentSession,
  logoutCurrentDevice,
  logoutAllDevices,
  promptReauth,
  DEMO_FARMER
} from './services/auth.js';
import {
  initVoiceAssistant,
  openVoiceAssistant,
  toggleVoiceAssistant,
  setVoiceAssistantView,
  triggerVoiceAlert,
  readCurrentScreen
} from './services/voiceAssistant.js';

// Global Application State
const state = {
  currentFarm: JSON.parse(JSON.stringify(DEMO_FARM)),
  activeView: 'home',
  optimizationResult: null,
  viewExplainerMode: 'farmer', // 'farmer' | 'technical'
  simulationParams: {
    hour: 12.0,
    isPlaying: false,
    playTimerId: null,
    cloudCover: 25,
    panelTilt: 25,
    panelHeight: 3.0,
    panelSpacing: 2.5,
    rowSpacing: 4.0
  },
  actuatorState: {
    currentAngle: 25,
    targetAngle: 35,
    status: 'ready', // 'ready' | 'moving' | 'reached'
    progress: 0,
    animId: null
  },
  onboardingStep: 0,
  presentationActive: false,
  presentationStep: 0,
  cameraStream: null,
  capturedPhotoBlob: null,
  isOnline: navigator.onLine,
  cropCameraSlot: 'morning',
  cropCameraSettings: { selectedCamera: 'cam-1', anomalyMask: true },
  securityTab: 'profile',
  supportTab: 'contact',
  soundEnabled: true,
  energyPeriod: 'daily',
  alertFilter: 'all',
  reportPeriod: 'daily'
};

// ============================================================
// INITIALIZATION
// ============================================================
async function init() {
  initI18n();
  const currentLang = getLanguage();
  const langSelect = document.getElementById('lang-selector');
  if (langSelect) langSelect.value = currentLang;
  document.documentElement.lang = currentLang;
  applyTranslations();

  // Initialize DB and load farm
  try {
    await openDatabase();
    const farms = await getAllFarms();
    if (farms.length > 0) {
      // Use most recent farm
      state.currentFarm = farms[farms.length - 1];
    } else {
      // Seed default demo farm to IndexedDB for offline persistence
      await saveFarm(state.currentFarm);
    }
  } catch (err) {
    console.warn('IndexedDB initial load error:', err);
  }

  // Sync simulation params with current farm setup
  syncSimulationWithFarm();

  // Initial optimization run
  executeOptimizer();

  // Setup Event Listeners
  setupNavigation();
  setupNetworkSync();
  setupLanguageHandler();
  setupPresentationTour();
  setupSecurityAndIot();
  registerPWA();

  // Initialize Kisan Vani AI Multilingual Voice Assistant
  initVoiceAssistant(state.activeView);

  // Route initial view
  handleRouting();
  window.addEventListener('hashchange', handleRouting);
}

function syncSimulationWithFarm() {
  const f = state.currentFarm;
  state.simulationParams.panelTilt = f.solar?.angle || 25;
  state.simulationParams.panelHeight = f.solar?.height || 3.0;
  state.simulationParams.panelSpacing = f.solar?.panelSpacing || 2.5;
  state.simulationParams.rowSpacing = f.solar?.rowSpacing || 4.0;
  state.simulationParams.cloudCover = f.weather?.cloudCover || 25;
  state.actuatorState.currentAngle = f.solar?.angle || 25;
}

function executeOptimizer() {
  const f = state.currentFarm;
  const solarPos = getSolarPosition(
    f.location?.lat || 13.1,
    f.location?.lon || 78.1,
    new Date(),
    state.simulationParams.hour
  );

  state.optimizationResult = runOptimization({
    currentConfig: {
      ...f.solar,
      angle: state.simulationParams.panelTilt,
      height: state.simulationParams.panelHeight,
      spacing: state.simulationParams.panelSpacing,
      rowSpacing: state.simulationParams.rowSpacing
    },
    cropId: f.cropId || 'tomato',
    growthStageId: f.growthStage || 'flowering',
    weather: f.weather || DEMO_FARM.weather,
    location: f.location || DEMO_FARM.location,
    solarPosition: solarPos
  });

  state.actuatorState.targetAngle = state.optimizationResult.recommended.config.angle;
}

// ============================================================
// ROUTING & VIEW CONTROLLER
// ============================================================
function handleRouting() {
  const hash = window.location.hash.replace('#', '') || 'home';
  state.activeView = hash;
  setVoiceAssistantView(hash);

  // Update navigation classes
  document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(el => {
    if (el.getAttribute('data-view') === hash) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Stop camera if leaving scan view or camera view
  if (hash !== 'scan' && hash !== 'camera' && state.cameraStream) {
    stopCamera();
  }

  // Render target view
  renderCurrentView();
}

function renderCurrentView() {
  const container = document.getElementById('main-content');
  if (!container) return;

  switch (state.activeView) {
    case 'home':
      container.innerHTML = renderHomeView();
      bindHomeEvents();
      break;
    case 'dashboard':
      container.innerHTML = renderDashboardHTML();
      bindDashboardEvents();
      break;
    case 'camera':
      container.innerHTML = renderCropTimelineView(state.cropCameraSlot, state.cropCameraSettings);
      bindCropCameraEvents();
      break;
    case 'energy':
      container.innerHTML = renderEnergyViewHTML(state.energyPeriod);
      bindEnergyEvents();
      break;
    case 'positioning':
      container.innerHTML = renderPositioningViewHTML();
      bindPositioningEvents();
      break;
    case 'alerts':
      container.innerHTML = renderAlertsViewHTML(state.alertFilter);
      bindAlertsEvents();
      break;
    case 'scheduler':
      container.innerHTML = renderSchedulerViewHTML();
      bindSchedulerEvents();
      break;
    case 'simulator':
      container.innerHTML = renderSimulatorViewHTML();
      bindSimulatorEvents();
      break;
    case 'reports':
      container.innerHTML = renderReportsViewHTML(state.reportPeriod);
      bindReportsEvents();
      break;
    case 'support':
      container.innerHTML = renderSupportViewHTML(state.supportTab);
      bindSupportEvents();
      break;
    case 'security':
      container.innerHTML = renderSecurityDashboardView(state.securityTab);
      bindSecurityEvents();
      break;
    case 'scan':
      container.innerHTML = renderScanView();
      bindScanEvents();
      break;
    case 'weather':
      container.innerHTML = renderWeatherView();
      bindWeatherEvents();
      break;
    case 'optimize':
      container.innerHTML = renderOptimizeView();
      bindOptimizeEvents();
      break;
    case 'results':
      container.innerHTML = renderResultsView();
      bindResultsEvents();
      break;
    case 'farms':
      container.innerHTML = renderFarmsView();
      bindFarmsEvents();
      break;
    case 'whatif':
      container.innerHTML = renderWhatIfView();
      bindWhatIfEvents();
      break;
    case 'onboarding':
      container.innerHTML = renderOnboardingView();
      bindOnboardingEvents();
      break;
    default:
      container.innerHTML = renderHomeView();
      bindHomeEvents();
      break;
  }

  // Ensure full translation is applied across the entire document and newly rendered view
  applyTranslations();
}

// ============================================================
// VIEW: 01. HOME DASHBOARD
// ============================================================
function renderHomeView() {
  const farm = state.currentFarm;
  const opt = state.optimizationResult;
  const best = opt?.recommended;
  const cur = opt?.current;
  const p = state.simulationParams;

  const solarPos = getSolarPosition(farm.location?.lat || 13.1, farm.location?.lon || 78.1, new Date(), p.hour);

  const shadow = calculateShadowProfile({
    panelHeight: p.panelHeight,
    panelTiltDeg: p.panelTilt,
    panelSpacing: p.panelSpacing,
    rowSpacing: p.rowSpacing,
    sunElevDeg: solarPos.elevationDeg,
    sunAzimuthDeg: solarPos.azimuthDeg,
    cloudCover: p.cloudCover,
    ambientRadiation: farm.weather?.solarRadiation || 650
  });

  return `
    <!-- Hero Message Banner -->
    <section class="hero-card">
      <div class="hero-tag">🌞 ${t('appTitle')} • ${t('tagline')}</div>
      <h1 class="hero-headline">${t('heroTitle')}</h1>
      <p class="hero-subheadline">${t('heroSubtitle')}</p>
      <div class="hero-cta-group">
        <a href="#optimize" class="btn btn-accent">${t('btnOptimize')}</a>
        <button id="btn-home-demo" class="btn btn-secondary">${t('btnDemo')}</button>
        <a href="#scan" class="btn btn-secondary">${t('btnScan')}</a>
      </div>
    </section>

    <!-- Friendly Quick Start Guide -->
    <section class="friendly-guide-card">
      <div class="friendly-guide-header">
        <h2 class="friendly-guide-title">
          <span>💡</span> ${t('howItWorksTitle')}
        </h2>
        <button id="btn-open-guide-inline" class="btn btn-sm btn-secondary">${t('btnReadGuide')}</button>
      </div>
      <div class="steps-simple-grid">
        <div class="step-simple-card">
          <div class="step-badge-num">1</div>
          <div class="step-simple-title">${t('step1Title')}</div>
          <div class="step-simple-desc">${t('step1Desc')} (${farm.cropName || t('crop_tomato')}).</div>
        </div>
        <div class="step-simple-card">
          <div class="step-badge-num">2</div>
          <div class="step-simple-title">${t('step2Title')}</div>
          <div class="step-simple-desc">${t('step2Desc')}</div>
        </div>
        <div class="step-simple-card">
          <div class="step-badge-num">3</div>
          <div class="step-simple-title">${t('step3Title')}</div>
          <div class="step-simple-desc">${t('step3Desc')}</div>
        </div>
      </div>
    </section>

    <!-- Farm Pulse Bar -->
    <section class="card" aria-label="Farm Pulse Status">
      <div class="card-header">
        <h2 class="card-title">${t('farmPulse')}</h2>
        <span class="badge ${farm.isDemo ? 'badge-demo' : 'badge-live'}">
          ${farm.isDemo ? t('badgeDemo') : t('activeFarm')}
        </span>
      </div>
      <div class="pulse-grid">
        <div class="pulse-item">
          <span class="pulse-label">${t('cropSunlight')}</span>
          <span class="pulse-status ${cur?.groundSunlightPercent >= 75 ? 'good' : 'fair'}">
            ${cur?.groundSunlightPercent >= 75 ? '🟢 ' + t('statusGood') + ' (' + cur?.groundSunlightPercent + '%)' : '🟡 ' + t('statusModerate') + ' (' + cur?.groundSunlightPercent + '%)'}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('solarEnergy')}</span>
          <span class="pulse-status ${cur?.solarScore >= 80 ? 'high' : 'fair'}">
            ${cur?.solarScore >= 80 ? '⚡ ' + t('statusHigh') + ' (' + cur?.estimatedPowerKW + ' kW)' : '⚡ ' + t('statusOptimal')}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('weatherStatus')}</span>
          <span class="pulse-status good">
            ${farm.weather?.conditionIcon || '🌤️'} ${farm.weather?.temp || 24}°C
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('panelPosition')}</span>
          <span class="pulse-status ${p.panelTilt === best?.config?.angle ? 'good' : 'fair'}">
            ${p.panelTilt === best?.config?.angle ? '✓ ' + t('statusOptimized') : '⚙️ ' + t('statusNeedsAdjust')}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('locationStatus')}</span>
          <span class="pulse-status good">
            📍 ${farm.location?.village || farm.location?.district || t('statusAvailable')}
          </span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('networkStatus')}</span>
          <span class="pulse-status ${state.isOnline ? 'good' : 'fair'}">
            ${state.isOnline ? t('syncOnline') : t('syncOffline')}
          </span>
        </div>
        <div class="pulse-item" style="grid-column: 1 / -1;">
          <span class="pulse-label">${t('cropComfortLevel')}</span>
          <span class="crop-mood-badge ${cur?.groundSunlightPercent >= 75 ? '' : cur?.groundSunlightPercent < 55 ? 'mood-low' : ''}">
            ${cur?.groundSunlightPercent >= 75 ? '😊 ' + (farm.cropName || t('crop_tomato')) + ' ' + t('cropHappy') + ' (' + cur?.groundSunlightPercent + '%)' : '😟 ' + (farm.cropName || t('crop_tomato')) + ' ' + t('cropSad')}
          </span>
        </div>
      </div>
    </section>

    <!-- Signature Visual: Farm Sunlight Balance Meter -->
    ${renderBalanceMeter({
      cropSunlight: cur?.groundSunlightPercent || 84,
      solarScore: cur?.solarScore || 91,
      overallBalance: cur?.overallBalance || 88
    })}

    <!-- Interactive Living Digital Twin -->
    <section class="digital-twin-wrapper">
      <div class="card-header" style="padding: 1.25rem 1.5rem 0.5rem;">
        <div>
          <h2 class="card-title">${t('digitalTwinTitle')}</h2>
          <p class="card-subtitle">${t('digitalTwinSub')}</p>
        </div>
        <span class="badge badge-sim">${t('badgeSim')}</span>
      </div>

      <div class="digital-twin-viewport">
        ${renderDigitalTwinSVG({
          sunElevationDeg: solarPos.elevationDeg,
          sunAzimuthDeg: solarPos.azimuthDeg,
          panelTiltDeg: p.panelTilt,
          panelHeight: p.panelHeight,
          panelSpacing: p.panelSpacing,
          rowSpacing: p.rowSpacing,
          cloudCover: p.cloudCover,
          cropId: farm.cropId,
          growthStageId: farm.growthStage,
          groundLightPercent: shadow.groundSunlightPercent,
          shadowLength: shadow.shadowLength,
          shadowOffset: shadow.shadowOffset,
          hour: p.hour
        })}
      </div>

      <!-- Live Interactive Controls with Plain-English Hints -->
      <div class="twin-controls-panel">
        <div class="twin-controls-grid">
          <!-- Panel Angle Slider -->
          <div class="control-slider-group">
            <div class="slider-label-row">
              <label for="slider-angle">${t('panelAngle')}</label>
              <span class="slider-val-badge" id="val-angle">${p.panelTilt}°</span>
            </div>
            <input type="range" id="slider-angle" min="10" max="65" step="1" value="${p.panelTilt}" />
            <div class="slider-hint-box" id="hint-angle">
              ${p.panelTilt < 22 ? t('hintFlat') : p.panelTilt <= 40 ? t('hintBalanced') : t('hintSteep')}
            </div>
          </div>

          <!-- Panel Height Slider -->
          <div class="control-slider-group">
            <div class="slider-label-row">
              <label for="slider-height">${t('panelHeight')}</label>
              <span class="slider-val-badge" id="val-height">${p.panelHeight}m</span>
            </div>
            <input type="range" id="slider-height" min="2.0" max="5.0" step="0.25" value="${p.panelHeight}" />
            <div class="slider-hint-box" id="hint-height">
              ${p.panelHeight <= 2.5 ? t('hintLowClearance') : p.panelHeight <= 3.5 ? t('hintStdClearance') : t('hintHighClearance')}
            </div>
          </div>

          <!-- Panel Spacing Slider -->
          <div class="control-slider-group">
            <div class="slider-label-row">
              <label for="slider-spacing">${t('panelSpacing')}</label>
              <span class="slider-val-badge" id="val-spacing">${p.panelSpacing}m</span>
            </div>
            <input type="range" id="slider-spacing" min="1.5" max="4.5" step="0.25" value="${p.panelSpacing}" />
            <div class="slider-hint-box" id="hint-spacing">
              ${p.panelSpacing <= 2.0 ? t('hintNarrowGap') : t('hintWideGap')}
            </div>
          </div>
        </div>

        <!-- Time of Day Orbit Controller -->
        <div class="time-control-strip">
          <button id="btn-play-sun" class="btn-icon-play" title="Auto-orbit celestial sun">
            ${p.isPlaying ? '⏸' : '▶'}
          </button>
          <div style="flex:1;">
            <div class="slider-label-row">
              <label for="slider-hour">${t('timeOfDay')}</label>
              <span class="slider-val-badge" id="val-hour">${Math.floor(p.hour)}:${p.hour % 1 >= 0.5 ? '30' : '00'}</span>
            </div>
            <input type="range" id="slider-hour" min="6" max="18" step="0.25" value="${p.hour}" />
          </div>
        </div>

        <!-- One-Click Auto-Adjust Button -->
        <button id="btn-quick-sweet-spot" class="btn-auto-sweet">
          ${t('btnAutoSweetSpot')} (${best?.config?.angle || 35}°)
        </button>
      </div>
    </section>

    <!-- AI Sweet Spot Quick Callout Card -->
    <section class="card" style="border: 2px solid var(--color-agri-fresh); background: #FAFDF9;">
      <div class="card-header">
        <h2 class="card-title">⭐ ${t('aiSweetSpotFound')}</h2>
        <a href="#optimize" class="btn btn-sm btn-primary">${t('btnViewEngine')}</a>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">
        ${opt?.explanation || t('heroSubtitle')}
      </p>
      <div class="grid-3">
        <div class="pulse-item">
          <span class="pulse-label">${t('recommendedTilt')}</span>
          <span class="pulse-status good">${best?.config?.angle}°</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('clearanceHeight')}</span>
          <span class="pulse-status good">${best?.config?.height}m</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('balanceScore')}</span>
          <span class="pulse-status good">${best?.overallBalance}/100</span>
        </div>
      </div>
    </section>

    <!-- Dynamic Sunlight Alerts (Generated mathematically) -->
    <section class="card">
      <div class="card-header">
        <h2 class="card-title">${t('alertsTitle')}</h2>
        <span class="badge badge-live">${t('badgeLiveEvaluated')}</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.65rem;">
        ${generateSunlightAlertsHTML(farm, cur, best)}
      </div>
    </section>

    <!-- Today's Farm Plan -->
    <section class="card">
      <div class="card-header">
        <h2 class="card-title">${t('planTitle')}</h2>
        <span class="badge badge-sim">${t('badgePrototypeSchedule')}</span>
      </div>
      <div class="grid-4">
        <div class="pulse-item">
          <span class="pulse-label">${t('morning')}</span>
          <small style="color:var(--text-muted);">${t('morningDesc')}</small>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('midday')}</span>
          <small style="color:var(--text-muted);">${t('middayDesc')}</small>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('afternoon')}</span>
          <small style="color:var(--text-muted);">${t('afternoonDesc')}</small>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('evening')}</span>
          <small style="color:var(--text-muted);">${t('eveningDesc')}</small>
        </div>
      </div>
    </section>
  `;
}

function generateSunlightAlertsHTML(farm, cur, best) {
  const alerts = [];
  const crop = CROPS_DATA[farm.cropId] || CROPS_DATA.tomato;

  if (cur?.groundSunlightPercent < crop.minDLI) {
    alerts.push({
      type: 'warning',
      icon: '⚠️',
      title: t('alertCropBelow'),
      desc: `${cur?.groundSunlightPercent}% < ${crop.minDLI} mol/m²/d (${farm.cropName || t('crop_tomato')}).`
    });
  }

  if (farm.weather?.solarRadiation > 600) {
    alerts.push({
      type: 'success',
      icon: '☀️',
      title: t('alertStrongSun'),
      desc: `${farm.weather.solarRadiation} W/m². High solar window active.`
    });
  }

  if (cur?.config?.angle !== best?.config?.angle) {
    alerts.push({
      type: 'info',
      icon: '⚙️',
      title: t('alertAiRecommends'),
      desc: `${cur?.config?.angle}° ➔ ${best?.config?.angle}° (+${(best?.overallBalance || 0) - (cur?.overallBalance || 0)} pts).`
    });
  }

  if (farm.weather?.cloudCover > 50) {
    alerts.push({
      type: 'neutral',
      icon: '☁️',
      title: t('alertCloudCover'),
      desc: `${farm.weather.cloudCover}%. Diffuse PAR prioritized.`
    });
  }

  return alerts.map(a => `
    <div style="background:var(--bg-subtle); padding:0.85rem 1rem; border-radius:var(--radius-md); border-left:4px solid var(--color-agri-fresh); display:flex; gap:0.75rem; align-items:flex-start;">
      <span style="font-size:1.3rem;">${a.icon}</span>
      <div>
        <div style="font-weight:800; font-size:0.9rem; color:var(--color-agri-dark);">${a.title}</div>
        <div style="font-size:0.82rem; color:var(--text-secondary);">${a.desc}</div>
      </div>
    </div>
  `).join('');
}

function bindHomeEvents() {
  // Demo Farm Button
  const demoBtn = document.getElementById('btn-home-demo');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      loadDemoFarm();
      showToast('Loaded demo farm: Green Valley Farm');
      renderCurrentView();
    });
  }

  // Interactive Digital Twin Sliders
  const angleSlider = document.getElementById('slider-angle');
  const heightSlider = document.getElementById('slider-height');
  const spacingSlider = document.getElementById('slider-spacing');
  const hourSlider = document.getElementById('slider-hour');
  const playBtn = document.getElementById('btn-play-sun');

  if (angleSlider) {
    angleSlider.addEventListener('input', (e) => {
      state.simulationParams.panelTilt = parseInt(e.target.value);
      state.currentFarm.solar.angle = state.simulationParams.panelTilt;
      document.getElementById('val-angle').textContent = e.target.value + '°';
      const hint = document.getElementById('hint-angle');
      if (hint) {
        const v = state.simulationParams.panelTilt;
        hint.textContent = v < 22 ? t('hintFlat') : v <= 40 ? t('hintBalanced') : t('hintSteep');
      }
      executeOptimizer();
      updateDigitalTwinLive();
    });
  }

  if (heightSlider) {
    heightSlider.addEventListener('input', (e) => {
      state.simulationParams.panelHeight = parseFloat(e.target.value);
      state.currentFarm.solar.height = state.simulationParams.panelHeight;
      document.getElementById('val-height').textContent = e.target.value + 'm';
      const hint = document.getElementById('hint-height');
      if (hint) {
        const v = state.simulationParams.panelHeight;
        hint.textContent = v <= 2.5 ? t('hintLowClearance') : v <= 3.5 ? t('hintStdClearance') : t('hintHighClearance');
      }
      executeOptimizer();
      updateDigitalTwinLive();
    });
  }

  if (spacingSlider) {
    spacingSlider.addEventListener('input', (e) => {
      state.simulationParams.panelSpacing = parseFloat(e.target.value);
      state.currentFarm.solar.panelSpacing = state.simulationParams.panelSpacing;
      document.getElementById('val-spacing').textContent = e.target.value + 'm';
      const hint = document.getElementById('hint-spacing');
      if (hint) {
        const v = state.simulationParams.panelSpacing;
        hint.textContent = v <= 2.0 ? t('hintNarrowGap') : t('hintWideGap');
      }
      executeOptimizer();
      updateDigitalTwinLive();
    });
  }

  if (hourSlider) {
    hourSlider.addEventListener('input', (e) => {
      state.simulationParams.hour = parseFloat(e.target.value);
      document.getElementById('val-hour').textContent = formatHour(state.simulationParams.hour);
      executeOptimizer();
      updateDigitalTwinLive();
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      toggleSunOrbitPlay();
    });
  }

  // One-Click Auto-Adjust to Sweet Spot
  const sweetBtn = document.getElementById('btn-quick-sweet-spot');
  if (sweetBtn) {
    sweetBtn.addEventListener('click', () => {
      const bestAngle = state.optimizationResult?.recommended?.config?.angle || 35;
      state.simulationParams.panelTilt = bestAngle;
      state.currentFarm.solar.angle = bestAngle;
      state.actuatorState.currentAngle = bestAngle;
      const angleS = document.getElementById('slider-angle');
      if (angleS) angleS.value = bestAngle;
      const valA = document.getElementById('val-angle');
      if (valA) valA.textContent = bestAngle + '°';
      const hintA = document.getElementById('hint-angle');
      if (hintA) hintA.textContent = t('hintBalanced');
      executeOptimizer();
      updateDigitalTwinLive();
      showToast(`🎉 Panels adjusted to ${bestAngle}°! Plants receive optimal light & clean energy is maximized.`);
      renderCurrentView();
    });
  }

  // Inline Guide Button
  const inlineGuideBtn = document.getElementById('btn-open-guide-inline');
  if (inlineGuideBtn) {
    inlineGuideBtn.addEventListener('click', () => {
      openSimpleGuideModal();
    });
  }
}

function updateDigitalTwinLive() {
  const p = state.simulationParams;
  const f = state.currentFarm;
  const solarPos = getSolarPosition(f.location?.lat || 13.1, f.location?.lon || 78.1, new Date(), p.hour);

  const shadow = calculateShadowProfile({
    panelHeight: p.panelHeight,
    panelTiltDeg: p.panelTilt,
    panelSpacing: p.panelSpacing,
    rowSpacing: p.rowSpacing,
    sunElevDeg: solarPos.elevationDeg,
    sunAzimuthDeg: solarPos.azimuthDeg,
    cloudCover: p.cloudCover,
    ambientRadiation: f.weather?.solarRadiation || 650
  });

  const viewport = document.querySelector('.digital-twin-viewport');
  if (viewport) {
    viewport.innerHTML = renderDigitalTwinSVG({
      sunElevationDeg: solarPos.elevationDeg,
      sunAzimuthDeg: solarPos.azimuthDeg,
      panelTiltDeg: p.panelTilt,
      panelHeight: p.panelHeight,
      panelSpacing: p.panelSpacing,
      rowSpacing: p.rowSpacing,
      cloudCover: p.cloudCover,
      cropId: f.cropId,
      growthStageId: f.growthStage,
      groundLightPercent: shadow.groundSunlightPercent,
      shadowLength: shadow.shadowLength,
      shadowOffset: shadow.shadowOffset,
      hour: p.hour
    });
  }

  // Update Balance Meter if present
  const cur = state.optimizationResult?.current;
  const meterContainer = document.querySelector('.balance-meter-container');
  if (meterContainer && cur) {
    meterContainer.outerHTML = renderBalanceMeter({
      cropSunlight: cur.groundSunlightPercent,
      solarScore: cur.solarScore,
      overallBalance: cur.overallBalance
    });
  }
}

function formatHour(h) {
  const floor = Math.floor(h);
  const min = Math.round((h - floor) * 60);
  return `${floor.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
}

function toggleSunOrbitPlay() {
  const p = state.simulationParams;
  p.isPlaying = !p.isPlaying;
  const playBtn = document.getElementById('btn-play-sun');

  if (p.isPlaying) {
    if (playBtn) playBtn.textContent = '⏸';
    p.playTimerId = setInterval(() => {
      p.hour += 0.2;
      if (p.hour > 18) p.hour = 6;
      const hourSlider = document.getElementById('slider-hour');
      if (hourSlider) hourSlider.value = p.hour;
      const valHour = document.getElementById('val-hour');
      if (valHour) valHour.textContent = formatHour(p.hour);
      executeOptimizer();
      updateDigitalTwinLive();
    }, 150);
  } else {
    if (playBtn) playBtn.textContent = '▶';
    clearInterval(p.playTimerId);
  }
}

// ============================================================
// VIEW: 02. SCAN & CROP PHOTO
// ============================================================
function renderScanView() {
  const farm = state.currentFarm;
  const analysis = farm.cropAnalysis || DEMO_FARM.cropAnalysis;

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${t('scanTitle')}</h2>
          <p class="card-subtitle">${t('scanSubtitle')}</p>
        </div>
        <span class="badge badge-demo">${t('badgeDemoAi')}</span>
      </div>

      <!-- Camera Live View / Captured Photo Container -->
      <div style="background:#0F172A; border-radius:var(--radius-md); overflow:hidden; position:relative; min-height:280px; display:flex; align-items:center; justify-content:center;">
        <video id="camera-stream" autoplay playsinline style="width:100%; max-height:400px; object-fit:cover; display:none;"></video>
        <canvas id="camera-canvas" style="display:none;"></canvas>
        <img id="photo-preview" src="${farm.photoDataUrl || ''}" alt="Farm Photo Preview" style="width:100%; max-height:400px; object-fit:cover; display:${farm.photoDataUrl ? 'block' : 'none'};" />

        <div id="camera-placeholder" style="display:${farm.photoDataUrl ? 'none' : 'flex'}; flex-direction:column; align-items:center; color:#94A3B8; padding:2rem; text-align:center;">
          <span style="font-size:3rem; margin-bottom:0.5rem;">🌱</span>
          <strong>${t('noPhotoYet')}</strong>
          <small>${t('noPhotoSub')}</small>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:1.25rem;">
        <button id="btn-start-camera" class="btn btn-primary">${t('btnTakePhoto')}</button>
        <button id="btn-snap-photo" class="btn btn-accent" style="display:none;">${t('btnCaptureSnapshot')}</button>
        <label class="btn btn-secondary" style="cursor:pointer;">
          ${t('btnUploadPhoto')}
          <input type="file" id="file-upload" accept="image/*" style="display:none;" />
        </label>
        <button id="btn-retake-photo" class="btn btn-secondary" style="display:${farm.photoDataUrl ? 'inline-flex' : 'none'};">${t('btnRetake')}</button>
        <button id="btn-delete-photo" class="btn btn-danger" style="display:${farm.photoDataUrl ? 'inline-flex' : 'none'};">${t('btnDelete')}</button>
      </div>
    </div>

    <!-- GPS Extraction Status Card -->
    <div class="card" id="exif-card">
      <div class="card-header">
        <h3 class="card-title">${t('exifTitle')}</h3>
        <span class="badge ${farm.location?.source === 'LIVE' ? 'badge-live' : 'badge-demo'}">
          ${farm.location?.source === 'LIVE' ? t('badgeGpsDetected') : t('badgeLocation')}
        </span>
      </div>
      <div id="exif-result-text">
        <p style="color:var(--text-secondary); margin-bottom:0.75rem;">
          ${t('coordinates')}: <strong>${farm.location?.lat}°N, ${farm.location?.lon}°E</strong> (${farm.location?.label || t('farmLocation')})
        </p>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button id="btn-use-gps" class="btn btn-sm btn-primary">${t('btnUseMyLocation')}</button>
        <button id="btn-manual-loc" class="btn btn-sm btn-secondary">${t('btnEnterManually')}</button>
      </div>
    </div>

    <!-- AI Crop Analysis Card (DEMO AI PREDICTION) -->
    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${t('aiAnalysisTitle')}</h3>
          <span class="card-subtitle">${t('aiAnalysisSub')}</span>
        </div>
        <span class="badge badge-demo">${t('badgeDemoAi')}</span>
      </div>

      <div class="grid-2">
        <div class="pulse-item">
          <span class="pulse-label">${t('detectedCrop')}</span>
          <strong style="color:var(--color-agri-dark); font-size:1.1rem;">${t('crop_' + farm.cropId, analysis.detectedCrop)}</strong>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('estimatedCondition')}</span>
          <strong style="color:#15803D; font-size:1.1rem;">${analysis.condition}</strong>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('growthStage')}</span>
          <strong style="color:var(--color-agri-dark); font-size:1.1rem;">${farm.growthStageName || 'Flowering'}</strong>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('lightRequirement')}</span>
          <strong style="color:#D97706; font-size:1.1rem;">${t('highLight')} (22-30 mol/m²/d)</strong>
        </div>
      </div>

      <p style="margin-top:1rem; font-size:0.85rem; color:var(--text-muted); background:var(--bg-subtle); padding:0.75rem; border-radius:var(--radius-sm);">
        ℹ️ <em>${t('aiDisclaimer')}</em>
      </p>

      <div style="margin-top:1rem; display:flex; justify-content:flex-end;">
        <a href="#onboarding" class="btn btn-sm btn-secondary">${t('btnEditCropProfile')}</a>
      </div>
    </div>
  `;
}

function bindScanEvents() {
  const startCamBtn = document.getElementById('btn-start-camera');
  const snapBtn = document.getElementById('btn-snap-photo');
  const fileInput = document.getElementById('file-upload');
  const retakeBtn = document.getElementById('btn-retake-photo');
  const deleteBtn = document.getElementById('btn-delete-photo');
  const gpsBtn = document.getElementById('btn-use-gps');
  const manualLocBtn = document.getElementById('btn-manual-loc');

  if (startCamBtn) {
    startCamBtn.addEventListener('click', async () => {
      try {
        const video = document.getElementById('camera-stream');
        const placeholder = document.getElementById('camera-placeholder');
        const preview = document.getElementById('photo-preview');

        state.cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        video.srcObject = state.cameraStream;
        video.style.display = 'block';
        placeholder.style.display = 'none';
        preview.style.display = 'none';

        startCamBtn.style.display = 'none';
        snapBtn.style.display = 'inline-flex';
      } catch (err) {
        showToast('Camera access unavailable or denied: ' + err.message);
      }
    });
  }

  if (snapBtn) {
    snapBtn.addEventListener('click', () => {
      const video = document.getElementById('camera-stream');
      const canvas = document.getElementById('camera-canvas');
      const preview = document.getElementById('photo-preview');

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopCamera();

      preview.src = dataUrl;
      preview.style.display = 'block';
      video.style.display = 'none';
      snapBtn.style.display = 'none';

      // Save photo locally
      state.currentFarm.photoDataUrl = dataUrl;
      saveFarmPhoto(state.currentFarm.id, dataUrl);
      saveFarm(state.currentFarm);

      showToast('Crop photo saved to local device database.');
      renderCurrentView();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target.result;
        state.currentFarm.photoDataUrl = dataUrl;
        await saveFarmPhoto(state.currentFarm.id, dataUrl);
        await saveFarm(state.currentFarm);

        // Parse EXIF GPS
        const gpsRes = await extractExifGPS(file);
        if (gpsRes.hasGPS) {
          state.currentFarm.location = {
            ...state.currentFarm.location,
            lat: gpsRes.lat,
            lon: gpsRes.lon,
            source: 'LIVE',
            label: `GPS from photo (${gpsRes.lat}, ${gpsRes.lon})`
          };
          await saveFarm(state.currentFarm);
          showToast(`📍 GPS detected from photo: ${gpsRes.lat}, ${gpsRes.lon}`);
        } else {
          showToast('No GPS information found in this photo.');
        }

        renderCurrentView();
      };
      reader.readAsDataURL(file);
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      startCamBtn.click();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      state.currentFarm.photoDataUrl = null;
      await saveFarm(state.currentFarm);
      showToast('Crop photo deleted.');
      renderCurrentView();
    });
  }

  if (gpsBtn) {
    gpsBtn.addEventListener('click', async () => {
      gpsBtn.disabled = true;
      gpsBtn.textContent = 'Locating...';
      try {
        const loc = await getBrowserLocation();
        state.currentFarm.location = loc;
        await saveFarm(state.currentFarm);
        showToast(`📍 Location acquired: ${loc.lat}, ${loc.lon}`);
        executeOptimizer();
        renderCurrentView();
      } catch (err) {
        showToast(err.message);
        gpsBtn.disabled = false;
        gpsBtn.textContent = '📍 Use My Location';
      }
    });
  }

  if (manualLocBtn) {
    manualLocBtn.addEventListener('click', () => {
      openManualLocationModal();
    });
  }
}

function stopCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(t => t.stop());
    state.cameraStream = null;
  }
}

// ============================================================
// VIEW: 03. WEATHER INTELLIGENCE
// ============================================================
function renderWeatherView() {
  const farm = state.currentFarm;
  const w = farm.weather || DEMO_FARM.weather;

  let badgeClass = 'badge-demo';
  let badgeText = t('badgeDemo');
  if (w.source === 'LIVE') {
    badgeClass = 'badge-live';
    badgeText = t('badgeLive');
  } else if (w.source === 'CACHED') {
    badgeClass = 'badge-cached';
    badgeText = `${t('badgeCached')} (${new Date(w.timestamp).toLocaleDateString()})`;
  }

  return `
    <div class="weather-current-card">
      <div class="weather-cur-top">
        <div>
          <span class="badge ${badgeClass}" style="margin-bottom:0.5rem;">${badgeText}</span>
          <h2 style="font-size:1.6rem; font-weight:800;">${farm.location?.village || farm.location?.district || t('farmLocation')}</h2>
          <span style="color:var(--color-sky-blue); font-size:0.85rem;">${t('coordinates')}: ${farm.location?.lat}°N, ${farm.location?.lon}°E</span>
        </div>
        <div style="text-align:right;">
          <div class="weather-cur-icon">${w.conditionIcon || '🌤️'}</div>
          <div class="weather-cur-temp">${w.temp}°C</div>
          <span style="font-size:0.85rem; color:var(--color-sky-blue);">${w.conditionText}</span>
        </div>
      </div>

      <div class="weather-metrics-grid">
        <div class="w-metric">
          <span class="w-metric-label">${t('solarIrradiance')}</span>
          <span class="w-metric-val">${w.solarRadiation} W/m²</span>
        </div>
        <div class="w-metric">
          <span class="w-metric-label">${t('cloudCover')}</span>
          <span class="w-metric-val">${w.cloudCover}%</span>
        </div>
        <div class="w-metric">
          <span class="w-metric-label">${t('humidity')}</span>
          <span class="w-metric-val">${w.humidity}%</span>
        </div>
        <div class="w-metric">
          <span class="w-metric-label">${t('windSpeed')}</span>
          <span class="w-metric-val">${w.windSpeed} km/h</span>
        </div>
      </div>
    </div>

    <!-- Actions Bar -->
    <div style="display:flex; gap:0.75rem; margin-bottom:1.5rem; flex-wrap:wrap;">
      <button id="btn-refresh-weather" class="btn btn-primary btn-sm">${t('btnRefreshWeather')}</button>
      <button id="btn-manual-weather" class="btn btn-secondary btn-sm">${t('btnManualWeather')}</button>
    </div>

    <!-- 24-Hour Forecast Timeline -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${t('weatherHourlyTitle')}</h3>
      </div>
      <div class="forecast-strip">
        ${(w.hourlyForecast || []).map(h => `
          <div class="forecast-item">
            <span style="font-size:0.72rem; font-weight:700; color:var(--text-muted);">${h.hour}</span>
            <span style="font-size:1.1rem; font-weight:800; color:var(--color-agri-dark);">${h.temp}°C</span>
            <span style="font-size:0.7rem; color:#D97706;">⚡ ${h.rad}W</span>
            <span style="font-size:0.68rem; color:var(--text-muted);">☁️ ${h.cloud}%</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 7-Day Forecast -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${t('weatherDailyTitle')}</h3>
      </div>
      <div class="grid-3">
        ${(w.dailyForecast || []).map(d => `
          <div class="pulse-item">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>${d.day}</strong>
              <span style="font-size:1.4rem;">${d.condition}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:0.35rem; font-size:0.85rem;">
              <span>High: ${d.tempMax}°C</span>
              <span style="color:var(--text-muted);">Low: ${d.tempMin}°C</span>
            </div>
            <small style="color:var(--text-muted);">Rain: ${d.rain}%</small>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function bindWeatherEvents() {
  const refreshBtn = document.getElementById('btn-refresh-weather');
  const manualBtn = document.getElementById('btn-manual-weather');

  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.disabled = true;
      refreshBtn.textContent = 'Fetching...';
      const farm = state.currentFarm;
      const res = await fetchFarmWeather(farm.location?.lat || 13.1, farm.location?.lon || 78.1);
      state.currentFarm.weather = res;
      await saveFarm(state.currentFarm);
      executeOptimizer();
      showToast(res.source === 'LIVE' ? '🟢 Live weather updated successfully!' : res.message);
      renderCurrentView();
    });
  }

  if (manualBtn) {
    manualBtn.addEventListener('click', () => {
      openManualWeatherModal();
    });
  }
}

// ============================================================
// VIEW: 04. OPTIMIZE / SIGNATURE SCREEN: "THE SWEET SPOT"
// ============================================================
function renderOptimizeView() {
  const farm = state.currentFarm;
  const opt = state.optimizationResult;
  const cur = opt?.current;
  const best = opt?.recommended;
  const deltas = opt?.deltas;
  const shadow = cur?.shadow;
  const act = state.actuatorState;

  return `
    <!-- Signature Sweet Spot Banner -->
    <div class="card" style="border: 2px solid var(--color-solar-yellow); background: linear-gradient(180deg, #FFFFFF 0%, #FAFDF9 100%);">
      <div class="card-header">
        <div>
          <span class="hero-tag" style="background:#FEF3C7; color:#92400E; border-color:#F59E0B;">
            🌞 ${t('appTitle')} • ${t('aiSweetSpotFound')}
          </span>
          <h2 class="card-title" style="font-size:1.6rem; margin-top:0.35rem;">
            ${t('optimizeHeroTitle')}
          </h2>
        </div>
        <span class="badge badge-sim">${t('badgeSim')}</span>
      </div>

      <!-- Signature Balance Meter -->
      ${renderBalanceMeter({
        cropSunlight: best?.groundSunlightPercent || 84,
        solarScore: best?.solarScore || 91,
        overallBalance: best?.overallBalance || 88
      })}
    </div>

    <!-- Current vs Recommended Comparison Cards -->
    <div class="comparison-grid">
      <!-- CURRENT SETUP -->
      <div class="setup-card current">
        <div class="setup-header">
          <span class="setup-title">${t('currentSetup')}</span>
          <span class="badge badge-cached">${t('badgeCurrentConfig')}</span>
        </div>
        <div class="spec-list">
          <div class="spec-item">
            <span class="spec-label">${t('panelAngle')}</span>
            <span class="spec-val">${cur?.config?.angle}°</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${t('panelHeight')}</span>
            <span class="spec-val">${cur?.config?.height}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${t('panelSpacing')}</span>
            <span class="spec-val">${cur?.config?.spacing}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${t('powerGeneration')}</span>
            <span class="spec-val">${cur?.estimatedPowerKW} kW</span>
          </div>
        </div>
        <div style="border-top:1px solid var(--border-subtle); padding-top:0.75rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;">
            <span>${t('cropSunlight')}: <strong>${cur?.groundSunlightPercent}%</strong></span>
            <span>${t('solarEnergy')}: <strong>${cur?.solarScore}%</strong></span>
          </div>
          <div style="font-size:1rem; font-weight:800; color:var(--color-agri-dark);">
            ${t('farmBalance')}: <strong>${cur?.overallBalance}/100</strong>
          </div>
        </div>
      </div>

      <!-- AI RECOMMENDED SETUP -->
      <div class="setup-card recommended">
        <div class="recommended-ribbon">⭐ ${t('aiSweetSpotFound')}</div>
        <div class="setup-header">
          <span class="setup-title" style="color:#15803D;">${t('recommendedSetup')}</span>
          <span class="badge badge-live">${t('badgeOptimalConfig')}</span>
        </div>
        <div class="spec-list">
          <div class="spec-item">
            <span class="spec-label">${t('panelAngle')}</span>
            <span class="spec-val" style="color:#15803D;">${best?.config?.angle}°</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${t('panelHeight')}</span>
            <span class="spec-val">${best?.config?.height}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${t('panelSpacing')}</span>
            <span class="spec-val">${best?.config?.spacing}m</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">${t('powerGeneration')}</span>
            <span class="spec-val">${best?.estimatedPowerKW} kW</span>
          </div>
        </div>
        <div style="border-top:1px solid #BBF7D0; padding-top:0.75rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.25rem;">
            <span>${t('cropSunlight')}: <strong>${best?.groundSunlightPercent}%</strong> <span class="delta-pill delta-pos">${deltas?.cropSunlightDelta >= 0 ? '+' : ''}${deltas?.cropSunlightDelta}%</span></span>
            <span>${t('solarEnergy')}: <strong>${best?.solarScore}%</strong> <span class="delta-pill delta-pos">${deltas?.solarScoreDelta >= 0 ? '+' : ''}${deltas?.solarScoreDelta}%</span></span>
          </div>
          <div style="font-size:1rem; font-weight:800; color:#15803D;">
            ${t('farmBalance')}: <strong>${best?.overallBalance}/100</strong> <span class="delta-pill delta-pos">+${deltas?.balanceDelta} pts</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Virtual Actuator Controller -->
    ${renderActuatorControl({
      currentAngle: act.currentAngle,
      targetAngle: best?.config?.angle || 35,
      status: act.status
    })}

    <!-- Explainable AI Section: Farmer Mode vs Technical View -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${t('whyRecommendation')}</h3>
        <div style="display:flex; gap:0.5rem;">
          <button id="btn-toggle-farmer" class="btn btn-sm ${state.viewExplainerMode === 'farmer' ? 'btn-primary' : 'btn-secondary'}">
            ${t('btnExplainFarmer')}
          </button>
          <button id="btn-toggle-tech" class="btn btn-sm ${state.viewExplainerMode === 'technical' ? 'btn-primary' : 'btn-secondary'}">
            ${t('btnTechnicalView')}
          </button>
        </div>
      </div>

      ${state.viewExplainerMode === 'farmer' ? `
        <div style="background:var(--bg-subtle); padding:1.25rem; border-radius:var(--radius-md); border-left:5px solid var(--color-agri-fresh);">
          <p style="font-size:1rem; color:var(--color-agri-dark); line-height:1.6;">
            "${opt?.explanation}"
          </p>
        </div>
      ` : `
        <div style="background:#0F172A; color:#E2E8F0; padding:1.25rem; border-radius:var(--radius-md); font-family:monospace; font-size:0.88rem; line-height:1.6;">
          <div style="color:#F7C948; font-weight:bold; margin-bottom:0.5rem;">// MULTI-OBJECTIVE OPTIMIZATION FORMULATION</div>
          <div>Formula: ${opt?.technicalSummary?.formula}</div>
          <div style="margin-top:0.35rem;">Shadow Model: ${opt?.technicalSummary?.shadowFormula}</div>
          <div style="margin-top:0.35rem;">Solar Irradiance: ${opt?.technicalSummary?.solarFormula}</div>
          <div style="margin-top:0.35rem; color:#8FCF64;">Candidates Evaluated: ${opt?.technicalSummary?.candidatesEvaluated} | Status: Optimal Pareto Convergence</div>
        </div>
      `}
    </div>

    <!-- Crop Row Sunlight Heatmap -->
    ${renderHeatmap({
      rowLightDistribution: shadow?.rowLightDistribution || [78, 86, 92, 84],
      rowStatus: shadow?.rowStatus || ['high', 'high', 'high', 'high'],
      parBetweenPanels: shadow?.parBetweenPanels || 1150
    })}

    <!-- Ranked Top Candidates Table -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${t('evaluatedCandidates')}</h3>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.88rem; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-medium); color:var(--text-muted);">
              <th style="padding:0.6rem;">${t('colCandidate')}</th>
              <th style="padding:0.6rem;">${t('colTiltAngle')}</th>
              <th style="padding:0.6rem;">${t('colHeight')}</th>
              <th style="padding:0.6rem;">${t('colSpacing')}</th>
              <th style="padding:0.6rem;">${t('colCropLight')}</th>
              <th style="padding:0.6rem;">${t('colSolar')}</th>
              <th style="padding:0.6rem;">${t('colBalance')}</th>
            </tr>
          </thead>
          <tbody>
            ${(opt?.candidates || []).map((c, i) => `
              <tr style="border-bottom:1px solid var(--border-subtle); ${i === 0 ? 'background:#F0FDF4; font-weight:bold;' : ''}">
                <td style="padding:0.6rem;">${c.name}</td>
                <td style="padding:0.6rem;">${c.config.angle}°</td>
                <td style="padding:0.6rem;">${c.config.height}m</td>
                <td style="padding:0.6rem;">${c.config.spacing}m</td>
                <td style="padding:0.6rem; color:#15803D;">${c.groundSunlightPercent}%</td>
                <td style="padding:0.6rem; color:#D97706;">${c.solarScore}%</td>
                <td style="padding:0.6rem; font-weight:900;">${c.overallBalance}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindOptimizeEvents() {
  // Explainer mode toggle
  const farmerBtn = document.getElementById('btn-toggle-farmer');
  const techBtn = document.getElementById('btn-toggle-tech');
  if (farmerBtn) {
    farmerBtn.addEventListener('click', () => {
      state.viewExplainerMode = 'farmer';
      renderCurrentView();
    });
  }
  if (techBtn) {
    techBtn.addEventListener('click', () => {
      state.viewExplainerMode = 'technical';
      renderCurrentView();
    });
  }

  // Actuator Move Button
  const moveBtn = document.getElementById('btn-actuator-move');
  if (moveBtn) {
    moveBtn.addEventListener('click', () => {
      startActuatorAnimation();
    });
  }
}

function startActuatorAnimation() {
  const act = state.actuatorState;
  if (act.status === 'moving') return;

  const target = state.optimizationResult?.recommended?.config?.angle || 35;
  act.targetAngle = target;
  act.status = 'moving';
  renderCurrentView();

  const start = act.currentAngle;
  const startTime = performance.now();
  const duration = 2200; // 2.2 seconds animation

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // Smooth ease-in-out
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    act.currentAngle = Math.round(start + (target - start) * ease);

    // Live update DOM numbers without full rerender
    const currDom = document.querySelector('.current-tilt-val');
    if (currDom) currDom.textContent = act.currentAngle + '°';

    // Also update farm tilt & digital twin live
    state.simulationParams.panelTilt = act.currentAngle;
    state.currentFarm.solar.angle = act.currentAngle;

    if (progress < 1) {
      act.animId = requestAnimationFrame(step);
    } else {
      act.currentAngle = target;
      act.status = 'reached';
      executeOptimizer();
      showToast(`✓ Actuator aligned to recommended ${target}° sweet spot.`);
      renderCurrentView();
    }
  }

  act.animId = requestAnimationFrame(step);
}

// ============================================================
// VIEW: 05. RESULTS & FARM REPORT
// ============================================================
function renderResultsView() {
  const farm = state.currentFarm;
  const opt = state.optimizationResult;
  const best = opt?.recommended;
  const cur = opt?.current;

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${t('resultsSummary')}</h2>
          <p class="card-subtitle">${t('resultsSub')}</p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button id="btn-generate-report" class="btn btn-primary">${t('btnGenerateReport')}</button>
          <button id="btn-save-farm" class="btn btn-secondary">${t('btnSaveFarm')}</button>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom:1.5rem;">
        <div class="pulse-item">
          <span class="pulse-label">${t('cropSunlight')}</span>
          <span class="pulse-status good">${best?.groundSunlightPercent}%</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('solarEnergy')}</span>
          <span class="pulse-status high">${best?.solarScore}%</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('shadowImpact')}</span>
          <span class="pulse-status good">${best?.shadowScore}%</span>
        </div>
        <div class="pulse-item">
          <span class="pulse-label">${t('farmBalance')}</span>
          <span class="pulse-status good" style="font-size:1.4rem;">${best?.overallBalance}/100</span>
        </div>
      </div>
    </div>

    <!-- Smart Trade-Off Curve (Pareto Frontier) -->
    ${renderTradeOffChartSVG({
      candidates: opt?.allEvaluations || [],
      best,
      current: cur
    })}

    <!-- Previous Saved Recommendations for this Farm -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">${t('savedHistoryTitle')}</h3>
      </div>
      <p style="color:var(--text-muted); font-size:0.85rem;">
        ${t('savedHistorySub')}
      </p>
      <div style="margin-top:1rem; background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md);">
        <strong>${farm.cropName} (${farm.growthStageName || 'Flowering'}) — ${t('recommendedSetup')} ${best?.config?.angle}° Angle</strong>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">
          Generated: ${new Date().toLocaleString()} • ${t('farmBalance')}: ${best?.overallBalance}/100 • Status: ${farm.isDemo ? t('badgeDemo') : t('activeFarm')}
        </div>
      </div>
    </div>
  `;
}

function bindResultsEvents() {
  const reportBtn = document.getElementById('btn-generate-report');
  const saveBtn = document.getElementById('btn-save-farm');

  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      openReportModal();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      await saveFarm(state.currentFarm);
      await saveOptimizationResult(state.currentFarm.id, state.optimizationResult);
      showToast('✓ Farm configuration and recommendation saved locally.');
    });
  }
}

// ============================================================
// VIEW: 06. MY FARMS (FULL CRUD IN INDEXEDDB)
// ============================================================
function renderFarmsView() {
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${t('myFarmsTitle')}</h2>
          <p class="card-subtitle">${t('myFarmsSub')}</p>
        </div>
        <button id="btn-create-farm" class="btn btn-primary">${t('btnAddFarm')}</button>
      </div>

      <div id="farms-list-container" class="grid-2">
        <div style="padding:2rem; text-align:center; color:var(--text-muted); grid-column:1/-1;">
          ${t('loadingFarms')}
        </div>
      </div>
    </div>
  `;
}

async function bindFarmsEvents() {
  const container = document.getElementById('farms-list-container');
  const createBtn = document.getElementById('btn-create-farm');

  if (createBtn) {
    createBtn.addEventListener('click', () => {
      window.location.hash = '#onboarding';
    });
  }

  try {
    const farms = await getAllFarms();
    if (!container) return;

    if (farms.length === 0) {
      container.innerHTML = `
        <div style="padding:2rem; text-align:center; color:var(--text-muted); grid-column:1/-1;">
          ${t('noFarmsYet')}
        </div>
      `;
      return;
    }

    container.innerHTML = farms.map(f => {
      const isCurrent = f.id === state.currentFarm.id;
      return `
        <div class="setup-card" style="border-color:${isCurrent ? 'var(--color-agri-fresh)' : 'var(--border-subtle)'};">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:800; color:var(--color-agri-dark);">${f.name}</h3>
              <span style="font-size:0.8rem; color:var(--text-muted);">${f.cropName || 'Tomato'} • ${f.size || 5} ${f.unit || 'Acre'}</span>
            </div>
            <span class="badge ${f.isDemo ? 'badge-demo' : 'badge-live'}">${f.isDemo ? '🟣 DEMO' : '🟢 LOCAL'}</span>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.85rem;">
            <span>Stage: <strong>${f.growthStageName || 'Flowering'}</strong></span>
            <span>Tilt: <strong>${f.solar?.angle || 25}°</strong></span>
          </div>

          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <button class="btn btn-sm btn-primary btn-open-farm" data-id="${f.id}">${t('btnOpenFarm')}</button>
            <button class="btn btn-sm btn-secondary btn-edit-farm" data-id="${f.id}">${t('btnEdit')}</button>
            <button class="btn btn-sm btn-danger btn-delete-farm" data-id="${f.id}">${t('btnDelete')}</button>
          </div>
        </div>
      `;
    }).join('');

    // Bind item actions
    document.querySelectorAll('.btn-open-farm').forEach(b => {
      b.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        const f = await getFarm(id);
        if (f) {
          state.currentFarm = f;
          syncSimulationWithFarm();
          executeOptimizer();
          showToast(`Opened farm: ${f.name}`);
          window.location.hash = '#home';
        }
      });
    });

    document.querySelectorAll('.btn-edit-farm').forEach(b => {
      b.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        const f = await getFarm(id);
        if (f) {
          state.currentFarm = f;
          window.location.hash = '#onboarding';
        }
      });
    });

    document.querySelectorAll('.btn-delete-farm').forEach(b => {
      b.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm(t('confirmDeleteFarm'))) {
          await deleteFarm(id);
          showToast('Farm deleted from local database.');
          renderCurrentView();
        }
      });
    });
  } catch (err) {
    console.error('Error listing farms:', err);
  }
}

// ============================================================
// VIEW: 07. WHAT-IF SIMULATOR
// ============================================================
function renderWhatIfView() {
  const scenarios = state.optimizationResult?.whatIfScenarios;
  const best = scenarios?.recommended;
  const cur = scenarios?.current;
  const cropFirst = scenarios?.cropFirst;
  const energyFirst = scenarios?.energyFirst;
  const storm = scenarios?.stormStow;

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">${t('whatIfTitle')}</h2>
          <p class="card-subtitle">${t('whatIfSub')}</p>
        </div>
        <span class="badge badge-sim">${t('badgeSim')}</span>
      </div>

      <div class="whatif-presets">
        <button class="preset-chip active" data-scenario="best">${t('scenarioSweet')}</button>
        <button class="preset-chip" data-scenario="current">${t('scenarioCurrent')}</button>
        <button class="preset-chip" data-scenario="crop">${t('scenarioCrop')}</button>
        <button class="preset-chip" data-scenario="energy">${t('scenarioEnergy')}</button>
        <button class="preset-chip" data-scenario="storm">${t('scenarioStorm')}</button>
      </div>

      <!-- Comparison Matrix -->
      <div class="grid-4" style="margin-top:1.5rem;">
        <div class="setup-card" style="border-color:#15803D; background:#F0FDF4;">
          <strong>⭐ ${t('aiSweetSpotFound')}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:#15803D;">${best?.overallBalance}</div>
          <small>${t('panelAngle')}: ${best?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${t('cropSunlight')}: ${best?.groundSunlightPercent}%<br/>
            ⚡ ${t('solarEnergy')}: ${best?.solarScore}%
          </div>
        </div>

        <div class="setup-card">
          <strong>${t('currentSetup')}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:var(--text-muted);">${cur?.overallBalance}</div>
          <small>${t('panelAngle')}: ${cur?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${t('cropSunlight')}: ${cur?.groundSunlightPercent}%<br/>
            ⚡ ${t('solarEnergy')}: ${cur?.solarScore}%
          </div>
        </div>

        <div class="setup-card">
          <strong>🌱 ${t('scenarioCropFirst')}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:#2F7D4F;">${cropFirst?.overallBalance}</div>
          <small>${t('panelAngle')}: ${cropFirst?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${t('cropSunlight')}: ${cropFirst?.groundSunlightPercent}%<br/>
            ⚡ ${t('solarEnergy')}: ${cropFirst?.solarScore}%
          </div>
        </div>

        <div class="setup-card">
          <strong>⚡ ${t('scenarioEnergyFirst')}</strong>
          <div style="font-size:1.8rem; font-weight:900; color:#D97706;">${energyFirst?.overallBalance}</div>
          <small>${t('panelAngle')}: ${energyFirst?.config.angle}°</small>
          <div style="margin-top:0.5rem; font-size:0.8rem;">
            🌱 ${t('cropSunlight')}: ${energyFirst?.groundSunlightPercent}%<br/>
            ⚡ ${t('solarEnergy')}: ${energyFirst?.solarScore}%
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindWhatIfEvents() {
  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const sc = chip.getAttribute('data-scenario');
      const map = {
        best: state.optimizationResult?.recommended,
        current: state.optimizationResult?.current,
        crop: state.optimizationResult?.whatIfScenarios?.cropFirst,
        energy: state.optimizationResult?.whatIfScenarios?.energyFirst,
        storm: state.optimizationResult?.whatIfScenarios?.stormStow
      };
      const chosen = map[sc];
      if (chosen) {
        state.simulationParams.panelTilt = chosen.config.angle;
        state.currentFarm.solar.angle = chosen.config.angle;
        executeOptimizer();
        showToast(`Simulating scenario: ${chip.textContent.trim()}`);
      }
    });
  });
}

// ============================================================
// VIEW: 08. GUIDED FARMER ONBOARDING (8-STEP WIZARD)
// ============================================================
function renderOnboardingView() {
  const steps = [
    '01 ' + t('stepFarm'),
    '02 ' + t('stepCrop'),
    '03 ' + t('stepLocation'),
    '04 ' + t('stepWeather'),
    '05 ' + t('stepSolar'),
    '06 ' + t('stepSimulation'),
    '07 ' + t('stepOptimization'),
    '08 ' + t('stepResults')
  ];
  const stepIdx = state.onboardingStep;
  const farm = state.currentFarm;

  return `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">${t('onboardingTitle')}</h2>
        <span class="badge badge-live">${t('step')} ${stepIdx + 1} ${t('of')} 8</span>
      </div>

      <!-- Step Navigation Nodes -->
      <div class="wizard-progress-bar">
        ${steps.map((s, i) => `
          <div class="wizard-step-node ${i === stepIdx ? 'active' : i < stepIdx ? 'completed' : ''}" data-step="${i}">
            ${i < stepIdx ? '✓' : ''} ${s}
          </div>
        `).join('')}
      </div>

      <!-- Step Content Area -->
      <div id="wizard-step-content" style="margin: 1.5rem 0;">
        ${renderWizardStepContent(stepIdx, farm)}
      </div>

      <!-- Navigation Footer -->
      <div style="display:flex; justify-content:space-between; margin-top:1.5rem; border-top:1px solid var(--border-subtle); padding-top:1.25rem;">
        <button id="btn-wiz-back" class="btn btn-secondary" ${stepIdx === 0 ? 'disabled' : ''}>${t('btnBack')}</button>
        <button id="btn-wiz-skip" class="btn btn-secondary">${t('btnSkip')}</button>
        <button id="btn-wiz-next" class="btn btn-primary">${stepIdx === 7 ? t('btnCompleteSetup') : t('btnNextStep')}</button>
      </div>
    </div>
  `;
}

function renderWizardStepContent(idx, farm) {
  switch (idx) {
    case 0: // FARM
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">01. ${t('farmProfile')}</h3>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('farmName')}</label>
            <input type="text" id="wiz-farm-name" value="${farm.name}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('farmSize')}</label>
            <div style="display:flex; gap:0.5rem; margin-top:0.35rem;">
              <input type="number" id="wiz-farm-size" value="${farm.size}" style="flex:1; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium);" />
              <select id="wiz-farm-unit" style="padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium);">
                <option value="Acre" ${farm.unit === 'Acre' ? 'selected' : ''}>${t('unitAcre')}</option>
                <option value="Hectare" ${farm.unit === 'Hectare' ? 'selected' : ''}>${t('unitHectare')}</option>
              </select>
            </div>
          </div>
        </div>
      `;
    case 1: // CROP
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">02. ${t('selectCropStage')}</h3>
        <div class="crop-select-grid" style="margin-bottom:1.5rem;">
          ${Object.values(CROPS_DATA).map(c => `
            <div class="crop-card ${farm.cropId === c.id ? 'selected' : ''}" data-crop="${c.id}">
              <div class="crop-card-icon">${c.icon}</div>
              <div class="crop-card-name">${t('crop_' + c.id, c.name)}</div>
              <div class="crop-card-category">${c.lightCategory}</div>
            </div>
          `).join('')}
        </div>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('growthStage')}</label>
            <select id="wiz-crop-stage" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;">
              <option value="seedling">${t('stageSeedling')}</option>
              <option value="vegetative">${t('stageVegetative')}</option>
              <option value="flowering" selected>${t('stageFlowering')}</option>
              <option value="fruiting">${t('stageFruiting')}</option>
              <option value="mature">${t('stageMature')}</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('irrigationMethod')}</label>
            <select id="wiz-irrigation" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;">
              <option value="Drip Irrigation">${t('irrigDrip')}</option>
              <option value="Sprinkler">${t('irrigSprinkler')}</option>
              <option value="Flood Irrigation">${t('irrigFlood')}</option>
              <option value="Rainfed">${t('irrigRainfed')}</option>
            </select>
          </div>
        </div>
      `;
    case 2: // LOCATION
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">03. ${t('farmLocationTitle')}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${t('farmLocationDesc')}</p>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('latitude')}</label>
            <input type="number" step="0.0001" id="wiz-lat" value="${farm.location?.lat || 13.1368}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('longitude')}</label>
            <input type="number" step="0.0001" id="wiz-lon" value="${farm.location?.lon || 78.1292}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
        </div>
      `;
    case 3: // WEATHER
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">04. ${t('weatherBaseline')}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${t('weatherBaselineDesc')}</p>
        <div class="grid-2">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('temperature')}</label>
            <input type="number" id="wiz-temp" value="${farm.weather?.temp || 24}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('cloudCoverPercent')}</label>
            <input type="number" id="wiz-cloud" value="${farm.weather?.cloudCover || 25}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
        </div>
      `;
    case 4: // SOLAR
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">05. ${t('existingSolar')}</h3>
        <div class="grid-3">
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('initialTilt')}</label>
            <input type="number" id="wiz-angle" value="${farm.solar?.angle || 25}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('panelHeight')}</label>
            <input type="number" step="0.1" id="wiz-height" value="${farm.solar?.height || 3.0}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
          <div>
            <label style="font-size:0.85rem; font-weight:700;">${t('panelWattage')}</label>
            <input type="number" id="wiz-wattage" value="${farm.solar?.wattage || 450}" style="width:100%; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.35rem;" />
          </div>
        </div>
      `;
    case 5: // SIMULATION
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">06. ${t('twinVerification')}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${t('twinVerifDesc')}</p>
        <div style="background:#F0FDF4; padding:1.25rem; border-radius:var(--radius-md); border:1px solid #BBF7D0;">
          ✓ ${farm.solar?.height || 3.0}m • 4 ${t('row')}<br/>
          ✓ ${t('cropSunlight')}: ${farm.cropName || t('crop_tomato')}.
        </div>
      `;
    case 6: // AI OPTIMIZATION
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">07. ${t('aiReadyTitle')}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${t('aiReadyDesc')}</p>
        <div style="padding:1.5rem; background:#FAF5FF; border-radius:var(--radius-md); border:1px solid #E9D5FF; text-align:center;">
          <div style="font-size:2rem; margin-bottom:0.5rem;">🤖</div>
          <strong style="color:#6B21A8;">${t('aiSweetSpotFound')}</strong>
          <p style="font-size:0.85rem; color:#7E22CE; margin-top:0.25rem;">${t('aiReadyDesc')}</p>
        </div>
      `;
    case 7: // RESULTS
      return `
        <h3 style="margin-bottom:1rem; color:var(--color-agri-dark);">08. ${t('setupComplete')}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">${t('setupCompleteDesc')}</p>
        <div style="background:#E8F5E9; padding:1.25rem; border-radius:var(--radius-md); border:1px solid #A7F3D0;">
          ✓ ${t('farmProfile')} ${t('setupComplete')}.<br/>
          ✓ ${t('digitalTwinTitle')} & ${t('recommendedSetup')} ready.
        </div>
      `;
  }
}

function bindOnboardingEvents() {
  const backBtn = document.getElementById('btn-wiz-back');
  const nextBtn = document.getElementById('btn-wiz-next');
  const skipBtn = document.getElementById('btn-wiz-skip');

  // Crop selection
  document.querySelectorAll('.crop-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.crop-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const cid = card.getAttribute('data-crop');
      state.currentFarm.cropId = cid;
      state.currentFarm.cropName = CROPS_DATA[cid].name;
    });
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (state.onboardingStep > 0) {
        state.onboardingStep--;
        renderCurrentView();
      }
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      loadDemoFarm();
      showToast('Loaded demo parameters for instant presentation.');
      window.location.hash = '#home';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      saveCurrentWizardStepData();
      if (state.onboardingStep < 7) {
        state.onboardingStep++;
        renderCurrentView();
      } else {
        await saveFarm(state.currentFarm);
        syncSimulationWithFarm();
        executeOptimizer();
        showToast('✓ Farm setup completed and saved!');
        window.location.hash = '#home';
      }
    });
  }
}

function saveCurrentWizardStepData() {
  const farm = state.currentFarm;
  if (state.onboardingStep === 0) {
    const nameEl = document.getElementById('wiz-farm-name');
    const sizeEl = document.getElementById('wiz-farm-size');
    const unitEl = document.getElementById('wiz-farm-unit');
    if (nameEl) farm.name = nameEl.value;
    if (sizeEl) farm.size = parseFloat(sizeEl.value);
    if (unitEl) farm.unit = unitEl.value;
  } else if (state.onboardingStep === 1) {
    const stageEl = document.getElementById('wiz-crop-stage');
    if (stageEl) {
      farm.growthStage = stageEl.value;
      farm.growthStageName = stageEl.options[stageEl.selectedIndex].text;
    }
  } else if (state.onboardingStep === 2) {
    const latEl = document.getElementById('wiz-lat');
    const lonEl = document.getElementById('wiz-lon');
    if (latEl && lonEl) {
      farm.location.lat = parseFloat(latEl.value);
      farm.location.lon = parseFloat(lonEl.value);
    }
  } else if (state.onboardingStep === 4) {
    const angEl = document.getElementById('wiz-angle');
    const hEl = document.getElementById('wiz-height');
    const wEl = document.getElementById('wiz-wattage');
    if (angEl) farm.solar.angle = parseInt(angEl.value);
    if (hEl) farm.solar.height = parseFloat(hEl.value);
    if (wEl) farm.solar.wattage = parseInt(wEl.value);
  }
}

// ============================================================
// MODALS (REPORT, MANUAL WEATHER, MANUAL LOCATION)
// ============================================================
function openReportModal() {
  const farm = state.currentFarm;
  const opt = state.optimizationResult;
  const best = opt?.recommended;
  const cur = opt?.current;

  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📄 ${t('reportTitle')}</h3>
      <button class="modal-close" id="modal-close-btn">&times;</button>
    </div>

    <div class="print-header">
      <h2 style="color:var(--color-agri-dark); font-size:1.4rem;">${farm.name}</h2>
      <p style="color:var(--text-muted); font-size:0.85rem;">
        ${t('reportSub')} • ${t('reportDate')}: ${new Date().toLocaleString()}
      </p>
    </div>

    <table class="print-table">
      <tr>
        <th>${t('reportFarmCrop')}</th>
        <td>${farm.cropName || 'Tomato'} (${farm.growthStageName || 'Flowering'})</td>
        <th>${t('reportFarmArea')}</th>
        <td>${farm.size || 5} ${farm.unit || 'Acre'}</td>
      </tr>
      <tr>
        <th>${t('reportLocation')}</th>
        <td>${farm.location?.lat}°N, ${farm.location?.lon}°E</td>
        <th>${t('reportWeatherStatus')}</th>
        <td>${farm.weather?.temp}°C (${farm.weather?.source || 'LIVE'})</td>
      </tr>
      <tr>
        <th>${t('reportSolarArray')}</th>
        <td>${farm.solar?.panelCount || 20} Panels (${farm.solar?.wattage || 450}W)</td>
        <th>${t('reportDataQuality')}</th>
        <td>${farm.isDemo ? t('badgeDemo') : t('activeFarm')}</td>
      </tr>
    </table>

    <h4 style="margin:1rem 0 0.5rem; color:var(--color-agri-dark);">${t('reportSetupComparison')}</h4>
    <table class="print-table">
      <thead>
        <tr>
          <th>${t('reportMetric')}</th>
          <th>${t('currentSetup')}</th>
          <th>${t('recommendedSetup')}</th>
          <th>${t('reportDelta')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${t('panelAngle')}</td>
          <td>${cur?.config?.angle}°</td>
          <td>${best?.config?.angle}°</td>
          <td>+${best?.config?.angle - cur?.config?.angle}°</td>
        </tr>
        <tr>
          <td>${t('panelHeight')}</td>
          <td>${cur?.config?.height}m</td>
          <td>${best?.config?.height}m</td>
          <td>+${(best?.config?.height - cur?.config?.height).toFixed(1)}m</td>
        </tr>
        <tr>
          <td>${t('cropSunlight')}</td>
          <td>${cur?.groundSunlightPercent}%</td>
          <td>${best?.groundSunlightPercent}%</td>
          <td>+${best?.groundSunlightPercent - cur?.groundSunlightPercent}%</td>
        </tr>
        <tr>
          <td>${t('powerGeneration')}</td>
          <td>${cur?.estimatedPowerKW} kW</td>
          <td>${best?.estimatedPowerKW} kW</td>
          <td>+${(best?.estimatedPowerKW - cur?.estimatedPowerKW).toFixed(2)} kW</td>
        </tr>
        <tr>
          <td><strong>${t('farmBalance')}</strong></td>
          <td><strong>${cur?.overallBalance}/100</strong></td>
          <td><strong>${best?.overallBalance}/100</strong></td>
          <td><strong>+${best?.overallBalance - cur?.overallBalance} pts</strong></td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top:1rem; font-size:0.85rem; line-height:1.5;">
      <strong>${t('reportWhySelected')}</strong><br/>
      ${opt?.explanation}
    </div>

    <div class="report-disclaimer">
      ⚠️ <strong>${t('reportDisclaimer')}</strong>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
      <button class="btn btn-secondary" id="btn-print-report">${t('btnPrintPdf')}</button>
      <button class="btn btn-primary" id="btn-download-json">${t('btnDownloadJson')}</button>
    </div>
  `;

  modal.classList.add('active');

  document.getElementById('modal-close-btn').addEventListener('click', () => {
    modal.classList.remove('active');
  });

  document.getElementById('btn-print-report').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btn-download-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ farm, opt }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Farm_Report_${farm.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Report downloaded as JSON');
  });
}

function openManualLocationModal() {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📝 ${t('manualLocTitle')}</h3>
      <button class="modal-close" id="modal-close-btn">&times;</button>
    </div>

    <div class="grid-2" style="margin-top:1rem;">
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('villageTown')}</label>
        <input type="text" id="manual-village" value="${state.currentFarm.location?.village || ''}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('district')}</label>
        <input type="text" id="manual-district" value="${state.currentFarm.location?.district || ''}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('latitude')}</label>
        <input type="number" step="0.0001" id="manual-lat" value="${state.currentFarm.location?.lat || 13.1}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('longitude')}</label>
        <input type="number" step="0.0001" id="manual-lon" value="${state.currentFarm.location?.lon || 78.1}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
      <button class="btn btn-secondary" id="btn-cancel-modal">${t('btnCancel')}</button>
      <button class="btn btn-primary" id="btn-save-loc">${t('btnSaveLoc')}</button>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  document.getElementById('modal-close-btn').addEventListener('click', close);
  document.getElementById('btn-cancel-modal').addEventListener('click', close);

  document.getElementById('btn-save-loc').addEventListener('click', async () => {
    state.currentFarm.location = {
      ...state.currentFarm.location,
      village: document.getElementById('manual-village').value,
      district: document.getElementById('manual-district').value,
      lat: parseFloat(document.getElementById('manual-lat').value),
      lon: parseFloat(document.getElementById('manual-lon').value),
      source: 'MANUAL',
      label: `${document.getElementById('manual-village').value || 'Farm'}, ${document.getElementById('manual-district').value || ''}`
    };
    await saveFarm(state.currentFarm);
    executeOptimizer();
    close();
    showToast('Location updated manually.');
    renderCurrentView();
  });
}

function openManualWeatherModal() {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  const w = state.currentFarm.weather || DEMO_FARM.weather;

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">📝 ${t('manualWeatherTitle')}</h3>
      <button class="modal-close" id="modal-close-btn">&times;</button>
    </div>

    <div class="grid-2" style="margin-top:1rem;">
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('temperature')}</label>
        <input type="number" id="manual-w-temp" value="${w.temp}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('cloudCoverPercent')}</label>
        <input type="number" id="manual-w-cloud" value="${w.cloudCover}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('solarIrradiance')} (W/m²)</label>
        <input type="number" id="manual-w-rad" value="${w.solarRadiation}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
      <div>
        <label style="font-size:0.85rem; font-weight:700;">${t('humidity')} (%)</label>
        <input type="number" id="manual-w-hum" value="${w.humidity}" style="width:100%; padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-medium); margin-top:0.25rem;" />
      </div>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem;">
      <button class="btn btn-secondary" id="btn-cancel-w-modal">${t('btnCancel')}</button>
      <button class="btn btn-primary" id="btn-save-w">${t('btnSaveWeather')}</button>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  document.getElementById('modal-close-btn').addEventListener('click', close);
  document.getElementById('btn-cancel-w-modal').addEventListener('click', close);

  document.getElementById('btn-save-w').addEventListener('click', async () => {
    state.currentFarm.weather = {
      ...state.currentFarm.weather,
      temp: parseFloat(document.getElementById('manual-w-temp').value),
      cloudCover: parseFloat(document.getElementById('manual-w-cloud').value),
      solarRadiation: parseFloat(document.getElementById('manual-w-rad').value),
      humidity: parseFloat(document.getElementById('manual-w-hum').value),
      source: 'MANUAL',
      timestamp: new Date().toISOString()
    };
    state.simulationParams.cloudCover = state.currentFarm.weather.cloudCover;
    await saveFarm(state.currentFarm);
    executeOptimizer();
    close();
    showToast('Weather updated manually.');
    renderCurrentView();
  });
}

// ============================================================
// HACKATHON PRESENTATION MODE TOUR
// ============================================================
const PRESENTATION_STEPS = [
  { name: '1. Farm Profile', view: 'home', desc: 'Overview of Green Valley Farm & live health pulse.' },
  { name: '2. Crop Light Target', view: 'scan', desc: 'Crop canopy photos, EXIF GPS reading & prototype CV diagnosis.' },
  { name: '3. Weather Intelligence', view: 'weather', desc: 'Open-Meteo live solar irradiance, cloud cover & forecast.' },
  { name: '4. Sun & Shadow Physics', view: 'home', desc: 'Interactive celestial sun orbit with dynamic 2D ground shadows.' },
  { name: '5. Multi-Objective AI', view: 'optimize', desc: 'Evaluating 35+ candidate configurations balancing crop PAR & PV energy.' },
  { name: '6. The Sweet Spot', view: 'optimize', desc: 'Signature balance meter, heatmaps, and explainable farmer reasoning.' },
  { name: '7. Virtual Actuator', view: 'optimize', desc: 'Motorized slew drive simulation executing real angle adjustment.' },
  { name: '8. What-If Scenarios', view: 'whatif', desc: 'Side-by-side trade-off comparison proving dual-objective balance.' },
  { name: '9. Farm Report', view: 'results', desc: 'Comprehensive printable decision-support document.' }
];

function setupPresentationTour() {
  const toggleBtn = document.getElementById('btn-toggle-presentation');
  const banner = document.getElementById('presentation-banner');
  const prevBtn = document.getElementById('btn-pres-prev');
  const nextBtn = document.getElementById('btn-pres-next');
  const closeBtn = document.getElementById('btn-close-presentation');
  const resetBtn = document.getElementById('btn-reset-demo');
  const stepNameEl = document.getElementById('pres-step-name');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      state.presentationActive = !state.presentationActive;
      banner.style.display = state.presentationActive ? 'flex' : 'none';
      if (state.presentationActive) {
        state.presentationStep = 0;
        applyPresentationStep();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      state.presentationActive = false;
      banner.style.display = 'none';
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      loadDemoFarm();
      showToast('Demo reset to initial Green Valley Farm baseline.');
      renderCurrentView();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.presentationStep > 0) {
        state.presentationStep--;
        applyPresentationStep();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.presentationStep < PRESENTATION_STEPS.length - 1) {
        state.presentationStep++;
        applyPresentationStep();
      }
    });
  }

  function applyPresentationStep() {
    const curStep = PRESENTATION_STEPS[state.presentationStep];
    if (stepNameEl) stepNameEl.textContent = curStep.name;
    window.location.hash = '#' + curStep.view;
    showToast(`Step ${state.presentationStep + 1}: ${curStep.desc}`);
  }
}

function loadDemoFarm() {
  state.currentFarm = JSON.parse(JSON.stringify(DEMO_FARM));
  syncSimulationWithFarm();
  executeOptimizer();
  saveFarm(state.currentFarm);
}

// ============================================================
// NETWORK SYNC & OFFLINE ARCHITECTURE
// ============================================================
function setupNetworkSync() {
  const banner = document.getElementById('sync-banner');
  const icon = document.getElementById('sync-status-icon');
  const text = document.getElementById('sync-status-text');

  function updateStatus(isOnline) {
    state.isOnline = isOnline;
    if (isOnline) {
      banner.className = 'sync-banner online';
      icon.textContent = '🟢';
      text.textContent = t('syncOnline');
      showToast(t('syncRestored'));
    } else {
      banner.className = 'sync-banner offline';
      icon.textContent = '🟠';
      text.textContent = t('syncOffline');
      showToast(t('syncOffline'));
    }
  }

  window.addEventListener('online', () => updateStatus(true));
  window.addEventListener('offline', () => updateStatus(false));
}

// ============================================================
// MULTI-LANGUAGE (i18n)
// ============================================================
function setupLanguageHandler() {
  const select = document.getElementById('lang-selector');
  if (select) {
    select.addEventListener('change', (e) => {
      const newLang = e.target.value;
      setLanguage(newLang);
      document.documentElement.lang = newLang;
      renderCurrentView();
      applyTranslations();
      updateHeaderSecurityUI();
      showToast(t('langSwitchedNotice', 'Interface language updated successfully'));
    });
  }
}

function applyTranslations() {
  // 1. Text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const val = t(key);
      if (val && val !== key) {
        el.textContent = val;
      }
    }
  });

  // 2. Title attributes with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) el.title = t(key);
  });

  // 3. Placeholder attributes with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });

  // 4. Update sync banner text dynamically
  const syncText = document.getElementById('sync-status-text');
  if (syncText) {
    syncText.textContent = state.isOnline ? t('syncOnline') : t('syncOffline');
  }
}

// ============================================================
// SIMPLE FARMER & USER GUIDE MODAL
// ============================================================
function openSimpleGuideModal() {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">❓ ${t('faqTitle')}</h3>
      <button class="modal-close" id="modal-close-guide">&times;</button>
    </div>

    <div style="margin-bottom:1.15rem; color:var(--text-secondary); font-size:0.92rem; line-height:1.5;">
      ${t('faqIntro')}
    </div>

    <div class="faq-item">
      <div class="faq-q">${t('faqQ1')}</div>
      <div class="faq-a">${t('faqA1')}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${t('faqQ2')}</div>
      <div class="faq-a">${t('faqA2')}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${t('faqQ3')}</div>
      <div class="faq-a">${t('faqA3')}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${t('faqQ4')}</div>
      <div class="faq-a">${t('faqA4')}</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">${t('faqQ5')}</div>
      <div class="faq-a">${t('faqA5')}</div>
    </div>

    <div style="display:flex; justify-content:flex-end; margin-top:1.25rem;">
      <button class="btn btn-primary" id="btn-close-guide-ok">${t('btnGotIt')}</button>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  const closeBtn = document.getElementById('modal-close-guide');
  const okBtn = document.getElementById('btn-close-guide-ok');
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (okBtn) okBtn.addEventListener('click', close);
}

// ============================================================
// NAVIGATION & PWA LIFECYCLE
// ============================================================
function setupNavigation() {
  document.getElementById('brand-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#home';
  });

  const guideBtn = document.getElementById('btn-open-guide');
  if (guideBtn) {
    guideBtn.addEventListener('click', () => {
      openSimpleGuideModal();
    });
  }

  // Kisan Vani AI Voice Assistant buttons
  document.getElementById('btn-header-voice')?.addEventListener('click', () => {
    toggleVoiceAssistant();
  });
  document.getElementById('nav-link-voice')?.addEventListener('click', () => {
    openVoiceAssistant();
  });
}

function registerPWA() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => {
          console.log('PWA ServiceWorker registered with scope:', reg.scope);
        })
        .catch(err => {
          console.warn('ServiceWorker registration error:', err);
        });
    });
  }
}

// ============================================================
// SECURITY & IOT INTEGRATION
// ============================================================
function setupSecurityAndIot() {
  // Start the background IoT telemetry simulation engine
  startIotEngine();

  // Update header profile display
  updateHeaderSecurityUI();

  // Top header button opens Customer Care & Support view
  const supBtn = document.getElementById('btn-open-support');
  if (supBtn) {
    supBtn.addEventListener('click', () => {
      window.location.hash = '#support';
    });
  }

  // Top header button opens security view
  const secBtn = document.getElementById('btn-open-security');
  if (secBtn) {
    secBtn.addEventListener('click', () => {
      window.location.hash = '#security';
    });
  }

  // Global alert broadcast handler
  window.addEventListener('sunstarved:new-alert', (e) => {
    if (state.soundEnabled) {
      triggerAudioChime(e.detail.severity === 'critical' ? 'warning' : 'info');
    }
    showToast(`${e.detail.title}: ${e.detail.message}`);
  });

  // Global auth state changes
  window.addEventListener('sunstarved:auth-state-change', () => {
    updateHeaderSecurityUI();
    if (state.activeView === 'security' || state.activeView === 'dashboard') {
      renderCurrentView();
    }
  });

  // Sensitive action re-auth interlock challenge
  window.addEventListener('sunstarved:reauth-challenge', (e) => {
    showReauthModal(e.detail);
  });

  // Live telemetry subscriptions
  subscribeIot((iot) => {
    if (state.activeView === 'dashboard') {
      updateDashboardLiveMetrics(iot);
    }
  });
}

function updateHeaderSecurityUI() {
  const session = getCurrentSession();
  const nameEl = document.getElementById('header-farmer-name');
  if (nameEl) {
    if (session) {
      nameEl.textContent = `${session.farmerName} (${session.farmerId.slice(0, 10)})`;
    } else {
      nameEl.textContent = `${DEMO_FARMER.name} (${DEMO_FARMER.id.slice(0, 10)})`;
    }
  }
}

function updateDashboardLiveMetrics(iot) {
  const lastUpEl = document.getElementById('metric-last-update');
  if (lastUpEl) {
    const sec = Math.max(0, Math.floor((Date.now() - new Date(iot.lastUpdateTime).getTime()) / 1000));
    lastUpEl.textContent = `${sec}s ago`;
  }
  const powEl = document.getElementById('metric-power-watts');
  if (powEl) powEl.textContent = iot.solarPowerOutputWatts;
  const kwhEl = document.getElementById('metric-energy-kwh');
  if (kwhEl) kwhEl.textContent = iot.solarEnergyTodayKwh;
  const socEl = document.getElementById('metric-battery-soc');
  if (socEl) socEl.textContent = iot.battery.chargePercent;
  const soilEl = document.getElementById('metric-soil-moisture');
  if (soilEl) soilEl.textContent = iot.soilMoisture;
  const rainEl = document.getElementById('metric-rainfall');
  if (rainEl) rainEl.textContent = iot.rainfallMm;
  const angleEl = document.getElementById('metric-panel-angle');
  if (angleEl) angleEl.textContent = iot.panelAngleDeg;

  // Live activity feed stream update
  const feedEl = document.getElementById('iot-activity-feed');
  if (feedEl && iot.activityLogs) {
    feedEl.innerHTML = iot.activityLogs.slice(0, 10).map(l => `
      <div class="log-entry">
        <span class="log-time">${l.time}</span>
        <span class="log-msg">${l.message}</span>
      </div>
    `).join('');
  }
}

// ------------------------------------------------------------
// DASHBOARD EVENT BINDINGS
// ------------------------------------------------------------
function bindDashboardEvents() {
  const autoSelect = document.getElementById('dash-automation-select');
  if (autoSelect) {
    autoSelect.addEventListener('change', (e) => {
      const mode = e.target.value;
      if (mode === 'MANUAL') {
        promptReauth({
          title: 'Manual Actuator Override',
          reason: 'Disabling automated closed-loop AI positioning requires farmer authorization.',
          onConfirmed: () => {
            setAutomationMode(mode);
            showToast('Manual actuator mode engaged');
          },
          onCancelled: () => {
            renderCurrentView();
          }
        });
      } else {
        setAutomationMode(mode);
        showToast('Automation set to: ' + mode);
        const iot = getIotState();
        state.simulationParams.panelTilt = iot.panelAngleDeg;
      }
    });
  }

  // Panel hardware status toggles
  document.querySelectorAll('.btn-panel-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const status = e.target.getAttribute('data-status');
      togglePanelHardwareStatus(status);
      showToast(`Solar array status set to ${status}`);
      renderCurrentView();
    });
  });

  // Rain simulation button
  const rainBtn = document.getElementById('btn-simulate-rain');
  if (rainBtn) {
    rainBtn.addEventListener('click', () => {
      triggerSimulatedRain();
      showToast('🌧️ Simulated 12.4mm rain event dispatched');
      renderCurrentView();
    });
  }

  // Sound chime toggle button
  const soundBtn = document.getElementById('btn-toggle-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.textContent = state.soundEnabled ? '🔔 Audio Chime: ON' : '🔕 Audio Chime: OFF';
      showToast(state.soundEnabled ? 'Audio alerts enabled' : 'Audio alerts muted');
    });
  }

  // Weather-aware irrigation buttons
  const autoIrrigBtn = document.getElementById('btn-irrig-mode-auto');
  if (autoIrrigBtn) {
    autoIrrigBtn.addEventListener('click', () => {
      setIrrigationModeAuto();
      showToast('Irrigation set to Weather-Aware Auto mode');
      renderCurrentView();
    });
  }
  const pumpOnBtn = document.getElementById('btn-irrig-pump-on');
  if (pumpOnBtn) {
    pumpOnBtn.addEventListener('click', () => {
      toggleIrrigationPumpManual(true);
      showToast('Irrigation pump started (Manual)');
      renderCurrentView();
    });
  }
  const pumpOffBtn = document.getElementById('btn-irrig-pump-off');
  if (pumpOffBtn) {
    pumpOffBtn.addEventListener('click', () => {
      toggleIrrigationPumpManual(false);
      showToast('Irrigation pump stopped');
      renderCurrentView();
    });
  }

  // Alert dismiss buttons
  document.querySelectorAll('.btn-dismiss-alert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-alertid');
      dismissAlert(id);
      renderCurrentView();
    });
  });
}

// ------------------------------------------------------------
// CROP HEALTH CAMERA EVENT BINDINGS
// ------------------------------------------------------------
function bindCropCameraEvents() {
  // Slot selection tabs (morning / afternoon / night)
  document.querySelectorAll('.slot-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cropCameraSlot = btn.getAttribute('data-slot');
      renderCurrentView();
    });
  });

  // Camera unit dropdown
  const camSelect = document.getElementById('camera-select');
  if (camSelect) {
    camSelect.addEventListener('change', (e) => {
      state.cropCameraSettings.selectedCamera = e.target.value;
      showToast('Switched to ' + e.target.selectedOptions[0].text);
    });
  }

  // Toggle AI Anomaly Mask
  const maskBtn = document.getElementById('btn-toggle-anomaly-mask');
  if (maskBtn) {
    maskBtn.addEventListener('click', () => {
      const overlay = document.getElementById('ai-anomaly-overlay');
      if (overlay) {
        const isHidden = overlay.style.display === 'none';
        overlay.style.display = isHidden ? 'block' : 'none';
        showToast(isHidden ? 'AI Diagnostic Mask Enabled' : 'AI Diagnostic Mask Hidden');
      }
    });
  }

  // Open Webcam
  const webcamBtn = document.getElementById('btn-trigger-webcam');
  if (webcamBtn) {
    webcamBtn.addEventListener('click', async () => {
      try {
        const video = document.getElementById('live-camera-video');
        const liveContainer = document.getElementById('webcam-live-container');
        const sampleContainer = document.getElementById('sample-photo-container');

        if (state.cameraStream) {
          stopCamera();
          liveContainer.style.display = 'none';
          sampleContainer.style.display = 'block';
          webcamBtn.textContent = '📷 Open Webcam';
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        state.cameraStream = stream;
        video.srcObject = stream;
        liveContainer.style.display = 'block';
        sampleContainer.style.display = 'none';
        webcamBtn.textContent = '⏹️ Close Webcam';
        showToast('Connected to local optical camera sensor');
      } catch (err) {
        console.warn('Camera access:', err);
        showToast('Webcam not available on this device. Using field camera simulation.');
      }
    });
  }

  // Snap photo
  const snapBtn = document.getElementById('btn-snap-photo');
  if (snapBtn) {
    snapBtn.addEventListener('click', () => {
      showToast('📸 Field snapshot captured! Running AI leaf diagnosis (Score: 93/100)...');
    });
  }

  // File upload input
  const fileInput = document.getElementById('camera-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast(`Uploaded ${file.name}. AI evaluated canopy health at 92/100.`);
      }
    });
  }

  // Sample switches
  const sampleHealthy = document.getElementById('btn-sample-healthy');
  if (sampleHealthy) {
    sampleHealthy.addEventListener('click', () => {
      showToast('Loaded Sample A: Healthy Vegetative Canopy (Score 94)');
    });
  }
  const sampleWilting = document.getElementById('btn-sample-wilting');
  if (sampleWilting) {
    sampleWilting.addEventListener('click', () => {
      showToast('⚠️ Loaded Sample B: Midday Heat-Scorch Detected (Score 71)');
    });
  }
  const sampleShade = document.getElementById('btn-sample-shade');
  if (sampleShade) {
    sampleShade.addEventListener('click', () => {
      showToast('⚠️ Loaded Sample C: Low-Light Etiolation Detected (Score 68)');
    });
  }
}

// ------------------------------------------------------------
// SECURITY & AUTH EVENT BINDINGS
// ------------------------------------------------------------
function bindSecurityEvents() {
  document.querySelectorAll('.sec-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.securityTab = btn.getAttribute('data-sectab');
      renderCurrentView();
    });
  });

  const logoutBtn = document.getElementById('btn-sec-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutCurrentDevice();
      showToast('Logged out of session. Switched to guest mode.');
      openLoginModal();
    });
  }

  const copyIdBtn = document.getElementById('btn-copy-id');
  if (copyIdBtn) {
    copyIdBtn.addEventListener('click', () => {
      const code = document.getElementById('farmer-id-display')?.textContent || DEMO_FARMER.id;
      navigator.clipboard?.writeText(code);
      showToast(`Copied Farmer ID: ${code}`);
    });
  }

  const testBioBtn = document.getElementById('btn-test-biometric');
  if (testBioBtn) {
    testBioBtn.addEventListener('click', () => {
      openBiometricModal(() => {
        showToast('✓ Biometric credential verified successfully!');
      });
    });
  }

  const logoutAllBtn = document.getElementById('btn-logout-all-devices');
  if (logoutAllBtn) {
    logoutAllBtn.addEventListener('click', () => {
      logoutAllDevices();
      showToast('All remote device sessions terminated.');
      renderCurrentView();
    });
  }

  const changePassBtn = document.getElementById('btn-open-change-password');
  if (changePassBtn) {
    changePassBtn.addEventListener('click', () => {
      openChangePasswordModal();
    });
  }

  const reverifyPhoneBtn = document.getElementById('btn-request-phone-reverification');
  if (reverifyPhoneBtn) {
    reverifyPhoneBtn.addEventListener('click', () => {
      const session = getCurrentSession() || DEMO_FARMER;
      const res = sendPhoneOtp(session.phone, 'PHONE_REVERIFY');
      openOtpModal(session.phone, res.simulatedOtp, () => {
        showToast('✓ Mobile number successfully re-verified!');
      });
    });
  }
}

// ------------------------------------------------------------
// AUTH & RE-AUTH MODALS
// ------------------------------------------------------------
function showReauthModal({ title, reason, onConfirmed, onCancelled }) {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = renderReauthChallengeModalHTML(title, reason);
  modal.classList.add('active');

  const confirmBtn = document.getElementById('btn-confirm-reauth');
  const bioBtn = document.getElementById('btn-biometric-reauth');
  const cancelBtn = document.getElementById('btn-cancel-reauth');
  const passInput = document.getElementById('reauth-password');

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const pass = passInput?.value || '';
      if (!pass) {
        showToast('Please enter password to authorize');
        return;
      }
      modal.classList.remove('active');
      showToast('✓ Authorization confirmed');
      if (onConfirmed) onConfirmed();
    });
  }

  if (bioBtn) {
    bioBtn.addEventListener('click', () => {
      openBiometricModal(() => {
        modal.classList.remove('active');
        showToast('✓ Biometric authorization confirmed');
        if (onConfirmed) onConfirmed();
      });
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      showToast('Action cancelled');
      if (onCancelled) onCancelled();
    });
  }
}

function openBiometricModal(onSuccess) {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = renderBiometricScannerModalHTML();
  modal.classList.add('active');

  const cancelBtn = document.getElementById('btn-cancel-biometric');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Execute biometric authentication
  authenticateBiometric().then(() => {
    triggerAudioChime('info');
    setTimeout(() => {
      modal.classList.remove('active');
      if (onSuccess) onSuccess();
    }, 400);
  });
}

function openOtpModal(phone, demoOtp, onVerified) {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = renderOtpModalHTML(phone, demoOtp);
  modal.classList.add('active');

  const verifyBtn = document.getElementById('btn-submit-verify-otp');
  const otpInput = document.getElementById('otp-input-code');
  const resendBtn = document.getElementById('btn-resend-otp');

  if (otpInput) {
    otpInput.value = demoOtp; // Auto-fill for convenience
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const code = otpInput?.value?.trim() || '';
      const result = verifyPhoneOtp(phone, code);
      if (result.success) {
        modal.classList.remove('active');
        showToast('✓ Phone successfully verified!');
        if (onVerified) onVerified();
      } else {
        showToast(result.message);
      }
    });
  }

  if (resendBtn) {
    resendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const res = sendPhoneOtp(phone, 'RESEND');
      showToast(`Simulated SMS sent! Code: ${res.simulatedOtp}`);
      if (otpInput) otpInput.value = res.simulatedOtp;
    });
  }
}

function openLoginModal() {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = renderLoginModalHTML();
  modal.classList.add('active');

  const submitBtn = document.getElementById('btn-submit-login');
  const bioBtn = document.getElementById('btn-one-tap-biometric');
  const regLink = document.getElementById('link-go-register');
  const forgotLink = document.getElementById('link-forgot-password');

  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const id = document.getElementById('login-identifier')?.value?.trim();
      const pass = document.getElementById('login-password')?.value;
      try {
        const { farmer } = await loginFarmer(id, pass);
        modal.classList.remove('active');
        showToast(`Welcome back, ${farmer.name}!`);
        window.location.hash = '#dashboard';
      } catch (err) {
        showToast(err.message);
      }
    });
  }

  if (bioBtn) {
    bioBtn.addEventListener('click', () => {
      openBiometricModal(async () => {
        try {
          const { farmer } = await loginFarmer(DEMO_FARMER.id, 'Farmer@123');
          modal.classList.remove('active');
          showToast(`Biometric match verified for ${farmer.name}!`);
          window.location.hash = '#dashboard';
        } catch (e) {
          showToast('Login verification complete');
        }
      });
    });
  }

  if (regLink) {
    regLink.addEventListener('click', (e) => {
      e.preventDefault();
      openRegisterModal();
    });
  }

  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      openChangePasswordModal();
    });
  }
}

function openRegisterModal() {
  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = renderRegisterModalHTML();
  modal.classList.add('active');

  const submitBtn = document.getElementById('btn-submit-register');
  const loginLink = document.getElementById('link-go-login');

  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const name = document.getElementById('reg-name')?.value?.trim();
      const phone = document.getElementById('reg-phone')?.value?.trim();
      const pass = document.getElementById('reg-password')?.value;

      if (!name || !phone || !pass) {
        showToast('Please fill in all registration fields');
        return;
      }

      const res = sendPhoneOtp(phone, 'REGISTRATION');
      openOtpModal(phone, res.simulatedOtp, async () => {
        try {
          const farmer = await registerFarmer({ name, phone, password: pass });
          showToast(`Account created: ${farmer.id}!`);
          await loginFarmer(farmer.id, pass);
          window.location.hash = '#dashboard';
        } catch (e) {
          showToast(e.message);
        }
      });
    });
  }

  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      openLoginModal();
    });
  }
}

function openChangePasswordModal() {
  const session = getCurrentSession() || DEMO_FARMER;
  const res = sendPhoneOtp(session.phone, 'PASSWORD_RESET');
  openOtpModal(session.phone, res.simulatedOtp, () => {
    showToast('✓ Phone verified. Password updated to standard credentials.');
  });
}

// ------------------------------------------------------------
// ENERGY ANALYTICS & BATTERY EVENT BINDINGS
// ------------------------------------------------------------
function bindEnergyEvents() {
  document.querySelectorAll('.btn-trend-period').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.energyPeriod = e.target.getAttribute('data-period');
      renderCurrentView();
    });
  });

  const diagBtn = document.getElementById('btn-run-solar-diag');
  if (diagBtn) {
    diagBtn.addEventListener('click', () => {
      const diag = diagnoseSolarOutput();
      showToast(`Diagnostic Complete: ${diag.title}`);
    });
  }
}

// ------------------------------------------------------------
// PANEL POSITIONING & ACTUATOR EVENT BINDINGS
// ------------------------------------------------------------
function bindPositioningEvents() {
  const estopBtn = document.getElementById('btn-trigger-estop');
  if (estopBtn) {
    estopBtn.addEventListener('click', () => {
      triggerEmergencyStop();
      renderCurrentView();
    });
  }

  const resetEstopBtn = document.getElementById('btn-reset-estop');
  if (resetEstopBtn) {
    resetEstopBtn.addEventListener('click', () => {
      resetEmergencyStop();
      renderCurrentView();
    });
  }

  document.querySelectorAll('.mode-select-card').forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.getAttribute('data-modename');
      setAutomationMode(mode);
      renderCurrentView();
    });
  });

  // Preset angle buttons (0°, 15°, 30°, 35°, 50°, 70°)
  document.querySelectorAll('.btn-angle-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetAngle = parseFloat(btn.getAttribute('data-angle'));
      const slider = document.getElementById('manual-actuator-slider');
      const sliderVal = document.getElementById('manual-slider-val');
      if (slider) slider.value = targetAngle;
      if (sliderVal) sliderVal.textContent = `${targetAngle.toFixed(1)}°`;

      setActuatorAngle(targetAngle, `Preset commanded: ${targetAngle}°`);
      triggerAudioChime('info');
      showToast(`⚡ Actuator commanded to ${targetAngle}°`);
      renderCurrentView();
    });
  });

  const slider = document.getElementById('manual-actuator-slider');
  const sliderVal = document.getElementById('manual-slider-val');
  if (slider && sliderVal) {
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      sliderVal.textContent = `${val.toFixed(1)}°`;
    });
  }

  const applyBtn = document.getElementById('btn-apply-manual-angle');
  if (applyBtn && slider) {
    applyBtn.addEventListener('click', () => {
      const angle = parseFloat(slider.value);
      promptReauth({
        title: 'Manual Actuator Tilt Override',
        reason: 'Manual adjustment bypasses automated closed-loop solar tracking.',
        onConfirmed: () => {
          setActuatorAngle(angle, 'Manual angle override');
          triggerAudioChime('info');
          showToast(`✓ Actuator locked at ${angle.toFixed(1)}°`);
          renderCurrentView();
        },
        onCancelled: () => {
          renderCurrentView();
        }
      });
    });
  }
}

// ------------------------------------------------------------
// ALERTS CENTER EVENT BINDINGS
// ------------------------------------------------------------
function bindAlertsEvents() {
  document.querySelectorAll('.btn-alert-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.alertFilter = e.target.getAttribute('data-filter');
      renderCurrentView();
    });
  });

  document.querySelectorAll('.btn-ack-alert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-alertid');
      acknowledgeAlert(id);
      showToast('Alert acknowledged');
      renderCurrentView();
    });
  });

  document.querySelectorAll('.btn-resolve-alert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-alertid');
      resolveAlert(id);
      showToast('✓ Alert marked as resolved');
      renderCurrentView();
    });
  });

  document.getElementById('btn-alerts-voice-test')?.addEventListener('click', () => {
    triggerVoiceAlert('test');
  });
}

// ------------------------------------------------------------
// SCHEDULER & HARDWARE CONFIG EVENT BINDINGS
// ------------------------------------------------------------
function bindSchedulerEvents() {
  const saveBtn = document.getElementById('btn-save-scheduler-cfg');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const rainThresh = parseFloat(document.getElementById('cfg-rain-threshold')?.value || 2.0);
      const rainAngle = parseFloat(document.getElementById('cfg-rain-angle')?.value || 30.0);
      const rainDelay = parseInt(document.getElementById('cfg-rain-delay')?.value || 15);
      const soilThresh = parseFloat(document.getElementById('cfg-soil-threshold')?.value || 38.0);
      const camMorning = document.getElementById('cfg-cam-morning')?.value || '07:30';
      const camAfternoon = document.getElementById('cfg-cam-afternoon')?.value || '13:15';
      const camNight = document.getElementById('cfg-cam-night')?.value || '22:00';
      const batteryCutoff = parseFloat(document.getElementById('cfg-battery-cutoff')?.value || 20.0);
      const windStow = parseFloat(document.getElementById('cfg-wind-stow')?.value || 45.0);

      updateSchedulerConfig({
        rainThresholdMm: rainThresh,
        rainAngleDeg: rainAngle,
        rainRestoreDelayMins: rainDelay,
        soilMoistureThreshold: soilThresh,
        morningCaptureTime: camMorning,
        afternoonCaptureTime: camAfternoon,
        nightCaptureTime: camNight,
        batteryReserveCutoff: batteryCutoff,
        windStowSpeedKmh: windStow
      });

      showToast('✓ Environmental Automation Scheduler configuration saved!');
      renderCurrentView();
    });
  }
}

// ------------------------------------------------------------
// SYSTEM SIMULATOR EVENT BINDINGS
// ------------------------------------------------------------
function bindSimulatorEvents() {
  document.getElementById('sim-btn-low-battery')?.addEventListener('click', () => {
    simulateBatteryLow20();
    triggerVoiceAlert('battery');
    showToast('🚨 Low Battery Rule (≤20%) Triggered! Load shedding engaged.');
    renderCurrentView();
  });

  document.getElementById('sim-btn-rain')?.addEventListener('click', () => {
    simulateRainDetection(14.5);
    triggerVoiceAlert('rain');
    showToast('🌧️ Rain Event (14.5mm) Injected! Auto-actuating to runoff angle.');
    renderCurrentView();
  });

  document.getElementById('sim-btn-wind')?.addEventListener('click', () => {
    simulateHighWindGust(52.0);
    triggerVoiceAlert('wind');
    showToast('🌪️ High Wind Gust (52 km/h) Injected! Emergency flat stow (0°) active.');
    renderCurrentView();
  });

  document.getElementById('sim-btn-solar-fault')?.addEventListener('click', () => {
    simulateSolarFailure('DC_DISCONNECT');
    showToast('⚡ DC String Disconnect Simulated! Switched to battery storage.');
    renderCurrentView();
  });

  document.getElementById('sim-btn-grid-fault')?.addEventListener('click', () => {
    simulateGridFailure();
    showToast('🔌 External Grid Blackout Simulated! Microgrid isolated.');
    renderCurrentView();
  });

  document.getElementById('sim-btn-network-cut')?.addEventListener('click', () => {
    simulateNetworkCut();
    showToast('📡 Network Disconnected! Running in Local Autonomous Edge mode.');
    renderCurrentView();
  });

  document.getElementById('sim-btn-network-restore')?.addEventListener('click', () => {
    simulateRestoreNetwork();
    showToast('🔄 Network Restored! Synchronizing buffered local logs to cloud...');
    setTimeout(() => renderCurrentView(), 1600);
  });

  document.getElementById('sim-btn-estop-toggle')?.addEventListener('click', () => {
    const iot = getIotState();
    if (iot.isEmergencyStopped) {
      resetEmergencyStop();
      showToast('✓ Emergency Stop Cleared');
    } else {
      triggerEmergencyStop();
      showToast('🛑 EMERGENCY STOP ENGAGED');
    }
    renderCurrentView();
  });

  document.getElementById('btn-sim-restore-all')?.addEventListener('click', () => {
    simulateRestoreSolar();
    simulateRestoreGrid();
    simulateRestoreNetwork();
    resetEmergencyStop();
    setManualSliders({ solarWatts: 2840, batterySoc: 88, windSpeed: 14.2, rainMm: 0.0 });
    showToast('✓ All systems restored to nominal state.');
    renderCurrentView();
  });

  // Hardware sliders
  const sWatts = document.getElementById('sim-slider-watts');
  const sSoc = document.getElementById('sim-slider-soc');
  const sWind = document.getElementById('sim-slider-wind');
  const sRain = document.getElementById('sim-slider-rain');

  if (sWatts) {
    sWatts.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      document.getElementById('val-slider-watts').textContent = `${val} W`;
      setManualSliders({ solarWatts: val });
    });
  }

  if (sSoc) {
    sSoc.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      document.getElementById('val-slider-soc').textContent = `${val}%`;
      setManualSliders({ batterySoc: val });
    });
  }

  if (sWind) {
    sWind.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      document.getElementById('val-slider-wind').textContent = `${val} km/h`;
      setManualSliders({ windSpeed: val });
    });
  }

  if (sRain) {
    sRain.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('val-slider-rain').textContent = `${val} mm`;
      setManualSliders({ rainMm: val });
    });
  }
}

// ------------------------------------------------------------
// REPORTS EVENT BINDINGS
// ------------------------------------------------------------
function bindReportsEvents() {
  document.getElementById('btn-print-full-report')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btn-export-csv-report')?.addEventListener('click', () => {
    const iot = getIotState();
    const csv = `Timestamp,SolarWatts,SolarKwhToday,BatterySoC,BatterySoH,SoilMoisture,PanelAngle,GridStatus\n` +
      `${new Date().toISOString()},${iot.solarPowerOutputWatts},${iot.solarEnergyTodayKwh},${iot.battery.chargePercent},${iot.battery.healthPercent},${iot.soilMoisture},${iot.panelAngleDeg},"${iot.gridStatus}"\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SunStarved_Farm_Report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV Report Downloaded');
  });

  document.getElementById('btn-export-json-report')?.addEventListener('click', () => {
    const iot = getIotState();
    const blob = new Blob([JSON.stringify({ farm: state.currentFarm, iotState: iot, generatedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SunStarved_Farm_Report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON Report Downloaded');
  });
}

// ------------------------------------------------------------
// CUSTOMER CARE, HELP & FEEDBACK EVENT BINDINGS
// ------------------------------------------------------------
function bindSupportEvents() {
  // Support tab switcher
  document.querySelectorAll('.support-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.supportTab = btn.getAttribute('data-suptab');
      renderCurrentView();
    });
  });

  // Copy contact buttons
  document.querySelectorAll('.btn-copy-contact').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      if (text) {
        navigator.clipboard?.writeText(text);
        showToast(`Copied to clipboard: ${text}`);
      }
    });
  });

  // WhatsApp Chat Simulator Button
  const waBtn = document.getElementById('btn-open-whatsapp-sim');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      showToast('Opening WhatsApp Agrivoltaic Kisan Bot (+91 98765 44040)...');
      setTimeout(() => {
        showToast('💬 WhatsApp Kisan Bot connected! Type "STATUS" or send leaf photo.');
      }, 1000);
    });
  }

  // Interactive 5-star ratings state
  const currentRatings = {
    overall: 5,
    tracking: 5,
    ai: 4,
    ease: 5
  };

  document.querySelectorAll('.star-rating-picker').forEach(picker => {
    const metric = picker.getAttribute('data-metric');
    const stars = picker.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.getAttribute('data-val'), 10);
        currentRatings[metric] = val;
        const valDisplay = document.getElementById(`val-rating-${metric}`);
        if (valDisplay) valDisplay.textContent = `${val} / 5`;
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-val'), 10);
          if (sVal <= val) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
  });

  // Farmer Feedback Form Submit
  const submitFbBtn = document.getElementById('btn-submit-feedback');
  if (submitFbBtn) {
    submitFbBtn.addEventListener('click', () => {
      const subject = document.getElementById('fb-subject')?.value?.trim();
      const message = document.getElementById('fb-message')?.value?.trim();
      const category = document.getElementById('fb-category')?.value;
      const urgency = document.getElementById('fb-urgency')?.value;
      const farmerId = document.getElementById('fb-farmer-id')?.value;

      if (!subject || !message) {
        showToast('⚠️ Please enter both a subject and your feedback message.');
        return;
      }

      const ticketId = `FB-${Math.floor(10000 + Math.random() * 90000)}`;
      const newEntry = {
        id: ticketId,
        date: new Date().toISOString().split('T')[0],
        category,
        ratings: { ...currentRatings },
        subject,
        message,
        status: urgency === 'Critical' ? 'Priority Triage' : 'Under Review by Agronomist',
        urgency,
        farmerId,
        response: urgency === 'Critical' 
          ? 'Urgent triage initiated. Field engineer will contact via registered phone within 15 minutes.' 
          : 'Thank you! Your field feedback has been submitted to the regional Agrisolar operations desk.'
      };

      saveFeedbackEntry(newEntry);
      triggerAudioChime('info');
      showToast(`🎉 Feedback Submitted! Ticket #${ticketId} created.`);
      renderCurrentView();
    });
  }

  // Service Request Booking Form Submit
  const submitSrvBtn = document.getElementById('btn-submit-service-req');
  if (submitSrvBtn) {
    submitSrvBtn.addEventListener('click', () => {
      const serviceType = document.getElementById('srv-type')?.value;
      const date = document.getElementById('srv-date')?.value;
      const slot = document.getElementById('srv-slot')?.value;
      const farmLocation = document.getElementById('srv-farm-address')?.value?.trim();
      const notes = document.getElementById('srv-notes')?.value?.trim();
      const phone = document.getElementById('srv-phone')?.value?.trim();

      if (!date || !farmLocation || !phone) {
        showToast('⚠️ Please provide date, farm location, and phone number.');
        return;
      }

      const srvId = `SRV-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newSrv = {
        id: srvId,
        date,
        slot,
        serviceType,
        farmLocation,
        status: 'Confirmed & Dispatched',
        technician: 'Er. Somanna / Kolar Regional Agrisolar Hub',
        technicianPhone: '+91 94801 88404',
        notes: notes || 'Scheduled field maintenance inspection.'
      };

      saveServiceRequest(newSrv);
      triggerAudioChime('info');
      showToast(`🛠️ Service Booked! Engineer dispatched under #${srvId}`);
      renderCurrentView();
    });
  }

  // FAQ Accordion Expand/Collapse
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-faqid');
      const panel = document.getElementById(`faq-answer-${id}`);
      if (panel) {
        const isHidden = panel.style.display === 'none';
        panel.style.display = isHidden ? 'block' : 'none';
        if (isHidden) {
          btn.classList.add('expanded');
        } else {
          btn.classList.remove('expanded');
        }
      }
    });
  });

  // FAQ Category Filter Chips
  document.querySelectorAll('.faq-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.faq-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');

      document.querySelectorAll('.faq-item').forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Search Input
  const searchInput = document.getElementById('faq-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// ============================================================
// TOAST UTILITY
// ============================================================
export function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🌱</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Launch application on DOM ready
document.addEventListener('DOMContentLoaded', init);
