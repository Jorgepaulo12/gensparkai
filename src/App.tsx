import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { FeatureCards } from './components/FeatureCards';
import { ThemeToggle } from './components/ThemeToggle';
import { generateResponse } from './services/gemini';
import { Message, ChatState } from './types/chat';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const handleSendMessage = async (content: string, image?: string) => {
    if (!content.trim() && !image) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      image,
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await generateResponse(content, image);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Erro no chat:', error);
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Falha ao gerar resposta',
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GenSparkAI</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatState.messages.length === 0 ? (
          <FeatureCards onSelectFeature={handleSendMessage} />
        ) : (
          chatState.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        {chatState.error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-xl text-center shadow-md">
            {chatState.error}
          </div>
        )}
        {chatState.isLoading && (
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
            Pensando...
          </div>
        )}
      </main>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={chatState.isLoading}
      />
    </div>
  );
}

export default App;