import './style.css'

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

class TechEnterpriseApp {
  private companyName: string = "NEXA GLOBAL TECH";
  private services: Service[] = [
    {
      id: "cloud",
      icon: "☁️",
      title: "Cloud Enterprise Infrastructure",
      description: "Arsitektur cloud skala besar dengan keandalan 99.99% uptime dan keamanan tingkat militer."
    },
    {
      id: "ai",
      icon: "⚡",
      title: "AI & Machine Learning Systems",
      description: "Integrasi kecerdasan buatan untuk automasi proses bisnis dan analisis data prediktif."
    },
    {
      id: "cyber",
      icon: "🛡️",
      title: "Cybersecurity & Audit",
      description: "Perlindungan aset digital komprehensif, uji penetrasi, dan manajemen risiko enterprise."
    },
    {
      id: "dev",
      icon: "💻",
      title: "Custom Software Engineering",
      description: "Pengembangan sistem web dan mobile performa tinggi dengan arsitektur mikroservis."
    }
  ];

  private stats: Stat[] = [
    { value: "99.99%", label: "Uptime Guaranteed" },
    { value: "500+", label: "Enterprise Clients" },
    { value: "24/7", label: "Global Dedicated Support" },
    { value: "<10ms", label: "Ultra Low Latency" }
  ];

  public init(): void {
    const appElement = document.querySelector<HTMLDivElement>('#app');
    if (!appElement) return;

    appElement.innerHTML = `
      <div class="glow-effect"></div>

      <header>
        <div class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          ${this.companyName}
        </div>
        <nav style="display: none; @media(min-width: 768px){display: block;}">
          <a href="#services">Layanan</a>
          <a href="#stats">Metrik</a>
          <a href="#about">Tentang Kami</a>
        </nav>
        <button class="btn-gradient" id="ctaHeader">Konsultasi Gratis</button>
      </header>

      <section class="hero">
        <div class="badge">
          <span style="display: inline-block; width: 8px; height: 8px; background: #38bdf8; border-radius: 50%;"></span>
          Generasi Terbaru Enterprise AI & Cloud
        </div>
        <h1>Solusi Teknologi Scalable untuk <span>Perusahaan Modern</span></h1>
        <p>Kami merancang dan mengeksekusi infrastruktur digital kelas tinggi untuk mempercepat transformasi bisnis Anda.</p>
        
        <div class="hero-btns">
          <button class="btn-gradient" id="heroPrimary">Mulai Proyek</button>
          <button class="btn-secondary" id="heroSecondary">Jadwalkan Demo</button>
        </div>
      </section>

      <section class="stats-grid" id="stats">
        ${this.stats.map(stat => `
          <div class="stat-card">
            <div class="stat-number">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
          </div>
        `).join('')}
      </section>

      <section class="services-section" id="services">
        <div class="section-header">
          <h2>Layanan Unggulan Enterprise</h2>
          <p style="color: var(--text-secondary); margin-top: 8px;">Dipercaya oleh pemimpin industri di seluruh dunia</p>
        </div>

        <div class="services-grid">
          ${this.services.map(service => `
            <div class="card" data-id="${service.id}">
              <div class="card-icon">${service.icon}</div>
              <h3>${service.title}</h3>
              <p>${service.description}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <footer>
        <p>© 2026 ${this.companyName}. All rights reserved. Powered by Vite & TypeScript on Termux.</p>
      </footer>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    const heroBtn = document.getElementById('heroPrimary');
    heroBtn?.addEventListener('click', () => {
      alert("🚀 Hubungi tim konsultan kami di consultation@nexaglobal.com");
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const service = this.services.find(s => s.id === id);
        if (service) {
          alert(`Layanan Dipilih: ${service.title}\n\n${service.description}`);
        }
      });
    });
  }
}

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', () => {
  const app = new TechEnterpriseApp();
  app.init();
});


