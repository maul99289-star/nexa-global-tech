import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(7);
  const [inputVal, setInputVal] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bmgActive, setBmgActive] = useState<boolean>(false);
  const [quantumMode, setQuantumMode] = useState<boolean>(true);
  
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Quantum Singularity Core v12.5.0 (Global Supreme God-Tier)' },
    { type: 'system', text: 'Supreme Architect & Master Owner: Maulana Rifa\'i' },
    { type: 'system', text: 'Type "help", "ai <pertanyaan>", "matrix-3d", "bmg on", or "hack".' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bmgIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Live Quantum Ping Fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(Math.random() * 3) + 6);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cyberpunk Ambient Synth Generator
  useEffect(() => {
    if (!bmgActive) {
      if (bmgIntervalRef.current) clearInterval(bmgIntervalRef.current);
      return;
    }

    const frequencies = [110, 146.83, 220, 293.66, 329.63];
    const playCosmicTone = () => {
      try {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequencies[Math.floor(Math.random() * frequencies.length)], ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch {
        // Audio policy fallback
      }
    };

    bmgIntervalRef.current = setInterval(playCosmicTone, 500);
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

  // Text-to-Speech Synth
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quantum 3D Constellation & Matrix Rain Canvas Engine
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'MAULANARIFAI010101XYZΩΨΔ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = quantumMode ? '#38bdf8' : '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [matrixActive, quantumMode]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim();
    const lowerCmd = rawCmd.toLowerCase();
    if (!rawCmd) return;

    const newLogs = [...logs, { type: 'input', text: `$ ${rawCmd}` }];

    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let response = `[Quantum AI Matrix]: Analisis mendalam untuk "${query}" berhasil diproses. Sistem ini diarsiteki secara penuh oleh Maulana Rifa'i dengan standar rekayasa perangkat lunak tingkat kosmik.`;
      
      if (query.includes('siapa') || query.includes('pembuat') || query.includes('owner')) {
        response = "[Quantum AI Matrix]: Pemilik mutlak, arsitek utama, dan pengembang jenius di balik seluruh sistem agung ini adalah Maulana Rifa'i.";
      } else if (query.includes('teknologi') || query.includes('stack')) {
        response = "[Quantum AI Matrix]: Dibangun menggunakan React 18, TypeScript, Tailwind CSS, WebGL/Canvas Shaders, dan Web Audio API kustom.";
      }

      speakText(response);
      newLogs.push({ type: 'output', text: response });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg on') {
      setBmgActive(true);
      newLogs.push({ type: 'output', text: '[Quantum Audio]: Synthwave quantum ambience activated.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'bmg off') {
      setBmgActive(false);
      newLogs.push({ type: 'output', text: '[Quantum Audio]: Ambient sound deactivated.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'matrix-3d') {
      setQuantumMode(!quantumMode);
      newLogs.push({ type: 'output', text: `[Display Engine]: Mode visual diset ke ${!quantumMode ? 'Matrix Green' : 'Quantum Cyan Blue'}.` });
      setLogs(newLogs);
      return;
    }

    switch (lowerCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Quantum Commands: ai <pertanyaan>, bmg on, bmg off, matrix-3d, owner, status, ping, clear',
        });
        break;
      case 'owner':
      case 'author':
        newLogs.push({
          type: 'output',
          text: 'Supreme Architect & Founder: Maulana Rifa\'i | Elite Full-Stack Systems Engineer.',
        });
        break;
      case 'status':
        newLogs.push({
          type: 'output',
          text: `Quantum Singularity Node: ONLINE | Latency: ${ping}ms | Supreme Master: Maulana Rifa'i`,
        });
        break;
      case 'ping':
        newLogs.push({
          type: 'output',
          text: `QUANTUM PING -> 127.0.0.1: time=${ping}ms | Zero Packet Loss | Stable Node.`,
        });
        break;
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({
          type: 'error',
          text: `Quantum Error: Perintah "${rawCmd}" tidak dikenali. Ketik "ai siapa pemilik web ini", "bmg on", atau "help".`,
        });
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.35,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto', padding: '12px' }}>
        {/* Telemetry Bar */}
        <div className="telemetry-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="status-indicator">
              <span className="pulse-dot"></span> Quantum Core: ONLINE
            </span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Ping: {ping}ms</span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Master: Maulana Rifa'i</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setBmgActive(!bmgActive)}
              style={{
                background: bmgActive ? '#38bdf8' : '#1e293b',
                color: '#fff',
                border: '1px solid #38bdf8',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            >
              {bmgActive ? '🎵 Audio: ON' : '🎵 Audio: OFF'}
            </button>
            <button
              onClick={() => setQuantumMode(!quantumMode)}
              style={{
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            >
              🎨 Theme FX
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div style={{ margin: '0 0 15px 0', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '15px', color: '#cbd5e1', fontSize: '0.9rem', backdropFilter: 'blur(8px)' }}>
          <p style={{ margin: '0 0 6px 0', color: '#38bdf8', fontWeight: 'bold' }}>🌌 Quantum Singularity Terminal (Maulana Rifa'i):</p>
          <p style={{ margin: 0 }}>
            Ketik <code style={{color: '#38bdf8'}}>ai siapa pembuat web ini?</code> atau <code style={{color: '#38bdf8'}}>bmg on</code> untuk menikmati pengalaman web tingkat dewa tertinggi!
          </p>
        </div>

        {/* Terminal Box */}
        <div className="terminal-box" style={{ background: 'rgba(2, 6, 23, 0.95)', border: '1px solid #334155', backdropFilter: 'blur(10px)' }}>
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">maulana-rifai@quantum-singularity:~</span>
          </div>
          <div className="terminal-body">
            {logs.map((log, index) => (
              <div key={index} className={`terminal-line ${log.type}`} style={{ whiteSpace: 'pre-wrap' }}>
                {log.text}
              </div>
            ))}
            <form onSubmit={handleFormSubmit} className="terminal-form">
              <span className="prompt" style={{ color: quantumMode ? '#38bdf8' : '#00ff66' }}>$</span>
              <input
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                placeholder="ketik 'ai ...', 'bmg on', 'status', 'help'..."
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
