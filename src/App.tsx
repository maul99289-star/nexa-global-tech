import { useState } from 'react'
import './App.css'

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Project {
  title: string;
  category: string;
  desc: string;
}

const services: Service[] = [
  { id: "cloud", icon: "☁️", title: "Cloud Infrastructure", description: "Arsitektur cloud skala besar dengan keandalan 99.99% uptime." },
  { id: "ai", icon: "⚡", title: "AI & Machine Learning", description: "Integrasi kecerdasan buatan untuk automasi proses bisnis." },
  { id: "cyber", icon: "🛡️", title: "Cybersecurity Audit", description: "Perlindungan aset digital komprehensif & uji penetrasi." },
  { id: "dev", icon: "💻", title: "Software Engineering", description: "Pengembangan sistem web & mobile performa tinggi." }
];

const projects: Project[] = [
  { title: "Fintech Core System", category: "Banking", desc: "Sistem transaksi mikro dengan enkripsi end-to-end." },
  { title: "HealthTech AI Platform", category: "Healthcare", desc: "Diagnosis medis berbasis AI untuk analisis gambar radiologi." },
  { title: "Global Logistics Tracking", category: "Supply Chain", desc: "Pemantauan armada kontainer real-time berbasis IoT." }
];

export default function App() {
  const [email, setEmail] = useState('');

  const handleConsultation = () => {
    alert("🚀 Tim konsultan NEXA GLOBAL TECH akan segera menghubungi Anda!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      alert(`Terima kasih! Penawaran akan dikirim ke: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="app-container">
      <div className="glow-effect"></div>

      <header>
        <div className="logo">⚡ NEXA GLOBAL TECH</div>
        <button className="btn-gradient" onClick={handleConsultation}>Konsultasi Gratis</button>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="badge">🔹 Enterprise Digital Solutions</div>
          <h1>Solusi Teknologi Scalable untuk <span>Perusahaan Modern</span></h1>
          <p>Membangun infrastruktur digital kelas dunia untuk mempercepat pertumbuhan bisnis Anda.</p>
          <button className="btn-gradient" onClick={handleConsultation}>Mulai Proyek Sekarang</button>
        </section>

        {/* STATS SECTION */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">99.99%</div>
            <div className="stat-label">Uptime Guaranteed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Enterprise Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Global Support</div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="section-container">
          <h2 className="section-title">Layanan Utama</h2>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.id} className="card">
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOUNDER / OWNER SECTION */}
        <section className="section-container">
          <div className="founder-card">
            <div className="founder-avatar">👤</div>
            <div className="founder-info">
              <span className="founder-role">Founder & CEO</span>
              <h3 className="founder-name">Maulana Rifa'i</h3>
              <p className="founder-bio">
                "Berdedikasi untuk menciptakan infrastruktur digital performa tinggi dan mendorong inovasi teknologi masa depan."
              </p>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section className="section-container">
          <h2 className="section-title">Proyek Unggulan</h2>
          <div className="portfolio-grid">
            {projects.map((p, idx) => (
              <div key={idx} className="portfolio-card">
                <span className="tag">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / CONTACT FORM */}
        <section className="cta-section">
          <h2>Siap Bertransformasi Digital?</h2>
          <p>Dapatkan analisis infrastruktur gratis dari pakar teknologi kami.</p>
          <form onSubmit={handleSubmit} className="cta-form">
            <input 
              type="email" 
              placeholder="Masukkan Email Perusahaan Anda" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-gradient">Kirim</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 NEXA GLOBAL TECH. All rights reserved.</p>
      </footer>
    </div>
  )
}

