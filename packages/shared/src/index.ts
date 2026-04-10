export const APP_NAME = 'BoltDyad';

export type ModelProvider =
  | 'openai'
  | 'anthropic'
  | 'ollama'
  | 'openrouter'
  | 'groq'
  | 'gemini';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
}