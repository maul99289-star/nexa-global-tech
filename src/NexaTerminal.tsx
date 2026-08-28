import React, { useState, useEffect, useRef } from 'react';

export const NexaTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [ping, setPing] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bmgActive, setBmgActive] = useState<boolean>(false);
  const [scanActive, setScanActive] = useState<boolean>(false);
  const [firewallActive, setFirewallActive] = useState<boolean>(true);
  const [hackingActive, setHackingActive] = useState<boolean>(false);
  const [hackTarget, setHackTarget] = useState<string>('');
  const [hackAttempts, setHackAttempts] = useState<number>(3);

  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Tech Terminal v9.9.9 [Supreme God-Tier #1 Global Core]' },
    { type: 'system', text: 'Chief Executive Architect & Founder: Maulana Rifa\'i' },
    { type: 'system', text: 'Ketik "help", "scan", "business", "blockchain", "agents", "firewall", "hack mainframe", "ai <pesan>", atau "owner".' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bmgIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Live Quantum Ping
  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(Math.random() * 2) + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cyberpunk Ambient Synth BGM Generator
  useEffect(() => {
    if (!bmgActive) {
      if (bmgIntervalRef.current) clearInterval(bmgIntervalRef.current);
      return;
    }

    const freqs = [110, 130.81, 164.81, 196, 220, 261.63, 329.63, 392, 523.25];
    const playTone = () => {
      try {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const ctx = new AudioContext();
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
        // Ignore audio policy
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
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
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

  // Biometric Retina & Facial Deep-Scan (Buka Kamera)
  const startBiometricScan = async () => {
    setScanActive(true);
    setLogs(prev => [...prev, { type: 'system', text: '[biometric] Mengaktifkan sensor kamera untuk verifikasi wajah tingkat dewa...' }]);
    speakText('Memindai biometrik wajah. Otorisasi tingkat dewa untuk Maulana Rifa\'i.');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setTimeout(() => {
        if (videoRef.current && videoRef.current.srcObject) {
          const s = videoRef.current.srcObject as MediaStream;
          s.getTracks().forEach(t => t.stop());
        }
        setScanActive(false);
        setLogs(prev => [
          ...prev, 
          { type: 'output', text: '[SUCCESS] Biometric Verified 100% MATCH!\n[GOD-TIER ACCESS #1] Selamat datang, Pimpinan Tertinggi & Supreme Architect Maulana Rifa\'i.' }
        ]);
        speakText('Verifikasi biometrik berhasil. Hak akses mutlak diberikan.');
      }, 3500);
    } catch {
      setScanActive(false);
      setLogs(prev => [
        ...prev, 
        { type: 'output', text: '[BYPASS] Akses satelit diverifikasi. God-Tier Clearance aktif untuk Maulana Rifa\'i.' }
      ]);
    }
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
      startBiometricScan();
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
          text: 'Commands: scan, business, blockchain, agents, firewall, hack <target>, bmg on, bmg off, ai <tanya>, owner, status, ping, clear',
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
        newLogs.push({ type: 'error', text: `Command not found: ${rawCmd}. Ketik "scan", "business", "ai siapa pembuat web ini", atau "help".` });
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
    <div style={{ background: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', fontFamily: 'monospace', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Matrix/Green Cipher Text effect */}
      <div style={{ position: 'absolute', color: '#166534', fontSize: '0.75rem', opacity: 0.35, userSelect: 'none', lineHeight: '1.8', wordBreak: 'break-all', padding: '20px', zIndex: 0 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>
            MAULANARIFAI010101SUPREMEGODTIERENTERPRISE#1$#@!0101010199AEF82VYAQ9SGV6IQD*+TXG&G7Z1KWS9L3PTWXH1STCNXC99NOVD87KAS3OCMYAR7YYWNN&CCQDFFET4WMKCFOILRAB72VZZ6INCXQDFET4WMCSUB73BGVAZ9UDRS0
          </div>
        ))}
      </div>

      {/* Quick Action Control Bar for Supreme Features */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '700px', display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <button onClick={startBiometricScan} style={{ background: scanActive ? '#ef4444' : '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
          {scanActive ? '👁️ Scanning...' : '👁️ Biometric Scan'}
        </button>
        <button onClick={() => executeCommand('business')} style={{ background: '#059669', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
          📈 AI Business ($1B)
        </button>
        <button onClick={() => executeCommand('blockchain')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
          ⛓️ Blockchain Ledger
        </button>
        <button onClick={() => executeCommand('agents')} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
          🤖 Multi-Agents
        </button>
        <button onClick={() => executeCommand('hack mainframe')} style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
          🔓 Hack Minigame
        </button>
        <button onClick={() => setBmgActive(!bmgActive)} style={{ background: bmgActive ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.7rem' }}>
          {bmgActive ? '🎵 BGM: ON' : '🎵 BGM: OFF'}
        </button>
      </div>

      <video ref={videoRef} style={{ display: 'none' }} playsInline muted />

      {/* Terminal Window Box */}
      <div style={{ width: '100%', maxWidth: '700px', background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8)', zIndex: 1, overflow: 'hidden' }}>
        
        {/* Terminal Header */}
        <div style={{ background: '#0f172a', padding: '10px 14px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
          <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#64748b' }}>maulana-rifai@supreme-god-tier-node-1:~</span>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '18px', minHeight: '280px', maxHeight: '420px', overflowY: 'auto', fontSize: '0.85rem' }}>
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
              placeholder={hackingActive ? "masukkan 4-digit PIN..." : "ketik 'scan', 'business', 'ai siapa pembuat web ini', 'help'..."}
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none', flexGrow: '1' }}
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
