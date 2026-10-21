import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import * as scrollUtils from '../../../utils/scrollToSection';

describe('ScrollToTop', () => {
  let originalScrollTo: typeof window.scrollTo;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(scrollUtils, 'scrollToSection').mockImplementation(vi.fn());
    originalScrollTo = window.scrollTo;
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    vi.clearAllMocks();
  });

  const renderWithScrollToTop = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/page1" element={<div>Page 1</div>} />
          <Route path="/page2" element={<div>Page 2</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <ScrollToTop />
      </MemoryRouter>
    );
  };

  it('calls window.scrollTo({ top: 0, behavior: "instant" }) on initial render', () => {
    renderWithScrollToTop('/');

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('scrolls to top on initial render', () => {
    renderWithScrollToTop('/');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('renders without throwing', () => {
    expect(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <ScrollToTop />
        </MemoryRouter>
      );
    }).not.toThrow();
  });
});