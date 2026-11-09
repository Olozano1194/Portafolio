import { describe, it, expect, vi, afterEach } from 'vitest';
import { getVideoUrl, getVideoPoster } from '../videoUrl';

const BASE = 'https://x.test/media';
const ENV_KEY = 'VITE_VIDEO_BASE_URL';

describe('getVideoUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('builds the URL from an absolute base without a trailing slash', () => {
    vi.stubEnv(ENV_KEY, BASE);
    expect(getVideoUrl('TaskReact')).toBe('https://x.test/media/videos-TaskReact.mp4');
  });

  it('collapses a single trailing slash on the base', () => {
    vi.stubEnv(ENV_KEY, `${BASE}/`);
    expect(getVideoUrl('TaskReact')).toBe('https://x.test/media/videos-TaskReact.mp4');
  });

  it('collapses multiple trailing slashes on the base', () => {
    vi.stubEnv(ENV_KEY, `${BASE}///`);
    expect(getVideoUrl('TaskReact')).toBe('https://x.test/media/videos-TaskReact.mp4');
  });

  it('trims surrounding whitespace from the base', () => {
    vi.stubEnv(ENV_KEY, `  ${BASE}  `);
    expect(getVideoUrl('TaskReact')).toBe('https://x.test/media/videos-TaskReact.mp4');
  });

  it('returns undefined when the env var is absent', () => {
    vi.stubEnv(ENV_KEY, undefined);
    expect(getVideoUrl('TaskReact')).toBeUndefined();
  });

  it('returns undefined when the env var is empty or blank', () => {
    vi.stubEnv(ENV_KEY, '');
    expect(getVideoUrl('TaskReact')).toBeUndefined();

    vi.stubEnv(ENV_KEY, '   ');
    expect(getVideoUrl('TaskReact')).toBeUndefined();
  });

  it('returns undefined for a scheme-less base', () => {
    vi.stubEnv(ENV_KEY, 'example.com/media');
    expect(getVideoUrl('TaskReact')).toBeUndefined();
  });

  it('keeps a root-relative base', () => {
    vi.stubEnv(ENV_KEY, '/media');
    expect(getVideoUrl('HotelAlura')).toBe('/media/videos-HotelAlura.mp4');
  });

  it('returns undefined when the project image key is empty', () => {
    vi.stubEnv(ENV_KEY, BASE);
    expect(getVideoUrl('')).toBeUndefined();
  });
});

describe('getVideoPoster', () => {
  it('derives the poster path from the project image key', () => {
    expect(getVideoPoster('HotelAlura')).toBe('/assets/proyecto-HotelAlura.webp');
  });

  it('returns undefined when the project image key is empty', () => {
    expect(getVideoPoster('')).toBeUndefined();
  });
});

describe('video URL helpers', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('never throws, whatever the env var or the input looks like', () => {
    const envValues = [undefined, '', '   ', 'example.com/media', '/media', BASE, `${BASE}///`];
    const imageKeys = ['', 'HotelAlura', 'TaskReact'];

    for (const envValue of envValues) {
      vi.stubEnv(ENV_KEY, envValue);
      for (const imageKey of imageKeys) {
        expect(() => getVideoUrl(imageKey)).not.toThrow();
        expect(() => getVideoPoster(imageKey)).not.toThrow();
      }
    }
  });
});
