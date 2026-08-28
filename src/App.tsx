export default function App() {
  const features = [
    { num: "01", title: "Quantum-Secured Neural Sharding", tag: "Cryptography", desc: "Arsitektur penyimpanan terdistribusi berbasis lattice-based cryptography yang tahan terhadap serangan komputer kuantum dengan auto-sharding neural prediktif." },
    { num: "02", title: "Autonomous Zero-Trust Neural Firewall", tag: "Security", desc: "Sistem pertahanan perimeter jaringan adaptif yang mendeteksi zero-day exploit secara real-time menggunakan behavioral machine learning." },
    { num: "03", title: "Predictive AI Self-Healing Engine", tag: "Orchestration", desc: "Mesin klaster berbasis Reinforcement Learning yang melakukan pemulihan mandiri kontainer rusak otomatis (Six Nines Availability)." },
    { num: "04", title: "Sub-Millisecond Global Anycast Edge Mesh", tag: "Network", desc: "Jaringan distribusi konten terdesentralisasi yang memangkas latensi global di bawah 5 milidetik dengan routing reinforcement learning." },
    { num: "05", title: "Neural Code-Synthesizing CI/CD Pipeline", tag: "DevOps", desc: "Pipa pengiriman software otomatis terintegrasi LLM lokal untuk static analysis, bug fixing, dan instant rollback dalam hitungan detik." },
    { num: "06", title: "Distributed Homomorphic Compute Engine", tag: "Cloud Privacy", desc: "Platform pemrosesan data awan yang langsung mengeksekusi komputasi pada data terenkripsi tanpa proses dekripsi awal." },
    { num: "07", title: "Real-Time Memory Telemetry & Kernel Profiler", tag: "Diagnostics", desc: "Alat diagnostik tingkat kernel sistem operasi untuk memetakan alokasi memori secara presisi mikroskopis mencegah memory leak." },
    { num: "08", title: "In-Memory Graph Database Neural Indexing", tag: "Database", desc: "Basis data relasional graf dengan pengindeksan vektor neural berkecepatan tinggi untuk pemetaan relasi data multivariat seketika." },
    { num: "09", title: "Zero-Latency Distributed State Synchronizer", tag: "State Sync", desc: "Algoritma konsensus lintas benua berbasis CRDT yang dioptimalkan untuk sinkronisasi data global instan tanpa bottleneck." },
    { num: "10", title: "Dynamic Resource Hyper-Compression Engine", tag: "Optimization", desc: "Algoritma kompresi aset dan memori berbasis neural tensor yang memperkecil payload hingga 80% tanpa kehilangan presisi." },
    { num: "11", title: "Automated Compliance & Regulatory Sentinel", tag: "Compliance", desc: "Sistem audit otomatis yang memindai basis kode secara berkelanjutan untuk menjamin standar regulasi internasional GDPR dan ISO." },
    { num: "12", title: "High-Throughput Custom API Gateway Matrix", tag: "Gateway", desc: "Gerbang API asynchronous event-driven berperforma tinggi yang mampu menahan jutaan permintaan per detik (RPS) tanpa latensi." }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #090d16 0%, #030712 100%)', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', padding: '50px 20px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header Elegant */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', border: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '20px' }}>
            Enterprise Quantum Grade Architecture
          </div>
          <h1 style={{ fontSize: '3.2rem', fontWeight: '800', margin: '0 0 15px 0', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Nexa Global Tech
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Infrastruktur Cloud Tingkat Dewa dengan Otomasi Kriptografi Kuantum dan Sistem Neural Terdistribusi untuk Performa Tanpa Batas.
          </p>
        </header>

        {/* Grid 12 Fitur Modern Berkelas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          {features.map((f, i) => (
            <div 
              key={i} 
              style={{ 
                background: '#111827', 
                border: '1px solid #1f2937', 
                padding: '30px', 
                borderRadius: '16px', 
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#38bdf8', fontFamily: 'monospace' }}>{f.num}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  {f.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginBottom: '12px', lineHeight: '1.4' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: '1.7', margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <footer style={{ textAlign: 'center', marginTop: '70px', borderTop: '1px solid #1f2937', paddingTop: '25px', color: '#64748b', fontSize: '0.9rem' }}>
          &copy; 2026 Nexa Global Tech. Enterprise Infrastructure Systems. All rights reserved.
        </footer>

      </div>
    </div>
  );
}
