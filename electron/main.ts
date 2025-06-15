
import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class ElectronApp {
  private mainWindow: BrowserWindow | null = null;

  constructor() {
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    app.whenReady().then(() => this.createMainWindow());
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
    this.setupIpcHandlers();
  }

  private createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'preload.js'),
        webSecurity: true
      },
      titleBarStyle: 'default',
      show: false
    });

    // Load the app
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      this.mainWindow.loadURL('http://localhost:8080');
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(join(__dirname, '../dist/index.html'));
    }

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });
  }

  private onWindowAllClosed = () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  };

  private onActivate = () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createMainWindow();
    }
  };

  private setupIpcHandlers() {
    // Handle Blender detection
    ipcMain.handle('detect-blender', async () => {
      try {
        const { stdout } = await execAsync('blender --version');
        return { success: true, version: stdout.trim() };
      } catch (error) {
        return { success: false, error: 'Blender not found in PATH' };
      }
    });

    // Handle Python script execution in Blender
    ipcMain.handle('execute-blender-script', async (_, scriptPath: string) => {
      try {
        const { stdout, stderr } = await execAsync(`blender --background --python "${scriptPath}"`);
        return { success: true, stdout, stderr };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Handle file operations
    ipcMain.handle('save-config', async (_, config: any) => {
      // Implementation for saving encrypted config
      return { success: true };
    });

    ipcMain.handle('load-config', async () => {
      // Implementation for loading encrypted config
      return { success: true, config: {} };
    });
  }
}

new ElectronApp();
