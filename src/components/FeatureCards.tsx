import React from 'react';
import { Code2, Image as ImageIcon, Calculator, MessageSquare, Sparkles } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

interface FeatureCardsProps {
  onSelectFeature: (prompt: string) => void;
}

export function FeatureCards({ onSelectFeature }: FeatureCardsProps) {
  const features = [
    {
      icon: Code2,
      title: 'Desenvolvimento de Código',
      description: '🚀 Crie códigos perfeitos em segundos! Suporte para várias linguagens de programação.',
      prompt: 'Preciso de ajuda para criar uma função em JavaScript',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Calculator,
      title: 'Soluções Matemáticas',
      description: '📊 Resolva equações complexas instantaneamente! Explicações passo a passo.',
      prompt: 'Como resolver equações quadráticas?',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageSquare,
      title: 'Assistente de Escrita',
      description: '✍️ Textos profissionais em instantes! Perfeito para e-mails e documentos.',
      prompt: 'Ajude-me a escrever um e-mail profissional',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: ImageIcon,
      title: 'Análise de Imagens',
      description: '🖼️ Compreenda imagens com IA! Análise detalhada e insights precisos.',
      prompt: 'Vou enviar uma imagem para análise',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-6">
      <div className="col-span-full text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Descubra o Poder da IA
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Desenvolvido com BlueSpark - Transformando suas ideias em realidade
        </p>
      </div>
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
          onClick={() => onSelectFeature(feature.prompt)}
        />
      ))}
    </div>
  );
}