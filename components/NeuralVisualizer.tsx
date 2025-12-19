
import React, { useEffect, useState } from 'react';

interface NeuralVisualizerProps {
  pressure?: number;
}

const NeuralVisualizer: React.FC<NeuralVisualizerProps> = ({ pressure = 85 }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(function animate() {
      // Speed up rotation as pressure increases
      const speed = 0.5 + (pressure / 100) * 2;
      setRotation(prev => (prev + speed) % 360);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [pressure]);

  const isMax = pressure > 90;

  return (
    <div className={`flex-1 flex items-center justify-center bg-black relative group overflow-hidden transition-all duration-700 ${isMax ? 'shadow-[inset_0_0_100px_rgba(225,29,72,0.3)]' : ''}`}>
      {/* Background Pulse Rays */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isMax ? 'opacity-40' : 'opacity-10'}`}>
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-[200%] bg-rose-500/40 blur-sm"
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
      </div>

      {/* The Sharingan Eye */}
      <div className={`relative w-48 h-48 rounded-full border border-rose-500/40 flex items-center justify-center shadow-[0_0_80px_rgba(244,63,94,0.2)] ${isMax ? 'animate-pulse' : ''}`}>
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Sclera/Iris */}
          <div className={`w-36 h-36 rounded-full border-4 border-black relative overflow-hidden transition-colors duration-1000 ${isMax ? 'bg-rose-700' : 'bg-rose-600'}`}>
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,black_0%,transparent_80%)]" />
            
            {/* Tomoe Symbols */}
            {[0, 120, 240].map((deg) => (
              <div 
                key={deg} 
                className="absolute w-full h-full flex items-start justify-center"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className={`w-7 h-7 mt-2 bg-black rounded-full relative ${isMax ? 'scale-125' : ''} transition-transform`}>
                    <div className="absolute -top-1 left-3 w-4 h-8 border-l-4 border-black rounded-l-full rotate-[20deg]" />
                </div>
              </div>
            ))}

            {/* Connecting Rings for Mangekyou state */}
            {isMax && (
              <div className="absolute inset-0 border-[6px] border-black rounded-full scale-75 opacity-80" />
            )}
          </div>
        </div>

        {/* Pupil */}
        <div className={`w-10 h-10 bg-black rounded-full z-10 shadow-[0_0_20px_rgba(0,0,0,1)] flex items-center justify-center`}>
           <div className="w-2 h-2 bg-rose-500/40 rounded-full animate-ping" />
        </div>
        
        {/* Glow Effects */}
        <div className={`absolute inset-0 rounded-full pointer-events-none ${isMax ? 'bg-rose-500/10 animate-ping' : ''}`} />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-rose-500 font-mono">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
           <span>MODE: {isMax ? 'HEART_PENETRATION' : 'REALITY_DISTORTION'}</span>
        </div>
        <span className="animate-pulse">STRESS_LOCK: {pressure}%</span>
      </div>
    </div>
  );
};

export default NeuralVisualizer;
