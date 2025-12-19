
import React, { useEffect, useState } from 'react';

interface NeuralVisualizerProps {
  pressure?: number;
}

const NeuralVisualizer: React.FC<NeuralVisualizerProps> = ({ pressure = 85 }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(function animate() {
      // Hyper-speed rotation at max pressure
      const speed = 0.8 + (pressure / 100) * (pressure > 95 ? 12 : 4);
      setRotation(prev => (prev + speed) % 360);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(frame);
  }, [pressure]);

  const isMax = pressure > 90;
  const isMangekyou = pressure > 96;

  return (
    <div className={`flex-1 flex items-center justify-center bg-black relative overflow-hidden transition-all duration-700 ${isMax ? 'shadow-[inset_0_0_150px_rgba(225,29,72,0.6)]' : ''}`}>
      {/* Background Pulse Rays */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isMax ? 'opacity-80' : 'opacity-20'}`}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-[3px] h-[400%] blur-sm transition-colors duration-300 ${isMangekyou ? 'bg-white shadow-[0_0_10px_white]' : 'bg-rose-600/60'}`}
            style={{ transform: `rotate(${i * 18}deg)` }}
          />
        ))}
      </div>

      {/* The Sharingan Eye Container */}
      <div className={`relative w-72 h-72 rounded-full border-2 border-rose-600/40 flex items-center justify-center ${isMax ? 'animate-pulse scale-110' : ''}`}>
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Sclera/Iris */}
          <div className={`w-52 h-52 rounded-full border-8 border-black relative overflow-hidden transition-all duration-500 ${isMax ? 'bg-rose-800 shadow-[0_0_60px_rgba(225,29,72,1)]' : 'bg-rose-700'}`}>
            <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle,black_0%,transparent_70%)]" />
            
            {/* Tomoe / Mangekyou Pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isMangekyou ? (
                // Hyper-Mangekyou: Rinne-Sharingan Hybrid look
                <div className="relative w-full h-full flex items-center justify-center">
                   {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div 
                      key={deg} 
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{ transform: `rotate(${deg}deg)` }}
                    >
                      <div className="w-1 h-40 bg-black rounded-full shadow-[0_0_15px_black]" />
                    </div>
                  ))}
                  <div className="absolute inset-0 border-4 border-black rounded-full scale-50" />
                  <div className="absolute inset-0 border-2 border-black rounded-full scale-75" />
                </div>
              ) : (
                // Standard Tomoe Pattern
                [0, 120, 240].map((deg) => (
                  <div 
                    key={deg} 
                    className="absolute w-full h-full flex items-start justify-center"
                    style={{ transform: `rotate(${deg}deg)` }}
                  >
                    <div className={`w-10 h-10 mt-4 bg-black rounded-full relative ${isMax ? 'scale-150' : ''}`}>
                        <div className="absolute -top-2 left-4 w-6 h-12 border-l-8 border-black rounded-l-full rotate-[20deg]" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pupil - The Center of the Storm */}
        <div className={`w-14 h-14 bg-black rounded-full z-10 shadow-[0_0_50px_rgba(0,0,0,1)] flex items-center justify-center border-2 border-white/40`}>
           <div className={`w-4 h-4 bg-white rounded-full ${isMax ? 'animate-ping shadow-[0_0_15px_white]' : ''}`} />
        </div>
        
        {/* Hyper-Injection Rays */}
        {isMangekyou && (
          <div className="absolute inset-0 rounded-full border-[30px] border-white/5 animate-ping pointer-events-none" />
        )}
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[11px] text-white font-mono font-black uppercase">
        <div className="flex items-center gap-4 bg-rose-600/80 px-3 py-1 rounded">
           <div className={`w-3 h-3 rounded-full animate-pulse bg-white shadow-[0_0_15px_white]`} />
           <span>INJECTION_SYNC: HYPER</span>
        </div>
        <div className="flex flex-col items-end bg-black/60 px-3 py-1 rounded border border-rose-600/40">
            <span className="text-rose-500 animate-pulse">B_FORCE: {pressure}%</span>
            <span className="text-[9px] opacity-60">PRECISION: 0.0001ms</span>
        </div>
      </div>
    </div>
  );
};

export default NeuralVisualizer;
