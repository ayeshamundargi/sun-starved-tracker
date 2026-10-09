/**
 * Security & Farmer Authentication View Component
 * Provides:
 * - Secure Farmer Login (Phone/Farmer ID + Password + Biometric)
 * - Farmer Registration with Auto-Generated Unique ID (e.g. AGRI-84920-KA)
 * - Phone OTP Verification Modal
 * - Password Recovery via Phone OTP
 * - Biometric Verification Prompt (WebAuthn / TouchID / FaceID)
 * - Sensitive Action Re-Authentication Challenge
 * - Security Settings Dashboard & Audit Log
 */

import {
  getCurrentSession,
  DEMO_FARMER,
  getRegisteredDevices,
  getAuditLogs,
  sendPhoneOtp
} from '../services/auth.js';

export function renderSecurityDashboardView(activeTab = 'profile') {
  const session = getCurrentSession();
  const farmer = session ? {
    id: session.farmerId,
    name: session.farmerName,
    phone: session.phone,
    role: session.role
  } : DEMO_FARMER;

  const devices = getRegisteredDevices();
  const logs = getAuditLogs();

  return `
    <div class="security-view-container">
      <!-- Security Header Badge -->
      <div class="card security-hero-card">
        <div class="sec-hero-left">
          <div class="farmer-avatar-badge">
            <span class="avatar-icon">👨‍🌾</span>
            <span class="shield-badge" title="Cryptographically Protected">🔒</span>
          </div>
          <div class="farmer-meta">
            <div class="farmer-id-tag">
              <span>UNIQUE FARMER ID:</span>
              <strong class="id-code" id="farmer-id-display">${farmer.id}</strong>
              <button class="btn btn-xs btn-outline" id="btn-copy-id" title="Copy Farmer ID">📋</button>
            </div>
            <h2 class="farmer-name">${farmer.name}</h2>
            <div class="farmer-submeta">
              <span>📱 ${farmer.phone}</span>
              <span>📍 Kolar Agricultural District, Karnataka</span>
              <span class="badge badge-success">🛡️ AES-256 ENCRYPTED</span>
            </div>
          </div>
        </div>

        <div class="sec-hero-right">
          <div class="sec-score-gauge">
            <div class="sec-score-val">98%</div>
            <div class="sec-score-lbl">SECURITY RATING</div>
          </div>
          <button id="btn-sec-logout" class="btn btn-sm btn-secondary">
            🚪 Logout Session
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="security-tab-strip">
        <button class="sec-tab-btn ${activeTab === 'profile' ? 'active' : ''}" data-sectab="profile">
          👤 Farmer Profile & ID
        </button>
        <button class="sec-tab-btn ${activeTab === 'biometric' ? 'active' : ''}" data-sectab="biometric">
          👆 Biometrics & WebAuthn
        </button>
        <button class="sec-tab-btn ${activeTab === 'devices' ? 'active' : ''}" data-sectab="devices">
          📱 Active Devices (${devices.length})
        </button>
        <button class="sec-tab-btn ${activeTab === 'audit' ? 'active' : ''}" data-sectab="audit">
          📜 Security Audit Logs
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="sec-tab-content" id="sec-tab-content">
        ${renderSecTabContent(activeTab, farmer, devices, logs)}
      </div>
    </div>
  `;
}

function renderSecTabContent(tab, farmer, devices, logs) {
  if (tab === 'biometric') {
    return `
      <div class="card sec-card">
        <h3>👆 Biometric Authentication & Device Security</h3>
        <p class="text-muted" style="margin-bottom: 1.25rem;">
          Use fingerprint or facial recognition as a secondary verification step for instant, passwordless logins and sensitive control unlocks.
        </p>

        <div class="bio-toggle-box">
          <div class="bio-icon-large">🪪</div>
          <div class="bio-info">
            <strong>WebAuthn Platform Biometrics</strong>
            <p class="text-xs text-muted">Supports Windows Hello, Android Fingerprint Scanner, Apple Touch ID & Face ID.</p>
            <span class="badge badge-success">ENROLLED & ACTIVE</span>
          </div>
          <button id="btn-test-biometric" class="btn btn-sm btn-accent">
            🧪 Test Biometric Scan
          </button>
        </div>

        <div class="card" style="background:var(--bg-subtle); margin-top:1.5rem; border:1px solid var(--border-subtle);">
          <h4 style="margin-bottom:0.5rem;">🔒 Sensitive Action Interlock Policy</h4>
          <p class="text-sm">
            Biometric or OTP re-authentication is automatically enforced when:
          </p>
          <ul class="sec-policy-list text-sm">
            <li>✓ Disabling automated panel positioning mode</li>
            <li>✓ Overriding emergency storm stow angle manually</li>
            <li>✓ Exporting full unmasked agricultural financial reports</li>
            <li>✓ Adding or revoking connected device gateways</li>
          </ul>
        </div>
      </div>
    `;
  }

  if (tab === 'devices') {
    return `
      <div class="card sec-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <h3>📱 Connected Devices & Active Sessions</h3>
            <p class="text-muted text-sm">Review all devices authorized to access your solar farm controls.</p>
          </div>
          <button id="btn-logout-all-devices" class="btn btn-sm btn-danger">
            ⚠️ Logout from All Other Devices
          </button>
        </div>

        <div class="device-list">
          ${devices.map(d => `
            <div class="device-item ${d.isCurrent ? 'device-current' : ''}">
              <div class="device-icon">${d.type.includes('Mobile') ? '📱' : d.type.includes('Gateway') ? '📟' : '💻'}</div>
              <div class="device-meta">
                <div class="device-title">
                  <strong>${d.name}</strong>
                  ${d.isCurrent ? '<span class="badge badge-success">THIS DEVICE</span>' : ''}
                </div>
                <div class="device-details text-xs text-muted">
                  <span>Type: ${d.type}</span> · 
                  <span>IP: ${d.ip}</span> · 
                  <span>Active: ${d.lastActive}</span>
                </div>
              </div>
              <div>
                ${!d.isCurrent ? `<button class="btn btn-xs btn-outline btn-revoke" data-devid="${d.id}">Revoke</button>` : '<span class="text-xs text-success">✓ Active</span>'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (tab === 'audit') {
    return `
      <div class="card sec-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <h3>📜 Security & Access Audit Trail</h3>
            <p class="text-muted text-sm">Immutable client-side audit log of all security events, logins, and overrides.</p>
          </div>
          <span class="badge badge-subtle">Total Events: ${logs.length}</span>
        </div>

        <div class="audit-table-wrap">
          <table class="audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event Type</th>
                <th>Details</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(l => `
                <tr>
                  <td class="text-xs">${new Date(l.timestamp).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' })}</td>
                  <td><span class="badge ${l.type.includes('FAIL') || l.type.includes('LOCK') ? 'badge-danger' : 'badge-subtle'}">${l.type}</span></td>
                  <td class="text-sm">${l.details}</td>
                  <td class="text-xs text-muted">${l.device}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Profile tab default
  return `
    <div class="card sec-card">
      <h3>👤 Farmer Profile & Credentials</h3>
      <p class="text-muted text-sm" style="margin-bottom:1.5rem;">
        Your verified farming identity connects your physical solar array to the AI cloud optimizer.
      </p>

      <div class="profile-grid">
        <div class="profile-field">
          <label>Farmer Name</label>
          <input type="text" class="form-input" value="${farmer.name}" readonly />
        </div>
        <div class="profile-field">
          <label>Unique Farmer ID</label>
          <input type="text" class="form-input" value="${farmer.id}" readonly />
        </div>
        <div class="profile-field">
          <label>Registered Mobile (OTP Verified)</label>
          <input type="text" class="form-input" value="${farmer.phone}" readonly />
        </div>
        <div class="profile-field">
          <label>Village & District</label>
          <input type="text" class="form-input" value="Vemgal Rural, Kolar, Karnataka" readonly />
        </div>
      </div>

      <div class="credential-actions-strip" style="margin-top:2rem; display:flex; gap:0.75rem;">
        <button id="btn-open-change-password" class="btn btn-sm btn-secondary">
          🔑 Change Password
        </button>
        <button id="btn-request-phone-reverification" class="btn btn-sm btn-secondary">
          📱 Re-verify Phone Number via OTP
        </button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// AUTH MODALS (Login, Register, OTP, Biometric, Re-Auth)
// -------------------------------------------------------------

export function renderLoginModalHTML() {
  return `
    <div class="auth-modal-box">
      <div class="auth-modal-header">
        <div class="auth-icon">🌞</div>
        <h2>Farmer Sign In</h2>
        <p class="text-muted text-sm">Sun-Starved Tracker Agrivoltaic Security Portal</p>
      </div>

      <div class="auth-form-group">
        <label>Farmer ID or Mobile Number</label>
        <div class="input-with-icon">
          <span class="in-icon">👤</span>
          <input type="text" id="login-identifier" class="form-input" placeholder="e.g. AGRI-84920-KA or 9876543210" value="AGRI-84920-KA" />
        </div>
      </div>

      <div class="auth-form-group">
        <label>Password</label>
        <div class="input-with-icon">
          <span class="in-icon">🔑</span>
          <input type="password" id="login-password" class="form-input" placeholder="Enter password" value="Farmer@123" />
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-bottom:1.25rem;">
        <label style="font-size:0.85rem; display:flex; align-items:center; gap:0.35rem; cursor:pointer;">
          <input type="checkbox" checked id="remember-me" /> Remember on this device
        </label>
        <a href="#" id="link-forgot-password" class="text-xs" style="color:var(--color-agri-fresh); font-weight:600;">Forgot Password?</a>
      </div>

      <div class="auth-btn-stack">
        <button id="btn-submit-login" class="btn btn-primary" style="width:100%;">
          🔐 Sign In
        </button>
        <button id="btn-one-tap-biometric" class="btn btn-secondary" style="width:100%;">
          👆 One-Tap Biometric / Face ID
        </button>
      </div>

      <div class="auth-switch-footer">
        <span>New farmer?</span>
        <a href="#" id="link-go-register" style="color:var(--color-agri-fresh); font-weight:600;">Create Farmer Account</a>
      </div>
    </div>
  `;
}

export function renderRegisterModalHTML() {
  const suggestedId = 'AGRI-' + Math.floor(10000 + Math.random() * 90000) + '-KA';
  return `
    <div class="auth-modal-box">
      <div class="auth-modal-header">
        <div class="auth-icon">🌱</div>
        <h2>Register New Farmer</h2>
        <p class="text-muted text-sm">Create account to link solar inverters & crop sensors</p>
      </div>

      <div class="auth-form-group">
        <label>Assigned Unique Farmer ID (System Generated)</label>
        <input type="text" id="reg-farmer-id" class="form-input" value="${suggestedId}" readonly style="background:var(--bg-subtle); font-weight:bold; color:var(--color-agri-dark);" />
      </div>

      <div class="auth-form-group">
        <label>Full Name</label>
        <input type="text" id="reg-name" class="form-input" placeholder="e.g. Ramesh Kumar" />
      </div>

      <div class="auth-form-group">
        <label>Mobile Number (For SMS OTP Verification)</label>
        <input type="tel" id="reg-phone" class="form-input" placeholder="+91 98765 43210" />
      </div>

      <div class="auth-form-group">
        <label>Create Strong Password</label>
        <input type="password" id="reg-password" class="form-input" placeholder="Minimum 8 characters" />
      </div>

      <div class="auth-btn-stack" style="margin-top:1.5rem;">
        <button id="btn-submit-register" class="btn btn-primary" style="width:100%;">
          📲 Continue to Phone OTP Verification ➔
        </button>
      </div>

      <div class="auth-switch-footer">
        <span>Already registered?</span>
        <a href="#" id="link-go-login" style="color:var(--color-agri-fresh); font-weight:600;">Sign In</a>
      </div>
    </div>
  `;
}

export function renderOtpModalHTML(phone, demoOtp = '482910') {
  return `
    <div class="auth-modal-box text-center">
      <div class="auth-icon">📲</div>
      <h2>Phone Verification</h2>
      <p class="text-muted text-sm">
        We sent a 6-digit SMS verification code to <strong>${phone}</strong>
      </p>

      <div class="demo-otp-banner" style="background:#FEF3C7; border:1px solid #F59E0B; padding:0.6rem; border-radius:8px; margin:1rem 0; font-size:0.85rem; color:#92400E;">
        ⚡ <strong>PROTOTYPE DEMO SIMULATOR:</strong><br/>
        Simulated SMS code is: <strong style="font-size:1.1rem; letter-spacing:2px;">${demoOtp}</strong>
      </div>

      <div class="otp-input-group" style="margin:1.5rem 0;">
        <input type="text" id="otp-input-code" class="form-input" maxlength="6" placeholder="• • • • • •" style="letter-spacing:10px; font-size:1.5rem; text-align:center; font-weight:bold;" autofocus />
      </div>

      <button id="btn-submit-verify-otp" class="btn btn-primary" style="width:100%;">
        ✓ Verify & Continue
      </button>

      <div style="margin-top:1rem; font-size:0.85rem; color:var(--text-muted);">
        Didn't receive code? <a href="#" id="btn-resend-otp" style="color:var(--color-agri-fresh);">Resend OTP</a>
      </div>
    </div>
  `;
}

export function renderBiometricScannerModalHTML() {
  return `
    <div class="auth-modal-box text-center">
      <div class="biometric-pulse-container">
        <div class="fingerprint-scan-svg">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <path d="M 50,15 A 35,35 0 0,0 15,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,25 A 25,25 0 0,0 25,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,35 A 15,15 0 0,0 35,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,15 A 35,35 0 0,1 85,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,25 A 25,25 0 0,1 75,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50,35 A 15,15 0 0,1 65,50" fill="none" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
            <line x1="50" y1="45" x2="50" y2="75" stroke="#2F7D4F" stroke-width="4" stroke-linecap="round"/>
          </svg>
          <div class="laser-scanner-line"></div>
        </div>
      </div>

      <h3 style="margin-top:1rem;">Scanning Device Biometrics...</h3>
      <p class="text-sm text-muted">Touch your fingerprint sensor or look at the camera for Face ID</p>

      <div style="margin-top:1.5rem; display:flex; gap:0.5rem; justify-content:center;">
        <button id="btn-cancel-biometric" class="btn btn-sm btn-secondary">
          Cancel / Use Password
        </button>
      </div>
    </div>
  `;
}

export function renderReauthChallengeModalHTML(title, reason) {
  return `
    <div class="auth-modal-box">
      <div class="auth-modal-header text-center">
        <div class="auth-icon" style="background:#FEE2E2; color:#DC2626;">🔒</div>
        <h2>Re-Authentication Required</h2>
        <p class="text-sm text-muted"><strong>${title}</strong></p>
      </div>

      <div class="alert alert-warning" style="background:#FFFBEB; border:1px solid #F59E0B; padding:0.75rem; border-radius:8px; margin-bottom:1.25rem; font-size:0.85rem; color:#92400E;">
        ⚠️ <strong>Security Policy:</strong> ${reason}
      </div>

      <div class="auth-form-group">
        <label>Enter Master Password</label>
        <input type="password" id="reauth-password" class="form-input" placeholder="Password (default: Farmer@123)" />
      </div>

      <div class="auth-btn-stack" style="margin-top:1.25rem;">
        <button id="btn-confirm-reauth" class="btn btn-primary" style="width:100%;">
          Authorize Action
        </button>
        <button id="btn-biometric-reauth" class="btn btn-secondary" style="width:100%;">
          👆 Authorize via Biometrics
        </button>
        <button id="btn-cancel-reauth" class="btn btn-outline" style="width:100%;">
          Cancel
        </button>
      </div>
    </div>
  `;
}
