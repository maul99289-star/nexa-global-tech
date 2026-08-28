import { useState } from 'react';

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState<{ title: string; desc: string; detail: string } | null>(null);

  const features = [
    { 
      title: "Quantum-Secured Neural Sharding", 
      desc: "Arsitektur penyimpanan terdistribusi berbasis lattice-based cryptography.",
      detail: "Menggunakan enkripsi tahan kuantum dengan auto-sharding prediktif berbasis neural network untuk mengamankan data dari ancaman dekripsi masa depan."
    },
    { 
      title: "Autonomous Zero-Trust Neural Firewall", 
      desc: "Sistem pertahanan perimeter jaringan adaptif berbasis machine learning.",
      detail: "Mendeteksi zero-day exploit secara real-time dan mengisolasi node terinfeksi dalam mikrodetik tanpa memutus trafik sah."
    },
    { 
      title: "Predictive AI Self-Healing Engine", 
      desc: "Orkestrasi klaster berbasis Reinforcement Learning untuk pemulihan mandiri.",
      detail: "Meregenerasi kontainer yang rusak sebelum terjadi crash, menjamin ketersediaan sistem hingga 99.9999% tanpa intervensi manual."
    },
    { 
      title: "Sub-Millisecond Global Anycast Edge Mesh", 
      desc: "Jaringan distribusi konten terdesentralisasi latensi ultra-rendah.",
      detail: "Memangkas latensi global di bawah 5 milidetik dengan mengarahkan trafik pengguna ke edge node terdekat secara cerdas."
    },
    { 
      title: "Neural Code-Synthesizing CI/CD Pipeline", 
      desc: "Pipa pengiriman software otomatis terintegrasi LLM lokal.",
      detail: "Melakukan static analysis, bug fixing otomatis, refactoring kode, dan instant rollback dalam hitungan detik."
    },
    { 
      title: "Distributed Homomorphic Compute Engine", 
      desc: "Komputasi awan langsung pada data yang terenkripsi.",
      detail: "Menghilangkan celah kerentanan memori server karena pemrosesan data dilakukan tanpa proses dekripsi awal."
    },
    { 
      title: "Real-Time Memory Telemetry & Kernel Profiler", 
      desc: "Diagnostik tingkat kernel untuk pemetaan alokasi memori.",
      detail: "Mendeteksi memory leak dan race condition secara mikroskopis hingga tingkat instruksi mesin terendah."
    },
    { 
      title: "In-Memory Graph Database Neural Indexing", 
      desc: "Basis data relasional graf dengan pengindeksan vektor neural.",
      detail: "Memproses kueri multivariat dan pemetaan relasi data kompleks berjuta-juta entitas seketika."
    },
    { 
      title: "Zero-Latency Distributed State Synchronizer", 
      desc: "Konsensus terdistribusi lintas benua berbasis CRDT.",
      detail: "Menjamin sinkronisasi data global secara instan tanpa mengalami hambatan network bottleneck."
    },
    { 
      title: "Dynamic Resource Hyper-Compression Engine", 
      desc: "Kompresi aset dan memori berbasis neural tensor.",
      detail: "Memperkecil ukuran payload data hingga 80% tanpa kehilangan satu bit pun presisi data asli."
    },
    { 
      title: "Automated Compliance & Regulatory Sentinel", 
      desc: "Sistem audit otomatis kepatuhan standar internasional.",
      detail: "Memindai basis kode secara terus-menerus untuk memastikan kepatuhan mutlak terhadap regulasi GDPR dan ISO."
    },
    { 
      title: "High-Throughput Custom API Gateway Matrix", 
      desc: "Gerbang API asynchronous event-driven performa tinggi.",
      detail: "Menahan jutaan permintaan per detik (RPS) saat lonjakan trafik ekstrem tanpa lonjakan latensi."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f3f4f6', fontFamily: 'sans-serif', padding: '40px 20px', position: 'relative' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ background: '#0284c7', color: '#e0f2fe', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Enterprise Quantum Grade
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '20px 0' }}>Nexa Global Tech</h1>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Klik pada salah satu modul di bawah untuk membuka panel diagnostik dan spesifikasi aktif.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedFeature(f)}
              style={{ background: '#111827', border: '1px solid #1f2937', padding: '25px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#38bdf8'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1f2937'}
            >
              <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>0{i + 1}. {f.title}</div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
              <span style={{ display: 'inline-block', marginTop: '15px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: '600' }}>[ Lihat Detail Interaktif &rarr; ]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail Interaktif */}
      {selectedFeature && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#111827', border: '1px solid #38bdf8', padding: '30px', borderRadius: '16px', maxWidth: '600px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Terminal Diag: Active Node</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0 20px 0', color: '#fff' }}>{selectedFeature.title}</h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.7', marginBottom: '30px' }}>{selectedFeature.detail}</p>
            <button 
              onClick={() => setSelectedFeature(null)}
              style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Tutup Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
