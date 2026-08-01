<!-- Dashboard Utama -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Command Center</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface-variant": "#bbc9cf",
                    "secondary-container": "#ff8a00",
                    "tertiary": "#ffd59c",
                    "surface-dim": "#10131a",
                    "primary-fixed": "#b7eaff",
                    "surface-bright": "#363940",
                    "on-tertiary": "#442b00",
                    "background": "#10131a",
                    "secondary-fixed-dim": "#ffb77f",
                    "on-secondary-fixed": "#2f1500",
                    "inverse-on-surface": "#2e3037",
                    "inverse-primary": "#00677f",
                    "on-primary-fixed-variant": "#004e60",
                    "primary-fixed-dim": "#4cd6ff",
                    "on-error-container": "#ffdad6",
                    "on-error": "#690005",
                    "outline": "#859399",
                    "surface-glass": "rgba(255, 255, 255, 0.03)",
                    "tertiary-fixed-dim": "#ffba49",
                    "on-secondary-fixed-variant": "#6f3900",
                    "error-alert": "#FF3D00",
                    "outline-variant": "#3c494e",
                    "border-glass": "rgba(255, 255, 255, 0.08)",
                    "primary-container": "#00d1ff",
                    "tertiary-container": "#feb127",
                    "surface-tint": "#4cd6ff",
                    "error": "#ffb4ab",
                    "error-container": "#93000a",
                    "secondary-fixed": "#ffdcc4",
                    "on-background": "#e1e2eb",
                    "primary": "#a4e6ff",
                    "secondary": "#ffb77f",
                    "success-glow": "#00FFC2",
                    "surface-container-highest": "#32353c",
                    "surface-variant": "#32353c",
                    "bg-obsidian": "#0B0E14",
                    "surface": "#10131a",
                    "tertiary-fixed": "#ffddb1",
                    "surface-container-low": "#191c22",
                    "on-surface": "#e1e2eb",
                    "on-primary": "#003543",
                    "on-primary-container": "#00566a",
                    "on-primary-fixed": "#001f28",
                    "on-secondary": "#4e2600",
                    "inverse-surface": "#e1e2eb",
                    "on-tertiary-fixed-variant": "#624000",
                    "surface-container-high": "#272a31",
                    "surface-container": "#1d2026",
                    "on-tertiary-fixed": "#291800",
                    "on-tertiary-container": "#6b4700",
                    "on-secondary-container": "#613100",
                    "surface-container-lowest": "#0b0e14"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "margin-mobile": "16px",
                    "unit": "4px",
                    "widget-gap": "16px",
                    "margin-desktop": "32px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "display-lg": ["Inter"],
                    "headline-md": ["Inter"],
                    "label-caps": ["JetBrains Mono"],
                    "body-base": ["Inter"],
                    "data-mono": ["JetBrains Mono"]
            },
            "fontSize": {
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}],
                    "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body { background-color: #0B0E14; overflow-x: hidden; }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .neon-glow-primary { box-shadow: 0 0 20px rgba(0, 209, 255, 0.15); }
        .neon-glow-secondary { box-shadow: 0 0 20px rgba(255, 138, 0, 0.15); }
        .data-stream-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: dash 5s linear infinite;
        }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        .scanline {
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, transparent, rgba(0, 209, 255, 0.2), transparent);
            position: absolute;
            animation: scan 4s linear infinite;
        }
        @keyframes scan { from { top: 0; } to { top: 100%; } }
    </style>
</head>
<body class="bg-bg-obsidian text-on-surface">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
<div class="flex items-center gap-8">
<span class="font-display-lg text-display-lg font-bold text-primary tracking-tighter">DATAVLOW.ID</span>
<div class="hidden md:flex gap-6 items-center">
<span class="font-body-base text-body-base text-primary font-bold border-b-2 border-primary pb-1 cursor-pointer">Dashboard</span>
<span class="font-body-base text-body-base text-on-surface-variant hover:text-primary transition-colors cursor-pointer">ID/EN</span>
</div>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center glass-panel rounded-full px-3 py-1 gap-2">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">dark_mode</span>
<div class="w-8 h-4 bg-surface-container-highest rounded-full relative">
<div class="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full"></div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-sm">translate</span>
</div>
<img class="w-10 h-10 rounded-full border border-border-glass object-cover" data-alt="A professional close-up profile portrait of a modern software engineer in a dark techwear outfit, shot with dramatic blue rim lighting in a futuristic server room environment. The image uses deep obsidian tones with electric blue highlights, consistent with a high-end software developer persona." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVwdS82a5OyQySfonjj6M_QktY3W2fk7UazQtoTlwFT-KedxDddyR-Hw0n1UiZ5MYrLDiwsb_PXs9_-RyO3pZDxKcrzvoR8wwDUOUkzaPr-WvC_eceJd1aXuNL7xSo3KJaIO-D_yHDcxehy1x0Pd1kI4UWHKLlJHVM7mE4Cd5RtfU24tnnl05N5a5uipPsNqyfnMl5X-GdOQ7enuWoEKRozCKUP2x5w7UNx2tN4z3783FwsRUXL_Sx5m63oPSboDPjFamh4MIFrbvb"/>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 hidden md:flex z-40 pt-20">
<div class="px-6 mb-8">
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary">hub</span>
</div>
<div>
<h2 class="font-label-caps text-label-caps text-primary leading-tight">DATAVLOW.ID</h2>
<p class="text-[10px] text-on-surface-variant uppercase tracking-widest">Command Center</p>
</div>
</div>
</div>
<nav class="flex-1 space-y-1">
<div class="bg-surface-glass text-primary border-l-4 border-primary px-6 py-3 flex items-center gap-4 cursor-pointer translate-x-1 duration-200">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</div>
<div class="text-on-surface-variant hover:bg-surface-glass hover:text-on-surface px-6 py-3 flex items-center gap-4 cursor-pointer transition-all">
<span class="material-symbols-outlined">router</span>
<span class="font-label-caps text-label-caps">Devices</span>
</div>
<div class="text-on-surface-variant hover:bg-surface-glass hover:text-on-surface px-6 py-3 flex items-center gap-4 cursor-pointer transition-all">
<span class="material-symbols-outlined">account_tree</span>
<span class="font-label-caps text-label-caps">Logic Builder</span>
</div>
<div class="text-on-surface-variant hover:bg-surface-glass hover:text-on-surface px-6 py-3 flex items-center gap-4 cursor-pointer transition-all">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps text-label-caps">Analytics</span>
</div>
<div class="text-on-surface-variant hover:bg-surface-glass hover:text-on-surface px-6 py-3 flex items-center gap-4 cursor-pointer transition-all">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-caps text-label-caps">Settings</span>
</div>
</nav>
<div class="px-6 mt-auto">
<button class="w-full py-3 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 neon-glow-primary hover:scale-[1.02] active:scale-95 transition-all">
<span class="material-symbols-outlined text-sm">add</span> Add Device
            </button>
<div class="mt-6 space-y-1">
<div class="text-on-surface-variant hover:text-on-surface px-2 py-2 flex items-center gap-3 cursor-pointer text-xs uppercase tracking-widest font-bold">
<span class="material-symbols-outlined text-sm">help</span> Help
                </div>
<div class="text-on-surface-variant hover:text-error px-2 py-2 flex items-center gap-3 cursor-pointer text-xs uppercase tracking-widest font-bold">
<span class="material-symbols-outlined text-sm">logout</span> Logout
                </div>
</div>
</div>
</aside>
<!-- Main Canvas -->
<main class="md:ml-64 pt-24 px-margin-desktop min-h-screen pb-12">
<!-- Header Section -->
<div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<h1 class="font-headline-md text-headline-md text-on-surface">System Overview</h1>
<div class="flex items-center gap-2 mt-1">
<span class="w-2 h-2 bg-success-glow rounded-full animate-pulse shadow-[0_0_8px_#00FFC2]"></span>
<span class="font-label-caps text-label-caps text-on-surface-variant">Live: Node Cluster 07 - Jakarta Central</span>
</div>
</div>
<div class="flex gap-4">
<div class="glass-panel px-4 py-2 rounded-lg flex flex-col items-end">
<span class="font-label-caps text-label-caps text-[10px] text-on-surface-variant uppercase">Global Uptime</span>
<span class="font-data-mono text-data-mono text-primary">99.998%</span>
</div>
<div class="glass-panel px-4 py-2 rounded-lg flex flex-col items-end">
<span class="font-label-caps text-label-caps text-[10px] text-on-surface-variant uppercase">Throughput</span>
<span class="font-data-mono text-data-mono text-secondary">2.4 TB/s</span>
</div>
</div>
</div>
<!-- Bento Grid Dashboard -->
<div class="grid grid-cols-12 gap-widget-gap">
<!-- Central Chart Widget -->
<div class="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden relative group">
<div class="p-6 border-b border-border-glass flex justify-between items-center bg-surface-glass">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-on-surface-variant cursor-move">drag_indicator</span>
<h3 class="font-label-caps text-label-caps text-on-surface">Multi-Sensor Data Flow</h3>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-2">
<span class="w-2 h-2 bg-primary rounded-full"></span>
<span class="text-[10px] font-label-caps text-on-surface-variant">Atmosphere</span>
</div>
<div class="flex items-center gap-2">
<span class="w-2 h-2 bg-secondary rounded-full"></span>
<span class="text-[10px] font-label-caps text-on-surface-variant">Voltage</span>
</div>
<span class="text-[10px] font-label-caps text-on-surface-variant/50">Updated 1s ago</span>
</div>
</div>
<div class="h-[400px] w-full p-8 relative overflow-hidden">
<div class="scanline"></div>
<!-- Custom SVG Line Chart with Animation -->
<svg class="w-full h-full" preserveaspectratio="none" viewbox="0 0 800 300">
<defs>
<lineargradient id="grad-blue" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#00d1ff" stop-opacity="0.3"></stop>
<stop offset="100%" stop-color="#00d1ff" stop-opacity="0"></stop>
</lineargradient>
<lineargradient id="grad-orange" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#ff8a00" stop-opacity="0.2"></stop>
<stop offset="100%" stop-color="#ff8a00" stop-opacity="0"></stop>
</lineargradient>
</defs>
<!-- Grid Lines -->
<g stroke="rgba(255,255,255,0.05)" stroke-width="1">
<line x1="0" x2="800" y1="50" y2="50"></line>
<line x1="0" x2="800" y1="100" y2="100"></line>
<line x1="0" x2="800" y1="150" y2="150"></line>
<line x1="0" x2="800" y1="200" y2="200"></line>
<line x1="0" x2="800" y1="250" y2="250"></line>
</g>
<!-- Area Fills -->
<path d="M0,200 L100,180 L200,220 L300,140 L400,160 L500,80 L600,120 L700,90 L800,110 L800,300 L0,300 Z" fill="url(#grad-blue)" opacity="0.5"></path>
<path d="M0,250 L150,230 L300,260 L450,190 L600,210 L800,150 L800,300 L0,300 Z" fill="url(#grad-orange)" opacity="0.3"></path>
<!-- Line Strokes -->
<path class="data-stream-path" d="M0,200 L100,180 L200,220 L300,140 L400,160 L500,80 L600,120 L700,90 L800,110" fill="none" stroke="#00d1ff" stroke-width="3"></path>
<path class="data-stream-path" d="M0,250 L150,230 L300,260 L450,190 L600,210 L800,150" fill="none" stroke="#ff8a00" stroke-dashdelay="2s" stroke-width="3"></path>
</svg>
</div>
</div>
<!-- Stats/Metrics Cards -->
<div class="col-span-12 lg:col-span-4 flex flex-col gap-widget-gap">
<div class="flex-1 glass-panel rounded-xl p-6 relative group overflow-hidden">
<div class="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
<div class="flex justify-between items-start mb-6">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">sensors</span>
</div>
<span class="font-label-caps text-[10px] text-success-glow">+14% Active</span>
</div>
<h4 class="font-label-caps text-label-caps text-on-surface-variant mb-1">Active Endpoints</h4>
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-4xl text-on-surface font-bold">12,842</span>
<span class="font-data-mono text-xs text-on-surface-variant">units</span>
</div>
</div>
<div class="flex-1 glass-panel rounded-xl p-6 relative group overflow-hidden">
<div class="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
<div class="flex justify-between items-start mb-6">
<div class="p-2 bg-secondary/10 rounded-lg">
<span class="material-symbols-outlined text-secondary">bolt</span>
</div>
<span class="font-label-caps text-[10px] text-error-alert">-2ms Latency</span>
</div>
<h4 class="font-label-caps text-label-caps text-on-surface-variant mb-1">System Latency</h4>
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-4xl text-on-surface font-bold">0.42</span>
<span class="font-data-mono text-xs text-on-surface-variant">ms</span>
</div>
</div>
</div>
<!-- Bottom Row: Logic Flow & Recent Events -->
<div class="col-span-12 md:col-span-7 glass-panel rounded-xl p-6">
<div class="flex justify-between items-center mb-6">
<h3 class="font-label-caps text-label-caps text-on-surface">Execution Log</h3>
<button class="text-[10px] font-label-caps text-primary hover:underline">View Raw Console</button>
</div>
<div class="space-y-3">
<div class="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border-l-2 border-primary group hover:bg-white/[0.04] transition-colors">
<div class="flex items-center gap-4">
<span class="font-data-mono text-[10px] text-on-surface-variant">14:20:01</span>
<span class="font-body-base text-sm text-on-surface">Node_A7 trigger high-temp warning</span>
</div>
<span class="font-label-caps text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded">AUTO-HEAL</span>
</div>
<div class="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border-l-2 border-secondary group hover:bg-white/[0.04] transition-colors">
<div class="flex items-center gap-4">
<span class="font-data-mono text-[10px] text-on-surface-variant">14:18:55</span>
<span class="font-body-base text-sm text-on-surface">Logic block 'Fuel_Cutoff' deployed</span>
</div>
<span class="font-label-caps text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded">DEPLOYED</span>
</div>
<div class="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border-l-2 border-on-surface-variant group hover:bg-white/[0.04] transition-colors">
<div class="flex items-center gap-4">
<span class="font-data-mono text-[10px] text-on-surface-variant">14:15:22</span>
<span class="font-body-base text-sm text-on-surface">Routine database heartbeat OK</span>
</div>
<span class="font-label-caps text-[10px] text-on-surface-variant/50">SYSTEM</span>
</div>
</div>
</div>
<!-- Visualization/Map Mini Widget -->
<div class="col-span-12 md:col-span-5 glass-panel rounded-xl overflow-hidden relative min-h-[300px]">
<div class="absolute inset-0 z-0">
<div class="w-full h-full object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000" data-alt="A futuristic topographical dark-mode map of a metropolitan city layout, rendered in neon blueprint style. Deep charcoal background with electric blue and orange circuit-like lines representing data flow and connectivity hubs across the grid." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD45YXhZrhzae1zBUPhSPrE5Bbm5n4cQynPC8VBF1F7rT2KBTy48GoLvREefvFiihpgnuMEH59-n5eDOZGTu08R8Ab8yfEF26YLXx_UzdRAPJl5DBYV9PiVQrGkdRX9mhQJB5crspj5CFr6uibYlvjs74L6Y8JbyC1wqqVVthQmNueFNK_-Y0-_MIRedcRA2Dhn8oiGOsLfcCJRZ0PG7vZB84kSqAPMyGSKyMix4-UYHpZdsGkoSicyFCHfzQD1Jn94obGdsgtrUeF5')"></div>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-transparent to-transparent"></div>
<div class="relative z-10 p-6 flex flex-col h-full">
<h3 class="font-label-caps text-label-caps text-on-surface mb-auto">Global Node Distribution</h3>
<div class="flex items-center justify-between">
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border border-bg-obsidian bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold">JKT</div>
<div class="w-8 h-8 rounded-full border border-bg-obsidian bg-secondary flex items-center justify-center text-[10px] text-on-secondary font-bold">SGP</div>
<div class="w-8 h-8 rounded-full border border-bg-obsidian bg-on-surface-variant flex items-center justify-center text-[10px] text-surface font-bold">+4</div>
</div>
<span class="font-label-caps text-label-caps text-primary cursor-pointer flex items-center gap-1">Expand Map <span class="material-symbols-outlined text-sm">open_in_full</span></span>
</div>
</div>
</div>
</div>
</main>
<!-- Floating Action Button -->
<button class="fixed bottom-8 right-8 w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)] z-50 hover:scale-110 active:scale-95 transition-all">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">add_circle</span>
</button>
<!-- Background Atmospheric Effect -->
<div class="fixed inset-0 -z-10 pointer-events-none">
<div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,209,255,0.03),_transparent_70%)]"></div>
<div class="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full"></div>
<div class="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full"></div>
</div>
<script>
        // Micro-interaction for widget hover glow
        document.querySelectorAll('.glass-panel').forEach(panel => {
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                panel.style.setProperty('--mouse-x', `${x}px`);
                panel.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Simulating live data update updates
        setInterval(() => {
            const uptime = document.querySelector('.text-primary.font-data-mono');
            if(uptime) {
                const current = parseFloat(uptime.innerText);
                const noise = (Math.random() - 0.5) * 0.001;
                uptime.innerText = (current + noise).toFixed(3) + "%";
            }
        }, 3000);
    </script>
</body></html>

<!-- Logic & Automation Builder -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Logic &amp; Automation Builder</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        :root {
            --primary-glow: rgba(0, 209, 255, 0.3);
            --secondary-glow: rgba(255, 138, 0, 0.3);
        }
        body {
            background-color: #0B0E14;
            color: #e1e2eb;
            overflow: hidden;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .node-active {
            box-shadow: 0 0 20px var(--primary-glow);
            border-color: #00d1ff;
        }
        .wire-svg {
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        .wire-path {
            fill: none;
            stroke-width: 2;
            stroke-dasharray: 8, 4;
            animation: flow 2s linear infinite;
        }
        @keyframes flow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
        }
        .canvas-grid {
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface-variant": "#bbc9cf",
                        "secondary-container": "#ff8a00",
                        "surface-glass": "rgba(255, 255, 255, 0.03)",
                        "border-glass": "rgba(255, 255, 255, 0.08)",
                        "primary": "#a4e6ff",
                        "primary-container": "#00d1ff",
                        "bg-obsidian": "#0B0E14",
                        "surface": "#10131a",
                        "on-surface": "#e1e2eb",
                    },
                    "fontFamily": {
                        "display-lg": ["Inter"],
                        "headline-md": ["Inter"],
                        "label-caps": ["JetBrains Mono"],
                        "body-base": ["Inter"],
                        "data-mono": ["JetBrains Mono"]
                    },
                    "fontSize": {
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500" }],
                        "body-base": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "data-mono": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
                    },
                    "spacing": {
                        "margin-mobile": "16px",
                        "margin-desktop": "32px",
                        "widget-gap": "16px",
                    }
                }
            }
        }
    </script>
</head>
<body class="font-body-base text-body-base">
<!-- TopNavBar Shell -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 backdrop-blur-xl border-b border-border-glass bg-surface-glass">
<div class="flex items-center gap-8">
<span class="font-display-lg text-primary font-bold text-display-lg">DATAVLOW.ID</span>
<div class="hidden md:flex gap-6 items-center">
<span class="text-primary font-bold border-b-2 border-primary pb-1 cursor-pointer">ID/EN</span>
</div>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:text-primary transition-colors p-2 active:scale-95 duration-100">
<span class="material-symbols-outlined">dark_mode</span>
</button>
<button class="text-on-surface-variant hover:text-primary transition-colors p-2 active:scale-95 duration-100">
<span class="material-symbols-outlined">translate</span>
</button>
<div class="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-border-glass">
<img class="w-full h-full object-cover" data-alt="A high-tech digital portrait of a cyber-punk professional avatar in a futuristic dark aesthetic. The character is illuminated by blue neon side-lighting against a deep obsidian background with subtle data-stream overlays. The style is sleek, hyper-detailed, and emphasizes a command-center professional look with cool blue and slate grey tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtrg6VA_aKlucl6d4VKIPbuRxUS6rcT15oafJrw1eNnzHVtxmEwLJnNww-N2HymwROUjQAF3GxTRmM_OMgbsJMXpOIF5-Cb1BnDuaJGV1mlpdYckWpVAt9bkXfCqUSleGXaULqujtVjgUpA4Fsc0igB8UvoU2EhSBVI7IBmN85CuhdLYo7VrPXjpaYk8abUkJitszZu53E_dYaNodXZU9Sf921JfGububBnp1sgpJKSKL4Vu3l_TKMsk07vDGu9Kc3pFXADZAIsxgm"/>
</div>
</div>
</header>
<!-- SideNavBar Shell -->
<nav class="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-40 pt-24">
<div class="px-6 mb-8">
<h2 class="font-headline-md text-primary text-headline-md">DATAVLOW.ID</h2>
<p class="font-label-caps text-on-surface-variant text-label-caps uppercase tracking-widest">Command Center</p>
</div>
<div class="flex-1 space-y-1">
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">router</span>
<span class="font-label-caps text-label-caps">Devices</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 bg-surface-glass text-primary border-l-4 border-primary translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined">account_tree</span>
<span class="font-label-caps text-label-caps">Logic Builder</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps text-label-caps">Analytics</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-caps text-label-caps">Settings</span>
</a>
</div>
<div class="px-6 mb-6">
<button class="w-full py-3 bg-primary-container text-on-primary-container font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)] active:scale-95 transition-transform">
<span class="material-symbols-outlined">add</span>
<span class="font-label-caps text-label-caps">Add Device</span>
</button>
</div>
<div class="mt-auto border-t border-border-glass pt-4">
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</nav>
<!-- Main Canvas -->
<main class="ml-64 pt-16 h-screen relative bg-bg-obsidian canvas-grid overflow-hidden">
<!-- Workflow Header / Toolbar -->
<div class="absolute top-8 left-8 right-8 flex justify-between items-center z-10 px-4 py-3 glass-panel rounded-xl">
<div class="flex items-center gap-4">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">account_tree</span>
</div>
<div>
<h1 class="text-on-surface font-semibold">Climate_Automation_v2.4</h1>
<p class="text-xs text-on-surface-variant font-label-caps uppercase tracking-tighter">Status: Live Deployment</p>
</div>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 glass-panel hover:bg-white/10 text-on-surface-variant text-sm flex items-center gap-2 rounded-lg transition-colors">
<span class="material-symbols-outlined text-sm">play_arrow</span> Run Test
                </button>
<button class="px-4 py-2 bg-primary-container text-on-primary-container text-sm font-bold flex items-center gap-2 rounded-lg hover:brightness-110 transition-all">
<span class="material-symbols-outlined text-sm">rocket_launch</span> Deploy Logic
                </button>
</div>
</div>
<!-- Node Layout -->
<div class="relative w-full h-full p-32">
<!-- Background Wires SVG -->
<svg class="wire-svg">
<!-- Wire 1: Sensor to Condition -->
<path class="wire-path stroke-primary" d="M 420 280 Q 500 280, 500 360 T 580 360" style="opacity: 0.6;"></path>
<!-- Wire 2: Condition to Actuator (True) -->
<path class="wire-path stroke-primary-container" d="M 830 360 Q 900 360, 900 250 T 970 250" style="filter: drop-shadow(0 0 5px #00d1ff);"></path>
<!-- Wire 3: Condition to Alert (False) -->
<path class="wire-path stroke-secondary-container" d="M 830 360 Q 900 360, 900 470 T 970 470" style="filter: drop-shadow(0 0 5px #ff8a00);"></path>
</svg>
<!-- Node 1: Sensor Input -->
<div class="absolute top-1/4 left-16 w-64 glass-panel rounded-xl overflow-hidden node-active group transition-all duration-300 hover:-translate-y-1">
<div class="p-3 border-b border-border-glass flex justify-between items-center bg-white/5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-lg">thermostat</span>
<span class="font-label-caps text-xs">SENSOR_IN</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-sm cursor-grab">drag_indicator</span>
</div>
<div class="p-4 space-y-3">
<div>
<p class="text-[10px] text-on-surface-variant font-label-caps mb-1 uppercase">Source Device</p>
<p class="text-sm font-data-mono text-primary">DHT22_SERVER_ROOM</p>
</div>
<div class="flex justify-between items-end">
<div>
<p class="text-[10px] text-on-surface-variant font-label-caps mb-1 uppercase">Live Data</p>
<p class="text-2xl font-data-mono text-white">24.8°C</p>
</div>
<div class="w-12 h-6 bg-primary/20 rounded flex items-center justify-center">
<div class="w-1 h-3 bg-primary rounded-full animate-pulse mx-0.5"></div>
<div class="w-1 h-4 bg-primary rounded-full animate-pulse mx-0.5" style="animation-delay: 0.2s"></div>
<div class="w-1 h-2 bg-primary rounded-full animate-pulse mx-0.5" style="animation-delay: 0.4s"></div>
</div>
</div>
</div>
<div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full translate-x-1.5 border-2 border-bg-obsidian"></div>
</div>
<!-- Node 2: Logic Block (IF/THEN) -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 glass-panel rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 border-primary/40 shadow-xl">
<div class="p-3 border-b border-border-glass flex justify-between items-center bg-white/5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-container text-lg">alt_route</span>
<span class="font-label-caps text-xs">LOGIC_FLOW</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-sm cursor-grab">drag_indicator</span>
</div>
<div class="p-4 bg-black/40">
<div class="bg-surface-dim p-2 rounded border border-border-glass mb-3">
<p class="text-[10px] font-label-caps text-on-surface-variant mb-1 uppercase">Expression</p>
<p class="text-xs font-data-mono"><span class="text-secondary">IF</span> temp &gt; 25.0</p>
</div>
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between text-[10px] font-label-caps text-on-surface-variant">
<span>RESULT: TRUE</span>
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
</div>
<div class="flex items-center justify-between text-[10px] font-label-caps text-on-surface-variant">
<span>RESULT: FALSE</span>
<span class="w-2 h-2 rounded-full bg-secondary-container"></span>
</div>
</div>
</div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-on-surface-variant rounded-full -translate-x-1.5 border-2 border-bg-obsidian"></div>
<div class="absolute right-0 top-1/4 -translate-y-1/2 w-3 h-3 bg-primary-container rounded-full translate-x-1.5 border-2 border-bg-obsidian"></div>
<div class="absolute right-0 bottom-1/4 translate-y-1/2 w-3 h-3 bg-secondary-container rounded-full translate-x-1.5 border-2 border-bg-obsidian"></div>
</div>
<!-- Node 3: Actuator Output -->
<div class="absolute top-1/4 right-16 w-64 glass-panel rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1">
<div class="p-3 border-b border-border-glass flex justify-between items-center bg-white/5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary-container text-lg">fax</span>
<span class="font-label-caps text-xs">ACTUATOR_OUT</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-sm cursor-grab">drag_indicator</span>
</div>
<div class="p-4 space-y-3">
<div>
<p class="text-[10px] text-on-surface-variant font-label-caps mb-1 uppercase">Target Device</p>
<p class="text-sm font-data-mono text-primary-container">AC_UNIT_04</p>
</div>
<div class="flex items-center gap-3">
<div class="p-2 bg-primary-container/20 rounded-lg">
<span class="material-symbols-outlined text-primary-container animate-spin" style="animation-duration: 3s">mode_fan</span>
</div>
<div>
<p class="text-[10px] text-on-surface-variant font-label-caps uppercase">Action</p>
<p class="text-sm font-bold text-white">SET_POWER(MAX)</p>
</div>
</div>
</div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-container rounded-full -translate-x-1.5 border-2 border-bg-obsidian"></div>
</div>
<!-- Node 4: Alert System -->
<div class="absolute bottom-1/4 right-16 w-64 glass-panel rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1">
<div class="p-3 border-b border-border-glass flex justify-between items-center bg-white/5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-container text-lg">notification_important</span>
<span class="font-label-caps text-xs">NOTIFY_SVC</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-sm cursor-grab">drag_indicator</span>
</div>
<div class="p-4">
<div class="flex items-center gap-3 mb-3">
<div class="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary-container text-sm">mail</span>
</div>
<p class="text-xs text-on-surface">Admin SMS Alert</p>
</div>
<div class="bg-black/20 p-2 rounded text-[10px] font-data-mono text-on-surface-variant">
                        Payload: "Temp threshold normal. Monitoring..."
                    </div>
</div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary-container rounded-full -translate-x-1.5 border-2 border-bg-obsidian"></div>
</div>
</div>
<!-- Utility Panel (Right) -->
<aside class="fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 glass-panel border-l border-border-glass z-20 flex flex-col">
<div class="p-6 border-b border-border-glass">
<h3 class="font-headline-md text-on-surface text-lg">Library</h3>
<div class="mt-4 flex gap-2">
<button class="flex-1 py-1.5 bg-primary/10 text-primary text-[10px] font-label-caps border border-primary/20 rounded uppercase">Blocks</button>
<button class="flex-1 py-1.5 hover:bg-white/5 text-on-surface-variant text-[10px] font-label-caps rounded uppercase transition-colors">History</button>
</div>
</div>
<div class="flex-1 overflow-y-auto p-4 space-y-4">
<!-- Search -->
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input class="w-full bg-surface-dim border border-border-glass rounded-lg pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-colors" placeholder="Search blocks..." type="text"/>
</div>
<!-- Group: Sensors -->
<div>
<p class="text-[10px] font-label-caps text-on-surface-variant uppercase mb-2 ml-1">Input / Sensors</p>
<div class="space-y-2">
<div class="p-3 rounded-lg border border-border-glass bg-white/5 flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-all group">
<span class="material-symbols-outlined text-primary">sensors</span>
<span class="text-sm font-medium">Smart Sensor</span>
<span class="material-symbols-outlined text-on-surface-variant text-sm ml-auto opacity-0 group-hover:opacity-100 transition-opacity">add</span>
</div>
<div class="p-3 rounded-lg border border-border-glass bg-white/5 flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-all group">
<span class="material-symbols-outlined text-primary">schedule</span>
<span class="text-sm font-medium">Timer / CRON</span>
<span class="material-symbols-outlined text-on-surface-variant text-sm ml-auto opacity-0 group-hover:opacity-100 transition-opacity">add</span>
</div>
</div>
</div>
<!-- Group: Logic -->
<div>
<p class="text-[10px] font-label-caps text-on-surface-variant uppercase mb-2 ml-1">Logic / Control</p>
<div class="space-y-2">
<div class="p-3 rounded-lg border border-border-glass bg-white/5 flex items-center gap-3 cursor-pointer hover:border-secondary-container transition-all group">
<span class="material-symbols-outlined text-secondary-container">call_split</span>
<span class="text-sm font-medium">Condition (IF)</span>
</div>
<div class="p-3 rounded-lg border border-border-glass bg-white/5 flex items-center gap-3 cursor-pointer hover:border-secondary-container transition-all group">
<span class="material-symbols-outlined text-secondary-container">loop</span>
<span class="text-sm font-medium">Loop Block</span>
</div>
</div>
</div>
<!-- Group: Outputs -->
<div>
<p class="text-[10px] font-label-caps text-on-surface-variant uppercase mb-2 ml-1">Output / Actions</p>
<div class="space-y-2">
<div class="p-3 rounded-lg border border-border-glass bg-white/5 flex items-center gap-3 cursor-pointer hover:border-primary-container transition-all group">
<span class="material-symbols-outlined text-primary-container">send</span>
<span class="text-sm font-medium">HTTP Webhook</span>
</div>
<div class="p-3 rounded-lg border border-border-glass bg-white/5 flex items-center gap-3 cursor-pointer hover:border-primary-container transition-all group">
<span class="material-symbols-outlined text-primary-container">bolt</span>
<span class="text-sm font-medium">Switch State</span>
</div>
</div>
</div>
</div>
<!-- Footer Stats -->
<div class="p-4 bg-black/40 border-t border-border-glass">
<div class="flex justify-between items-center mb-2">
<span class="text-[10px] font-label-caps text-on-surface-variant">System Load</span>
<span class="text-[10px] font-data-mono text-primary">12%</span>
</div>
<div class="w-full bg-white/10 h-1 rounded-full overflow-hidden">
<div class="w-1/4 h-full bg-primary shadow-[0_0_8px_#00d1ff]"></div>
</div>
</div>
</aside>
<!-- Floating FAB -->
<button class="fixed bottom-8 right-80 w-14 h-14 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shadow-[0_0_20px_rgba(0,209,255,0.5)] z-30 active:scale-90 transition-transform">
<span class="material-symbols-outlined scale-125" style="font-variation-settings: 'FILL' 1;">add</span>
</button>
<!-- Dynamic Visualization (Overlay) -->
<div class="absolute bottom-8 left-8 flex items-end gap-4 pointer-events-none">
<div class="glass-panel p-4 rounded-xl w-64 h-32 flex flex-col justify-end">
<div class="flex items-baseline gap-2 mb-2">
<span class="text-2xl font-bold font-data-mono text-white">402</span>
<span class="text-[10px] font-label-caps text-on-surface-variant">Ops / Sec</span>
</div>
<div class="flex items-end gap-1 h-12">
<div class="w-2 bg-primary/20 rounded-t h-1/2 animate-pulse"></div>
<div class="w-2 bg-primary/40 rounded-t h-3/4 animate-pulse" style="animation-delay: 0.1s"></div>
<div class="w-2 bg-primary rounded-t h-full animate-pulse" style="animation-delay: 0.2s"></div>
<div class="w-2 bg-primary/60 rounded-t h-2/3 animate-pulse" style="animation-delay: 0.3s"></div>
<div class="w-2 bg-primary/30 rounded-t h-1/3 animate-pulse" style="animation-delay: 0.4s"></div>
<div class="w-2 bg-primary/80 rounded-t h-5/6 animate-pulse" style="animation-delay: 0.5s"></div>
<div class="w-2 bg-primary/40 rounded-t h-1/2 animate-pulse" style="animation-delay: 0.6s"></div>
</div>
</div>
<div class="glass-panel p-3 rounded-xl flex items-center gap-4">
<div class="w-3 h-3 rounded-full bg-success-glow animate-ping"></div>
<span class="text-xs font-label-caps uppercase tracking-widest text-on-surface">Data Integrity: Verified</span>
</div>
</div>
</main>
<!-- Micro-interaction Script -->
<script>
        document.querySelectorAll('.glass-panel').forEach(panel => {
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                panel.style.setProperty('--mouse-x', `${x}px`);
                panel.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        // Simulating interactive wires - simple SVG update logic could go here
    </script>
</body></html>

<!-- Device Management -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Device &amp; Connectivity Management</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface-variant": "#bbc9cf",
                    "secondary-container": "#ff8a00",
                    "tertiary": "#ffd59c",
                    "surface-dim": "#10131a",
                    "primary-fixed": "#b7eaff",
                    "surface-bright": "#363940",
                    "on-tertiary": "#442b00",
                    "background": "#10131a",
                    "secondary-fixed-dim": "#ffb77f",
                    "on-secondary-fixed": "#2f1500",
                    "inverse-on-surface": "#2e3037",
                    "inverse-primary": "#00677f",
                    "on-primary-fixed-variant": "#004e60",
                    "primary-fixed-dim": "#4cd6ff",
                    "on-error-container": "#ffdad6",
                    "on-error": "#690005",
                    "outline": "#859399",
                    "surface-glass": "rgba(255, 255, 255, 0.03)",
                    "tertiary-fixed-dim": "#ffba49",
                    "on-secondary-fixed-variant": "#6f3900",
                    "error-alert": "#FF3D00",
                    "outline-variant": "#3c494e",
                    "border-glass": "rgba(255, 255, 255, 0.08)",
                    "primary-container": "#00d1ff",
                    "tertiary-container": "#feb127",
                    "surface-tint": "#4cd6ff",
                    "error": "#ffb4ab",
                    "error-container": "#93000a",
                    "secondary-fixed": "#ffdcc4",
                    "on-background": "#e1e2eb",
                    "primary": "#a4e6ff",
                    "secondary": "#ffb77f",
                    "success-glow": "#00FFC2",
                    "surface-container-highest": "#32353c",
                    "surface-variant": "#32353c",
                    "bg-obsidian": "#0B0E14",
                    "surface": "#10131a",
                    "tertiary-fixed": "#ffddb1",
                    "surface-container-low": "#191c22",
                    "on-surface": "#e1e2eb",
                    "on-primary": "#003543",
                    "on-primary-container": "#00566a",
                    "on-primary-fixed": "#001f28",
                    "on-secondary": "#4e2600",
                    "inverse-surface": "#e1e2eb",
                    "on-tertiary-fixed-variant": "#624000",
                    "surface-container-high": "#272a31",
                    "surface-container": "#1d2026",
                    "on-tertiary-fixed": "#291800",
                    "on-tertiary-container": "#6b4700",
                    "on-secondary-container": "#613100",
                    "surface-container-lowest": "#0b0e14"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "margin-mobile": "16px",
                    "unit": "4px",
                    "widget-gap": "16px",
                    "margin-desktop": "32px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "display-lg": ["Inter"],
                    "headline-md": ["Inter"],
                    "label-caps": ["JetBrains Mono"],
                    "body-base": ["Inter"],
                    "data-mono": ["JetBrains Mono"]
            },
            "fontSize": {
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}],
                    "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #0B0E14;
            color: #e1e2eb;
            overflow-x: hidden;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .status-glow-online {
            box-shadow: 0 0 15px rgba(0, 209, 255, 0.3);
            border-color: rgba(0, 209, 255, 0.4);
        }
        .fab-glow {
            box-shadow: 0 0 20px rgba(255, 138, 0, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .node-wire {
            stroke-dasharray: 8;
            animation: dash 10s linear infinite;
        }
        @keyframes dash {
            to {
                stroke-dashoffset: -100;
            }
        }
    </style>
</head>
<body class="font-body-base text-body-base bg-bg-obsidian">
<!-- Side Navigation Bar -->
<aside class="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-50 hidden md:flex">
<div class="px-6 mb-10">
<h1 class="font-headline-md text-headline-md text-primary tracking-tighter">DATAVLOW.ID</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant opacity-60 uppercase">Command Center</p>
</div>
<nav class="flex-1 px-4 space-y-2">
<!-- Navigation Items Mapping -->
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
<span class="font-label-caps text-label-caps uppercase">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 bg-surface-glass text-primary border-l-4 border-primary rounded-r-lg group" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">router</span>
<span class="font-label-caps text-label-caps uppercase">Devices</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined">account_tree</span>
<span class="font-label-caps text-label-caps uppercase">Logic Builder</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps text-label-caps uppercase">Analytics</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-caps text-label-caps uppercase">Settings</span>
</a>
</nav>
<div class="px-4 mt-auto space-y-2 border-t border-border-glass pt-6">
<a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined text-[20px]">help</span>
<span class="font-label-caps text-label-caps uppercase text-[11px]">Help</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors" href="#">
<span class="material-symbols-outlined text-[20px]">logout</span>
<span class="font-label-caps text-label-caps uppercase text-[11px]">Logout</span>
</a>
</div>
</aside>
<!-- Top Navigation Bar -->
<header class="fixed top-0 w-full z-40 flex justify-between items-center px-margin-desktop h-16 backdrop-blur-xl border-b border-border-glass bg-surface-glass md:pl-72">
<div class="flex items-center gap-6">
<div class="flex items-center bg-bg-obsidian/50 rounded-full px-4 py-1.5 border border-border-glass focus-within:border-primary transition-colors">
<span class="material-symbols-outlined text-on-surface-variant text-sm">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm text-on-surface ml-2 w-48" placeholder="Search nodes..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
<span class="font-label-caps text-label-caps">ID/EN</span>
</button>
<span class="w-px h-4 bg-border-glass"></span>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">dark_mode</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">translate</button>
<div class="w-8 h-8 rounded-full border border-primary/30 overflow-hidden ml-2 bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A professional user profile portrait in a futuristic cyberpunk style, illuminated by sharp blue rim lighting against a dark obsidian background. The character has a sleek, tech-focused appearance with high-resolution details, representing a high-level system administrator for an advanced data network. The aesthetic is clean, premium, and authoritative." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ibsP3ioA-yKULGzu16R-wZTuNeI9Jh0Jx1Aca0Jd4xd_5xioFgqVvozaO2tA2TiL3XUZuizjvb_-MNJBj14i-aKLbTCTNl5lAjHTak6dqgqyLHr1jo6jHSXzpx0Kl2lY8dtGW33bebJ11S6VQasKBDsqMTB3QIMlHrncRRyTY19mUO2DFo_WlM3e5AssGyGdjIxN18dku3bINPfrSgfseFJcJ5SKu337JAXj7tQSVXoYMoKLcENwXX12x4AUaCBzVCBx6nOLgw83"/>
</div>
</div>
</header>
<!-- Main Canvas -->
<main class="pt-24 pb-32 px-6 md:pl-72 md:pr-12 min-h-screen relative">
<!-- Header Info -->
<div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 class="font-display-lg text-display-lg text-primary mb-2">Device Control</h2>
<div class="flex items-center gap-3">
<span class="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-label-caps text-[10px]">
<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        SYSTEM LIVE
                    </span>
<span class="text-on-surface-variant font-label-caps text-label-caps">34 ACTIVE NODES</span>
</div>
</div>
<div class="flex gap-3">
<button class="px-6 py-2 glass-card rounded-lg font-label-caps text-label-caps hover:bg-surface-bright transition-colors uppercase">Export Logs</button>
<button class="px-6 py-2 bg-primary-container text-on-primary-container font-label-caps text-label-caps rounded-lg hover:brightness-110 transition-all uppercase font-bold">Sync Devices</button>
</div>
</div>
<!-- Bento Grid for Quick Stats -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-widget-gap mb-10">
<div class="glass-card p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl">router</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">NETWORK UPTIME</p>
<h3 class="text-3xl font-bold text-primary">99.98%</h3>
<p class="text-success-glow text-[10px] font-label-caps mt-2">▲ 0.02% FROM PREV HOUR</p>
</div>
<div class="glass-card p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl">bolt</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">LATENCY (AVG)</p>
<h3 class="text-3xl font-bold text-primary">12ms</h3>
<p class="text-on-surface-variant text-[10px] font-label-caps mt-2">STABLE CONNECTION</p>
</div>
<div class="glass-card p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl">dataset</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-1">DATA THROUGHPUT</p>
<h3 class="text-3xl font-bold text-primary">4.2 GB/s</h3>
<p class="text-error-alert text-[10px] font-label-caps mt-2">▼ 0.5% LOAD SHEDDING</p>
</div>
<div class="glass-card p-6 rounded-xl border-primary/20 bg-primary/5">
<p class="font-label-caps text-label-caps text-primary mb-1">SYSTEM STATUS</p>
<h3 class="text-3xl font-bold text-on-surface uppercase tracking-tight">Healthy</h3>
<div class="mt-4 flex gap-1 h-1">
<div class="flex-1 bg-primary rounded-full"></div>
<div class="flex-1 bg-primary rounded-full"></div>
<div class="flex-1 bg-primary rounded-full"></div>
<div class="flex-1 bg-primary/20 rounded-full"></div>
</div>
</div>
</div>
<!-- Devices Grid -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-widget-gap mb-10">
<!-- Device Card 1 -->
<div class="glass-card p-6 rounded-xl status-glow-online relative">
<div class="flex justify-between items-start mb-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-border-glass">
<span class="material-symbols-outlined text-primary">memory</span>
</div>
<div>
<h4 class="font-bold">Alpha-Node-01</h4>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase">Core Router</p>
</div>
</div>
<div class="px-2 py-1 bg-primary/10 rounded border border-primary/20 text-[10px] font-bold text-primary">ONLINE</div>
</div>
<div class="space-y-3 mb-6">
<div class="flex justify-between text-sm">
<span class="text-on-surface-variant">CPU Load</span>
<span class="font-data-mono text-data-mono">24%</span>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[24%]"></div>
</div>
<div class="flex justify-between text-sm">
<span class="text-on-surface-variant">Temp</span>
<span class="font-data-mono text-data-mono">42°C</span>
</div>
</div>
<div class="pt-4 border-t border-border-glass flex justify-between items-center">
<span class="font-label-caps text-[10px] text-on-surface-variant">ID: VLW-990-21</span>
<button class="text-primary hover:underline text-sm font-medium">Configure</button>
</div>
</div>
<!-- Device Card 2 -->
<div class="glass-card p-6 rounded-xl status-glow-online relative">
<div class="flex justify-between items-start mb-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-border-glass">
<span class="material-symbols-outlined text-primary">sensors</span>
</div>
<div>
<h4 class="font-bold">Enviro-Sensor-X</h4>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase">I/O Peripheral</p>
</div>
</div>
<div class="px-2 py-1 bg-primary/10 rounded border border-primary/20 text-[10px] font-bold text-primary">ONLINE</div>
</div>
<div class="space-y-3 mb-6">
<div class="flex justify-between text-sm">
<span class="text-on-surface-variant">Battery</span>
<span class="font-data-mono text-data-mono">88%</span>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[88%]"></div>
</div>
<div class="flex justify-between text-sm">
<span class="text-on-surface-variant">Signal</span>
<span class="font-data-mono text-data-mono">-65 dBm</span>
</div>
</div>
<div class="pt-4 border-t border-border-glass flex justify-between items-center">
<span class="font-label-caps text-[10px] text-on-surface-variant">ID: VLW-004-98</span>
<button class="text-primary hover:underline text-sm font-medium">Configure</button>
</div>
</div>
<!-- Device Card 3 - Offline -->
<div class="glass-card p-6 rounded-xl border-error/20 bg-error/5 opacity-80 relative">
<div class="flex justify-between items-start mb-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-border-glass">
<span class="material-symbols-outlined text-error">wifi_off</span>
</div>
<div>
<h4 class="font-bold text-on-surface/60">Gateway-Primary</h4>
<p class="font-label-caps text-[10px] text-on-surface-variant uppercase">Network Edge</p>
</div>
</div>
<div class="px-2 py-1 bg-error/10 rounded border border-error/20 text-[10px] font-bold text-error">OFFLINE</div>
</div>
<div class="py-4 text-center">
<p class="text-error font-medium text-sm">Last Seen: 2 hours ago</p>
<button class="mt-4 px-4 py-2 bg-error/20 text-error rounded-lg text-sm border border-error/30 hover:bg-error/30 transition-colors">Re-ping Device</button>
</div>
<div class="pt-4 border-t border-border-glass/10 flex justify-between items-center mt-2">
<span class="font-label-caps text-[10px] text-on-surface-variant">ID: VLW-221-X0</span>
<button class="text-on-surface-variant hover:underline text-sm font-medium">Log Details</button>
</div>
</div>
</div>
<!-- Data Connectivity Table -->
<div class="glass-card rounded-xl overflow-hidden mb-10">
<div class="px-6 py-4 border-b border-border-glass flex justify-between items-center bg-white/5">
<h3 class="font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-xl">list_alt</span>
                    Recent Connectivity Logs
                </h3>
<div class="flex items-center gap-4">
<select class="bg-bg-obsidian border-border-glass rounded text-[10px] font-label-caps text-on-surface-variant focus:ring-primary focus:border-primary">
<option>ALL DEVICES</option>
<option>ONLINE ONLY</option>
</select>
<button class="material-symbols-outlined text-on-surface-variant hover:text-white">refresh</button>
</div>
</div>
<div class="overflow-x-auto custom-scrollbar">
<table class="w-full text-left">
<thead class="bg-white/2">
<tr class="border-b border-border-glass">
<th class="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Timestamp</th>
<th class="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Source Node</th>
<th class="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Action</th>
<th class="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Duration</th>
<th class="px-6 py-4 font-label-caps text-[11px] text-on-surface-variant uppercase">Status</th>
<th class="px-6 py-4"></th>
</tr>
</thead>
<tbody class="divide-y divide-border-glass">
<tr class="hover:bg-primary/5 group transition-colors">
<td class="px-6 py-4 font-data-mono text-data-mono text-on-surface-variant">2023-11-24 14:22:01</td>
<td class="px-6 py-4 font-bold border-l-2 border-transparent group-hover:border-primary">Alpha-Node-01</td>
<td class="px-6 py-4">Data Packet Push (JSON)</td>
<td class="px-6 py-4 text-on-surface-variant">2.4ms</td>
<td class="px-6 py-4">
<span class="text-success-glow font-bold text-xs">SUCCESS</span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>
<tr class="bg-white/2 hover:bg-primary/5 group transition-colors">
<td class="px-6 py-4 font-data-mono text-data-mono text-on-surface-variant">2023-11-24 14:21:55</td>
<td class="px-6 py-4 font-bold border-l-2 border-transparent group-hover:border-primary">Enviro-Sensor-X</td>
<td class="px-6 py-4">Firmware Check</td>
<td class="px-6 py-4 text-on-surface-variant">45.0ms</td>
<td class="px-6 py-4">
<span class="text-success-glow font-bold text-xs">SUCCESS</span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>
<tr class="hover:bg-primary/5 group transition-colors">
<td class="px-6 py-4 font-data-mono text-data-mono text-on-surface-variant">2023-11-24 14:20:12</td>
<td class="px-6 py-4 font-bold border-l-2 border-transparent group-hover:border-primary">Beta-Unit-09</td>
<td class="px-6 py-4">Handshake Request</td>
<td class="px-6 py-4 text-on-surface-variant">--</td>
<td class="px-6 py-4">
<span class="text-error-alert font-bold text-xs">TIMEOUT</span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>
<tr class="bg-white/2 hover:bg-primary/5 group transition-colors">
<td class="px-6 py-4 font-data-mono text-data-mono text-on-surface-variant">2023-11-24 14:18:44</td>
<td class="px-6 py-4 font-bold border-l-2 border-transparent group-hover:border-primary">Alpha-Node-01</td>
<td class="px-6 py-4">Config Sync</td>
<td class="px-6 py-4 text-on-surface-variant">8.9ms</td>
<td class="px-6 py-4">
<span class="text-success-glow font-bold text-xs">SUCCESS</span>
</td>
<td class="px-6 py-4 text-right">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>
</tbody>
</table>
</div>
<div class="px-6 py-3 border-t border-border-glass bg-white/2 flex items-center justify-center">
<button class="text-on-surface-variant font-label-caps text-[11px] hover:text-primary tracking-widest uppercase transition-colors">Load more entries</button>
</div>
</div>
<!-- System Architecture Abstract View -->
<div class="glass-card rounded-xl p-8 h-80 relative overflow-hidden mb-10">
<div class="absolute inset-0 opacity-20 pointer-events-none">
<svg fill="none" height="100%" preserveaspectratio="xMidYMid slice" viewbox="0 0 800 400" width="100%" xmlns="http://www.w3.org/2000/svg">
<circle class="node-pulse" cx="100" cy="200" r="40" stroke="#00d1ff" stroke-width="2"></circle>
<circle cx="400" cy="100" r="30" stroke="#00d1ff" stroke-width="2"></circle>
<circle cx="400" cy="300" r="30" stroke="#00d1ff" stroke-width="2"></circle>
<circle cx="700" cy="200" r="40" stroke="#00d1ff" stroke-width="2"></circle>
<path class="node-wire" d="M140 200 H370" stroke="#00d1ff" stroke-width="2"></path>
<path class="node-wire" d="M430 100 Q550 100 660 200" stroke="#00d1ff" stroke-width="2"></path>
<path class="node-wire" d="M430 300 Q550 300 660 200" stroke="#00d1ff" stroke-width="2"></path>
</svg>
</div>
<div class="relative z-10">
<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Network Topology</h3>
<p class="text-on-surface-variant max-w-md">Live visualization of your IoT ecosystem. All data nodes are currently synchronizing with the central Command Center.</p>
<div class="mt-8 flex gap-6">
<div class="flex items-center gap-2">
<span class="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_#a4e6ff]"></span>
<span class="font-label-caps text-label-caps">HUB ACTIVE</span>
</div>
<div class="flex items-center gap-2">
<span class="w-3 h-3 rounded-full bg-border-glass"></span>
<span class="font-label-caps text-label-caps">STANDBY</span>
</div>
</div>
</div>
<button class="absolute bottom-8 right-8 px-4 py-2 glass-card rounded-lg border-primary/40 text-primary text-sm font-bold flex items-center gap-2 hover:bg-primary/10 transition-all">
<span class="material-symbols-outlined">zoom_in</span>
                EXPAND VIEW
            </button>
</div>
</main>
<!-- Floating Action Button -->
<button class="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center fab-glow hover:scale-110 active:scale-95 transition-all z-50 group">
<span class="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
<!-- Tooltip -->
<span class="absolute right-20 bg-bg-obsidian border border-border-glass text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
            ADD NEW DEVICE
        </span>
</button>
<!-- Bottom Navigation Bar (Mobile only) -->
<nav class="md:hidden fixed bottom-0 w-full h-16 bg-surface-container border-t border-border-glass flex justify-around items-center px-4 z-50 backdrop-blur-xl">
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">dashboard</span>
</button>
<button class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">router</span>
</button>
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">account_tree</span>
</button>
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">analytics</span>
</button>
<button class="flex flex-col items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined">settings</span>
</button>
</nav>
<script>
        // Micro-interactions and simple status simulation
        document.addEventListener('DOMContentLoaded', () => {
            // Background interactive glow effect (subtle)
            const main = document.querySelector('main');
            main.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                main.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 209, 255, 0.03) 0%, transparent 50%)`;
            });

            // Simulate periodic "online" pulse for devices
            const onlineBadges = document.querySelectorAll('.status-glow-online');
            setInterval(() => {
                onlineBadges.forEach(badge => {
                    badge.classList.add('brightness-125');
                    setTimeout(() => badge.classList.remove('brightness-125'), 100);
                });
            }, 5000);
        });
    </script>
</body></html>

<!-- Analytics Ledger & Reports -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Analytics Ledger</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary-fixed": "#ffdcc4",
                        "surface-tint": "#4cd6ff",
                        "tertiary": "#ffd59c",
                        "primary-fixed": "#b7eaff",
                        "inverse-primary": "#00677f",
                        "border-glass": "rgba(255, 255, 255, 0.08)",
                        "on-tertiary-container": "#6b4700",
                        "error-alert": "#FF3D00",
                        "inverse-surface": "#e1e2eb",
                        "on-secondary-fixed": "#2f1500",
                        "tertiary-fixed": "#ffddb1",
                        "on-primary": "#003543",
                        "on-primary-container": "#00566a",
                        "on-secondary": "#4e2600",
                        "on-background": "#e1e2eb",
                        "primary": "#a4e6ff",
                        "bg-obsidian": "#0B0E14",
                        "error-container": "#93000a",
                        "background": "#10131a",
                        "on-surface-variant": "#bbc9cf",
                        "on-surface": "#e1e2eb",
                        "success-glow": "#00FFC2",
                        "surface-container-high": "#272a31",
                        "inverse-on-surface": "#2e3037",
                        "on-tertiary": "#442b00",
                        "surface-glass": "rgba(255, 255, 255, 0.03)",
                        "on-error-container": "#ffdad6",
                        "on-secondary-container": "#613100",
                        "surface-variant": "#32353c",
                        "surface-container-lowest": "#0b0e14",
                        "surface-container-low": "#191c22",
                        "on-tertiary-fixed": "#291800",
                        "secondary-container": "#ff8a00",
                        "outline": "#859399",
                        "on-primary-fixed": "#001f28",
                        "surface-container-highest": "#32353c",
                        "on-primary-fixed-variant": "#004e60",
                        "surface": "#10131a",
                        "on-tertiary-fixed-variant": "#624000",
                        "on-error": "#690005",
                        "tertiary-fixed-dim": "#ffba49",
                        "outline-variant": "#3c494e",
                        "surface-dim": "#10131a",
                        "secondary-fixed-dim": "#ffb77f",
                        "on-secondary-fixed-variant": "#6f3900",
                        "primary-fixed-dim": "#4cd6ff",
                        "surface-container": "#1d2026",
                        "tertiary-container": "#feb127",
                        "error": "#ffb4ab",
                        "surface-bright": "#363940",
                        "secondary": "#ffb77f",
                        "primary-container": "#00d1ff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "margin-desktop": "32px",
                        "widget-gap": "16px",
                        "unit": "4px",
                        "margin-mobile": "16px"
                    },
                    "fontFamily": {
                        "headline-md": ["Inter"],
                        "data-mono": ["JetBrains Mono"],
                        "body-base": ["Inter"],
                        "display-lg": ["Inter"],
                        "label-caps": ["JetBrains Mono"]
                    },
                    "fontSize": {
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #0B0E14;
            color: #e1e2eb;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }

        .glass-widget {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .light-mode-preview .glass-widget {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            color: #10131a;
        }

        .light-mode-preview {
            background-color: #f8fafc !important;
            color: #1e293b !important;
        }

        @keyframes staggerFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .stagger-item {
            animation: staggerFadeIn 0.5s ease forwards;
            opacity: 0;
        }

        .holographic-glow {
            box-shadow: 0 0 20px rgba(255, 138, 0, 0.3);
            border: 1px solid rgba(255, 138, 0, 0.4);
        }

        .radial-progress {
            background: conic-gradient(from 0deg, #ff8a00 0%, #feb127 75%, transparent 75%);
            border-radius: 50%;
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }

        .active-nav-border {
            border-left-width: 4px;
        }
    </style>
</head>
<body class="dark transition-colors duration-500" id="main-body">
<!-- Sidebar Navigation Shell -->
<nav class="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-50">
<div class="px-6 mb-10">
<h1 class="font-headline-md text-headline-md text-primary tracking-tight">DATAVLOW.ID</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant mt-1">Command Center</p>
</div>
<div class="flex-1 space-y-2 px-4">
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-glass transition-all duration-200" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-caps text-label-caps uppercase">Dashboard</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-glass transition-all duration-200" href="#">
<span class="material-symbols-outlined">router</span>
<span class="font-label-caps text-label-caps uppercase">Devices</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-glass transition-all duration-200" href="#">
<span class="material-symbols-outlined">account_tree</span>
<span class="font-label-caps text-label-caps uppercase">Logic Builder</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg bg-surface-glass text-primary border-l-4 border-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps text-label-caps uppercase">Analytics</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-glass transition-all duration-200" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-caps text-label-caps uppercase">Settings</span>
</a>
</div>
<div class="mt-auto px-4 space-y-2">
<button class="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps py-3 rounded-xl mb-6 hover:scale-95 transition-transform duration-100 flex items-center justify-center gap-2">
<span class="material-symbols-outlined">add</span>
                Add Device
            </button>
<a class="flex items-center space-x-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center space-x-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</nav>
<!-- Top App Bar -->
<header class="fixed top-0 left-64 right-0 h-16 flex justify-between items-center px-margin-desktop bg-surface-glass backdrop-blur-xl border-b border-border-glass z-40">
<div class="flex items-center gap-8">
<h2 class="font-body-base text-body-base text-primary font-bold border-b-2 border-primary pb-1">Analytics Ledger</h2>
<div class="flex items-center bg-surface-container-low px-4 py-1.5 rounded-full border border-border-glass">
<span class="material-symbols-outlined text-on-surface-variant mr-2 scale-75">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface" placeholder="Filter history..." type="text"/>
</div>
</div>
<div class="flex items-center space-x-6">
<div class="flex items-center gap-2">
<button class="p-2 rounded-full hover:bg-surface-glass text-on-surface-variant transition-colors" id="theme-toggle" onclick="toggleTheme()">
<span class="material-symbols-outlined">light_mode</span>
</button>
<button class="p-2 rounded-full hover:bg-surface-glass text-on-surface-variant transition-colors">
<span class="material-symbols-outlined">translate</span>
</button>
</div>
<div class="flex items-center gap-3 pl-6 border-l border-border-glass">
<div class="text-right">
<p class="font-label-caps text-label-caps text-on-surface">ID / EN</p>
<p class="text-[10px] text-on-surface-variant uppercase tracking-widest">Active Region</p>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border border-primary">
<img class="w-full h-full object-cover" data-alt="A professional portrait of a senior tech executive with a neutral expression, set against a dark, minimalist industrial background with subtle blue rim lighting to match the IoT command center theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyvYuLqKJi8m7JyDiGx-7hoNf4MpuM-vI4qMJgpl4bDCQzyvmJdlW-wmMWrobUbiBhSwxsSXbhl58u6nWtq61v84fvS4WcLKBtoLic8JJMjAm-hjdqFQ3Js9QMSSe0FDb6ztTNM_i8U8VDc5N6qyjOfxem0OPHDKz1Xw4WZPBJx5FntdARqSwBoaw82UO37W3P-Coxev-auDzvScmdOdzGTaEp-NEJyVX1tGEXxSYnEPFCpIk-s6aMpMwVSwt5Jx7dyakA87nWpzws"/>
</div>
</div>
</div>
</header>
<!-- Main Canvas Content -->
<main class="ml-64 pt-24 pb-12 px-margin-desktop min-h-screen">
<!-- Dashboard Hero Section -->
<div class="grid grid-cols-12 gap-widget-gap mb-widget-gap">
<!-- Summary Card -->
<div class="col-span-8 glass-widget p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group">
<div class="absolute -right-20 -top-20 w-64 h-64 bg-primary opacity-5 blur-[120px] rounded-full group-hover:opacity-10 transition-opacity"></div>
<div class="relative z-10">
<div class="flex justify-between items-start mb-6">
<div>
<span class="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-2 block">Executive Overview</span>
<h3 class="font-display-lg text-display-lg">IoT Ecosystem Health</h3>
</div>
<div class="flex gap-2">
<span class="bg-success-glow/10 text-success-glow px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-success-glow/20">Operational</span>
<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-primary/20">99.8% Uptime</span>
</div>
</div>
<div class="flex items-end gap-12">
<div class="flex flex-col">
<span class="font-data-mono text-data-mono text-on-surface-variant mb-1">Active Nodes</span>
<span class="text-4xl font-bold font-headline-md">1,429</span>
</div>
<div class="flex flex-col">
<span class="font-data-mono text-data-mono text-on-surface-variant mb-1">Data Throughput</span>
<span class="text-4xl font-bold font-headline-md">12.4 <span class="text-lg font-normal text-on-surface-variant">GB/s</span></span>
</div>
<div class="flex flex-col">
<span class="font-data-mono text-data-mono text-on-surface-variant mb-1">Critical Alerts</span>
<span class="text-4xl font-bold font-headline-md text-error-alert">02</span>
</div>
</div>
</div>
<div class="mt-8 flex gap-4">
<button class="bg-primary text-on-primary-fixed px-6 py-2.5 rounded-lg font-label-caps text-label-caps flex items-center gap-2 hover:brightness-110 transition-all">
<span class="material-symbols-outlined text-sm">download</span>
                        Export Master Ledger
                    </button>
<button class="border border-border-glass text-on-surface px-6 py-2.5 rounded-lg font-label-caps text-label-caps hover:bg-surface-glass transition-all">
                        View Audit Trail
                    </button>
</div>
</div>
<!-- Radial Breakdown Widget -->
<div class="col-span-4 glass-widget p-8 rounded-xl flex flex-col items-center justify-center text-center">
<span class="font-label-caps text-label-caps text-on-surface-variant mb-6 uppercase tracking-widest">Protocol Distribution</span>
<div class="relative w-40 h-40 flex items-center justify-center mb-6">
<div class="absolute inset-0 radial-progress holographic-glow opacity-60"></div>
<div class="absolute inset-3 bg-bg-obsidian rounded-full flex flex-col items-center justify-center border border-border-glass">
<span class="text-2xl font-bold text-secondary">75%</span>
<span class="text-[10px] text-on-surface-variant uppercase">MQTT v5</span>
</div>
</div>
<div class="grid grid-cols-2 gap-4 w-full">
<div class="text-left border-l-2 border-secondary pl-3">
<p class="text-[10px] text-on-surface-variant uppercase">Secure</p>
<p class="font-data-mono text-sm">842 Nodes</p>
</div>
<div class="text-left border-l-2 border-primary pl-3">
<p class="text-[10px] text-on-surface-variant uppercase">Legacy</p>
<p class="font-data-mono text-sm">587 Nodes</p>
</div>
</div>
</div>
</div>
<!-- Analytics Grid -->
<div class="grid grid-cols-12 gap-widget-gap mb-widget-gap">
<!-- Holographic Chart 1 -->
<div class="col-span-4 glass-widget p-6 rounded-xl relative group">
<div class="flex justify-between items-center mb-6">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Network Latency (ms)</span>
<span class="material-symbols-outlined text-secondary scale-75">show_chart</span>
</div>
<div class="h-32 w-full flex items-end justify-between gap-1 mb-4">
<!-- Fake Bars -->
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 45%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 60%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 30%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 80%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 55%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 90%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 40%;"></div>
<div class="bg-secondary/40 w-full h-1/2 rounded-t hover:bg-secondary transition-all" style="height: 65%;"></div>
</div>
<div class="flex justify-between text-[10px] font-data-mono text-on-surface-variant">
<span>00:00</span>
<span>12:00</span>
<span>23:59</span>
</div>
</div>
<!-- Holographic Chart 2 -->
<div class="col-span-4 glass-widget p-6 rounded-xl relative group">
<div class="flex justify-between items-center mb-6">
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase">Memory Saturation</span>
<span class="material-symbols-outlined text-primary scale-75">memory</span>
</div>
<div class="h-32 w-full flex items-end justify-between gap-2 mb-4 px-4">
<div class="relative w-full h-full flex flex-col justify-center items-center">
<svg class="w-full h-full" viewbox="0 0 100 50">
<path class="opacity-50" d="M0,50 Q25,10 50,40 T100,20" fill="none" stroke="#a4e6ff" stroke-width="2"></path>
<circle cx="50" cy="40" fill="#a4e6ff" r="3"></circle>
</svg>
</div>
</div>
<div class="flex justify-between items-center text-[10px] font-data-mono text-on-surface-variant">
<span>AVG 4.2GB</span>
<span class="text-primary">+1.2% VS L/W</span>
</div>
</div>
<!-- Report Exporter Widget -->
<div class="col-span-4 glass-widget p-6 rounded-xl border-l-4 border-secondary">
<h4 class="font-label-caps text-label-caps text-on-surface mb-4">Export Reports</h4>
<div class="space-y-3">
<label class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-border-glass cursor-pointer hover:bg-surface-variant transition-colors group">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary">description</span>
<span class="text-sm">JSON Raw Ledger</span>
</div>
<input checked="" class="rounded border-border-glass text-secondary focus:ring-secondary bg-transparent" type="checkbox"/>
</label>
<label class="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-border-glass cursor-pointer hover:bg-surface-variant transition-colors group">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary">analytics</span>
<span class="text-sm">Executive Summary (PDF)</span>
</div>
<input class="rounded border-border-glass text-secondary focus:ring-secondary bg-transparent" type="checkbox"/>
</label>
<button class="w-full py-2.5 bg-secondary text-on-secondary font-bold font-label-caps text-label-caps rounded-lg mt-2 shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
                        Generate Advanced Report
                    </button>
</div>
</div>
</div>
<!-- Data Ledger Table -->
<div class="glass-widget rounded-xl overflow-hidden">
<div class="px-8 py-6 border-b border-border-glass flex justify-between items-center">
<h3 class="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">History Ledger — Node Activity</h3>
<div class="flex gap-4">
<button class="text-xs text-on-surface-variant flex items-center gap-1 hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">filter_list</span>
                        Filter
                    </button>
<button class="text-xs text-on-surface-variant flex items-center gap-1 hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">sort</span>
                        Sort By Date
                    </button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest border-b border-border-glass">
<th class="px-8 py-4 font-medium">Timestamp</th>
<th class="px-8 py-4 font-medium">Node ID</th>
<th class="px-8 py-4 font-medium">Event Type</th>
<th class="px-8 py-4 font-medium">Payload Density</th>
<th class="px-8 py-4 font-medium">Protocol</th>
<th class="px-8 py-4 font-medium text-right">Status</th>
</tr>
</thead>
<tbody id="ledger-body">
<!-- Staggered rows generated via Script -->
</tbody>
</table>
</div>
<div class="px-8 py-4 bg-surface-container-lowest border-t border-border-glass flex justify-between items-center">
<span class="text-xs text-on-surface-variant">Showing 50 of 12,402 entries</span>
<div class="flex gap-2">
<button class="p-1.5 rounded bg-surface-variant hover:bg-primary transition-colors text-on-surface-variant hover:text-on-primary">
<span class="material-symbols-outlined scale-75">chevron_left</span>
</button>
<button class="p-1.5 rounded bg-surface-variant hover:bg-primary transition-colors text-on-surface-variant hover:text-on-primary">
<span class="material-symbols-outlined scale-75">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
<!-- Floating Action Button -->
<button class="fixed bottom-margin-desktop right-margin-desktop w-16 h-16 rounded-full bg-secondary text-on-secondary shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
<span class="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">bolt</span>
<div class="absolute -top-12 right-0 bg-secondary text-on-secondary text-[10px] font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            DEPLOY LOGIC
        </div>
</button>
<script>
        // Generate mock table rows with staggered animations
        const ledgerBody = document.getElementById('ledger-body');
        const rows = [
            { id: 'NODE-7821', event: 'Sensor Calibration', density: '4.2 KB', protocol: 'MQTT/TLS', status: 'SUCCESS', color: 'text-success-glow', time: '14:22:01' },
            { id: 'NODE-9012', event: 'Heartbeat Packet', density: '0.8 KB', protocol: 'CoAP', status: 'SUCCESS', color: 'text-success-glow', time: '14:21:55' },
            { id: 'NODE-3321', event: 'Firmware Update', density: '128 MB', protocol: 'HTTPS', status: 'PENDING', color: 'text-secondary', time: '14:21:30' },
            { id: 'NODE-1102', event: 'Memory Overflow', density: '0.0 KB', protocol: 'MQTT/TLS', status: 'CRITICAL', color: 'text-error-alert', time: '14:21:02' },
            { id: 'NODE-5561', event: 'Handshake Initiated', density: '1.2 KB', protocol: 'AMQP', status: 'SUCCESS', color: 'text-success-glow', time: '14:20:45' },
            { id: 'NODE-2290', event: 'Data Uplink', density: '22.4 KB', protocol: 'MQTT/TLS', status: 'SUCCESS', color: 'text-success-glow', time: '14:20:12' },
            { id: 'NODE-8811', event: 'Auth Failure', density: '0.2 KB', protocol: 'MQTT/TLS', status: 'WARNING', color: 'text-tertiary-container', time: '14:19:58' }
        ];

        rows.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.className = `stagger-item group border-b border-border-glass hover:bg-surface-glass transition-colors cursor-pointer`;
            tr.style.animationDelay = `${index * 0.08}s`;
            tr.innerHTML = `
                <td class="px-8 py-5 font-data-mono text-xs text-on-surface-variant">2023.10.24 — ${row.time}</td>
                <td class="px-8 py-5 font-bold text-sm text-primary group-hover:translate-x-1 transition-transform inline-block">${row.id}</td>
                <td class="px-8 py-5 text-sm">${row.event}</td>
                <td class="px-8 py-5 font-data-mono text-xs text-on-surface-variant">${row.density}</td>
                <td class="px-8 py-5">
                    <span class="text-[10px] px-2 py-0.5 rounded bg-surface-variant border border-border-glass">${row.protocol}</span>
                </td>
                <td class="px-8 py-5 text-right font-label-caps text-[10px] font-bold ${row.color}">${row.status}</td>
            `;
            ledgerBody.appendChild(tr);
        });

        // Toggle Theme logic
        function toggleTheme() {
            const body = document.getElementById('main-body');
            const icon = document.querySelector('#theme-toggle span');
            
            if (body.classList.contains('light-mode-preview')) {
                body.classList.remove('light-mode-preview');
                body.classList.add('dark');
                icon.innerText = 'light_mode';
            } else {
                body.classList.add('light-mode-preview');
                body.classList.remove('dark');
                icon.innerText = 'dark_mode';
            }
        }
    </script>
</body></html>

<!-- Automation & Neural Logic Canvas -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Neural Logic Canvas</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        :root {
            --primary-glow: rgba(0, 209, 255, 0.3);
            --orange-glow: rgba(255, 138, 0, 0.3);
        }

        body {
            background-color: #0B0E14;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
        }

        .glass-node {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .glass-node:hover {
            transform: scale(1.02);
            border-color: rgba(164, 230, 255, 0.4);
            box-shadow: 0 0 20px var(--primary-glow);
        }

        .node-connector {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #10131a;
            border: 2px solid rgba(255, 255, 255, 0.2);
            cursor: crosshair;
            transition: all 0.2s ease;
        }

        .node-connector:hover {
            transform: scale(1.4);
            background: #a4e6ff;
            box-shadow: 0 0 10px #a4e6ff;
        }

        .bezier-cable {
            position: absolute;
            pointer-events: none;
            stroke-width: 2;
            fill: none;
            stroke: url(#cable-gradient);
            filter: drop-shadow(0 0 4px rgba(0, 209, 255, 0.5));
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease forwards;
        }

        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }

        .magnetic-btn {
            transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .canvas-grid {
            background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 32px 32px;
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
    </style>
<!-- Tailwind Config Verbatim -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed": "#ffdcc4",
                    "surface-tint": "#4cd6ff",
                    "tertiary": "#ffd59c",
                    "primary-fixed": "#b7eaff",
                    "inverse-primary": "#00677f",
                    "border-glass": "rgba(255, 255, 255, 0.08)",
                    "on-tertiary-container": "#6b4700",
                    "error-alert": "#FF3D00",
                    "inverse-surface": "#e1e2eb",
                    "on-secondary-fixed": "#2f1500",
                    "tertiary-fixed": "#ffddb1",
                    "on-primary": "#003543",
                    "on-primary-container": "#00566a",
                    "on-secondary": "#4e2600",
                    "on-background": "#e1e2eb",
                    "primary": "#a4e6ff",
                    "bg-obsidian": "#0B0E14",
                    "error-container": "#93000a",
                    "background": "#10131a",
                    "on-surface-variant": "#bbc9cf",
                    "on-surface": "#e1e2eb",
                    "success-glow": "#00FFC2",
                    "surface-container-high": "#272a31",
                    "inverse-on-surface": "#2e3037",
                    "on-tertiary": "#442b00",
                    "surface-glass": "rgba(255, 255, 255, 0.03)",
                    "on-error-container": "#ffdad6",
                    "on-secondary-container": "#613100",
                    "surface-variant": "#32353c",
                    "surface-container-lowest": "#0b0e14",
                    "surface-container-low": "#191c22",
                    "on-tertiary-fixed": "#291800",
                    "secondary-container": "#ff8a00",
                    "outline": "#859399",
                    "on-primary-fixed": "#001f28",
                    "surface-container-highest": "#32353c",
                    "on-primary-fixed-variant": "#004e60",
                    "surface": "#10131a",
                    "on-tertiary-fixed-variant": "#624000",
                    "on-error": "#690005",
                    "tertiary-fixed-dim": "#ffba49",
                    "outline-variant": "#3c494e",
                    "surface-dim": "#10131a",
                    "secondary-fixed-dim": "#ffb77f",
                    "on-secondary-fixed-variant": "#6f3900",
                    "primary-fixed-dim": "#4cd6ff",
                    "surface-container": "#1d2026",
                    "tertiary-container": "#feb127",
                    "error": "#ffb4ab",
                    "surface-bright": "#363940",
                    "secondary": "#ffb77f",
                    "primary-container": "#00d1ff"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "gutter": "24px",
                    "margin-desktop": "32px",
                    "widget-gap": "16px",
                    "unit": "4px",
                    "margin-mobile": "16px"
            },
            "fontFamily": {
                    "headline-md": ["Inter"],
                    "data-mono": ["JetBrains Mono"],
                    "body-base": ["Inter"],
                    "display-lg": ["Inter"],
                    "label-caps": ["JetBrains Mono"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}]
            }
          },
        },
      }
    </script>
</head>
<body class="bg-bg-obsidian text-on-surface font-body-base overflow-hidden">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
<div class="flex items-center gap-8">
<h1 class="font-display-lg text-headline-md font-bold text-primary tracking-tight">DATAVLOW.ID</h1>
<nav class="hidden md:flex items-center gap-6">
<span class="text-on-surface-variant font-label-caps text-label-caps cursor-pointer hover:text-primary transition-colors">Workspace</span>
<span class="text-primary font-bold border-b-2 border-primary pb-1 font-label-caps text-label-caps cursor-pointer">Logic Builder</span>
<span class="text-on-surface-variant font-label-caps text-label-caps cursor-pointer hover:text-primary transition-colors">Deployments</span>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center bg-surface-container rounded-full px-3 py-1 border border-border-glass gap-2">
<span class="text-primary font-bold text-label-caps">ID</span>
<div class="w-px h-3 bg-border-glass"></div>
<span class="text-on-surface-variant text-label-caps">EN</span>
</div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" data-icon="dark_mode">dark_mode</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" data-icon="translate">translate</button>
<div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center border border-primary/20 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A futuristic professional user profile avatar in a minimalist tech aesthetic, subtle neon blue highlights on dark clothing, high-end professional lighting, digital portrait style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFGJXP6j-0r7Oey-ZWRhnLttcJsUF1PGb1YPudLqpbjkCgKJxvHmZIBOemZDHEvWbAF2ptgQeZaoInNtSakHYo1LIcrVOAmHLGsq3-pAvCMThgXC96bivhhuxwU_7hKieTSY8ctI7cCxldaclIvPT2NtjjPfDdgXmbTRjr5Jx6xM5Ltll2V3NOxLMOb5kBYJ6FqdMw82V2eWlCVC0L0IWMMdBs6cqJchgWCq02LsAhxxgM6Y7ME4Uy22CI0W1OE1ZK-QgtqbtpyI4f"/>
</div>
</div>
</header>
<!-- SideNavBar (Navigation Shell) -->
<aside class="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-40 pt-20">
<div class="px-6 mb-8">
<div class="flex items-center gap-3 mb-1">
<div class="w-2 h-2 rounded-full bg-success-glow shadow-[0_0_8px_rgba(0,255,194,0.6)]"></div>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Neural System Active</span>
</div>
<h2 class="font-headline-md text-headline-md text-primary">Command Center</h2>
</div>
<nav class="flex-1 px-4 space-y-1">
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-glass rounded-lg transition-all group" href="#">
<span class="material-symbols-outlined group-hover:text-primary" data-icon="dashboard">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-glass rounded-lg transition-all group" href="#">
<span class="material-symbols-outlined group-hover:text-primary" data-icon="router">router</span>
<span class="font-label-caps text-label-caps">Devices</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 bg-surface-glass text-primary border-l-4 border-primary rounded-r-lg transition-all" href="#">
<span class="material-symbols-outlined" data-icon="account_tree" style="font-variation-settings: 'FILL' 1;">account_tree</span>
<span class="font-label-caps text-label-caps">Logic Builder</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-glass rounded-lg transition-all group" href="#">
<span class="material-symbols-outlined group-hover:text-primary" data-icon="analytics">analytics</span>
<span class="font-label-caps text-label-caps">Analytics</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-glass rounded-lg transition-all group" href="#">
<span class="material-symbols-outlined group-hover:text-primary" data-icon="settings">settings</span>
<span class="font-label-caps text-label-caps">Settings</span>
</a>
</nav>
<div class="px-4 mt-auto space-y-1">
<button class="w-full mb-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,209,255,0.2)] hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] transition-all active:scale-95">
<span class="material-symbols-outlined" data-icon="add">add</span>
<span>Add Device</span>
</button>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-glass rounded-lg transition-all" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-glass rounded-lg transition-all" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</aside>
<!-- Main Canvas Area -->
<main class="ml-64 pt-16 h-full relative overflow-hidden">
<!-- Neural Logic Grid Background -->
<!-- STITCH_SHADER_START:ANIMATION_8 class="absolute inset-0 w-full h-full opacity-40" -->
<div class="absolute inset-0 w-full h-full opacity-40" style="display:block;">
<canvas id="shader-canvas-ANIMATION_8" style="display:block;width:100%;height:100%"></canvas>
<script>
(function() {
  const canvas = document.getElementById('shader-canvas-ANIMATION_8');

  // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
  // This fires on initial layout and whenever the element is resized.
  function syncSize() {
    const w = canvas.clientWidth  || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
    }
  }
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
  const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 m = u_mouse / u_resolution;
    
    // Grid effect
    vec2 grid = fract(uv * 40.0);
    float line = smoothstep(0.0, 0.03, grid.x) * smoothstep(1.0, 0.97, grid.x) *
                 smoothstep(0.0, 0.03, grid.y) * smoothstep(1.0, 0.97, grid.y);
                 
    // Mouse glow
    float dist = distance(uv, m);
    float glow = smoothstep(0.2, 0.0, dist) * 0.4;
    
    // Background color
    vec3 color = vec3(0.04, 0.05, 0.08); // Onyx
    
    // Add grid and glow
    color += (1.0 - line) * vec3(0.0, 0.9, 1.0) * 0.05;
    color += glow * vec3(0.0, 0.9, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}`;
  function cs(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  // u_mouse is in pixel coordinates matching u_resolution (ShaderToy convention).
  // Shaders that need normalized coords should use: u_mouse / u_resolution.
  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = 1.0 - (event.clientY - rect.top) / rect.height;
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    }
  });

  function render(t) {
    if (typeof ResizeObserver === 'undefined') syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  render(0);
})();
</script>
</div>
<!-- STITCH_SHADER_END:ANIMATION_8 -->
<!-- Canvas Grid Overlay -->
<div class="absolute inset-0 canvas-grid pointer-events-none opacity-20"></div>
<!-- Logic Builder UI Layer -->
<div class="relative w-full h-full p-8 overflow-auto cursor-grab active:cursor-grabbing" id="logic-canvas">
<!-- SVG Layer for Bezier Cables -->
<svg class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
<defs>
<lineargradient id="cable-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" stop-color="#a4e6ff"></stop>
<stop offset="100%" stop-color="#ff8a00"></stop>
</lineargradient>
</defs>
<!-- Static paths for demonstration -->
<path class="bezier-cable" d="M 320 200 C 450 200, 450 350, 580 350"></path>
<path class="bezier-cable" d="M 320 240 C 450 240, 450 500, 580 520"></path>
<path class="bezier-cable" d="M 820 350 C 900 350, 900 450, 1000 450"></path>
</svg>
<!-- Node 1: Input Sensor -->
<div class="glass-node absolute top-[120px] left-[100px] w-64 rounded-xl p-4 z-10" style="left: 100px; top: 120px;">
<div class="flex justify-between items-start mb-4">
<div class="flex flex-col">
<span class="text-label-caps font-label-caps text-primary/70 uppercase tracking-tighter">Input Source</span>
<h3 class="text-body-base font-bold">Temperature Hub</h3>
</div>
<span class="material-symbols-outlined text-primary" data-icon="drag_indicator">drag_indicator</span>
</div>
<div class="space-y-3 mb-4">
<div class="flex justify-between items-center text-data-mono font-data-mono text-xs">
<span class="text-on-surface-variant">Status</span>
<span class="text-success-glow">STREAMING</span>
</div>
<div class="h-12 bg-black/40 rounded-lg flex items-end p-2 gap-1">
<div class="w-full bg-primary/40 h-[40%]" style="animation: pulse 2s infinite ease-in-out 0.1s"></div>
<div class="w-full bg-primary/40 h-[70%]" style="animation: pulse 2s infinite ease-in-out 0.3s"></div>
<div class="w-full bg-primary/40 h-[50%]" style="animation: pulse 2s infinite ease-in-out 0.5s"></div>
<div class="w-full bg-primary/40 h-[90%]" style="animation: pulse 2s infinite ease-in-out 0.7s"></div>
</div>
</div>
<div class="flex justify-end -mr-6">
<div class="node-connector border-primary shadow-[0_0_8px_rgba(0,209,255,0.4)]"></div>
</div>
</div>
<!-- Node 2: Logic Block -->
<div class="glass-node absolute top-[280px] left-[550px] w-72 rounded-xl p-4 z-10 border-tertiary-container/20">
<div class="flex justify-between items-start mb-4">
<div class="flex flex-col">
<span class="text-label-caps font-label-caps text-tertiary uppercase tracking-tighter">Conditioner</span>
<h3 class="text-body-base font-bold">Neural Threshold</h3>
</div>
<div class="flex gap-1">
<span class="material-symbols-outlined text-on-surface-variant scale-75" data-icon="tune">tune</span>
<span class="material-symbols-outlined text-on-surface-variant scale-75" data-icon="close">close</span>
</div>
</div>
<div class="p-3 bg-surface-container-low rounded-lg border border-border-glass space-y-4">
<div class="flex flex-col gap-1">
<div class="flex justify-between text-xs font-label-caps">
<span class="text-on-surface-variant">Sensitivity</span>
<span class="text-primary">84%</span>
</div>
<div class="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
<div class="w-[84%] h-full bg-primary shadow-[0_0_8px_#a4e6ff]"></div>
</div>
</div>
<div class="flex items-center justify-between">
<span class="text-xs font-data-mono text-on-surface-variant">Trigger: &gt; 24°C</span>
<div class="w-8 h-4 bg-primary-container/20 rounded-full relative border border-primary/30">
<div class="absolute right-0.5 top-0.5 w-2.5 h-2.5 bg-primary rounded-full"></div>
</div>
</div>
</div>
<div class="flex justify-between -mx-6 mt-4">
<div class="node-connector"></div>
<div class="node-connector border-tertiary-container shadow-[0_0_8px_rgba(254,177,39,0.4)]"></div>
</div>
</div>
<!-- Node 3: Output Action -->
<div class="glass-node absolute top-[400px] left-[980px] w-64 rounded-xl p-4 z-10 border-error-container/20">
<div class="flex justify-between items-start mb-4">
<div class="flex flex-col">
<span class="text-label-caps font-label-caps text-secondary uppercase tracking-tighter">Action</span>
<h3 class="text-body-base font-bold">HVAC Override</h3>
</div>
<span class="material-symbols-outlined text-on-surface-variant" data-icon="bolt">bolt</span>
</div>
<div class="space-y-3">
<div class="p-2 border border-border-glass rounded bg-error-container/10 flex items-center gap-3">
<span class="material-symbols-outlined text-error" data-icon="notification_important">notification_important</span>
<span class="text-xs text-on-surface-variant">Critical Alert Sequence</span>
</div>
<button class="w-full py-2 bg-secondary/10 border border-secondary/30 text-secondary font-label-caps text-xs rounded hover:bg-secondary/20 transition-all">
                        VIEW PROTOCOL
                    </button>
</div>
<div class="flex justify-start -ml-6 mt-2">
<div class="node-connector border-secondary"></div>
</div>
</div>
</div>
<!-- Right Side Panel: Components Library -->
<aside class="absolute right-8 top-8 bottom-8 w-80 glass-node rounded-2xl z-20 flex flex-col overflow-hidden border-border-glass shadow-2xl">
<div class="p-6 border-b border-border-glass bg-surface-container-high/50">
<h3 class="text-headline-md text-primary font-bold mb-1">Library</h3>
<p class="text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">Neural Logic Components</p>
<div class="mt-4 relative">
<input class="w-full bg-bg-obsidian border border-border-glass rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary outline-none transition-all" placeholder="Search components..." type="text"/>
<span class="material-symbols-outlined absolute left-3 top-2 text-on-surface-variant text-sm" data-icon="search">search</span>
</div>
</div>
<div class="flex-1 overflow-y-auto p-4 space-y-6">
<!-- Group 1 -->
<div>
<h4 class="text-label-caps text-[10px] text-primary/60 mb-3 ml-2 font-bold uppercase tracking-[2px]">Core Sensors</h4>
<div class="space-y-2">
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-border-glass cursor-pointer transition-all group">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
<span class="material-symbols-outlined" data-icon="thermostat">thermostat</span>
</div>
<div class="flex-1">
<p class="text-sm font-bold">Temperature</p>
<p class="text-[10px] text-on-surface-variant">Ambient thermal sensor</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="add">add</span>
</div>
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-border-glass cursor-pointer transition-all group">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
<span class="material-symbols-outlined" data-icon="humidity_percentage">humidity_percentage</span>
</div>
<div class="flex-1">
<p class="text-sm font-bold">Humidity</p>
<p class="text-[10px] text-on-surface-variant">Vapor pressure analysis</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="add">add</span>
</div>
</div>
</div>
<!-- Group 2 -->
<div>
<h4 class="text-label-caps text-[10px] text-tertiary/60 mb-3 ml-2 font-bold uppercase tracking-[2px]">Neural Logic</h4>
<div class="space-y-2">
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-border-glass cursor-pointer transition-all group">
<div class="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20">
<span class="material-symbols-outlined" data-icon="psychology">psychology</span>
</div>
<div class="flex-1">
<p class="text-sm font-bold">AI Threshold</p>
<p class="text-[10px] text-on-surface-variant">Deep-learning inference</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="add">add</span>
</div>
</div>
</div>
<!-- Group 3 -->
<div>
<h4 class="text-label-caps text-[10px] text-secondary/60 mb-3 ml-2 font-bold uppercase tracking-[2px]">Actions</h4>
<div class="space-y-2">
<div class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-border-glass cursor-pointer transition-all group">
<div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
<span class="material-symbols-outlined" data-icon="webhook">webhook</span>
</div>
<div class="flex-1">
<p class="text-sm font-bold">Webhook</p>
<p class="text-[10px] text-on-surface-variant">External API dispatch</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="add">add</span>
</div>
</div>
</div>
</div>
<div class="p-6 bg-surface-container-highest border-t border-border-glass">
<button class="w-full py-4 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(164,230,255,0.4)] hover:shadow-[0_0_35px_rgba(164,230,255,0.6)] transition-all magnetic-btn" id="deploy-btn">
<span class="material-symbols-outlined" data-icon="rocket_launch" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
                    DEPLOY LOGIC
                </button>
</div>
</aside>
<!-- Tool Bar (Canvas Controls) -->
<div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-surface-container-high/80 backdrop-blur-xl border border-border-glass rounded-full shadow-2xl z-30">
<button class="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
<span class="material-symbols-outlined" data-icon="zoom_in">zoom_in</span>
</button>
<div class="w-px h-6 bg-border-glass"></div>
<button class="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
<span class="material-symbols-outlined" data-icon="zoom_out">zoom_out</span>
</button>
<div class="w-px h-6 bg-border-glass"></div>
<button class="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
<span class="material-symbols-outlined" data-icon="center_focus_weak">center_focus_weak</span>
</button>
<div class="w-px h-6 bg-border-glass"></div>
<button class="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
<span class="material-symbols-outlined" data-icon="history">history</span>
</button>
<div class="w-px h-6 bg-border-glass"></div>
<button class="w-12 h-12 flex items-center justify-center rounded-full text-error/60 hover:bg-error/10 hover:text-error transition-all">
<span class="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</main>
<!-- FAB (Contextual for Deployment Screen) -->
<button class="fixed bottom-32 right-[22rem] w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-on-secondary shadow-[0_0_20px_rgba(255,183,127,0.4)] hover:shadow-[0_0_40px_rgba(255,183,127,0.6)] transition-all z-30 group active:scale-90">
<span class="material-symbols-outlined scale-125 group-hover:rotate-12 transition-transform" data-icon="play_arrow" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
<script>
        // Micro-interactions: Magnetic Button Logic
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0, 0)`;
            });
        });

        // Simple Drag and Drop simulation for Canvas
        const canvas = document.getElementById('logic-canvas');
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;

        canvas.addEventListener('mousedown', (e) => {
            if (e.target === canvas) {
                isDragging = true;
                startX = e.pageX - canvas.offsetLeft;
                startY = e.pageY - canvas.offsetTop;
                scrollLeft = canvas.scrollLeft;
                scrollTop = canvas.scrollTop;
            }
        });

        canvas.addEventListener('mouseleave', () => isDragging = false);
        canvas.addEventListener('mouseup', () => isDragging = false);

        canvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - canvas.offsetLeft;
            const y = e.pageY - canvas.offsetTop;
            const walkX = (x - startX);
            const walkY = (y - startY);
            canvas.scrollLeft = scrollLeft - walkX;
            canvas.scrollTop = scrollTop - walkY;
        });

        // Pulse Animation Keyframe (CSS Injection)
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    </script>
</body></html>

<!-- Real-Time Monitoring Engine -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Metric Node Engine</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary-fixed": "#ffdcc4",
                        "surface-tint": "#4cd6ff",
                        "tertiary": "#ffd59c",
                        "primary-fixed": "#b7eaff",
                        "inverse-primary": "#00677f",
                        "border-glass": "rgba(255, 255, 255, 0.08)",
                        "on-tertiary-container": "#6b4700",
                        "error-alert": "#FF3D00",
                        "inverse-surface": "#e1e2eb",
                        "on-secondary-fixed": "#2f1500",
                        "tertiary-fixed": "#ffddb1",
                        "on-primary": "#003543",
                        "on-primary-container": "#00566a",
                        "on-secondary": "#4e2600",
                        "on-background": "#e1e2eb",
                        "primary": "#a4e6ff",
                        "bg-obsidian": "#0B0E14",
                        "error-container": "#93000a",
                        "background": "#10131a",
                        "on-surface-variant": "#bbc9cf",
                        "on-surface": "#e1e2eb",
                        "success-glow": "#00FFC2",
                        "surface-container-high": "#272a31",
                        "inverse-on-surface": "#2e3037",
                        "on-tertiary": "#442b00",
                        "surface-glass": "rgba(255, 255, 255, 0.03)",
                        "on-error-container": "#ffdad6",
                        "on-secondary-container": "#613100",
                        "surface-variant": "#32353c",
                        "surface-container-lowest": "#0b0e14",
                        "surface-container-low": "#191c22",
                        "on-tertiary-fixed": "#291800",
                        "secondary-container": "#ff8a00",
                        "outline": "#859399",
                        "on-primary-fixed": "#001f28",
                        "surface-container-highest": "#32353c",
                        "on-primary-fixed-variant": "#004e60",
                        "surface": "#10131a",
                        "on-tertiary-fixed-variant": "#624000",
                        "on-error": "#690005",
                        "tertiary-fixed-dim": "#ffba49",
                        "outline-variant": "#3c494e",
                        "surface-dim": "#10131a",
                        "secondary-fixed-dim": "#ffb77f",
                        "on-secondary-fixed-variant": "#6f3900",
                        "primary-fixed-dim": "#4cd6ff",
                        "surface-container": "#1d2026",
                        "tertiary-container": "#feb127",
                        "error": "#ffb4ab",
                        "surface-bright": "#363940",
                        "secondary": "#ffb77f",
                        "primary-container": "#00d1ff",
                        "laser-cyan": "#00E5FF",
                        "hyper-orange": "#FF4500"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "margin-desktop": "32px",
                        "widget-gap": "16px",
                        "unit": "4px",
                        "margin-mobile": "16px"
                    },
                    "fontFamily": {
                        "headline-md": ["Inter"],
                        "data-mono": ["JetBrains Mono"],
                        "body-base": ["Inter"],
                        "display-lg": ["Inter"],
                        "label-caps": ["JetBrains Mono"]
                    },
                    "fontSize": {
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #0B0E14;
            color: #e1e2eb;
            overflow-x: hidden;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .border-cyan-glow {
            border: 1px solid #00E5FF33;
        }
        .border-cyan-glow:hover {
            border-color: #00E5FF;
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
        }
        .border-orange-glow {
            border: 1px solid #FF450033;
        }
        .border-orange-glow:hover {
            border-color: #FF4500;
            box-shadow: 0 0 15px rgba(255, 69, 0, 0.2);
        }
        .liquid-toggle {
            position: relative;
            width: 48px;
            height: 24px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 99px;
            cursor: pointer;
            transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .liquid-thumb {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 50%;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .dark .liquid-toggle.active .liquid-thumb {
            transform: translateX(24px);
            background: #a4e6ff;
            box-shadow: 0 0 10px #00d1ff;
        }
        .animated-text-gradient {
            background: linear-gradient(90deg, #a4e6ff, #00E5FF, #FF4500, #a4e6ff);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-move 8s linear infinite;
        }
        @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
        .count-up-val {
            font-variant-numeric: tabular-nums;
        }
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0B0E14;
        }
        ::-webkit-scrollbar-thumb {
            background: #32353c;
            border-radius: 10px;
        }
    </style>
</head>
<body class="font-body-base">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
<div class="flex items-center gap-8">
<span class="font-display-lg text-[24px] font-bold text-primary tracking-tighter cursor-pointer">DATAVLOW.ID</span>
<nav class="hidden md:flex gap-6 items-center">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-label-caps text-[11px]" href="#">DASHBOARD</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-[11px]" href="#">NODES</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-[11px]" href="#">BUILDER</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-[11px]" href="#">METRICS</a>
</nav>
</div>
<div class="flex items-center gap-6">
<!-- Language Switcher -->
<div class="flex bg-surface-container-low rounded-full p-1 border border-border-glass">
<button class="px-3 py-1 text-[10px] font-label-caps bg-surface-glass text-primary rounded-full transition-all">EN</button>
<button class="px-3 py-1 text-[10px] font-label-caps text-on-surface-variant hover:text-on-surface transition-all">ID</button>
</div>
<!-- Theme Toggle -->
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">light_mode</span>
<div class="liquid-toggle active" id="theme-toggle" onclick="this.classList.toggle('active')">
<div class="liquid-thumb"></div>
</div>
<span class="material-symbols-outlined text-[18px] text-primary">dark_mode</span>
</div>
<div class="flex items-center gap-3 ml-2 border-l border-border-glass pl-6">
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">translate</span>
<div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-laser-cyan flex items-center justify-center text-[12px] font-bold text-on-primary">JD</div>
</div>
</div>
</header>
<!-- SideNavBar (Mobile View Overlay or Desktop Persistent) -->
<aside class="fixed left-0 top-0 h-full w-20 hidden md:flex flex-col py-24 items-center gap-10 bg-bg-obsidian border-r border-border-glass z-40">
<div class="group cursor-pointer p-3 rounded-xl bg-surface-glass border-l-4 border-primary text-primary transition-all">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
</div>
<div class="group cursor-pointer p-3 rounded-xl hover:bg-surface-glass text-on-surface-variant hover:text-primary transition-all active:scale-95">
<span class="material-symbols-outlined">router</span>
</div>
<div class="group cursor-pointer p-3 rounded-xl hover:bg-surface-glass text-on-surface-variant hover:text-primary transition-all active:scale-95">
<span class="material-symbols-outlined">account_tree</span>
</div>
<div class="group cursor-pointer p-3 rounded-xl hover:bg-surface-glass text-on-surface-variant hover:text-primary transition-all active:scale-95">
<span class="material-symbols-outlined">analytics</span>
</div>
<div class="mt-auto flex flex-col gap-6 items-center">
<div class="group cursor-pointer p-3 rounded-xl hover:bg-surface-glass text-on-surface-variant hover:text-primary transition-all">
<span class="material-symbols-outlined">settings</span>
</div>
<div class="group cursor-pointer p-3 rounded-xl hover:bg-error text-error-container hover:text-on-error transition-all">
<span class="material-symbols-outlined">logout</span>
</div>
</div>
</aside>
<!-- Main Canvas -->
<main class="md:pl-20 pt-16 min-h-screen">
<!-- Hero Section with Kinetic Wave -->
<section class="relative h-[460px] w-full overflow-hidden flex items-center px-margin-desktop">
<!-- STITCH_THREEJS_START:ANIMATION_7 class="absolute inset-0 w-full h-full opacity-40" -->
<div class="absolute inset-0 w-full h-full opacity-40" style="display:block;">
<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
<div id="threejs-container-ANIMATION_7" style="width:100%;height:100%"></div>
<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_7');
  const devicePixelRatio = window.devicePixelRatio || 1;
  
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 15, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Geometry - A large plane for the topographic wave
const geometry = new THREE.PlaneGeometry(60, 60, 128, 128);

// Shader Material for Kinetic Wave
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x00E5FF) }, // Laser Cyan
        uColor2: { value: new THREE.Color(0x10131a) }  // Deep Onyx
    },
    vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            float elevation = sin(modelPosition.x * 0.2 + uTime) * 
                              cos(modelPosition.z * 0.1 + uTime * 0.5) * 2.0;
            elevation += sin(modelPosition.x * 0.5 - uTime * 0.8) * 0.5;
            
            modelPosition.y += elevation;
            vElevation = elevation;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectionPosition = projectionMatrix * viewPosition;
            gl_Position = projectionPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
            float mixStrength = (vElevation + 2.0) / 4.0;
            vec3 color = mix(uColor2, uColor1, mixStrength);
            
            // Grid lines
            float gridX = smoothstep(0.0, 0.02, abs(fract(vUv.x * 20.0 - 0.5) - 0.5));
            float gridY = smoothstep(0.0, 0.02, abs(fract(vUv.y * 20.0 - 0.5) - 0.5));
            float grid = 1.0 - (gridX * gridY);
            
            color += grid * 0.15 * uColor1;
            
            gl_FragColor = vec4(color, 0.85);
        }
    `,
    transparent: true,
    wireframe: false,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI * 0.5;
scene.add(mesh);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00E5FF, 2);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

function animate() {
    const time = performance.now() * 0.001;
    material.uniforms.uTime.value = time;
    mesh.rotation.z = time * 0.05;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

animate();

})();
</script>
</div>
<!-- STITCH_THREEJS_END:ANIMATION_7 -->
<div class="absolute inset-0 bg-gradient-to-b from-bg-obsidian/0 via-bg-obsidian/50 to-bg-obsidian pointer-events-none"></div>
<div class="relative z-10 max-w-4xl">
<div class="flex items-center gap-2 mb-4">
<span class="w-2 h-2 rounded-full bg-success-glow shadow-[0_0_10px_#00FFC2]"></span>
<span class="font-label-caps text-on-surface-variant text-[10px]">LIVE DATA STREAM ACTIVE</span>
</div>
<h1 class="font-display-lg text-white mb-2 leading-tight">Hyper-Scale <br/><span class="animated-text-gradient">Metric Node Engine</span></h1>
<p class="text-on-surface-variant font-body-base max-w-xl">Processing high-frequency IoT telemetry via glass-morphic compute nodes. Optimized for sub-millisecond latency and predictive anomaly detection.</p>
</div>
<div class="absolute bottom-8 right-margin-desktop flex gap-4">
<button class="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-full font-label-caps text-[12px] font-bold shadow-[0_0_20px_rgba(164,230,255,0.3)] transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">add_circle</span> DEPLOY NODE
                </button>
<button class="glass-card px-6 py-3 rounded-full font-label-caps text-[12px] font-bold border-border-glass hover:bg-surface-glass transition-all">
                    VIEW SYSTEM MAP
                </button>
</div>
</section>
<!-- Metric Grid -->
<section class="px-margin-desktop pb-12 -mt-12 relative z-20">
<div class="grid grid-cols-1 md:grid-cols-4 gap-widget-gap">
<!-- Ingestion Rate -->
<div class="glass-card border-cyan-glow p-6 rounded-xl flex flex-col justify-between h-40">
<div class="flex justify-between items-start">
<span class="font-label-caps text-on-surface-variant text-[10px]">INGESTION RATE</span>
<span class="material-symbols-outlined text-laser-cyan">speed</span>
</div>
<div>
<div class="flex items-baseline gap-1">
<span class="font-data-mono text-[32px] font-bold text-white count-up-val" data-target="142.8">0.0</span>
<span class="font-label-caps text-on-surface-variant">GB/s</span>
</div>
<div class="text-[10px] text-success-glow mt-1 flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">trending_up</span> +12.4% vs last hour
                        </div>
</div>
</div>
<!-- Node Health -->
<div class="glass-card p-6 rounded-xl flex flex-col justify-between h-40">
<div class="flex justify-between items-start">
<span class="font-label-caps text-on-surface-variant text-[10px]">NODE HEALTH</span>
<span class="material-symbols-outlined text-primary">hub</span>
</div>
<div>
<div class="flex items-baseline gap-1">
<span class="font-data-mono text-[32px] font-bold text-white count-up-val" data-target="99.9">0.0</span>
<span class="font-label-caps text-on-surface-variant">%</span>
</div>
<div class="h-1 w-full bg-surface-variant rounded-full mt-3 overflow-hidden">
<div class="h-full bg-primary w-[99.9%]"></div>
</div>
</div>
</div>
<!-- Packet Loss -->
<div class="glass-card border-orange-glow p-6 rounded-xl flex flex-col justify-between h-40">
<div class="flex justify-between items-start">
<span class="font-label-caps text-on-surface-variant text-[10px]">PACKET LOSS</span>
<span class="material-symbols-outlined text-hyper-orange">signal_disconnected</span>
</div>
<div>
<div class="flex items-baseline gap-1">
<span class="font-data-mono text-[32px] font-bold text-white count-up-val" data-target="0.04">0.00</span>
<span class="font-label-caps text-on-surface-variant">%</span>
</div>
<div class="text-[10px] text-on-surface-variant mt-1">NOMINAL (THRES: 0.1%)</div>
</div>
</div>
<!-- Active Sessions -->
<div class="glass-card p-6 rounded-xl flex flex-col justify-between h-40">
<div class="flex justify-between items-start">
<span class="font-label-caps text-on-surface-variant text-[10px]">ACTIVE SESSIONS</span>
<span class="material-symbols-outlined text-on-surface-variant">group</span>
</div>
<div>
<div class="flex items-baseline gap-1">
<span class="font-data-mono text-[32px] font-bold text-white count-up-val" data-target="4290">0</span>
</div>
<div class="flex -space-x-2 mt-2">
<div class="w-6 h-6 rounded-full border-2 border-bg-obsidian bg-slate-500 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A professional headshot of a female software engineer in a modern dark-lit office setting, dramatic lighting, high quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWS31cpurKc_eNXcCGud1rLRQYcgL3Zv8r-GU5PQpH62VVIwJ6WKaUtARgRYvEysSW5DcMhd7gOpFQEnoJqssaEldhlDFP0OfJENsZIYm5Y6FIVFKQDleojOXVL18Q6l4LKAVwHSrQbCXGC3hX7H2bbsdwAjsqO4PhCJN3ZljmzTKn4tMbuJvH7Z4asVdnKtucz3ikOa-El8eDSAvBtZDJaGoCeygfadnbGa1Xf5NefGjTYkwedMdDOZqo5uLTFHZKFrb3EUEbVIRT"/>
</div>
<div class="w-6 h-6 rounded-full border-2 border-bg-obsidian bg-slate-600 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A close-up profile picture of a young male data scientist with glasses, neon lighting reflections, cinematic aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCUP3Ke_2tbNbBEzczLK5ize0WgQhZNqI0NV-glFa_dkM05vAxmu9o9Iv8GBPydn8IBQw2J_fiaT3qEjN_Q8Tg9oBEymhRWeGN3Zhyep-oFtK2l9LgfuK6Jg8H5fLG6i-t-vEky1WkBlory-z4QmtNDdxM9sRifdBwMal9Kw5PoOUtfXmzOxI6drsh7PBTwwfC7IUd7RoLU5G-MgDmEgOZ4OxoqMNx6rq-FXE5NdpL0ICsTgRsxEuryzqj_ppst40pMj5OXOe1Zokb"/>
</div>
<div class="w-6 h-6 rounded-full border-2 border-bg-obsidian bg-primary flex items-center justify-center text-[8px] text-on-primary font-bold">
                                +12
                            </div>
</div>
</div>
</div>
</div>
<!-- Dashboard Content Areas -->
<div class="grid grid-cols-12 gap-widget-gap mt-widget-gap">
<!-- Main Visualizer Widget -->
<div class="col-span-12 lg:col-span-8 glass-card rounded-xl overflow-hidden border border-border-glass">
<div class="flex justify-between items-center px-6 py-4 border-b border-border-glass">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">drag_indicator</span>
<h3 class="font-headline-md text-[16px] text-white">Neural Flow Visualization</h3>
</div>
<div class="flex items-center gap-4">
<span class="font-label-caps text-[10px] text-on-surface-variant">LAST UPDATED: 2s AGO</span>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-white">more_horiz</span>
</div>
</div>
<div class="h-96 relative bg-[#05070A] flex items-center justify-center">
<!-- Simulated Node Network -->
<div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 24px 24px;"></div>
<div class="relative w-full h-full p-8 grid grid-cols-3 gap-12">
<!-- Node Group 1 -->
<div class="flex flex-col gap-6">
<div class="glass-card p-4 rounded-lg border-cyan-glow relative">
<div class="flex items-center gap-2 mb-2">
<div class="w-1.5 h-1.5 bg-laser-cyan rounded-full animate-pulse"></div>
<span class="font-label-caps text-[10px] text-white">NODE_ALPHA_01</span>
</div>
<div class="font-data-mono text-[14px] text-on-surface-variant">LOAD: 42.1%</div>
</div>
<div class="glass-card p-4 rounded-lg border-border-glass opacity-50">
<div class="flex items-center gap-2 mb-2">
<div class="w-1.5 h-1.5 bg-on-surface-variant rounded-full"></div>
<span class="font-label-caps text-[10px] text-on-surface-variant">NODE_ALPHA_02</span>
</div>
<div class="font-data-mono text-[14px] text-on-surface-variant">STATUS: IDLE</div>
</div>
</div>
<!-- Flow Lines -->
<div class="relative flex items-center justify-center">
<svg class="w-full h-full absolute inset-0 overflow-visible">
<path class="opacity-30" d="M 0 60 Q 100 60 200 150" fill="none" stroke="#00E5FF" stroke-dasharray="4,4" stroke-width="1.5">
<animate attributename="stroke-dashoffset" dur="3s" from="100" repeatcount="indefinite" to="0"></animate>
</path>
<path class="opacity-30" d="M 0 160 Q 100 160 200 150" fill="none" stroke="#FF4500" stroke-dasharray="4,4" stroke-width="1.5">
<animate attributename="stroke-dashoffset" dur="4s" from="0" repeatcount="indefinite" to="100"></animate>
</path>
</svg>
<div class="glass-card p-6 rounded-full w-24 h-24 border-primary shadow-[0_0_20px_rgba(164,230,255,0.1)] flex items-center justify-center z-10">
<span class="material-symbols-outlined text-[32px] text-primary" style="font-variation-settings: 'FILL' 1;">dataset</span>
</div>
</div>
<!-- Destination -->
<div class="flex flex-col justify-center">
<div class="glass-card p-4 rounded-lg border-orange-glow">
<div class="flex items-center gap-2 mb-2">
<div class="w-1.5 h-1.5 bg-hyper-orange rounded-full"></div>
<span class="font-label-caps text-[10px] text-white">CORE_AGGREGATOR</span>
</div>
<div class="font-data-mono text-[14px] text-on-surface-variant">TRAFFIC: 1.2M req/s</div>
</div>
</div>
</div>
</div>
</div>
<!-- Sleek Data Table Sidebar -->
<div class="col-span-12 lg:col-span-4 glass-card rounded-xl overflow-hidden flex flex-col">
<div class="px-6 py-4 border-b border-border-glass flex justify-between items-center bg-surface-container-low">
<h3 class="font-label-caps text-[12px] text-white">Anomaly Log</h3>
<span class="px-2 py-0.5 rounded bg-error-container text-error text-[10px] font-bold">4 CRITICAL</span>
</div>
<div class="flex-1 overflow-y-auto">
<table class="w-full text-left">
<thead class="sticky top-0 bg-surface-container-low z-10 border-b border-border-glass">
<tr class="font-label-caps text-[10px] text-on-surface-variant">
<th class="px-6 py-3 font-medium">TIMESTAMP</th>
<th class="px-6 py-3 font-medium">EVENT</th>
<th class="px-6 py-3 font-medium">LVL</th>
</tr>
</thead>
<tbody class="divide-y divide-border-glass font-data-mono text-[12px]">
<tr class="hover:bg-surface-glass group transition-all">
<td class="px-6 py-4 text-on-surface-variant">14:02:11.4</td>
<td class="px-6 py-4 text-white">BGP_Route_Flap</td>
<td class="px-6 py-4">
<span class="text-hyper-orange">WRN</span>
</td>
</tr>
<tr class="hover:bg-surface-glass group transition-all bg-white/[0.02]">
<td class="px-6 py-4 text-on-surface-variant">14:01:58.2</td>
<td class="px-6 py-4 text-white">Node_01_OOM</td>
<td class="px-6 py-4">
<span class="text-error">CRT</span>
</td>
</tr>
<tr class="hover:bg-surface-glass group transition-all">
<td class="px-6 py-4 text-on-surface-variant">14:00:23.9</td>
<td class="px-6 py-4 text-white">Sync_Delay_High</td>
<td class="px-6 py-4">
<span class="text-primary">INF</span>
</td>
</tr>
<tr class="hover:bg-surface-glass group transition-all bg-white/[0.02]">
<td class="px-6 py-4 text-on-surface-variant">13:58:45.0</td>
<td class="px-6 py-4 text-white">Auth_BruteForce</td>
<td class="px-6 py-4">
<span class="text-error">CRT</span>
</td>
</tr>
<tr class="hover:bg-surface-glass group transition-all">
<td class="px-6 py-4 text-on-surface-variant">13:55:12.4</td>
<td class="px-6 py-4 text-white">Cluster_Rescale</td>
<td class="px-6 py-4">
<span class="text-primary">INF</span>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 border-t border-border-glass bg-surface-container-low text-center">
<a class="text-[10px] font-label-caps text-primary hover:underline" href="#">VIEW FULL ARCHIVE</a>
</div>
</div>
</div>
</section>
</main>
<!-- FAB for Deployment -->
<button class="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-laser-cyan text-on-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">add</span>
</button>
<script>
        // Fluid Count-Up Animation
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const val = (progress * (end - start) + start);
                
                if (end % 1 === 0) {
                    obj.innerHTML = Math.floor(val).toLocaleString();
                } else {
                    obj.innerHTML = val.toFixed(obj.getAttribute('data-target').split('.')[1]?.length || 1);
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const observers = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseFloat(entry.target.getAttribute('data-target'));
                        animateValue(entry.target, 0, target, 2000);
                        observers.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.count-up-val').forEach(el => observers.observe(el));
        });

        // Simulating Real-time variations
        setInterval(() => {
            const ingestion = document.querySelector('[data-target="142.8"]');
            if (ingestion) {
                const current = parseFloat(ingestion.innerText);
                const noise = (Math.random() - 0.5) * 0.5;
                ingestion.innerText = (current + noise).toFixed(1);
            }
        }, 3000);
    </script>
</body></html>

<!-- Shader -->
<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width,initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
  </style>
</head>
<body>
<!-- STITCH_SHADER_START:ANIMATION_8 class="fixed inset-0 w-full h-full" -->
<div class="fixed inset-0 w-full h-full" style="display:block;">
<canvas id="shader-canvas-ANIMATION_8" style="display:block;width:100%;height:100%"></canvas>
<script>
(function() {
  const canvas = document.getElementById('shader-canvas-ANIMATION_8');

  // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
  // This fires on initial layout and whenever the element is resized.
  function syncSize() {
    const w = canvas.clientWidth  || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
    }
  }
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;
  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
  const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 m = u_mouse / u_resolution;
    
    // Grid effect
    vec2 grid = fract(uv * 40.0);
    float line = smoothstep(0.0, 0.03, grid.x) * smoothstep(1.0, 0.97, grid.x) *
                 smoothstep(0.0, 0.03, grid.y) * smoothstep(1.0, 0.97, grid.y);
                 
    // Mouse glow
    float dist = distance(uv, m);
    float glow = smoothstep(0.2, 0.0, dist) * 0.4;
    
    // Background color
    vec3 color = vec3(0.04, 0.05, 0.08); // Onyx
    
    // Add grid and glow
    color += (1.0 - line) * vec3(0.0, 0.9, 1.0) * 0.05;
    color += glow * vec3(0.0, 0.9, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}`;
  function cs(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  // u_mouse is in pixel coordinates matching u_resolution (ShaderToy convention).
  // Shaders that need normalized coords should use: u_mouse / u_resolution.
  let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = 1.0 - (event.clientY - rect.top) / rect.height;
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    }
  });

  function render(t) {
    if (typeof ResizeObserver === 'undefined') syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, t * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  render(0);
})();
</script>
</div>
<!-- STITCH_SHADER_END:ANIMATION_8 -->
</body>
</html>


<!-- Three.js -->
<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width,initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
  </style>
</head>
<body>
<!-- STITCH_THREEJS_START:ANIMATION_7 class="fixed inset-0 w-full h-full bg-transparent" -->
<div class="fixed inset-0 w-full h-full bg-transparent" style="display:block;">
<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
<div id="threejs-container-ANIMATION_7" style="width:100%;height:100%"></div>
<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_7');
  const devicePixelRatio = window.devicePixelRatio || 1;
  
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 15, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Geometry - A large plane for the topographic wave
const geometry = new THREE.PlaneGeometry(60, 60, 128, 128);

// Shader Material for Kinetic Wave
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x00E5FF) }, // Laser Cyan
        uColor2: { value: new THREE.Color(0x10131a) }  // Deep Onyx
    },
    vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            float elevation = sin(modelPosition.x * 0.2 + uTime) * 
                              cos(modelPosition.z * 0.1 + uTime * 0.5) * 2.0;
            elevation += sin(modelPosition.x * 0.5 - uTime * 0.8) * 0.5;
            
            modelPosition.y += elevation;
            vElevation = elevation;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectionPosition = projectionMatrix * viewPosition;
            gl_Position = projectionPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
            float mixStrength = (vElevation + 2.0) / 4.0;
            vec3 color = mix(uColor2, uColor1, mixStrength);
            
            // Grid lines
            float gridX = smoothstep(0.0, 0.02, abs(fract(vUv.x * 20.0 - 0.5) - 0.5));
            float gridY = smoothstep(0.0, 0.02, abs(fract(vUv.y * 20.0 - 0.5) - 0.5));
            float grid = 1.0 - (gridX * gridY);
            
            color += grid * 0.15 * uColor1;
            
            gl_FragColor = vec4(color, 0.85);
        }
    `,
    transparent: true,
    wireframe: false,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI * 0.5;
scene.add(mesh);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00E5FF, 2);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

function animate() {
    const time = performance.now() * 0.001;
    material.uniforms.uTime.value = time;
    mesh.rotation.z = time * 0.05;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

animate();

})();
</script>
</div>
<!-- STITCH_THREEJS_END:ANIMATION_7 -->
</body>
</html>


<!-- Design System -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Precision Telemetry</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Custom CSS for specialized effects -->
<style>
        :root {
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --obsidian: #020204;
        }

        body {
            background-color: var(--obsidian);
            color: #e1e2eb;
            overflow-x: hidden;
            font-family: 'Inter', sans-serif;
        }

        .glass-panel {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
        }

        .glow-cyan {
            box-shadow: 0 0 20px rgba(0, 209, 255, 0.15);
        }

        .neon-border {
            position: relative;
        }
        
        .neon-border::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(135deg, rgba(76, 214, 255, 0.3), transparent, rgba(76, 214, 255, 0.05));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        .kinetic-grid {
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        .chart-flow-mask {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        @keyframes pulse-slow {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }
    </style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-container": "#feb127",
                    "on-secondary-container": "#613100",
                    "surface-variant": "#32353c",
                    "on-surface-variant": "#bbc9cf",
                    "on-primary": "#003543",
                    "surface-dim": "#10131a",
                    "surface-container-highest": "#32353c",
                    "surface-container-low": "#191c22",
                    "surface-bright": "#363940",
                    "on-background": "#e1e2eb",
                    "primary-fixed-dim": "#4cd6ff",
                    "border-glass": "rgba(255, 255, 255, 0.08)",
                    "on-secondary-fixed": "#2f1500",
                    "primary-fixed": "#b7eaff",
                    "secondary": "#ffb77f",
                    "error-container": "#93000a",
                    "tertiary": "#ffd59c",
                    "primary-container": "#00d1ff",
                    "primary": "#a4e6ff",
                    "on-secondary": "#4e2600",
                    "background": "#10131a",
                    "on-tertiary-fixed": "#291800",
                    "on-tertiary-container": "#6b4700",
                    "inverse-surface": "#e1e2eb",
                    "error": "#ffb4ab",
                    "secondary-container": "#ff8a00",
                    "on-error": "#690005",
                    "on-primary-fixed": "#001f28",
                    "surface-container-high": "#272a31",
                    "tertiary-fixed-dim": "#ffba49",
                    "surface-glass": "rgba(255, 255, 255, 0.03)",
                    "on-tertiary-fixed-variant": "#624000",
                    "on-error-container": "#ffdad6",
                    "surface": "#10131a",
                    "bg-obsidian": "#0B0E14",
                    "on-surface": "#e1e2eb",
                    "inverse-primary": "#00677f",
                    "surface-container": "#1d2026",
                    "on-secondary-fixed-variant": "#6f3900",
                    "outline": "#859399",
                    "error-alert": "#FF3D00",
                    "tertiary-fixed": "#ffddb1",
                    "inverse-on-surface": "#2e3037",
                    "surface-tint": "#4cd6ff",
                    "on-primary-fixed-variant": "#004e60",
                    "on-primary-container": "#00566a",
                    "secondary-fixed": "#ffdcc4",
                    "outline-variant": "#3c494e",
                    "secondary-fixed-dim": "#ffb77f",
                    "on-tertiary": "#442b00",
                    "success-glow": "#00FFC2",
                    "surface-container-lowest": "#0b0e14"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "margin-mobile": "16px",
                    "widget-gap": "16px",
                    "gutter": "24px",
                    "margin-desktop": "32px",
                    "unit": "4px"
            },
            "fontFamily": {
                    "headline-md": ["Inter"],
                    "display-lg": ["Inter"],
                    "label-caps": ["JetBrains Mono"],
                    "data-mono": ["JetBrains Mono"],
                    "body-base": ["Inter"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}],
                    "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
</head>
<body class="bg-surface-container-lowest">
<!-- Top Navigation -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
<div class="flex items-center gap-8">
<h1 class="font-display-lg text-headline-md font-bold text-primary tracking-tighter">DATAVLOW.ID</h1>
<nav class="hidden md:flex gap-6">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-body-base text-body-base" href="#">Dashboard</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-base text-body-base" href="#">Network</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-base text-body-base" href="#">Devices</a>
</nav>
</div>
<div class="flex items-center gap-6">
<div class="flex bg-surface-container-high rounded-full p-1 border border-border-glass">
<button class="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-label-caps font-label-caps">ID</button>
<button class="px-3 py-1 rounded-full text-on-surface-variant hover:text-on-surface text-label-caps font-label-caps">EN</button>
</div>
<div class="flex gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">translate</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">dark_mode</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-border-glass">
<img class="w-full h-full object-cover" data-alt="Professional studio portrait of a high-tech data engineer with a clean minimalist background, subtle blue rim lighting reflecting on their profile. The aesthetic is ultra-modern and corporate, matching the obsidian and electric blue color palette of the command center interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLx6aqYk1wmXPRfV7RBlpS3DcV8anWKUPOhw2NBUOwsS9-vZ5z84OfyrtWwKM9SnC7ZXUfz_Gx-zAy-FL_0c7Vn6yAfntD3KwMAdPUyta_JZ4OWvHf-Z2EAdgt6hBOtKpDU50c6lgoXuPaUM7Fsfhkgb5AtZvUKLvIwBjlFvcsd1NsDX7_rC-FqNhAkTFZeh-FSN0OAzs-HwEUlJuiEfQzlG1YZw_s3YCNqxSPXjrXIl2kNLuRi3BX3g"/>
</div>
</div>
</div>
</header>
<!-- Side Navigation (Mobile/Minimized View) -->
<aside class="fixed left-0 top-0 h-full hidden lg:flex flex-col py-24 w-20 border-r border-border-glass bg-bg-obsidian z-40 items-center gap-8">
<button class="material-symbols-outlined text-primary bg-surface-glass p-3 rounded-xl border border-primary/20">dashboard</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">router</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">account_tree</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">analytics</button>
<div class="mt-auto flex flex-col gap-6 pb-8">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">settings</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-error transition-all">logout</button>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="pt-24 pl-margin-desktop pr-margin-desktop lg:pl-32 pb-margin-desktop min-h-screen">
<!-- Status Banner -->
<section class="mb-gutter">
<div class="glass-panel rounded-xl p-6 relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"></div>
<div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex flex-col">
<span class="text-label-caps font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Logic Engine: Fuzzy Mamdani</span>
<div class="flex items-baseline gap-4">
<h2 class="text-display-lg font-display-lg text-on-surface leading-none">BAIK</h2>
<div class="h-2 w-32 bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-primary-container glow-cyan" style="width: 82.9%"></div>
</div>
</div>
</div>
<div class="flex flex-col items-end">
<span class="text-label-caps font-label-caps text-primary mb-1">AGGREGATE SCORE</span>
<span class="text-display-lg font-display-lg text-primary-container leading-none animate-pulse-slow">82.90</span>
</div>
<div class="flex items-center gap-3 bg-surface-container-high/50 px-6 py-3 rounded-full border border-border-glass">
<span class="material-symbols-outlined text-success-glow animate-pulse">verified_user</span>
<span class="text-body-base font-body-base text-on-surface">System Optimal</span>
</div>
</div>
</div>
</section>
<!-- KPI Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-widget-gap mb-gutter">
<!-- Card 1 -->
<div class="glass-panel neon-border rounded-xl p-6 group hover:bg-surface-glass/10 transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">water_ph</span>
</div>
<span class="text-label-caps font-label-caps text-on-surface-variant">REAL-TIME</span>
</div>
<div class="flex flex-col">
<span class="text-body-base font-body-base text-on-surface-variant">Acidity (pH)</span>
<div class="flex items-baseline gap-2">
<span class="text-headline-md font-headline-md text-on-surface">7.2</span>
<span class="text-label-caps font-label-caps text-on-surface-variant">pH</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-success-glow">
<span class="material-symbols-outlined text-sm">trending_up</span>
<span class="text-label-caps font-label-caps">Stable Range</span>
</div>
</div>
<!-- Card 2 -->
<div class="glass-panel neon-border rounded-xl p-6 group hover:bg-surface-glass/10 transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">blur_on</span>
</div>
<span class="text-label-caps font-label-caps text-on-surface-variant">REAL-TIME</span>
</div>
<div class="flex flex-col">
<span class="text-body-base font-body-base text-on-surface-variant">TDS level</span>
<div class="flex items-baseline gap-2">
<span class="text-headline-md font-headline-md text-on-surface">450</span>
<span class="text-label-caps font-label-caps text-on-surface-variant">ppm</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-sm">swap_vert</span>
<span class="text-label-caps font-label-caps">Nominal Ops</span>
</div>
</div>
<!-- Card 3 -->
<div class="glass-panel neon-border rounded-xl p-6 group hover:bg-surface-glass/10 transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">waves</span>
</div>
<span class="text-label-caps font-label-caps text-on-surface-variant">REAL-TIME</span>
</div>
<div class="flex flex-col">
<span class="text-body-base font-body-base text-on-surface-variant">Turbidity</span>
<div class="flex items-baseline gap-2">
<span class="text-headline-md font-headline-md text-on-surface">1.5</span>
<span class="text-label-caps font-label-caps text-on-surface-variant">NTU</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-success-glow">
<span class="material-symbols-outlined text-sm">check_circle</span>
<span class="text-label-caps font-label-caps">Clear Clarity</span>
</div>
</div>
<!-- Card 4 -->
<div class="glass-panel neon-border rounded-xl p-6 group hover:bg-surface-glass/10 transition-all duration-300">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">thermostat</span>
</div>
<span class="text-label-caps font-label-caps text-on-surface-variant">REAL-TIME</span>
</div>
<div class="flex flex-col">
<span class="text-body-base font-body-base text-on-surface-variant">Temperature</span>
<div class="flex items-baseline gap-2">
<span class="text-headline-md font-headline-md text-on-surface">24.5</span>
<span class="text-label-caps font-label-caps text-on-surface-variant">°C</span>
</div>
</div>
<div class="mt-4 flex items-center gap-2 text-tertiary">
<span class="material-symbols-outlined text-sm">device_thermostat</span>
<span class="text-label-caps font-label-caps">+0.2° Variance</span>
</div>
</div>
</section>
<!-- Main Chart Section -->
<section class="grid grid-cols-1 gap-gutter">
<div class="glass-panel rounded-2xl relative overflow-hidden min-h-[500px] flex flex-col p-8">
<div class="flex justify-between items-center mb-12 z-10">
<div>
<h3 class="text-headline-md font-headline-md text-on-surface">Telemetry Topography</h3>
<p class="text-body-base font-body-base text-on-surface-variant">Real-time water quality kinetic trends</p>
</div>
<div class="flex gap-4">
<div class="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg border border-border-glass">
<div class="w-3 h-3 rounded-full bg-primary glow-cyan"></div>
<span class="text-label-caps font-label-caps text-on-surface">LIVE STREAM</span>
</div>
<button class="material-symbols-outlined text-on-surface-variant hover:text-on-surface p-2 glass-panel rounded-lg">more_vert</button>
</div>
</div>
<!-- Live Kinetic Chart (Simulated with Shader/Background) -->
<div class="flex-grow relative kinetic-grid rounded-xl overflow-hidden chart-flow-mask">

<!-- Chart Legend/Data Overlay -->
<div class="absolute bottom-8 left-8 flex gap-8 z-10">
<div class="flex flex-col">
<span class="text-label-caps font-label-caps text-on-surface-variant">SAMPLING RATE</span>
<span class="text-data-mono font-data-mono text-primary">125ms / PKT</span>
</div>
<div class="flex flex-col">
<span class="text-label-caps font-label-caps text-on-surface-variant">BUFFER LOAD</span>
<span class="text-data-mono font-data-mono text-primary">4% UTILIZED</span>
</div>
</div>
<!-- Decorative "Topographic" Lines -->
<svg class="absolute bottom-0 w-full h-64 overflow-visible pointer-events-none" preserveaspectratio="none">
<path d="M0 100 Q 200 50 400 150 T 800 100 T 1200 200 T 1600 50 L 1600 400 L 0 400 Z" fill="url(#gradient1)" opacity="0.1"></path>
<path d="M0 150 Q 250 100 500 200 T 1000 100 T 1500 150 L 1500 400 L 0 400 Z" fill="none" stroke="rgba(0, 209, 255, 0.4)" stroke-width="2"></path>
<defs>
<lineargradient id="gradient1" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" style="stop-color:rgba(0, 209, 255, 0.5);stop-opacity:1"></stop>
<stop offset="100%" style="stop-color:rgba(0, 209, 255, 0);stop-opacity:0"></stop>
</lineargradient>
</defs>
</svg>
</div>
</div>
</section>
<!-- Bottom Row Utility -->
<section class="mt-gutter grid grid-cols-1 lg:grid-cols-3 gap-widget-gap">
<div class="glass-panel p-6 rounded-xl flex items-center justify-between">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
<span class="material-symbols-outlined text-primary">memory</span>
</div>
<div>
<span class="text-label-caps font-label-caps text-on-surface-variant">NODES ONLINE</span>
<h4 class="text-headline-md font-headline-md text-on-surface">14 / 15</h4>
</div>
</div>
<button class="material-symbols-outlined text-on-surface-variant">chevron_right</button>
</div>
<div class="glass-panel p-6 rounded-xl flex items-center justify-between">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
<span class="material-symbols-outlined text-secondary">notifications_active</span>
</div>
<div>
<span class="text-label-caps font-label-caps text-on-surface-variant">SYSTEM ALERTS</span>
<h4 class="text-headline-md font-headline-md text-on-surface">None</h4>
</div>
</div>
<span class="px-2 py-1 bg-surface-container text-success-glow text-label-caps font-label-caps rounded">HEALTHY</span>
</div>
<div class="glass-panel p-6 rounded-xl flex items-center justify-between">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary">cloud_sync</span>
</div>
<div>
<span class="text-label-caps font-label-caps text-on-surface-variant">UPLINK STATUS</span>
<h4 class="text-headline-md font-headline-md text-on-surface">Syncing...</h4>
</div>
</div>
<div class="w-4 h-4 rounded-full border-2 border-tertiary border-t-transparent animate-spin"></div>
</div>
</section>
</main>
<!-- Contextual FAB -->
<button class="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg glow-cyan hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">add</span>
</button>
<script>
        // Simple interactive micro-interactions
        document.querySelectorAll('.glass-panel').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Simulating data updates
        setInterval(() => {
            const values = document.querySelectorAll('.font-headline-md.text-on-surface');
            values.forEach(v => {
                if(v.innerText.includes('.')) {
                    let num = parseFloat(v.innerText);
                    num += (Math.random() - 0.5) * 0.1;
                    v.innerText = num.toFixed(1);
                }
            });
        }, 3000);
    </script>
</body></html>

<!-- Real-Time Telemetry Dashboard -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Simulation Center</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>@font-face {
    font-family: "LCD1602";
    src: url(https://fonts.cdnfonts.com/s/16219/DotMatrix-Regular.woff) format("woff")
    }
.lcd-screen {
    background-color: #2b3a0c;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.8), 0 0 15px rgba(106, 190, 48, 0.2);
    font-family: "JetBrains Mono", monospace;
    /* Fallback to JetBrains for better alignment if LCD font is blocked */
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3)
    }
.lcd-text {
    color: #94ad1e;
    letter-spacing: 0.15em
    }
.glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08)
    }
.telegram-bg {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuAy75_UmKnLBF9FAbpirNbOhzUTO3WbSi5Q8qG3AZ0JVzMB_Nw5fPk3QMLOi1Hza16-6qGS3TqFnuT1eYDd9lGmGcvogQZLZBIYCvQRhAbQNuvhVCH9XoSNdUXDTHkGg6wQj_YJjiD92c7iyP9tuVKqU6Uldv0yHvOwV3jw7omDJuIg3fF_L2K5ikHUUTUQdYzLVGr2segvunW6vKHrq_l_9Hi7PCXq6f9oVB3gycT50yz-O0uBYq-mWg);
    background-size: cover;
    background-blend-mode: overlay;
    background-color: rgba(11, 14, 20, 0.95)
    }
.node-wire {
    stroke-dasharray: 8;
    animation: flow 2s linear infinite
    }
@keyframes flow {
    from {
        stroke-dashoffset: 16;
        } to {
        stroke-dashoffset: 0;
        }
    }
.glow-pulse {
    animation: pulse-glow 2s ease-in-out infinite
    }
@keyframes pulse-glow {
    0%, 100% {
        opacity: 0.6;
        box-shadow: 0 0 5px #00d1ff;
        } 50% {
        opacity: 1;
        box-shadow: 0 0 20px #00d1ff;
        }
    }</style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-container": "#feb127",
                    "on-secondary-container": "#613100",
                    "surface-variant": "#32353c",
                    "on-surface-variant": "#bbc9cf",
                    "on-primary": "#003543",
                    "surface-dim": "#10131a",
                    "surface-container-highest": "#32353c",
                    "surface-container-low": "#191c22",
                    "surface-bright": "#363940",
                    "on-background": "#e1e2eb",
                    "primary-fixed-dim": "#4cd6ff",
                    "border-glass": "rgba(255, 255, 255, 0.08)",
                    "on-secondary-fixed": "#2f1500",
                    "primary-fixed": "#b7eaff",
                    "secondary": "#ffb77f",
                    "error-container": "#93000a",
                    "tertiary": "#ffd59c",
                    "primary-container": "#00d1ff",
                    "primary": "#a4e6ff",
                    "on-secondary": "#4e2600",
                    "background": "#10131a",
                    "on-tertiary-fixed": "#291800",
                    "on-tertiary-container": "#6b4700",
                    "inverse-surface": "#e1e2eb",
                    "error": "#ffb4ab",
                    "secondary-container": "#ff8a00",
                    "on-error": "#690005",
                    "on-primary-fixed": "#001f28",
                    "surface-container-high": "#272a31",
                    "tertiary-fixed-dim": "#ffba49",
                    "surface-glass": "rgba(255, 255, 255, 0.03)",
                    "on-tertiary-fixed-variant": "#624000",
                    "on-error-container": "#ffdad6",
                    "surface": "#10131a",
                    "bg-obsidian": "#0B0E14",
                    "on-surface": "#e1e2eb",
                    "inverse-primary": "#00677f",
                    "surface-container": "#1d2026",
                    "on-secondary-fixed-variant": "#6f3900",
                    "outline": "#859399",
                    "error-alert": "#FF3D00",
                    "tertiary-fixed": "#ffddb1",
                    "inverse-on-surface": "#2e3037",
                    "surface-tint": "#4cd6ff",
                    "on-primary-fixed-variant": "#004e60",
                    "on-primary-container": "#00566a",
                    "secondary-fixed": "#ffdcc4",
                    "outline-variant": "#3c494e",
                    "secondary-fixed-dim": "#ffb77f",
                    "on-tertiary": "#442b00",
                    "success-glow": "#00FFC2",
                    "surface-container-lowest": "#0b0e14"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "margin-mobile": "16px",
                    "widget-gap": "16px",
                    "gutter": "24px",
                    "margin-desktop": "32px",
                    "unit": "4px"
            },
            "fontFamily": {
                    "headline-md": ["Inter"],
                    "display-lg": ["Inter"],
                    "label-caps": ["JetBrains Mono"],
                    "data-mono": ["JetBrains Mono"],
                    "body-base": ["Inter"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}],
                    "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
</head>
<body class="bg-bg-obsidian text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-hidden">
<!-- Top Navigation -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
<div class="flex items-center gap-4">
<span class="font-display-lg text-[20px] font-bold text-primary tracking-tighter">DATAVLOW.ID</span>
<div class="h-6 w-[1px] bg-border-glass mx-2"></div>
<div class="flex gap-6">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-body-base text-body-base transition-colors" href="#">Simulation</a>
<a class="text-on-surface-variant hover:text-primary font-body-base text-body-base transition-colors" href="#">Analytics</a>
</div>
</div>
<div class="flex items-center gap-6">
<div class="relative flex items-center bg-surface-container-lowest px-4 py-1.5 rounded-full border border-border-glass">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-2">search</span>
<input class="bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-on-surface-variant w-48" placeholder="Search devices..." type="text"/>
</div>
<div class="flex items-center gap-3">
<button class="material-symbols-outlined p-2 hover:bg-surface-glass rounded-full text-on-surface-variant">translate</button>
<button class="material-symbols-outlined p-2 hover:bg-surface-glass rounded-full text-on-surface-variant">dark_mode</button>
<img class="w-8 h-8 rounded-full border border-primary/30" data-alt="A professional close-up of a high-tech developer avatar in a minimalist neon-lit office setting. The avatar has a clean, futuristic aesthetic with a dark techwear jacket, set against a background of blurred lines of blue and cyan code. The overall lighting is moody and premium, reflecting the dark-mode obsidian theme of the command center interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9a4MtZK4PDtZO2RIA2HVbAQB-8_RBdUuOvRS10Q2Wu8umqFqGURmv04SvGG-qZNf8NQSkjG0UFWTaqEDOGOdXArs5uRTvdVcQkanbt1MQslcYOfnJxAAJUZ5nRHubXDqH3syKuwBOgcivsuDL_-NKDPN9rGMqahg4rVn3ucOf-Og1e9D6PIXeNV-N_J9kbzAXJir_floiwOBWl1N66aOmPsMgeGWFHcFuFfbd4bRcZerTQEr1dvGYg"/>
</div>
</div>
</nav>
<!-- Side Navigation -->
<aside class="fixed left-0 top-0 h-full w-64 bg-bg-obsidian border-r border-border-glass flex flex-col pt-20 pb-8 z-40 hidden md:flex">
<div class="px-6 mb-8">
<div class="flex items-center gap-3 mb-2">
<div class="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container text-[20px]">account_tree</span>
</div>
<div>
<div class="font-headline-md text-[16px] leading-tight text-primary">Command Center</div>
<div class="font-label-caps text-[10px] text-on-surface-variant">ACTIVE NODE: NODE_04</div>
</div>
</div>
</div>
<div class="flex-1 space-y-1">
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-caps">Dashboard</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 bg-surface-glass text-primary border-l-4 border-primary transition-all" href="#">
<span class="material-symbols-outlined">router</span>
<span class="font-label-caps">Devices</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">account_tree</span>
<span class="font-label-caps">Logic Builder</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-caps">Analytics</span>
</a>
<a class="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface transition-all" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-caps">Settings</span>
</a>
</div>
<div class="px-6 space-y-4">
<button class="w-full bg-primary-container text-on-primary-container font-label-caps py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-105 active:scale-95 transition-all">
                ADD DEVICE
            </button>
<div class="pt-4 border-t border-border-glass">
<a class="flex items-center gap-4 py-2 text-on-surface-variant hover:text-on-surface" href="#">
<span class="material-symbols-outlined text-[20px]">help</span>
<span class="font-label-caps">Help</span>
</a>
<a class="flex items-center gap-4 py-2 text-on-surface-variant hover:text-on-surface" href="#">
<span class="material-symbols-outlined text-[20px]">logout</span>
<span class="font-label-caps">Logout</span>
</a>
</div>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-0 md:ml-64 pt-16 h-screen flex flex-col md:flex-row overflow-hidden relative">
<!-- Connection Visualizer Overlay -->
<svg class="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-20">
<path class="node-wire" d="M 400 300 Q 600 300 800 500" fill="none" stroke="#00d1ff" stroke-width="2"></path>
<circle class="glow-pulse" cx="400" cy="300" fill="#00d1ff" r="4"></circle>
<circle class="glow-pulse" cx="800" cy="500" fill="#00d1ff" r="4"></circle>
</svg>
<!-- Left Pane: Hardware LCD Simulation -->
<section class="flex-1 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-bg-obsidian to-surface-container-lowest">
<div class="text-center mb-8">
<h2 class="font-headline-md text-primary mb-2">Simulated Hardware Node</h2>
<p class="font-label-caps text-on-surface-variant">ESP32-WROOM-32 | LCD1602_I2C</p>
</div>
<!-- Hardware Frame -->
<div class="relative p-12 glass-panel rounded-[2rem] shadow-2xl group transition-all duration-500 hover:scale-[1.02]">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-surface-variant px-4 py-1 rounded-full border border-border-glass font-label-caps text-[10px]">DEVICE_ID: DV-7729</div>
<!-- Circuitry Details -->
<div class="absolute top-8 left-8 flex gap-1 opacity-40">
<div class="w-1.5 h-1.5 rounded-full bg-error-alert animate-pulse"></div>
<div class="w-1.5 h-1.5 rounded-full bg-success-glow"></div>
</div>
<!-- LCD Frame -->
<div class="bg-black/80 p-8 rounded-xl border-[6px] border-zinc-800 shadow-inner">
<!-- LCD 16x2 Display -->
<div class="lcd-screen w-[480px] h-[160px] rounded-sm flex flex-col justify-center px-10 gap-2 relative overflow-hidden">
<!-- Scanline Effect -->
<div class="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
<div class="lcd-text font-data-mono text-[42px] leading-tight">pH: 7.2 TDS: 450</div>
<div class="lcd-text font-data-mono text-[42px] leading-tight">Status: BAIK</div>
</div>
</div>
<!-- Control Buttons -->
<div class="mt-8 flex justify-between px-4">
<div class="flex gap-4">
<div class="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 shadow-md cursor-pointer hover:bg-zinc-700 active:translate-y-0.5 transition-all flex items-center justify-center">
<span class="w-4 h-4 rounded-full bg-zinc-600"></span>
</div>
<div class="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 shadow-md cursor-pointer hover:bg-zinc-700 active:translate-y-0.5 transition-all flex items-center justify-center">
<span class="w-4 h-4 rounded-full bg-zinc-600"></span>
</div>
</div>
<div class="flex items-center gap-4">
<span class="font-label-caps text-[10px] text-success-glow">SENSORS ONLINE</span>
<div class="w-12 h-6 bg-zinc-900 rounded-full border border-zinc-700 relative overflow-hidden">
<div class="absolute top-1 left-1 w-4 h-4 bg-success-glow rounded-full shadow-[0_0_10px_#00FFC2]"></div>
</div>
</div>
</div>
</div>
<!-- Telemetry Data -->
<div class="mt-12 grid grid-cols-3 gap-widget-gap w-full max-w-2xl">
<div class="glass-panel p-4 rounded-xl">
<div class="font-label-caps text-[10px] text-on-surface-variant mb-1">UPTIME</div>
<div class="font-data-mono text-primary">124h 12m 04s</div>
</div>
<div class="glass-panel p-4 rounded-xl">
<div class="font-label-caps text-[10px] text-on-surface-variant mb-1">RSSI</div>
<div class="font-data-mono text-primary">-64 dBm</div>
</div>
<div class="glass-panel p-4 rounded-xl">
<div class="font-label-caps text-[10px] text-on-surface-variant mb-1">VOLTAGE</div>
<div class="font-data-mono text-primary">3.31V</div>
</div>
</div>
</section>
<!-- Right Pane: Telegram Messenger Mockup -->
<section class="w-full md:w-[450px] telegram-bg border-l border-border-glass flex flex-col z-20">
<!-- Telegram Header -->
<div class="h-16 bg-[#17212b] border-b border-black/20 px-4 flex items-center gap-4">
<button class="md:hidden material-symbols-outlined text-on-surface-variant">arrow_back</button>
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-inverse-primary flex items-center justify-center text-on-primary font-bold">
<span class="material-symbols-outlined">robot_2</span>
</div>
<div class="flex-1 min-w-0">
<div class="font-semibold text-on-surface truncate">DATAVLOW_BOT</div>
<div class="text-[12px] text-primary">bot</div>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">search</span>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">more_vert</span>
</div>
</div>
<!-- Messages Canvas -->
<div class="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
<div class="mx-auto bg-black/40 backdrop-blur-md px-4 py-1 rounded-full text-[12px] text-on-surface-variant mb-4">
                    Yesterday
                </div>
<!-- Message 1 -->
<div class="flex items-end gap-2 group">
<div class="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center text-[10px] overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A small, circular profile icon for a Telegram bot named DATAVLOW_BOT. The icon features a stylized, neon-blue robot head silhouette on a dark obsidian background, matching the premium tech aesthetic of the entire monitoring system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-baaCbTHwic4Lm2ngbiErt0jewfmcXLnL1rgtTD6uGA9PmVqcO4gwD6KP0k8mIoP088SSlClE_DZsBCO8UOCXosukszp7tJNi-CkdXI91Eam43AzJpZTm4iWqq6jwlCHVBVpeLH7UoQn_rBQoiA-IH3owRVPQBCu0ucU6KFZogZY-bNBFQWaGCADnI9YBYMdCJKoQmcTKFE6nx7ZZ0KVyZs4sSwml8KO7PeQ22gd9bfLU6mVzultS5g"/>
</div>
<div class="max-w-[85%] bg-[#182533] p-3 rounded-2xl rounded-bl-none border border-white/5 relative shadow-lg">
<div class="font-semibold text-primary text-[14px] mb-1">DATAVLOW_BOT</div>
<div class="text-[15px] leading-snug">⚠️ Alert: pH level stable at 7.2</div>
<div class="text-[11px] text-on-surface-variant text-right mt-1">14:20</div>
</div>
</div>
<!-- Message 2 -->
<div class="flex items-end gap-2 self-end group">
<div class="max-w-[85%] bg-[#2b5278] p-3 rounded-2xl rounded-br-none border border-white/10 relative shadow-lg">
<div class="text-[15px] leading-snug">Status update request...</div>
<div class="text-[11px] text-white/60 text-right mt-1 flex items-center justify-end gap-1">
                            14:21 <span class="material-symbols-outlined text-[14px]">done_all</span>
</div>
</div>
</div>
<!-- Message 3 (Today) -->
<div class="mx-auto bg-black/40 backdrop-blur-md px-4 py-1 rounded-full text-[12px] text-on-surface-variant my-4">
                    Today
                </div>
<!-- Message 4 -->
<div class="flex items-end gap-2">
<div class="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center text-[10px] overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A clean, minimalist 3D rendering of a technical alert icon for a digital bot. The icon is a vibrant electric blue robot head with glowing green eyes, signifying a healthy and operational system state. It is set against a dark, slightly reflective surface, consistent with a high-end command center aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-iO3N3og2AdgxngFxoAXv40FcdV9bzDzZ73as1xKPLGHGUuYeP1Qio35bX88vxOvc3ffk20ZCI9Voj7M3Tdj2C70ETh60eo4VJQDEbjLO3YfzBXHR0R32hVCVOnjY1tN618b2MWuBJ7Db-cn1MqxGsailgezr_mCF0TOGhKfcElvO7VeXMFmsf8Y2BQuml-c4R6PRqynAT3GVItDQquBmSu-B9ZDbx8R_XpmH3yzTL562MwYPA7aFCw"/>
</div>
<div class="max-w-[85%] bg-[#182533] p-3 rounded-2xl rounded-bl-none border border-white/5 relative shadow-lg">
<div class="font-semibold text-primary text-[14px] mb-1">DATAVLOW_BOT</div>
<div class="text-[15px] leading-snug">✅ System: All sensors operational</div>
<div class="text-[11px] text-on-surface-variant text-right mt-1">09:45</div>
</div>
</div>
<!-- Message 5 -->
<div class="flex items-end gap-2">
<div class="w-8 h-8 rounded-full opacity-0 flex-shrink-0"></div>
<div class="max-w-[85%] bg-[#182533] p-3 rounded-2xl rounded-bl-none border border-white/5 relative shadow-lg">
<div class="text-[15px] leading-snug">Daily report is ready. Would you like to view the summary?</div>
<div class="mt-3 flex gap-2">
<button class="bg-[#242f3d] hover:bg-[#2b3a4d] text-primary px-3 py-1.5 rounded-lg text-sm border border-primary/20 transition-colors">Yes, show me</button>
<button class="bg-[#242f3d] hover:bg-[#2b3a4d] text-on-surface-variant px-3 py-1.5 rounded-lg text-sm transition-colors">Not now</button>
</div>
<div class="text-[11px] text-on-surface-variant text-right mt-1">09:45</div>
</div>
</div>
</div>
<!-- Telegram Input -->
<div class="p-3 bg-[#17212b] flex items-center gap-3">
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">attach_file</span>
<div class="flex-1 bg-[#242f3d] rounded-xl px-4 py-2 border border-white/5">
<input class="bg-transparent border-none outline-none text-sm w-full text-on-surface placeholder:text-on-surface-variant" placeholder="Write a message..." type="text"/>
</div>
<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg cursor-pointer hover:scale-105 transition-transform">
<span class="material-symbols-outlined">send</span>
</div>
</div>
</section>
</main>
<!-- FAB for Device Actions -->
<button class="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)] z-50 hover:rotate-90 transition-transform duration-500">
<span class="material-symbols-outlined text-[28px]">add</span>
</button>
<script>
        // Micro-interaction for LCD flicker
        const lcd = document.querySelector('.lcd-screen');
        setInterval(() => {
            if (Math.random() > 0.98) {
                lcd.style.opacity = '0.8';
                setTimeout(() => lcd.style.opacity = '1', 50);
            }
        }, 100);

        // Simple typing effect for simulation feel
        const messages = [
            "pH: 7.2 TDS: 450",
            "pH: 7.1 TDS: 452",
            "pH: 7.2 TDS: 448"
        ];
        let index = 0;
        const line1 = document.querySelector('.lcd-text:first-child');
        
        setInterval(() => {
            index = (index + 1) % messages.length;
            line1.textContent = messages[index];
        }, 5000);
    </script>
</body></html>

<!-- Hardware & Alerts Simulation -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DATAVLOW.ID | Water Quality Ledger</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        :root {
            --obsidian: #0B0E14;
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --primary-glow: rgba(0, 209, 255, 0.3);
        }

        body {
            background-color: var(--obsidian);
            color: #e1e2eb;
            overflow-x: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .glass-panel {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
        }

        .subpixel-border {
            border: 0.5px solid var(--glass-border);
        }

        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track {
            background: var(--obsidian);
        }

        ::-webkit-scrollbar-thumb {
            background: #32353c;
            border-radius: 10px;
        }

        .status-glow-baik {
            box-shadow: 0 0 12px rgba(0, 255, 194, 0.2);
            border: 1px solid rgba(0, 255, 194, 0.4);
        }

        .status-glow-cukup {
            box-shadow: 0 0 12px rgba(254, 177, 39, 0.2);
            border: 1px solid rgba(254, 177, 39, 0.4);
        }

        .status-glow-tidak {
            box-shadow: 0 0 12px rgba(255, 61, 0, 0.2);
            border: 1px solid rgba(255, 61, 0, 0.4);
        }

        .data-row:hover {
            background: rgba(255, 255, 255, 0.02);
            border-left: 2px solid #a4e6ff;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "tertiary-container": "#feb127",
                      "on-secondary-container": "#613100",
                      "surface-variant": "#32353c",
                      "on-surface-variant": "#bbc9cf",
                      "on-primary": "#003543",
                      "surface-dim": "#10131a",
                      "surface-container-highest": "#32353c",
                      "surface-container-low": "#191c22",
                      "surface-bright": "#363940",
                      "on-background": "#e1e2eb",
                      "primary-fixed-dim": "#4cd6ff",
                      "border-glass": "rgba(255, 255, 255, 0.08)",
                      "on-secondary-fixed": "#2f1500",
                      "primary-fixed": "#b7eaff",
                      "secondary": "#ffb77f",
                      "error-container": "#93000a",
                      "tertiary": "#ffd59c",
                      "primary-container": "#00d1ff",
                      "primary": "#a4e6ff",
                      "on-secondary": "#4e2600",
                      "background": "#10131a",
                      "on-tertiary-fixed": "#291800",
                      "on-tertiary-container": "#6b4700",
                      "inverse-surface": "#e1e2eb",
                      "error": "#ffb4ab",
                      "secondary-container": "#ff8a00",
                      "on-error": "#690005",
                      "on-primary-fixed": "#001f28",
                      "surface-container-high": "#272a31",
                      "tertiary-fixed-dim": "#ffba49",
                      "surface-glass": "rgba(255, 255, 255, 0.03)",
                      "on-tertiary-fixed-variant": "#624000",
                      "on-error-container": "#ffdad6",
                      "surface": "#10131a",
                      "bg-obsidian": "#0B0E14",
                      "on-surface": "#e1e2eb",
                      "inverse-primary": "#00677f",
                      "surface-container": "#1d2026",
                      "on-secondary-fixed-variant": "#6f3900",
                      "outline": "#859399",
                      "error-alert": "#FF3D00",
                      "tertiary-fixed": "#ffddb1",
                      "inverse-on-surface": "#2e3037",
                      "surface-tint": "#4cd6ff",
                      "on-primary-fixed-variant": "#004e60",
                      "on-primary-container": "#00566a",
                      "secondary-fixed": "#ffdcc4",
                      "outline-variant": "#3c494e",
                      "secondary-fixed-dim": "#ffb77f",
                      "on-tertiary": "#442b00",
                      "success-glow": "#00FFC2",
                      "surface-container-lowest": "#0b0e14"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "margin-mobile": "16px",
                      "widget-gap": "16px",
                      "gutter": "24px",
                      "margin-desktop": "32px",
                      "unit": "4px"
              },
              "fontFamily": {
                      "headline-md": ["Inter"],
                      "display-lg": ["Inter"],
                      "label-caps": ["JetBrains Mono"],
                      "data-mono": ["JetBrains Mono"],
                      "body-base": ["Inter"]
              },
              "fontSize": {
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500"}],
                      "data-mono": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "body-base": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
              }
            },
          },
        }
      </script>
</head>
<body class="bg-bg-obsidian">
<!-- Sidebar Navigation Shell -->
<nav class="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-50">
<div class="px-6 mb-10">
<h1 class="font-headline-md text-headline-md text-primary tracking-tight">DATAVLOW.ID</h1>
<p class="font-label-caps text-label-caps text-on-surface-variant opacity-60">Command Center</p>
</div>
<div class="flex-1 px-4 space-y-2">
<a class="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
<span class="material-symbols-outlined text-xl">dashboard</span>
<span class="font-label-caps text-label-caps">Dashboard</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
<span class="material-symbols-outlined text-xl">router</span>
<span class="font-label-caps text-label-caps">Devices</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
<span class="material-symbols-outlined text-xl">account_tree</span>
<span class="font-label-caps text-label-caps">Logic Builder</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded bg-surface-glass text-primary border-l-4 border-primary translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">analytics</span>
<span class="font-label-caps text-label-caps">Analytics</span>
</a>
<a class="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
<span class="material-symbols-outlined text-xl">settings</span>
<span class="font-label-caps text-label-caps">Settings</span>
</a>
</div>
<div class="px-4 mt-auto space-y-2">
<button class="w-full bg-primary-container text-on-primary-fixed font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-[1.02] transition-transform">
<span class="material-symbols-outlined">add</span>
<span class="font-label-caps text-label-caps">Add Device</span>
</button>
<div class="pt-6 border-t border-border-glass">
<a class="flex items-center space-x-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined text-lg">help</span>
<span class="font-label-caps text-label-caps">Help</span>
</a>
<a class="flex items-center space-x-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
<span class="material-symbols-outlined text-lg">logout</span>
<span class="font-label-caps text-label-caps">Logout</span>
</a>
</div>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="ml-64 min-h-screen p-margin-desktop">
<!-- Header & Export Bar -->
<header class="flex justify-between items-end mb-8">
<div>
<h2 class="font-headline-md text-headline-md text-on-surface">Historical Ledger</h2>
<p class="font-body-base text-body-base text-on-surface-variant mt-1">Water quality node telemetry streams for regional sector-7G.</p>
</div>
<div class="glass-panel rounded-lg p-1.5 flex items-center space-x-2">
<span class="font-label-caps text-label-caps px-3 text-on-surface-variant/70">EXPORT</span>
<div class="h-4 w-[1px] bg-border-glass"></div>
<button class="px-4 py-2 font-label-caps text-label-caps rounded-md text-on-surface hover:bg-surface-variant transition-colors flex items-center space-x-2">
<span class="material-symbols-outlined text-sm">description</span>
<span>CSV</span>
</button>
<button class="px-4 py-2 font-label-caps text-label-caps rounded-md text-on-surface hover:bg-surface-variant transition-colors flex items-center space-x-2">
<span class="material-symbols-outlined text-sm">picture_as_pdf</span>
<span>PDF</span>
</button>
<button class="px-4 py-2 font-label-caps text-label-caps rounded-md text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors flex items-center space-x-2">
<span class="material-symbols-outlined text-sm">code</span>
<span>JSON</span>
</button>
</div>
</header>
<!-- Stats Overview Row -->
<div class="grid grid-cols-4 gap-widget-gap mb-8">
<div class="glass-panel p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-5xl">water_drop</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-2">AVG PH LEVEL</p>
<p class="font-headline-md text-headline-md text-primary">7.24 <span class="text-xs text-on-surface-variant font-normal tracking-normal ml-1">pH</span></p>
<div class="mt-4 flex items-center text-success-glow text-xs font-medium">
<span class="material-symbols-outlined text-sm mr-1">trending_up</span>
<span>Stable (Nominal)</span>
</div>
</div>
<div class="glass-panel p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-5xl">opacity</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-2">TDS AGGREGATE</p>
<p class="font-headline-md text-headline-md text-secondary">312 <span class="text-xs text-on-surface-variant font-normal tracking-normal ml-1">ppm</span></p>
<div class="mt-4 flex items-center text-tertiary-container text-xs font-medium">
<span class="material-symbols-outlined text-sm mr-1">warning</span>
<span>Slight Increase</span>
</div>
</div>
<div class="glass-panel p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-5xl">thermostat</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-2">MEAN TEMPERATURE</p>
<p class="font-headline-md text-headline-md text-primary">24.8 <span class="text-xs text-on-surface-variant font-normal tracking-normal ml-1">°C</span></p>
<div class="mt-4 flex items-center text-success-glow text-xs font-medium">
<span class="material-symbols-outlined text-sm mr-1">check_circle</span>
<span>Controlled</span>
</div>
</div>
<div class="glass-panel p-6 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-5xl">sensors</span>
</div>
<p class="font-label-caps text-label-caps text-on-surface-variant mb-2">ACTIVE NODES</p>
<p class="font-headline-md text-headline-md text-primary">12 <span class="text-xs text-on-surface-variant font-normal tracking-normal ml-1">Online</span></p>
<div class="mt-4 flex items-center text-on-surface-variant text-xs font-medium">
<span class="material-symbols-outlined text-sm mr-1">sync</span>
<span>Last Sync: 2m ago</span>
</div>
</div>
</div>
<!-- High-Density Data Ledger -->
<div class="glass-panel rounded-xl overflow-hidden mb-12">
<div class="px-6 py-4 border-b border-border-glass bg-surface-glass flex justify-between items-center">
<div class="flex items-center space-x-4">
<span class="material-symbols-outlined text-on-surface-variant">drag_indicator</span>
<h3 class="font-label-caps text-label-caps text-on-surface">Data Stream Ledger</h3>
</div>
<div class="flex items-center space-x-3">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input class="bg-obsidian border-border-glass rounded text-sm pl-10 pr-4 py-1.5 w-48 focus:border-primary-container focus:ring-0 transition-all placeholder:text-on-surface-variant/40" placeholder="Search Node ID..." type="text"/>
</div>
<button class="p-1.5 rounded hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">filter_list</span>
</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-lowest">
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">Timestamp</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">Node ID</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">pH</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">TDS (ppm)</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">Turbidity</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">Temp (°C)</th>
<th class="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">Status</th>
</tr>
</thead>
<tbody class="divide-y divide-border-glass/50" id="data-ledger-body">
<!-- Rows generated via JS for density -->
</tbody>
</table>
</div>
<!-- Footer Pagination -->
<div class="px-6 py-4 border-t border-border-glass bg-surface-glass flex justify-between items-center">
<p class="font-label-caps text-[10px] text-on-surface-variant">Showing 25 of 4,821 recorded telemetries</p>
<div class="flex items-center space-x-1">
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-variant disabled:opacity-30" disabled="">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="px-3 py-1 rounded bg-primary/20 text-primary font-data-mono text-xs border border-primary/30">1</button>
<button class="px-3 py-1 rounded hover:bg-surface-variant font-data-mono text-xs">2</button>
<button class="px-3 py-1 rounded hover:bg-surface-variant font-data-mono text-xs">3</button>
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-variant">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
<!-- Visual Highlight Section -->
<div class="grid grid-cols-3 gap-widget-gap">
<div class="col-span-2 glass-panel p-6 rounded-xl h-64 relative overflow-hidden">
<div class="absolute inset-0 z-0 opacity-20 pointer-events-none">

</div>
<div class="relative z-10">
<h4 class="font-label-caps text-label-caps text-on-surface-variant mb-1">Live Telemetry Map</h4>
<p class="font-body-base text-body-base text-on-surface">Regional Sector Distribution - Indonesia Central</p>
</div>
<div class="absolute bottom-6 right-6 z-10 flex space-x-2">
<div class="flex items-center space-x-2 bg-obsidian/80 backdrop-blur border border-border-glass px-3 py-1 rounded-full">
<div class="w-2 h-2 rounded-full bg-success-glow animate-pulse"></div>
<span class="font-label-caps text-[10px]">Real-time Tracking</span>
</div>
</div>
</div>
<div class="glass-panel p-0 rounded-xl overflow-hidden relative">
<div class="w-full h-full bg-cover bg-center absolute inset-0" data-alt="A futuristic satellite view of a lush archipelago with high-tech glowing network nodes connected by neon blue data lines. The lighting is deep evening with high contrast between dark landmasses and bioluminescent sensor clusters. The overall aesthetic is clean, expensive, and cyber-minimalist with a cold blue color grading." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbRMShkbBmQMKEwC2f1qKKpSO-NG9J6MMz5Uzk_pSHVoFQfOc4aX4eT_DonxyzTH8SIQd_lJsb0VnP1zPtcm_nFiwt1gLwp9enfi3VIw2PS8H-Dzi7_6sU8D2_llXnF9MaVKQRgA8gKl2n3wVkgKBODJ5A2Hhe_CL8RejhxAu1rKgau7CkjqSqhSIRiLCiUlUpo0HC10PoZmgAElAJ4XSQhTDJBdyOIlaF_V6oMw2J2-G7-PujFMxT7g')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-transparent to-transparent"></div>
<div class="absolute bottom-0 left-0 p-6">
<h4 class="font-label-caps text-label-caps text-primary">Spatial Node View</h4>
<p class="font-label-caps text-[10px] text-on-surface-variant">Satellite Imagery Overlay v4.2</p>
</div>
</div>
</div>
</main>
<script>
        const tableBody = document.getElementById('data-ledger-body');
        const nodes = ['NODE-A1', 'NODE-A2', 'NODE-B7', 'NODE-C4', 'NODE-G9'];
        const statuses = [
            { label: 'Baik', class: 'status-glow-baik text-success-glow bg-success-glow/10' },
            { label: 'Cukup Baik', class: 'status-glow-cukup text-tertiary-container bg-tertiary-container/10' },
            { label: 'Tidak Baik', class: 'status-glow-tidak text-error-alert bg-error-alert/10' }
        ];

        function generateData() {
            let rows = '';
            const now = new Date();

            for (let i = 0; i < 25; i++) {
                const time = new Date(now - (i * 1000 * 60 * 12));
                const ph = (6.5 + Math.random() * 1.5).toFixed(2);
                const tds = Math.floor(250 + Math.random() * 150);
                const turbidity = (0.5 + Math.random() * 4).toFixed(2);
                const temp = (23 + Math.random() * 3).toFixed(1);
                const node = nodes[Math.floor(Math.random() * nodes.length)];
                
                let status;
                if (ph > 6.8 && ph < 7.6 && tds < 350) status = statuses[0];
                else if (ph < 6.0 || ph > 8.0 || tds > 450) status = statuses[2];
                else status = statuses[1];

                rows += `
                    <tr class="data-row transition-all group">
                        <td class="px-6 py-3 font-data-mono text-data-mono text-on-surface-variant">${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} <span class="opacity-30 ml-2">/ ${time.toLocaleDateString()}</span></td>
                        <td class="px-6 py-3 font-data-mono text-data-mono text-primary font-medium tracking-wider">${node}</td>
                        <td class="px-6 py-3 font-data-mono text-data-mono text-on-surface">${ph}</td>
                        <td class="px-6 py-3 font-data-mono text-data-mono text-on-surface">${tds}</td>
                        <td class="px-6 py-3 font-data-mono text-data-mono text-on-surface">${turbidity} NTU</td>
                        <td class="px-6 py-3 font-data-mono text-data-mono text-on-surface">${temp}°</td>
                        <td class="px-6 py-3">
                            <span class="px-3 py-1 rounded-full font-label-caps text-[10px] uppercase tracking-widest ${status.class}">
                                ${status.label}
                            </span>
                        </td>
                    </tr>
                `;
            }
            tableBody.innerHTML = rows;
        }

        generateData();
    </script>
</body></html>