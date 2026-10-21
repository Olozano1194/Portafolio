import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../test/i18n';
import App from '../App';

describe('App — Routing smoke tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = async (route = '/') => {
    return await renderWithProviders(<App />, { route, lng: 'es' });
  };

  it('renders landing page content at root route "/"', async () => {
    await renderApp('/');

    // Check for home page content
    expect(screen.getByText('El Arquitecto Digital')).toBeInTheDocument();
    expect(screen.getByText('Construyendo el')).toBeInTheDocument();
    expect(screen.getByText('Futuro Digital.')).toBeInTheDocument();
    expect(screen.getByText('Desarrollador junior')).toBeInTheDocument();
  });

  it('renders Header navigation on home page', async () => {
    await renderApp('/');

    expect(screen.getByText('Sobre mi')).toBeInTheDocument();
    expect(screen.getByText('Formación')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
    expect(screen.getByText('Pasatiempos')).toBeInTheDocument();
    // Contacto appears in both Header and ContactoSection; check Header specifically
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeInTheDocument();
  });

  it('renders Error404 for unknown routes', async () => {
    await renderApp('/this-route-does-not-exist');

    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
    expect(screen.getByText('La página que buscas no existe o ha sido movida.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Volver al inicio' })).toBeInTheDocument();
  });

  it('renders Error404 for another unknown route', async () => {
    await renderApp('/random/path/that/does/not/exist');

    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Volver al inicio' })).toBeInTheDocument();
  });

  it('navigates from Error404 to home when clicking home button', async () => {
    const user = userEvent.setup();
    
    await renderApp('/unknown-route');

    await user.click(screen.getByRole('button', { name: 'Volver al inicio' }));

    // Should now show home page
    expect(screen.getByText('El Arquitecto Digital')).toBeInTheDocument();
    expect(screen.getByText('Construyendo el')).toBeInTheDocument();
  });

  it('renders videos route with VideosSection', async () => {
    await renderApp('/videos/1');

    // Should render the videos section (or at least not error)
    // The actual content depends on the demo data
    expect(screen.queryByText('Página no encontrada')).not.toBeInTheDocument();
  });

  it('renders demo route with DemoSection', async () => {
    await renderApp('/demo/1');

    // Should render the demo section (or at least not error)
    expect(screen.queryByText('Página no encontrada')).not.toBeInTheDocument();
  });
});