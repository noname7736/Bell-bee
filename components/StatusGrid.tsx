
import React, { useState, useEffect } from 'react';
import { Database, Cpu, HardDrive, Share2, Activity, ArrowRightLeft, Zap } from 'lucide-react';

const StatusGrid: React.FC = () => {
  const [jitter, setJitter] = useState({
    sync: 100,
    rate: 420.5,
    pressure: 98.2,
    integrity: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJitter({
        sync: 100,
        rate: 410 + Math.random() * 20,
        pressure: 97 + Math.random() * 3,
        integrity: 99.9 + Math.random() * 0.1
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Pipe Sync', value: `${jitter.sync.toFixed(0)}%`, icon: ArrowRightLeft, color: 'text-white' },
    { label: 'Inject Rate', value: `${jitter.rate.toFixed(1)} Gbps`, icon: Zap, color: 'text-rose-500' },
    { label: 'Pressure X2', value: `${jitter.pressure.toFixed(1)}%`, icon: Cpu, color: 'text-rose-400' },
    { label: 'Link Integrity', value: `${jitter.integrity.toFixed(2)}%`, icon: Activity, color: 'text-emerald-400' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, i) => (
          <div key={i} className="bg-black border border-rose-600/40 p-2 rounded-md flex flex-col gap-1 hover:bg-rose-950/20 transition-colors">
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
      
      <div className="bg-rose-600 p-2 rounded flex items-center justify-between shadow-[0_0_15px_rgba(225,29,72,0.4)]">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-white animate-pulse" />
          <span className="text-[9px] font-black text-white">B_PIPELINE_STATUS</span>
        </div>
        <span className="text-[9px] font-mono text-white font-bold">HYPER-SYNC ACTIVE</span>
      </div>
    </div>
  );
};

export default StatusGrid;
