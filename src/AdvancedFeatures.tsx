import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Voice & Neural Core v8.0.0 (Supreme Edition)' },
    { type: 'system', text: 'Lead Architect & Owner: Maulana Rifa\'i' },
    { type: 'system', text: 'Type "help", "voice-on", "trace", "snake", or use voice command.' },
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

  // Web Audio API Mechanical Click Sound Generator
  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 80, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio context errors if blocked by browser policy
    }
  };

  // Web Speech Recognition API Integration
  const startVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Maaf, browser Anda tidak mendukung fitur Voice Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID'; // Bisa bahasa Indonesia atau Inggris
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setLogs((prev) => [...prev, { type: 'system', text: '[🎙️] Mendengarkan suara... Silakan bicara (contoh: "ping", "owner", "matrix").' }]);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechToText = event.results[0][0].transcript.toLowerCase();
      setInputVal(speechToText);
      executeCommand(speechToText);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setLogs((prev) => [...prev, { type: 'error', text: '[!] Gagal mendengarkan suara. Coba ketik secara manual.' }]);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

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

    // Trace Route Simulation
    if (lowerCmd === 'trace' || lowerCmd === 'traceroute') {
      newLogs.push({
        type: 'output',
        text: 'Tracing route to nexaglobal.tech [127.0.0.1]\n 1. Edge-Gateway (10.0.0.1) - 2ms\n 2. Cloud-Proxy-SG (192.168.1.1) - 5ms\n 3. Master-Server-Root (127.0.0.1) - 8ms\nTrace complete. Secured by Maulana Rifa\'i.',
      });
      setLogs(newLogs);
      return;
    }

    // Game Snake Simulation text-based
    if (lowerCmd === 'snake' || lowerCmd === 'game') {
      newLogs.push({
        type: 'output',
        text: '🎮 [NEXA ARCADE SNAKE]\n+--------------------+\n| . . . . . . . . .  |\n| . . O O O . . . .  |\n| . . . . O . . . .  |\n| . . . . # (food) . |\n+--------------------+\nScore: 30 | Status: RUNNING!\n(Arcade mode buatan Maulana Rifa\'i!)',
      });
      setLogs(newLogs);
      return;
    }

    // Sound toggle commands
    if (lowerCmd === 'sfx-on') {
      setSoundEnabled(true);
      newLogs.push({ type: 'output', text: 'Mechanical keyboard sound FX activated.' });
      setLogs(newLogs);
      return;
    }

    if (lowerCmd === 'sfx-off') {
      setSoundEnabled(false);
      newLogs.push({ type: 'output', text: 'Mechanical keyboard sound FX deactivated.' });
      setLogs(newLogs);
      return;
    }

    // Easter Egg: Dangerous Linux command simulation
    if (lowerCmd === 'sudo rm -rf /' || lowerCmd === 'rm -rf /') {
      newLogs.push({
        type: 'error',
        text: '[WARNING] CRITICAL ERROR: Attempting to wipe system root directory...\n[!] Intercepted by Master Firewall Security...\n[SUCCESS] Just kidding! This system is heavily armored and owned by Maulana Rifa\'i. Nice try! 😎',
      });
      setLogs(newLogs);
      return;
    }

    // Cyber Attack Simulation
    if (lowerCmd === 'attack-sim' || lowerCmd === 'hack') {
      newLogs.push({
        type: 'output',
        text: '[*] Initializing penetration testing sequence...\n[+] Scanning target firewall ports (80, 443, 22)...\n[+] Bypassing sub-routine encryption layers...\n[SUCCESS] Target penetrated! System fully secured and monitored by Maulana Rifa\'i.',
      });
      setLogs(newLogs);
      return;
    }

    // Handle Code Snippet command: "code <lang>"
    if (lowerCmd.startsWith('code ')) {
      const targetLang = lowerCmd.substring(5).trim();
      let codeSnippet = '';

      if (targetLang === 'react' || targetLang === 'tsx') {
        codeSnippet = `// React Component Structure by Maulana Rifa'i\nimport React, { useState } from 'react';\n\nexport const App = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="p-4 bg-slate-900 text-white">\n      <h1>Nexa Cloud UI</h1>\n      <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>\n    </div>\n  );\n};`;
      } else if (targetLang === 'typescript' || targetLang === 'ts') {
        codeSnippet = `// TypeScript Enterprise Interface\ninterface CloudConfig {\n  nodeId: string;\n  region: string;\n  secure: boolean;\n}\n\nconst deployNode = (config: CloudConfig): void => {\n  console.log(\`Deploying to \${config.region}...\`);\n};`;
      } else if (targetLang === 'docker') {
        codeSnippet = `# Dockerfile for Edge Deployment\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "run", "dev"]`;
      } else {
        codeSnippet = `// General Code Snippet\nconst systemOwner = "Maulana Rifa'i";\nconsole.log(\`System initialized by \${systemOwner}\`);`;
      }

      newLogs.push({ type: 'output', text: codeSnippet });
      setLogs(newLogs);
      return;
    }

    // Handle AI Assistant prefix command: "ai ..."
    if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      let aiResponse = `[Nexa AI Core]: Halo! Saya asisten AI buatan Maulana Rifa'i. Menerima query "${query}".`;
      
      if (query.includes('react')) {
        aiResponse = '[Nexa AI Core]: React adalah pustaka UI komponen deklaratif berperforma tinggi buatan Maulana Rifa\'i.';
      } else if (query.includes('owner') || query.includes('pembuat')) {
        aiResponse = '[Nexa AI Core]: Website dan terminal ini dikembangkan secara mandiri oleh Maulana Rifa\'i.';
      }

      newLogs.push({ type: 'output', text: aiResponse });
      setLogs(newLogs);
      return;
    }

    switch (lowerCmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: trace, snake, attack-sim, sfx-on, sfx-off, code react, code typescript, code docker, ai <pesan>, decrypt, owner, status, ping, matrix-on, matrix-off, clear',
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
          text: '[!] Bypassing firewall... Decrypting root keys...\n[SUCCESS] Master Controller & Creator: Maulana Rifa\'i.',
        });
        break;
      case 'status':
        newLogs.push({
          type: 'output',
          text: `Edge Status: ONLINE | Latency: ${ping}ms | Master: Maulana Rifa'i | Voice Engine: ACTIVE`,
        });
        break;
      case 'ping':
        newLogs.push({
          type: 'output',
          text: `PING nexaglobal.tech (127.0.0.1) -> 64 bytes: time=${ping}ms | 0% packet loss.`,
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
      case 'clear':
        setLogs([]);
        return;
      default:
        newLogs.push({
          type: 'error',
          text: `command not found: ${rawCmd}. Ketik "trace", "snake", atau "help".`,
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
        <div className="telemetry-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="status-indicator">
              <span className="pulse-dot"></span> Vercel Edge: ONLINE
            </span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Ping: {ping}ms</span>
            <span className="telemetry-info" style={{ marginLeft: '12px' }}>Owner: Maulana Rifa'i</span>
          </div>
          <div>
            <button
              onClick={startVoiceCommand}
              style={{
                background: isListening ? '#ef4444' : '#22c55e',
                color: '#fff',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                boxShadow: '0 0 10px rgba(0,255,100,0.3)',
              }}
            >
              {isListening ? '🎙️ Mendengarkan...' : '🎙️ Voice Command'}
            </button>
          </div>
        </div>

        {/* Info Card / Welcome Preview */}
        <div style={{ maxWidth: '700px', margin: '0 auto 20px auto', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid #1e293b', borderRadius: '8px', padding: '15px', color: '#cbd5e1', fontSize: '0.9rem', backdropFilter: 'blur(5px)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#38bdf8', fontWeight: 'bold' }}>🎙️ Supreme Voice & Neural Terminal (Maulana Rifa'i):</p>
          <p style={{ margin: 0 }}>
            Klik tombol hijau <code style={{color: '#4ade80'}}>Voice Command</code> di atas atau ketik <code style={{color: '#4ade80'}}>trace</code> dan <code style={{color: '#4ade80'}}>snake</code> untuk mencoba fitur futuristik ini!
          </p>
        </div>

        {/* Terminal Box */}
        <div className="terminal-box" style={{ background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(8px)' }}>
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">maulana-rifai@neural-terminal:~</span>
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
                onChange={handleInputChange}
                placeholder="ketik 'trace', 'owner', atau klik tombol voice..."
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
