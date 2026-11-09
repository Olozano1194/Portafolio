import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithProviders } from '../../../test/i18n';
import App from '../../../App';
import VideoDemo from '../demos/VideoDemo';

// Wrap the real component so the test can inspect the props DemoSection passes
// to it while still rendering the actual fallback UI.
vi.mock('../demos/VideoDemo', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../demos/VideoDemo')>();
  return { default: vi.fn(actual.default) };
});

describe('DemoSection — video fallback without a configured base', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('passes an empty videos list and renders the localized fallback', async () => {
    vi.stubEnv('VITE_VIDEO_BASE_URL', '');

    // /demo/3 is TaskReact, the project whose tipo is "Video".
    await renderWithProviders(<App />, { route: '/demo/3', lng: 'es' });

    expect(
      await screen.findByText('El video no está disponible en este momento.')
    ).toBeInTheDocument();

    const videoDemoCalls = vi.mocked(VideoDemo).mock.calls;
    expect(videoDemoCalls.length).toBeGreaterThan(0);
    expect(videoDemoCalls[0]?.[0].videos).toEqual([]);

    expect(document.querySelector('video')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Video anterior' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Video siguiente' })).toBeNull();
  });
});
