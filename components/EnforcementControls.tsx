
import React from 'react';
import { Send, Volume2, Monitor, AlertCircle, UserPlus, Megaphone } from 'lucide-react';

interface EnforcementControlsProps {
  onEnforce: (type: string) => void;
}

const EnforcementControls: React.FC<EnforcementControlsProps> = ({ onEnforce }) => {
  const actions = [
    { id: 'sms', label: 'SMS Blast', icon: Send, color: 'text-emerald-400 border-emerald-500/30' },
    { id: 'voice', label: 'Voice AI', icon: Volume2, color: 'text-cyan-400 border-cyan-500/30' },
    { id: 'broadcast', label: 'National Alert', icon: Megaphone, iconColor: 'text-amber-500', color: 'text-amber-400 border-amber-500/30' },
    { id: 'max', label: 'MAX PRESSURE', icon: AlertCircle, color: 'text-rose-500 border-rose-500/30' },
    { id: 'handover', label: 'Handover to B', icon: UserPlus, color: 'text-rose-600 border-rose-700 col-span-2' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Manual Commands</div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onEnforce(action.label)}
            className={`
              flex items-center gap-2 p-2 rounded border bg-slate-900/50 
              hover:bg-white/5 transition-all active:scale-95 group
              ${action.color}
              ${action.id === 'handover' ? 'shadow-[0_0_10px_rgba(225,29,72,0.2)] animate-pulse hover:animate-none' : ''}
              ${action.id === 'broadcast' ? 'shadow-[0_0_10px_rgba(245,158,11,0.1)]' : ''}
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
