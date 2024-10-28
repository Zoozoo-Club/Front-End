import React from 'react';
import { Loader2 } from 'lucide-react';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
};

export default function Loading({ 
  size = 'md', 
  fullScreen = false,
  text = '잠시만 기다려주세요...'
}: Props) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 w-screen h-screen bg-white/80 z-50" 
    : "w-full h-full";

  return (
    <div className={`${containerClasses} flex items-center justify-center flex-col`}>
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-indigo-500`} 
      />
      {text && (
        <p className="text-gray-700 mt-4 text-center font-ptr">
          {text}
        </p>
      )}
    </div>
  );
}