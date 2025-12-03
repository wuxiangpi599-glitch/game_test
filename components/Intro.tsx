import React from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';
import { BIRTHDAY_DATE } from '../types';

interface IntroProps {
  onStart: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 z-10 relative">
      <PixelCard className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-pixel text-purple-900 leading-tight pixel-text-shadow">
          LEVEL 21<br/>
          <span className="text-pink-500">UNLOCKED</span>
        </h1>
        
        <div className="space-y-2 font-pixel text-purple-800">
          <p>准备好庆祝了吗？</p>
          <p className="text-sm opacity-75">{BIRTHDAY_DATE}</p>
        </div>

        <div className="py-4">
          <div className="inline-block animate-bounce-slow text-6xl">
            🎂
          </div>
        </div>

        <p className="text-sm font-bold text-pink-600">
          任务：收集 21 个生日祝福！
        </p>

        <PixelButton onClick={onStart} className="w-full bg-pink-100 hover:bg-pink-200">
          开始游戏 &gt;
        </PixelButton>
      </PixelCard>
    </div>
  );
};