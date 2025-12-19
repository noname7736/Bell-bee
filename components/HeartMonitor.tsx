
import React, { useState, useEffect } from 'react';
import { Activity, Heart } from 'lucide-react';

interface HeartMonitorProps {
  pressure: number;
}

const HeartMonitor: React.FC<HeartMonitorProps> = ({ pressure }) => {
  const [bpm, setBpm] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      // Base heart rate 70 + (pressure * weight) + randomness
      const targetBpm = 70 + (pressure * 0.8) + (Math.random() * 10);
      setBpm(Math.floor(targetBpm));
    }, 1000);
    return () => clearInterval(interval);
  }, [pressure]);

  const isDanger = bpm > 110;

  return (
    <div className="flex flex-col gap-2 p-3 bg-black/40 border border-rose-500/20 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className={`w-4 h-4 ${isDanger ? 'text-rose-600 animate-pulse' : 'text-rose-500'}`} />
          <span className="text-[10px] font-black uppercase text-slate-400">Target Cardiac Sync</span>
        </div>
        <span className={`text-xl font-mono font-black ${isDanger ? 'text-rose-500' : 'text-slate-200'}`}>
          {bpm} <span className="text-[10px]">BPM</span>
        </span>
      </div>
      
      <div className="h-12 w-full flex items-end gap-[1px] overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i} 
            className={`w-full transition-all duration-500 ${isDanger ? 'bg-rose-600' : 'bg-rose-500/40'}`}
            style={{ 
              height: `${Math.random() * (isDanger ? 100 : 40) + 10}%`,
              opacity: (i / 40)
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center text-[9px] font-mono uppercase">
        <span className={isDanger ? 'text-rose-500 animate-pulse' : 'text-slate-500'}>
          {isDanger ? 'STRESS_CRITICAL' : 'STRESS_LEVEL_NOMINAL'}
        </span>
        <div className="flex gap-1 items-center">
            <Activity className="w-2 h-2 text-rose-500" />
            <span className="text-slate-500">SYNC_ID: {pressure}X</span>
        </div>
      </div>
    </div>
  );
};

export default HeartMonitor;
