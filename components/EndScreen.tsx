
import React, { useEffect, useState } from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';
import { generateBirthdayMessage } from '../services/geminiService';
import { BIRTHDAY_DATE } from '../types';

interface EndScreenProps {
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    generateBirthdayMessage().then(msg => setMessage(msg));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 z-10 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Simple Confetti-like static decoration */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🎉</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce-slow">💖</div>
        <div className="absolute bottom-32 left-1/4 text-4xl animate-bounce">🍰</div>
      </div>

      <PixelCard className="max-w-lg w-full text-center space-y-6 animate-[bounce_0.5s_ease-out]">
        <h2 className="text-3xl font-pixel text-purple-900 pixel-text-shadow">
          任务完成！
        </h2>
        
        <div className="text-6xl my-4">
          👸🏻✨
        </div>

        <div className="bg-pink-50 border-2 border-pink-200 p-6 rounded-sm min-h-[120px] flex items-center justify-center">
            <div className="font-pixel text-purple-800 whitespace-pre-wrap leading-relaxed text-lg">
                {message}
            </div>
        </div>

        <div className="text-xs text-purple-400 font-pixel mt-4">
            目标达成日: {BIRTHDAY_DATE}
        </div>

        <PixelButton onClick={onRestart} className="w-full mt-6 bg-purple-100 hover:bg-purple-200">
          再玩一次 ↺
        </PixelButton>
      </PixelCard>
    </div>
  );
};
