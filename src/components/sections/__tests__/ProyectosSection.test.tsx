import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../../../test/i18n';
import ProyectosSection from '../ProyectosSection';

describe('ProyectosSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title and description', async () => {
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    expect(screen.getByText('Proyectos Seleccionados')).toBeInTheDocument();
    expect(screen.getByText('Proyectos y soluciones web enfocados en la funcionalidad, el detalle y la experiencia de usuario.')).toBeInTheDocument();
  });

  it('renders initial 4 projects by default', async () => {
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    // Should show first 4 projects (based on proyectos.js order)
    expect(screen.getByText('ControlFit')).toBeInTheDocument();
    expect(screen.getByText('FiadoApp')).toBeInTheDocument();
    expect(screen.getByText('TaskMaster')).toBeInTheDocument();
    expect(screen.getByText('Gestión Institucional (Actualización)')).toBeInTheDocument();
    // 5th and 6th projects should NOT be visible initially
    expect(screen.queryByText('EduBase')).not.toBeInTheDocument();
    expect(screen.queryByText('Hotel Alura Management')).not.toBeInTheDocument();
  });

  it('shows "Ver Todo" button when there are more than 4 projects', async () => {
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    expect(screen.getByRole('button', { name: 'Ver Todo' })).toBeInTheDocument();
  });

  it('expands to show all projects when clicking "Ver Todo"', async () => {
    const user = userEvent.setup();
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    // Initially only 4 projects
    expect(screen.queryByText('EduBase')).not.toBeInTheDocument();
    expect(screen.queryByText('Hotel Alura Management')).not.toBeInTheDocument();

    // Click "Ver Todo" button
    await user.click(screen.getByRole('button', { name: 'Ver Todo' }));

    // Should now show all 6 projects
    expect(screen.getByText('EduBase')).toBeInTheDocument();
    expect(screen.getByText('Hotel Alura Management')).toBeInTheDocument();
    // Button should change to "Ver Menos"
    expect(screen.getByRole('button', { name: 'Ver Menos' })).toBeInTheDocument();
  });

  it('collapses back to 4 projects when clicking "Ver Menos"', async () => {
    const user = userEvent.setup();
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    // Expand first
    await user.click(screen.getByRole('button', { name: 'Ver Todo' }));
    expect(screen.getByText('Hotel Alura Management')).toBeInTheDocument();

    // Click "Ver Menos"
    await user.click(screen.getByRole('button', { name: 'Ver Menos' }));

    // Should collapse back to 4 projects
    expect(screen.queryByText('EduBase')).not.toBeInTheDocument();
    expect(screen.queryByText('Hotel Alura Management')).not.toBeInTheDocument();
    // Button should change back to "Ver Todo"
    expect(screen.getByRole('button', { name: 'Ver Todo' })).toBeInTheDocument();
  });

  it('toggles multiple times: expand -> collapse -> expand -> collapse', async () => {
    const user = userEvent.setup();
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    // 1st expansion
    await user.click(screen.getByRole('button', { name: 'Ver Todo' }));
    expect(screen.getByText('Hotel Alura Management')).toBeInTheDocument();

    // 1st collapse
    await user.click(screen.getByRole('button', { name: 'Ver Menos' }));
    expect(screen.queryByText('Hotel Alura Management')).not.toBeInTheDocument();

    // 2nd expansion
    await user.click(screen.getByRole('button', { name: 'Ver Todo' }));
    expect(screen.getByText('Hotel Alura Management')).toBeInTheDocument();

    // 2nd collapse
    await user.click(screen.getByRole('button', { name: 'Ver Menos' }));
    expect(screen.queryByText('Hotel Alura Management')).not.toBeInTheDocument();
  });

  it('works with EN translations', async () => {
    const user = userEvent.setup();
    await renderWithProviders(<ProyectosSection />, { lng: 'en' });

    expect(screen.getByRole('button', { name: 'View All' })).toBeInTheDocument();
    expect(screen.getByText('ControlFit')).toBeInTheDocument();
    expect(screen.queryByText('EduBase')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'View All' }));
    expect(screen.getByText('EduBase')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View Less' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'View Less' }));
    expect(screen.queryByText('EduBase')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View All' })).toBeInTheDocument();
  });

  it('renders project cards with repository and action buttons', async () => {
    await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    // Should have multiple repo links and action buttons
    expect(screen.getAllByText('Repositorio').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Ver Proyecto').length).toBeGreaterThan(0);
  });
});