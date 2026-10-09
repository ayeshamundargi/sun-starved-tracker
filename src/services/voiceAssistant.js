/**
 * Kisan Vani AI — Multilingual Farm Voice Assistant & Voice Alerts Engine
 * Complete implementation for Sun-Starved Tracker Agrivoltaics System
 * Supports: English, Hindi, Kannada, Tamil, Telugu, Marathi
 */

import { getLanguage, t } from '../data/i18n.js';
import { getIotState, triggerAudioChime } from './iotEngine.js';
import { DEMO_FARM } from '../data/demoData.js';

// Voice Assistant Internal State
const voiceState = {
  isOpen: false,
  isListening: false,
  isSpeaking: false,
  isMuted: false,
  speechRate: 1.0, // 1.0 = normal, 0.85 = slow
  voiceAlertsEnabled: true,
  chatHistory: [],
  voices: [],
  activeUtterance: null,
  recognition: null,
  currentView: 'home'
};

// Language Locales Mapping for Web Speech API
const LANG_LOCALES = {
  en: ['en-IN', 'en-US', 'en-GB'],
  hi: ['hi-IN', 'hi'],
  kn: ['kn-IN', 'kn'],
  ta: ['ta-IN', 'ta'],
  te: ['te-IN', 'te'],
  mr: ['mr-IN', 'mr']
};

/**
 * Web Audio API Synthesizer for high-quality audio feedback chimes
 */
function playAudioTone(type = 'chime') {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'listen') {
      // High crisp activation ping (A5 -> E6)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'alert') {
      // Two-tone warning siren (440Hz -> 330Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.setValueAtTime(360, now + 0.18);
      osc.frequency.setValueAtTime(480, now + 0.36);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (type === 'success') {
      // Triple ascending harmony
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.1, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.2);
      });
    } else {
      // Gentle two-tone harp chime (C5 -> G5)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.14);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  } catch (e) {
    // Ignore audio context errors on restricted autoplay
  }
}

/**
 * Initialize Speech Synthesis voices
 */
function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  voiceState.voices = window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      voiceState.voices = window.speechSynthesis.getVoices();
    };
  }
}

/**
 * Find best voice matching the current language
 */
function getMatchingVoice(langCode) {
  const targetLocales = LANG_LOCALES[langCode] || ['en-IN', 'en'];
  if (!voiceState.voices || voiceState.voices.length === 0) {
    voiceState.voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  }

  // 1. Exact match with locale
  for (const loc of targetLocales) {
    const exact = voiceState.voices.find(v => v.lang.toLowerCase().replace('_', '-') === loc.toLowerCase());
    if (exact) return exact;
  }

  // 2. Starts with language code
  for (const loc of targetLocales) {
    const langPrefix = loc.split('-')[0].toLowerCase();
    const prefixMatch = voiceState.voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
    if (prefixMatch) return prefixMatch;
  }

  // 3. Indian English fallback if Indian language voice not installed on OS
  const indianEn = voiceState.voices.find(v => v.lang.toLowerCase().includes('en-in') || v.name.toLowerCase().includes('india'));
  if (indianEn) return indianEn;

  // 4. Any default voice
  return voiceState.voices.find(v => v.default) || voiceState.voices[0] || null;
}

/**
 * Stop any current speech
 */
export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  voiceState.isSpeaking = false;
  voiceState.activeUtterance = null;
  updateWaveAnimation(false);
}

/**
 * Speak text in the current language via Web Speech API
 */
export function speakText(text, onStart, onEnd) {
  if (voiceState.isMuted) {
    if (onStart) onStart();
    if (onEnd) onEnd();
    return;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    if (onEnd) onEnd();
    return;
  }

  stopSpeaking();

  const langCode = getLanguage() || 'en';
  const cleanText = text.replace(/[*_#`[\]]/g, '').replace(/\s+/g, ' ').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = (LANG_LOCALES[langCode] && LANG_LOCALES[langCode][0]) || 'en-IN';
  utterance.rate = voiceState.speechRate;
  utterance.pitch = 1.0;

  const matchedVoice = getMatchingVoice(langCode);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    voiceState.isSpeaking = true;
    updateWaveAnimation(true);
    if (onStart) onStart();
  };

  utterance.onend = () => {
    voiceState.isSpeaking = false;
    updateWaveAnimation(false);
    if (onEnd) onEnd();
  };

  utterance.onerror = (err) => {
    console.warn('Voice Assistant TTS warning:', err);
    voiceState.isSpeaking = false;
    updateWaveAnimation(false);
    if (onEnd) onEnd();
  };

  voiceState.activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Update UI audio wave animations
 */
function updateWaveAnimation(active) {
  const waves = document.querySelectorAll('.voice-wave-bar, .pulse-on-speak');
  waves.forEach(el => {
    if (active) {
      el.classList.add('speaking');
    } else {
      el.classList.remove('speaking');
    }
  });

  const headerBtn = document.getElementById('btn-header-voice');
  if (headerBtn) {
    if (active) headerBtn.classList.add('speaking-active');
    else headerBtn.classList.remove('speaking-active');
  }

  const statusLabel = document.getElementById('voice-status-text');
  if (statusLabel) {
    if (voiceState.isSpeaking) {
      statusLabel.textContent = t('voiceStatusSpeaking') || 'Speaking...';
    } else if (voiceState.isListening) {
      statusLabel.textContent = t('voiceStatusListening') || 'Listening... Please speak now';
    } else {
      statusLabel.textContent = t('voiceStatusIdle') || 'Tap microphone or ask a question below';
    }
  }
}

/**
 * Initialize Speech Recognition
 */
function initSpeechRecognition() {
  if (typeof window === 'undefined') return;
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    console.info('Web Speech Recognition API not natively supported in this browser; text input available.');
    return;
  }

  try {
    const rec = new SpeechRec();
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      voiceState.isListening = true;
      playAudioTone('listen');
      const micBtn = document.getElementById('btn-voice-mic');
      if (micBtn) micBtn.classList.add('listening');
      const statusLabel = document.getElementById('voice-status-text');
      if (statusLabel) statusLabel.textContent = t('voiceStatusListening') || 'Listening... Please speak now';
    };

    rec.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      const inputEl = document.getElementById('voice-text-input');
      if (inputEl) inputEl.value = transcript;

      if (event.results[0].isFinal) {
        handleUserInput(transcript);
      }
    };

    rec.onerror = (event) => {
      console.warn('Speech Recognition notice:', event.error);
      voiceState.isListening = false;
      const micBtn = document.getElementById('btn-voice-mic');
      if (micBtn) micBtn.classList.remove('listening');
      updateWaveAnimation(false);
    };

    rec.onend = () => {
      voiceState.isListening = false;
      const micBtn = document.getElementById('btn-voice-mic');
      if (micBtn) micBtn.classList.remove('listening');
      updateWaveAnimation(false);
    };

    voiceState.recognition = rec;
  } catch (e) {
    console.warn('Speech Recognition setup error:', e);
  }
}

/**
 * Start listening via microphone
 */
export function startListening() {
  if (voiceState.isSpeaking) {
    stopSpeaking();
  }

  if (!voiceState.recognition) {
    initSpeechRecognition();
  }

  if (voiceState.recognition) {
    const langCode = getLanguage() || 'en';
    voiceState.recognition.lang = (LANG_LOCALES[langCode] && LANG_LOCALES[langCode][0]) || 'en-IN';
    try {
      voiceState.recognition.start();
    } catch (e) {
      try {
        voiceState.recognition.stop();
        setTimeout(() => voiceState.recognition.start(), 200);
      } catch (err) {}
    }
  } else {
    // Fallback prompt to type query
    const inputEl = document.getElementById('voice-text-input');
    if (inputEl) {
      inputEl.focus();
      inputEl.placeholder = 'Please type your question here...';
    }
  }
}

/**
 * Stop listening
 */
export function stopListening() {
  if (voiceState.recognition && voiceState.isListening) {
    try {
      voiceState.recognition.stop();
    } catch (e) {}
  }
  voiceState.isListening = false;
}

/**
 * Multilingual Farm Intelligence & Intent Knowledge Engine
 * Processes query and generates both visual response and spoken voice response
 */
export function processFarmerQuery(queryText) {
  const lang = getLanguage() || 'en';
  const q = (queryText || '').toLowerCase().trim();
  const iot = getIotState();
  const farm = DEMO_FARM || {};

  // Metrics snapshot
  const solarWatts = iot.solarPowerOutputWatts || 2840;
  const solarKwh = (iot.solarEnergyTodayKwh || 18.6).toFixed(1);
  const batterySoC = iot.battery ? iot.battery.chargePercent : 88;
  const batteryBackup = iot.battery ? (iot.battery.estimatedBackupHours || 9.4).toFixed(1) : '9.4';
  const soilMoist = (iot.soilMoisture || 46.2).toFixed(1);
  const cropComfort = iot.cropComfortScore || 92;
  const panelAngle = (iot.panelAngleDeg || 35.0).toFixed(0);
  const windKmh = (iot.windSpeedKmh || 14.2).toFixed(1);
  const rainMm = (iot.rainfallMm || 0.0).toFixed(1);
  const savingsRs = (iot.dailyCostSaved || 112.5).toFixed(0);

  // Intent classification regexes across 6 languages
  const isCrop = /(crop|plant|health|leaf|par|photosynthesis|tomato|grow|shade|फसल|पौध|पत्ते|स्वास्थ्य|धूप|छांव|बೆಳೆ|ಗಿಡ|ಆರೋಗ್ಯ|ಎಲೆ|ಪಯಿರ್|செடி|ஆரோக்கியம்|இலை|పంట|మొక్క|ఆరోగ్యం|ఆకు|पीक|झाड|आरोग्य|पान)/i.test(q);
  const isSolar = /(solar|power|energy|generation|watt|kwh|panel|output|electric|सौर|बिजली|ऊर्जा|उत्पादन|वाट|पैनल|ಸೌರ|ವಿದ್ಯುತ್|ಶಕ್ತಿ|ಉತ್ಪಾದನೆ|வ್ಯಾಟ್|சூரிய|மின்சாரம்|மின்|உற்பத்தி|వాట్|సౌర|విద్యుత్|శక్తి|ఉత్పత్తి|वीज|निर्मिती)/i.test(q);
  const isBattery = /(battery|charge|backup|soc|volt|storage|percentage|बैटरी|चार्ज|बैकअप|वोल्ट|स्टोरेज|ब್ಯಾಟರಿ|ಚಾರ್ಜ್|ಬ್ಯಾಕಪ್|பேட்டரி|சார்ஜ்|பேக்கப்|బ్యాటరీ|ఛార్జ్|బ్యాకప్|बॅटरी|बॅकअप)/i.test(q);
  const isIrrigation = /(irrigate|irrigation|water|moisture|soil|pump|drip|wet|सिंचाई|पानी|नमी|मिट्टी|पंप|ड्रिप|ನೀರಾವರಿ|ನೀರು|ತೇವಾಂಶ|ಮಣ್ಣು|ಪಂಪ್|பாசனம்|தண்ணீர்|ஈரப்பதம்|மண்|பம்ப்|సాగునీరు|నీరు|తేమ|నేల|పంపు|सिंचन|पाणी|ओलावा|माती)/i.test(q);
  const isAngle = /(angle|tilt|position|why|stow|motor|kinematics|actuator|कोण|झुकाव|पोजीशन|क्यों|मोटर|ಕೋನ|ತಿರುವು|ಸ್ಥಾನ|ಏಕೆ|கோணம்|சாய்வு|நிலை|ஏன்|కోణం|వంపు|స్థానం|ఎందుకు|कोन|स्थिती|का)/i.test(q);
  const isAlert = /(alert|warning|emergency|alarm|incident|danger|problem|अलर्ट|चेतावनी|खतरा|समस्या|अलार्म|ಎಚ್ಚರಿಕೆ|ಅಪಾಯ|ಸಮಸ್ಯೆ|எச்சரிக்கை|ஆபத்து|பிரச்சனை|హెచ్చరిక|ప్రమాదం|సమస్య|सूचना|धोका)/i.test(q);
  const isWeather = /(weather|rain|wind|storm|forecast|cloud|temp|मौसम|बारिश|हवा|तूफान|बादल|तापमान|ಹವಾಮಾನ|ಮಳೆ|ಗಾಳಿ|ಬಿರುಗಾಳಿ|வானிலை|மழை|காற்று|புயல்|వాతావరణం|వర్షం|గాలి|తుఫాను|हवामान|पाऊस|वारा|वादळ)/i.test(q);
  const isSummary = /(summary|overview|screen|report|read|status|everything|all|सारांश|रिपोर्ट|स्क्रीन|हालत|पढ़ो|सब|ಸಾರಾಂಶ|ವರದಿ|ಪರದೆ|ಸ್ಥಿತಿ|ಓದಿ|சுருக்கம்|அறிக்கை|திரை|நிலை|படி|సారాంశం|నివేదిక|స్క్రీన్|అంతా|अहवाल|सर्व)/i.test(q);

  let responseText = '';
  let spokenText = '';

  // 1. CROP HEALTH
  if (isCrop) {
    if (lang === 'hi') {
      responseText = `🌿 **फसल स्वास्थ्य: उत्कृष्ट (${cropComfort}% स्कोर)**\n• वर्तमान PAR प्रकाश: पर्याप्त अवशोषण (82% छांव अनुपात)\n• मिट्टी में नमी: ${soilMoist}%\n• पत्ती तापमान: 25.8°C (आदर्श)\n👉 सलाह: टमाटर की फसल पूरी तरह स्वस्थ है। पैनल सही प्रकाश दे रहे हैं।`;
      spokenText = `फसल स्वास्थ्य उत्कृष्ट है, कुल स्कोर ${cropComfort} प्रतिशत है। मिट्टी में नमी ${soilMoist} प्रतिशत है और पैनल फसलों को पर्याप्त धूप दे रहे हैं।`;
    } else if (lang === 'kn') {
      responseText = `🌿 **ಬೆಳೆಗಳ ಆರೋಗ್ಯ: ಅತ್ಯುತ್ತಮ (${cropComfort}% ಸ್ಕೋರ್)**\n• ಪ್ರಸ್ತುತ PAR ಬೆಳಕು: ಸೂಕ್ತ ಹೀರಿಕೊಳ್ಳುವಿಕೆ (82% ನೆರಳು ಅನುಪಾತ)\n• ಮಣ್ಣಿನ ತೇವಾಂಶ: ${soilMoist}%\n• ಎಲೆಯ ಉಷ್ಣತೆ: 25.8°C\n👉 ಸಲಹೆ: ಟೊಮೆಟೊ ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಯಾವುದೇ ಕೊರತೆಯಿಲ್ಲ.`;
      spokenText = `ಬೆಳೆಗಳ ಆರೋಗ್ಯ ಅತ್ಯುತ್ತಮವಾಗಿದೆ, ಸ್ಕೋರ್ ${cropComfort} ಪ್ರತಿಶತ. ಮಣ್ಣಿನ ತೇವಾಂಶ ${soilMoist} ಪ್ರತಿಶತವಿದ್ದು, ಸೌರ ಫಲಕಗಳು ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಬಿಸಿಲು ಒದಗಿಸುತ್ತಿವೆ.`;
    } else if (lang === 'ta') {
      responseText = `🌿 **பயிர் ஆரோக்கியம்: மிகச்சிறந்தது (${cropComfort}% மதிப்பெண்)**\n• PAR ஒளி உறிஞ்சுதல்: 82% உகந்தது\n• மண் ஈரப்பதம்: ${soilMoist}%\n• இலை வெப்பநிலை: 25.8°C\n👉 ஆலோசனை: தக்காளி பயிர்கள் செழிப்பாக வளர்கின்றன.`;
      spokenText = `பயிர் ஆரோக்கியம் மிகச்சிறப்பாக உள்ளது. மண் ஈரப்பதம் ${soilMoist} சதவீதம். பேனல்கள் பயிர்களுக்கு தேவையான சூரிய ஒளியை வழங்குகின்றன.`;
    } else if (lang === 'te') {
      responseText = `🌿 **పంట ఆరోగ్యం: చాలా బాగుంది (${cropComfort}% స్కోరు)**\n• PAR కాంతి లభ్యత: 82% అనుకూలమైనది\n• నేలలో తేమ: ${soilMoist}%\n• ఆకుల ఉష్ణోగ్రత: 25.8°C\n👉 సలహా: టమాట పంట ఆరోగ్యంగా ఉంది.`;
      spokenText = `పంట ఆరోగ్యం చాలా బాగుంది, స్కోరు ${cropComfort} శాతం. నేలలో తేమ ${soilMoist} శాతం ఉంది మరియు పంటలకు సరైన ఎండ లభిస్తోంది.`;
    } else if (lang === 'mr') {
      responseText = `🌿 **पिकांचे आरोग्य: उत्तम (${cropComfort}% स्कोअर)**\n• प्रकाश शोषण (PAR): 82% अनुकूल\n• मातीतील ओलावा: ${soilMoist}%\n• पानांचे तापमान: 25.8°C\n👉 सल्ला: टोमॅटो पिके निरोगी असून प्रकाश संश्लेषण व्यवस्थित सुरू आहे.`;
      spokenText = `पिकांचे आरोग्य उत्तम असून स्कोअर ${cropComfort} टक्के आहे. मातीतील ओलावा ${soilMoist} टक्के आहे आणि पिकांना पुरेशी धूप मिळत आहे.`;
    } else {
      responseText = `🌿 **Crop Health: Optimal (${cropComfort}% Comfort Score)**\n• Canopy PAR Sunlight: 82% saturation (No sun-starvation)\n• Soil Moisture: ${soilMoist}%\n• Leaf Canopy Temp: 25.8°C\n👉 Recommendation: Tomatoes are flourishing under modulated canopy shade.`;
      spokenText = `Crop health is optimal with a ${cropComfort} percent comfort score. Soil moisture is ${soilMoist} percent, and panels are filtering ideal sunlight without starving root beds.`;
    }
  }
  // 2. SOLAR GENERATION
  else if (isSolar) {
    if (lang === 'hi') {
      responseText = `☀️ **सौर उत्पादन रिपोर्ट**\n• वर्तमान उत्पादन: ${(solarWatts / 1000).toFixed(2)} kW (${solarWatts} W)\n• आज की कुल ऊर्जा: ${solarKwh} kWh\n• इन्वर्टर दक्षता: 97.4%\n• आज की बचत: ₹${savingsRs}`;
      spokenText = `वर्तमान सौर ऊर्जा उत्पादन ${(solarWatts / 1000).toFixed(2)} किलोवॉट है। आज कुल ${solarKwh} यूनिट बिजली बनी है, जिससे लगभग ₹${savingsRs} की बचत हुई है।`;
    } else if (lang === 'kn') {
      responseText = `☀️ **ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ**\n• ಪ್ರಸ್ತುತ ಶಕ್ತಿ: ${(solarWatts / 1000).toFixed(2)} kW (${solarWatts} W)\n• ಇಂದಿನ ಒಟ್ಟು ವಿದ್ಯುತ್: ${solarKwh} kWh\n• ಇನ್ವರ್ಟರ್ ದಕ್ಷತೆ: 97.4%\n• ಇಂದಿನ ಉಳಿತಾಯ: ₹${savingsRs}`;
      spokenText = `ಪ್ರಸ್ತುತ ಸೌರ ಶಕ್ತಿ ಉತ್ಪಾದನೆ ${(solarWatts / 1000).toFixed(2)} ಕಿಲೋವ್ಯಾಟ್ ಆಗಿದೆ. ಇಂದು ಒಟ್ಟು ${solarKwh} ಯೂನಿಟ್ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆಯಾಗಿದ್ದು, ₹${savingsRs} ಉಳಿತಾಯವಾಗಿದೆ.`;
    } else if (lang === 'ta') {
      responseText = `☀️ **சூரிய மின் உற்பத்தி விவரம்**\n• தற்போதைய மின்சாரம்: ${(solarWatts / 1000).toFixed(2)} kW\n• இன்றைய மொத்த உற்பத்தி: ${solarKwh} kWh\n• சேமிப்பு மதிப்பு: ₹${savingsRs}`;
      spokenText = `தற்போதைய சூரிய மின் உற்பத்தி ${(solarWatts / 1000).toFixed(2)} கிலோவாட் ஆகும். இன்று மொத்தம் ${solarKwh} யூனிட் உற்பத்தியாகி ₹${savingsRs} சேமிக்கப்பட்டுள்ளது.`;
    } else if (lang === 'te') {
      responseText = `☀️ **సౌర విద్యుత్ నివేదిక**\n• ప్రస్తుత ఉత్పత్తి: ${(solarWatts / 1000).toFixed(2)} kW\n• నేటి మొత్తం విద్యుత్: ${solarKwh} kWh\n• నేటి ఆదా: ₹${savingsRs}`;
      spokenText = `ప్రస్తుత సౌర విద్యుత్ ఉత్పత్తి ${(solarWatts / 1000).toFixed(2)} కిలోవాట్లు. ఈరోజు మొత్తం ${solarKwh} యూనిట్ల విద్యుత్ ఉత్పత్తి అయింది మరియు ₹${savingsRs} ఆదా అయింది.`;
    } else if (lang === 'mr') {
      responseText = `☀️ **सौर ऊर्जा निर्मिती अहवाल**\n• सध्याची वीज निर्मिती: ${(solarWatts / 1000).toFixed(2)} kW\n• आजची एकूण ऊर्जा: ${solarKwh} kWh\n• आजची बचत: ₹${savingsRs}`;
      spokenText = `सध्या सौर ऊर्जा निर्मिती ${(solarWatts / 1000).toFixed(2)} किलोवॅट आहे. आज एकूण ${solarKwh} युनिट्स वीज तयार झाली असून ₹${savingsRs} ची बचत झाली आहे.`;
    } else {
      responseText = `☀️ **Solar Generation Status**\n• Current Power: ${(solarWatts / 1000).toFixed(2)} kW (${solarWatts} W)\n• Total Energy Today: ${solarKwh} kWh\n• Inverter Efficiency: 97.4%\n• Daily Savings: ₹${savingsRs}`;
      spokenText = `Current solar power generation is ${(solarWatts / 1000).toFixed(2)} kilowatts. Total energy harvested today is ${solarKwh} kilowatt-hours, saving approximately ₹${savingsRs}.`;
    }
  }
  // 3. BATTERY STATUS
  else if (isBattery) {
    if (lang === 'hi') {
      responseText = `🔋 **बैटरी और स्टोरेज स्थिति**\n• चार्ज स्तर (SoC): ${batterySoC}%\n• अनुमानित बैकअप: ${batteryBackup} घंटे\n• बैटरी स्वास्थ्य: 96% (LiFePO4 सेल)\n• वोल्टेज: 52.8 V (सुरक्षित और स्थिर)`;
      spokenText = `आपकी LiFePO4 बैटरी ${batterySoC} प्रतिशत चार्ज है, जो लगभग ${batteryBackup} घंटे का बैकअप दे सकती है। बैटरी स्वास्थ्य 96 प्रतिशत है।`;
    } else if (lang === 'kn') {
      responseText = `🔋 **ಬ್ಯಾಟರಿ ಸ್ಥಿತಿ ಮತ್ತು ಬ್ಯಾಕಪ್**\n• ಚಾರ್ಜ್ ಮಟ್ಟ: ${batterySoC}%\n• ಅಂದಾಜು ಬ್ಯಾಕಪ್: ${batteryBackup} ಗಂಟೆಗಳು\n• ಬ್ಯಾಟರಿ ಆರೋಗ್ಯ: 96% (LiFePO4)\n• ವೋಲ್ಟೇಜ್: 52.8 V`;
      spokenText = `ಬ್ಯಾಟರಿ ಚಾರ್ಜ್ ${batterySoC} ಪ್ರತಿಶತ ಇದೆ. ಇದು ಸುಮಾರು ${batteryBackup} ಗಂಟೆಗಳ ಕಾಲ ತಡೆರಹಿತ ವಿದ್ಯುತ್ ಬ್ಯಾಕಪ್ ನೀಡಬಲ್ಲದು.`;
    } else if (lang === 'ta') {
      responseText = `🔋 **பேட்டரி நிலை**\n• சார்ஜ் அளவு: ${batterySoC}%\n• பேக்கப் நேரம்: ${batteryBackup} மணிநேரம்\n• பேட்டரி ஆரோக்கியம்: 96% (LiFePO4)\n• மின்னழுத்தம்: 52.8 V`;
      spokenText = `பேட்டரி ${batterySoC} சதவீதம் சார்ஜ் ஆகியுள்ளது. சுமார் ${batteryBackup} மணிநேர மின்சார பேக்கப் வழங்க முடியும்.`;
    } else if (lang === 'te') {
      responseText = `🔋 **బ్యాటరీ మరియు బ్యాకప్ స్థితి**\n• ఛార్జ్ స్థాయి: ${batterySoC}%\n• బ్యాకప్ సమయం: ${batteryBackup} గంటలు\n• బ్యాటరీ ఆరోగ్యం: 96% (LiFePO4)\n• వోల్టేజ్: 52.8 V`;
      spokenText = `బ్యాటరీ ${batterySoC} శాతం ఛార్జ్ చేయబడింది. ఇది సుమారు ${batteryBackup} గంటల పాటు నిరంతర విద్యుత్ బ్యాకప్ అందిస్తుంది.`;
    } else if (lang === 'mr') {
      responseText = `🔋 **बॅटरी आणि बॅकअप स्थिती**\n• चार्ज पातळी: ${batterySoC}%\n• अंदाजे बॅकअप: ${batteryBackup} तास\n• बॅटरीचे आरोग्य: 96% (LiFePO4)\n• व्होल्टेज: 52.8 V`;
      spokenText = `बॅटरी ${batterySoC} टक्के चार्ज आहे आणि सुमारे ${batteryBackup} तास अखंड बॅकअप देऊ शकते. बॅटरीचे आरोग्य 96 टक्के आहे.`;
    } else {
      responseText = `🔋 **Battery & Storage Status**\n• Charge Level (SoC): ${batterySoC}%\n• Estimated Backup: ${batteryBackup} hours\n• Cell Health: 96% (LiFePO4 Industrial Grade)\n• Voltage: 52.8 V (Nominal)`;
      spokenText = `Battery storage is at ${batterySoC} percent, providing an estimated ${batteryBackup} hours of continuous farm backup. Battery health is excellent at 96 percent.`;
    }
  }
  // 4. IRRIGATION ADVICE
  else if (isIrrigation) {
    const needWater = parseFloat(soilMoist) < 38.0;
    if (lang === 'hi') {
      responseText = needWater
        ? `💧 **सिंचाई सलाह: सिंचाई आवश्यक है!**\n• मिट्टी की नमी: ${soilMoist}% (न्यूनतम सीमा 38%)\n👉 सलाह: ड्रिप पंप तुरंत 30 मिनट के लिए चालू करें।`
        : `💧 **सिंचाई सलाह: अभी आवश्यकता नहीं है**\n• मिट्टी की नमी: ${soilMoist}% (आदर्श सीमा: 40-60%)\n• बारिश की संभावना: 15%\n👉 सलाह: मिट्टी में पर्याप्त नमी है। अगली सिंचाई शाम 5:30 बजे निर्धारित है।`;
      spokenText = needWater
        ? `मिट्टी की नमी ${soilMoist} प्रतिशत हो गई है, कृपया 30 मिनट के लिए ड्रिप सिंचाई शुरू करें।`
        : `मिट्टी में नमी ${soilMoist} प्रतिशत है, जो बिल्कुल पर्याप्त है। अभी सिंचाई करने की आवश्यकता नहीं है।`;
    } else if (lang === 'kn') {
      responseText = needWater
        ? `💧 **ನೀರಾವರಿ ಸಲಹೆ: ನೀರುಣಿಸುವುದು ಅಗತ್ಯವಿದೆ!**\n• ಮಣ್ಣಿನ ತೇವಾಂಶ: ${soilMoist}%\n👉 ಸಲಹೆ: ಹನಿ ನೀರಾವರಿ ಪಂಪ್ ಅನ್ನು 30 ನಿಮಿಷಗಳ ಕಾಲ ಆನ್ ಮಾಡಿ.`
        : `💧 **ನೀರಾವರಿ ಸಲಹೆ: ಈಗ ನೀರಿನ ಅಗತ್ಯವಿಲ್ಲ**\n• ಮಣ್ಣಿನ ತೇವಾಂಶ: ${soilMoist}% (ಉತ್ತಮ ಸ್ಥಿತಿ)\n👉 ಸಲಹೆ: ಮಣ್ಣಿನಲ್ಲಿ ಸೂಕ್ತ ತೇವಾಂಶವಿದೆ. ಸಂಜೆ 5:30 ಕ್ಕೆ ಮುಂದಿನ ಹನಿ ನೀರಾವರಿ ನಿಗದಿಯಾಗಿದೆ.`;
      spokenText = needWater
        ? `ಮಣ್ಣಿನ ತೇವಾಂಶ ಕಡಿಮೆಯಾಗಿದೆ, ದಯವಿಟ್ಟು 30 ನಿಮಿಷಗಳ ಕಾಲ ನೀರಾವರಿ ಪಂಪ್ ಆನ್ ಮಾಡಿ.`
        : `ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ ${soilMoist} ಪ್ರತಿಶತವಿದ್ದು, ಆರೋಗ್ಯಕರವಾಗಿದೆ. ಸದ್ಯಕ್ಕೆ ನೀರುಣಿಸುವ ಅಗತ್ಯವಿಲ್ಲ.`;
    } else if (lang === 'ta') {
      responseText = needWater
        ? `💧 **பாசன ஆலோசனை: உடனடியாக நீர் பாய்ச்சவும்!**\n• மண் ஈரப்பதம்: ${soilMoist}%`
        : `💧 **பாசன ஆலோசனை: இப்போது பாசனம் தேவையில்லை**\n• மண் ஈரப்பதம்: ${soilMoist}% (போதுமானது)\n👉 அடுத்த பாசனம் மாலை 5:30 மணிக்கு திட்டமிடப்பட்டுள்ளது.`;
      spokenText = needWater
        ? `மண் ஈரப்பதம் குறைவாக உள்ளது, சொட்டு நீர் பாசனத்தை தொடங்கவும்.`
        : `மண்ணில் ${soilMoist} சதவீதம் போதுமான ஈரப்பதம் உள்ளது. இப்போது பாசனம் செய்ய தேவையில்லை.`;
    } else if (lang === 'te') {
      responseText = needWater
        ? `💧 **సాగునీటి సలహా: నీరు అందించడం అవసరం!**\n• నేలలో తేమ: ${soilMoist}%`
        : `💧 **సాగునీటి సలహా: ఇప్పుడు నీరు అవసరం లేదు**\n• నేలలో తేమ: ${soilMoist}% (సరిపడా ఉంది)\n👉 తదుపరి బిందు సేద్యం సాయంత్రం 5:30 గంటలకు షెడ్యూల్ చేయబడింది.`;
      spokenText = needWater
        ? `నేలలో తేమ తగ్గింది, దయచేసి బిందు సేద్యం ప్రారంభించండి.`
        : `నేలలో తేమ ${soilMoist} శాతం ఉంది, ఇది సరిపోతుంది. ఇప్పుడు సాగునీరు అవసరం లేదు.`;
    } else if (lang === 'mr') {
      responseText = needWater
        ? `💧 **सिंचन सल्ला: पाणी देणे आवश्यक आहे!**\n• मातीतील ओलावा: ${soilMoist}%`
        : `💧 **सिंचन सल्ला: आता सिंचनाची गरज नाही**\n• मातीतील ओलावा: ${soilMoist}% (समाधानकारक)\n👉 पुढील ठिबक सिंचन सायंकाळी 5:30 वाजता नियोजित आहे.`;
      spokenText = needWater
        ? `मातीतील ओलावा कमी झाला आहे, कृपया ठिबक सिंचन सुरू करा.`
        : `मातीतील ओलावा ${soilMoist} टक्के आहे, जो पुरेसा आहे. सध्या पाणी देण्याची गरज नाही.`;
    } else {
      responseText = needWater
        ? `💧 **Irrigation Recommendation: Pumping Recommended!**\n• Soil Moisture: ${soilMoist}% (Below 38% cutoff)\n👉 Action: Engage 30-minute drip cycle on Zone A.`
        : `💧 **Irrigation Recommendation: No Water Needed Now**\n• Soil Moisture: ${soilMoist}% (Target: 40-60% optimal)\n• Rain Probability: 15%\n👉 Recommendation: Moisture is healthy. Next scheduled cycle is at 17:30.`;
      spokenText = needWater
        ? `Soil moisture has dropped to ${soilMoist} percent. Engaging smart drip irrigation is recommended.`
        : `Soil moisture is healthy at ${soilMoist} percent. Pumping is not required right now; crops are well hydrated.`;
    }
  }
  // 5. PANEL POSITIONING & KINEMATICS
  else if (isAngle) {
    if (lang === 'hi') {
      responseText = `📐 **पैनल पोजीशनिंग: ${panelAngle}° (AI स्वीट स्पॉट मोड)**\n• ऊंचाई: 3.5 मीटर एलिवेटेड संरचना\n• झुकाव कारण: 82% फसल प्रकाश अवशोषण और 2.8kW अधिकतम सौर उत्पादन के बीच पूर्ण संतुलन।\n• हवा की गति: ${windKmh} km/h (सामान्य)`;
      spokenText = `सोलर पैनल वर्तमान में ${panelAngle} डिग्री के कोण पर झुके हुए हैं। यह कोण फसलों को धूप देने और बिजली बनाने का सही संतुलन प्रदान करता है।`;
    } else if (lang === 'kn') {
      responseText = `📐 **ಫಲಕದ ಕೋನ: ${panelAngle}° (AI ಸ್ವೀಟ್ ಸ್ಪಾಟ್ ಮೋಡ್)**\n• ಎತ್ತರ: 3.5 ಮೀಟರ್ ಎತ್ತರದ ಕಂಬ\n• ಕಾರಣ: ಬೆಳೆಗಳ ಬೆಳವಣಿಗೆಗೆ ಶೇ 82% ಬಿಸಿಲು ಮತ್ತು 2.8 kW ಸೌರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆಗೆ ಸಮತೋಲನ.\n• ಗಾಳಿಯ ವೇಗ: ${windKmh} km/h`;
      spokenText = `ಸೌರ ಫಲಕಗಳು ಪ್ರಸ್ತುತ ${panelAngle} ಡಿಗ್ರಿ ಕೋನದಲ್ಲಿವೆ. ಇದು ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಬಿಸಿಲು ಮತ್ತು ಹೆಚ್ಚಿನ ವಿದ್ಯುತ್ ನೀಡುವ ಸಮತೋಲಿತ ಸ್ಥಾನವಾಗಿದೆ.`;
    } else if (lang === 'ta') {
      responseText = `📐 **பேனல் கோணம்: ${panelAngle}° (AI ஸ்வீட் ஸ்பாட்)**\n• காரணம்: பயிர்களுக்கு 82% சூரிய ஒளியையும், 2.8 kW மின்சாரத்தையும் சமநிலையில் வழங்குகிறது.`;
      spokenText = `சோலார் பேனல்கள் தற்போது ${panelAngle} டிகிரி கோணத்தில் உள்ளன. இது பயிர் வளர்ச்சிக்கும் மின் உற்பத்திக்கும் சிறந்த சமநிலையாகும்.`;
    } else if (lang === 'te') {
      responseText = `📐 **ప్యానెల్ కోణం: ${panelAngle}° (AI స్వీట్ స్పాట్)**\n• కారణం: పంటలకు 82% కాంతి మరియు 2.8 kW విద్యుత్ ఉత్పత్తికి సరైన సమతుల్యత.`;
      spokenText = `సోలార్ ప్యానెల్స్ ప్రస్తుతం ${panelAngle} డిగ్రీల కోణంలో ఉన్నాయి. ఇది పంటలకు అవసరమైన ఎండ మరియు గరిష్ట విద్యుత్‌ను సమతుల్యం చేస్తుంది.`;
    } else if (lang === 'mr') {
      responseText = `📐 **पॅनेलचा कोन: ${panelAngle}° (AI स्वीट स्पॉट)**\n• कारण: पिकांना 82% प्रकाश आणि 2.8 kW वीज निर्मितीचा परिपूर्ण समतोल.`;
      spokenText = `सौर पॅनेल सध्या ${panelAngle} अंशांच्या कोनावर आहेत. हे पिकांना ऊन आणि जास्तीत जास्त वीज निर्मितीसाठी योग्य संतुलन देते.`;
    } else {
      responseText = `📐 **Panel Positioning: ${panelAngle}° (AI Sweet Spot Mode)**\n• Stanchion Height: 3.5m elevated clearance\n• Optimization Rationale: Balances 82% Photosynthetic Radiation for tomatoes with 2.8kW solar generation.\n• Wind Speed: ${windKmh} km/h (Safe)`;
      spokenText = `Panels are currently tilted at ${panelAngle} degrees in AI Sweet Spot Mode. This balances 82 percent crop photosynthesis with 2.8 kilowatts of clean solar power.`;
    }
  }
  // 6. ACTIVE ALERTS
  else if (isAlert) {
    const alerts = iot.activeAlerts || [];
    const unresolved = alerts.filter(a => a.status === 'unresolved');
    if (unresolved.length === 0) {
      if (lang === 'hi') {
        responseText = `✅ **कोई आपातकालीन चेतावनी नहीं है**\nसभी सिस्टम और सेंसर सामान्य रूप से काम कर रहे हैं।`;
        spokenText = `खेत में कोई आपातकालीन चेतावनी नहीं है। सभी सेंसर और सोलर पैनल सुचारू रूप से कार्य कर रहे हैं।`;
      } else if (lang === 'kn') {
        responseText = `✅ **ಯಾವುದೇ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ**\nಎಲ್ಲಾ ಸೆನ್ಸರ್‌ಗಳು ಮತ್ತು ವ್ಯವಸ್ಥೆಗಳು ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.`;
        spokenText = `ಯಾವುದೇ ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ. ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಸುರಕ್ಷಿತವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.`;
      } else {
        responseText = `✅ **No Active Emergency Alerts**\nAll farm IoT sensors, inverters, and actuators are functioning normally.`;
        spokenText = `All systems are operating normally. There are no active emergency alerts on the farm.`;
      }
    } else {
      const first = unresolved[0];
      responseText = `🚨 **सक्रिय अलर्ट (${unresolved.length})**:\n• **${first.title}**: ${first.message}\n👉 अनुशंसित कार्रवाई: ${first.recommendedAction || 'सिस्टम की निगरानी करें।'}`;
      spokenText = `ध्यान दें: ${first.title}। ${first.message}`;
    }
  }
  // 7. WEATHER & STORM
  else if (isWeather) {
    if (lang === 'hi') {
      responseText = `⛅ **मौसम की स्थिति**\n• हवा की गति: ${windKmh} km/h (सुरक्षित सीमा < 45 km/h)\n• बारिश: ${rainMm} mm (संभावना: 15%)\n• परिवेश तापमान: ${iot.ambientTempC || 26.2}°C\n👉 स्थिति: सोलर ट्रैकिंग और फसल विकास के लिए उत्तम मौसम।`;
      spokenText = `मौसम अनुकूल है। हवा की गति ${windKmh} किलोमीटर प्रति घंटा है और तापमान 26 डिग्री सेल्सियस है। तेज हवा की स्थिति में पैनल अपने आप 0 डिग्री पर मुड़ जाएंगे।`;
    } else if (lang === 'kn') {
      responseText = `⛅ **ಹವಾಮಾನ ವರದಿ**\n• ಗಾಳಿಯ ವೇಗ: ${windKmh} km/h\n• ಮಳೆ: ${rainMm} mm\n• ತಾಪಮಾನ: ${iot.ambientTempC || 26.2}°C\n👉 ಸ್ಥಿತಿ: ಕೃಷಿ ಮತ್ತು ಸೌರ ಉತ್ಪಾದನೆಗೆ ಅನುಕೂಲಕರ ವಾತಾವರಣ.`;
      spokenText = `ಹವಾಮಾನ ಉತ್ತಮವಾಗಿದೆ. ಗಾಳಿಯ ವೇಗ ${windKmh} ಕಿಲೋಮೀಟರ್ ಪ್ರತಿ ಗಂಟೆ ಇದ್ದು, ಸೌರ ಫಲಕಗಳು ಸುರಕ್ಷಿತವಾಗಿವೆ.`;
    } else {
      responseText = `⛅ **Weather & Microclimate**\n• Wind Speed: ${windKmh} km/h (Stow threshold: 45 km/h)\n• Rain Gauge: ${rainMm} mm\n• Ambient Temp: ${iot.ambientTempC || 26.2}°C\n👉 Safety Status: Nominal. Automated 0° storm stow primed.`;
      spokenText = `Weather conditions are ideal. Wind speed is ${windKmh} kilometers per hour and ambient temperature is 26 degrees Celsius. Automated storm stowing is on standby.`;
    }
  }
  // 8. SUMMARY / READ SCREEN
  else {
    if (lang === 'hi') {
      responseText = `📋 **खेत का समग्र सारांश:**\n• 🌿 फसल: स्वस्थ (आराम स्कोर ${cropComfort}%)\n• ☀️ सोलर: ${(solarWatts / 1000).toFixed(2)} kW उत्पादन (${solarKwh} kWh आज)\n• 🔋 बैटरी: ${batterySoC}% चार्ज (${batteryBackup} घंटे बैकअप)\n• 💧 नमी: ${soilMoist}% (सिंचाई की आवश्यकता नहीं)\n• 📐 पैनल कोण: ${panelAngle}°`;
      spokenText = `नमस्ते। आपकी फसल पूरी तरह स्वस्थ है। सोलर पैनल ${(solarWatts / 1000).toFixed(2)} किलोवॉट बिजली बना रहे हैं, बैटरी ${batterySoC} प्रतिशत चार्ज है, और मिट्टी में ${soilMoist} प्रतिशत नमी है।`;
    } else if (lang === 'kn') {
      responseText = `📋 **ಕೃಷಿ ಸಮಗ್ರ ಸಾರಾಂಶ:**\n• 🌿 ಬೆಳೆ: ಆರೋಗ್ಯಕರ (${cropComfort}% ಸ್ಕೋರ್)\n• ☀️ ಸೌರ ಶಕ್ತಿ: ${(solarWatts / 1000).toFixed(2)} kW (${solarKwh} kWh ಇಂದು)\n• 🔋 ಬ್ಯಾಟರಿ: ${batterySoC}% (${batteryBackup} ಗಂಟೆಗಳ ಬ್ಯಾಕಪ್)\n• 💧 ತೇವಾಂಶ: ${soilMoist}%\n• 📐 ಫಲಕದ ಕೋನ: ${panelAngle}°`;
      spokenText = `ನಮಸ್ಕಾರ. ಬೆಳೆಗಳ ಆರೋಗ್ಯ ಉತ್ತಮವಾಗಿದೆ. ಸೌರ ಫಲಕಗಳು ${(solarWatts / 1000).toFixed(2)} ಕಿಲೋವ್ಯಾಟ್ ವಿದ್ಯುತ್ ಉತ್ಪಾದಿಸುತ್ತಿದ್ದು, ಬ್ಯಾಟರಿ ${batterySoC} ಪ್ರತಿಶತ ಚಾರ್ಜ್ ಆಗಿದೆ.`;
    } else if (lang === 'ta') {
      responseText = `📋 **பண்ணை சுருக்கம்:**\n• 🌿 பயிர்: ஆரோக்கியமானது (${cropComfort}%)\n• ☀️ சூரிய மின்: ${(solarWatts / 1000).toFixed(2)} kW (${solarKwh} kWh)\n• 🔋 பேட்டரி: ${batterySoC}% (${batteryBackup} மணிநேரம்)\n• 💧 ஈரப்பதம்: ${soilMoist}%`;
      spokenText = `வணக்கம். பயிர்கள் ஆரோக்கியமாக உள்ளன. சோலார் ${(solarWatts / 1000).toFixed(2)} கிலோவாட் மின்சாரம் உற்பத்தி செய்கிறது, பேட்டரி ${batterySoC} சதவீதம் உள்ளது.`;
    } else if (lang === 'te') {
      responseText = `📋 **వ్యవసాయ సారాంశం:**\n• 🌿 పంట: ఆరోగ్యంగా ఉంది (${cropComfort}%)\n• ☀️ సౌర విద్యుత్: ${(solarWatts / 1000).toFixed(2)} kW\n• 🔋 బ్యాటరీ: ${batterySoC}%\n• 💧 తేమ: ${soilMoist}%`;
      spokenText = `నమస్కారం. పంటలు ఆరోగ్యంగా ఉన్నాయి. సోలార్ ${(solarWatts / 1000).toFixed(2)} కిలోవాట్ల విద్యుత్ ఉత్పత్తి చేస్తోంది, బ్యాటరీ ${batterySoC} శాతం ఉంది.`;
    } else if (lang === 'mr') {
      responseText = `📋 **शेताचा सर्वसमावेशक सारांश:**\n• 🌿 पिके: निरोगी (${cropComfort}%)\n• ☀️ सौर: ${(solarWatts / 1000).toFixed(2)} kW निर्मिती\n• 🔋 बॅटरी: ${batterySoC}%\n• 💧 ओलावा: ${soilMoist}%`;
      spokenText = `नमस्कार. पिके पूर्णपणे निरोगी आहेत. सौर पॅनेल ${(solarWatts / 1000).toFixed(2)} किलोवॅट वीज निर्माण करत आहेत आणि बॅटरी ${batterySoC} टक्के चार्ज आहे.`;
    } else {
      responseText = `📋 **Farm Intelligence Briefing:**\n• 🌿 Crop Health: ${cropComfort}% Comfort (Optimal photosynthesis)\n• ☀️ Solar Output: ${(solarWatts / 1000).toFixed(2)} kW (${solarKwh} kWh harvested today)\n• 🔋 Battery SoC: ${batterySoC}% (${batteryBackup}h backup runtime)\n• 💧 Soil Moisture: ${soilMoist}% (Healthy root hydration)\n• 📐 Panel Position: ${panelAngle}° (AI Sweet Spot)`;
      spokenText = `Hello. Your crops are flourishing with a ${cropComfort} percent comfort score. Solar output is currently ${(solarWatts / 1000).toFixed(2)} kilowatts, battery storage is at ${batterySoC} percent, and soil moisture is healthy at ${soilMoist} percent.`;
    }
  }

  return { responseText, spokenText };
}

/**
 * Handle user input (spoken or typed)
 */
function handleUserInput(query) {
  if (!query || !query.trim()) return;

  const chatContainer = document.getElementById('voice-chat-messages');
  const inputEl = document.getElementById('voice-text-input');
  if (inputEl) inputEl.value = '';

  // 1. Append user message to UI
  appendChatMessage('user', query);

  // 2. Process AI Answer
  playAudioTone('chime');
  const { responseText, spokenText } = processFarmerQuery(query);

  // 3. Append assistant message to UI
  setTimeout(() => {
    appendChatMessage('assistant', responseText, spokenText);
    speakText(spokenText);
  }, 350);
}

/**
 * Append chat message bubble to assistant window
 */
function appendChatMessage(sender, text, spokenTextToReplay) {
  const container = document.getElementById('voice-chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `voice-chat-bubble ${sender}`;

  if (sender === 'user') {
    msgDiv.innerHTML = `
      <div class="bubble-header">
        <span class="bubble-sender">👨‍🌾 You</span>
      </div>
      <div class="bubble-body">${escapeHtml(text)}</div>
    `;
  } else {
    // Formatted markdown with line breaks
    const formattedHtml = text
      .split('\n')
      .map(line => {
        if (line.startsWith('•')) {
          return `<div class="bubble-bullet">${line}</div>`;
        } else if (line.startsWith('👉')) {
          return `<div class="bubble-tip">${line}</div>`;
        } else if (line.trim().startsWith('**')) {
          return `<div class="bubble-strong">${line.replace(/\*\*/g, '')}</div>`;
        }
        return `<div>${line}</div>`;
      })
      .join('');

    const msgId = 'msg-' + Date.now();
    msgDiv.innerHTML = `
      <div class="bubble-header">
        <span class="bubble-sender">🤖 Kisan Vani AI</span>
        <button class="btn-bubble-replay" data-spoken="${encodeURIComponent(spokenTextToReplay || text)}" title="Speak this response aloud">
          🔊 Speak
        </button>
      </div>
      <div class="bubble-body">${formattedHtml}</div>
    `;

    // Wire speak replay button
    setTimeout(() => {
      const replayBtn = msgDiv.querySelector('.btn-bubble-replay');
      if (replayBtn) {
        replayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const toSpeak = decodeURIComponent(replayBtn.getAttribute('data-spoken') || '');
          speakText(toSpeak);
        });
      }
    }, 50);
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Read current screen / view aloud
 */
export function readCurrentScreen(viewName) {
  const lang = getLanguage() || 'en';
  const iot = getIotState();
  const v = viewName || voiceState.currentView || 'home';

  let summary = '';
  if (v === 'dashboard') {
    summary = lang === 'hi'
      ? `आईओटी डैशबोर्ड सारांश: वर्तमान में ${(iot.solarPowerOutputWatts / 1000).toFixed(2)} किलोवॉट सौर ऊर्जा बन रही है। बैटरी ${iot.battery.chargePercent}% चार्ज है और फसल कम्फर्ट स्कोर ${iot.cropComfortScore}% है।`
      : `IoT Dashboard Summary: Solar panels are generating ${(iot.solarPowerOutputWatts / 1000).toFixed(2)} kilowatts. Battery storage is at ${iot.battery.chargePercent} percent, and crop comfort score is ${iot.cropComfortScore} percent.`;
  } else if (v === 'positioning') {
    summary = lang === 'hi'
      ? `पैनल पोजीशनिंग दृश्य: 3.5 मीटर ऊंचे फ्रेम पर सोलर पैनल ${iot.panelAngleDeg} डिग्री पर झुके हैं। हाइड्रोलिक पिस्टन सुचारू रूप से कार्य कर रहा है और नीचे टमाटर की फसलों को पर्याप्त धूप मिल रही है।`
      : `Panel Positioning View: Panels on the 3.5 meter stanchion are positioned at ${iot.panelAngleDeg} degrees. The telescoping hydraulic actuator is holding optimal elevation to preserve crop photosynthesis.`;
  } else if (v === 'energy') {
    summary = lang === 'hi'
      ? `ऊर्जा और बैटरी दृश्य: आज कुल ${iot.solarEnergyTodayKwh} यूनिट बिजली बनी है। बैटरी में ${iot.battery.estimatedBackupHours} घंटे का बैकअप शेष है। ग्रिड निर्यात सुचारू रूप से जारी है।`
      : `Energy & Battery View: Today, ${iot.solarEnergyTodayKwh} kilowatt-hours have been generated. Battery bank has ${iot.battery.estimatedBackupHours} hours of backup capacity remaining with grid feed-in active.`;
  } else if (v === 'camera') {
    summary = lang === 'hi'
      ? `क्रॉप कैमरा दृश्य: दक्षिण क्षेत्र के टमाटरों की 3 कैमरों से निगरानी की जा रही है। वनस्पति स्वास्थ्य सूचकांक सामान्य है और पत्तियों पर कोई फफूंद नहीं पाई गई है।`
      : `Crop Camera View: Real-time multispectral imaging across 3 crop zones shows healthy tomato canopy coverage with zero signs of damp rot.`;
  } else if (v === 'alerts') {
    summary = lang === 'hi'
      ? `अलर्ट केंद्र: वर्तमान में सभी सुरक्षा प्रोटोकॉल सक्रिय हैं। तेज हवा या आंधी की स्थिति में स्वचालित 0 डिग्री स्टॉ मोड स्टैंडबाय पर है।`
      : `Alerts Center: All safety protocols are operational. Emergency 0 degree storm stowing and rainwater harvesting triggers are primed.`;
  } else {
    // Default Home
    summary = lang === 'hi'
      ? `सन-स्टार्व्ड ट्रैकर मुख्य पृष्ठ: आपकी 2.5 एकड़ टमाटर की फसल सुरक्षित है। सौर उत्पादन सामान्य है और एआई ऑप्टिमाइज़र सक्रिय है।`
      : `Sun-Starved Tracker Home: Your 2.5 acre tomato agrivoltaic system is operating in AI Sweet Spot mode with balanced crop and solar harvest.`;
  }

  appendChatMessage('assistant', `📢 **${t('voiceReadScreenNotice') || 'Reading screen aloud:'}**\n${summary}`, summary);
  speakText(summary);
}

/**
 * Trigger an automated voice alert
 */
export function triggerVoiceAlert(alertType = 'test', customText = null) {
  if (!voiceState.voiceAlertsEnabled) return;

  const lang = getLanguage() || 'en';
  playAudioTone('alert');

  let alertMessage = '';
  if (customText) {
    alertMessage = customText;
  } else if (alertType === 'wind') {
    alertMessage = t('voiceAlertWindSpoken') || 'Emergency Alert: High wind speeds detected. Solar panels stowed flat to 0 degrees to protect equipment.';
  } else if (alertType === 'rain') {
    alertMessage = t('voiceAlertRainSpoken') || 'Rain Alert: Rainfall detected. Panels tilted to 30 degrees to channel rainwater into drainage swales.';
  } else if (alertType === 'battery') {
    alertMessage = t('voiceAlertBatteryLowSpoken') || 'Battery Alert: LiFePO4 battery has dropped below 20 percent. Emergency load shedding activated.';
  } else if (alertType === 'irrigation') {
    alertMessage = t('voiceAlertIrrigationSpoken') || 'Irrigation Notice: Soil moisture is low. Smart drip irrigation recommended.';
  } else {
    alertMessage = t('voiceAlertTestSpoken') || 'Attention farmer: Test voice alert. High wind warning active. Panels safely stowed flat at 0 degrees.';
  }

  // Display floating voice alert banner
  displayVoiceAlertBanner(alertMessage);

  // Speak aloud
  speakText(alertMessage);
}

/**
 * Show a sleek floating voice alert notification banner
 */
function displayVoiceAlertBanner(msg) {
  let banner = document.getElementById('voice-alert-hud');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'voice-alert-hud';
    banner.className = 'voice-alert-hud';
    document.body.appendChild(banner);
  }

  banner.innerHTML = `
    <div class="voice-alert-hud-inner">
      <div class="voice-alert-icon">🔊</div>
      <div class="voice-alert-text">
        <div class="voice-alert-title">VOICE BROADCAST ALERT</div>
        <div class="voice-alert-desc">${escapeHtml(msg)}</div>
      </div>
      <div class="voice-alert-actions">
        <button id="btn-replay-hud-alert" class="btn btn-xs btn-accent" title="Replay voice announcement">🔁 Replay</button>
        <button id="btn-close-hud-alert" class="btn btn-xs btn-secondary" title="Dismiss">✕</button>
      </div>
    </div>
  `;

  banner.classList.add('visible');

  const replayBtn = document.getElementById('btn-replay-hud-alert');
  if (replayBtn) {
    replayBtn.onclick = () => speakText(msg);
  }

  const closeBtn = document.getElementById('btn-close-hud-alert');
  if (closeBtn) {
    closeBtn.onclick = () => banner.classList.remove('visible');
  }

  setTimeout(() => {
    if (banner && banner.classList.contains('visible')) {
      banner.classList.remove('visible');
    }
  }, 9000);
}

/**
 * Open the Voice Assistant modal/drawer
 */
export function openVoiceAssistant() {
  voiceState.isOpen = true;
  const modal = document.getElementById('kisan-voice-modal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  playAudioTone('chime');

  // If chat is empty, initialize with welcome message
  const container = document.getElementById('voice-chat-messages');
  if (container && container.children.length === 0) {
    const welcome = t('voiceWelcomeMsg') || 'Namaste! I am Kisan Vani AI. I can guide you on crop health, solar power, battery status, and irrigation advice in real time. How may I help you?';
    appendChatMessage('assistant', welcome, welcome);
    speakText(welcome);
  }
}

/**
 * Close the Voice Assistant modal/drawer
 */
export function closeVoiceAssistant() {
  voiceState.isOpen = false;
  stopSpeaking();
  stopListening();
  const modal = document.getElementById('kisan-voice-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

/**
 * Toggle Voice Assistant open / closed
 */
export function toggleVoiceAssistant() {
  if (voiceState.isOpen) {
    closeVoiceAssistant();
  } else {
    openVoiceAssistant();
  }
}

/**
 * Render the Floating Assistant Launcher and Modal Drawer HTML
 */
export function renderVoiceAssistantWidget() {
  // 1. Floating Action Button at bottom right
  let floatBtn = document.getElementById('btn-floating-voice');
  if (!floatBtn) {
    floatBtn = document.createElement('button');
    floatBtn.id = 'btn-floating-voice';
    floatBtn.className = 'btn-floating-voice pulse-on-speak';
    floatBtn.setAttribute('aria-label', 'Open Kisan Vani AI Voice Assistant');
    floatBtn.setAttribute('title', 'Kisan Vani AI — Multilingual Voice Assistant (Press V)');
    floatBtn.innerHTML = `
      <div class="voice-floating-aura"></div>
      <div class="voice-floating-icon">🎙️</div>
      <div class="voice-floating-label">
        <span class="v-name" data-i18n="btnVoiceAssistant">${t('btnVoiceAssistant') || 'Kisan Vani AI'}</span>
        <span class="v-wave">
          <span class="voice-wave-bar bar-1"></span>
          <span class="voice-wave-bar bar-2"></span>
          <span class="voice-wave-bar bar-3"></span>
          <span class="voice-wave-bar bar-4"></span>
        </span>
      </div>
    `;
    document.body.appendChild(floatBtn);
    floatBtn.addEventListener('click', toggleVoiceAssistant);
  }

  // 2. Voice Assistant Slide-up / Modal Panel
  let modal = document.getElementById('kisan-voice-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'kisan-voice-modal';
    modal.className = 'kisan-voice-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="voice-modal-backdrop" id="voice-modal-backdrop"></div>
      <div class="voice-modal-card">
        
        <!-- Modal Header -->
        <div class="voice-modal-header">
          <div class="voice-avatar-group">
            <div class="voice-avatar">
              <span class="avatar-icon">🌾</span>
              <div class="avatar-live-dot"></div>
            </div>
            <div class="voice-header-info">
              <div class="voice-header-title">
                <span data-i18n="voiceAssistantTitle">${t('voiceAssistantTitle') || 'Kisan Vani AI — Farm Voice Assistant'}</span>
              </div>
              <div class="voice-header-sub" id="voice-status-text" data-i18n="voiceStatusIdle">
                ${t('voiceStatusIdle') || 'Tap microphone or ask a question below'}
              </div>
            </div>
          </div>

          <div class="voice-header-controls">
            <!-- Mute Voice Button -->
            <button id="btn-voice-mute" class="btn-voice-tool" title="Mute/Unmute voice audio">
              <span id="voice-mute-icon">🔊</span>
            </button>
            
            <!-- Voice Speed Selector -->
            <select id="voice-speed-select" class="voice-speed-select" title="Speech Speed">
              <option value="1.0" data-i18n="voiceSpeedNormal">1.0x</option>
              <option value="0.85" data-i18n="voiceSpeedSlow">0.85x</option>
            </select>

            <!-- Close Assistant -->
            <button id="btn-close-voice" class="btn-voice-tool close-btn" title="Close Voice Assistant">✕</button>
          </div>
        </div>

        <!-- Chat Conversation Area -->
        <div class="voice-chat-messages" id="voice-chat-messages">
          <!-- Chat messages dynamically inserted here -->
        </div>

        <!-- Quick Prompt Suggestion Chips -->
        <div class="voice-chips-container" id="voice-chips-container">
          <div class="chips-scroll">
            <button class="voice-chip" data-query="How is crop health today?" data-i18n="voiceChipCrop">
              ${t('voiceChipCrop') || '🌿 Crop Health'}
            </button>
            <button class="voice-chip" data-query="What is solar generation output?" data-i18n="voiceChipSolar">
              ${t('voiceChipSolar') || '☀️ Solar Output'}
            </button>
            <button class="voice-chip" data-query="What is battery status and backup?" data-i18n="voiceChipBattery">
              ${t('voiceChipBattery') || '🔋 Battery & Backup'}
            </button>
            <button class="voice-chip" data-query="Should I irrigate crops now?" data-i18n="voiceChipIrrigation">
              ${t('voiceChipIrrigation') || '💧 Irrigation Advice'}
            </button>
            <button class="voice-chip" data-query="Why are panels tilted at this angle?" data-i18n="voiceChipAngle">
              ${t('voiceChipAngle') || '📐 Panel Angle Reason'}
            </button>
            <button class="voice-chip" data-query="Read active alerts to me" data-i18n="voiceChipAlerts">
              ${t('voiceChipAlerts') || '🚨 Read Active Alerts'}
            </button>
          </div>
        </div>

        <!-- Action Tools Bar -->
        <div class="voice-actions-toolbar">
          <button id="btn-read-screen" class="btn-action-tool" title="Narrate current view summary">
            📢 <span data-i18n="voiceChipReadScreen">${t('voiceChipReadScreen') || 'Read Screen Aloud'}</span>
          </button>
          <button id="btn-test-voice-alert" class="btn-action-tool" title="Hear a sample emergency storm voice alert">
            🔊 <span data-i18n="voiceBtnTestAlert">${t('voiceBtnTestAlert') || 'Test Voice Alert'}</span>
          </button>
        </div>

        <!-- Tactile Voice Input Bar -->
        <div class="voice-input-bar">
          <button id="btn-voice-mic" class="btn-voice-mic" title="Click and speak your question">
            <span class="mic-wave-ring"></span>
            <span class="mic-icon">🎙️</span>
          </button>

          <input 
            type="text" 
            id="voice-text-input" 
            class="voice-text-input" 
            placeholder="${t('voiceInputPlaceholder') || 'Ask a question or tap a prompt chip...'}"
            data-i18n-placeholder="voiceInputPlaceholder"
            autocomplete="off"
          />

          <button id="btn-voice-send" class="btn-voice-send" title="Send question">
            ➔
          </button>
        </div>

      </div>
    `;
    document.body.appendChild(modal);
    bindAssistantEvents();
  }
}

/**
 * Bind DOM events for the assistant modal
 */
function bindAssistantEvents() {
  const closeBtn = document.getElementById('btn-close-voice');
  if (closeBtn) closeBtn.onclick = closeVoiceAssistant;

  const backdrop = document.getElementById('voice-modal-backdrop');
  if (backdrop) backdrop.onclick = closeVoiceAssistant;

  // Mic push-to-talk button
  const micBtn = document.getElementById('btn-voice-mic');
  if (micBtn) {
    micBtn.onclick = () => {
      if (voiceState.isListening) {
        stopListening();
      } else {
        startListening();
      }
    };
  }

  // Text input send button
  const sendBtn = document.getElementById('btn-voice-send');
  const inputEl = document.getElementById('voice-text-input');
  if (sendBtn && inputEl) {
    sendBtn.onclick = () => {
      const q = inputEl.value;
      if (q && q.trim()) handleUserInput(q);
    };

    inputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        const q = inputEl.value;
        if (q && q.trim()) handleUserInput(q);
      }
    };
  }

  // Prompt chips
  const chips = document.querySelectorAll('.voice-chip');
  chips.forEach(ch => {
    ch.onclick = () => {
      const query = ch.getAttribute('data-query');
      if (query) handleUserInput(query);
    };
  });

  // Mute button
  const muteBtn = document.getElementById('btn-voice-mute');
  const muteIcon = document.getElementById('voice-mute-icon');
  if (muteBtn) {
    muteBtn.onclick = () => {
      voiceState.isMuted = !voiceState.isMuted;
      if (voiceState.isMuted) {
        stopSpeaking();
        if (muteIcon) muteIcon.textContent = '🔇';
        muteBtn.title = 'Unmute voice output';
      } else {
        if (muteIcon) muteIcon.textContent = '🔊';
        muteBtn.title = 'Mute voice output';
        playAudioTone('success');
      }
    };
  }

  // Voice speed selector
  const speedSelect = document.getElementById('voice-speed-select');
  if (speedSelect) {
    speedSelect.onchange = (e) => {
      voiceState.speechRate = parseFloat(e.target.value) || 1.0;
    };
  }

  // Read screen button
  const readScreenBtn = document.getElementById('btn-read-screen');
  if (readScreenBtn) {
    readScreenBtn.onclick = () => {
      readCurrentScreen(voiceState.currentView);
    };
  }

  // Test voice alert button
  const testAlertBtn = document.getElementById('btn-test-voice-alert');
  if (testAlertBtn) {
    testAlertBtn.onclick = () => {
      triggerVoiceAlert('test');
    };
  }

  // Keyboard shortcut: Press 'V' (unless in an input field) to toggle assistant
  window.addEventListener('keydown', (e) => {
    if (e.key === 'v' || e.key === 'V') {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag !== 'input' && activeTag !== 'textarea' && activeTag !== 'select') {
        e.preventDefault();
        toggleVoiceAssistant();
      }
    } else if (e.key === 'Escape' && voiceState.isOpen) {
      closeVoiceAssistant();
    }
  });
}

/**
 * Initialize Kisan Vani AI module
 */
export function initVoiceAssistant(initialView = 'home') {
  voiceState.currentView = initialView;
  loadVoices();
  initSpeechRecognition();
  renderVoiceAssistantWidget();
}

/**
 * Update active view reference
 */
export function setVoiceAssistantView(viewName) {
  voiceState.currentView = viewName;
}
