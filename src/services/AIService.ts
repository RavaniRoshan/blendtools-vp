
export interface AIProvider {
  name: string;
  apiKey?: string;
  baseUrl?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class AIService {
  private provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  async generateBlenderScript(prompt: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a Blender Python scripting expert. Generate clean, executable Python scripts for Blender based on user descriptions. Always include proper imports and error handling.`
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      const response = await this.sendChatRequest(messages);
      return this.extractPythonCode(response);
    } catch (error) {
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }

  private async sendChatRequest(messages: ChatMessage[]): Promise<string> {
    switch (this.provider.name) {
      case 'openai':
        return this.sendOpenAIRequest(messages);
      case 'anthropic':
        return this.sendAnthropicRequest(messages);
      case 'local':
        return this.sendLocalRequest(messages);
      default:
        throw new Error(`Unsupported provider: ${this.provider.name}`);
    }
  }

  private async sendOpenAIRequest(messages: ChatMessage[]): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.provider.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async sendAnthropicRequest(messages: ChatMessage[]): Promise<string> {
    // Implementation for Anthropic API
    throw new Error('Anthropic integration not yet implemented');
  }

  private async sendLocalRequest(messages: ChatMessage[]): Promise<string> {
    // Implementation for local LLM
    throw new Error('Local LLM integration not yet implemented');
  }

  private extractPythonCode(response: string): string {
    const codeBlocks = response.match(/```python\n([\s\S]*?)\n```/g);
    if (codeBlocks && codeBlocks.length > 0) {
      return codeBlocks[0].replace(/```python\n?/, '').replace(/\n?```/, '');
    }
    return response;
  }
}
