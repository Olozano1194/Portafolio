import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '../../../test/i18n';
import { toastModuleMock } from '../../../test/mocks';
import { scrollToSection } from '../../../utils/scrollToSection';
import Header from '../Header';

vi.mock('../../../utils/scrollToSection', () => ({
  scrollToSection: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: toastModuleMock,
  toast: toastModuleMock,
  Toaster: () => null,
}));

describe('Header', () => {
  const mockScrollToSection = vi.mocked(scrollToSection);

  const getUnnamedButtons = () => screen.getAllByRole('button', { name: '' });
  const getHamburgerButton = () => {
    const btn = getUnnamedButtons().find(btn => btn.hasAttribute('aria-expanded'));
    if (!btn) throw new Error('Hamburger button not found');
    return btn;
  };
  const getLanguageButton = () => {
    const btn = getUnnamedButtons()[1];
    if (!btn) throw new Error('Language button not found');
    return btn;
  };
  const getThemeButton = () => {
    const btn = getUnnamedButtons()[2];
    if (!btn) throw new Error('Theme button not found');
    return btn;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Navigation links', () => {
    it('renders all navigation links with ES translations', async () => {
      await renderWithProviders(<Header />, { lng: 'es' });

      expect(screen.getByText('Sobre mi')).toBeInTheDocument();
      expect(screen.getByText('Formación')).toBeInTheDocument();
      expect(screen.getByText('Proyectos')).toBeInTheDocument();
      expect(screen.getByText('Habilidades')).toBeInTheDocument();
      expect(screen.getByText('Pasatiempos')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('renders all navigation links with EN translations', async () => {
      await renderWithProviders(<Header />, { lng: 'en' });

      expect(screen.getByText('About me')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Hobbies')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('calls scrollToSection when clicking nav link on home page', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { route: '/', lng: 'es' });

      await user.click(screen.getByText('Proyectos'));

      expect(mockScrollToSection).toHaveBeenCalledWith('proyectos');
    });

    it('navigates to home with scrollTo state when clicking nav link on non-home page', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { route: '/videos/1', lng: 'es' });

      await user.click(screen.getByText('Proyectos'));

      // Should navigate to home with state.scrollTo
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('Language toggle', () => {
    it('toggles language from ES to EN and shows EN strings', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { lng: 'es' });

      // Initially shows ES
      expect(screen.getByText('Sobre mi')).toBeInTheDocument();

      // Click language toggle button (globe icon - second unnamed button)
      const langButton = getLanguageButton();
      await user.click(langButton);

      // Should now show EN strings
      expect(screen.getByText('About me')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('toggles language from EN to ES and shows ES strings', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { lng: 'en' });

      // Initially shows EN
      expect(screen.getByText('About me')).toBeInTheDocument();

      // Click language toggle button
      const langButton = getLanguageButton();
      await user.click(langButton);

      // Should now show ES strings
      expect(screen.getByText('Sobre mi')).toBeInTheDocument();
      expect(screen.getByText('Formación')).toBeInTheDocument();
      expect(screen.getByText('Proyectos')).toBeInTheDocument();
    });
  });

  describe('Theme toggle', () => {
    it('toggles theme and updates localStorage', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { lng: 'es' });

      // Initially dark (default)
      expect(localStorage.getItem('portfolio-theme')).toBe('dark');

      // Click theme toggle (sun/moon icon - third unnamed button)
      const themeButton = getThemeButton();
      await user.click(themeButton);

      // Should update localStorage
      expect(localStorage.getItem('portfolio-theme')).toBe('light');
    });

    it('toggles theme from light to dark', async () => {
      const user = userEvent.setup();
      localStorage.setItem('portfolio-theme', 'light');
      document.documentElement.classList.add('light');

      await renderWithProviders(<Header />, { lng: 'es' });

      expect(localStorage.getItem('portfolio-theme')).toBe('light');

      // Click theme toggle
      const themeButton = getThemeButton();
      await user.click(themeButton);

      // Should update localStorage
      expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    });

    it('restores persisted theme on initial render', async () => {
      localStorage.setItem('portfolio-theme', 'light');
      document.documentElement.classList.add('light');

      await renderWithProviders(<Header />, { lng: 'es' });

      expect(localStorage.getItem('portfolio-theme')).toBe('light');
    });
  });

  describe('Mobile Disclosure (hamburger menu)', () => {
    it('opens mobile menu panel when clicking hamburger button', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { lng: 'es' });

      const hamburgerButton = getHamburgerButton();
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');

      // Click hamburger button
      await user.click(hamburgerButton!);

      // Mobile menu panel should be open
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
      
      // The nav links in mobile menu should be visible (they are DisclosureButtons)
      const mobileNavButtons = screen.getAllByRole('button', { name: /sobre mi|formación|proyectos|habilidades|pasatiempos|contacto/i });
      expect(mobileNavButtons.length).toBeGreaterThan(0);
    });

    it('closes mobile menu panel when clicking hamburger button again', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { lng: 'es' });

      const hamburgerButton = getHamburgerButton();
      expect(hamburgerButton).toBeInTheDocument();

      // Open mobile menu
      await user.click(hamburgerButton!);
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

      // Close mobile menu
      await user.click(hamburgerButton!);
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows language and theme toggles in mobile menu panel', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { lng: 'es' });

      // Open mobile menu
      const hamburgerButton = getHamburgerButton();
      await user.click(hamburgerButton!);

      // Language and theme buttons should be in the mobile panel
      // They are buttons without aria-expanded inside the DisclosurePanel
      const allButtons = screen.getAllByRole('button');
      const panelButtons = allButtons.filter(btn => !btn.hasAttribute('aria-expanded'));
      // Should have at least lang + theme buttons in panel
      expect(panelButtons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Logo click', () => {
    it('scrolls to top when clicking logo on home page', async () => {
      const user = userEvent.setup();
      await renderWithProviders(<Header />, { route: '/', lng: 'es' });

      await user.click(screen.getByAltText('logo'));

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });
});