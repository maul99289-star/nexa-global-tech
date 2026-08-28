import React, { useState, useEffect, useRef } from 'react';

export const NexaTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [logs, setLogs] = useState<Array<{ type: string; text: string }>>([
    { type: 'system', text: 'Nexa Global Tech Terminal v4.0.0 [AI Autonomous Core]' },
    { type: 'system', text: 'Type "help", "ai <pesan>", "decrypt", "ping", or "whoami".' },
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim();
    const lowerCmd = rawCmd.toLowerCase();
    if (!rawCmd) return;

    const newLogs = [...logs, { type: 'input', text: `$ ${rawCmd}` }];

    if (lowerCmd === 'help') {
      newLogs.push({ type: 'output', text: 'Available commands: help, ai <query>, decrypt, ping, whoami, clear' });
    } else if (lowerCmd.startsWith('ai ')) {
      const query = rawCmd.substring(3).trim();
      newLogs.push({ type: 'output', text: `[AI Autonomous Core]: Memproses analisis untuk "${query}". Sistem berjalan stabil.` });
    } else if (lowerCmd === 'decrypt') {
      newLogs.push({ type: 'output', text: '[DECRYPT]: Berhasil mendekripsi enkripsi kuantum tingkat lanjut.' });
    } else if (lowerCmd === 'ping') {
      newLogs.push({ type: 'output', text: 'PONG! Latency: 1ms (Edge Network Secure).' });
    } else if (lowerCmd === 'whoami') {
      newLogs.push({ type: 'output', text: 'nexa-terminal@root (Authorized Administrator).' });
    } else if (lowerCmd === 'clear') {
      setLogs([]);
      return;
    } else {
      newLogs.push({ type: 'error', text: `Command not found: ${rawCmd}. Ketik "help" untuk bantuan.` });
    }

    setLogs(newLogs);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', fontFamily: 'monospace', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', color: '#166534', fontSize: '0.75rem', opacity: 0.3, userSelect: 'none', lineHeight: '1.8', wordBreak: 'break-all', padding: '20px', zIndex: 0 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>
            0101010199AEF82VYAQ9SGV6IQD*+TXG&G7Z1KWS9L3PTWXH1STCNXC99NOVD87KAS3OCMYAR7YYWNN&CCQDFFET4WMKCFOILRAB72VZZ6INCXQDFET4WMCSUB73BGVAZ9UDRS0
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '700px', background: '#090d16', border: '1px solid #1e293b', borderRadius: '10px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8)', zIndex: 1, overflow: 'hidden' }}>
        
        <div style={{ background: '#0f172a', padding: '10px 14px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }}></span>
          <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#64748b' }}>nexa-terminal@root:~</span>
        </div>

        <div style={{ padding: '18px', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', fontSize: '0.85rem' }}>
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
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="ketik 'ai apa itu react', 'decrypt', 'help'..."
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
