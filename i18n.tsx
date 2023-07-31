import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './src/locales/en/translation.json';
import translationJA from './src/locales/ja/translation.json';


// Translation resources
const resources = {
    en: {
        translation: translationEN,
    },
    ja: {
        translation: translationJA,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

