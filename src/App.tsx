
function App() {
  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Nexa Global Tech
        </h1>
        <p style={{ color: '#9ca3af' }}>Enterprise Cloud Infrastructure & AI Solutions</p>
      </header>

      {/* Memanggil Fitur Tingkat Dewa yang Baru Dibuat */}
      <AdvancedFeatures />
    </div>
  );
}

export default App;
