import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Message } from '../types/chat';
import { Bot, User, Pen } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isTyping, setIsTyping] = useState(message.role === 'assistant');

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (!inline && language) {
        return (
          <SyntaxHighlighter
            language={language}
            style={dracula}
            PreTag="div"
            className="rounded-lg shadow-md my-4"
            showLineNumbers={true}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }
      
      return (
        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
    p({ children }: any) {
      return <p className="mb-4 leading-relaxed">{children}</p>;
    },
    h1({ children }: any) {
      return <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>;
    },
    h2({ children }: any) {
      return <h2 className="text-2xl font-bold mb-3 mt-5">{children}</h2>;
    },
    h3({ children }: any) {
      return <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>;
    },
    ul({ children }: any) {
      return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
    },
    ol({ children }: any) {
      return <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>;
    },
    blockquote({ children }: any) {
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic">
          {children}
        </blockquote>
      );
    },
    table({ children }: any) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {children}
          </table>
        </div>
      );
    },
    th({ children }: any) {
      return (
        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {children}
        </th>
      );
    },
    td({ children }: any) {
      return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          {children}
        </td>
      );
    }
  };

  return (
    <div className={`flex gap-3 ${message.role === 'assistant' ? 'bg-white dark:bg-gray-800/50 shadow-lg' : ''} p-6 rounded-xl transition-colors duration-200`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        message.role === 'assistant' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
      }`}>
        {message.role === 'assistant' ? (
          isTyping ? (
            <Pen className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-bounce" />
          ) : (
            <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          )
        ) : (
          <User className="w-6 h-6 text-green-600 dark:text-green-400" />
        )}
      </div>
      <div className="flex-1">
        {message.image && (
          <img 
            src={message.image} 
            alt="Conteúdo enviado"
            className="max-w-sm rounded-lg mb-4 shadow-md"
          />
        )}
        <div className="prose dark:prose-invert prose-blue max-w-none">
          {message.role === 'assistant' ? (
            <TypewriterText 
              text={message.content}
              speed={30}
              onComplete={() => setIsTyping(false)}
              markdownComponents={MarkdownComponents}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={MarkdownComponents}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          {message.timestamp.toLocaleTimeString('pt-BR')}
        </div>
      </div>
    </div>
  );
}