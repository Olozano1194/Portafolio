import { describe, it, expect } from 'vitest';
import {
  type Proyecto,
  isProyectoVerProyecto,
  isProyectoVideo,
} from '../proyecto';
import type { ProyectoId } from '../branded';

const asProyectoId = (n: number): ProyectoId => n as ProyectoId;

const baseVerProyecto = {
  id: asProyectoId(1),
  img: 'project.jpg',
  tipo: 'Ver proyecto' as const,
  col: 'col-1',
  repo: 'https://github.com/user/repo',
  ver_proyecto: 'https://example.com/project',
  imgDemo: { img: ['demo1.jpg', 'demo2.jpg'] },
  stack: ['React', 'TypeScript'],
  category: 'Web',
  year: '2024',
  architecturalStack: {
    frontend: 'React',
    backend: 'Node.js',
    database: 'PostgreSQL',
    infrastructure: 'AWS',
  },
  credenciales: { user: 'test', pass: 'pass' },
};

const baseVideo = {
  id: asProyectoId(2),
  img: 'project2.jpg',
  tipo: 'Video' as const,
  col: 'col-2',
  repo: 'https://github.com/user/repo2',
  stack: ['Vue', 'TypeScript'],
  category: 'Mobile',
  year: '2023',
  challenge: 'Build a mobile app',
  metrics: [
    { value: '1000', labelES: 'Usuarios', labelEN: 'Users' },
    { value: '50', labelES: 'Crash-free', labelEN: 'Crash-free' },
  ],
};

describe('Proyecto type guards', () => {
  describe('isProyectoVerProyecto', () => {
    it('returns true for valid ProyectoVerProyecto', () => {
      const proyecto: Proyecto = { ...baseVerProyecto };
      expect(isProyectoVerProyecto(proyecto)).toBe(true);
    });

    it('returns false for ProyectoVideo', () => {
      const proyecto: Proyecto = { ...baseVideo };
      expect(isProyectoVerProyecto(proyecto)).toBe(false);
    });

    it('returns false when tipo is missing', () => {
      const invalid = { ...baseVerProyecto, tipo: undefined } as unknown as Proyecto;
      expect(isProyectoVerProyecto(invalid)).toBe(false);
    });

    it('returns false when tipo is wrong value', () => {
      const invalid = { ...baseVerProyecto, tipo: 'Video' } as unknown as Proyecto;
      expect(isProyectoVerProyecto(invalid)).toBe(false);
    });

    it('returns true for tipo Ver proyecto even when required fields are missing (type guard only checks discriminant)', () => {
      const invalid = { id: asProyectoId(1), tipo: 'Ver proyecto' } as unknown as Proyecto;
      expect(isProyectoVerProyecto(invalid)).toBe(true);
    });

    it('returns true for tipo Ver proyecto even when imgDemo is missing (type guard only checks discriminant)', () => {
      const invalid = { ...baseVerProyecto, imgDemo: undefined } as unknown as Proyecto;
      expect(isProyectoVerProyecto(invalid)).toBe(true);
    });

    it('returns true for tipo Ver proyecto even when architecturalStack is missing (type guard only checks discriminant)', () => {
      const invalid = { ...baseVerProyecto, architecturalStack: undefined } as unknown as Proyecto;
      expect(isProyectoVerProyecto(invalid)).toBe(true);
    });
  });

  describe('isProyectoVideo', () => {
    it('returns true for valid ProyectoVideo', () => {
      const proyecto: Proyecto = { ...baseVideo };
      expect(isProyectoVideo(proyecto)).toBe(true);
    });

    it('returns false for ProyectoVerProyecto', () => {
      const proyecto: Proyecto = { ...baseVerProyecto };
      expect(isProyectoVideo(proyecto)).toBe(false);
    });

    it('returns false when tipo is missing', () => {
      const invalid = { ...baseVideo, tipo: undefined } as unknown as Proyecto;
      expect(isProyectoVideo(invalid)).toBe(false);
    });

    it('returns false when tipo is wrong value', () => {
      const invalid = { ...baseVideo, tipo: 'Ver proyecto' } as unknown as Proyecto;
      expect(isProyectoVideo(invalid)).toBe(false);
    });

    it('returns true for tipo Video even when required fields are missing (type guard only checks discriminant)', () => {
      const invalid = { id: asProyectoId(1), tipo: 'Video' } as unknown as Proyecto;
      expect(isProyectoVideo(invalid)).toBe(true);
    });

    it('returns true for tipo Video even when challenge is missing (type guard only checks discriminant)', () => {
      const invalid = { ...baseVideo, challenge: undefined } as unknown as Proyecto;
      expect(isProyectoVideo(invalid)).toBe(true);
    });

    it('returns true for tipo Video even when metrics is missing (type guard only checks discriminant)', () => {
      const invalid = { ...baseVideo, metrics: undefined } as unknown as Proyecto;
      expect(isProyectoVideo(invalid)).toBe(true);
    });

    it('returns true for tipo Video even when metrics array has invalid item (type guard only checks discriminant)', () => {
      const invalid = {
        ...baseVideo,
        metrics: [{ value: '1000' } as { value: string; labelES?: string; labelEN?: string }],
      } as unknown as Proyecto;
      expect(isProyectoVideo(invalid)).toBe(true);
    });
  });
});