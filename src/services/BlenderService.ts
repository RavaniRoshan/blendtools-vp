
export interface BlenderInfo {
  version: string;
  path: string;
  isValid: boolean;
}

export class BlenderService {
  private blenderPath: string;

  constructor(blenderPath: string) {
    this.blenderPath = blenderPath;
  }

  async detectBlender(): Promise<BlenderInfo> {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.detectBlender();
        return {
          version: result.version || 'Unknown',
          path: this.blenderPath,
          isValid: result.success
        };
      }
      
      // Fallback for web version
      return {
        version: 'Unknown',
        path: this.blenderPath,
        isValid: false
      };
    } catch (error) {
      return {
        version: 'Unknown',
        path: this.blenderPath,
        isValid: false
      };
    }
  }

  async executeScript(scriptContent: string): Promise<{ success: boolean; output?: string; error?: string }> {
    try {
      // Create temporary script file
      const tempScriptPath = await this.createTempScript(scriptContent);
      
      if (window.electronAPI) {
        const result = await window.electronAPI.executeBlenderScript(tempScriptPath);
        return {
          success: result.success,
          output: result.stdout,
          error: result.error || result.stderr
        };
      }

      return {
        success: false,
        error: 'Electron API not available'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  private async createTempScript(content: string): Promise<string> {
    // In a real Electron app, this would create a temporary file
    // For now, we'll use a placeholder path
    return `/tmp/blender_script_${Date.now()}.py`;
  }

  async getSceneInfo(): Promise<any> {
    const infoScript = `
import bpy
import json

scene_info = {
    'objects': len(bpy.context.scene.objects),
    'meshes': len([obj for obj in bpy.context.scene.objects if obj.type == 'MESH']),
    'cameras': len([obj for obj in bpy.context.scene.objects if obj.type == 'CAMERA']),
    'lights': len([obj for obj in bpy.context.scene.objects if obj.type == 'LIGHT'])
}

print(json.dumps(scene_info))
`;

    const result = await this.executeScript(infoScript);
    if (result.success && result.output) {
      try {
        return JSON.parse(result.output.trim());
      } catch {
        return null;
      }
    }
    return null;
  }
}
