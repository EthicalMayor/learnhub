import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import translationES from './locales/es.json';  // Spanish
import translationES_LA from './locales/es-LA.json';  // Spanish (Latin America)
import translationDE from './locales/de.json';  // German
import translationNL from './locales/nl.json';  // Dutch
import translationZH from './locales/zh.json';  // Simplified Chinese
import translationZH_TW from './locales/zh-TW.json';  // Traditional Chinese
import translationPT from './locales/pt.json';  // Portuguese
import translationKO from './locales/ko.json';  // Korean
import translationAR from './locales/ar.json';  // Arabic
import translationDA from './locales/da.json';  // Danish
import translationFI from './locales/fi.json';  // Finnish 
import translationSV from './locales/sv.json';  // Swedish
import translationNO from './locales/no.json';  // Norwegian
import translationJA from './locales/ja.json';  // Japanese
import translationYO from './locales/yo.json';  // Yoruba
import translationIG from './locales/ig.json';  // Igbo
import translationHA from './locales/ha.json';  // Hausa

// Resource for the languages
const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  es: { translation: translationES },
  'es-LA': { translation: translationES_LA },
  de: { translation: translationDE },
  nl: { translation: translationNL },
  zh: { translation: translationZH },
  'zh-TW': { translation: translationZH_TW },
  pt: { translation: translationPT },
  ko: { translation: translationKO },
  ar: { translation: translationAR },
  da: { translation: translationDA },
  fi: { translation: translationFI },
  sv: { translation: translationSV },
  no: { translation: translationNO },
  ja: { translation: translationJA },
  yo: { translation: translationYO },
  ig: { translation: translationIG },
  ha: { translation: translationHA },
};

i18n
  .use(LanguageDetector) // Automatically detects user's language
  .use(initReactI18next) // Passes the i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Use English if a translation is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
