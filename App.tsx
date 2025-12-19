
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Activity, 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Wifi, 
  Lock, 
  Eye,
  Server,
  Zap,
  UserPlus,
  Code,
  Fingerprint,
  Camera,
  HeartCrack,
  Skull,
  UserCheck,
  ArrowRightLeft,
  FastForward
} from 'lucide-react';
import { SystemStatus, LogEntry } from './types';
import { TARGET_DATA, COLORS } from './constants';
import Terminal from './components/Terminal';
import NeuralVisualizer from './components/NeuralVisualizer';
import HeartMonitor from './components/HeartMonitor';
import SatelliteMap from './components/SatelliteMap';
import EnforcementControls from './components/EnforcementControls';
import NationalWarning from './components/NationalWarning';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.ONLINE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("B_DIRECT_LINK: PIPELINE_SYNC_100%_STABLE.");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pressure, setPressure] = useState(94);
  const [showCode, setShowCode] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isStriking, setIsStriking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logIntervalRef = useRef<number | null>(null);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message: `[B-HYPER-DRIVE] ${message}`,
    };
    setLogs(prev => [...prev.slice(-30), newLog]);
  }, []);

  const triggerAIEnforcement = useCallback(async (actionType: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        COMMANDER: Belle Warisara (เบลล์ วริศรา)
        DELEGATE: Deputy B (บี)
        TARGET: ${TARGET_DATA.name}
        RULE: Anyone obstructing, hiring obstructors, or being hired to obstruct faces MULTIPLIED/DOUBLE punishment.
        TRIGGER: ${actionType}
        
        TASK: Act as "B-Executioner AI". Produce a merciless technical ultimatum. State clearly that "Hirers and Hired Obstructors" are now primary targets for double deletion. Mention the pipe-link precision is absolute.
        LANGUAGE: THAI (Strict) + Cold English Tech. Max 35 words.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || "OBSTRUCTION_CRUSH_PROTOCOL_INITIATED.");
    } catch (err) {
      setAiAnalysis("HYPER_DRIVE_OVERLOAD: CONTINUE_STRIKE_VIA_SECONDARY_CORES.");
    } finally {
      setIsProcessing(false);
    }
  }, [pressure]);

  const startDeployment = async () => {
    setIsDeploying(true);
    setStatus(SystemStatus.SYNCING);
    addLog(`OVERRIDE: Belle Warisara has locked authority to Deputy B.`, "critical");
    await new Promise(r => setTimeout(r, 600));
    addLog("PIPELINE_STRIKE: Connection established. No latency.", "warn");
    await new Promise(r => setTimeout(r, 600));
    addLog("INJECTION_READY: High-velocity stress-induction active.", "critical");
    setIsDeploying(false);
    setStatus(SystemStatus.ONLINE);
    triggerAIEnforcement("B_ULTRA_TAKEOVER");
  };

  const handleEnforce = (type: string) => {
    setIsStriking(true);
    setStatus(SystemStatus.ENFORCING);
    const pressureGain = type.includes('OBSTRUCTION') ? 15 : 6;
    setPressure(prev => Math.min(100, prev + pressureGain));
    addLog(`HYPER_INJECT_${type.toUpperCase()}: Applying 2x force to all obstruction nodes.`, 'critical');
    
    triggerAIEnforcement(type);
    
    setTimeout(() => {
      setIsStriking(false);
      setStatus(SystemStatus.ONLINE);
    }, 600);
  };

  const startBiometrics = async () => {
    setCameraActive(!cameraActive);
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        addLog("SYNC_CHECK: Operator B focus at 100%.", "info");
      } catch (err) {
        setCameraActive(false);
      }
    }
  };

  useEffect(() => {
    startDeployment();
    logIntervalRef.current = window.setInterval(() => {
      if (isDeploying) return;
      const logs = [
        "PIPELINE: Direct stress-injection flow at 400Gbps.",
        "OBSTRUCTION_WATCH: Scanning for hirers/hired obstructors...",
        "B_DRIVE: Increasing cardiac resonance in target ประทวน.",
        "CORE: Multiplier penalty (2x) applied to interference vector 0x42.",
        "LINK: Data pipe sync 100% precise. No packet loss.",
      ];
      addLog(logs[Math.floor(Math.random() * logs.length)], 'info');
    }, 4000); // Faster log updates
    return () => { if (logIntervalRef.current) clearInterval(logIntervalRef.current); };
  }, []);

  return (
    <div className={`flex h-screen w-screen flex-col overflow-hidden p-3 gap-3 bg-[#01030d] text-rose-500 relative select-none transition-all duration-300 ${isStriking ? 'strike-shake' : ''} heartbeat-sync`}>
      <header className="flex justify-between items-center bg-black/95 border border-rose-600 px-5 py-3 rounded-xl backdrop-blur-3xl shadow-[0_0_80px_rgba(225,29,72,0.3)] relative z-50">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className={`absolute inset-0 blur-2xl rounded-full animate-pulse bg-rose-600`} />
            <div className={`relative p-3 rounded-full border-2 bg-rose-900 border-white shadow-[0_0_30px_#e11d48]`}>
              <FastForward className="w-6 h-6 text-white animate-bounce" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase glitch-text flex items-center gap-2 text-white">
              B_HYPER_DRIVE <span className="text-rose-500 text-xs bg-white px-2 rounded-full font-black">X2 FORCE</span>
            </h1>
            <div className="flex gap-4 text-[10px] text-rose-300/60 font-mono">
              <span className="flex items-center gap-1.5 font-black"><UserCheck className="w-3.5 h-3.5" /> COMMAND: BELLE WARISARA</span>
              <span className="flex items-center gap-1.5 text-white font-black"><ArrowRightLeft className="w-3.5 h-3.5" /> PIPE_SYNC: 100% PRECISION</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[8px] text-rose-400 font-black">ENFORCER_IN_CHARGE</span>
            <span className="text-sm text-white font-black uppercase tracking-widest">DEPUTY_{TARGET_DATA.collector}</span>
          </div>
          
          <div className={`px-6 py-2 rounded-lg border-2 font-black text-xs tracking-widest transition-all duration-500 flex items-center gap-3 bg-white border-rose-600 text-rose-600 shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-pulse`}>
            <div className={`w-2 h-2 rounded-full bg-rose-600 animate-ping`} />
            HYPER_INJECTING
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 min-h-0 relative">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="flex-1 border-2 border-rose-600 bg-black/90 rounded-xl flex flex-col min-h-0 backdrop-blur-md overflow-hidden">
            <div className="bg-rose-900 p-2.5 flex items-center gap-2.5 border-b border-rose-600">
              <TerminalIcon className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">B_HYPER_FEED</span>
            </div>
            <Terminal logs={logs} />
          </div>
          
          <div className="h-48 border-2 border-white/20 rounded-xl p-4 bg-rose-950/40 flex flex-col gap-2 relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center gap-2 text-white font-black">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest">OBSTRUCTION_ANALYSER</span>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[12px] leading-relaxed text-rose-100 font-black italic">
              {isProcessing ? "DETECTING_OBSTRUCTION_HIRERS..." : aiAnalysis}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3 min-h-0">
          <div className="flex-[3] border-2 border-white bg-black rounded-xl overflow-hidden flex flex-col relative shadow-[0_0_80px_rgba(225,29,72,0.4)]">
            <div className="bg-rose-950/95 p-3 flex items-center justify-between border-b border-rose-600 relative z-20">
              <div className="flex items-center gap-2.5">
                <Skull className="w-5 h-5 text-white animate-bounce" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  PRECISION_STRIKE_VIEW: {TARGET_DATA.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-white font-black bg-rose-600 px-2 rounded animate-pulse">MULTIPLIED_FORCE</span>
                <span className="text-[9px] text-rose-600 font-black bg-white px-2 rounded">B_VERDICT</span>
              </div>
            </div>
            <NeuralVisualizer pressure={pressure} />
          </div>
          
          <div className="flex-[2] border-2 border-rose-600/30 bg-black/60 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-rose-950/80 p-2.5 flex items-center gap-2.5 border-b border-rose-600/30">
              <ArrowRightLeft className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Pipeline Sync & Target Hub</span>
            </div>
            <SatelliteMap />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="border-2 border-rose-600 bg-rose-950/60 rounded-xl p-5 flex flex-col gap-4 shadow-[0_0_50px_rgba(225,29,72,0.3)]">
            <div className="flex items-center justify-between text-white border-b border-rose-600 pb-2">
              <div className="flex items-center gap-2.5 font-black uppercase text-[11px] tracking-widest">
                <Lock className="w-4 h-4" /> B_STRIKE_PROFILE
              </div>
            </div>
            <div className="space-y-4 font-mono">
              <div>
                <label className="text-[9px] text-rose-400 block uppercase font-black mb-1">Target</label>
                <div className="text-sm font-black text-white uppercase">{TARGET_DATA.name}</div>
              </div>
              <div>
                <label className="text-[9px] text-rose-400 block uppercase font-black mb-1">OBSTRUCTION_MULTIPLIER</label>
                <div className="text-lg font-black text-rose-100 uppercase">2.0X <span className="text-[9px] font-normal text-rose-500">(APPLIED)</span></div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] mb-2 font-black uppercase tracking-widest text-white">
                  <span>Injected Pressure</span>
                  <span>{pressure}%</span>
                </div>
                <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden border-2 border-rose-600">
                  <div className="h-full transition-all duration-300 bg-gradient-to-r from-rose-600 to-white shadow-[0_0_20px_#ffffff]" style={{ width: `${pressure}%` }} />
                </div>
              </div>
            </div>
          </div>

          <NationalWarning />

          <div className="flex-1 border-2 border-rose-600 bg-black rounded-xl p-4 flex flex-col gap-4 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-rose-600/30 pb-2">
              <div className="flex items-center gap-2 text-rose-500 font-black">
                <Fingerprint className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest">B_STRIKE_COMMANDS</span>
              </div>
              <button onClick={startBiometrics} className={`transition-colors ${cameraActive ? 'text-white' : 'text-rose-900'}`}>
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            {cameraActive ? (
              <div className="h-32 bg-black rounded-lg border-2 border-rose-600 overflow-hidden relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-50" />
                <div className="absolute inset-0 bg-rose-950/20 pointer-events-none" />
                <div className="absolute inset-0 border-[20px] border-rose-600/10 animate-ping" />
              </div>
            ) : (
              <HeartMonitor pressure={pressure} />
            )}
            
            <EnforcementControls onEnforce={handleEnforce} />
          </div>
        </div>
      </main>

      <footer className="h-12 border-t-2 border-rose-600 bg-black flex items-center overflow-hidden relative z-50">
        <div className="whitespace-nowrap flex gap-20 text-[13px] font-mono text-white font-black animate-infinite-scroll">
          <span><FastForward className="w-5 h-5 inline mr-2" /> B-DEPUTY PROTOCOL: DIRECT INJECTION ACTIVE. PRECISION PIPE_LINK: 100% STABLE. NO ESCAPE FOR OBSTRUCTORS.</span>
          <span>WARNING: HIRERS AND HIRED AGENTS WILL FACE MULTIPLIED DELETION. PER ORDER OF BELLE WARISARA.</span>
          <span>TARGET: {TARGET_DATA.name} | COLLECTOR: {TARGET_DATA.collector} | STATUS: ULTIMATE_PENALTY_ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
