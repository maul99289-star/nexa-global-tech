import React, { useState, useEffect } from 'react';

interface FeatureModule {
  readonly id: number;
  readonly title: string;
  readonly tag: string;
  readonly desc: string;
  readonly command: string;
}

const MODULES: readonly FeatureModule[] = [
  { id: 1, title: "Quantum-Secured Neural Sharding", tag: "Cryptography", desc: "Lattice-based encryption dengan auto-sharding neural prediktif.", command: "sharding_core --quantum-lattice --secure" },
  { id: 2, title: "Autonomous Zero-Trust Neural Firewall", tag: "Security", desc: "Deteksi zero-day exploit real-time menggunakan machine learning.", command: "firewall_ai --zero-trust --mitigate" },
  { id: 3, title: "Predictive AI Self-Healing Engine", tag: "Orchestration", desc: "Pemulihan mandiri kontainer rusak via Reinforcement Learning.", command: "k8s_ai_healer --target=cluster-alpha --auto" },
  { id: 4, title: "Sub-Millisecond Global Anycast Edge", tag: "Network", desc: "Routing edge node cerdas dengan latensi global di bawah 5ms.", command: "anycast_mesh --global-routing --low-latency" },
  { id: 5, title: "Neural Code-Synthesizing CI/CD", tag: "DevOps", desc: "Static analysis LLM lokal untuk refactoring & instant rollback.", command: "cicd_synthesizer --llm-verify --auto-refactor" },
  { id: 6, title: "Distributed Homomorphic Compute", tag: "Cloud Privacy", desc: "Komputasi awan langsung pada data terenkripsi tanpa dekripsi.", command: "homomorphic_exec --blind-mode --tensor" },
  { id: 7, title: "Real-Time Memory Telemetry Profiler", tag: "Diagnostics", desc: "Pemetaan alokasi memori tingkat kernel presisi mikroskopis.", command: "kernel_profiler --live-trace --detect-leaks" },
  { id: 8, title: "In-Memory Graph Database Indexing", tag: "Database", desc: "Basis data relasional graf vektor neural berkecepatan tinggi.", command: "graph_db --neural-index --vector-sync" },
  { id: 9, title: "Zero-Latency State Synchronizer", tag: "State Sync", desc: "Konsensus lintas benua berbasis CRDT tanpa network bottleneck.", command: "state_sync --crdt-consensus --cross-continent" },
  { id: 10, title: "Dynamic Hyper-Compression Engine", tag: "Optimization", desc: "Kompresi payload hingga 80% via neural tensor tanpa rugi bit.", command: "tensor_compress --ratio=0.8 --lossless" },
  { id: 11, title: "Automated Compliance Sentinel", tag: "Compliance", desc: "Pemindai basis kode berkelanjutan standar GDPR & ISO 27001.", command: "compliance_sentinel --scan-iso --gdpr" },
  { id: 12, title: "High-Throughput API Gateway Matrix", tag: "Gateway", desc: "Gerbang API async event-driven penahan jutaan RPS ekstrem.", command: "api_gateway --async-event --rps-limit=max" }
];

export default function App(): React.JSX.Element {
  const [activeMod, setActiveMod] = useState<FeatureModule>(MODULES[0]);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM_INIT] Quantum core online.",
    "[AI_MODEL] Neural network weights loaded successfully.",
    "[SEC_MESH] Zero-trust perimeter secured at 100Gbps."
  ]);
  const [metrics, setMetrics] = useState({ cpu: 12.4, memory: 41.2, rps: 145200 });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics({
        cpu: +(10 + Math.random() * 20).toFixed(1),
        memory: +(40 + Math.random() * 5).toFixed(1),
        rps: Math.floor(140000 + Math.random() * 30000)
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleExecute = (mod: FeatureModule) => {
    setActiveMod(mod);
    const timestamp = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      `[${timestamp}] EXEC: ${mod.command}`,
      ...prev.slice(0, 6)
    ]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', padding: '30px' }}>
      
      {/* Top Status Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '25px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#22c55e', letterSpacing: '1px' }}>AI COMMAND CENTER // ONLINE</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '5px 0 0 0', color: '#fff' }}>NEXA GLOBAL TECH</h1>
        </div>

        <div style={{ display: 'flex', gap: '15px', background: '#0f172a', border: '1px solid #1e293b', padding: '10px 20px', borderRadius: '10px' }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>CPU</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#38bdf8' }}>{metrics.cpu}%</div>
          </div>
          <div style={{ borderLeft: '1px solid #1e293b', paddingLeft: '15px' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>RAM</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#a855f7' }}>{metrics.memory}%</div>
          </div>
          <div style={{ borderLeft: '1px solid #1e293b', paddingLeft: '15px' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>RPS</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#22c55e' }}>{metrics.rps.toLocaleString()}</div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '25px' }}>
        
        {/* Left: 12 Modules Grid */}
        <div>
          <h2 style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            12 Enterprise Modules (Click to Run AI Simulation)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px' }}>
            {MODULES.map((m) => (
              <div 
                key={m.id}
                onClick={() => handleExecute(m)}
                style={{ 
                  background: activeMod.id === m.id ? '#0f172a' : '#090d16', 
                  border: activeMod.id === m.id ? '1px solid #38bdf8' : '1px solid #1e293b', 
                  padding: '18px', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeMod.id === m.id ? '0 0 15px rgba(56, 189, 248, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>{m.tag}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>0{m.id}</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>{m.title}</div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Simulated Camera / AI Visualizer & Hacker Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Simulated AI Vision / Camera Panel */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#38bdf8' }}>AI NEURAL VISION FEED</span>
              <span style={{ fontSize: '0.7rem', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>ACTIVE 60 FPS</span>
            </div>
            
            {/* Kotak simulasi kamera bergaya sci-fi */}
            <div style={{ position: 'relative', height: '150px', background: '#020617', borderRadius: '8px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)' }}></div>
              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🌐</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#38bdf8' }}>Target: {activeMod.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '3px' }}>Status: Encrypted Stream Locked</div>
              </div>
            </div>
          </div>

          {/* Interactive Hacker/Command Terminal Log */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Live Terminal Command Chat</span>
              <span style={{ color: '#38bdf8' }}>● SECURE SHELL</span>
            </div>
            <div style={{ background: '#020617', borderRadius: '6px', padding: '10px', fontFamily: 'monospace', fontSize: '0.7rem', color: '#22c55e', flexGrow: 1, minHeight: '140px', maxHeight: '180px', overflowY: 'auto', border: '1px solid #1e293b' }}>
              {logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '5px', borderLeft: '2px solid #22c55e', paddingLeft: '6px' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
