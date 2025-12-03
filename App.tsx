
import React, { useState, useRef } from 'react';
import { Intro } from './components/Intro';
import { GameLayer } from './components/GameLayer';
import { EndScreen } from './components/EndScreen';
import { GameState } from './types';
import { playBirthdayMusic } from './utils/audio';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handleStart = () => {
    // Start music on first user interaction
    if (!audioCtxRef.current) {
      const ctx = playBirthdayMusic();
      if (ctx) {
        audioCtxRef.current = ctx;
      }
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    
    setGameState(GameState.PLAYING);
  };

  return (
    <div className="relative w-full h-screen bg-pink-100 overflow-hidden">
      {/* Background Pixel Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#9370DB 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Dynamic Render based on state */}
      {gameState === GameState.INTRO && (
        <Intro onStart={handleStart} />
      )}

      {gameState === GameState.PLAYING && (
        <GameLayer onWin={() => setGameState(GameState.WON)} />
      )}

      {gameState === GameState.WON && (
        <EndScreen onRestart={() => setGameState(GameState.INTRO)} />
      )}
    </div>
  );
};

export default App;
