import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import translations from 'locales';

const options = {
  resources: translations,
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
};
if (process.browser) {
  i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(reactI18nextModule); // if not using I18nextProvider
}

if (!i18n.isInitialized) i18n.init(options);

export default i18n;
