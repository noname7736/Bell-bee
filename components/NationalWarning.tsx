
import React from 'react';
import { AlertTriangle, ShieldX } from 'lucide-react';
import { TARGET_DATA } from '../constants';

const NationalWarning: React.FC = () => {
  return (
    <div className="bg-amber-950/20 border border-amber-500/40 p-3 rounded-lg flex flex-col gap-2 relative overflow-hidden group shadow-[0_0_15px_rgba(251,191,36,0.1)]">
      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 -rotate-12 translate-x-4 -translate-y-4 flex items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-amber-500/20" />
      </div>
      
      <div className="flex items-center gap-2 text-amber-500">
        <ShieldX className="w-4 h-4 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest">National Security Directive</span>
      </div>

      <p className="text-[11px] leading-relaxed text-amber-200 font-bold font-mono italic">
        "{TARGET_DATA.nationalWarning}"
      </p>

      <div className="flex justify-between items-center mt-1">
        <span className="text-[9px] text-amber-500/60 font-mono">STATUS: BROADCASTING_TH</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
          <span className="text-[8px] text-amber-500 uppercase font-bold">Contract Risk: CRITICAL</span>
        </div>
      </div>
      
      {/* Scanning effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan-once" />
    </div>
  );
};

export default NationalWarning;
