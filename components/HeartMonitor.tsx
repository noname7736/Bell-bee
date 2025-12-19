
import React, { useState, useEffect } from 'react';
import { Activity, Heart, AlertCircle } from 'lucide-react';

interface HeartMonitorProps {
  pressure: number;
}

const HeartMonitor: React.FC<HeartMonitorProps> = ({ pressure }) => {
  const [bpm, setBpm] = useState(72);
  const [history, setHistory] = useState<number[]>(Array(40).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      // BPM climbs aggressively with pressure
      const targetBpm = 65 + (pressure * 0.9) + (Math.random() * (pressure > 90 ? 20 : 5));
      setBpm(Math.floor(targetBpm));
      
      setHistory(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * (pressure > 90 ? 100 : 40) + 10)];
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [pressure]);

  const isDanger = bpm > 115;
  const isCritical = pressure > 95;

  return (
    <div className={`flex flex-col gap-2 p-3 bg-black/40 border transition-all duration-300 rounded-xl ${isCritical ? 'border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.2)]' : 'border-rose-500/20'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className={`w-4 h-4 ${isDanger ? 'text-rose-600 animate-pulse' : 'text-rose-500'}`} />
          <span className="text-[10px] font-black uppercase text-slate-400">Cardiac Sync</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-mono font-black tracking-tighter ${isDanger ? 'text-rose-500' : 'text-slate-200'}`}>
            {bpm}
          </span>
          <span className="text-[9px] font-black uppercase text-slate-500">BPM</span>
        </div>
      </div>
      
      <div className="h-14 w-full flex items-end gap-[1px] overflow-hidden bg-black/40 rounded-sm border border-white/5">
        {history.map((val, i) => (
          <div 
            key={i} 
            className={`w-full transition-all duration-300 ${isDanger ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]' : 'bg-emerald-500/40'}`}
            style={{ 
              height: `${val}%`,
              opacity: (i / 40) + 0.2
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center text-[9px] font-mono uppercase font-black">
        <div className="flex items-center gap-1.5">
           {isCritical && <AlertCircle className="w-3 h-3 text-rose-500 animate-ping" />}
           <span className={isDanger ? 'text-rose-500 animate-pulse' : 'text-slate-500'}>
            {isCritical ? 'SYNC_FAILURE_IMMINENT' : isDanger ? 'STRESS_CRITICAL' : 'SYNC_ACTIVE'}
          </span>
        </div>
        <div className="flex gap-1 items-center">
            <span className="text-slate-600">ID:</span>
            <span className="text-slate-400">PULSE_TH_04</span>
        </div>
      </div>
    </div>
  );
};

export default HeartMonitor;
