import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../../../test/i18n';
import SobreMiSection from '../SobreMiSection';
import ProyectosSection from '../ProyectosSection';
import FormacionAcademicaSection from '../FormacionAcademicaSection';
import HobbiesSection from '../HobbiesSection';
import ImageGalleryDemo from '../demos/ImageGalleryDemo';
import { asProyectoId } from '../../../types/branded';
import type { ImageGalleryDemoProps } from '../../../types/demo';

const expectDeferredImage = (image: HTMLElement) => {
  expect(image).toHaveAttribute('loading', 'lazy');
  expect(image).toHaveAttribute('decoding', 'async');
};

const galleryProps: ImageGalleryDemoProps = {
  type: 'images',
  proyectoId: asProyectoId(1),
  titulo: 'ControlFit',
  descripcion: 'Demo description',
  stack: ['React'],
  year: '2026',
  images: [
    { src: '/demo/one.webp', alt: 'One', titulo: 'One' },
    { src: '/demo/two.webp', alt: 'Two', titulo: 'Two' },
    { src: '/demo/three.webp', alt: 'Three', titulo: 'Three' },
  ],
};

describe('Below-the-fold images declare deferred loading hints', () => {
  it('defers the about section portrait', async () => {
    const { container } = await renderWithProviders(<SobreMiSection />, { lng: 'es' });

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(1);
    images.forEach(expectDeferredImage);
  });

  it('defers the project card images', async () => {
    const { container } = await renderWithProviders(<ProyectosSection />, { lng: 'es' });

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach(expectDeferredImage);
  });

  it('defers the education card images', async () => {
    const { container } = await renderWithProviders(<FormacionAcademicaSection />, { lng: 'es' });

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach(expectDeferredImage);
  });

  it('defers the hobby images', async () => {
    const { container } = await renderWithProviders(<HobbiesSection />, { lng: 'es' });

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(4);
    images.forEach(expectDeferredImage);
  });

  it('defers the gallery thumbnails but keeps the main image eager', async () => {
    const { container } = await renderWithProviders(
      <ImageGalleryDemo {...galleryProps} />,
      { lng: 'es' }
    );

    const images = Array.from(container.querySelectorAll('img'));
    expect(images).toHaveLength(3);

    expect(images[0]).toHaveAttribute('loading', 'eager');
    images.slice(1).forEach(expectDeferredImage);
  });
});
