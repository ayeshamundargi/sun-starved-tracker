/**
 * Customer Care, Help Contact & Customer Feedback Module
 * Comprehensive Support Portal:
 * - 24/7 Kisan Agrivoltaic Toll-Free Helpline & WhatsApp Assistant
 * - Emergency Hardware & Actuator Breakdown Dispatch Hotline
 * - Regional Agritech Field Engineering Centers
 * - Interactive 4-Metric Star Rating & Detailed Farmer Feedback Form
 * - Feedback History & Ticket Resolution Tracker
 * - Book On-Site Field Engineer Visit
 * - Searchable Knowledge Base & FAQ Accordion
 */

import { getCurrentSession, DEMO_FARMER } from '../services/auth.js';
import { getIotState } from '../services/iotEngine.js';

// Feedback Store Helpers
const FEEDBACK_STORAGE_KEY = 'sun_starved_farmer_feedback';
const SERVICE_REQ_STORAGE_KEY = 'sun_starved_service_requests';

export function getStoredFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  // Default seed feedback
  return [
    {
      id: 'FB-84920-01',
      date: '2026-03-28',
      category: 'Crop Model',
      ratings: { overall: 5, tracking: 5, ai: 4, ease: 5 },
      subject: 'Soil moisture threshold for tomatoes',
      message: 'The rain runoff angle configuration (30°) prevented soil erosion beneath the bifacial panels during heavy downpours. Tomato yield increased by 22% compared to open field.',
      status: 'Acknowledged by Agronomist',
      urgency: 'Normal',
      farmerId: 'AGRI-84920-KA',
      response: 'Thank you Ramesh-ji. Your field observations have been incorporated into our Kolar crop PAR coefficient dataset.'
    },
    {
      id: 'FB-84920-02',
      date: '2026-04-02',
      category: 'Hardware & Actuator',
      ratings: { overall: 4, tracking: 4, ai: 5, ease: 4 },
      subject: 'Actuator worm gear lubrication query',
      message: 'Dual-axis tracker responds well to wind gusts, stowing at 0° within 45 seconds. Requesting annual greasing schedule for Kolar dusty conditions.',
      status: 'Resolved',
      urgency: 'Important',
      farmerId: 'AGRI-84920-KA',
      response: 'Resolved on 2026-04-04 by Field Tech M. Gowda during routine bi-monthly PM visit. Applied high-temp EP2 grease.'
    }
  ];
}

export function saveFeedbackEntry(entry) {
  const list = getStoredFeedback();
  list.unshift(entry);
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}
  return list;
}

export function getStoredServiceRequests() {
  try {
    const raw = localStorage.getItem(SERVICE_REQ_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  return [
    {
      id: 'SRV-2026-904',
      date: '2026-04-10',
      slot: 'Morning (09:00 - 12:00)',
      serviceType: 'Soil & Light Sensor Recalibration',
      farmLocation: 'Vemgal Rural, Kolar, Karnataka',
      status: 'Scheduled',
      technician: 'K. Somanna (Senior Field Engineer)',
      technicianPhone: '+91 94801 88404',
      notes: 'Biannual recalibration of PAR quantum light sensors and TDR soil probe.'
    }
  ];
}

export function saveServiceRequest(req) {
  const list = getStoredServiceRequests();
  list.unshift(req);
  try {
    localStorage.setItem(SERVICE_REQ_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}
  return list;
}

// FAQ Data Source
const FAQ_ITEMS = [
  {
    category: 'tracking',
    question: 'Why did my solar panels automatically move to 30° during rain?',
    answer: 'When the onboard rain sensor registers rainfall exceeding the configured threshold (default 2.0mm), the controller moves the panels to the configured rain runoff angle (default 30°). This directs rainwater into designated drainage channels and crop collection rows, preventing soil erosion, root waterlogging, and module ponding.'
  },
  {
    category: 'tracking',
    question: 'What happens if wind speed exceeds 45 km/h?',
    answer: 'The system engages Priority 1 Storm Stow mode: the actuator immediately commands the array to 0° (flat stow) within 45 seconds. This drastically reduces aerodynamic wind drag and protects structural purlins, motor couplings, and bifacial glass from shear failure.'
  },
  {
    category: 'battery',
    question: 'Why did the irrigation pump shut off when battery reached 20%?',
    answer: 'To protect the LiFePO4 battery from deep discharge damage, the intelligent controller enforces a strict 20% reserve cutoff. Non-essential high-power loads like the 450W irrigation pump are automatically shed to preserve remaining energy for critical IoT telemetry, IP cameras, and emergency panel actuators.'
  },
  {
    category: 'battery',
    question: 'How does the system prevent unsafe grid backfeeding during outages?',
    answer: 'The agrivoltaic hybrid inverter incorporates a certified anti-islanding transfer switch. When the 230V external grid fails, the inverter disconnects from the grid in less than 20 milliseconds, creating an isolated islanded microgrid to safeguard electrical line workers.'
  },
  {
    category: 'camera',
    question: 'How do the 3 daily crop camera captures work?',
    answer: 'The system captures images in 3 configured windows: Morning (07:30) for leaf turgor and dew; Afternoon (13:15) for peak sunlight stress and wilting detection; and Night (22:00) using low-light infrared night vision to monitor nocturnal transpiration without disturbing photoperiods.'
  },
  {
    category: 'offline',
    question: 'Can the farm continue operating if 4G internet connection is lost?',
    answer: 'Yes! The edge microcontroller (ESP32/Industrial PLC) operates completely autonomously. All sensor reading, rain responses, wind stows, and battery protections execute locally. Sensor data and logs are buffered in local non-volatile memory and automatically synchronize when connectivity returns.'
  },
  {
    category: 'security',
    question: 'How do I recover my password if I forget it in the field?',
    answer: 'Click "Forgot Password" on the login screen. Enter your registered mobile number to receive a secure 6-digit SMS OTP. Once verified, you can immediately set a new strong password without needing email or office assistance.'
  },
  {
    category: 'service',
    question: 'How often should solar panels and camera lenses be cleaned?',
    answer: 'In dusty agricultural conditions, we recommend cleaning solar modules every 15-20 days using soft water brushes. Camera lenses should be wiped monthly with microfiber cloth. You can also book a certified technician directly through the "Book Field Engineer" tab.'
  }
];

export function renderSupportViewHTML(activeTab = 'contact') {
  const session = getCurrentSession();
  const farmer = session ? {
    id: session.farmerId,
    name: session.farmerName,
    phone: session.phone
  } : DEMO_FARMER;

  const iot = getIotState();
  const feedbacks = getStoredFeedback();
  const serviceReqs = getStoredServiceRequests();

  return `
    <div class="support-view-container">
      <!-- Hero Banner -->
      <div class="card support-hero-card">
        <div class="support-hero-content">
          <div class="support-hero-badge">
            <span class="live-dot pulse"></span>
            <span>24/7 KISAN HELPLINE & TECHNICAL CARE ACTIVE</span>
          </div>
          <h1 class="support-hero-title">🎧 Customer Care, Support & Feedback Center</h1>
          <p class="support-hero-desc">
            Direct farmer assistance in 6 languages. Reach agrivoltaic engineers, request on-site hardware maintenance, track service tickets, and share your crop feedback.
          </p>

          <div class="support-quick-stats">
            <div class="support-stat-chip">
              <span class="stat-icon">📞</span>
              <div>
                <strong>1800-419-4404</strong>
                <small>Toll-Free All India</small>
              </div>
            </div>
            <div class="support-stat-chip">
              <span class="stat-icon">💬</span>
              <div>
                <strong>+91 98765 44040</strong>
                <small>WhatsApp Field Bot</small>
              </div>
            </div>
            <div class="support-stat-chip">
              <span class="stat-icon">⏱️</span>
              <div>
                <strong>&lt; 2 Minutes</strong>
                <small>Average Call Response</small>
              </div>
            </div>
            <div class="support-stat-chip">
              <span class="stat-icon">🗣️</span>
              <div>
                <strong>6 Languages</strong>
                <small>EN, HI, KN, TA, TE, MR</small>
              </div>
            </div>
          </div>
        </div>

        <div class="support-hero-action">
          <div class="support-hotline-box">
            <div class="hotline-label">EMERGENCY FIELD DISPATCH</div>
            <div class="hotline-number">+91 98450 14404</div>
            <div class="hotline-sub">For Motor Jam, Inverter Trip, Array Damage</div>
            <a href="tel:18004194404" class="btn btn-sm btn-accent w-100" style="margin-top:0.75rem;">
              📞 Dial Toll-Free Now
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation Tab Bar -->
      <div class="support-tabs-bar">
        <button class="support-tab-btn ${activeTab === 'contact' ? 'active' : ''}" data-suptab="contact">
          📞 24/7 Helplines & Centers
        </button>
        <button class="support-tab-btn ${activeTab === 'feedback' ? 'active' : ''}" data-suptab="feedback">
          ⭐ Farmer Feedback & Rating
        </button>
        <button class="support-tab-btn ${activeTab === 'service' ? 'active' : ''}" data-suptab="service">
          🚜 Book Field Engineer
        </button>
        <button class="support-tab-btn ${activeTab === 'faq' ? 'active' : ''}" data-suptab="faq">
          💡 FAQs & Self-Help
        </button>
      </div>

      <!-- TAB 1: 24/7 HELPLINES & REGIONAL CENTERS -->
      <div id="suptab-contact" class="support-tab-content ${activeTab === 'contact' ? 'active' : ''}">
        <div class="support-grid-2col">
          <!-- Direct Channels -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📞 Direct Kisan Communication Channels</h3>
              <span class="badge badge-success">🟢 Live Support</span>
            </div>

            <div class="contact-channel-list">
              <div class="contact-channel-item">
                <div class="channel-icon-box bg-green">
                  <span>📞</span>
                </div>
                <div class="channel-info">
                  <h4>Toll-Free Kisan Agrivoltaics Helpline</h4>
                  <p class="channel-phone">1800-419-4404 / 1800-SUN-FARM</p>
                  <p class="text-xs text-muted">Free across all telecom networks (BSNL, Jio, Airtel, Vi). Available 24 hours.</p>
                </div>
                <div class="channel-actions">
                  <a href="tel:18004194404" class="btn btn-xs btn-primary">Call</a>
                  <button class="btn btn-xs btn-outline btn-copy-contact" data-text="18004194404">Copy</button>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="channel-icon-box bg-whatsapp">
                  <span>💬</span>
                </div>
                <div class="channel-info">
                  <h4>WhatsApp Agrivoltaic Assistant</h4>
                  <p class="channel-phone">+91 98765 44040</p>
                  <p class="text-xs text-muted">Send crop photos, receive instant diagnostic reports, and check sensor status via chat.</p>
                </div>
                <div class="channel-actions">
                  <button id="btn-open-whatsapp-sim" class="btn btn-xs btn-accent">Open Chat</button>
                  <button class="btn btn-xs btn-outline btn-copy-contact" data-text="+919876544040">Copy</button>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="channel-icon-box bg-red">
                  <span>🚨</span>
                </div>
                <div class="channel-info">
                  <h4>Emergency Actuator & Hardware Dispatch</h4>
                  <p class="channel-phone">+91 98450 14404</p>
                  <p class="text-xs text-muted">Direct line to field engineers for motor failure, inverter ground faults, or storm hazard.</p>
                </div>
                <div class="channel-actions">
                  <a href="tel:9845014404" class="btn btn-xs btn-danger">Emergency</a>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="channel-icon-box bg-blue">
                  <span>✉️</span>
                </div>
                <div class="channel-info">
                  <h4>Technical Email Support</h4>
                  <p class="channel-phone">support@sunstarvedtracker.in</p>
                  <p class="text-xs text-muted">Send telemetry dumps, inverter logs, and warranty documentation. SLA: &lt; 4 hours.</p>
                </div>
                <div class="channel-actions">
                  <a href="mailto:support@sunstarvedtracker.in" class="btn btn-xs btn-outline">Email</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Regional Engineering Hubs -->
          <div class="card">
            <div class="card-header-clean">
              <h3>🏢 Regional Agrivoltaics Field Centers</h3>
              <span class="badge badge-info">4 Tech Hubs</span>
            </div>

            <div class="regional-hubs-list">
              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Kolar Regional Agritech Hub (Karnataka)</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">APMC Tech Yard, Vemgal Industrial Road, Kolar, Karnataka — 563101</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Dr. M. Gowda</strong></span>
                  <span>Contact: <strong>+91 8152 244041</strong></span>
                  <span>Service Radius: <strong>Kolar, Chikkaballapur, Bengaluru Rural</strong></span>
                </div>
              </div>

              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Pune Western Agrivoltaic Center (Maharashtra)</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">Hadapsar Agro-Innovation Park, Pune-Solapur Highway, Pune, MH — 411028</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Er. Sachin Deshmukh</strong></span>
                  <span>Contact: <strong>+91 20 2644 0402</strong></span>
                  <span>Service Radius: <strong>Pune, Ahmednagar, Solapur, Satara</strong></span>
                </div>
              </div>

              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Coimbatore Tamil Nadu Center</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">TNAU Agricultural Technology Park, Lawley Road, Coimbatore, TN — 641003</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Dr. K. Selvam</strong></span>
                  <span>Contact: <strong>+91 422 244 0403</strong></span>
                  <span>Service Radius: <strong>Coimbatore, Tiruppur, Erode, Salem</strong></span>
                </div>
              </div>

              <div class="hub-item">
                <div class="hub-header">
                  <strong>📍 Chittoor Rayalaseema Center (Andhra Pradesh)</strong>
                  <span class="hub-status-badge">🟢 Open (08:00 - 20:00)</span>
                </div>
                <p class="text-xs text-muted">Madanapalle Agrivoltaic Demonstration Center, Chittoor, AP — 517325</p>
                <div class="hub-details text-xs">
                  <span>Lead Engineer: <strong>Er. R. Naidu</strong></span>
                  <span>Contact: <strong>+91 8571 244 0404</strong></span>
                  <span>Service Radius: <strong>Chittoor, Tirupati, Annamayya, Kadapa</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Level Guarantees -->
        <div class="card" style="margin-top:1.25rem;">
          <div class="card-header-clean">
            <h3>🛡️ Our Kisan Service Level Commitments (SLA)</h3>
            <span class="badge badge-accent">ISO 9001 Agrivoltaics Certified</span>
          </div>
          <div class="sla-grid">
            <div class="sla-card">
              <div class="sla-val">&lt; 2 Mins</div>
              <div class="sla-title">Helpline Answer Time</div>
              <p class="text-xs text-muted">No endless automated menus. Direct connection to an agricultural engineer.</p>
            </div>
            <div class="sla-card">
              <div class="sla-val">&lt; 4 Hours</div>
              <div class="sla-title">Emergency Field Arrival</div>
              <p class="text-xs text-muted">For motor stalls, inverter trips, or electrical hazards within 75km radius.</p>
            </div>
            <div class="sla-card">
              <div class="sla-val">100% Free</div>
              <div class="sla-title">Toll-Free & Warranty Support</div>
              <p class="text-xs text-muted">Zero charges for technical calls, firmware diagnostics, or remote tuning.</p>
            </div>
            <div class="sla-card">
              <div class="sla-val">6 Languages</div>
              <div class="sla-title">Vernacular Fluency</div>
              <p class="text-xs text-muted">Dedicated native speakers for Kannada, Marathi, Tamil, Telugu, Hindi, English.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: FARMER FEEDBACK & RATING -->
      <div id="suptab-feedback" class="support-tab-content ${activeTab === 'feedback' ? 'active' : ''}">
        <div class="support-grid-2col">
          <!-- Feedback Submission Form -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📝 Submit Farmer Feedback & Review</h3>
              <span class="badge badge-primary">Your Voice Matters</span>
            </div>
            <p class="text-xs text-muted" style="margin-bottom:1rem;">
              Help our agricultural engineers and software team improve tracking algorithms, crop disease models, and user experience.
            </p>

            <form id="form-farmer-feedback" onsubmit="return false;">
              <!-- Star Ratings Grid -->
              <div class="rating-metrics-group">
                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>Overall Experience:</span>
                    <strong id="val-rating-overall">5 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="overall">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star active" data-val="5">★</span>
                  </div>
                </div>

                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>Solar Tracking Accuracy:</span>
                    <strong id="val-rating-tracking">5 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="tracking">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star active" data-val="5">★</span>
                  </div>
                </div>

                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>Crop Camera AI Quality:</span>
                    <strong id="val-rating-ai">4 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="ai">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star" data-val="5">★</span>
                  </div>
                </div>

                <div class="rating-metric-item">
                  <div class="rating-label">
                    <span>App Ease of Use & Language:</span>
                    <strong id="val-rating-ease">5 / 5</strong>
                  </div>
                  <div class="star-rating-picker" data-metric="ease">
                    <span class="star active" data-val="1">★</span>
                    <span class="star active" data-val="2">★</span>
                    <span class="star active" data-val="3">★</span>
                    <span class="star active" data-val="4">★</span>
                    <span class="star active" data-val="5">★</span>
                  </div>
                </div>
              </div>

              <!-- Form Inputs -->
              <div class="form-group" style="margin-top:1rem;">
                <label for="fb-category">Feedback Category</label>
                <select id="fb-category" class="form-input">
                  <option value="General Experience">🌱 General Experience & Crop Growth</option>
                  <option value="Solar & Actuator">⚡ Solar Tracking & Actuator Positioning</option>
                  <option value="Battery & Power">🔋 Battery Health & Power Load Shedding</option>
                  <option value="Crop Camera AI">📷 Crop Camera & Plant Disease AI</option>
                  <option value="Sensors & Weather">🌧️ Rain / Soil / Weather Sensors</option>
                  <option value="Feature Request">💡 Feature Request / Improvement Idea</option>
                  <option value="Language Support">🇮🇳 Language Translation & Voice Feedback</option>
                </select>
              </div>

              <div class="form-group">
                <label for="fb-subject">Summary / Subject</label>
                <input type="text" id="fb-subject" class="form-input" placeholder="e.g. Panel rain runoff angle worked wonderfully during thunderstorm" required />
              </div>

              <div class="form-group">
                <label for="fb-message">Detailed Feedback or Field Observations</label>
                <textarea id="fb-message" class="form-input" rows="4" placeholder="Tell us how the system is behaving in your fields, any suggestions for crop growth, or issues you noticed..." required></textarea>
              </div>

              <div class="form-row-2col">
                <div class="form-group">
                  <label for="fb-urgency">Priority / Urgency</label>
                  <select id="fb-urgency" class="form-input">
                    <option value="Normal">🟢 Normal (Feedback / Suggestion)</option>
                    <option value="Important">🟡 Important (Needs Review)</option>
                    <option value="Critical">🔴 Critical Field Issue (Request Call)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="fb-farmer-id">Farmer ID (Auto-Linked)</label>
                  <input type="text" id="fb-farmer-id" class="form-input" value="${farmer.id}" readonly />
                </div>
              </div>

              <button type="button" id="btn-submit-feedback" class="btn btn-primary w-100" style="margin-top:1rem;">
                🚀 Submit Feedback & Generate Ticket
              </button>
            </form>
          </div>

          <!-- Submitted Feedback History -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📋 Your Feedback & Resolution History</h3>
              <span class="badge badge-info">${feedbacks.length} Submissions</span>
            </div>

            <div class="feedback-history-list" id="feedback-history-container">
              ${feedbacks.map(f => `
                <div class="feedback-history-card">
                  <div class="fb-card-top">
                    <div>
                      <span class="fb-ticket-id">#${f.id}</span>
                      <strong class="fb-subject">${f.subject}</strong>
                    </div>
                    <span class="badge ${f.status === 'Resolved' ? 'badge-success' : 'badge-accent'}">${f.status}</span>
                  </div>

                  <div class="fb-rating-stars">
                    <span>Overall: ${'★'.repeat(f.ratings.overall)}${'☆'.repeat(5 - f.ratings.overall)}</span>
                    <span class="text-xs text-muted">• Category: ${f.category}</span>
                    <span class="text-xs text-muted">• ${f.date}</span>
                  </div>

                  <p class="fb-message-text">${f.message}</p>

                  ${f.response ? `
                    <div class="fb-response-box">
                      <strong>💬 Agri-Engineer Response:</strong>
                      <p>${f.response}</p>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: BOOK ON-SITE FIELD ENGINEER VISIT -->
      <div id="suptab-service" class="support-tab-content ${activeTab === 'service' ? 'active' : ''}">
        <div class="support-grid-2col">
          <!-- Service Booking Form -->
          <div class="card">
            <div class="card-header-clean">
              <h3>🚜 Request On-Site Field Engineer Visit</h3>
              <span class="badge badge-accent">Certified Agrisolar Tech</span>
            </div>
            <p class="text-xs text-muted" style="margin-bottom:1rem;">
              Need an agrivoltaic specialist to calibrate actuators, inspect bi-facial wiring, clean sensor lenses, or test battery BMS? Book a technician directly to your farm.
            </p>

            <form id="form-service-booking" onsubmit="return false;">
              <div class="form-group">
                <label for="srv-type">Service Required</label>
                <select id="srv-type" class="form-input">
                  <option value="Dual-Axis Actuator Calibration">📐 Dual-Axis Actuator Calibration & Gear Alignment</option>
                  <option value="Soil & Light Sensor Recalibration">🌱 Soil TDR Probe & Light Sensor Recalibration</option>
                  <option value="Camera Lens Maintenance">📷 Crop Health Camera Lens Cleaning & Alignment</option>
                  <option value="Inverter & Anti-Islanding Diagnostic">⚡ Inverter MPPT & Anti-Islanding Safety Audit</option>
                  <option value="LiFePO4 Battery BMS Health Check">🔋 LiFePO4 Battery BMS & Cell Balancing Check</option>
                  <option value="Panel Surface Eco-Wash">🚿 Solar Module Eco-Wash & Soil Removal</option>
                  <option value="General Agrivoltaic Farm Inspection">🌾 Annual Agrivoltaic Farm Health Certification</option>
                </select>
              </div>

              <div class="form-row-2col">
                <div class="form-group">
                  <label for="srv-date">Preferred Date</label>
                  <input type="date" id="srv-date" class="form-input" value="${getTomorrowDateStr()}" min="${getTomorrowDateStr()}" required />
                </div>

                <div class="form-group">
                  <label for="srv-slot">Preferred Time Window</label>
                  <select id="srv-slot" class="form-input">
                    <option value="Morning (08:00 - 12:00)">🌅 Morning (08:00 - 12:00)</option>
                    <option value="Midday (12:00 - 16:00)">☀️ Midday (12:00 - 16:00)</option>
                    <option value="Evening (16:00 - 19:00)">🌆 Evening (16:00 - 19:00)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="srv-farm-address">Farm Location / Address</label>
                <input type="text" id="srv-farm-address" class="form-input" value="Survey #142/B, Vemgal Rural, Kolar District, Karnataka" required />
              </div>

              <div class="form-group">
                <label for="srv-notes">Field Problem Description or Notes</label>
                <textarea id="srv-notes" class="form-input" rows="3" placeholder="Describe any noises, error codes on the inverter, or specific rows that need attention..."></textarea>
              </div>

              <div class="form-row-2col">
                <div class="form-group">
                  <label for="srv-phone">Farmer Contact Number</label>
                  <input type="text" id="srv-phone" class="form-input" value="${farmer.phone}" required />
                </div>

                <div class="form-group">
                  <label for="srv-farmer-id">Farmer ID</label>
                  <input type="text" id="srv-farmer-id" class="form-input" value="${farmer.id}" readonly />
                </div>
              </div>

              <button type="button" id="btn-submit-service-req" class="btn btn-accent w-100" style="margin-top:1rem;">
                🛠️ Confirm Field Engineer Booking
              </button>
            </form>
          </div>

          <!-- Existing Scheduled Visits -->
          <div class="card">
            <div class="card-header-clean">
              <h3>📅 Scheduled Engineer Visits</h3>
              <span class="badge badge-success">${serviceReqs.length} Active</span>
            </div>

            <div class="service-requests-list" id="service-reqs-container">
              ${serviceReqs.map(r => `
                <div class="service-request-card">
                  <div class="srv-card-top">
                    <div>
                      <span class="srv-ticket-id">#${r.id}</span>
                      <strong class="srv-type-title">${r.serviceType}</strong>
                    </div>
                    <span class="badge ${r.status === 'Scheduled' ? 'badge-accent' : 'badge-success'}">${r.status}</span>
                  </div>

                  <div class="srv-meta-grid">
                    <div>📅 <strong>Date:</strong> ${r.date}</div>
                    <div>⏰ <strong>Slot:</strong> ${r.slot}</div>
                    <div>📍 <strong>Location:</strong> ${r.farmLocation}</div>
                    <div>👨‍🔧 <strong>Assigned Tech:</strong> ${r.technician || 'Pending assignment'}</div>
                  </div>

                  ${r.technicianPhone ? `
                    <div class="srv-tech-contact">
                      <span>Direct Technician Hotline:</span>
                      <a href="tel:${r.technicianPhone}" class="btn btn-xs btn-outline">📞 ${r.technicianPhone}</a>
                    </div>
                  ` : ''}

                  ${r.notes ? `
                    <p class="text-xs text-muted" style="margin-top:0.5rem;"><strong>Notes:</strong> ${r.notes}</p>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: FAQS & KNOWLEDGE BASE -->
      <div id="suptab-faq" class="support-tab-content ${activeTab === 'faq' ? 'active' : ''}">
        <div class="card">
          <div class="faq-header-bar">
            <div>
              <h3>💡 Agrivoltaics Frequently Asked Questions & Knowledge Base</h3>
              <p class="text-xs text-muted">Instant answers to technical solar, battery, crop camera, and offline operation questions.</p>
            </div>

            <div class="faq-search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="faq-search-input" class="form-input" placeholder="Search FAQ (e.g., rain, wind, battery, camera)..." />
            </div>
          </div>

          <!-- FAQ Category Filter Chips -->
          <div class="faq-chips-row">
            <button class="faq-chip active" data-filter="all">All Questions (${FAQ_ITEMS.length})</button>
            <button class="faq-chip" data-filter="tracking">⚡ Panel Tracking & Tilt</button>
            <button class="faq-chip" data-filter="battery">🔋 Battery & Power</button>
            <button class="faq-chip" data-filter="camera">📷 Crop Health Camera</button>
            <button class="faq-chip" data-filter="offline">📡 Offline Edge Mode</button>
            <button class="faq-chip" data-filter="security">🔒 Security & ID</button>
            <button class="faq-chip" data-filter="service">🚜 Service & Maintenance</button>
          </div>

          <!-- FAQ Accordion List -->
          <div class="faq-accordion-list" id="faq-accordion-container">
            ${FAQ_ITEMS.map((item, idx) => `
              <div class="faq-item" data-category="${item.category}">
                <button class="faq-question-btn" data-faqid="${idx}">
                  <span class="faq-q-text">${item.question}</span>
                  <span class="faq-chevron">▼</span>
                </button>
                <div class="faq-answer-panel" id="faq-answer-${idx}" style="display: none;">
                  <p>${item.answer}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTomorrowDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}
