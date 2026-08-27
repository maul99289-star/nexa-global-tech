import React, { useState, useEffect } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  // 1. Telemetry State
  const [ping, setPing] = useState(12);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // 2. Terminal State
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Nexa Global Tech Terminal v2.4.0 (x86_64-pc-vercel)',
    'Type "help" to see available commands.',
  ]);

  useEffect(() => {
    // Simulasi fluktuasi ping real-time ala server pro
    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 8) + 10);
    }, 3000);

    // Update jam dunia live
    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(pingInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Commands: about, skills, status, clear, hire';
        break;
      case 'about':
        response = 'Nexa Global Tech: Enterprise Digital Solutions & Scalable Cloud Infrastructure.';
        break;
      case 'skills':
        response = 'Stack: React, TypeScript, Vite, Tailwind, Vercel Edge, Docker CI/CD.';
        break;
      case 'status':
        response = `System Status: ONLINE | Latency: ${ping}ms | Uptime: 99.98%`;
        break;
      case 'hire':
        response = 'Success! Send inquiry to contact@nexaglobaltech.internal';
        break;
      case 'clear':
        setLogs(['Nexa Global Tech Terminal v2.4.0']);
        setInputVal('');
        return;
      default:
        response = `command not found: ${cmd}. Type "help" for options.`;
    }

    setLogs((prev) => [...prev, `$ ${inputVal}`, response]);
    setInputVal('');
  };

  return (
    <div className="advanced-container">
      {/* Telemetry & World Clock Bar */}
      <div className="telemetry-bar">
        <div className="telemetry-item">
          <span className="status-dot"></span>
          <span>Vercel Edge: <strong>ONLINE</strong></span>
        </div>
        <div className="telemetry-item">
          <span>Ping: <strong>{ping}ms</strong></span>
        </div>
        <div className="telemetry-item">
          <span>Live UTC/Local: <strong>{time}</strong></span>
        </div>
      </div>

      {/* In-Browser Interactive Terminal */}
      <div className="terminal-box">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-title">nexa-terminal@root:~</span>
        </div>
        <div className="terminal-body">
          {logs.map((log, idx) => (
            <div key={idx} className="terminal-line">{log}</div>
          ))}
          <form onSubmit={handleCommand} className="terminal-form">
            <span className="prompt">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="ketik 'help' di sini..."
              className="terminal-input"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
