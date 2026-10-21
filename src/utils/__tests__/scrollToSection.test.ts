import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scrollToSection } from '../scrollToSection';

describe('scrollToSection', () => {
  const mockScrollTo = vi.fn();
  const mockGetBoundingClientRect = vi.fn();
  const mockGetElementById = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup window.scrollTo spy
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window, 'pageYOffset', {
      value: 100,
      writable: true,
      configurable: true,
    });
  });

  it('scrolls to element when target exists', () => {
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect.mockReturnValue({
        top: 500,
        left: 0,
        bottom: 600,
        right: 800,
        width: 800,
        height: 100,
        x: 0,
        y: 500,
      }),
    };

    mockGetElementById.mockReturnValue(mockElement);
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true,
      configurable: true,
    });

    scrollToSection('test-section');

    expect(mockGetElementById).toHaveBeenCalledWith('test-section');
    expect(mockGetBoundingClientRect).toHaveBeenCalled();
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 500 + 100 - 64, // elementPosition + pageYOffset - headerOffset
      behavior: 'smooth',
    });
  });

  it('does not scroll when target element is missing', () => {
    mockGetElementById.mockReturnValue(null);
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true,
      configurable: true,
    });

    scrollToSection('missing-section');

    expect(mockGetElementById).toHaveBeenCalledWith('missing-section');
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('does not throw when target element is missing', () => {
    mockGetElementById.mockReturnValue(null);
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true,
      configurable: true,
    });

    expect(() => scrollToSection('missing-section')).not.toThrow();
  });

  it('calculates correct offset with headerOffset', () => {
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect.mockReturnValue({
        top: 0,
        left: 0,
        bottom: 100,
        right: 800,
        width: 800,
        height: 100,
        x: 0,
        y: 0,
      }),
    };

    mockGetElementById.mockReturnValue(mockElement);
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true,
      configurable: true,
    });

    scrollToSection('top-section');

    // element at top (0) + pageYOffset (100) - headerOffset (64) = 36
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 36,
      behavior: 'smooth',
    });
  });

  it('handles element below viewport', () => {
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect.mockReturnValue({
        top: 1000,
        left: 0,
        bottom: 1100,
        right: 800,
        width: 800,
        height: 100,
        x: 0,
        y: 1000,
      }),
    };

    mockGetElementById.mockReturnValue(mockElement);
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true,
      configurable: true,
    });

    scrollToSection('bottom-section');

    // elementPosition (1000) + pageYOffset (100) - headerOffset (64) = 1036
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 1036,
      behavior: 'smooth',
    });
  });
});