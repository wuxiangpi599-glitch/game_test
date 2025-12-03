import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-white border-4 border-purple-900 p-6 
      pixel-shadow relative
      ${className}
    `}>
      {/* Decorative corners to simulate rounded pixel corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-900" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-900" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-900" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-900" />
      
      {children}
    </div>
  );
};