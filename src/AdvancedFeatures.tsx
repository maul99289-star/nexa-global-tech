import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(true);
  
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Tech Terminal v4.0.0 (Autonomous Core)' },
    { type: 'system', text: 'Lead Architect & Owner: Maulana Rifa\'i' },
    { type: 'system', text: 'Type "help", "ai <pesan>", "decrypt", "ping", or "whoami".' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live Clock & Ping Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
      setPing(Math.floor(Math.random() * 5) + 8);
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
    const rawCmd = cmdText.trim();
    const lowerCmd = rawCmd.toLowerCase();
    if (!rawCmd) return;

    const newLogs = [...logs, { type: 'input', text: `$ ${rawCmd}` }];

    // Handle AI Assistant prefix command: "ai ..."
    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let aiResponse = `[Nexa AI Core]: Halo! Saya asisten AI buatan Maulana Rifa'i. Menerima query "${query}". Sistem beroperasi optimal pada stack React & TypeScript.`;
      
      if (query.includes('react')) {
        aiResponse = '[Nexa AI Core]: React adalah pustaka UI berbasis komponen deklaratif yang dirancang oleh Maulana Rifa\'i untuk performa tinggi.';
      } else if (query.includes('owner') || query.includes('pembuat') || query.includes('siapa')) {
        aiResponse = '[Nexa AI Core]: Website dan infrastruktur terminal ini dimiliki dan dikembangkan sepenuhnya oleh Maulana Rifa\'i.';
      } else if (query.includes('halo') || query.includes('hai')) {
        aiResponse = '[Nexa AI Core]: Halo! Selamat datang di terminal cloud milik Maulana Rifa\'i.';
      }

      newLogs.push({ type: 'output', text: aiResponse });
      setLogs(newLogs);
      return;
    }

    switch (lowerCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: ai <pesan>, decrypt, about, owner, skills, status, hire, whoami, ping, matrix-on, matrix-off, clear, react, typescript, vite, tailwind, docker',
        });
        break;
      case 'owner':
      case 'author':
        newLogs.push({
          type: 'output',
          text: 'System Owner & Lead Architect: Maulana Rifa\'i | Elite Full-Stack & DevOps Engineer.',
        });
        break;
      case 'decrypt':
        newLogs.push({
          type: 'output',
          text: '[!] Bypassing firewall... Decrypting root keys...\n[SUCCESS] Access Granted. Owner & Master Controller: Maulana Rifa\'i.',
        });
        break;
      case 'about':
        newLogs.push({
          type: 'output',
          text: 'Nexa Global Tech: Enterprise Cloud Infrastructure & Autonomous AI Solutions by Maulana Rifa\'i.',
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
          text: `Edge Status: ONLINE | Latency: ${ping}ms | Controller: Maulana Rifa'i | Security: SECURE`,
        });
        break;
      case 'ping':
        newLogs.push({
          type: 'output',
          text: `PING nexaglobal.tech (127.0.0.1) -> 64 bytes: icmp_seq=1 time=${ping}ms | 0% packet loss.`,
        });
        break;
      case 'whoami':
        newLogs.push({
          type: 'output',
          text: 'Access Granted. User: Maulana Rifa\'i | Clearance: Level 5 Root Admin.',
        });
        break;
      case 'matrix-on':
        setMatrixActive(true);
        newLogs.push({ type: 'output', text: 'Matrix rain background effect activated.' });
        break;
      case 'matrix-off':
        setMatrixActive(false);
        newLogs.push({ type: 'output', text: 'Matrix rain background effect deactivated.' });
        break;
      case 'hire':
        newLogs.push({
          type: 'output',
          text: 'Send partnership proposals to Maulana Rifa\'i via email: contact@nexaglobal.tech',
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
          text: 'Vite: Next-generation frontend build tool offering lightning-fast HMR and optimized bundles.',
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
          text: 'Docker: Containerization platform enabling seamless code consistency across cloud environments.',
        });
        break;
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({
          type: 'error',
          text: `command not found: ${rawCmd}. Ketik "owner", "ai halo", atau "help" untuk opsi.`,
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
          <span className="telemetry-info">Owner: Maulana Rifa'i</span>
        </div>

        {/* Info Card / Welcome Preview */}
        <div style={{ maxWidth: '700px', margin: '0 auto 20px auto', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid #1e293b', borderRadius: '8px', padding: '15px', color: '#cbd5e1', fontSize: '0.9rem', backdropFilter: 'blur(5px)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#38bdf8', fontWeight: 'bold' }}>⚡ Developed & Architected by Maulana Rifa'i:</p>
          <p style={{ margin: 0 }}>
            Ketik perintah <code style={{color: '#4ade80'}}>owner</code>, <code style={{color: '#4ade80'}}>whoami</code>, atau <code style={{color: '#4ade80'}}>ai halo</code> di bawah untuk berinteraksi dengan sistem!
          </p>
        </div>

        {/* Terminal Box */}
        <div className="terminal-box" style={{ background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(8px)' }}>
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">maulana-rifai@nexa-terminal:~</span>
          </div>
          <div className="terminal-body">
            {logs.map((log, index) => (
              <div key={index} className={`terminal-line ${log.type}`} style={{ whiteSpace: 'pre-wrap' }}>
                {log.text}
              </div>
            ))}
            <form onSubmit={handleFormSubmit} className="terminal-form">
              <span className="prompt">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="ketik 'owner', 'ai siapa pembuatnya', 'help'..."
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
