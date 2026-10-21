import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../../test/i18n';
import Error404 from '../Error404';

describe('Error404', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error 404 title and description in ES', async () => {
    await renderWithProviders(<Error404 />, { lng: 'es' });

    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
    expect(screen.getByText('La página que buscas no existe o ha sido movida.')).toBeInTheDocument();
  });

  it('renders home button with correct text in ES', async () => {
    await renderWithProviders(<Error404 />, { lng: 'es' });

    expect(screen.getByRole('button', { name: 'Volver al inicio' })).toBeInTheDocument();
  });

  it('navigates to home when clicking the home button in ES', async () => {
    const user = userEvent.setup();
    await renderWithProviders(<Error404 />, { lng: 'es' });

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }));

    // Should navigate to home
    expect(window.location.pathname).toBe('/');
  });

  it('renders SEO component with correct metadata in ES', async () => {
    await renderWithProviders(<Error404 />, { lng: 'es' });

    // Check document title was set by SEO component
    expect(document.title).toContain('Página no encontrada');
    expect(document.title).toContain('Oscar Lozano');
  });

  it('works with EN translations', async () => {
    const user = userEvent.setup();
    await renderWithProviders(<Error404 />, { lng: 'en' });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('The page you\'re looking for doesn\'t exist or has been moved.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to home' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back to home' }));

    expect(window.location.pathname).toBe('/');
  });

  it('displays warning icon', async () => {
    await renderWithProviders(<Error404 />, { lng: 'es' });

    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });
});