/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

// Merges with vite/client's ImportMetaEnv. Keep this file free of top-level
// import/export statements: any of them turns it into a module and the merge
// silently stops working.
interface ImportMetaEnv {
  readonly VITE_VIDEO_BASE_URL?: string;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}