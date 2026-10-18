import type { ProyectoId } from './branded';

export interface ProyectoVerProyecto {
  readonly id: ProyectoId;
  readonly img: string;
  readonly tipo: 'Ver proyecto';
  readonly col: string;
  readonly repo: string;
  readonly ver_proyecto: string;
  readonly imgDemo: { readonly img: readonly string[] };
  readonly stack: readonly string[];
  readonly category: string;
  readonly year: string;
  readonly architecturalStack: {
    readonly frontend: string;
    readonly backend: string;
    readonly database: string;
    readonly infrastructure: string;
  };
  readonly credenciales?: { readonly user: string; readonly pass: string };
}

export interface ProyectoVideo {
  readonly id: ProyectoId;
  readonly img: string;
  readonly tipo: 'Video';
  readonly col: string;
  readonly repo: string;
  readonly stack: readonly string[];
  readonly category: string;
  readonly year: string;
  readonly challenge: string;
  readonly metrics: readonly { readonly value: string; readonly labelES: string; readonly labelEN: string }[];
}

export type Proyecto = ProyectoVerProyecto | ProyectoVideo;

export const isProyectoVerProyecto = (p: Proyecto): p is ProyectoVerProyecto => p.tipo === 'Ver proyecto';
export const isProyectoVideo = (p: Proyecto): p is ProyectoVideo => p.tipo === 'Video';