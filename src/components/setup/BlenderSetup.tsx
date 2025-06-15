
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BlenderSetupProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const BlenderSetup = ({ data, onUpdate, onNext, onBack }: BlenderSetupProps) => {
  const [blenderPath, setBlenderPath] = useState(data.blenderPath || '');
  const [detectionStatus, setDetectionStatus] = useState<'idle' | 'detecting' | 'found' | 'not-found'>('idle');
  const [blenderVersion, setBlenderVersion] = useState('');

  useEffect(() => {
    detectBlender();
  }, []);

  const detectBlender = async () => {
    setDetectionStatus('detecting');
    
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.detectBlender();
        if (result.success) {
          setDetectionStatus('found');
          setBlenderVersion(result.version || '');
          setBlenderPath('blender'); // Found in PATH
        } else {
          setDetectionStatus('not-found');
        }
      } else {
        // Fallback for web version
        setDetectionStatus('not-found');
      }
    } catch (error) {
      setDetectionStatus('not-found');
    }
  };

  const handleManualPath = () => {
    // In a real Electron app, this would open a file dialog
    const path = prompt('Enter the path to your Blender executable:');
    if (path) {
      setBlenderPath(path);
      setDetectionStatus('found');
    }
  };

  const proceedToNext = () => {
    onUpdate({ blenderPath });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Blender Detection</h2>
        <p className="text-blender-text-muted">
          We need to locate your Blender installation to execute scripts.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Auto-Detection</h3>
            <Button 
              onClick={detectBlender}
              disabled={detectionStatus === 'detecting'}
              variant="outline"
              size="sm"
            >
              {detectionStatus === 'detecting' ? 'Detecting...' : 'Retry'}
            </Button>
          </div>

          <div className="space-y-3">
            {detectionStatus === 'detecting' && (
              <div className="flex items-center text-blender-text-muted">
                <div className="animate-spin w-4 h-4 border-2 border-blender-accent-primary border-t-transparent rounded-full mr-2"></div>
                Searching for Blender...
              </div>
            )}

            {detectionStatus === 'found' && (
              <div className="flex items-center text-green-600">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Blender found! {blenderVersion && `(${blenderVersion})`}
              </div>
            )}

            {detectionStatus === 'not-found' && (
              <div className="flex items-center text-orange-600">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                Blender not found in system PATH
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {detectionStatus === 'not-found' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Manual Setup</h3>
            <p className="text-sm text-blender-text-muted mb-4">
              Click the button below to manually select your Blender executable.
            </p>
            <Button onClick={handleManualPath} variant="outline">
              Browse for Blender
            </Button>
            {blenderPath && (
              <p className="text-xs text-blender-text-muted mt-2">
                Selected: {blenderPath}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button 
          onClick={proceedToNext}
          disabled={detectionStatus !== 'found' && !blenderPath}
          className="btn-primary"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default BlenderSetup;
