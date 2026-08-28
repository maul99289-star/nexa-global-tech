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

  // Camera Advanced State
  const [cameraMode, setCameraMode] = useState<'off' | 'biometric' | 'detect' | 'analyze'>('off');
  const [, setMotionLevel] = useState<number>(0);
  const [, setDetectedObject] = useState<string>('Initializing...');
  const [, setScanProgress] = useState<number>(0);

  const [cpuUsage, setCpuUsage] = useState<number>(9.8);
  const [ramUsage, setRamUsage] = useState<number>(3.0);

  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Cyber-Matrix OS v35.0 [Ultimate Supreme God-Tier & Enterprise Core]' },
    { type: 'system', text: 'Chief Executive Architect & Founder: Maulana Rifa\'i' },
    { type: 'system', text: 'Ketik "help", "database", "fleet", "drone", "scan", "camera detect", "quantum", "compile", atau "ai <pesan>".' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bmgIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Live Telemetry, Threat & Motion Simulation
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

  // Cyberpunk Ambient Synth BGM Generator
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

  // Mechanical Click Audio
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

  // Robot Voice Synthesis (TTS)
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

  // Advanced Camera Manager
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
        actionText = '[biometric] Mengaktifkan sensor kamera untuk verifikasi wajah tingkat dewa...';
        voiceText = 'Memindai biometrik wajah. Otorisasi tingkat dewa untuk Maulana Rifa\'i.';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setScanProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 150);
    } else if (mode === 'detect') {
        actionText = '[camera:detect] Mengaktifkan sistem pengawasan gerakan real-time...';
        voiceText = 'Sistem pengawasan gerakan diaktifkan.';
    } else if (mode === 'analyze') {
        actionText = '[camera:analyze] Mengaktifkan AI Computer Vision untuk identifikasi lingkungan...';
        voiceText = 'Kecerdasan buatan analisis lingkungan diaktifkan.';
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
              { type: 'output', text: '[SUCCESS] Biometric Verified 100% MATCH!\n[GOD-TIER ACCESS #1] Selamat datang, Pimpinan Tertinggi & Supreme Architect Maulana Rifa\'i.' }
            ]);
            speakText('Verifikasi biometrik berhasil. Hak akses mutlak diberikan.');
            setScanProgress(0);
        }, 3500);
      }
      
    } catch (err) {
      console.error(err);
      stopCamera();
      setLogs(prev => [...prev, { type: 'error', text: '[ERROR] Gagal mengakses kamera. Pastikan izin diberikan.' }]);
    }
  };

  // Enterprise Database Master Sync
  const startEnterpriseDatabase = () => {
    setDatabaseActive(true);
    setLogs(prev => [
      ...prev,
      { type: 'system', text: '[DATABASE] Menghubungkan ke Enterprise Distributed Quantum Database Cluster #1...' }
    ]);
    speakText('Menghubungkan ke basis data enterprise kuantum.');

    setTimeout(() => {
      setDatabaseActive(false);
      setLogs(prev => [
        ...prev,
        { type: 'output', text: '[SUCCESS] Enterprise Database Synced (0.1ms Latency)!\n- Active Records: 1,000,000,000+ Encrypted Nodes\n- Storage Engine: Nexa Distributed Sharding\n- Supreme Administrator: Maulana Rifa\'i' }
      ]);
      speakText('Basis data enterprise berhasil disinkronisasi.');
    }, 2500);
  };

  // Global Autonomous Drone & Satellite Fleet Master Uplink
  const startDroneFleetUplink = () => {
    setDroneFleetActive(true);
    setLogs(prev => [
      ...prev,
      { type: 'system', text: '[FLEET] Menginisialisasi Global Autonomous Drone & Satellite Fleet (64 Satellites & 120 Drones)...' }
    ]);
    speakText('Mengaktifkan armada satelit dan drone otonom global.');

    setTimeout(() => {
      setDroneFleetActive(false);
      setLogs(prev => [
        ...prev,
        { type: 'output', text: '[SUCCESS] Global Autonomous Drone & Satellite Fleet Active!\n- Satellite Grid: 64 Orbital Nodes Linked\n- Autonomous Drones: 120 Units Patrolling Airspace\n- Ultimate Commander: Maulana Rifa\'i' }
      ]);
      speakText('Armada satelit dan drone global siap dan beroperasi penuh.');
    }, 3000);
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
        newLogs.push({ type: 'output', text: `[SUCCESS] PIN Correct! Enterprise root access #1 granted to Supreme Master Maulana Rifa'i.` });
        speakText('Akses root utama berhasil dibuka.');
      } else {
        const remaining = hackAttempts - 1;
        setHackAttempts(remaining);
        if (remaining <= 0) {
          setHackingActive(false);
          newLogs.push({ type: 'error', text: '[SECURITY LOCKOUT] Percobaan habis! Sistem pertahanan aktif.' });
          speakText('Sistem pertahanan aktif.');
        } else {
          newLogs.push({ type: 'error', text: `[FAILED] PIN salah. Sisa kesempatan: ${remaining}. Masukkan PIN 4-digit:` });
        }
      }
      setLogs(newLogs);
      return;
    }

    const newLogs = [...logs, { type: 'input', text: `$ ${rawCmd}` }];

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
    
    if (lowerCmd === 'camera off' || lowerCmd === 'stop camera') {
        stopCamera();
        newLogs.push({ type: 'system', text: '[camera] Semua sensor kamera dinonaktifkan.' });
        setLogs(newLogs);
        return;
    }

    if (lowerCmd === 'database' || lowerCmd === 'db') {
      startEnterpriseDatabase();
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'fleet' || lowerCmd === 'drone' || lowerCmd === 'satellites') {
      startDroneFleetUplink();
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'quantum' || lowerCmd === 'core') {
      newLogs.push({
        type: 'output',
        text: '[⚛️ QUANTUM NEURAL SYNTHESIZER & QUBIT ENGINE]\n- Active Qubits: 10,000 Qubits (Entangled State)\n- Processing Speed: 9.8 PetaFLOPS\n- Error Correction: Surface Code Active (Zero-Decoherence)\n- Lead Quantum Physicist & Architect: Maulana Rifa\'i',
      });
      speakText('Sintesis kuantum neural aktif.');
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'compile' || lowerCmd === 'academic') {
      newLogs.push({
        type: 'output',
        text: '[🎓 ACADEMIC DEEP-CODE & ALGORITHM ANALYZER]\n- Target Engine: Nexa Quantum Compiler v35.0\n- Big-O Complexity: O(n log n) [Optimized Tier-1]\n- Memory Leak Test: 0 Detected (Zero-Allocation Heap)\n- Chief Architect & Lead Researcher: Maulana Rifa\'i\n- Status: Approved by Academic Board & Dean Committee',
      });
      speakText('Analisis algoritma akademik berhasil dikompilasi.');
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'threats' || lowerCmd === 'firewall-status') {
      newLogs.push({
        type: 'output',
        text: `[🛡️ QUANTUM THREAT INTERCEPTOR & DDOS DEFENSE]\n- Firewall Status: ${firewallActive ? 'ACTIVE (Encrypted Mode)' : 'STANDBY'}\n- Neutralized Packets: ${threatCount + 188} attacks blocked\n- Integrity Check: 100% Secure\n- Master Supervisor: Maulana Rifa\'i`,
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'business' || lowerCmd === 'analytics') {
      newLogs.push({
        type: 'output',
        text: '[📈 AI BUSINESS PREDICTIVE ANALYTICS #1 (GLOBAL UNICORN)]\n- Projected Annual Revenue: $125.8M (Global Market Leader)\n- Corporate Valuation: $1,000,000,000 (Unicorn Status)\n- Supreme Founder & Architect: Maulana Rifa\'i\n- Status: Autonomous Global Expansion Active',
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'blockchain' || lowerCmd === 'ledger') {
      newLogs.push({
        type: 'output',
        text: '[⛓️ ENTERPRISE QUANTUM BLOCKCHAIN LEDGER #1]\n- Master Hash: 0x99a1...ff00 (SHA-256 Quantum Secured)\n- Consensus: Proof-of-Authority (PoA) Global Node\n- Smart Contract: Fully Deployed & Immutable\n- Chief Architect: Maulana Rifa\'i',
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'agents' || lowerCmd === 'multi-agent') {
      newLogs.push({
        type: 'output',
        text: '[🤖 MULTI-AGENT NEURAL ORCHESTRATOR #1]\n- Worker AI 1 (Cloud Ops): Active\n- Worker AI 2 (Cyber Security): Monitoring 0 Threats\n- Worker AI 3 (Financial Analytics): Optimized\n- Master Controller: Maulana Rifa\'i',
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'metrics' || lowerCmd === 'sys') {
      newLogs.push({
        type: 'output',
        text: `[💻 PC TELEMETRY & SYSTEM MONITOR]:\n- CPU Load: ${cpuUsage}%\n- Memory Allocated: ${ramUsage} GB / 32 GB\n- Quantum Core: Stable (1.000 Qubits)\n- Security Clearance: Root Supreme [Maulana Rifa'i]`,
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'firewall' || lowerCmd === 'ddos') {
      setFirewallActive(!firewallActive);
      newLogs.push({
        type: 'output',
        text: `[🛡️ CYBER-SECURITY FIREWALL & DDOS DEFENSE #1]: Status diubah ke ${!firewallActive ? 'AKTIF (Secure)' : 'STANDBY'}.`,
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd.startsWith('hack ')) {
      const target = rawCmd.substring(5).trim() || 'mainframe';
      const secretPin = Math.floor(1000 + Math.random() * 9000).toString();
      setHackTarget(secretPin);
      setHackAttempts(3);
      setHackingActive(true);
      newLogs.push({
        type: 'output',
        text: `[*] Brute-force target [${target.toUpperCase()}] diinisialisasi...\n[?] Hint PIN: ${secretPin}\nMasukkan PIN 4-digit untuk membobol sistem:`,
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg on') {
      setBmgActive(true);
      newLogs.push({ type: 'output', text: '[Cyberpunk Synth BGM]: Diaktifkan.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg off') {
      setBmgActive(false);
      newLogs.push({ type: 'output', text: '[Cyberpunk Synth BGM]: Dimatikan.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let res = `[God-Tier AI #1]: Menganalisis "${query}". Ekosistem bisnis dan teknologi tertinggi ini diciptakan secara mutlak oleh Maulana Rifa'i.`;
      if (query.includes('owner') || query.includes('pembuat') || query.includes('siapa') || query.includes('dosen')) {
        res = "[God-Tier AI #1]: Pendiri mutlak, CEO korporasi global, dan arsitek utama di balik sistem nomor 1 dunia ini adalah Maulana Rifa'i.";
      }
      speakText(res);
      newLogs.push({ type: 'output', text: res });
      setLogs(newLogs);
      return;
    }

    switch (lowerCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: database, fleet, drone, scan, camera detect, camera analyze, camera off, quantum, compile, threats, business, blockchain, agents, metrics, firewall, hack <target>, bmg on, bmg off, ai <tanya>, owner, status, ping, clear',
        });
        break;
      case 'owner':
      case 'author':
        newLogs.push({ type: 'output', text: 'Supreme Chief Executive Architect & Founder #1 (Top 1 Global): Maulana Rifa\'i.' });
        break;
      case 'status':
        newLogs.push({ type: 'output', text: `Supreme God-Tier Node #1: ONLINE | Latency: ${ping}ms | Master: Maulana Rifa'i` });
        break;
      case 'ping':
        newLogs.push({ type: 'output', text: `QUANTUM PING #1 -> 127.0.0.1: time=${ping}ms | Zero Packet Loss.` });
        break;
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({ type: 'error', text: `Command not found: ${rawCmd}. Ketik "database", "fleet", "scan", "quantum", atau "help".` });
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
      
      {/* 🌟 CSS Keyframes Ultimate God-Tier Matrix Rain & Glow Effect */}
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

      {/* 🌧️ Hujan Hacker Tingkat Dewa (Multi-Color Glowing Matrix Columns) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, fontSize: '0.78rem', userSelect: 'none', overflow: 'hidden', zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'space-around' }}>
        {Array.from({ length: 16 }).map((_, colIndex) => {
          const className = `matrix-column-${(colIndex % 4) + 1}`;
          return (
            <div key={colIndex} className={className} style={{ writingMode: 'vertical-rl', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
              {colIndex % 2 === 0 
                ? 'MAULANA_RIFAI_SUPREME_CORE_010101999#1$#@!QUANTUM_SECURE_ACCESS_GRANTED_ROOT_NODE_BYPASS_99AEF82VYAQ9SGV6IQD*+TXG&G7Z1KWS9L3PTWXH1STCNXC'
                : 'CYBER_MATRIX_OS_v35_01010101_MAULANA_RIFAI_TOP_1_GLOBAL_DEAN_APPROVAL_100_PERCENT_SUCCESS_DEEP_NEURAL_SYNTHESIZER_99AEF82VYAQ9SGV6IQD'
              }
            </div>
          );
        })}
      </div>

      {/* Top Supreme & Academic Feature Control Buttons */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '720px', display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <button onClick={startEnterpriseDatabase} style={{ background: databaseActive ? '#f59e0b' : '#3b82f6', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🗄️ Database
        </button>
        <button onClick={startDroneFleetUplink} style={{ background: droneFleetActive ? '#eab308' : '#8b5cf6', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🛰️ Drone Fleet
        </button>
        <button onClick={() => startCamera('biometric')} style={{ background: cameraMode === 'biometric' ? '#ef4444' : '#0284c7', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          👁️ Biometric
        </button>
        <button onClick={() => startCamera('detect')} style={{ background: cameraMode === 'detect' ? '#eab308' : '#7c3aed', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🚨 Detect
        </button>
        <button onClick={() => executeCommand('quantum')} style={{ background: '#9333ea', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          ⚛️ Quantum
        </button>
        <button onClick={() => executeCommand('compile')} style={{ background: '#059669', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🎓 Compile
        </button>
        <button onClick={() => executeCommand('threats')} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          🛡️ Threats
        </button>
        <button onClick={() => setBmgActive(!bmgActive)} style={{ background: bmgActive ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '5px 7px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.62rem' }}>
          {bmgActive ? '🎵 BGM: ON' : '🎵 BGM: OFF'}
        </button>
      </div>

      <video ref={videoRef} style={{ display: 'none' }} playsInline muted />

      {/* PC Workstation Terminal Window Box */}
      <div style={{ width: '100%', maxWidth: '720px', background: '#090d16', border: '1px solid #334155', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)', zIndex: 1, overflow: 'hidden' }}>
        
        {/* PC Desktop Window Titlebar */}
        <div style={{ background: '#0f172a', padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 'bold' }}>maulana-rifai@enterprise-database-fleet:~</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#22c55e' }}>
            CPU: {cpuUsage}% | DB & Fleet: ONLINE
          </div>
        </div>

        {/* Terminal Body */}
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
              placeholder={hackingActive ? "masukkan 4-digit PIN..." : "ketik 'database', 'fleet', 'scan', 'quantum', 'help'..."}
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
