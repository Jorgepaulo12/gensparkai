import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string, image?: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || image) {
      onSendMessage(message, image);
      setMessage('');
      setImage(undefined);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      {image && (
        <div className="mb-4">
          <img src={image} alt="Pré-visualização" className="max-h-32 rounded-lg shadow-md" />
          <button
            type="button"
            onClick={() => setImage(undefined)}
            className="text-red-500 dark:text-red-400 text-sm mt-2 hover:text-red-600 dark:hover:text-red-300"
          >
            Remover imagem
          </button>
        </div>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ImageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || (!message.trim() && !image)}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}