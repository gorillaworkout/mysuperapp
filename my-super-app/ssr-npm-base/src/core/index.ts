// ESMX Core Utilities
export interface EsmxOptions {
  modules: {
    links: Record<string, string>;
    imports: Record<string, string>;
    exports: string[];
  };
}

export interface ModuleConfig {
  name: string;
  path: string;
  dependencies: string[];
}