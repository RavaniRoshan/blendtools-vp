
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blender-bg-primary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate('/chat')}
            variant="outline"
            size="sm"
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* AI Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block font-medium mb-2">AI Provider</label>
                <select className="w-full px-3 py-2 border border-blender-border-secondary rounded-md bg-blender-bg-secondary">
                  <option>OpenAI</option>
                  <option>Anthropic</option>
                  <option>Local LLM</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-2">API Key</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-blender-border-secondary rounded-md bg-blender-bg-secondary"
                />
              </div>
              <Button className="btn-primary">Test Connection</Button>
            </CardContent>
          </Card>

          {/* Blender Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Blender Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Blender Path</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/path/to/blender"
                    className="flex-1 px-3 py-2 border border-blender-border-secondary rounded-md bg-blender-bg-secondary"
                  />
                  <Button variant="outline">Browse</Button>
                </div>
              </div>
              <Button className="btn-primary">Detect Blender</Button>
            </CardContent>
          </Card>

          {/* Application Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Auto-execute scripts</label>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Show notifications</label>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Start minimized</label>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blender-text-muted">
                Blender AI Agent v1.0.0
              </p>
              <p className="text-sm text-blender-text-muted mt-2">
                Transform your ideas into 3D models through AI-powered conversations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
