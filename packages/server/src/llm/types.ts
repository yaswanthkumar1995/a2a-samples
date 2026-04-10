export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
}

export type ProviderName = 'openai';

export interface ChatRequestBody {
  provider: ProviderName;
  messages: ChatMessage[];
  model?: string;
}

export interface ChatProvider {
  sendChat: (body: ChatRequestBody) => Promise<ChatMessage>;
}
