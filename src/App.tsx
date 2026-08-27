export default function App() {
  const features = [
    { title: "AI Cloud Orchestration", desc: "Automated scaling and predictive workload management." },
    { title: "Quantum-Resistant Security", desc: "Next-gen end-to-end encryption safeguarding core databases." },
    { title: "Global CDN Mesh", desc: "Ultra-low latency edge delivery across 200+ global nodes." },
    { title: "Real-time Telemetry", desc: "Deep-dive diagnostic monitoring and instant anomaly detection." },
    { title: "Zero-Trust Architecture", desc: "Granular access controls and continuous identity verification." },
    { title: "Auto-Failover Clusters", desc: "99.999% high availability with seamless disaster recovery." },
    { title: "Edge Computing Engine", desc: "Process data closer to the source for real-time responsiveness." },
    { title: "Automated CI/CD Pipelines", desc: "Streamlined deployment workflows integrated seamlessly." },
    { title: "Enterprise Database Sharding", desc: "Horizontal scaling optimized for massive data throughput." },
    { title: "Distributed Load Balancing", desc: "Intelligent traffic distribution preventing server bottlenecks." },
    { title: "Advanced Compliance Tools", desc: "Automated audits meeting global enterprise regulatory standards." },
    { title: "Custom API Gateway", desc: "High-performance routing and rate-limiting infrastructure." }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f3f4f6', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ background: '#0284c7', color: '#e0f2fe', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Enterprise Edition
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '20px 0' }}>Nexa Global Tech</h1>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
            Menampilkan 12 Fitur Infrastruktur Cloud Tingkat Dewa untuk Performa Tanpa Batas.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', padding: '25px', borderRadius: '12px', transition: 'border-color 0.2s' }}>
              <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>0{i + 1}. {f.title}</div>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
