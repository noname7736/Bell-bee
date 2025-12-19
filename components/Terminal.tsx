
import React, { useRef, useEffect } from 'react';
import { LogEntry } from '../types';

interface TerminalProps {
  logs: LogEntry[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-3 font-mono text-[10px] space-y-1.5 bg-black/40 scrollbar-thin scrollbar-thumb-emerald-500/20"
    >
      {logs.map((log) => (
        <div key={log.id} className="flex gap-2 items-start leading-tight border-l border-white/5 pl-2">
          <span className="text-slate-600 shrink-0 font-bold opacity-70">[{log.timestamp.split(' ')[0]}]</span>
          <div className="flex flex-col">
            <span className={`
              font-black px-1 rounded uppercase w-fit mb-0.5 tracking-tighter
              ${log.level === 'info' ? 'text-emerald-500/80' : ''}
              ${log.level === 'warn' ? 'text-cyan-400 bg-cyan-400/10' : ''}
              ${log.level === 'error' ? 'text-rose-500 bg-rose-500/10' : ''}
              ${log.level === 'critical' ? 'text-white bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.4)] animate-pulse' : ''}
            `}>
              {log.level}
            </span>
            <span className={`${log.level === 'critical' ? 'text-rose-200 font-bold' : 'text-slate-400'}`}>
              {log.message}
            </span>
          </div>
        </div>
      ))}
      <div className="animate-pulse text-emerald-500 pl-2">_ COMMAND_LISTENING...</div>
    </div>
  );
};

export default Terminal;
