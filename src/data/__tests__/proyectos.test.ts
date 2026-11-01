import { describe, it, expect } from 'vitest';
import { proyectos } from '../proyectos';
import { isProyectoVerProyecto } from '../../types/proyecto';

describe('proyectos data', () => {
  it('has unique project ids', () => {
    const ids = proyectos.map((proyecto) => proyecto.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every "Ver proyecto" entry at least one demo image', () => {
    const conDemo = proyectos.filter(isProyectoVerProyecto);

    expect(conDemo.length).toBeGreaterThan(0);
    for (const proyecto of conDemo) {
      expect(proyecto.imgDemo.img.length).toBeGreaterThan(0);
    }
  });
});
