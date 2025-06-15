
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ReadyScreenProps {
  data: any;
  onComplete: () => void;
  onBack: () => void;
}

const ReadyScreen = ({ data, onComplete, onBack }: ReadyScreenProps) => {
  const getProviderName = (provider: string) => {
    const names = {
      openai: 'OpenAI',
      anthropic: 'Anthropic',
      local: 'Local LLM'
    };
    return names[provider as keyof typeof names] || provider;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-semibold mb-2">Setup Complete!</h2>
        <p className="text-blender-text-muted">
          Your Blender AI Agent is ready to use. Here's what we've configured:
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">AI Provider</h3>
              <p className="text-sm text-blender-text-muted">
                {getProviderName(data.aiProvider)}
              </p>
            </div>
            <div className="text-green-500">✓</div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Blender Integration</h3>
              <p className="text-sm text-blender-text-muted">
                {data.blenderPath === 'blender' ? 'Auto-detected' : 'Manual path'}
              </p>
            </div>
            <div className="text-green-500">✓</div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blender-bg-secondary p-4 rounded-lg">
        <h3 className="font-semibold mb-2">What's Next?</h3>
        <ul className="text-sm text-blender-text-muted space-y-1">
          <li>• Start chatting about your 3D modeling ideas</li>
          <li>• Watch as AI generates Blender Python scripts</li>
          <li>• See your creations come to life automatically</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onComplete} className="btn-primary">
          Start Creating!
        </Button>
      </div>
    </div>
  );
};

export default ReadyScreen;
