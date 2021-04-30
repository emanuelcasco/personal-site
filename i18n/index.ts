import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enTranslations, esTranslations } from './translations';

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslations,
    es: esTranslations,
  },
  fallbackLng: 'en',
  debug: false,
  ns: ['translations'],
  defaultNS: 'commons',
});

export default i18n;
