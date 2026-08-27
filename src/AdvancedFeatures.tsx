import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(12);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(true);
  
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Tech Terminal v2.5.0 (Enterprise Matrix Edition)' },
    { type: 'system', text: 'Type "help" for commands, or try "whoami" and "matrix-off".' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live Clock & Ping Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
      setPing(Math.floor(Math.random() * 8) + 8);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Matrix Rain Canvas Animation Effect
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-_';
    const alphabet = katakana + latin;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const render = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(render, 30);
    return () => clearInterval(interval);
  }, [matrixActive]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'input', text: `$ ${cmdText}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: about, skills, status, hire, whoami, matrix-on, matrix-off, clear, react, typescript, vite, tailwind, docker',
        });
        break;
      case 'about':
        newLogs.push({
          type: 'output',
          text: 'Nexa Global Tech: Enterprise Cloud Infrastructure & Autonomous AI Solutions.',
        });
        break;
      case 'skills':
        newLogs.push({
          type: 'output',
          text: 'Core Stack: React, TypeScript, Vite, Tailwind, Vercel Edge, Docker, CI/CD.',
        });
        break;
      case 'status':
        newLogs.push({
          type: 'output',
          text: `Edge Status: ONLINE | Latency: ${ping}ms | Uptime: 99.99%`,
        });
        break;
      case 'whoami':
        newLogs.push({
          type: 'output',
          text: 'Access Granted. Target IP: 127.0.0.1 | Node: Vercel-Edge-ID-88X | Location: Secure Gateway',
        });
        break;
      case 'matrix-on':
        setMatrixActive(true);
        newLogs.push({ type: 'output', text: 'Matrix rain effect activated.' });
        break;
      case 'matrix-off':
        setMatrixActive(false);
        newLogs.push({ type: 'output', text: 'Matrix rain effect deactivated.' });
        break;
      case 'hire':
        newLogs.push({
          type: 'output',
          text: 'Send partnership proposals to: contact@nexaglobal.tech',
        });
        break;
      case 'react':
        newLogs.push({
          type: 'output',
          text: 'React: A declarative, component-based JavaScript library for building high-performance UIs.',
        });
        break;
      case 'typescript':
        newLogs.push({
          type: 'output',
          text: 'TypeScript: Typed JavaScript at scale that adds static type definitions to prevent runtime errors.',
        });
        break;
      case 'vite':
        newLogs.push({
          type: 'output',
          text: 'Vite: Next-generation frontend build tool offering lightning-fast HMR.',
        });
        break;
      case 'tailwind':
        newLogs.push({
          type: 'output',
          text: 'Tailwind CSS: A utility-first CSS framework for rapidly building custom modern user interfaces.',
        });
        break;
      case 'docker':
        newLogs.push({
          type: 'output',
          text: 'Docker: Containerization platform enabling seamless code consistency across environments.',
        });
        break;
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({
          type: 'error',
          text: `command not found: ${cmd}. Type "help" for options.`,
        });
    }

    setLogs(newLogs);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="advanced-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Matrix Rain Canvas Background */}
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
            opacity: 0.25,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Telemetry Bar */}
        <div className="telemetry-bar">
          <span className="status-indicator">
            <span className="pulse-dot"></span> Vercel Edge: ONLINE
          </span>
          <span className="telemetry-info">Ping: {ping}ms</span>
          <span className="telemetry-info">Live UTC: {currentTime}</span>
        </div>

        {/* Info Card / Welcome Preview */}
        <div style={{ maxWidth: '700px', margin: '0 auto 20px auto', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid #1e293b', borderRadius: '8px', padding: '15px', color: '#cbd5e1', fontSize: '0.9rem', backdropFilter: 'blur(5px)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#38bdf8', fontWeight: 'bold' }}>🚀 Core Architecture Overview:</p>
          <p style={{ margin: 0 }}>
            <strong>React:</strong> A declarative, component-based JavaScript library for building high-performance UIs. (Ketik <code style={{color: '#4ade80'}}>whoami</code> atau <code style={{color: '#4ade80'}}>matrix-off</code> di bawah!)
          </p>
        </div>

        {/* Terminal Box */}
        <div className="terminal-box" style={{ background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(8px)' }}>
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">nexa-terminal@root:~</span>
          </div>
          <div className="terminal-body">
            {logs.map((log, index) => (
              <div key={index} className={`terminal-line ${log.type}`}>
                {log.text}
              </div>
            ))}
            <form onSubmit={handleFormSubmit} className="terminal-form">
              <span className="prompt">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="ketik 'help', 'whoami', 'matrix-off'..."
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
