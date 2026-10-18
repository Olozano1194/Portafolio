import 'react-i18next';
import type translationES from '../locales/es/translation.json';
import type translationEN from '../locales/en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      es: typeof translationES;
      en: typeof translationEN;
    };
    returnNull: false;
  }
}