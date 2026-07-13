export interface AnalysisResult {
  framework: { name: string; version?: string };
  packageManager: { name: string; version?: string };
  language: string;
  routing: string;
  tailwind: boolean;
  modules: ModuleInfo[];
  providers: string[];
  state: string[];
}

export interface ModuleInfo {
  id: string;
  label: string;
  detected: boolean;
}
