interface ImportMetaEnv {
  readonly VITE_BASE_MENU_API_URL: string;
  readonly VITE_HEADER_MENU_ID: number;
  readonly VITE_FOOTER_MENU_ID: number;
  readonly VITE_SOCIAL_MENU_ID: number;
  readonly VITE_SEARCH_ENGINE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
