import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(1);
  const [inputVal, setInputVal] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bmgActive, setBmgActive] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [scanActive, setScanActive] = useState<boolean>(false);
  const [spectrumActive, setSpectrumActive] = useState<boolean>(true);
  const [satelliteActive, setSatelliteActive] = useState<boolean>(false);
  const [hackingActive, setHackingActive] = useState<boolean>(false);
  const [hackTarget, setHackTarget] = useState<string>('');
  const [hackAttempts, setHackAttempts] = useState<number>(3);
  
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Omniverse God-Tier Core v2026.99 (Ultimate Academic Presentation Grade)' },
    { type: 'system', text: 'Supreme Architect & Lead Engineer: Maulana Rifa\'i' },
    { type: 'system', text: 'Type "help", "scan", "satellite", "hack <target>", "spectrum", "bmg on", or "ai <pertanyaan>".' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bmgIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Live Quantum Ping
  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(Math.random() * 2) + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cyberpunk Ambient Synth BMG Generator
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
        // Ignore policy
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

  // Biometric Facial & Retina Deep-Scan
  const startBiometricScan = async () => {
    setScanActive(true);
    setLogs(prev => [...prev, { type: 'system', text: '[biometric] Mengaktifkan sensor kamera depan untuk pemindaian wajah & retina tingkat lanjut...' }]);
    speakText('Memindai biometrik wajah. Mohon arahkan wajah ke kamera.');

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
          { type: 'output', text: '[SUCCESS] Biometric Verified 100% MATCH!\n[ACADEMIC HIGHEST CLEARANCE] Selamat datang, Dosen Penguji & Supreme Creator Maulana Rifa\'i.' }
        ]);
        speakText('Verifikasi biometrik berhasil. Hak akses tertinggi diberikan.');
      }, 3500);
    } catch {
      setScanActive(false);
      setLogs(prev => [
        ...prev, 
        ...prev, 
        { type: 'output', text: '[BYPASS] Kamera diizinkan via token satelit darurat. Akses VIP diverifikasi untuk Maulana Rifa\'i.' }
      ]);
    }
  };

  // Voice Recognition AI
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
      setLogs(prev => [...prev, { type: 'system', text: '[🎙️] AI Quantum mendengarkan perintah suara Anda...' }]);
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

  // Canvas Engine: Matrix Rain + Holographic Audio Spectrum
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'MAULANARIFAI010101GODTIERACADEMICQUANTUM$#@!';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = 1;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (matrixActive) {
        ctx.fillStyle = '#38bdf8';
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) drops[i] = 0;
          drops[i]++;
        }
      }

      if (spectrumActive) {
        const barCount = 52;
        const barWidth = canvas.width / barCount;
        for (let j = 0; j < barCount; j++) {
          const barHeight = Math.random() * 100 + 10;
          ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.fillRect(j * barWidth + 2, canvas.height - barHeight, barWidth - 4, barHeight);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [matrixActive, spectrumActive]);

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
        speakText('Akses root berhasil dibuka.');
      } else {
        const remaining = hackAttempts - 1;
        setHackAttempts(remaining);
        if (remaining <= 0) {
          setHackingActive(false);
          newLogs.push({ type: 'error', text: '[SECURITY LOCKOUT] Percobaan habis! Sistem dikunci.' });
          speakText('Sistem terkunci.');
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

    if (lowerCmd === 'satellite' || lowerCmd === 'orbit') {
      setSatelliteActive(!satelliteActive);
      newLogs.push({
        type: 'output',
        text: '[🌍 GLOBAL SATELLITE TELEMETRY LINK]\n- Status: Connected to Low Earth Orbit (LEO)\n- Encryption: Quantum AES-1024\n- Lead Systems Architect: Maulana Rifa\'i\n- Academic Evaluation Score: Top 1 Global Standard',
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
        text: `[*] Brute-force target [${target.toUpperCase()}] diinisialisasi...\n[?] Hint PIN Kunci: ${secretPin}\nMasukkan PIN 4-digit untuk membobol sistem:`,
      });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'spectrum' || lowerCmd === 'visualizer') {
      setSpectrumActive(!spectrumActive);
      newLogs.push({ type: 'output', text: `[Holographic Spectrum]: Status diubah ke ${!spectrumActive ? 'AKTIF' : 'NONAKTIF'}.` });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg on') {
      setBmgActive(true);
      newLogs.push({ type: 'output', text: '[Cyberpunk Synth BMG]: Diaktifkan.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg off') {
      setBmgActive(false);
      newLogs.push({ type: 'output', text: '[Cyberpunk Synth BMG]: Dimatikan.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let res = `[Academic AI Core]: Menganalisis "${query}". Sistem portofolio ini dibangun dengan standar rekayasa perangkat lunak tertinggi oleh Maulana Rifa'i.`;
      if (query.includes('owner') || query.includes('pembuat') || query.includes('siapa') || query.includes('dosen')) {
        res = "[Academic AI Core]: Arsitek utama, pembuat mutlak, dan pengembang penuh dari sistem web kelas dunia ini adalah Maulana Rifa'i.";
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
          text: 'Commands: scan, satellite, hack <target>, spectrum, bmg on, bmg off, ai <tanya>, owner, status, ping, clear',
        });
        break;
      case 'owner':
      case 'author':
        newLogs.push({ type: 'output', text: 'Supreme Chief Architect & Founder: Maulana Rifa\'i | Elite Full-Stack Systems Engineer.' });
        break;
      case 'status':
        newLogs.push({ type: 'output', text: `Academic God-Tier Node: ONLINE | Latency: ${ping}ms | Master: Maulana Rifa'i` });
        break;
      case 'ping':
        newLogs.push({ type: 'output', text: `GOD-TIER PING -> 127.0.0.1: time=${ping}ms | Zero Packet Loss.` });
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
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '12px' }}>
        {/* Telemetry Bar */}
        <div className="telemetry-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="status-indicator"><span className="pulse-dot"></span> God-Tier Core: ONLINE</span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Ping: {ping}ms</span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Master: Maulana Rifa'i</span>
          </div>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            <button onClick={startBiometricScan} style={{ background: scanActive ? '#ef4444' : '#0284c7', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              {scanActive ? '👁️ Scanning...' : '👁️ Biometric Scan'}
            </button>
            <button onClick={() => executeCommand('satellite')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              🌍 Satellite Grid
            </button>
            <button onClick={() => executeCommand('hack mainframe')} style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              🔓 Hack Minigame
            </button>
            <button onClick={() => setBmgActive(!bmgActive)} style={{ background: bmgActive ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              {bmgActive ? '🎵 BGM: ON' : '🎵 BGM: OFF'}
            </button>
            <button onClick={startVoiceCommand} style={{ background: isListening ? '#ef4444' : '#22c55e', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}>
              {isListening ? '🎙️ Listening...' : '🎙️ Voice AI'}
            </button>
          </div>
        </div>

        <video ref={videoRef} style={{ display: 'none' }} playsInline muted />

        {/* Info Card */}
        <div style={{ margin: '0 0 15px 0', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '15px', color: '#cbd5e1', fontSize: '0.9rem', backdropFilter: 'blur(8px)' }}>
          <p style={{ margin: '0 0 6px 0', color: '#38bdf8', fontWeight: 'bold' }}>🎓 Academic Presentation Mode (Maulana Rifa'i):</p>
          <p style={{ margin: 0 }}>
            Tunjukkan pada dosen: Ketik <code style={{color: '#38bdf8'}}>ai siapa pembuat web ini?</code>, klik <code style={{color: '#38bdf8'}}>Biometric Scan</code>, <code style={{color: '#38bdf8'}}>Satellite Grid</code>, atau gunakan <code style={{color: '#38bdf8'}}>Voice AI</code>!
          </p>
        </div>

        {/* Terminal Box */}
        <div className="terminal-box" style={{ background: 'rgba(2, 6, 23, 0.95)', border: '1px solid #334155', backdropFilter: 'blur(10px)' }}>
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">maulana-rifai@god-tier-academic-core:~</span>
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
                placeholder={hackingActive ? "masukkan 4-digit PIN..." : "ketik 'scan', 'satellite', 'ai ...', 'help'..."}
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
