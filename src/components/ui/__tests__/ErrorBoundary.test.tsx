import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/i18n';
import ErrorBoundary from '../ErrorBoundary';

const Boom = () => {
  throw new Error('boom');
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders its children while nothing throws', async () => {
    await renderWithProviders(
      <ErrorBoundary titleKey="errorBoundary.demoTitle">
        <p>contenido sano</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('contenido sano')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders a focused alert with the scoped message when a child throws', async () => {
    await renderWithProviders(
      <ErrorBoundary titleKey="errorBoundary.demoTitle">
        <Boom />
      </ErrorBoundary>,
    );

    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent('No pudimos cargar la demo');
    expect(alert).toHaveTextContent('Algo falló al cargar esta sección. Inténtalo de nuevo.');
    expect(screen.getByRole('button', { name: 'Reintentar' })).toHaveFocus();
  });

  it('calls onRetry instead of reloading when the fallback button is pressed', async () => {
    const onRetry = vi.fn();

    await renderWithProviders(
      <ErrorBoundary titleKey="errorBoundary.videoTitle" onRetry={onRetry}>
        <Boom />
      </ErrorBoundary>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('logs the failure through console.error', async () => {
    await renderWithProviders(
      <ErrorBoundary titleKey="errorBoundary.homeTitle">
        <Boom />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.anything(),
    );
  });
});
