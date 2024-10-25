/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_PARLAY_PRO_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }