import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { render, type RenderResult } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import translationES from '../locales/es/translation.json';
import translationEN from '../locales/en/translation.json';

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN },
} as const;

export async function createTestI18n(lng: 'es' | 'en' = 'es') {
  const instance = i18n.createInstance();

  await instance.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

  return instance;
}

interface RenderWithProvidersOptions {
  route?: string;
  lng?: 'es' | 'en';
}

export async function renderWithProviders(
  ui: React.ReactElement,
  { route = '/', lng = 'es' }: RenderWithProvidersOptions = {}
): Promise<RenderResult> {
  const testI18n = await createTestI18n(lng);

  return render(
    <I18nextProvider i18n={testI18n}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </I18nextProvider>
  );
}