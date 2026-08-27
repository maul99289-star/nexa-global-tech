import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(4);
  const [inputVal, setInputVal] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bmgActive, setBmgActive] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [scanActive, setScanActive] = useState<boolean>(false);
  const [satelliteActive, setSatelliteActive] = useState<boolean>(false);
  const [hackingActive, setHackingActive] = useState<boolean>(false);
  const [hackTarget, setHackTarget] = useState<string>('');
  const [hackAttempts, setHackAttempts] = useState<number>(3);
  
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Top-1 Global Quantum Core v2026.0 (Ultimate God-Tier)' },
    { type: 'system', text: 'Supreme Architect & Founder: Maulana Rifa\'i' },
    { type: 'system', text: 'Type "help", "scan", "satellite", "hack <target>", "bmg on", "ai <pesan>", or "chat <pesan>".' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bmgIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Live Ping Telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(Math.random() * 3) + 3);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cyberpunk Ambient Synth BMG Generator
  useEffect(() => {
    if (!bmgActive) {
      if (bmgIntervalRef.current) clearInterval(bmgIntervalRef.current);
      return;
    }

    const freqs = [110, 130.81, 164.81, 196, 220, 261.63, 329.63];
    const playTone = () => {
      try {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freqs[Math.floor(Math.random() * freqs.length)], ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch {
        // Ignore audio errors
      }
    };

    bmgIntervalRef.current = setInterval(playTone, 400);
    return () => {
      if (bmgIntervalRef.current) clearInterval(bmgIntervalRef.current);
    };
  }, [bmgActive]);

  // Mechanical Keyboard Click Sound
  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
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

  // Text-to-Speech Synth Robot Voice
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Biometric Retina / Face-Scan Simulator
  const startBiometricScan = async () => {
    setScanActive(true);
    setLogs(prev => [...prev, { type: 'system', text: '[biometric] Memindai biometrik wajah & retina tingkat lanjut...' }]);
    speakText('Memindai biometrik wajah. Akses keamanan tingkat tinggi.');

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
          { type: 'output', text: '[SUCCESS] Biometric Verified 100% MATCH!\n[TOP-1 VIP ACCESS GRANTED] Selamat datang, Supreme Architect Maulana Rifa\'i.' }
        ]);
        speakText('Verifikasi biometrik berhasil. Selamat datang, Maulana Rifai.');
      }, 3500);
    } catch {
      setScanActive(false);
      setLogs(prev => [
        ...prev, 
        { type: 'output', text: '[BYPASS] Kamera tidak aktif. Token satelit terautentikasi otomatis untuk Maulana Rifa\'i.' }
      ]);
    }
  };

  // Voice Recognition Command
  const startVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser tidak mendukung Voice Recognition.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.onstart = () => {
      setIsListening(true);
      setLogs(prev => [...prev, { type: 'system', text: '[🎙️] Mendengarkan perintah suara global...' }]);
    };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript.toLowerCase();
      setInputVal(text);
      executeCommand(text);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Matrix Rain Canvas Animation
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'MAULANARIFAI010101TOPONEQUANTUM$#@!';
    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) drops[i] = 1;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#38bdf8';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(render, 30);
    return () => clearInterval(interval);
  }, [matrixActive]);

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
        newLogs.push({ type: 'output', text: `[SUCCESS] PIN Correct! Root access granted. Secured by Maulana Rifa'i.` });
        speakText('Root access granted.');
      } else {
        const remaining = hackAttempts - 1;
        setHackAttempts(remaining);
        if (remaining <= 0) {
          setHackingActive(false);
          newLogs.push({ type: 'error', text: '[SECURITY LOCKOUT] Brute-force failed!' });
          speakText('Security lockout.');
        } else {
          newLogs.push({ type: 'error', text: `[FAILED] Sisa kesempatan: ${remaining}. Masukkan PIN 4-digit:` });
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

    if (lowerCmd === 'satellite' || lowerCmd === 'orbit') {
      setSatelliteActive(!satelliteActive);
      newLogs.push({
        type: 'output',
        text: '[🌍 TOP-1 GLOBAL SATELLITE TELEMETRY]\n- Orbit Node: SG-Top1 Edge Server\n- Encryption: Quantum AES-512\n- Global Surveillance: Active\n- Supreme Chief: Maulana Rifa\'i',
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
        text: `[*] Brute-Force Target [${target.toUpperCase()}] initialized...\n[?] Hint Secret PIN: ${secretPin}\nMasukkan PIN 4-digit untuk membobol:`,
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg on') {
      setBmgActive(true);
      newLogs.push({ type: 'output', text: '[Cyberpunk Synth BMG]: Activated.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg off') {
      setBmgActive(false);
      newLogs.push({ type: 'output', text: '[Cyberpunk Synth BMG]: Deactivated.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let res = `[Top-1 AI Core]: Menganalisis "${query}". Sistem ini dibangun dengan rekayasa tingkat tertinggi oleh Maulana Rifa'i.`;
      if (query.includes('owner') || query.includes('pembuat') || query.includes('siapa')) {
        res = "[Top-1 AI Core]: Arsitek utama, pemilik sah, dan pembuat mutlak dari seluruh sistem canggih ini adalah Maulana Rifa'i.";
      }
      speakText(res);
      newLogs.push({ type: 'output', text: res });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd.startsWith('chat ')) {
      const msg = rawCmd.substring(5).trim();
      speakText(msg);
      newLogs.push({ type: 'output', text: `[Global Neural Broadcast]: "${msg}" -> Terkirim ke jaringan satelit dunia.` });
      setLogs(newLogs);
      return;
    }

    switch (lowerCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: scan, satellite, hack <target>, bmg on, bmg off, ai <tanya>, chat <pesan>, owner, status, ping, clear',
        });
        break;
      case 'owner':
      case 'author':
        newLogs.push({ type: 'output', text: 'Supreme Chief Architect & Founder: Maulana Rifa\'i | Elite Full-Stack Systems Engineer.' });
        break;
      case 'status':
        newLogs.push({ type: 'output', text: `Top-1 Global Node: ONLINE | Latency: ${ping}ms | Supreme Master: Maulana Rifa'i` });
        break;
      case 'ping':
        newLogs.push({ type: 'output', text: `TOP-1 PING -> 127.0.0.1: time=${ping}ms | Zero Packet Loss.` });
        break;
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({ type: 'error', text: `Command not found: ${rawCmd}. Ketik "scan", "satellite", "ai siapa pembuat web ini", atau "help".` });
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
    <div className="advanced-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {matrixActive && (
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.35 }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', margin: '0 auto', padding: '12px' }}>
        {/* Telemetry Bar */}
        <div className="telemetry-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="status-indicator"><span className="pulse-dot"></span> Top-1 Core: ONLINE</span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Ping: {ping}ms</span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Master: Maulana Rifa'i</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button onClick={startBiometricScan} style={{ background: scanActive ? '#ef4444' : '#0284c7', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              {scanActive ? '👁️ Scanning...' : '👁️ Biometric Scan'}
            </button>
            <button onClick={() => executeCommand('satellite')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              🌍 Satellite Grid
            </button>
            <button onClick={() => setBmgActive(!bmgActive)} style={{ background: bmgActive ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              {bmgActive ? '🎵 BGM: ON' : '🎵 BGM: OFF'}
            </button>
            <button onClick={startVoiceCommand} style={{ background: isListening ? '#ef4444' : '#22c55e', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              {isListening ? '🎙️ Listening...' : '🎙️ Voice'}
            </button>
          </div>
        </div>

        <video ref={videoRef} style={{ display: 'none' }} playsInline muted />

        {/* Info Card */}
        <div style={{ margin: '0 0 15px 0', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '15px', color: '#cbd5e1', fontSize: '0.9rem', backdropFilter: 'blur(8px)' }}>
          <p style={{ margin: '0 0 6px 0', color: '#38bdf8', fontWeight: 'bold' }}>🚀 Top-1 Global Terminal (Maulana Rifa'i):</p>
          <p style={{ margin: 0 }}>
            Ketik <code style={{color: '#38bdf8'}}>ai siapa pembuat web ini?</code>, <code style={{color: '#38bdf8'}}>scan</code>, atau <code style={{color: '#38bdf8'}}>satellite</code> untuk menikmati teknologi tercanggih di dunia!
          </p>
        </div>

        {/* Terminal Box */}
        <div className="terminal-box" style={{ background: 'rgba(2, 6, 23, 0.95)', border: '1px solid #334155', backdropFilter: 'blur(10px)' }}>
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">maulana-rifai@top-1-global:~</span>
          </div>
          <div className="terminal-body">
            {logs.map((log, index) => (
              <div key={index} className={`terminal-line ${log.type}`} style={{ whiteSpace: 'pre-wrap' }}>
                {log.text}
              </div>
            ))}
            <form onSubmit={handleFormSubmit} className="terminal-form">
              <span className="prompt" style={{ color: '#38bdf8' }}>$</span>
              <input
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                placeholder={hackingActive ? "masukkan 4-digit PIN..." : "ketik 'scan', 'ai ...', 'help'..."}
                className="terminal-input"
                autoFocus
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdvancedFeatures;
