import React, { useState, useEffect, useRef } from 'react';
import './AdvancedFeatures.css';

export const AdvancedFeatures: React.FC = () => {
  const [ping, setPing] = useState<number>(12);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Tech Terminal v2.4.0 (x86_64-pc-vercel)' },
    { type: 'system', text: 'Type "help" to see available commands.' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
      setPing(Math.floor(Math.random() * 8) + 8);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'input', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Commands: about, skills, status, hire, clear, react, typescript, vite, tailwind, vercel, docker, cicd',
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
          text: 'Vite: Next-generation frontend build tool offering lightning-fast HMR and optimized production bundles.',
        });
        break;
      case 'tailwind':
        newLogs.push({
          type: 'output',
          text: 'Tailwind CSS: A utility-first CSS framework for rapidly building custom modern user interfaces.',
        });
        break;
      case 'vercel':
      case 'vercel edge':
        newLogs.push({
          type: 'output',
          text: 'Vercel Edge Network: Global serverless deployment infrastructure ensuring ultra-low latency worldwide.',
        });
        break;
      case 'docker':
        newLogs.push({
          type: 'output',
          text: 'Docker: Containerization platform enabling seamless code consistency across diverse cloud environments.',
        });
        break;
      case 'cicd':
      case 'docker cicd':
        newLogs.push({
          type: 'output',
          text: 'CI/CD Pipeline: Automated build, test, and deployment workflow integrated via Git and GitHub Actions.',
        });
        break;
      case 'clear':
        setLogs([]);
        setInputVal('');
        return;
      default:
        newLogs.push({
          type: 'error',
          text: `command not found: ${cmd}. Type "help" for options.`,
        });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div className="advanced-container">
      <div className="telemetry-bar">
        <span className="status-indicator">
          <span className="pulse-dot"></span> Vercel Edge: ONLINE
        </span>
        <span className="telemetry-info">Ping: {ping}ms</span>
        <span className="telemetry-info">Live UTC: {currentTime}</span>
      </div>

      <div className="terminal-box">
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
          <form onSubmit={handleCommand} className="terminal-form">
            <span className="prompt">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="ketik 'help' atau 'react' di sini..."
              className="terminal-input"
              autoFocus
            />
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
export default AdvancedFeatures;
