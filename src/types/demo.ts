import type { ProyectoId } from './branded';

export type DemoType = 'video' | 'images' | 'interactive';

export interface BaseDemoProps {
  readonly proyectoId: ProyectoId;
  readonly titulo: string;
  readonly descripcion: string;
  readonly stack?: readonly string[];
  readonly year?: string;
  readonly architecturalStack?: {
    readonly frontend: string;
    readonly backend: string;
    readonly database: string;
    readonly infrastructure: string;
    readonly desktop?: string;
    readonly packaging?: string;
  };
}

export interface VideoDemoProps extends BaseDemoProps {
  readonly type: 'video';
  readonly videos: readonly { readonly src: string; readonly titulo: string }[];
  readonly verProyecto?: string;
  readonly credenciales?: { readonly user: string; readonly pass: string } | undefined;
}

export interface ImageGalleryDemoProps extends BaseDemoProps {
  readonly type: 'images';
  readonly images: readonly { readonly src: string; readonly alt: string; readonly titulo: string }[];
  readonly verProyecto?: string;
  readonly credenciales?: { readonly user: string; readonly pass: string } | undefined;
}

export interface InteractiveDemoProps extends BaseDemoProps {
  readonly type: 'interactive';
  readonly iframeUrl: string;
  readonly credenciales?: { readonly user: string; readonly pass: string };
}

export type DemoProps = VideoDemoProps | ImageGalleryDemoProps | InteractiveDemoProps;

export const isVideoDemo = (d: DemoProps): d is VideoDemoProps => d.type === 'video';
export const isImageGalleryDemo = (d: DemoProps): d is ImageGalleryDemoProps => d.type === 'images';
export const isInteractiveDemo = (d: DemoProps): d is InteractiveDemoProps => d.type === 'interactive';