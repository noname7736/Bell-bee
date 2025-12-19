
import React from 'react';
import { Send, Volume2, ShieldAlert, AlertCircle, UserPlus, ZapOff, Skull, UserMinus } from 'lucide-react';

interface EnforcementControlsProps {
  onEnforce: (type: string) => void;
}

const EnforcementControls: React.FC<EnforcementControlsProps> = ({ onEnforce }) => {
  const actions = [
    { id: 'sms', label: 'SMS Blast', icon: Send, color: 'text-emerald-400 border-emerald-500/30' },
    { id: 'proxy', label: 'PROXY_STRIKE', icon: UserMinus, iconColor: 'text-white', color: 'text-rose-100 bg-rose-900/40 border-rose-500 animate-pulse' },
    { id: 'b_verdict', label: 'B_VERDICT', icon: Skull, iconColor: 'text-rose-600', color: 'text-rose-500 border-rose-600/50' },
    { id: 'isolation', label: 'SOCIAL_ISOLATION', icon: ZapOff, color: 'text-amber-500 border-amber-600/50' },
    { id: 'handover', label: 'EXPONENTIAL PUNISH', icon: UserPlus, color: 'text-rose-600 border-rose-700 col-span-2 font-black' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 flex justify-between">
        <span>B_COMMAND_MATRIX</span>
        <span className="text-rose-500 animate-pulse">DEPUTY STATUS: ACTIVE</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onEnforce(action.label)}
            className={`
              flex items-center gap-2 p-2 rounded border bg-slate-900/50 
              hover:bg-white/10 transition-all active:scale-95 group
              ${action.color}
            `}
          >
            <action.icon className={`w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity ${action.iconColor || ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-tighter truncate">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnforcementControls;
