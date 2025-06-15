
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
