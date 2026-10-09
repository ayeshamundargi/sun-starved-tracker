# ☀️ Sun-Starved Tracker — AI-Powered Agrivoltaics & Smart Crop Protection System

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESNext-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-22c55e?logo=github)](https://ayeshamundargi.github.io/sun-starved-tracker/)

> **Next-Generation Dual-Axis Agrivoltaics Optimization Dashboard**  
> Maximizes solar harvest while regulating Photosynthetically Active Radiation (PAR), microclimates, and soil hydration for crops beneath elevated panel canopies.

---

## 🌟 Key Features

### 1. ⚙️ Interactive Physical Dual-Axis Kinematics & Hydraulic Simulator
- **High-Fidelity 800×480 SVG Kinematic Rig**: 3.5m elevated structural stanchion over tomato crop canopies.
- **Dynamic Hydraulic Piston**: Telescoping actuator cylinder with real-time chrome stroke extension (50mm–500mm).
- **Live Ground Shadow Projection**: Physical raycasting casts accurate ground shade ellipses shifting with tilt angles.
- **Atmospheric Visual FX**:
  - *Rain Runoff Mode*: Water stream particles channeled directly into rainwater harvesting swales.
  - *Wind Stow Mode*: 0° horizontal orientation with 86% drag reduction laminar flow streamlines.
  - *Solar Tracking Mode*: Optimal PAR photon absorption rays.
- **Cockpit Telemetry Dials**: Real-time Elevation Arc Gauge (0°–75°) and Compass Azimuth Gauge (198° SSW).
- **One-Touch Presets**: 0° Stow (Storm), 15° Morning, 30° Rain Runoff, 35° Solar Opt, 50° Afternoon, 70° PAR Flush.

### 2. 🌐 Complete Multi-Language Globalization
- Instant 1-click multilingual switcher supporting **6 languages**:
  - 🇬🇧 English
  - 🇮🇳 Hindi (हिन्दी)
  - 🇮🇳 Kannada (ಕನ್ನಡ)
  - 🇮🇳 Tamil (தமிழ்)
  - 🇮🇳 Telugu (తెలుగు)
  - 🇮🇳 Marathi (मराठी)
- 100% key parity across all navigation tabs, metrics, alerts, forms, customer care, and tooltips.

### 3. ⚡ Smart Battery & Energy Management
- Real-time simulation of dual Lithium-Iron-Phosphate (LiFePO4) storage units (91% SoC).
- Intelligent grid export/import scheduling, peak shaving, and zero-export curtailment options.
- Dynamic telemetry charts powered by Chart.js.

### 4. 🌱 Precision Crop Microclimate & Irrigation
- Soil moisture monitoring with automatic smart valve control.
- Photosynthetically Active Radiation (PAR) flux tracking ($1480\ \mu\text{mol/m}^2/\text{s}$).
- Under-panel ambient vs. open-field temperature and humidity differential analysis.

### 5. 🚨 AI Alerts, Automation Engine & Safety Stowing
- Automatic emergency stow triggers on high wind gusts (>60 km/h) or hail detection.
- Rain harvest tilt adjustments and anti-shading backtrack algorithms.

### 6. 🎧 24/7 Dedicated Customer Care & Feedback Portal
- Direct emergency call center hotline, WhatsApp AI bot, and technical field dispatch.
- Interactive multi-criteria farmer feedback submission with instant ticket generation.

---

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES Modules), HTML5 Semantic Architecture
- **Styling**: Vanilla CSS3 with CSS Custom Properties / Modern Design Tokens, Glassmorphism, and Fluid Typography
- **Charts & Visualization**: Chart.js, Leaflet.js
- **Build Tool**: Vite 6
- **Deployment**: GitHub Pages via GitHub Actions

---

## 🚀 Quick Start (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayeshamundargi/sun-starved-tracker.git
   cd sun-starved-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port displayed in your terminal) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Bundled files will be output to the `dist/` directory.

---

## 📦 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD pipeline
├── public/                     # Static assets & icons
├── src/
│   ├── components/             # View components
│   │   ├── positioningView.js  # 800x480 SVG Kinematics simulator
│   │   ├── energyView.js       # Energy & Battery metrics
│   │   ├── cropHealthView.js   # Crop sensors & irrigation
│   │   ├── customerCareView.js # Customer support & feedback
│   │   └── ...
│   ├── data/
│   │   ├── i18n.js             # 6-language translation dictionaries
│   │   └── mockData.js         # Telemetry data & sensor baselines
│   ├── styles/
│   │   ├── base.css            # Design tokens & dark theme
│   │   ├── components.css      # Component layouts & cockpit UI
│   │   └── layout.css          # Navigation & responsive grid
│   └── app.js                  # Application orchestrator & router
├── index.html                  # Main entry page
├── package.json
└── vite.config.js              # Vite configuration (base: './')
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
