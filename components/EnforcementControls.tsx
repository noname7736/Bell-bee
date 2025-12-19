
import React from 'react';
import { Send, Volume2, Monitor, AlertCircle, UserPlus, Megaphone, HeartCrack, ZapOff } from 'lucide-react';

interface EnforcementControlsProps {
  onEnforce: (type: string) => void;
}

const EnforcementControls: React.FC<EnforcementControlsProps> = ({ onEnforce }) => {
  const actions = [
    { id: 'sms', label: 'SMS Blast', icon: Send, color: 'text-emerald-400 border-emerald-500/30' },
    { id: 'voice', label: 'Voice AI', icon: Volume2, color: 'text-cyan-400 border-cyan-500/30' },
    { id: 'heart', label: 'HEART STRIKE', icon: HeartCrack, iconColor: 'text-rose-600', color: 'text-rose-500 border-rose-600/50' },
    { id: 'cut', label: 'CUT_RESOURCES', icon: ZapOff, color: 'text-amber-500 border-amber-600/50' },
    { id: 'handover', label: 'TOTAL SUBMISSION', icon: UserPlus, color: 'text-rose-600 border-rose-700 col-span-2' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1 flex justify-between">
        <span>Manual Commands</span>
        <span className="text-rose-500/50 animate-pulse">AUTHORITY: MAX</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onEnforce(action.label)}
            className={`
              flex items-center gap-2 p-2 rounded border bg-slate-900/50 
              hover:bg-white/5 transition-all active:scale-95 group
              ${action.color}
              ${action.id === 'handover' ? 'shadow-[0_0_15px_rgba(225,29,72,0.3)] animate-pulse' : ''}
              ${action.id === 'heart' ? 'bg-rose-950/20' : ''}
            `}
          >
            <action.icon className={`w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity ${action.iconColor || ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-tighter truncate">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnforcementControls;
