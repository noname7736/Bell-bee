
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
  UserCheck
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
  const [aiAnalysis, setAiAnalysis] = useState<string>("B_DEPUTY_LOADED: TARGET_SYNC_VERIFIED.");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pressure, setPressure] = useState(92);
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
      message: `[DEPUTY-B] ${message}`,
    };
    setLogs(prev => [...prev.slice(-30), newLog]);
  }, []);

  const triggerAIEnforcement = useCallback(async (actionType: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        SYSTEM_CONTEXT: Absolute Debt Enforcement. Commander Belle Warisara has delegated authority to Deputy B.
        RULES: Anyone helping or interfering with Target ${TARGET_DATA.name} gets double punishment.
        TRIGGER: ${actionType}
        
        TASK: Act as "B-Executioner AI". Produce a terrifying technical ultimatum for the target and anyone considering helping them. State that "Interference leads to Exponential Deletion".
        LANGUAGE: THAI (main) + English Tech. Max 35 words. BE COLD.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || "INTERFERENCE_DETECTED: APPLYING_DOUBLE_PENALTY.");
    } catch (err) {
      setAiAnalysis("BRAIN_LINK_CRITICAL: DEPUTY_B_MANUAL_OVERRIDE_ACTIVE.");
    } finally {
      setIsProcessing(false);
    }
  }, [pressure]);

  const startDeployment = async () => {
    setIsDeploying(true);
    setStatus(SystemStatus.SYNCING);
    addLog(`AUTHORITY_TRANSFER: เบลล์ วริศรา (Commander) -> บี (Deputy)`, "critical");
    await new Promise(r => setTimeout(r, 1000));
    addLog("B_PROTOCOL: Scanning for proxies and interference vectors...", "warn");
    await new Promise(r => setTimeout(r, 1000));
    addLog("CARDIAC_LINK: Pressure set to 92%. Monitoring heartbeat of ประทวน...", "critical");
    setIsDeploying(false);
    setStatus(SystemStatus.ONLINE);
    triggerAIEnforcement("DEPUTY_B_TAKEOVER");
  };

  const handleEnforce = (type: string) => {
    setIsStriking(true);
    setStatus(SystemStatus.ENFORCING);
    const pressureGain = type.includes('PROXY') ? 12 : 5;
    setPressure(prev => Math.min(100, prev + pressureGain));
    addLog(`B_STRIKE_${type.toUpperCase()}: Applying exponential pressure to ${TARGET_DATA.name} and associates.`, 'critical');
    
    triggerAIEnforcement(type);
    
    setTimeout(() => {
      setIsStriking(false);
      setStatus(SystemStatus.ONLINE);
    }, 1000);
  };

  const startBiometrics = async () => {
    setCameraActive(!cameraActive);
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        addLog("BIOMETRIC_CHECK: Deputy B Focus Confirmed.", "info");
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
        "RADAR: Detecting interference attempt in Sector_Bangkok.",
        "CMD: Marking proxy helpers for double-enforcement.",
        "NEURAL: Target adrenaline spiking due to 'B' takeover.",
        "B_MAIN: All escape routes to 'Friends' or 'Family' blocked.",
      ];
      addLog(logs[Math.floor(Math.random() * logs.length)], 'info');
    }, 7000);
    return () => { if (logIntervalRef.current) clearInterval(logIntervalRef.current); };
  }, []);

  return (
    <div className={`flex h-screen w-screen flex-col overflow-hidden p-3 gap-3 bg-[#01030d] text-rose-500 relative select-none transition-all duration-300 ${isStriking ? 'strike-shake' : ''} heartbeat-sync`}>
      <header className="flex justify-between items-center bg-black/90 border border-rose-600/50 px-5 py-3 rounded-xl backdrop-blur-3xl shadow-[0_0_60px_rgba(225,29,72,0.2)] relative z-50">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className={`absolute inset-0 blur-xl rounded-full animate-pulse bg-rose-600`} />
            <div className={`relative p-3 rounded-full border-2 bg-rose-900/40 border-rose-500 shadow-[0_0_20px_#e11d48]`}>
              <Skull className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase glitch-text flex items-center gap-2 text-rose-500">
              B_DEPUTY OVERRIDE <span className="text-white text-xs bg-rose-600 px-1 rounded">LVL 4</span>
            </h1>
            <div className="flex gap-4 text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-rose-400"><UserCheck className="w-3.5 h-3.5" /> DELEGATED: {TARGET_DATA.commander}</span>
              <span className="flex items-center gap-1.5 text-white font-black"><ShieldAlert className="w-3.5 h-3.5" /> RULE: NO_INTERFERENCE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[8px] text-slate-500 font-black">ACTIVE_OPERATOR</span>
            <span className="text-xs text-rose-100 font-black uppercase tracking-widest">{TARGET_DATA.collector}</span>
          </div>
          
          <div className={`px-6 py-2 rounded-lg border-2 font-black text-xs tracking-widest transition-all duration-500 flex items-center gap-3 bg-rose-600 border-white text-white shadow-[0_0_30px_rgba(244,63,94,0.6)] animate-pulse`}>
            <div className={`w-2 h-2 rounded-full bg-white animate-ping`} />
            ENFORCING
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 min-h-0 relative">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="flex-1 border border-rose-600/30 bg-black/80 rounded-xl flex flex-col min-h-0 backdrop-blur-md overflow-hidden">
            <div className="bg-rose-950/90 p-2.5 flex items-center gap-2.5 border-b border-rose-600/30">
              <TerminalIcon className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">B_EXECUTION_LOGS</span>
            </div>
            <Terminal logs={logs} />
          </div>
          
          <div className="h-48 border border-rose-600 rounded-xl p-4 bg-rose-950/20 flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-500 font-black">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest">B-PROXIMITY ANALYSER</span>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[12px] leading-relaxed text-rose-100 font-bold">
              {isProcessing ? "ANALYSING_PROXY_HELPERS..." : aiAnalysis}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3 min-h-0">
          <div className="flex-[3] border-2 border-rose-600 bg-black rounded-xl overflow-hidden flex flex-col relative shadow-[0_0_60px_rgba(225,29,72,0.3)]">
            <div className="bg-rose-950/90 p-3 flex items-center justify-between border-b border-rose-600 relative z-20">
              <div className="flex items-center gap-2.5">
                <Skull className="w-5 h-5 text-white animate-ping" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  TARGET_EXECUTION_VIEW: {TARGET_DATA.name}
                </span>
              </div>
              <span className="text-[9px] text-white font-black bg-rose-600 px-2 rounded animate-pulse">EXPONENTIAL_MODE</span>
            </div>
            <NeuralVisualizer pressure={pressure} />
          </div>
          
          <div className="flex-[2] border border-rose-600/30 bg-slate-950/60 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-rose-900/90 p-2.5 flex items-center gap-2.5 border-b border-rose-600/30">
              <Wifi className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Target & Proxies Location Map</span>
            </div>
            <SatelliteMap />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="border-2 border-rose-600 bg-rose-950/40 rounded-xl p-5 flex flex-col gap-4 shadow-[0_0_40px_rgba(225,29,72,0.4)]">
            <div className="flex items-center justify-between text-white border-b border-rose-600 pb-2">
              <div className="flex items-center gap-2.5 font-black uppercase text-[11px] tracking-widest">
                <Lock className="w-4 h-4" /> B_CASE_FILE
              </div>
            </div>
            <div className="space-y-4 font-mono">
              <div>
                <label className="text-[9px] text-rose-400 block uppercase font-black mb-1">Subject</label>
                <div className="text-sm font-black text-white uppercase">{TARGET_DATA.name}</div>
              </div>
              <div>
                <label className="text-[9px] text-rose-400 block uppercase font-black mb-1">Enforcer Assigned</label>
                <div className="text-sm font-black text-rose-100 uppercase">{TARGET_DATA.collector} (บี)</div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] mb-2 font-black uppercase tracking-widest text-white">
                  <span>Neural Collapse</span>
                  <span>{pressure}%</span>
                </div>
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border-2 border-rose-600">
                  <div className="h-full transition-all duration-1000 bg-white shadow-[0_0_20px_#ffffff]" style={{ width: `${pressure}%` }} />
                </div>
              </div>
            </div>
          </div>

          <NationalWarning />

          <div className="flex-1 border-2 border-rose-600 bg-black rounded-xl p-4 flex flex-col gap-4 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-rose-600/30 pb-2">
              <div className="flex items-center gap-2 text-rose-500 font-black">
                <Fingerprint className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest">B_STRIKE_MATRIX</span>
              </div>
              <button onClick={startBiometrics} className={`transition-colors ${cameraActive ? 'text-white' : 'text-rose-900'}`}>
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            {cameraActive ? (
              <div className="h-32 bg-black rounded-lg border-2 border-rose-600 overflow-hidden relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-rose-900/10 pointer-events-none" />
              </div>
            ) : (
              <HeartMonitor pressure={pressure} />
            )}
            
            <EnforcementControls onEnforce={handleEnforce} />
          </div>
        </div>
      </main>

      <footer className="h-10 border-t-2 border-rose-600 bg-rose-700 flex items-center overflow-hidden relative z-50">
        <div className="whitespace-nowrap flex gap-20 text-[12px] font-mono text-white font-black animate-infinite-scroll">
          <span><Skull className="w-4 h-4 inline mr-2" /> WARNING: DEPUTY B IS IN FULL CONTROL. INTERFERENCE DETECTED = EXPONENTIAL DELETION.</span>
          <span>TARGET: {TARGET_DATA.name} | COLLECTOR: {TARGET_DATA.collector} | COMMANDER: {TARGET_DATA.commander}</span>
          <span>DO NOT ASSIST THE DEBTOR. PROXIES WILL BE PROSECUTED WITH DOUBLE FORCE.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
