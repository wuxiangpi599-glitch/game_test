
export const playBirthdayMusic = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return null;

  const ctx = new AudioContext();
  const oscType: OscillatorType = 'square';
  const volume = 0.05;

  const notes = [
    // G4 G4 A4 G4 C5 B4
    { f: 392.00, d: 0.4 }, { f: 392.00, d: 0.4 }, { f: 440.00, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 523.25, d: 0.8 }, { f: 493.88, d: 1.6 },
    // G4 G4 A4 G4 D5 C5
    { f: 392.00, d: 0.4 }, { f: 392.00, d: 0.4 }, { f: 440.00, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 587.33, d: 0.8 }, { f: 523.25, d: 1.6 },
    // G4 G4 G5 E5 C5 B4 A4
    { f: 392.00, d: 0.4 }, { f: 392.00, d: 0.4 }, { f: 783.99, d: 0.8 }, { f: 659.25, d: 0.8 }, { f: 523.25, d: 0.8 }, { f: 493.88, d: 0.8 }, { f: 440.00, d: 0.8 },
    // F5 F5 E5 C5 D5 C5
    { f: 698.46, d: 0.4 }, { f: 698.46, d: 0.4 }, { f: 659.25, d: 0.8 }, { f: 523.25, d: 0.8 }, { f: 587.33, d: 0.8 }, { f: 523.25, d: 1.6 }
  ];

  const playMelody = () => {
    if (ctx.state === 'closed') return;
    
    let time = ctx.currentTime + 0.1;

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = oscType;
      osc.frequency.value = note.f;
      
      // Envelope
      gain.gain.setValueAtTime(volume, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + note.d - 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(time);
      osc.stop(time + note.d);
      
      time += note.d;
    });

    // Loop after song finishes + 3 seconds pause
    const duration = time - ctx.currentTime;
    setTimeout(() => {
      if (ctx.state === 'running') {
        playMelody();
      }
    }, duration * 1000 + 3000); 
  };

  playMelody();
  return ctx;
};
