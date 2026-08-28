import React, { useState, useEffect, useRef } from 'react';

export const NexaTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [ping, setPing] = useState<number>(1);
  const [soundEnabled] = useState<boolean>(true);
  const [bmgActive, setBmgActive] = useState<boolean>(false);
  const [firewallActive, setFirewallActive] = useState<boolean>(true);
  const [hackingActive, setHackingActive] = useState<boolean>(false);
  const [hackTarget, setHackTarget] = useState<string>('');
  const [hackAttempts, setHackAttempts] = useState<number>(3);
  const [droneFleetActive, setDroneFleetActive] = useState<boolean>(false);
  const [databaseActive, setDatabaseActive] = useState<boolean>(false);
  const [threatCount, setThreatCount] = useState<number>(0);

  // New Corporate & Enterprise Feature States
  const [portfolioActive, setPortfolioActive] = useState<boolean>(false);
  const [aiNeuralActive, setAiNeuralActive] = useState<boolean>(false);

  // Camera Advanced State
  const [cameraMode, setCameraMode] = useState<'off' | 'biometric' | 'detect' | 'analyze'>('off');
  const [, setMotionLevel] = useState<number>(0);
  const [, setDetectedObject] = useState<string>('Initializing...');
  const [, setScanProgress] = useState<number>(0);

  const [cpuUsage, setCpuUsage] = useState<number>(9.8);
  const [ramUsage, setRamUsage] = useState<number>(3.0);

  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Enterprise Inc. OS v35.0 [Corporate Command Center]' },
    { type: 'system', text: 'Chief Executive Officer & Founder: Maulana Rifa\'i' },
    { type: 'system', text: 'Ketik "help", "portfolio", "enterprise", "database", "fleet", "scan", atau "ai <pesan>".' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bmgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(Math.random() * 2) + 1);
      setCpuUsage(+(8 + Math.random() * 5).toFixed(1));
      setRamUsage(+(2.9 + Math.random() * 0.1).toFixed(2));
      if (Math.random() > 0.6) setThreatCount(prev => prev + 1);
      
      if(cameraMode === 'detect') {
        const newMotion = Math.floor(Math.random() * 101);
        setMotionLevel(newMotion);
        if (newMotion > 85) {
            setLogs(prev => [...prev, { type: 'error', text: `[ALERT] Intrusion Movement Detected! Level: ${newMotion}%` }]);
            speakText('Peringatan! Intrusi terdeteksi.');
        }
      }
      
      if(cameraMode === 'analyze') {
          const objects = ['Person', 'Laptop', 'Smartphone', 'Chair', 'Table', 'Quantum Node'];
          setDetectedObject(objects[Math.floor(Math.random() * objects.length)]);
      }

    }, 1500);
    return () => clearInterval(timer);
  }, [cameraMode]);

  useEffect(() => {
    if (!bmgActive) {
      if (bmgIntervalRef.current) clearInterval(bmgIntervalRef.current);
      return;
    }

    const freqs = [110, 130.81, 164.81, 196, 220, 261.63, 329.63, 392, 523.25];
    const playTone = () => {
      try {
        const AudioContextWindow = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const ctx = new AudioContextWindow();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freqs[Math.floor(Math.random() * freqs.length)], ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch {
        // Ignore
      }
    };

    bmgIntervalRef.current = setInterval(playTone, 250);
    return () => {
      if (bmgIntervalRef.current) clearInterval(bmgIntervalRef.current);
    };
  }, [bmgActive]);

  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextWindow = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContextWindow();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170 + Math.random() * 50, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Ignore
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraMode('off');
  };

  const startCamera = async (mode: 'biometric' | 'detect' | 'analyze') => {
    stopCamera();
    setCameraMode(mode);
    
    let actionText = '';
    let voiceText = '';
    
    if (mode === 'biometric') {
        actionText = '[biometric] Mengaktifkan sensor kamera untuk verifikasi korporat CEO...';
        voiceText = 'Memindai biometrik wajah CEO Maulana Rifa\'i.';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setScanProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 150);
    } else if (mode === 'detect') {
        actionText = '[camera:detect] Mengaktifkan sistem keamanan perimeter korporat...';
        voiceText = 'Sistem keamanan perusahaan diaktifkan.';
    } else if (mode === 'analyze') {
        actionText = '[camera:analyze] Mengaktifkan AI Computer Vision untuk analisis fasilitas...';
        voiceText = 'Analisis fasilitas perusahaan diaktifkan.';
    }
    
    setLogs(prev => [...prev, { type: 'system', text: actionText }]);
    speakText(voiceText);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      if (mode === 'biometric') {
        setTimeout(() => {
            stopCamera();
            setLogs(prev => [
              ...prev, 
              { type: 'output', text: '[SUCCESS] Corporate Biometric Verified 100% MATCH!\n[CEO ACCESS] Selamat datang kembali, Chief Executive Officer Maulana Rifa\'i.' }
            ]);
            speakText('Verifikasi CEO berhasil. Akses penuh korporat diberikan.');
            setScanProgress(0);
        }, 3500);
      }
      
    } catch (err) {
      console.error(err);
      stopCamera();
      setLogs(prev => [...prev, { type: 'error', text: '[ERROR] Gagal mengakses kamera perangkat.' }]);
    }
  };

  // New Feature: Corporate Portfolio & Asset Tracker
  const startCorporatePortfolio = () => {
    setPortfolioActive(true);
    setLogs(prev => [
      ...prev,
      { type: 'system', text: '[PORTFOLIO] Mengambil data portofolio finansial dan aset global Nexa Global Enterprise...' }
    ]);
    speakText('Memuat portofolio aset perusahaan.');

    setTimeout(() => {
      setPortfolioActive(false);
      setLogs(prev => [
        ...prev,
        { type: 'output', text: '[SUCCESS] Nexa Global Enterprise Financial Portfolio:\n- Total Valuation: $1,250,000,000 (Unicorn Certified)\n- Active Subsidiary Nodes: 12 Global Regions\n- Q3 Revenue Growth: +142% YoY\n- Founder & CEO: Maulana Rifa\'i' }
      ]);
      speakText('Portofolio perusahaan berhasil dimuat.');
    }, 2000);
  };

  // New Feature: AI Neural Executive Decision Support
  const startAiNeuralEngine = () => {
    setAiNeuralActive(true);
    setLogs(prev => [
      ...prev,
      { type: 'system', text: '[AI NEURAL] Menjalankan simulasi keputusan strategis eksekutif...' }
    ]);
    speakText('Menjalankan kecerdasan buatan eksekutif.');

    setTimeout(() => {
      setAiNeuralActive(false);
      setLogs(prev => [
        ...prev,
        ...prev,
        { type: 'output', text: '[SUCCESS] AI Executive Decision Ready:\n- Rekomendasi Pasar: Ekspansi infrastruktur Asia Pasifik & Cloud Quantum.\n- Status Risiko: Minimal (0.02%)\n- Chief Strategy Officer AI: Online\n- Disetujui oleh: Maulana Rifa\'i' }
      ]);
      speakText('Analisis keputusan eksekutif selesai.');
    }, 2000);
  };

  const startEnterpriseDatabase = () => {
    setDatabaseActive(true);
    setLogs(prev => [
      ...prev,
      { type: 'system', text: '[DATABASE] Menghubungkan ke Enterprise Distributed Quantum Database Cluster...' }
    ]);
    speakText('Menghubungkan ke basis data perusahaan.');

    setTimeout(() => {
      setDatabaseActive(false);
      setLogs(prev => [
        ...prev,
        { type: 'output', text: '[SUCCESS] Enterprise Database Synced!\n- Active Records: 1,000,000,000+ Encrypted Nodes\n- Supreme Administrator: Maulana Rifa\'i' }
      ]);
      speakText('Basis data perusahaan berhasil disinkronisasi.');
    }, 2000);
  };

  const startDroneFleetUplink = () => {
    setDroneFleetActive(true);
    setLogs(prev => [
      ...prev,
      { type: 'system', text: '[FLEET] Menginisialisasi Global Corporate Fleet (64 Satellites & 120 Drones)...' }
    ]);
    speakText('Mengaktifkan armada logistik global.');

    setTimeout(() => {
      setDroneFleetActive(false);
      setLogs(prev => [
        ...prev,
        { type: 'output', text: '[SUCCESS] Global Corporate Fleet Active!\n- Satellite Grid: 64 Orbital Nodes Linked\n- Ultimate Commander: Maulana Rifa\'i' }
      ]);
      speakText('Armada perusahaan siap beroperasi.');
    }, 2500);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim();
    const lowerCmd = rawCmd.toLowerCase();
    if (!rawCmd) return;

    if (hackingActive) {
      const newLogs = [...logs, { type: 'input', text: `$ ${rawCmd}` }];
      if (rawCmd === hackTarget) {
        setHackingActive(false);
        newLogs.push({ type: 'output', text: `[SUCCESS] PIN Correct! Corporate root access granted to CEO Maulana Rifa'i.` });
        speakText('Akses root utama dibuka.');
      } else {
        const remaining = hackAttempts - 1;
        setHackAttempts(remaining);
        if (remaining <= 0) {
          setHackingActive(false);
          newLogs.push({ type: 'error', text: '[SECURITY LOCKOUT] Percobaan habis! Sistem pertahanan aktif.' });
          speakText('Sistem pertahanan aktif.');
        } else {
          newLogs.push({ type: 'error', text: `[FAILED] PIN salah. Sisa kesempatan: ${remaining}.` });
        }
      }
      setLogs(newLogs);
      return;
    }

    const newLogs = [...logs, { type: 'input', text: `$ ${rawCmd}` }];

    if (lowerCmd === 'portfolio' || lowerCmd === 'assets') {
      startCorporatePortfolio();
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'ai-neural' || lowerCmd === 'executive') {
      startAiNeuralEngine();
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'scan' || lowerCmd === 'biometric') {
      startCamera('biometric');
      setLogs(newLogs);
      return;
    }
    
    if (lowerCmd === 'camera detect' || lowerCmd === 'detect') {
      startCamera('detect');
      setLogs(newLogs);
      return;
    }
    
    if (lowerCmd === 'camera analyze' || lowerCmd === 'analyze') {
      startCamera('analyze');
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'database' || lowerCmd === 'db') {
      startEnterpriseDatabase();
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'fleet' || lowerCmd === 'drone') {
      startDroneFleetUplink();
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'quantum' || lowerCmd === 'core') {
      newLogs.push({
        type: 'output',
        text: '[⚛️ QUANTUM NEURAL SYNTHESIZER]\n- Processing Speed: 9.8 PetaFLOPS\n- Chief Technology Officer: Maulana Rifa\'i',
      });
      speakText('Sintesis kuantum aktif.');
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'compile' || lowerCmd === 'academic') {
      newLogs.push({
        type: 'output',
        text: '[🎓 CORPORATE COMPILER & COMPLIANCE ENGINE]\n- Status: Approved by Board of Directors\n- Lead Architect: Maulana Rifa\'i',
      });
      speakText('Kompilasi korporat berhasil.');
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg on') {
      setBmgActive(true);
      newLogs.push({ type: 'output', text: '[Synth BGM]: Diaktifkan.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg off') {
      setBmgActive(false);
      newLogs.push({ type: 'output', text: '[Synth BGM]: Dimatikan.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let res = `[Nexa Corporate AI]: Menganalisis "${query}". Seluruh arah strategis dikendalikan oleh CEO Maulana Rifa'i.`;
      speakText(res);
      newLogs.push({ type: 'output', text: res });
      setLogs(newLogs);
      return;
    }

    switch (lowerCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: portfolio, ai-neural, database, fleet, scan, camera detect, camera analyze, quantum, compile, bmg on, bmg off, ai <tanya>, owner, status, clear',
        });
        break;
      case 'owner':
      case 'author':
        newLogs.push({ type: 'output', text: 'Founder & CEO Nexa Global Enterprise Inc.: Maulana Rifa\'i.' });
        break;
      case 'status':
        newLogs.push({ type: 'output', text: `Nexa Corporate Grid: ONLINE | Latency: ${ping}ms | CEO: Maulana Rifa'i` });
        break;
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({ type: 'error', text: `Command not found: ${rawCmd}. Ketik "portfolio", "ai-neural", "database", atau "help".` });
    }

    setLogs(newLogs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    playKeySound();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', fontFamily: 'monospace', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes godTierMatrixRain {
          0% { transform: translateY(-100%); opacity: 0; }
          15% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .matrix-column-1 { color: #22c55e; text-shadow: 0 0 8px rgba(34, 197, 94, 0.8); animation: godTierMatrixRain 2.2s linear infinite; }
        .matrix-column-2 { color: #06b6d4; text-shadow: 0 0 8px rgba(6, 182, 212, 0.8); animation: godTierMatrixRain 3.1s linear infinite; }
        .matrix-column-3 { color: #ec4899; text-shadow: 0 0 8px rgba(236, 72, 153, 0.8); animation: godTierMatrixRain 2.6s linear infinite; }
        .matrix-column-4 { color: #eab308; text-shadow: 0 0 8px rgba(234, 179, 8, 0.8); animation: godTierMatrixRain 3.8s linear infinite; }
      `}</style>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, fontSize: '0.78rem', userSelect: 'none', overflow: 'hidden', zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'space-around' }}>
        {Array.from({ length: 16 }).map((_, colIndex) => {
          const className = `matrix-column-${(colIndex % 4) + 1}`;
          return (
            <div key={colIndex} className={className} style={{ writingMode: 'vertical-rl', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              {colIndex % 2 === 0 
                ? 'NEXA_GLOBAL_ENTERPRISE_INC_MAULANA_RIFAI_CEO_PORTFOLIO_VERIFIED_SECURE_NODE_99AEF82VYAQ9SGV6IQD'
                : 'CORPORATE_COMMAND_CENTER_AI_NEURAL_DECISION_ENGINE_100_PERCENT_SUCCESS_MAULANA_RIFAI_VALUATION_$1B'
              }
            </div>
          );
        })}
      </div>

      {/* Top Corporate & Feature Control Buttons */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '720px', display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <button onClick={startCorporatePortfolio} style={{ background: portfolioActive ? '#f59e0b' : '#059669', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          📈 Portfolio & Assets
        </button>
        <button onClick={startAiNeuralEngine} style={{ background: aiNeuralActive ? '#eab308' : '#7c3aed', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🤖 AI Neural Executive
        </button>
        <button onClick={startEnterpriseDatabase} style={{ background: databaseActive ? '#f59e0b' : '#3b82f6', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🗄️ Database
        </button>
        <button onClick={startDroneFleetUplink} style={{ background: droneFleetActive ? '#eab308' : '#8b5cf6', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🛰️ Fleet
        </button>
        <button onClick={() => startCamera('biometric')} style={{ background: cameraMode === 'biometric' ? '#ef4444' : '#0284c7', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          👁️ CEO Scan
        </button>
        <button onClick={() => setBmgActive(!bmgActive)} style={{ background: bmgActive ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          {bmgActive ? '🎵 BGM: ON' : '🎵 BGM: OFF'}
        </button>
      </div>

      <video ref={videoRef} style={{ display: 'none' }} playsInline muted />

      {/* Corporate Terminal Window Box */}
      <div style={{ width: '100%', maxWidth: '720px', background: '#090d16', border: '1px solid #334155', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)', zIndex: 1, overflow: 'hidden' }}>
        
        <div style={{ background: '#0f172a', padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 'bold' }}>nexa-global-enterprise@ceo-maulana-rifai:~</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#22c55e' }}>
            CEO: Maulana Rifa'i | Valuation: $1.25B
          </div>
        </div>

        <div style={{ padding: '16px', minHeight: '300px', maxHeight: '420px', overflowY: 'auto', fontSize: '0.84rem' }}>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '8px', whiteSpace: 'pre-wrap', color: log.type === 'error' ? '#ef4444' : log.type === 'output' ? '#22c55e' : log.type === 'input' ? '#f8fafc' : '#38bdf8' }}>
              {log.text}
            </div>
          ))}

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ color: '#ec4899', fontWeight: 'bold', marginRight: '8px' }}>$</span>
            <input
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="ketik 'portfolio', 'ai-neural', 'database', 'scan', 'help'..."
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontFamily: 'inherit', fontSize: '0.84rem', outline: 'none', flexGrow: '1' }}
              autoFocus
            />
          </form>
          <div ref={terminalEndRef} />
        </div>

      </div>
    </div>
  );
};

export default NexaTerminal;
