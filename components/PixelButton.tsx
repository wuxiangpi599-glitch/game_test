import React from 'react';

interface PixelButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ onClick, children, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-6 py-3 font-pixel text-lg uppercase tracking-widest
        border-4 border-purple-900 bg-white text-purple-900
        transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        pixel-shadow hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </button>
  );
};