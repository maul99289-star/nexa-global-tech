export default function App() {
  const features = [
    { title: "Quantum-Secured Neural Sharding", desc: "Arsitektur penyimpanan terdistribusi berbasis lattice-based cryptography yang tahan terhadap serangan komputer kuantum, dilengkapi auto-sharding instan berbasis prediksi AI neural." },
    { title: "Autonomous Zero-Trust Neural Firewall", desc: "Sistem pertahanan perimeter jaringan adaptif yang mendeteksi anomali zero-day exploit menggunakan analisis behavioral machine learning secara real-time." },
    { title: "Predictive AI Self-Healing Engine", desc: "Mesin orkestrasi klaster berbasis Reinforcement Learning yang meregenerasi kontainer rusak secara mandiri sebelum terjadi crash (Six Nines Availability)." },
    { title: "Sub-Millisecond Global Anycast Edge Mesh", desc: "Jaringan distribusi konten terdesentralisasi yang memangkas latensi jaringan global hingga di bawah 5 milidetik dengan routing reinforcement learning." },
    { title: "Neural Code-Synthesizing CI/CD Pipeline", desc: "Pipa pengiriman software otomatis terintegrasi LLM lokal untuk deteksi bug, refactoring otomatis, dan rollback instan dalam hitungan detik." },
    { title: "Distributed Homomorphic Compute Engine", desc: "Platform pemrosesan data terenkripsi yang memungkinkan komputasi awan dijalankan langsung pada data terenkripsi tanpa dekripsi awal." },
    { title: "Real-Time Memory Telemetry & Kernel Profiler", desc: "Alat diagnostik tingkat kernel sistem operasi yang memetakan alokasi memori secara presisi mikroskopis untuk mencegah memory leak." },
    { title: "In-Memory Graph Database Neural Indexing", desc: "Basis data relasional graf dengan pengindeksan vektor neural berkecepatan tinggi untuk pemetaan relasi data multivariat seketika." },
    { title: "Zero-Latency Distributed State Synchronizer", desc: "Algoritma konsensus berbasis CRDT yang dioptimalkan untuk sinkronisasi data lintas benua secara instan tanpa network bottleneck." },
    { title: "Dynamic Resource Hyper-Compression Engine", desc: "Algoritma kompresi aset dan memori berbasis neural tensor compression yang memperkecil payload hingga 80% tanpa kehilangan presisi data." },
    { title: "Automated Compliance & Regulatory Sentinel", desc: "Sistem audit otomatis yang memindai basis kode secara terus-menerus untuk memastikan kepatuhan mutlak standar internasional GDPR dan ISO." },
    { title: "High-Throughput Custom API Gateway Matrix", desc: "Gerbang API asynchronous event-driven berperforma tinggi yang mampu menahan jutaan permintaan per detik (RPS) tanpa lonjakan latensi." }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f3f4f6', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ background: '#0284c7', color: '#e0f2fe', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Enterprise Quantum Grade
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '20px 0' }}>Nexa Global Tech</h1>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Infrastruktur Cloud Tingkat Dewa dengan Arsitektur Kriptografi Kuantum dan Otomasi Neural Terdistribusi.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', padding: '25px', borderRadius: '12px', transition: 'border-color 0.2s' }}>
              <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>0{i + 1}. {f.title}</div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
