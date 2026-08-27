export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f3f4f6', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px', borderBottom: '1px solid #1f2937' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8', margin: 0 }}>NEXA GLOBAL TECH</h2>
        <div style={{ display: 'flex', gap: '30px', fontSize: '0.95rem', color: '#9ca3af' }}>
          <span style={{ cursor: 'pointer' }}>Solutions</span>
          <span style={{ cursor: 'pointer' }}>Infrastructure</span>
          <span style={{ cursor: 'pointer' }}>Enterprise</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ background: '#0369a1', color: '#e0f2fe', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Next-Gen Cloud Architecture
        </span>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: '20px 0', lineHeight: '1.2' }}>
          Enterprise Cloud Infrastructure & Solutions
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#9ca3af', marginBottom: '40px', lineHeight: '1.6' }}>
          Empowering global enterprises with high-performance computing, secure data pipelines, and scalable cloud infrastructures.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button style={{ background: '#0ea5e9', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer' }}>
            Get Started
          </button>
          <button style={{ background: 'transparent', color: '#f3f4f6', border: '1px solid #374151', padding: '12px 28px', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer' }}>
            Documentation
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #1f2937', color: '#6b7280', fontSize: '0.85rem' }}>
        &copy; 2026 Nexa Global Tech. All rights reserved.
      </footer>
    </div>
  );
}
