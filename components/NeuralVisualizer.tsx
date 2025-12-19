
import React, { useEffect, useState } from 'react';

const NeuralVisualizer: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(function animate() {
      setRotation(prev => (prev + 0.5) % 360);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-black relative group">
      {/* Background Brain Waves */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M0 ${50 + i * 20} Q 50 ${10 + i * 10}, 100 ${50 + i * 20} T 200 ${50 + i * 20} T 300 ${50 + i * 20} T 400 ${50 + i * 20}`}
            stroke="#10b981"
            fill="none"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>

      {/* The Sharingan Eye */}
      <div className="relative w-48 h-48 rounded-full border border-rose-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.1)]">
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Sclera/Iris */}
          <div className="w-32 h-32 rounded-full bg-rose-600 border-4 border-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,black_0%,transparent_70%)]" />
            
            {/* Tomoe Symbols */}
            {[0, 120, 240].map((deg) => (
              <div 
                key={deg} 
                className="absolute w-full h-full flex items-start justify-center"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className="w-6 h-6 mt-2 bg-black rounded-full relative">
                    <div className="absolute -top-1 left-2 w-3 h-6 border-l-4 border-black rounded-l-full rotate-[15deg]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pupil */}
        <div className="w-8 h-8 bg-black rounded-full z-10 shadow-[0_0_15px_rgba(0,0,0,0.8)]" />
        
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-rose-500/5 rounded-full animate-ping pointer-events-none" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-rose-500/50 uppercase font-mono">
        <span>MODE: REALITY_DISTORTION</span>
        <span className="animate-pulse">SIGNAL_STRENGTH: 100%</span>
      </div>
    </div>
  );
};

export default NeuralVisualizer;
