import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/i18n';
import Skeleton from '../Skeleton';

describe('Skeleton', () => {
  it('announces a loading state and keeps the height from the caller', async () => {
    await renderWithProviders(<Skeleton className="min-h-96" />);

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(status).toHaveTextContent('Cargando…');
    expect(status).toHaveClass('min-h-96');
  });
});
