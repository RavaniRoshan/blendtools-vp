
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AISetupProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const AISetup = ({ data, onUpdate, onNext }: AISetupProps) => {
  const [selectedProvider, setSelectedProvider] = useState(data.aiProvider || '');
  const [apiKey, setApiKey] = useState(data.apiKey || '');
  const [isValidating, setIsValidating] = useState(false);

  const providers = [
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'GPT-4, GPT-3.5 Turbo',
      icon: '🤖'
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      description: 'Claude 3.5 Sonnet, Claude 3 Opus',
      icon: '🧠'
    },
    {
      id: 'local',
      name: 'Local LLM',
      description: 'Ollama, LM Studio, etc.',
      icon: '🏠'
    }
  ];

  const validateAndProceed = async () => {
    if (!selectedProvider) return;
    
    setIsValidating(true);
    
    // Simulate API validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onUpdate({ aiProvider: selectedProvider, apiKey });
    setIsValidating(false);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose Your AI Provider</h2>
        <p className="text-blender-text-muted">
          Select the AI service you'd like to use for generating Blender scripts.
        </p>
      </div>

      <div className="grid gap-4">
        {providers.map(provider => (
          <Card 
            key={provider.id}
            className={`cursor-pointer transition-all hover:border-blender-accent-primary ${
              selectedProvider === provider.id 
                ? 'border-blender-accent-primary bg-blender-accent-primary/5' 
                : ''
            }`}
            onClick={() => setSelectedProvider(provider.id)}
          >
            <CardContent className="flex items-center p-4">
              <div className="text-2xl mr-4">{provider.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{provider.name}</h3>
                <p className="text-sm text-blender-text-muted">{provider.description}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedProvider === provider.id 
                  ? 'bg-blender-accent-primary border-blender-accent-primary' 
                  : 'border-gray-300'
              }`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProvider && selectedProvider !== 'local' && (
        <div className="space-y-2">
          <label htmlFor="apiKey" className="block font-medium">
            API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-3 py-2 border border-blender-border-secondary rounded-md bg-blender-bg-secondary focus:outline-none focus:border-blender-accent-primary"
          />
          <p className="text-xs text-blender-text-muted">
            Your API key is stored securely and never shared.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={validateAndProceed}
          disabled={!selectedProvider || (selectedProvider !== 'local' && !apiKey) || isValidating}
          className="btn-primary"
        >
          {isValidating ? 'Validating...' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
};

export default AISetup;
