
import React, { useState, useEffect } from 'react';
import { Database, Cpu, HardDrive, Share2, Activity } from 'lucide-react';

const StatusGrid: React.FC = () => {
  const [jitter, setJitter] = useState({
    ping: 42.8,
    load: 18,
    pipe: 9.2,
    storage: 1.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJitter({
        ping: 40 + Math.random() * 5,
        load: 15 + Math.random() * 10,
        pipe: 8.5 + Math.random() * 2,
        storage: 1.2
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'IBM Latency', value: `${jitter.ping.toFixed(1)}ms`, icon: Database, color: 'text-emerald-400' },
    { label: 'Kernel Load', value: `${jitter.load.toFixed(0)}%`, icon: Cpu, color: 'text-cyan-400' },
    { label: 'Pipe Stream', value: `${jitter.pipe.toFixed(1)} GB/s`, icon: Share2, color: 'text-blue-400' },
    { label: 'Disk Array', value: '1.2 PB', icon: HardDrive, color: 'text-rose-400' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800/50 p-2 rounded-md flex flex-col gap-1 hover:border-emerald-500/20 transition-colors">
            <div className="flex items-center gap-1.5">
              <stat.icon className={`w-2.5 h-2.5 ${stat.color}`} />
              <span className="text-[8px] text-slate-500 uppercase font-black tracking-tighter">
                {stat.label}
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-200">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-emerald-500/5 border border-emerald-500/10 p-2 rounded flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-500/70">OS_HEALTH</span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400">99.8% NOMINAL</span>
      </div>
    </div>
  );
};

export default StatusGrid;
