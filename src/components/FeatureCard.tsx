import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
}

export function FeatureCard({ icon: Icon, title, description, onClick, gradient }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-left w-full transform hover:-translate-y-1`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </button>
  );
}