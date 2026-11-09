/**
 * Video URLs are resolved at runtime from one environment variable so the
 * mp4 files never ship inside the Vite build (they live in a GitHub Release).
 */

const VIDEO_FILE_PREFIX = 'videos-';

// Only absolute http(s) or root-relative bases are accepted. A scheme-less
// value would resolve against the current route and 404 without any warning.
const ABSOLUTE_OR_ROOT_PATH = /^(https?:\/\/|\/)/;

/**
 * Builds the public URL of a project video.
 * The env var is read inside the function on purpose: reading it at module
 * scope would freeze the value on first import and defeat test stubbing.
 *
 * @param img - Project image key, e.g. "HotelAlura"
 * @returns The absolute or root-relative URL, or undefined when unavailable
 */
export const getVideoUrl = (img: string): string | undefined => {
  const base = import.meta.env.VITE_VIDEO_BASE_URL?.trim();
  if (!img || !base || !ABSOLUTE_OR_ROOT_PATH.test(base)) return undefined;

  const normalizedBase = base.replace(/\/+$/, '');
  return `${normalizedBase}/${VIDEO_FILE_PREFIX}${img}.mp4`;
};

/**
 * Builds the poster image URL for a project video, reusing the existing
 * project screenshot so no extra asset has to be generated.
 *
 * @param img - Project image key, e.g. "HotelAlura"
 * @returns The poster path, or undefined when there is no project image
 */
export const getVideoPoster = (img: string): string | undefined => {
  if (!img) return undefined;
  return `/assets/proyecto-${img}.webp`;
};
