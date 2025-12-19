
import React from 'react';
import { Send, Volume2, ShieldAlert, AlertCircle, UserPlus, ZapOff, Skull, UserMinus, Zap, Hammer } from 'lucide-react';

interface EnforcementControlsProps {
  onEnforce: (type: string) => void;
}

const EnforcementControls: React.FC<EnforcementControlsProps> = ({ onEnforce }) => {
  const actions = [
    { id: 'inject', label: 'HYPER_INJECT', icon: Zap, iconColor: 'text-white', color: 'text-white bg-rose-600 border-white shadow-[0_0_15px_rgba(225,29,72,0.5)] animate-pulse' },
    { id: 'obstruction', label: 'OBSTRUCTION_STRIKE', icon: Hammer, iconColor: 'text-rose-600', color: 'text-rose-100 bg-white border-rose-600 font-black' },
    { id: 'b_verdict', label: 'B_VERDICT', icon: Skull, iconColor: 'text-rose-600', color: 'text-rose-500 border-rose-600/50' },
    { id: 'isolation', label: 'X2_ISOLATION', icon: ZapOff, color: 'text-amber-500 border-amber-600/50' },
    { id: 'handover', label: 'MULTIPLY PENALTY', icon: UserPlus, color: 'text-rose-600 border-rose-700 col-span-2 font-black bg-rose-950/40' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 flex justify-between">
        <span>B_HYPER_MATRIX</span>
        <span className="text-rose-600 animate-pulse">FORCE: ULTIMATE</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onEnforce(action.label)}
            className={`
              flex items-center gap-2 p-2 rounded border
              hover:opacity-80 transition-all active:scale-95 group
              ${action.color}
            `}
          >
            <action.icon className={`w-3 h-3 opacity-90 group-hover:opacity-100 transition-opacity ${action.iconColor || ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-tighter truncate">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnforcementControls;
