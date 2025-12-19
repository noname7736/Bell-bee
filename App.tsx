
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
  Camera
} from 'lucide-react';
import { SystemStatus, LogEntry } from './types';
import { TARGET_DATA } from './constants';
import Terminal from './components/Terminal';
import NeuralVisualizer from './components/NeuralVisualizer';
import StatusGrid from './components/StatusGrid';
import SatelliteMap from './components/SatelliteMap';
import EnforcementControls from './components/EnforcementControls';
import NationalWarning from './components/NationalWarning';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.ONLINE);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("SYSTEM_IDLE: STANDING BY FOR COMMAND.");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pressure, setPressure] = useState(85);
  const [showCode, setShowCode] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
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
        EXECUTION_MODE: ${actionType}
        TARGET: ${TARGET_DATA.name} (${TARGET_DATA.phone})
        CLIENT: ${TARGET_DATA.commander}
        HANDOVER_AGENT: ${TARGET_DATA.collector}
        NATIONAL_WARNING: ${TARGET_DATA.nationalWarning}
        
        Task: Act as the "Brain Analyser" from the blueprint. Provide a cold, technical update on the enforcement progress and the risk to any Thailand-based accomplices regarding their contracts.
        Language: Thai/English Hybrid Technical. Max 45 words.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text || "PROTOCOL_STABLE");
    } catch (err) {
      setAiAnalysis("EMERGENCY: AI_CORE_BYPASS_ENGAGED. ENFORCEMENT CONTINUES.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const startDeployment = async () => {
    setIsDeploying(true);
    setStatus(SystemStatus.SYNCING);
    addLog("GIT_PUSH: Initiating repository sync to GitHub Enterprise...", "info");
    await new Promise(r => setTimeout(r, 1200));
    addLog("CI/CD: GitHub Actions pipeline #9928 triggered. Building kernel modules...", "info");
    await new Promise(r => setTimeout(r, 1800));
    addLog("INFRA: Connecting to IBM/DELL PowerEdge Cluster @ Sector_TH...", "warn");
    await new Promise(r => setTimeout(r, 1500));
    addLog("CORE: api_gateway.js online. SMS/TV/Social pipelines connected.", "critical");
    addLog("CORE: core_kernel.cpp active. Sharingan Reality Distortion Engine v7.4 engaged.", "critical");
    setIsDeploying(false);
    setStatus(SystemStatus.ONLINE);
    triggerAIEnforcement("SYSTEM_READY");
  };

  const startBiometrics = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      addLog("BIOMETRICS: Accessing system camera for ID verification...", "info");
    } catch (err) {
      addLog("BIOMETRICS_ERROR: Permission denied.", "error");
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startDeployment();
    logIntervalRef.current = window.setInterval(() => {
      if (isDeploying) return;
      const events = [
        "SATELLITE: Tracking target signal @ Sector_Bangkok",
        "MAINFRAME: Validating employment contracts for all TH contractors",
        "API: Broadcasting 'National Alert' to Social Media Mirrors",
        `SHARINGAN: Projecting debt_shaming patterns to target neural-link`,
        `HANDOVER: Syncing collection parameters with Agent ${TARGET_DATA.collector}`,
      ];
      addLog(events[Math.floor(Math.random() * events.length)], 'info');
    }, 7000);

    return () => { if (logIntervalRef.current) clearInterval(logIntervalRef.current); };
  }, []);

  const handleEnforcementAction = (type: string) => {
    setStatus(SystemStatus.ENFORCING);
    setPressure(prev => Math.min(100, prev + 8));
    addLog(`COMMAND_EXECUTED: ${type} initiated by ${TARGET_DATA.commander}`, 'critical');
    triggerAIEnforcement(type);
    setTimeout(() => setStatus(SystemStatus.ONLINE), 4000);
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden p-3 gap-3 bg-[#01030d] text-emerald-500 relative select-none">
      <header className="flex justify-between items-center bg-slate-950/80 border border-emerald-500/30 px-5 py-3 rounded-xl backdrop-blur-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full animate-pulse" />
            <div className="relative p-2.5 bg-emerald-500/10 rounded-full border border-emerald-500/40">
              <Zap className={`w-6 h-6 text-emerald-400 ${isDeploying ? 'animate-spin' : 'animate-pulse'}`} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest uppercase glitch-text flex items-center gap-2">
              Sovereign Empire Command Center
            </h1>
            <div className="flex gap-4 text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400"><Github className="w-3.5 h-3.5" /> REPO_ACTIVE: SUPER-3MAX-PRO-ULTIMATE</span>
              <span className="flex items-center gap-1.5 text-emerald-500/70"><Server className="w-3.5 h-3.5" /> MAINFRAME_IO: LINKED</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setShowCode(!showCode)} className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-[11px] font-bold hover:bg-slate-800 transition-all uppercase tracking-widest">
            <Code className="w-3.5 h-3.5" /> {showCode ? 'HUD_VIEW' : 'CODE_DEBUG'}
          </button>
          
          <button onClick={startDeployment} disabled={isDeploying} className="flex items-center gap-2 px-4 py-1.5 bg-emerald-900/20 border border-emerald-500/40 rounded-md text-[11px] font-bold text-emerald-400 hover:bg-emerald-800/40 transition-all uppercase tracking-widest">
            <RefreshCw className={`w-3.5 h-3.5 ${isDeploying ? 'animate-spin' : ''}`} /> Redeploy
          </button>

          <div className={`px-5 py-1.5 rounded-md border-2 transition-all duration-500 flex items-center gap-3 ${
            status === SystemStatus.ENFORCING 
              ? 'bg-rose-500/20 border-rose-500 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
              : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
          }`}>
            <div className={`w-2.5 h-2.5 rounded-full ${status === SystemStatus.ENFORCING ? 'animate-ping bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
            <span className="font-black text-xs tracking-[0.2em]">{isDeploying ? 'BOOTING...' : status}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 min-h-0">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="flex-1 border border-emerald-500/20 bg-black/60 rounded-xl flex flex-col min-h-0 shadow-inner">
            <div className="bg-slate-900/90 p-2.5 flex items-center justify-between border-b border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <TerminalIcon className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.15em]">Mainframe Execution Log</span>
              </div>
              <span className="text-[10px] text-slate-500">REALTIME_IO</span>
            </div>
            <Terminal logs={logs} />
          </div>
          
          <div className="h-48 border border-emerald-500/20 bg-slate-950/80 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-500 relative z-10">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">Brain Analyser Output</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 relative z-10">
              <p className={`text-[12px] text-slate-200 leading-relaxed font-mono transition-opacity duration-300 ${isProcessing ? 'opacity-40' : 'opacity-100'}`}>
                {aiAnalysis}
              </p>
            </div>
            {isProcessing && <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-full animate-shimmer shadow-[0_0_10px_#10b981]" />}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3 min-h-0">
          <div className="flex-[3] border border-rose-500/30 bg-black rounded-xl overflow-hidden flex flex-col relative">
            <div className="bg-slate-950/90 p-3 flex items-center justify-between border-b border-rose-500/30 relative z-10">
              <div className="flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-rose-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-500">
                  {showCode ? 'CORE_SYSTEM_BLUEPRINT' : 'SHARINGAN_NEURAL_TRACKER'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-rose-500/80 font-mono animate-pulse uppercase">TARGET_SYNC: ACTIVE</span>
              </div>
            </div>
            
            {showCode ? (
              <div className="flex-1 p-5 overflow-auto bg-[#02040a] font-mono text-[12px] text-emerald-500/90 leading-relaxed">
                <div className="mb-6 border-l-2 border-emerald-500/20 pl-4">
                  <div className="text-slate-500 mb-2 border-b border-slate-800/50 pb-1 flex justify-between uppercase text-[10px] font-black">
                    <span>File: src/api_gateway.js</span>
                    <span className="text-emerald-500">OPERATIONAL</span>
                  </div>
                  <pre className="text-emerald-400">{`async function triggerEnforcement() {
    const payload = {
        to: "${TARGET_DATA.phone}",
        message: "คำสั่งจาก ${TARGET_DATA.commander}: ประทวน จ่ายเงินให้บีเดี๋ยวนี้!",
        broadcast_channels: ["TV36", "SOCIAL100", "MIRROR_GRID"]
    };
    await axios.post('https://api.enterprise-secure.pipe/v1/enforce', payload);
    console.log("[API-ACTIVE] Broadcasting ultimatum...");
}`}</pre>
                </div>
                <div className="border-l-2 border-rose-500/20 pl-4">
                  <div className="text-slate-500 mb-2 border-b border-slate-800/50 pb-1 flex justify-between uppercase text-[10px] font-black">
                    <span>File: src/core_kernel.cpp</span>
                    <span className="text-rose-500 animate-pulse">LOCKED_ON_KERNEL</span>
                  </div>
                  <pre className="text-rose-400">{`int main() {
    NeuralLink::Connect("66815153704");
    while(SYSTEM_ALIVE) {
        auto thought = NeuralLink::Intercept();
        Sharingan::ProjectToAllScreens(thought, "MODE: DEBTOR_SHAMING");
        Kernel::LockResources();
    }
    return 0;
}`}</pre>
                </div>
              </div>
            ) : (
              <NeuralVisualizer />
            )}
          </div>
          
          <div className="flex-[2] border border-emerald-500/30 bg-slate-950/60 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-slate-900/90 p-2.5 flex items-center justify-between border-b border-emerald-500/30">
              <div className="flex items-center gap-2.5">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400">Tactical Satellite Surveillance</span>
              </div>
              <span className="text-[10px] text-cyan-500/60 font-mono">ID: GSAT-4-TH</span>
            </div>
            <SatelliteMap />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="border border-rose-500/40 bg-rose-950/10 rounded-xl p-4 flex flex-col gap-4 shadow-[0_0_20px_rgba(244,63,94,0.05)]">
            <div className="flex items-center justify-between text-rose-500 border-b border-rose-500/20 pb-2">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.15em]">Active Target Manifest</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="space-y-4 font-mono">
              <div>
                <label className="text-[10px] text-slate-500 block uppercase font-black mb-1">Target Subject</label>
                <div className="text-sm font-black text-slate-100 uppercase tracking-tight">{TARGET_DATA.name}</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-[10px] text-slate-500 block uppercase font-black mb-1">Enforcement Agent</label>
                  <div className="text-xs text-rose-500 font-black uppercase">{TARGET_DATA.collector} (บี)</div>
                </div>
                <div className="text-right">
                  <label className="text-[10px] text-slate-500 block uppercase font-black mb-1">Contract Status</label>
                  <div className="text-xs text-amber-500 font-black animate-pulse uppercase">PENDING_CANCELLATION</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-rose-500 font-black uppercase tracking-widest">Enforcement Pressure</span>
                  <span className="text-slate-400 font-bold">{pressure}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-rose-900 via-rose-600 to-rose-400 h-full transition-all duration-1000 shadow-[0_0_15px_#e11d48]" style={{ width: `${pressure}%` }} />
                </div>
              </div>
            </div>
          </div>

          <NationalWarning />

          <div className="flex-1 border border-emerald-500/20 bg-slate-950/80 rounded-xl p-4 flex flex-col gap-4 min-h-0 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Fingerprint className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Biometric Status</span>
              </div>
              <button onClick={startBiometrics} className="text-slate-500 hover:text-emerald-400 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            {cameraActive ? (
              <div className="h-32 bg-black rounded-lg border border-emerald-500/30 overflow-hidden relative group">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all" />
                <div className="absolute inset-0 border-2 border-emerald-500/20 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-emerald-500/40 absolute animate-scan" />
                  <span className="text-[8px] bg-black/80 px-1 text-emerald-500 uppercase font-black">Scanning_Operator_ID</span>
                </div>
              </div>
            ) : (
              <StatusGrid />
            )}
            <div className="h-px bg-slate-800/50" />
            <EnforcementControls onEnforce={handleEnforcementAction} />
          </div>
        </div>
      </main>

      <footer className="h-8 border border-emerald-500/20 bg-black/90 flex items-center overflow-hidden">
        <div className="whitespace-nowrap flex gap-16 text-[11px] font-mono text-emerald-500/60 animate-infinite-scroll">
          <span className="flex items-center gap-2 font-black uppercase text-rose-500"><ShieldAlert className="w-3.5 h-3.5" /> WARNING: ALL ASSISTANCE TO {TARGET_DATA.name} WILL TRIGGER IMMEDIATE CONTRACT TERMINATION</span>
          <span className="uppercase tracking-[0.2em]">PIPELINE: EXECUTING SUPER-3MAX-PRO-ULTIMATE ON IBM/DELL MAINFRAME</span>
          <span className="uppercase tracking-[0.2em]">TARGET: {TARGET_DATA.name} | PRESSURE_LEVEL: {pressure}% | STATUS: ISOLATED</span>
          <span className="uppercase tracking-[0.2em] text-cyan-400">SHARINGAN_ENGINE_V7.4: REALITY_DISTORTION_ACTIVE</span>
          <span className="uppercase tracking-[0.2em]">DEPLOYMENT_ID: RECOV-992-B-ALPHA | HANDOVER_STATUS: READY</span>
        </div>
      </footer>

      <style>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-infinite-scroll { animation: infinite-scroll 60s linear infinite; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scan { animation: scan 3s infinite linear; }
      `}</style>
    </div>
  );
};

export default App;
