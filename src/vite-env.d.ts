
/// <reference types="vite/client" />

// Electron API type definitions
interface ElectronAPI {
  detectBlender: () => Promise<{ success: boolean; version?: string; error?: string }>;
  executeBlenderScript: (scriptPath: string) => Promise<{ success: boolean; stdout?: string; stderr?: string; error?: string }>;
  saveConfig: (config: any) => Promise<{ success: boolean }>;
  loadConfig: () => Promise<{ success: boolean; config?: any }>;
  platform: string;
  versions: any;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
