
import React, { useEffect, useState } from 'react';

interface NeuralVisualizerProps {
  pressure?: number;
}

const NeuralVisualizer: React.FC<NeuralVisualizerProps> = ({ pressure = 85 }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(function animate() {
      // Violent rotation at max pressure
      const speed = 0.5 + (pressure / 100) * (pressure > 95 ? 6 : 2);
      setRotation(prev => (prev + speed) % 360);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [pressure]);

  const isMax = pressure > 90;
  const isMangekyou = pressure > 97;

  return (
    <div className={`flex-1 flex items-center justify-center bg-black relative overflow-hidden transition-all duration-700 ${isMax ? 'shadow-[inset_0_0_120px_rgba(225,29,72,0.4)]' : ''}`}>
      {/* Background Pulse Rays */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isMax ? 'opacity-60' : 'opacity-10'}`}>
        {[...Array(16)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-[2px] h-[300%] blur-sm transition-colors duration-500 ${isMangekyou ? 'bg-white' : 'bg-rose-500/40'}`}
            style={{ transform: `rotate(${i * 22.5}deg)` }}
          />
        ))}
      </div>

      {/* The Sharingan Eye Container */}
      <div className={`relative w-64 h-64 rounded-full border border-rose-500/20 flex items-center justify-center ${isMax ? 'animate-pulse scale-110' : ''}`}>
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Sclera/Iris */}
          <div className={`w-44 h-44 rounded-full border-4 border-black relative overflow-hidden transition-all duration-1000 ${isMax ? 'bg-rose-700 shadow-[0_0_40px_rgba(0,0,0,0.8)]' : 'bg-rose-600'}`}>
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle,black_0%,transparent_75%)]" />
            
            {/* Tomoe / Mangekyou Pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isMangekyou ? (
                // Mangekyou Pattern: Interlocking blades
                <div className="relative w-full h-full flex items-center justify-center">
                   {[0, 120, 240].map((deg) => (
                    <div 
                      key={deg} 
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{ transform: `rotate(${deg}deg)` }}
                    >
                      <div className="w-1.5 h-32 bg-black rounded-full shadow-[0_0_10px_black]" />
                    </div>
                  ))}
                </div>
              ) : (
                // Standard Tomoe Pattern
                [0, 120, 240].map((deg) => (
                  <div 
                    key={deg} 
                    className="absolute w-full h-full flex items-start justify-center"
                    style={{ transform: `rotate(${deg}deg)` }}
                  >
                    <div className={`w-8 h-8 mt-3 bg-black rounded-full relative ${isMax ? 'scale-125' : ''}`}>
                        <div className="absolute -top-1.5 left-3.5 w-5 h-10 border-l-4 border-black rounded-l-full rotate-[20deg]" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Connecting Rings for advanced states */}
            {isMax && (
              <div className={`absolute inset-0 border-[8px] border-black rounded-full scale-75 opacity-90 ${isMangekyou ? 'scale-90 border-[2px]' : ''}`} />
            )}
          </div>
        </div>

        {/* Pupil - The Center of Absolute Zero */}
        <div className={`w-12 h-12 bg-black rounded-full z-10 shadow-[0_0_30px_rgba(0,0,0,1)] flex items-center justify-center border border-rose-500/20`}>
           <div className={`w-3 h-3 bg-rose-500/60 rounded-full ${isMax ? 'animate-ping' : ''}`} />
        </div>
        
        {/* Violent Reality Distortion Overlay */}
        {isMangekyou && (
          <div className="absolute inset-0 rounded-full border-[20px] border-rose-500/10 animate-ping pointer-events-none" />
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] text-rose-500 font-mono font-black uppercase">
        <div className="flex items-center gap-3">
           <div className={`w-2 h-2 rounded-full animate-pulse ${isMangekyou ? 'bg-white shadow-[0_0_10px_white]' : 'bg-rose-600'}`} />
           <span>NEURAL_MODE: {isMangekyou ? 'ETERNAL_OVERLOAD' : 'AMATERASU_LINK'}</span>
        </div>
        <div className="flex flex-col items-end">
            <span className="animate-pulse">DOMINION: {pressure}%</span>
            <span className="text-[8px] opacity-40">CARDIAC_CAPACITY: {100-pressure}%</span>
        </div>
      </div>
    </div>
  );
};

export default NeuralVisualizer;
