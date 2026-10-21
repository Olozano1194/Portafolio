import { describe, it, expect } from 'vitest';
import {
  type DemoProps,
  isVideoDemo,
  isImageGalleryDemo,
  isInteractiveDemo,
} from '../demo';
import type { ProyectoId } from '../branded';

const asProyectoId = (n: number): ProyectoId => n as ProyectoId;

const baseDemo = {
  proyectoId: asProyectoId(1),
  titulo: 'Test Project',
  descripcion: 'Test description',
  stack: ['React', 'TypeScript'],
  year: '2024',
  architecturalStack: {
    frontend: 'React',
    backend: 'Node.js',
    database: 'PostgreSQL',
    infrastructure: 'AWS',
  },
};

describe('Demo type guards', () => {
  describe('isVideoDemo', () => {
    it('returns true for valid VideoDemoProps', () => {
      const videoDemo: DemoProps = {
        ...baseDemo,
        type: 'video',
        videos: [
          { src: 'video1.mp4', titulo: 'Video 1' },
          { src: 'video2.mp4', titulo: 'Video 2' },
        ],
        verProyecto: 'https://example.com',
        credenciales: { user: 'test', pass: 'pass' },
      };
      expect(isVideoDemo(videoDemo)).toBe(true);
    });

    it('returns false for ImageGalleryDemoProps', () => {
      const imageDemo: DemoProps = {
        ...baseDemo,
        type: 'images',
        images: [{ src: 'img1.jpg', alt: 'Image 1', titulo: 'Image 1' }],
      };
      expect(isVideoDemo(imageDemo)).toBe(false);
    });

    it('returns false for InteractiveDemoProps', () => {
      const interactiveDemo: DemoProps = {
        ...baseDemo,
        type: 'interactive',
        iframeUrl: 'https://example.com/iframe',
      };
      expect(isVideoDemo(interactiveDemo)).toBe(false);
    });

    it('returns true for type video even when videos array is missing (type guard only checks discriminant)', () => {
      const invalid = {
        ...baseDemo,
        type: 'video',
        verProyecto: 'https://example.com',
      } as unknown as DemoProps;
      expect(isVideoDemo(invalid)).toBe(true);
    });

    it('returns false when type is wrong', () => {
      const invalid = {
        ...baseDemo,
        type: 'images',
        videos: [{ src: 'video1.mp4', titulo: 'Video 1' }],
      } as unknown as DemoProps;
      expect(isVideoDemo(invalid)).toBe(false);
    });
  });

  describe('isImageGalleryDemo', () => {
    it('returns true for valid ImageGalleryDemoProps', () => {
      const imageDemo: DemoProps = {
        ...baseDemo,
        type: 'images',
        images: [
          { src: 'img1.jpg', alt: 'Image 1', titulo: 'Image 1' },
          { src: 'img2.jpg', alt: 'Image 2', titulo: 'Image 2' },
        ],
        verProyecto: 'https://example.com',
      };
      expect(isImageGalleryDemo(imageDemo)).toBe(true);
    });

    it('returns false for VideoDemoProps', () => {
      const videoDemo: DemoProps = {
        ...baseDemo,
        type: 'video',
        videos: [{ src: 'video1.mp4', titulo: 'Video 1' }],
      };
      expect(isImageGalleryDemo(videoDemo)).toBe(false);
    });

    it('returns false for InteractiveDemoProps', () => {
      const interactiveDemo: DemoProps = {
        ...baseDemo,
        type: 'interactive',
        iframeUrl: 'https://example.com/iframe',
      };
      expect(isImageGalleryDemo(interactiveDemo)).toBe(false);
    });

    it('returns true for type images even when images array is missing (type guard only checks discriminant)', () => {
      const invalid = {
        ...baseDemo,
        type: 'images',
        verProyecto: 'https://example.com',
      } as unknown as DemoProps;
      expect(isImageGalleryDemo(invalid)).toBe(true);
    });

    it('returns true for type images even with invalid item (type guard only checks discriminant)', () => {
      const invalid = {
        ...baseDemo,
        type: 'images',
        images: [{ src: 'img1.jpg' } as { src: string; alt?: string; titulo?: string }],
      } as unknown as DemoProps;
      expect(isImageGalleryDemo(invalid)).toBe(true);
    });
  });

  describe('isInteractiveDemo', () => {
    it('returns true for valid InteractiveDemoProps', () => {
      const interactiveDemo: DemoProps = {
        ...baseDemo,
        type: 'interactive',
        iframeUrl: 'https://example.com/iframe',
        credenciales: { user: 'test', pass: 'pass' },
      };
      expect(isInteractiveDemo(interactiveDemo)).toBe(true);
    });

    it('returns true for InteractiveDemoProps without credenciales', () => {
      const interactiveDemo: DemoProps = {
        ...baseDemo,
        type: 'interactive',
        iframeUrl: 'https://example.com/iframe',
      };
      expect(isInteractiveDemo(interactiveDemo)).toBe(true);
    });

    it('returns false for VideoDemoProps', () => {
      const videoDemo: DemoProps = {
        ...baseDemo,
        type: 'video',
        videos: [{ src: 'video1.mp4', titulo: 'Video 1' }],
      };
      expect(isInteractiveDemo(videoDemo)).toBe(false);
    });

    it('returns false for ImageGalleryDemoProps', () => {
      const imageDemo: DemoProps = {
        ...baseDemo,
        type: 'images',
        images: [{ src: 'img1.jpg', alt: 'Image 1', titulo: 'Image 1' }],
      };
      expect(isInteractiveDemo(imageDemo)).toBe(false);
    });

    it('returns true for type interactive even when iframeUrl is missing (type guard only checks discriminant)', () => {
      const invalid = {
        ...baseDemo,
        type: 'interactive',
      } as unknown as DemoProps;
      expect(isInteractiveDemo(invalid)).toBe(true);
    });

    it('returns false when type is wrong', () => {
      const invalid = {
        ...baseDemo,
        type: 'video',
        iframeUrl: 'https://example.com/iframe',
      } as unknown as DemoProps;
      expect(isInteractiveDemo(invalid)).toBe(false);
    });
  });
});