from http.server import HTTPServer, BaseHTTPRequestHandler

HTML_CONTENT = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vortex Prime Cyber-Matrix OS v35.0 - Enterprise Edition with AI</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
            background: linear-gradient(135deg, #070e1c 0%, #0f172a 50%, #030712 100%); 
            color: #38bdf8; 
            font-family: 'Share Tech Mono', monospace; 
            overflow-x: hidden; 
        }
        .orbitron { font-family: 'Orbitron', sans-serif; }
        .matrix-bg {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; opacity: 0.12;
            background: radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 70%),
                        linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px);
            background-size: 100% 100%, 35px 35px;
        }
        .terminal-window {
            background: rgba(15, 23, 42, 0.95); border: 1px solid #334155;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(56, 189, 248, 0.05);
            border-radius: 12px;
        }
        .glow-text { text-shadow: 0 0 12px rgba(56, 189, 248, 0.5); }
        @keyframes floatEffect {
            0% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 12px rgba(56,189,248,0.4)); }
            50% { transform: translateY(-8px) scale(1.02); filter: drop-shadow(0 0 22px rgba(14,165,233,0.7)); }
            100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 12px rgba(56,189,248,0.4)); }
        }
        .animated-corporate-img {
            animation: floatEffect 4s ease-in-out infinite;
        }
        .ai-chat-box {
            max-height: 200px;
            overflow-y: auto;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between p-2 md:p-6 relative">
    <div class="matrix-bg"></div>
    
    <header class="relative z-10 flex flex-wrap justify-between items-center bg-[#0f172a]/95 border border-slate-700/80 px-4 py-3 rounded-lg shadow-xl mb-4 text-sm backdrop-blur-md">
        <div class="flex items-center space-x-6 text-slate-300">
            <span class="text-sky-400 font-bold tracking-wider orbitron flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span> VORTEX PRIME
            </span>
            <span onclick="runCommand('ai')" class="hover:text-sky-300 cursor-pointer transition font-bold text-cyan-400">🤖 AI Assistant</span>
            <span onclick="runCommand('about')" class="hidden md:inline hover:text-sky-300 cursor-pointer transition">About Company</span>
            <span onclick="runCommand('services')" class="hidden md:inline hover:text-sky-300 cursor-pointer transition">Enterprise Solutions</span>
            <span onclick="runCommand('portfolio')" class="hidden md:inline hover:text-sky-300 cursor-pointer transition">Global Projects</span>
            <span onclick="runCommand('contact')" class="hidden md:inline hover:text-sky-300 cursor-pointer transition">Contact Board</span>
        </div>
        <div class="flex items-center gap-3">
            <span class="px-2 py-1 bg-sky-950/80 border border-sky-700 text-sky-300 text-xs rounded">Top 1 Pro Standard</span>
            <div class="orbitron text-sky-400 font-bold tracking-wider">Maulana R's Profile</div>
        </div>
    </header>

    <!-- Tombol Navigasi Lengkap (Semua Fitur Disimpan) -->
    <div class="relative z-10 flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
        <button onclick="runCommand('ai')" class="bg-cyan-950/90 text-cyan-300 text-xs px-3 py-1.5 rounded border border-cyan-500 transition shadow-lg font-bold animate-pulse">🤖 Tanya AI Pribadi</button>
        <button onclick="runCommand('about')" class="bg-sky-950/90 text-sky-300 text-xs px-3 py-1.5 rounded border border-sky-600 transition shadow-lg">🏢 About Us</button>
        <button onclick="runCommand('services')" class="bg-teal-950/90 text-teal-300 text-xs px-3 py-1.5 rounded border border-teal-600 transition shadow-lg">💼 Services</button>
        <button onclick="runCommand('portfolio')" class="bg-blue-950/90 text-blue-300 text-xs px-3 py-1.5 rounded border border-blue-600 transition shadow-lg">📈 Portfolio</button>
        <button onclick="runCommand('contact')" class="bg-indigo-950/90 text-indigo-300 text-xs px-3 py-1.5 rounded border border-indigo-600 transition shadow-lg">📞 Contact</button>
        <button onclick="runCommand('database')" class="bg-cyan-950/90 text-cyan-300 text-xs px-3 py-1.5 rounded border border-cyan-600 transition shadow-lg">🗄️ DB Cluster</button>
        <button onclick="runCommand('fleet')" class="bg-purple-950/90 text-purple-300 text-xs px-3 py-1.5 rounded border border-purple-600 transition shadow-lg">🛸 Drone Fleet</button>
        <button onclick="runCommand('quantum')" class="bg-violet-950/90 text-violet-300 text-xs px-3 py-1.5 rounded border border-violet-600 transition shadow-lg">⚛️ Quantum Core</button>
        <button onclick="runCommand('threats')" class="bg-red-950/90 text-red-300 text-xs px-3 py-1.5 rounded border border-red-600 transition shadow-lg">⚠️ Threat Intel</button>
        <button onclick="runCommand('banking')" class="bg-emerald-950/90 text-emerald-300 text-xs px-3 py-1.5 rounded border border-emerald-600 transition shadow-lg">🛡️ Banking Security</button>
        <button onclick="runCommand('apifirst')" class="bg-amber-950/90 text-amber-300 text-xs px-3 py-1.5 rounded border border-amber-600 transition shadow-lg">⚡ API-First Arch</button>
        <button onclick="runCommand('realtime')" class="bg-rose-950/90 text-rose-300 text-xs px-3 py-1.5 rounded border border-rose-600 transition shadow-lg">📊 Real-Time Data</button>
        <button onclick="runCommand('career')" class="bg-fuchsia-950/90 text-fuchsia-300 text-xs px-3 py-1.5 rounded border border-fuchsia-600 transition shadow-lg">👔 Career System</button>
        <button onclick="runCommand('press')" class="bg-sky-900/90 text-sky-200 text-xs px-3 py-1.5 rounded border border-sky-400 transition shadow-lg">📰 Multi-Format Press</button>
    </div>

    <!-- AI Chat Box Pribadi -->
    <div class="relative z-10 max-w-6xl mx-auto w-full mb-4 bg-slate-900/95 border border-cyan-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-md">
        <div class="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
            <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
                <h3 class="text-xs md:text-sm font-bold text-cyan-300 orbitron uppercase tracking-wider">Vortex Neural AI Assistant (Pribadi)</h3>
            </div>
            <span class="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700">ONLINE</span>
        </div>
        <div id="ai-chat-log" class="ai-chat-box space-y-2 mb-3 p-2 bg-slate-950/80 rounded border border-slate-800 text-xs font-mono">
            <div class="text-cyan-300">🤖 <b>Vortex AI:</b> Halo! Saya asisten AI pribadi Anda. Silakan ketik pertanyaan tentang profil CEO Maulana Rifaii, layanan perusahaan, atau fitur lainnya di sini.</div>
        </div>
        <form onsubmit="handleAIChatSubmit(event)" class="flex gap-2">
            <input type="text" id="ai-chat-input" placeholder="Tanya AI tentang perusahaan atau CEO..." class="flex-grow bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400">
            <button type="submit" class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-1.5 rounded text-xs orbitron transition">KIRIM AI</button>
        </form>
    </div>

    <!-- Banner Atas -->
    <div class="relative z-10 max-w-6xl mx-auto w-full mb-4 overflow-hidden rounded-xl border border-sky-500/40 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div class="text-left px-2">
            <span class="text-xs uppercase tracking-widest text-sky-400 font-bold orbitron">Vortex Prime Enterprise Visualizer</span>
            <h2 class="text-lg md:text-xl font-bold text-white mt-1">Autonomous Cyber & AI Systems</h2>
            <p class="text-xs text-slate-300 mt-1">Dipimpin oleh <span class="text-sky-300 font-semibold">Maulana Rifaii</span>, menghadirkan teknologi komputasi masa depan.</p>
        </div>
        <div class="flex justify-center w-full sm:w-auto">
            <svg class="w-36 h-24 md:w-48 md:h-28 animated-corporate-img" viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="15" width="200" height="100" rx="10" fill="#0b1329" stroke="#38bdf8" stroke-width="2"/>
                <path d="M30 80 L70 50 L110 75 L150 35 L190 90" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="70" cy="50" r="5" fill="#38bdf8"/>
                <circle cx="110" cy="75" r="5" fill="#818cf8"/>
                <circle cx="150" cy="35" r="5" fill="#38bdf8"/>
                <circle cx="190" cy="90" r="5" fill="#34d399"/>
                <text x="25" y="102" fill="#94a3b8" font-size="10" font-family="monospace">SECURE ENTERPRISE LINK: ONLINE</text>
            </svg>
        </div>
    </div>

    <!-- Terminal Interaktif -->
    <main class="relative z-10 flex-grow terminal-window flex flex-col p-4 md:p-6 mb-4 max-w-6xl mx-auto w-full">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
            <div class="flex space-x-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="text-xs text-slate-400 font-mono">maulana-rifai@vortex-prime-enterprise:~</div>
        </div>
        <div id="terminal-screen" class="flex-grow overflow-y-auto space-y-3 text-sm md:text-base mb-4 max-h-[30vh] pr-2">
            <div class="text-sky-300 font-bold orbitron glow-text">Vortex Prime Cyber-Matrix OS v35.0 [Enterprise Edition]</div>
            <div class="text-slate-200">Chief Executive Architect & Founder: <span class="text-white font-bold underline">Maulana Rifaii</span></div>
            <div id="dynamic-output" class="space-y-2"></div>
        </div>
        <form id="command-form" onsubmit="handleFormSubmit(event)" class="flex items-center bg-[#070e1c]/90 border border-slate-700 rounded-lg px-3 py-2.5">
            <span class="text-sky-400 font-bold mr-2 text-lg">$</span>
            <input type="text" id="command-input" autocomplete="off" placeholder="ketik perintah (contoh: ai, about, services)..." class="w-full bg-transparent border-none outline-none text-white font-mono text-sm">
            <button type="submit" class="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-1 rounded text-xs orbitron transition">EXEC</button>
        </form>
    </main>

    <!-- Panel Visualisasi Fitur -->
    <section class="relative z-10 max-w-6xl mx-auto w-full mb-6 bg-[#0f172a]/95 border border-slate-700 rounded-xl p-4 md:p-5 shadow-2xl backdrop-blur-md">
        <div class="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
            <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-sky-400 animate-ping"></span>
                <h3 class="text-xs md:text-sm font-bold text-sky-300 orbitron uppercase tracking-wider">Live Feature Visual Display &amp; Telemetry</h3>
            </div>
            <span id="active-feature-tag" class="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700">STATUS: READY</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div id="feature-visual-box" class="h-36 rounded-lg bg-[#070e1c]/80 border border-sky-500/40 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden group shadow-inner">
                <div class="absolute inset-0 bg-gradient-to-t from-sky-950/40 to-transparent pointer-events-none"></div>
                <div id="feature-icon-display" class="text-3xl mb-2">🏢</div>
                <span id="feature-badge-title" class="text-xs font-bold text-white orbitron">VORTEX PRIME CORE</span>
                <span class="text-[10px] text-sky-400 mt-1 font-mono">Interactive Live Preview</span>
            </div>
            <div class="md:col-span-2 flex flex-col justify-center space-y-2">
                <h4 id="feature-title" class="text-base font-bold text-white orbitron">Pilih Fitur di Atas untuk Menampilkan Detail</h4>
                <p id="feature-desc" class="text-xs text-slate-300 leading-relaxed">
                    Gunakan AI Assistant pribadi atau tombol menu di atas untuk memantau telemetri dan sistem keamanan secara real-time.
                </p>
                <div class="flex items-center gap-2 pt-1">
                    <span class="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Top 1 Standard</span>
                    <span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">Secured by Maulana Rifaii</span>
                </div>
            </div>
        </div>
    </section>

    <footer class="relative z-10 text-center text-xs text-slate-400 pb-2">
        &copy; 2026 Vortex Prime Cyber-Matrix. Top 1 Enterprise Solution Built by Maulana Rifaii. All Rights Reserved.
    </footer>

    <script>
        const outputContainer = document.getElementById('dynamic-output');
        const commandInput = document.getElementById('command-input');
        const featureTitle = document.getElementById('feature-title');
        const featureDesc = document.getElementById('feature-desc');
        const featureIconDisplay = document.getElementById('feature-icon-display');
        const featureBadgeTitle = document.getElementById('feature-badge-title');
        const activeFeatureTag = document.getElementById('active-feature-tag');
        const aiChatLog = document.getElementById('ai-chat-log');
        const aiChatInput = document.getElementById('ai-chat-input');

        function updateVisualPanel(title, desc, icon, badge) {
            featureTitle.innerText = title;
            featureDesc.innerText = desc;
            featureIconDisplay.innerText = icon;
            featureBadgeTitle.innerText = badge;
            activeFeatureTag.innerText = "ACTIVE: " + badge;
            activeFeatureTag.className = "text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700";
        }

        function appendAIResponse(question, answer) {
            aiChatLog.innerHTML += `<div class="text-slate-300">👤 <b>Anda:</b> ${question}</div>`;
            aiChatLog.innerHTML += `<div class="text-cyan-300 bg-cyan-950/30 p-2 rounded border border-cyan-800/40">🤖 <b>Vortex AI:</b> ${answer}</div>`;
            aiChatLog.scrollTop = aiChatLog.scrollHeight;
        }

        function handleAIChatSubmit(e) {
            e.preventDefault();
            let q = aiChatInput.value.trim();
            if(!q) return;
            
            let qLower = q.toLowerCase();
            let ans = "Saya mencatat pertanyaan Anda mengenai sistem Vortex Prime. Silakan gunakan tombol perintah di atas atau ketik perintah terminal untuk informasi mendalam.";
            
            if(qLower.includes('maulana') || qLower.includes('ceo') || qLower.includes('siapa')) {
                ans = "Maulana Rifaii adalah Founder & Chief Executive Architect dari Vortex Prime Enterprise, pemimpin Top 1 Enterprise Solutions di bidang keamanan siber & sistem cerdas.";
            } else if(qLower.includes('ai') || qLower.includes('asisten')) {
                ans = "Saya adalah AI Assistant internal yang terintegrasi langsung dengan ekosistem Vortex Prime untuk membantu navigasi dan analisis data korporat Anda.";
            } else if(qLower.includes('layanan') || qLower.includes('service') || qLower.includes('jasa')) {
                ans = "Layanan unggulan kami meliputi Post-Quantum Cryptography, AI Neural Network, Distributed DB Cluster, Autonomous Drone Fleet, dan Banking-Grade Security.";
            } else if(qLower.includes('kontak') || qLower.includes('hubungi') || qLower.includes('email')) {
                ans = "Anda dapat menghubungi pusat kendali utama di Vortex Prime Tower atau melalui email resmi contact@vortexprime-matrix.io.";
            }
            
            appendAIResponse(q, ans);
            aiChatInput.value = '';
        }

        function runCommand(cmd) {
            let c = cmd.trim().toLowerCase();
            let res = "";
            let alertState = false;

            if (c === 'ai') {
                res = "[AI ASSISTANT ACTIVE] Neural AI siap melayani pertanyaan Anda melalui panel interaktif di atas.";
                updateVisualPanel("Vortex Neural AI Assistant", "Asisten AI pribadi yang terintegrasi penuh untuk memberikan informasi instan mengenai perusahaan, profil CEO, dan sistem teknologi korporat.", "🤖", "AI ASSISTANT");
            } else if (c === 'about') {
                res = "[COMPANY PROFILE] Vortex Prime Corp dipimpin oleh Maulana Rifaii sebagai Top 1 Enterprise Solutions dalam keamanan siber & AI.";
                updateVisualPanel("About Vortex Prime Corp", "Perusahaan teknologi terdepan yang berfokus pada keamanan siber tingkat tinggi, sistem otonom cerdas, dan arsitektur enterprise masa depan.", "🏢", "ABOUT US");
            } else if (c === 'services') {
                res = "[ENTERPRISE SERVICES] 1. Post-Quantum Cryptography 2. AI Neural Network 3. Autonomous Drone Fleet 4. NVMe Database.";
                updateVisualPanel("Enterprise Solutions & Services", "Menyediakan layanan kelas dunia mulai dari Post-Quantum Cryptography, integrasi AI Neural Network, hingga pengelolaan armada autonomous drone.", "💼", "SERVICES");
            } else if (c === 'portfolio') {
                res = "[PORTFOLIO PROJECTS] - Project Matrix-Alpha (1.4M Nodes) - Project Sky-Sentinel Drone Grid.";
                updateVisualPanel("Global Projects & Portfolio", "Rekam jejak proyek global termasuk Project Matrix-Alpha dengan 1.4 juta node aktif dan Project Sky-Sentinel untuk pertahanan sektor strategis.", "📈", "PORTFOLIO");
            } else if (c === 'contact') {
                res = "[CONTACT INFO] HQ: Vortex Prime Tower. Email: contact@vortexprime-matrix.io | CEO: Maulana Rifaii.";
                updateVisualPanel("Official Contact & Headquarters", "Hubungi pusat kendali kami di Vortex Prime Tower, Cyber District. Saluran aman tersedia 24/7 untuk mitra enterprise global.", "📞", "CONTACT BOARD");
            } else if (c === 'database') {
                res = "[DB CLUSTER] 1,420,900 Nodes Active. Synchronized successfully. Latency: 0.18ms.";
                updateVisualPanel("Distributed DB Cluster", "Sinkronisasi cluster database global berkinerja tinggi dengan kapasitas 1.4M+ node aktif dan latensi ultra-rendah 0.18ms.", "🗄️", "DB CLUSTER");
            } else if (c === 'fleet' || c === 'drone') {
                res = "[DRONE FLEET] 845 Units Deployed across 12 strategic sectors. Telemetry: Optimal.";
                updateVisualPanel("Autonomous Drone Fleet", "Pemantauan telemetri real-time dari 845 unit drone otonom yang dikerahkan di 12 sektor strategis pertahanan.", "🛸", "DRONE FLEET");
            } else if (c === 'quantum') {
                res = "[QUANTUM CORE] Post-Quantum Cryptography (PQC) Q-Bit aktif & terenkripsi penuh.";
                updateVisualPanel("Quantum Core Security", "Eksekusi enkripsi Q-Bit post-quantum untuk melindungi data korporasi dari ancaman dekripsi superkomputer masa depan.", "⚛️", "QUANTUM CORE");
            } else if (c === 'threats') {
                res = "[THREAT INTEL] Zero active cyber attacks. Automated AI countermeasures online.";
                updateVisualPanel("Global Threat Intelligence", "Sistem AI pemantau ancaman siber otonom mendeteksi nol serangan aktif dengan pertahanan proaktif otomatis.", "⚠️", "THREAT INTEL");
            } else if (c === 'banking') {
                res = "[BANKING SECURITY] Enkripsi End-to-End AES-256, Multi-Factor Authentication (MFA) Hardware Token aktif.";
                updateVisualPanel("Banking-Grade Security", "Standar keamanan perbankan tertinggi dengan enkripsi AES-256 end-to-end, hardware token MFA, dan AI fraud detection real-time.", "🛡️", "BANKING SECURE");
            } else if (c === 'apifirst') {
                res = "[API-FIRST ARCHITECTURE] RESTful & GraphQL microservices core terintegrasi dengan Swagger/OpenAPI v3.0.";
                updateVisualPanel("API-First Architecture", "Arsitektur microservices berbasis RESTful dan GraphQL yang tangguh, terdokumentasi via OpenAPI v3.0, serta dilengkapi OAuth2.", "⚡", "API-FIRST ARCH");
            } else if (c === 'realtime') {
                res = "[REAL-TIME DATA CENTER] Latensi throughput < 0.05ms, WebSocket live telemetry streaming aktif.";
                updateVisualPanel("Real-Time Data Center", "Pusat data real-time berkecepatan tinggi dengan latensi throughput di bawah 0.05ms dan streaming WebSocket live telemetry.", "📊", "REAL-TIME DATA");
            } else if (c === 'career') {
                res = "[CAREER MANAGEMENT SYSTEM] Lowongan terbuka: Lead AI Architect, Senior Security Engineer.";
                updateVisualPanel("Career Management System", "Sistem rekrutmen dan manajemen karier profesional. Bergabunglah dengan tim elit teknologi bersama para pakar industri.", "👔", "CAREER PORTAL");
            } else if (c === 'press') {
                res = "[MULTI-FORMAT PRESS ROOM] Pusat publikasi pers tersedia dalam format PDF, Markdown, JSON, dan Live RSS Feed.";
                updateVisualPanel("Multi-Format Press Room", "Ruang pers resmi perusahaan yang menyediakan siaran pers, laporan media, dan unduhan berkas dalam format PDF, Markdown, dan JSON.", "📰", "PRESS ROOM");
            } else if (c === 'help') {
                res = "Perintah tersedia: ai, about, services, portfolio, contact, database, fleet, quantum, threats, banking, apifirst, realtime, career, press, clear.";
                updateVisualPanel("Command Help Center", "Panduan lengkap daftar perintah terminal perusahaan untuk navigasi sistem secara cepat dan efisien.", "💡", "HELP CENTER");
            } else if (c === 'clear') {
                outputContainer.innerHTML = '';
                updateVisualPanel("Terminal Cleared", "Layar terminal telah dibersihkan. Sistem berjalan normal dan stabil.", "✨", "CLEARED");
                return;
            } else {
                res = `[ERROR] Perintah "${cmd}" tidak dikenal. Ketik 'help' atau tanyakan ke AI Assistant.`;
                alertState = true;
                updateVisualPanel("Command Error", `Perintah "${cmd}" tidak terdaftar di dalam sistem korporat. Periksa kembali input Anda.`, "❌", "INVALID CMD");
            }
            outputContainer.innerHTML += `<div><span class="text-slate-400">$</span> <span class="text-white">${cmd}</span></div>`;
            outputContainer.innerHTML += `<div class="${alertState ? 'text-red-400' : 'text-emerald-300'} bg-emerald-950/20 p-2 rounded border border-emerald-800/40">${res}</div>`;
            document.getElementById('terminal-screen').scrollTop = document.getElementById('terminal-screen'].scrollHeight;
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            if(commandInput.value) { 
                runCommand(commandInput.value); 
                commandInput.value = ''; 
            }
        }
    </script>
</body>
</html>
"""

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(HTML_CONTENT.encode("utf-8"))

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 5050), SimpleHTTPRequestHandler)
    print("Server running on http://localhost:5050")
    server.serve_forever()

