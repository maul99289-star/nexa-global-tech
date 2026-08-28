import { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "[00:01:02] SYSTEM_BOOT: Core quantum mesh initialized successfully.",
    "[00:01:05] SEC_GATEWAY: Zero-trust neural firewall active at 100Gbps.",
    "[00:01:10] AI_CLUSTER: Reinforcement learning optimizer online."
  ]);
  const [metrics, setMetrics] = useState({ cpu: 14.2, memory: 38.6, rps: 124500, status: "OPTIMAL" });

  // Simulasi fluktuasi data real-time ala software PC tingkat dewa
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: +(10 + Math.random() * 25).toFixed(1),
        memory: +(35 + Math.random() * 5).toFixed(1),
        rps: Math.floor(120000 + Math.random() * 45000),
        status: "SECURE"
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { 
      id: 1,
      title: "Quantum-Secured Neural Sharding", 
      category: "Cryptography Core",
      desc: "Lattice-based encryption dengan auto-sharding prediktif berbasis neural network.",
      action: "Execute Shard Re-Encryption",
      code: "sharding_core --quantum-lattice --auto-balance --entropy-check=99.9%"
    },
    { 
      id: 2,
      title: "Autonomous Zero-Trust Neural Firewall", 
      category: "Perimeter Defense",
      desc: "Deteksi zero-day exploit real-time menggunakan behavioral machine learning.",
      action: "Purge Isolated Nodes",
      code: "firewall_ai --zero-trust --mitigate-ddos --isolate-anomalies"
    },
    { 
      id: 3,
      title: "Predictive AI Self-Healing Engine", 
      category: "Cluster Orchestration",
      desc: "Pemulihan kontainer mandiri via Reinforcement Learning (Six Nines Uptime).",
      action: "Run Diagnostic Sweep",
      code: "k8s_ai_healer --target=cluster-alpha --auto-patch --predictive"
    },
    { 
      id: 4,
      title: "Sub-Millisecond Global Anycast Edge Mesh", 
      category: "Global Network",
      desc: "Routing edge node cerdas dengan latensi global di bawah 5 milidetik.",
      action: "Optimize Edge Routes",
      code: "anycast_mesh --global-routing --latency-target=<5ms --force-sync"
    },
    { 
      id: 5,
      title: "Neural Code-Synthesizing CI/CD Pipeline", 
      category: "DevOps Automation",
      desc: "Static analysis LLM lokal untuk refactoring otomatis dan instant rollback.",
      action: "Deploy Neural Build",
      code: "cicd_synthesizer --llm-verify --auto-refactor --zero-downtime"
    },
    { 
      id: 6,
      title: "Distributed Homomorphic Compute Engine", 
      category: "Privacy & Cloud",
      desc: "Komputasi awan langsung pada data terenkripsi tanpa proses dekripsi awal.",
      action: "Execute Blind Compute",
      code: "homomorphic_exec --blind-mode --tensor-compute --no-decrypt"
    },
    { 
      id: 7,
      title: "Real-Time Memory Telemetry & Kernel Profiler", 
      category: "System Diagnostics",
      desc: "Pemetaan alokasi memori tingkat kernel presisi mikroskopis.",
      action: "Dump Kernel Telemetry",
      code: "kernel_profiler --live-trace --detect-leaks --precision=micro"
    },
    { 
      id: 8,
      title: "In-Memory Graph Database Neural Indexing", 
      category: "Data Storage",
      desc: "Basis data relasional graf dengan pengindeksan vektor neural seketika.",
      action: "Re-index Graph Vectors",
      code: "graph_db --neural-index --multivariat-query --vector-sync"
    },
    { 
      id: 9,
      title: "Zero-Latency Distributed State Synchronizer", 
      category: "State Management",
      desc: "Konsensus lintas benua berbasis CRDT tanpa network bottleneck.",
      action: "Force CRDT Sync",
      code: "state_sync --crdt-consensus --cross-continent --zero-bottleneck"
    },
    { 
      id: 10,
      title: "Dynamic Resource Hyper-Compression Engine", 
      category: "Resource Optimization",
      desc: "Kompresi payload hingga 80% via neural tensor tanpa kehilangan presisi.",
      action: "Compress Payload Matrix",
      code: "tensor_compress --ratio=0.8 --lossless-tensor --optimize-ram"
    },
    { 
      id: 11,
      title: "Automated Compliance & Regulatory Sentinel", 
      category: "Security & Audit",
      desc: "Pemindai basis kode berkelanjutan untuk standar GDPR dan ISO 27001.",
      action: "Generate Audit Matrix",
      code: "compliance_sentinel --scan-iso --gdpr-check --auto-remediate"
    },
    { 
      id: 12,
      title: "High-Throughput Custom API Gateway Matrix", 
      category: "Network Gateway",
      desc: "Gerbang API asynchronous event-driven penahan jutaan RPS ekstrem.",
      action: "Stress Test Gateway",
      code: "api_gateway --async-event --rps-limit=unlimited --load-balance"
    }
  ];

  const handleTriggerAction = (feature: typeof features[0]) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      `[${timeStr}] EXECUTED: ${feature.title} -> ${feature.code}`,
      ...prev.slice(0, 7)
    ]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', padding: '30px' }}>
      {/* Top Header Command Center */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #22c55e' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#22c55e', letterSpacing: '1px' }}>SYSTEM OPERATIONAL: SECURE</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '5px 0 0 0', letterSpacing: '-0.5px' }}>NEXA GLOBAL TECH // ENTERPRISE KERNEL</h1>
        </div>
        
        {/* Live Metrics Header Bar */}
        <div style={{ display: 'flex', gap: '15px', background: '#0f172a', border: '1px solid #1e293b', padding: '12px 20px', borderRadius: '10px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>CPU LOAD</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#38bdf8' }}>{metrics.cpu}%</div>
          </div>
          <div style={{ borderLeft: '1px solid #1e293b', paddingLeft: '15px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>MEMORY</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#a855f7' }}>{metrics.memory}%</div>
          </div>
          <div style={{ borderLeft: '1px solid #1e293b', paddingLeft: '15px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>REQUESTS/SEC</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#22c55e' }}>{metrics.rps.toLocaleString()}</div>
          </div>
        </div>
      </header>

      {/* Main Grid Layout ala Desktop Software */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '25px' }}>
        
        {/* Left Column: 12 Modul Tingkat Dewa */}
        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Active Enterprise Core Modules (12 Sub-Systems)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {features.map((f) => (
              <div 
                key={f.id}
                onClick={() => setActiveTab(f.id)}
                style={{ 
                  background: activeTab === f.id ? '#0f172a' : '#090d16', 
                  border: activeTab === f.id ? '1px solid #38bdf8' : '1px solid #1e293b', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === f.id ? '0 0 15px rgba(56, 189, 248, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {f.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>MOD-0{f.id}</span>
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>{f.title}</div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>{f.desc}</p>
                <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: '600' }}>
                  Klik untuk kontrol panel &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Terminal & Live Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Active Control Panel */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', marginTop: 0, marginBottom: '15px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
              {activeTab ? `MOD-0${activeTab} Control Hub` : 'Select Module for Execution'}
            </h3>
            
            {activeTab ? (() => {
              const current = features.find(f => f.id === activeTab)!;
              return (
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '8px' }}>{current.title}</div>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '15px' }}>{current.desc}</p>
                  
                  <div style={{ background: '#020617', padding: '10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#22c55e', marginBottom: '15px', border: '1px solid #1e293b' }}>
                    $ {current.code}
                  </div>

                  <button 
                    onClick={() => handleTriggerAction(current)}
                    style={{ width: '100%', background: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    {current.action}
                  </button>
                </div>
              );
            })() : (
              <div style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: '30px 0' }}>
                Silakan pilih salah satu dari 12 modul di sebelah kiri untuk menjalankan eksekusi sistem tingkat dewa.
              </div>
            )}
          </div>

          {/* Live System Console Logs */}
          <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
              <span>Live Kernel Logs</span>
              <span style={{ color: '#22c55e' }}>● STREAMING</span>
            </div>
            <div style={{ background: '#020617', borderRadius: '6px', padding: '10px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#cbd5e1', flexGrow: 1, minHeight: '180px', maxHeight: '220px', overflowY: 'auto', border: '1px solid #1e293b' }}>
              {logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '6px', borderLeft: '2px solid #38bdf8', paddingLeft: '6px' }}>
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
