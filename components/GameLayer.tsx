import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FloatingItem, ItemType, TARGET_SCORE } from '../types';
import { PixelCard } from './PixelCard';

interface GameLayerProps {
  onWin: () => void;
}

export const GameLayer: React.FC<GameLayerProps> = ({ onWin }) => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [score, setScore] = useState(0);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spawning logic
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (score >= TARGET_SCORE) return;

      const types = Object.values(ItemType);
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newItem: FloatingItem = {
        id: nextId.current++,
        x: Math.random() * 80 + 10, // 10% to 90% width
        speed: Math.random() * 2 + 3, // 3s to 5s fall duration
        type: randomType,
        rotation: Math.random() * 360
      };

      setItems(prev => [...prev, newItem]);
    }, 600); // Spawn every 600ms

    return () => clearInterval(spawnInterval);
  }, [score]);

  // Cleanup items that have fallen out of view (auto-cleanup handled by animation end in theory, 
  // but good to purge state periodically or use onAnimationEnd)
  const handleAnimationEnd = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleItemClick = useCallback((id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Play sound or visual effect here if needed
    
    setItems(prev => prev.filter(item => item.id !== id));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= TARGET_SCORE) {
        // Use timeout to allow the final click to register visually
        setTimeout(onWin, 500);
      }
      return newScore;
    });
  }, [onWin]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden cursor-crosshair">
      {/* Score HUD */}
      <div className="absolute top-4 left-0 w-full flex justify-center z-20 pointer-events-none">
        <PixelCard className="px-8 py-2 bg-opacity-90">
          <span className="font-pixel text-2xl text-purple-900">
            收集: {score} / {TARGET_SCORE}
          </span>
        </PixelCard>
      </div>

      {/* Falling Items */}
      {items.map(item => (
        <div
          key={item.id}
          className="falling-item text-4xl md:text-6xl hover:scale-125 transition-transform active:scale-95"
          style={{
            left: `${item.x}%`,
            animation: `fall ${item.speed}s linear forwards`,
          }}
          onAnimationEnd={() => handleAnimationEnd(item.id)}
          onClick={(e) => handleItemClick(item.id, e)}
        >
          {item.type}
        </div>
      ))}
    </div>
  );
};