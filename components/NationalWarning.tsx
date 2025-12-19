
import React from 'react';
import { AlertTriangle, ShieldX, Skull } from 'lucide-react';
import { TARGET_DATA } from '../constants';

const NationalWarning: React.FC = () => {
  return (
    <div className="bg-rose-950/30 border-2 border-rose-600 p-3 rounded-lg flex flex-col gap-2 relative overflow-hidden group shadow-[0_0_25px_rgba(225,29,72,0.2)]">
      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 -rotate-12 translate-x-4 -translate-y-4 flex items-center justify-center">
        <Skull className="w-12 h-12 text-rose-500/30" />
      </div>
      
      <div className="flex items-center gap-2 text-rose-500">
        <ShieldX className="w-4 h-4 animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-widest">B-DEPUTY OVERRIDE DIRECTIVE</span>
      </div>

      <p className="text-[11px] leading-relaxed text-rose-100 font-bold font-mono italic border-l-2 border-rose-600 pl-2">
        "{TARGET_DATA.nationalWarning}"
      </p>

      <div className="flex justify-between items-center mt-1">
        <span className="text-[9px] text-rose-500 font-black font-mono">ENFORCER: {TARGET_DATA.collector} (บี)</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[8px] text-white uppercase font-black bg-rose-600 px-1">DOUBLE_PENALTY_ACTIVE</span>
        </div>
      </div>
      
      {/* Scanning effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-rose-500/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan-once" />
    </div>
  );
};

export default NationalWarning;
