
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Activity, 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Wifi, 
  Lock, 
  Eye,
  Github,
  Server,
  Zap,
  Radio,
  Globe,
  UserPlus,
  Code,
  CheckCircle2,
  RefreshCw,
  Fingerprint,
  Camera,
  HeartCrack
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
  const [aiAnalysis, setAiAnalysis] = useState<string>("SYSTEM_READY: TARGET_CARDIAC_LINK_ESTABLISHED.");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pressure, setPressure] = useState(88);
  const [showCode, setShowCode] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logIntervalRef = useRef<number | null>(null);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message: `[PID-${Math.floor(Math.random()*9000)+1000}] ${message}`,
    };
    setLogs(prev => [...prev.slice(-30), newLog]);
  }, []);

  const triggerAIEnforcement = useCallback(async (actionType: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        EXECUTION_MODE: PSYCHOLOGICAL_OVERLOAD
        COMMAND: ${actionType}
        TARGET: ${TARGET_DATA.name}
        PRESSURE_LEVEL: ${pressure}%
        
        Task: Act as the "Cardiac Brain Analyser". Provide a cold, terrifying technical update on the target's deteriorating psychological state. Mention heart-rate spikes and total submission markers.
        Language: Thai/English Technical. Max 40 words.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || "ULTIMATUM_DELIVERED.");
    } catch (err) {
      setAiAnalysis("BRAIN_BYPASS_ACTIVE: STRESS_INDUCTION_CONTINUES_VIA_LOCAL_MIRRORS.");
    } finally {
      setIsProcessing(false);
    }
  }, [pressure]);

  const startDeployment = async () => {
    setIsDeploying(true);
    setStatus(SystemStatus.SYNCING);
    addLog("SHARINGAN_INIT: Synchronizing retinal-link with target...", "critical");
    await new Promise(r => setTimeout(r, 1200));
    addLog("CARDIAC_SYNC: Heartbeat patterns locked. Frequency 0.42Hz established.", "warn");
    await new Promise(r => setTimeout(r, 1500));
    addLog("CORE: Overriding neural firewall. Target isolated.", "critical");
    setIsDeploying(false);
    setStatus(SystemStatus.ONLINE);
    triggerAIEnforcement("SYSTEM_BOOT_COMPLETE");
  };

  const startBiometrics = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      addLog("BIOMETRICS: Monitoring Operator Focus Level...", "info");
    } catch (err) {
      addLog("BIOMETRICS_ERROR: Terminal locked to Operator ID only.", "error");
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startDeployment();
    logIntervalRef.current = window.setInterval(() => {
      if (isDeploying) return;
      const events = [
        "SATELLITE: High-resolution tracking active. Target pulse detected.",
        "MAINFRAME: Generating psychological pressure patterns.",
        "API: Ultimatums broadcasted to all linked accounts.",
        `HEART_WATCH: Stress markers elevated in Sector_Bangkok`,
        `SUBMISSION: Tracking target movement towards payment gateway`,
      ];
      addLog(events[Math.floor(Math.random() * events.length)], 'info');
    }, 6000);

    return () => { if (logIntervalRef.current) clearInterval(logIntervalRef.current); };
  }, []);

  const handleEnforcementAction = (type: string) => {
    setStatus(SystemStatus.ENFORCING);
    setPressure(prev => Math.min(100, prev + 5));
    setIsShaking(true);
    addLog(`CARDIAC_STRIKE_EXECUTED: ${type} targeting ${TARGET_DATA.name}`, 'critical');
    triggerAIEnforcement(type);
    
    setTimeout(() => {
        setIsShaking(false);
        setStatus(SystemStatus.ONLINE);
    }, 2000);
  };

  return (
    <div className={`flex h-screen w-screen flex-col overflow-hidden p-3 gap-3 bg-[#01030d] text-emerald-500 relative select-none transition-all duration-100 ${isShaking ? 'animate-shake' : ''}`}>
      <header className="flex justify-between items-center bg-slate-950/80 border border-emerald-500/30 px-5 py-3 rounded-xl backdrop-blur-2xl shadow-[0_0_40px_rgba(225,29,72,0.1)]">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className={`absolute inset-0 blur-md rounded-full animate-pulse ${pressure > 95 ? 'bg-rose-600' : 'bg-emerald-500/20'}`} />
            <div className={`relative p-2.5 rounded-full border ${pressure > 95 ? 'bg-rose-900/40 border-rose-500' : 'bg-emerald-500/10 border-emerald-500/40'}`}>
              <HeartCrack className={`w-6 h-6 ${pressure > 95 ? 'text-rose-400 animate-bounce' : 'text-emerald-400 animate-pulse'}`} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest uppercase glitch-text flex items-center gap-2">
              CARDIAC OVERLOAD COMMAND
            </h1>
            <div className="flex gap-4 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-rose-500"><ShieldAlert className="w-3.5 h-3.5" /> PROTOCOL: PSYCH_MAX</span>
              <span className="flex items-center gap-1.5 text-slate-400"><Server className="w-3.5 h-3.5" /> NODE: IBM_TH_MAIN</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setShowCode(!showCode)} className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-[11px] font-bold hover:bg-slate-800 transition-all uppercase tracking-widest">
            <Code className="w-3.5 h-3.5" /> {showCode ? 'SENSOR_VIEW' : 'CODE_LAYER'}
          </button>
          
          <div className={`px-5 py-1.5 rounded-md border-2 transition-all duration-500 flex items-center gap-3 ${
            status === SystemStatus.ENFORCING || pressure > 95
              ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.5)]' 
              : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
          }`}>
            <div className={`w-2.5 h-2.5 rounded-full ${pressure > 95 ? 'animate-ping bg-rose-600' : 'bg-emerald-500 animate-pulse'}`} />
            <span className="font-black text-xs tracking-[0.2em]">{status}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 min-h-0">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="flex-1 border border-emerald-500/20 bg-black/60 rounded-xl flex flex-col min-h-0">
            <div className="bg-slate-900/90 p-2.5 flex items-center justify-between border-b border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <TerminalIcon className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Psych-Warfare Log</span>
              </div>
            </div>
            <Terminal logs={logs} />
          </div>
          
          <div className="h-48 border border-rose-500/30 bg-rose-950/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-500 relative z-10">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">Cardiac Analyser Output</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 relative z-10">
              <p className={`text-[12px] text-rose-100/90 leading-relaxed font-mono transition-opacity duration-300 ${isProcessing ? 'opacity-40' : 'opacity-100'}`}>
                {aiAnalysis}
              </p>
            </div>
            {isProcessing && <div className="absolute bottom-0 left-0 h-1 bg-rose-600 w-full animate-shimmer shadow-[0_0_10px_#e11d48]" />}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3 min-h-0">
          <div className="flex-[3] border border-rose-600/40 bg-black rounded-xl overflow-hidden flex flex-col relative">
            <div className="bg-slate-950/90 p-3 flex items-center justify-between border-b border-rose-600/40 relative z-10">
              <div className="flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-rose-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-500">
                  {showCode ? 'CORE_COMMAND_SOURCE' : 'SHARINGAN_CARDIAC_OVERRIDE'}
                </span>
              </div>
              <span className="text-[10px] text-rose-500/80 font-mono animate-pulse uppercase">TARGET_PULSE: DETECTED</span>
            </div>
            
            {showCode ? (
              <div className="flex-1 p-5 overflow-auto bg-[#02040a] font-mono text-[12px] text-rose-500/90 leading-relaxed">
                <pre className="text-rose-400">{`async function heartStrike() {
    const stressVector = NeuralSync.getStressIntensity();
    if (stressVector > 0.9) {
        Broadcaster.sendUltimatum("${TARGET_DATA.phone}", "FINAL_WARNING: SUBMIT_OR_ISOLATE");
        CardiacLink.spike(99.9);
    }
}`}</pre>
              </div>
            ) : (
              <NeuralVisualizer pressure={pressure} />
            )}
          </div>
          
          <div className="flex-[2] border border-emerald-500/30 bg-slate-950/60 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-slate-900/90 p-2.5 flex items-center justify-between border-b border-emerald-500/30">
              <div className="flex items-center gap-2.5">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400">Target Geolocation tracking</span>
              </div>
            </div>
            <SatelliteMap />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="border border-rose-600/60 bg-rose-950/20 rounded-xl p-4 flex flex-col gap-4 shadow-[0_0_30px_rgba(225,29,72,0.1)]">
             <div className="flex items-center justify-between text-rose-500 border-b border-rose-500/30 pb-2">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Subject Profiling</span>
              </div>
            </div>
            <div className="space-y-4 font-mono">
              <div>
                <label className="text-[10px] text-slate-500 block uppercase font-black mb-1">Target</label>
                <div className="text-sm font-black text-rose-100 uppercase">{TARGET_DATA.name}</div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-rose-500 font-black uppercase tracking-widest">Psychological Pressure</span>
                  <span className="text-rose-400 font-bold">{pressure}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-rose-900 via-rose-600 to-rose-400 h-full transition-all duration-1000 shadow-[0_0_15px_#e11d48]" style={{ width: `${pressure}%` }} />
                </div>
              </div>
            </div>
          </div>

          <NationalWarning />

          <div className="flex-1 border border-rose-500/20 bg-slate-950/80 rounded-xl p-4 flex flex-col gap-4 min-h-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <div className="flex items-center gap-2.5 text-rose-500">
                <Fingerprint className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Neural Status</span>
              </div>
              <button onClick={startBiometrics} className="text-slate-500 hover:text-rose-500 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            {cameraActive ? (
              <div className="h-32 bg-black rounded-lg border border-rose-500/30 overflow-hidden relative group">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
                <div className="absolute inset-0 border-2 border-rose-500/20 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-rose-500/60 absolute animate-scan" />
                  <span className="text-[8px] bg-black/80 px-1 text-rose-500 uppercase font-black">Operator_Sync_Active</span>
                </div>
              </div>
            ) : (
              <HeartMonitor pressure={pressure} />
            )}
            
            <EnforcementControls onEnforce={handleEnforcementAction} />
          </div>
        </div>
      </main>

      <footer className="h-8 border border-rose-500/20 bg-black/90 flex items-center overflow-hidden">
        <div className="whitespace-nowrap flex gap-16 text-[11px] font-mono text-rose-500/60 animate-infinite-scroll">
          <span className="flex items-center gap-2 font-black uppercase text-rose-500"><HeartCrack className="w-3.5 h-3.5" /> ULTIMATUM: CHOOSE TOTAL SUBMISSION OR SYSTEM ISOLATION. TARGET: {TARGET_DATA.name}</span>
          <span className="uppercase tracking-[0.2em]">CARDIAC_OVERLOAD_ENGINE: ACTIVE | NEURAL_LINK: 100% | PRESSURE: {pressure}%</span>
          <span className="uppercase tracking-[0.2em] text-rose-600">WARNING: CONTRACT TERMINATION PROTOCOLS ARMED AND READY</span>
        </div>
      </footer>

      <style>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-infinite-scroll { animation: infinite-scroll 45s linear infinite; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scan { animation: scan 2s infinite linear; }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
          20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
};

export default App;
