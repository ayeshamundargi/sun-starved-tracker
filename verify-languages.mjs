import { I18N_DATA } from './src/data/i18n.js';

const languages = Object.keys(I18N_DATA);
console.log(`Available languages: ${languages.join(', ')}`);

const enKeys = Object.keys(I18N_DATA.en);
console.log(`Total English keys: ${enKeys.length}`);

let hasErrors = false;

languages.forEach(lang => {
  if (lang === 'en') return;
  const currentKeys = Object.keys(I18N_DATA[lang]);
  const missing = enKeys.filter(k => !(k in I18N_DATA[lang]));
  const extra = currentKeys.filter(k => !enKeys.includes(k));
  const empty = currentKeys.filter(k => typeof I18N_DATA[lang][k] === 'string' && I18N_DATA[lang][k].trim() === '');

  console.log(`\n--- Language: [${lang}] (keys: ${currentKeys.length}) ---`);
  if (missing.length > 0) {
    console.error(`Missing ${missing.length} keys: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '...' : ''}`);
    hasErrors = true;
  } else {
    console.log(`✓ All English keys are present.`);
  }

  if (extra.length > 0) {
    console.warn(`Extra ${extra.length} keys: ${extra.slice(0, 10).join(', ')}${extra.length > 10 ? '...' : ''}`);
  }

  if (empty.length > 0) {
    console.error(`Empty ${empty.length} keys: ${empty.join(', ')}`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.log('\n❌ Verification found issues.');
  process.exit(1);
} else {
  console.log('\n✅ All language translations verified successfully!');
}
