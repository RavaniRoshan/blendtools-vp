
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Blender AI Assistant. Describe what you\'d like to create in 3D and I\'ll generate the Blender script for you.'
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: 'I\'ll help you create that! Let me generate a Blender script...' }
    ];

    setMessages(newMessages);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-blender-bg-primary flex flex-col">
      {/* Header */}
      <header className="bg-blender-bg-secondary border-b border-blender-divider p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blender-accent-primary to-blender-accent-secondary bg-clip-text text-transparent">
            🤖 Blender AI Agent
          </h1>
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-md ${
              msg.role === 'user' 
                ? 'bg-blender-accent-primary text-white' 
                : 'bg-blender-bg-secondary'
            }`}>
              <CardContent className="p-3">
                <p className="text-sm">{msg.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-blender-divider p-4">
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe what you want to create in Blender..."
            className="flex-1 min-h-[44px] max-h-32 px-3 py-2 border border-blender-border-secondary rounded-md bg-blender-bg-secondary focus:outline-none focus:border-blender-accent-primary resize-none"
            rows={1}
          />
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="btn-primary px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
