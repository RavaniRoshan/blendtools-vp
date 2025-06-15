
export interface AppConfig {
  aiProvider: string;
  apiKey: string;
  blenderPath: string;
  autoExecute: boolean;
  showNotifications: boolean;
  startMinimized: boolean;
}

export class ConfigService {
  private static readonly CONFIG_KEY = 'blender-ai-agent-config';

  static async saveConfig(config: Partial<AppConfig>): Promise<void> {
    try {
      if (window.electronAPI) {
        await window.electronAPI.saveConfig(config);
      } else {
        // Fallback to localStorage for web version
        const existingConfig = this.loadConfigFromStorage();
        const updatedConfig = { ...existingConfig, ...config };
        localStorage.setItem(this.CONFIG_KEY, JSON.stringify(updatedConfig));
      }
    } catch (error) {
      console.error('Failed to save config:', error);
      throw error;
    }
  }

  static async loadConfig(): Promise<AppConfig> {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.loadConfig();
        return result.config || this.getDefaultConfig();
      } else {
        // Fallback to localStorage for web version
        return this.loadConfigFromStorage();
      }
    } catch (error) {
      console.error('Failed to load config:', error);
      return this.getDefaultConfig();
    }
  }

  private static loadConfigFromStorage(): AppConfig {
    try {
      const stored = localStorage.getItem(this.CONFIG_KEY);
      if (stored) {
        return { ...this.getDefaultConfig(), ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to parse stored config:', error);
    }
    return this.getDefaultConfig();
  }

  private static getDefaultConfig(): AppConfig {
    return {
      aiProvider: '',
      apiKey: '',
      blenderPath: '',
      autoExecute: true,
      showNotifications: true,
      startMinimized: false
    };
  }

  static async validateConfig(config: AppConfig): Promise<boolean> {
    // Validate AI provider and API key
    if (!config.aiProvider) return false;
    if (config.aiProvider !== 'local' && !config.apiKey) return false;
    
    // Validate Blender path
    if (!config.blenderPath) return false;

    return true;
  }
}
