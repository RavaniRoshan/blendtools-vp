
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Blender operations
  detectBlender: () => ipcRenderer.invoke('detect-blender'),
  executeBlenderScript: (scriptPath: string) => 
    ipcRenderer.invoke('execute-blender-script', scriptPath),

  // Configuration operations
  saveConfig: (config: any) => ipcRenderer.invoke('save-config', config),
  loadConfig: () => ipcRenderer.invoke('load-config'),

  // System operations
  platform: process.platform,
  versions: process.versions
});

// Type definitions for the exposed API
export interface ElectronAPI {
  detectBlender: () => Promise<{ success: boolean; version?: string; error?: string }>;
  executeBlenderScript: (scriptPath: string) => Promise<{ success: boolean; stdout?: string; stderr?: string; error?: string }>;
  saveConfig: (config: any) => Promise<{ success: boolean }>;
  loadConfig: () => Promise<{ success: boolean; config?: any }>;
  platform: string;
  versions: any;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
