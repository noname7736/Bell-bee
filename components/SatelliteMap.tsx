
import React from 'react';

const SatelliteMap: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-950 flex items-center justify-center p-4 min-h-[180px]">
      <div className="relative w-full h-full border border-emerald-500/10 rounded overflow-hidden flex items-center justify-center">
        {/* Radar Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30 animate-scan z-20 shadow-[0_0_15px_#10b981]" />
        
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} 
        />

        {/* Radar Circles */}
        <div className="absolute w-32 h-32 border border-emerald-500/10 rounded-full" />
        <div className="absolute w-64 h-64 border border-emerald-500/10 rounded-full" />
        <div className="absolute w-96 h-96 border border-emerald-500/5 rounded-full" />

        {/* Radar Sweep */}
        <div className="absolute w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
          <div 
            className="w-[150%] h-[150%] absolute origin-center"
            style={{
              background: 'conic-gradient(from 0deg, transparent 80%, rgba(16, 185, 129, 0.1) 100%)',
              animation: 'spin 4s linear infinite'
            }}
          />
        </div>

        {/* Target Blip */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e] animate-ping" />
          <div className="absolute w-2 h-2 bg-rose-500 rounded-full" />
          
          {/* Target Label */}
          <div className="absolute left-6 whitespace-nowrap bg-black/80 border border-rose-500/30 p-1 rounded text-[10px] font-mono text-rose-500">
            <div>POS: 13.7563° N, 100.5018° E</div>
            <div className="text-[8px] opacity-70">SECTOR: BANGKOK_7</div>
          </div>
        </div>

        {/* Map Coordinates Legend */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-1 text-[8px] font-mono text-emerald-500/40 uppercase">
          <span>ALT: 32,000M</span>
          <span>SRC: G-SATELLITE_4</span>
        </div>

        <div className="absolute top-2 right-2 text-[8px] font-mono text-rose-500/60 uppercase animate-pulse">
          SIGNAL LOCKED
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SatelliteMap;
