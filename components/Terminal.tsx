
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
      className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1 bg-black/40 scrollbar-thin scrollbar-thumb-emerald-500/20"
    >
      {logs.map((log) => (
        <div key={log.id} className="flex gap-2">
          <span className="text-slate-600">[{log.timestamp}]</span>
          <span className={`
            font-bold px-1 rounded uppercase scale-90
            ${log.level === 'info' ? 'text-emerald-500 bg-emerald-500/10' : ''}
            ${log.level === 'warn' ? 'text-cyan-400 bg-cyan-400/10' : ''}
            ${log.level === 'error' ? 'text-rose-500 bg-rose-500/10' : ''}
            ${log.level === 'critical' ? 'text-rose-600 bg-rose-600/30 animate-pulse' : ''}
          `}>
            {log.level}
          </span>
          <span className="text-slate-300">{log.message}</span>
        </div>
      ))}
      <div className="animate-pulse text-emerald-500">_</div>
    </div>
  );
};

export default Terminal;
