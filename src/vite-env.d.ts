
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// Declare markdown modules
declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}
