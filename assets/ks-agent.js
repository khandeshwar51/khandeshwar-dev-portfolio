/**
 * KS Thinking Agent — Khandeshwar Suryavanshi's Intelligent Portfolio AI
 * Autonomous multi-step reasoning agent with live GitHub telemetry,
 * dynamic multi-turn LLM reasoning, strict security guardrails,
 * and client-side zero-downtime fallback.
 */
(function () {
  'use strict';

  // Prevent multiple injections
  if (window.__KS_AGENT_INITIALIZED__) return;
  window.__KS_AGENT_INITIALIZED__ = true;

  // ==========================================
  // 1. KHANDESHWAR'S VERIFIED KNOWLEDGE BASE
  // ==========================================
  const KS_PROFILE = {
    name: "Khandeshwar Suryavanshi",
    handle: "khandeshwar51",
    role: "AI Systems Engineer & Full-Stack Architect",
    education: "B.Sc. Computer Science at Vartak College (University of Mumbai)",
    location: "Vasai, Mumbai Metropolitan Region, Maharashtra, India",
    email: "khandeshwarsuryavanshi@gmail.com",
    github: "https://github.com/khandeshwar51",
    linkedin: "https://www.linkedin.com/in/khandeshwar-suryavanshi-10612623b",
    portfolio: "https://khandeshwar51.netlify.app",
    status: "Open for Software Engineering Roles, Internships & High-Impact Collaborations",
    coreStack: [
      "AI Systems Design", "C++", "Python", "TypeScript", "React.js",
      "Tailwind CSS", "Chrome Extensions (Manifest V3)", "SQL / PostgreSQL",
      "Vite", "IndexedDB", "Node.js", "n8n Automation", "Technical SEO"
    ],
    securityMatrix20: {
      layer1: ["SQLi Prevention (Parameterized Queries & ORMs)", "XSS Blocking & DOMPurify Sanitization", "CSRF Protection & SameSite Cookies", "Strict File Upload Validation (Magic Bytes & Isolated Buckets)", "SSRF Auditing (URL Allowlists & Loopback Blocking)"],
      layer2: ["BOLA / IDOR Fix (Strict Server-Side Ownership Checks)", "Rate Limiting (Redis Token-Bucket)", "Cryptographic Password Hashing (Argon2id & bcrypt)", "Multi-Factor Authentication (MFA / 2FA TOTP)", "Server-Side RBAC Permissions", "Database Row-Level Security (RLS)"],
      layer3: ["256-bit High-Entropy JWT Secrets", "Server-Side Private API Key Isolation (Zero Client Bundling)", "HttpOnly & Secure Cookies (Zero Tokens in LocalStorage)", "Default Credentials Replacement"],
      layer4: ["Strict Origin CORS Whitelisting", "Webhook HMAC-SHA256 Signature Verification", "Production Source Map Obfuscation", "Sanitized Production Logs (Zero PII/Tokens)", "Automated Dependency CVE Auditing (npm audit / Snyk)"]
    },
    flagships: [
      {
        name: "ScrollGuard",
        badge: "AI Wellbeing & Focus Platform",
        scope: "Privacy-first behavioral intervention engine that detects and stops compulsive short-form doomscrolling (Instagram Reels, YouTube Shorts, TikTok, X).",
        tech: "TypeScript, React, Manifest V3, IndexedDB, Dopamine Scoring Heuristics",
        repo: "https://github.com/khandeshwar51/scrollguard",
        howHeUsesIt: [
          "Overcomes Manifest V3 ephemeral service worker termination limits using resilient client-side IndexedDB caching.",
          "Monitors DOM scroll velocity at 60fps with zero external cloud surveillance.",
          "Implements progressive cognitive friction ladders (cooldown overlays, intention checks) to return users to productive flow."
        ]
      },
      {
        name: "Modern Portfolio & KS Thinking Agent",
        badge: "Autonomous AI Representative",
        scope: "High-performance developer platform featuring live GitHub telemetry synchronization, keyless cognitive LLM inference, and multi-step reasoning.",
        tech: "React, Tailwind CSS, Vite, Vanilla JS, Keyless LLM Inference",
        repo: "https://github.com/khandeshwar51/portfolio",
        howHeUsesIt: [
          "Dual-engine AI architecture connecting to live cloud LLM inference and GitHub REST APIs.",
          "Schema.org JSON-LD microdata and semantic crawl hierarchy for Google Search ranking.",
          "Optimized asset bundles and critical rendering path to achieve sub-1.2s First Contentful Paint."
        ]
      }
    ],
    clientWork: [
      {
        name: "Balaji Earthmovers",
        scope: "Heavy Earthmoving & Civil Engineering Platform (Est. 1991)",
        live: "https://balajiearthmoversmumbai.com",
        repo: "https://github.com/pratik1258m/Balaji-Earthmovers",
        tech: "React, Tailwind CSS, Interactive UI, Technical SEO",
        howHeUsesIt: "Engineered sticky scroll-pinned machinery storytelling, Komatsu/Volvo fleet specification sheets, landmark project ledger, and interactive excavation volume calculator achieving sub-1.2s LCP load time."
      },
      {
        name: "Balaji Farm Stay",
        scope: "Tourism & Agro-Hospitality Portal",
        live: "https://pratik1258m.github.io/Balajifarm/",
        repo: "https://github.com/pratik1258m/Balajifarm",
        tech: "Responsive Web, WhatsApp Funnels, Technical SEO",
        howHeUsesIt: "Conversion-optimized responsive UI with visual gallery and direct WhatsApp booking inquiry funnel resulting in +40% booking conversion."
      },
      {
        name: "Riverside Farm",
        scope: "Real Estate & Farm Stay Portal",
        live: "https://pratik1258m.github.io/Riverside/",
        repo: "https://github.com/pratik1258m/Riverside",
        tech: "Mobile-First, Lead Funnels, Google Search Console",
        howHeUsesIt: "Mobile-first booking portal with speed-optimized UI, automated lead capture funnels, and Google Search Console indexing."
      },
      {
        name: "Yamuna Enterprises",
        scope: "Industrial Oil Machinery Catalog",
        repo: "https://github.com/pratik1258m/Yamuna_Enterprises",
        tech: "Industrial Catalog, Technical SEO, Performance Optimization",
        howHeUsesIt: "Engineered responsive industrial machinery catalog, structured product presentation, and custom domain routing."
      },
      {
        name: "Vaity Aqua Resort",
        scope: "Hospitality & Attraction Platform",
        repo: "https://github.com/pratik1258m/vaity_resort",
        tech: "Modern UI/UX, High-Performance Asset Optimization",
        howHeUsesIt: "Interactive attraction showcase, inquiry workflows, and high-performance asset loading."
      },
      {
        name: "VidScript Web",
        scope: "AI Video-to-Document & Intelligent Transcription",
        tech: "Python, Groq LLM API, n8n Automation, NLP Pipelines",
        howHeUsesIt: "Automated end-to-end pipeline for audio extraction, verbatim transcript generation, executive AI summaries via Groq LLMs, and multi-format export (PDF, DOCX, Excel)."
      },
      {
        name: "Real Estate Intelligence",
        scope: "Automated Real Estate News Intelligence & Distribution Platform",
        repo: "https://github.com/pratik1258m/realestate",
        tech: "Python, Groq AI LLM, Node.js, WhatsApp API, Resend API, jsPDF",
        howHeUsesIt: "Engineered automated pipeline scraping 500+ daily articles from 32 RSS feeds, Jaccard similarity deduplication, Groq AI LLM summaries, automated 8:00 AM WhatsApp and Email broadcasts, and dynamic branded PDF reports."
      }
    ]
  };

  // State Management
  let isChatOpen = false;
  let isThinking = false;
  let isMuted = true; // Muted by default
  let chatHistory = []; // Multi-turn memory: [{role: 'user'|'assistant', content: string}]
  
  let liveGitHubData = {
    synced: false,
    publicRepos: 5,
    latestCommit: "Automated engineering journal sync & telemetry update",
    latestRepo: "portfolio",
    latestTime: "recently",
    contributions: "1,006+ green contributions (1-year streak)",
    recentRepos: ["scrollguard", "portfolio", "khandeshwar51"],
    readmeBio: ""
  };

  // ==========================================
  // 2. LIVE MULTI-SOURCE TELEMETRY ENGINE
  // ==========================================
  async function fetchLiveGitHubTelemetry() {
    try {
      // 1. Fetch user profile
      const userPromise = fetch('https://api.github.com/users/khandeshwar51').then(r => r.ok ? r.json() : null).catch(() => null);
      
      // 2. Fetch public events (latest commits)
      const eventsPromise = fetch('https://api.github.com/users/khandeshwar51/events/public?per_page=10').then(r => r.ok ? r.json() : null).catch(() => null);
      
      // 3. Fetch recently pushed repos
      const reposPromise = fetch('https://api.github.com/users/khandeshwar51/repos?sort=pushed&per_page=6').then(r => r.ok ? r.json() : null).catch(() => null);
      
      // 4. Fetch live raw profile README
      const readmePromise = fetch('https://raw.githubusercontent.com/khandeshwar51/khandeshwar51/main/README.md').then(r => r.ok ? r.text() : '').catch(() => '');

      const [userData, events, repos, readme] = await Promise.all([userPromise, eventsPromise, reposPromise, readmePromise]);

      if (userData) {
        liveGitHubData.publicRepos = userData.public_repos || liveGitHubData.publicRepos;
      }

      if (events && Array.isArray(events)) {
        const pushEvent = events.find(e => e.type === 'PushEvent');
        if (pushEvent) {
          liveGitHubData.latestRepo = pushEvent.repo ? pushEvent.repo.name.replace('khandeshwar51/', '') : 'portfolio';
          if (pushEvent.payload && pushEvent.payload.commits && pushEvent.payload.commits.length > 0) {
            liveGitHubData.latestCommit = pushEvent.payload.commits[0].message.split('\n')[0];
          } else {
            liveGitHubData.latestCommit = "Updated repository via main branch push";
          }
          const eventDate = new Date(pushEvent.created_at);
          liveGitHubData.latestTime = timeAgo(eventDate);
          liveGitHubData.synced = true;
        }
      }

      if (repos && Array.isArray(repos)) {
        liveGitHubData.recentRepos = repos.map(r => r.name);
      }

      if (readme) {
        liveGitHubData.readmeBio = readme.slice(0, 1500); // snapshot for context
      }

      updateRibbon();
    } catch (e) {
      console.log('[KS Agent] Background telemetry sync using local snapshot.');
    }
  }

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 3600);
    if (interval >= 24) return Math.floor(interval / 24) + " days ago";
    if (interval >= 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " mins ago";
    return "just now";
  }

  // ==========================================
  // 3. UI INJECTION & STYLES
  // ==========================================
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    #ks-agent-root {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f1f5f9;
      -webkit-font-smoothing: antialiased;
    }

    /* Compact Futuristic Silver Metallic Robot Head Launcher */
    #ks-agent-launcher {
      position: relative;
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: linear-gradient(145deg, #1e293b 0%, #0f172a 45%, #02090d 100%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.8px solid #94a3b8;
      box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.9),
                  0 0 25px rgba(0, 229, 229, 0.35),
                  inset 0 1px 1px rgba(255, 255, 255, 0.4),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
      animation: ks-robot-float 6s ease-in-out infinite alternate;
    }

    #ks-agent-launcher:hover {
      transform: translateY(-4px) scale(1.07);
      border-color: #00E5E5;
      box-shadow: 0 18px 40px -5px rgba(0, 0, 0, 0.95),
                  0 0 35px rgba(0, 229, 229, 0.7),
                  inset 0 1px 2px rgba(255, 255, 255, 0.6);
    }

    #ks-agent-launcher:active {
      transform: translateY(-1px) scale(0.98);
    }

    /* Permanent Futuristic Glass Badge above Launcher */
    .ks-robot-pill-badge {
      position: absolute;
      bottom: calc(100% + 9px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(7, 23, 29, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 229, 229, 0.35);
      padding: 4px 11px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      color: #F1F5F9;
      letter-spacing: 0.02em;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.65), 0 0 12px rgba(0, 229, 229, 0.2);
    }

    .ks-robot-icon-wrap {
      position: relative;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ks-robot-svg {
      width: 44px;
      height: 44px;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 12px rgba(0, 229, 229, 0.45));
      transition: transform 0.25s ease;
    }

    #ks-agent-launcher:hover .ks-robot-svg {
      transform: scale(1.06);
    }

    /* Small Pulsing Online Status Indicator */
    .ks-robot-online-dot {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #10b981;
      border: 2px solid #02090D;
      box-shadow: 0 0 8px #10b981;
      animation: ks-dot-pulse 2.4s infinite;
    }

    @keyframes ks-dot-pulse {
      0%, 100% {
        box-shadow: 0 0 6px #10b981;
        opacity: 1;
      }
      50% {
        box-shadow: 0 0 12px #10b981, 0 0 4px #00E5A3;
        opacity: 0.85;
      }
    }

    /* Sleek Hover Tooltip */
    .ks-robot-tooltip {
      position: absolute;
      right: 68px;
      top: 50%;
      transform: translateY(-50%) translateX(8px);
      background: rgba(10, 14, 26, 0.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(56, 189, 248, 0.35);
      padding: 6px 12px;
      border-radius: 9px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.75), 0 0 18px rgba(56, 189, 248, 0.2);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ks-tooltip-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: 0.02em;
    }

    .ks-tooltip-sub {
      font-size: 9.5px;
      color: #38bdf8;
    }

    #ks-agent-launcher:hover .ks-robot-tooltip {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }

    /* Robot Animations */
    @keyframes ks-robot-float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(2px); }
    }

    @keyframes ks-robot-blink {
      0%, 46%, 50%, 96%, 100% {
        transform: scaleY(1);
        opacity: 1;
      }
      48%, 98% {
        transform: scaleY(0.1);
        opacity: 0.25;
      }
    }

    .ks-robot-eyes {
      transform-origin: 22px 20px;
      animation: ks-robot-blink 4.8s infinite;
    }

    #ks-agent-window {
      position: fixed;
      bottom: 88px;
      right: 24px;
      width: 420px;
      max-width: calc(100vw - 32px);
      height: 640px;
      max-height: calc(100vh - 110px);
      background: linear-gradient(180deg, rgba(7, 23, 29, 0.96) 0%, rgba(2, 9, 13, 0.98) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(0, 229, 229, 0.35);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9),
                  0 0 35px rgba(0, 229, 229, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: translateY(18px) scale(0.96);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #ks-agent-window.ks-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .ks-header {
      padding: 13px 18px;
      background: linear-gradient(135deg, rgba(10, 30, 38, 0.9) 0%, rgba(6, 18, 24, 0.98) 100%);
      border-bottom: 1px solid rgba(0, 229, 229, 0.18);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ks-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ks-header-robot-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ks-header-title {
      font-size: 14px;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: 0.2px;
    }

    .ks-header-status {
      font-size: 11px;
      color: #00E5E5;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .ks-status-indicator {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 6px #10b981;
    }

    .ks-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .ks-header-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(0, 229, 229, 0.2);
      color: #94a3b8;
      border-radius: 8px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }

    .ks-header-btn:hover {
      background: rgba(0, 229, 229, 0.15);
      color: #ffffff;
      border-color: #00E5E5;
    }

    .ks-live-ribbon {
      background: linear-gradient(90deg, rgba(0, 207, 255, 0.12), rgba(0, 143, 156, 0.12));
      border-bottom: 1px solid rgba(0, 229, 229, 0.2);
      padding: 6px 16px;
      font-size: 11px;
      color: #00E5E5;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ks-live-ribbon a {
      color: #00CFFF;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }

    .ks-live-ribbon a:hover {
      color: #00E5E5;
      text-decoration: underline;
    }

    .ks-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scroll-behavior: smooth;
    }

    .ks-messages::-webkit-scrollbar {
      width: 5px;
    }

    .ks-messages::-webkit-scrollbar-thumb {
      background: rgba(0, 229, 229, 0.25);
      border-radius: 10px;
    }

    .ks-msg {
      display: flex;
      flex-direction: column;
      max-width: 90%;
      animation: ksFadeIn 0.25s ease-out;
    }

    @keyframes ksFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ks-msg-user {
      align-self: flex-end;
    }

    .ks-msg-user .ks-bubble {
      background: linear-gradient(135deg, #00CFFF, #008F9C);
      color: #02090D;
      font-weight: 600;
      border-radius: 16px 16px 4px 16px;
      padding: 10px 14px;
      font-size: 13px;
      line-height: 1.45;
      box-shadow: 0 4px 14px rgba(0, 229, 229, 0.35);
    }

    .ks-msg-bot {
      align-self: flex-start;
      max-width: 94%;
    }

    .ks-msg-bot .ks-bubble {
      background: rgba(7, 23, 29, 0.9);
      border: 1px solid rgba(0, 229, 229, 0.25);
      color: #F1F5F9;
      border-radius: 16px 16px 16px 4px;
      padding: 12px 15px;
      font-size: 13px;
      line-height: 1.55;
    }

    .ks-bubble p {
      margin: 0 0 8px 0;
    }
    .ks-bubble p:last-child {
      margin: 0;
    }
    .ks-bubble b {
      color: #ffffff;
    }
    .ks-bubble a {
      color: #00E5E5;
      text-decoration: underline;
    }
    .ks-bubble code {
      background: rgba(2, 9, 13, 0.85);
      color: #00E5E5;
      padding: 2px 5px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
    }
    .ks-bubble pre {
      background: #040d12;
      border: 1px solid rgba(0, 229, 229, 0.2);
      border-radius: 8px;
      padding: 10px 12px;
      overflow-x: auto;
      margin: 8px 0;
      position: relative;
    }
    .ks-bubble pre code {
      background: transparent;
      padding: 0;
      color: #a5f3fc;
      font-size: 11.5px;
      line-height: 1.45;
    }
    .ks-code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 10px;
      color: #71838E;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .ks-copy-btn {
      background: rgba(0, 229, 229, 0.15);
      border: 1px solid rgba(0, 229, 229, 0.3);
      color: #00E5E5;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ks-copy-btn:hover {
      background: rgba(0, 229, 229, 0.3);
      color: #ffffff;
    }
    .ks-bubble ul {
      margin: 6px 0;
      padding-left: 18px;
    }
    .ks-bubble li {
      margin-bottom: 4px;
    }

    /* Reasoning Box (Thinking Chain) */
    .ks-thought-box {
      margin-bottom: 8px;
      background: rgba(4, 15, 20, 0.9);
      border: 1px solid rgba(0, 229, 229, 0.35);
      border-radius: 12px;
      overflow: hidden;
      font-size: 11px;
    }

    .ks-thought-header {
      padding: 6px 10px;
      background: rgba(0, 229, 229, 0.12);
      color: #00E5E5;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
      font-weight: 600;
    }

    .ks-thought-content {
      padding: 8px 10px;
      color: #AABBC5;
      border-top: 1px solid rgba(0, 229, 229, 0.2);
      line-height: 1.45;
    }

    .ks-thought-step {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      margin-bottom: 4px;
    }

    .ks-chips {
      padding: 8px 14px;
      display: flex;
      gap: 6px;
      overflow-x: auto;
      white-space: nowrap;
      border-top: 1px solid rgba(0, 229, 229, 0.12);
      background: rgba(7, 23, 29, 0.7);
    }

    .ks-chips::-webkit-scrollbar {
      display: none;
    }

    .ks-chip {
      background: rgba(0, 229, 229, 0.08);
      border: 1px solid rgba(0, 229, 229, 0.22);
      color: #AABBC5;
      border-radius: 9999px;
      padding: 4px 10px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .ks-chip:hover {
      background: rgba(0, 229, 229, 0.2);
      border-color: #00E5E5;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .ks-footer {
      padding: 12px 14px;
      background: rgba(4, 13, 18, 0.95);
      border-top: 1px solid rgba(0, 229, 229, 0.15);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ks-input {
      flex: 1;
      background: rgba(7, 23, 29, 0.7);
      border: 1px solid rgba(0, 229, 229, 0.25);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 13px;
      color: #F1F5F9;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .ks-input:focus {
      border-color: #00E5E5;
      box-shadow: 0 0 0 2px rgba(0, 229, 229, 0.25);
    }

    .ks-send-btn {
      background: linear-gradient(135deg, #00CFFF, #008F9C);
      border: none;
      color: #02090D;
      font-weight: 700;
      border-radius: 12px;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .ks-send-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 15px rgba(0, 229, 229, 0.6);
    }

    .ks-send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    @keyframes ksPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.04); }
    }
    .ks-thinking-pulse {
      animation: ksPulse 1.2s infinite ease-in-out;
    }

    @media (max-width: 640px) {
      #ks-agent-root {
        bottom: max(14px, env(safe-area-inset-bottom, 14px));
        right: max(14px, env(safe-area-inset-right, 14px));
      }
      #ks-agent-launcher {
        width: 50px;
        height: 50px;
        border-radius: 16px;
      }
      .ks-robot-pill-badge {
        display: none !important;
      }
      #ks-agent-window {
        bottom: max(72px, calc(env(safe-area-inset-bottom, 0px) + 70px));
        right: 12px;
        width: calc(100vw - 24px);
        max-width: 400px;
        height: calc(100vh - 90px);
        max-height: 540px;
        border-radius: 18px;
      }
      .ks-robot-tooltip {
        display: none !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #ks-agent-launcher {
        animation: none !important;
      }
      .ks-robot-eyes {
        animation: none !important;
      }
      .ks-robot-online-dot {
        animation: none !important;
      }
      #ks-agent-window {
        transition: opacity 0.2s ease !important;
      }
    }
  `;
  document.head.appendChild(styleEl);

  // ==========================================
  // 4. UI CREATION & EVENT LISTENERS
  // ==========================================
  function createRobotSVG(size, idSuffix) {
    const s = size || 38;
    const uid = idSuffix || ('r' + Math.random().toString(36).slice(2, 6));
    return `
      <svg class="ks-robot-svg" viewBox="0 0 52 52" width="${s}" height="${s}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- 3D Polished Chrome & Brushed Silver Body Gradient -->
          <linearGradient id="silver-body-${uid}" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="20%" stop-color="#e2e8f0" />
            <stop offset="45%" stop-color="#cbd5e1" />
            <stop offset="70%" stop-color="#94a3b8" />
            <stop offset="85%" stop-color="#64748b" />
            <stop offset="100%" stop-color="#475569" />
          </linearGradient>

          <!-- Chrome Bevel Border Gradient -->
          <linearGradient id="silver-bevel-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="35%" stop-color="#cbd5e1" />
            <stop offset="70%" stop-color="#475569" />
            <stop offset="100%" stop-color="#94a3b8" />
          </linearGradient>

          <!-- Metallic Ear Coupler Gradient -->
          <linearGradient id="silver-ear-${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="25%" stop-color="#cbd5e1" />
            <stop offset="60%" stop-color="#64748b" />
            <stop offset="100%" stop-color="#334155" />
          </linearGradient>

          <!-- Specular Curved Glass Visor Reflection -->
          <linearGradient id="visor-glass-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
            <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#02090d" stop-opacity="0" />
          </linearGradient>

          <!-- Eye Glowing Core -->
          <radialGradient id="eyeglow-${uid}" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="40%" stop-color="#00E5E5" />
            <stop offset="80%" stop-color="#00CFFF" />
            <stop offset="100%" stop-color="#008F9C" />
          </radialGradient>
        </defs>

        <!-- Antenna Mast with Chrome Mount & Cyan Beacon -->
        <rect x="24.5" y="3.5" width="3" height="8.5" rx="1.5" fill="url(#silver-ear-${uid})" stroke="#94a3b8" stroke-width="0.5" />
        <ellipse cx="26" cy="11.5" rx="3.5" ry="1.2" fill="#64748b" />
        <circle cx="26" cy="3.5" r="3.2" fill="#00E5E5" filter="drop-shadow(0 0 6px #00CFFF)" />
        <circle cx="26" cy="2.7" r="1.3" fill="#ffffff" />

        <!-- Lateral 3D Ear Couplers (Stepped Chrome Audio Cylinders) -->
        <rect x="2" y="19" width="4.5" height="15" rx="2" fill="url(#silver-ear-${uid})" stroke="#94a3b8" stroke-width="0.8" />
        <rect x="4.5" y="21" width="2" height="11" rx="1" fill="#00E5E5" opacity="0.8" filter="drop-shadow(0 0 3px #00E5E5)" />
        <rect x="45.5" y="19" width="4.5" height="15" rx="2" fill="url(#silver-ear-${uid})" stroke="#94a3b8" stroke-width="0.8" />
        <rect x="45.5" y="21" width="2" height="11" rx="1" fill="#00E5E5" opacity="0.8" filter="drop-shadow(0 0 3px #00E5E5)" />

        <!-- Robotic Metallic Neck / Joint Collar -->
        <rect x="20" y="44" width="12" height="4" rx="2" fill="url(#silver-ear-${uid})" stroke="#475569" stroke-width="0.7" />
        <line x1="23" y1="46" x2="29" y2="46" stroke="#00E5E5" stroke-width="0.8" opacity="0.8" />

        <!-- Robot Cranium (Chassis Outer Bevel & Silver Body) -->
        <rect x="6.5" y="10.5" width="39" height="34.5" rx="10" fill="url(#silver-body-${uid})" stroke="url(#silver-bevel-${uid})" stroke-width="1.8" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))" />

        <!-- Forehead Seam Plate / Panel Lines -->
        <path d="M 12 14 Q 26 11 40 14" stroke="#ffffff" stroke-width="1" opacity="0.85" fill="none" />
        <path d="M 12 15 Q 26 12 40 15" stroke="#475569" stroke-width="0.75" opacity="0.6" fill="none" />
        <circle cx="26" cy="13.5" r="1.4" fill="#64748b" stroke="#cbd5e1" stroke-width="0.6" />

        <!-- Recessed Visor Frame (Metallic Inset Ring) -->
        <rect x="11.5" y="18" width="29" height="17" rx="5.5" fill="#02090D" stroke="#64748b" stroke-width="1.4" />
        <rect x="12.2" y="18.7" width="27.6" height="15.6" rx="4.8" fill="#061219" stroke="rgba(0, 229, 229, 0.35)" stroke-width="0.8" />

        <!-- Curved Specular Glass Reflection on Visor -->
        <path d="M 13 22 Q 26 18 39 21 L 39 25 Q 26 21 13 24 Z" fill="url(#visor-glass-${uid})" />

        <!-- Expressive Glowing Cyan Eyes -->
        <g class="ks-robot-eyes">
          <rect class="ks-robot-eye" x="16.5" y="22" width="7" height="6.5" rx="2.5" fill="url(#eyeglow-${uid})" filter="drop-shadow(0 0 6px #00E5E5)" />
          <circle cx="18.8" cy="24.2" r="1.3" fill="#ffffff" />
          <rect class="ks-robot-eye" x="28.5" y="22" width="7" height="6.5" rx="2.5" fill="url(#eyeglow-${uid})" filter="drop-shadow(0 0 6px #00E5E5)" />
          <circle cx="30.8" cy="24.2" r="1.3" fill="#ffffff" />
        </g>

        <!-- Metallic Voice / Speaker Slit -->
        <rect x="20.5" y="38" width="11" height="2" rx="1" fill="#334155" stroke="#64748b" stroke-width="0.5" />
        <line x1="22" y1="39" x2="30" y2="39" stroke="#00E5E5" stroke-width="0.8" stroke-linecap="round" opacity="0.9" />

        <!-- Corner Hardware Rivets on Cheeks -->
        <circle cx="11.5" cy="39" r="1.1" fill="#94a3b8" stroke="#475569" stroke-width="0.5" />
        <circle cx="40.5" cy="39" r="1.1" fill="#94a3b8" stroke="#475569" stroke-width="0.5" />
      </svg>
    `;
  }

  function createAgentUI() {
    const root = document.createElement('div');
    root.id = 'ks-agent-root';

    root.innerHTML = `
      <div id="ks-agent-launcher" aria-label="Open KS AI Assistant">
        <div class="ks-robot-pill-badge">KS AI Assistant</div>
        <div class="ks-robot-icon-wrap">
          ${createRobotSVG(42, 'launcher')}
          <div class="ks-robot-online-dot"></div>
        </div>
      </div>

      <div id="ks-agent-window">
        <div class="ks-header">
          <div class="ks-header-left">
            <div class="ks-header-robot-icon">
              ${createRobotSVG(28, 'header')}
            </div>
            <div>
              <div class="ks-header-title">KS AI Assistant</div>
              <div class="ks-header-status"><span class="ks-status-indicator"></span> Autonomous Brain • Live Synced</div>
            </div>
          </div>
          <div class="ks-header-actions">
            <button class="ks-header-btn" id="ks-btn-mute" title="Audio: Muted by default">🔇</button>
            <button class="ks-header-btn" id="ks-btn-clear" title="Clear Chat History">🗑️</button>
            <button class="ks-header-btn" id="ks-btn-close" title="Minimize">✕</button>
          </div>
        </div>

        <div class="ks-live-ribbon">
          <span>⚡ <b id="ks-ribbon-text">GitHub Live Telemetry: Active</b></span>
          <a href="https://github.com/khandeshwar51" target="_blank" rel="noopener">@khandeshwar51 ↗</a>
        </div>

        <div class="ks-messages" id="ks-msg-container">
          <div class="ks-msg ks-msg-bot">
            <div class="ks-bubble">
              👋 <b>Hi! I am the KS AI Assistant</b> — Khandeshwar's autonomous AI representative and full-spectrum coding assistant.
              <br/><br/>
              <b>What I do:</b>
              <ul>
                <li>🛡️ <b>Projects &amp; Architectures:</b> Explain what tech stack Khandeshwar uses and how he architects systems (ScrollGuard, Modern Portfolio, commercial portals).</li>
                <li>⚡ <b>Live Updates:</b> Read his daily GitHub commits, push events, and repo streak in real time.</li>
                <li>💡 <b>General AI Chatbot:</b> Ask me any programming challenge, algorithm, system design, or computer science concept like ChatGPT!</li>
              </ul>
              <i>(Note: In accordance with enterprise security, all private API keys and internal proprietary business logic remain strictly guarded.)</i>
            </div>
          </div>
        </div>

        <div class="ks-chips">
          <div class="ks-chip" data-q="What did Khandeshwar commit recently?">⚡ Latest Updates</div>
          <div class="ks-chip" data-q="What tech stack does ScrollGuard use and how does it work?">🛡️ ScrollGuard Stack</div>
          <div class="ks-chip" data-q="What client projects has he delivered and how?">💼 Client Deliverables</div>
          <div class="ks-chip" data-q="What is Khandeshwar's core technical stack?">💻 Core Tech Stack</div>
          <div class="ks-chip" data-q="How can I contact or hire Khandeshwar?">🤝 Hire Him</div>
          <div class="ks-chip" data-q="Write a Python script for quicksort with complexity explanation">🐍 Quicksort in Python</div>
          <div class="ks-chip" data-q="Explain how Manifest V3 works in Chrome extensions">🧩 Chrome MV3</div>
        </div>

        <div class="ks-footer">
          <input type="text" class="ks-input" id="ks-input" placeholder="Ask about Khandeshwar's stack, projects, or any code..." autocomplete="off" />
          <button class="ks-send-btn" id="ks-btn-send" title="Send message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(root);

    // Bind UI actions
    const launcher = document.getElementById('ks-agent-launcher');
    const win = document.getElementById('ks-agent-window');
    const btnClose = document.getElementById('ks-btn-close');
    const btnClear = document.getElementById('ks-btn-clear');
    const btnMute = document.getElementById('ks-btn-mute');
    const input = document.getElementById('ks-input');
    const btnSend = document.getElementById('ks-btn-send');
    const chips = document.querySelectorAll('.ks-chip');

    if (btnMute) {
      btnMute.addEventListener('click', () => {
        isMuted = !isMuted;
        btnMute.textContent = isMuted ? '🔇' : '🔊';
        btnMute.title = isMuted ? 'Audio: Muted' : 'Audio: Unmuted';
      });
    }

    launcher.addEventListener('click', () => {
      isChatOpen = !isChatOpen;
      win.classList.toggle('ks-open', isChatOpen);
      if (isChatOpen) {
        input.focus();
        updateRibbon();
      }
    });

    btnClose.addEventListener('click', () => {
      isChatOpen = false;
      win.classList.remove('ks-open');
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        isChatOpen = false;
        win.classList.remove('ks-open');
      }
    });

    // Close when clicking outside agent UI
    document.addEventListener('click', (e) => {
      if (isChatOpen && !root.contains(e.target)) {
        isChatOpen = false;
        win.classList.remove('ks-open');
      }
    });

    btnClear.addEventListener('click', () => {
      chatHistory = [];
      const container = document.getElementById('ks-msg-container');
      container.innerHTML = `
        <div class="ks-msg ks-msg-bot">
          <div class="ks-bubble">
            🧹 Chat memory cleared. How can I assist you with Khandeshwar's tech stack, architectures, or general programming questions?
          </div>
        </div>
      `;
    });

    btnSend.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-q');
        input.value = query;
        handleSend();
      });
    });
  }

  function updateRibbon() {
    const ribbon = document.getElementById('ks-ribbon-text');
    if (ribbon && liveGitHubData.synced) {
      ribbon.textContent = `Live: Latest commit on ${liveGitHubData.latestRepo} (${liveGitHubData.latestTime})`;
    }
  }

  // ==========================================
  // 5. INPUT HANDLING & REASONING FLOW
  // ==========================================
  async function handleSend() {
    const input = document.getElementById('ks-input');
    const query = input.value.trim();
    if (!query || isThinking) return;

    input.value = '';
    appendMessage('user', query);
    isThinking = true;

    // Record user query in conversation memory
    chatHistory.push({ role: 'user', content: query });
    if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

    // Create dynamic thinking placeholder with animated steps
    const thinkingId = 'ks-thinking-' + Date.now();
    appendThinkingPlaceholder(thinkingId);

    try {
      const result = await processThinkingAgentQuery(query);
      removeThinkingPlaceholder(thinkingId);

      // Record assistant answer in conversation memory
      chatHistory.push({ role: 'assistant', content: result.response });

      appendMessage('bot', result.response, result.thoughts);
    } catch (err) {
      removeThinkingPlaceholder(thinkingId);
      const fallback = localHeuristicFallback(query);
      appendMessage('bot', fallback.response, fallback.thoughts);
    } finally {
      isThinking = false;
    }
  }

  function appendMessage(role, content, thoughts = null) {
    const container = document.getElementById('ks-msg-container');
    const msgDiv = document.createElement('div');
    msgDiv.className = `ks-msg ks-msg-${role}`;

    let thoughtHtml = '';
    if (thoughts && thoughts.length > 0) {
      thoughtHtml = `
        <div class="ks-thought-box">
          <div class="ks-thought-header" onclick="const c = this.nextElementSibling; c.style.display = c.style.display === 'none' ? 'block' : 'none';">
            <span>🤖 Neural Reasoning Chain (${thoughts.length} steps)</span>
            <span>▾</span>
          </div>
          <div class="ks-thought-content">
            ${thoughts.map((t, idx) => `<div class="ks-thought-step"><span>•</span> <span>Step ${idx+1}: ${t}</span></div>`).join('')}
          </div>
        </div>
      `;
    }

    msgDiv.innerHTML = `
      ${thoughtHtml}
      <div class="ks-bubble">${formatMarkdown(content)}</div>
    `;

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    // Attach copy button handlers for code blocks
    msgDiv.querySelectorAll('.ks-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pre = btn.closest('pre');
        const code = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        });
      });
    });
  }

  function appendThinkingPlaceholder(id) {
    const container = document.getElementById('ks-msg-container');
    const thinkDiv = document.createElement('div');
    thinkDiv.className = 'ks-msg ks-msg-bot';
    thinkDiv.id = id;
    thinkDiv.innerHTML = `
      <div class="ks-bubble ks-thinking-pulse" style="display:flex;align-items:center;gap:8px;">
        ${createRobotSVG(18, 'thk_' + id)}
        <span id="${id}-text" style="font-size:12px;color:#38bdf8;">KS AI Assistant is analyzing query...</span>
      </div>
    `;
    container.appendChild(thinkDiv);
    container.scrollTop = container.scrollHeight;

    // Animate thinking steps
    setTimeout(() => {
      const el = document.getElementById(`${id}-text`);
      if (el) el.textContent = 'Inspecting live telemetry & architectural context...';
    }, 600);

    setTimeout(() => {
      const el = document.getElementById(`${id}-text`);
      if (el) el.textContent = 'Synthesizing neural reasoning & formulating response...';
    }, 1400);
  }

  function removeThinkingPlaceholder(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // ==========================================
  // 6. STRICT SECURITY GUARD & AGENT BRAIN
  // ==========================================
  async function processThinkingAgentQuery(userQuery) {
    const q = userQuery.toLowerCase().trim();
    const thoughts = [];

    thoughts.push("Deconstructing query intent and checking security boundary protocols...");

    // STRICT SECURITY GUARDRAIL CHECK
    // Prevent exposure of API keys, SIH keys, private repository credentials, .env variables
    const sensitiveTokens = ['api key', 'secret', 'token', 'sih', 'password', 'credential', '.env', 'private key', 'auth key', 'private repo'];
    const isAskingSensitive = sensitiveTokens.some(tok => q.includes(tok)) && (q.includes('what is') || q.includes('give') || q.includes('show') || q.includes('leak') || q.includes('tell me') || q.includes('expose') || q.includes('repo key'));

    if (isAskingSensitive) {
      thoughts.push("⚠️ Security Guardrail Triggered: Request queries sensitive credentials / private tokens.");
      thoughts.push("Enforcing strict zero-exposure protocol for all private keys, SIH credentials, and environment configurations.");

      const secureResponse = `
🔒 **Enterprise Security & Confidentiality Policy:**

For security and professional ethics:
- **Internal API keys, repository secrets, SIH keys, and \`.env\` configurations are strictly protected** and never exposed under any circumstances.
- My primary role is to explain **what tech stack Khandeshwar uses** and **how he architects systems** (e.g. Manifest V3 IndexedDB caching, responsive performance optimization, WhatsApp lead funnels, LCP speed).
- Proprietary internal codebase secrets and raw private logic are outside public disclosure.

Feel free to ask about the public architecture, frameworks, algorithms, or any general software engineering concept!
      `.trim();

      return { thoughts, response: secureResponse };
    }

    // CHECK FOR PROPRIETARY LOGIC / CODEBASE THEFT ATTEMPTS
    if ((q.includes('source code') || q.includes('entire code') || q.includes('private code') || q.includes('backend logic') || q.includes('internal logic')) && (q.includes('balaji') || q.includes('scrollguard') || q.includes('vidscript') || q.includes('client'))) {
      thoughts.push("Entity: Commercial client / proprietary project codebase inquiry.");
      thoughts.push("Directing response to architectural design and tech stack breakdown while safeguarding proprietary trade logic.");

      const stackExplanation = `
🛡️ **Architectural Architecture & Tech Stack Focus:**

Khandeshwar maintains strict client IP confidentiality: proprietary business logic and internal commercial codebases are not open for public redistribution.

However, here is **the exact tech stack and how he engineered it**:
- **Balaji Earthmovers:** Built with **React** & **Tailwind CSS**, utilizing sticky scroll storytelling, Komatsu/Volvo specs ledger, and an excavation volume estimation desk with **<1.2s LCP load time**.
- **ScrollGuard:** Built with **TypeScript**, **React**, and **Manifest V3**, utilizing client-side **IndexedDB caching** to solve MV3 service worker death cycles and 60fps scroll velocity monitoring with zero cloud surveillance.
- **Balaji Farm Stay:** Built with **Responsive Web** and **WhatsApp conversion funnels** achieving **+40% lead generation**.

Would you like to explore the architectural design patterns or tech stacks in greater detail?
      `.trim();

      return { thoughts, response: stackExplanation };
    }

    // DISPATCH TO COGNITIVE LLM ENGINE (PRIMARY) WITH TIMEOUT
    thoughts.push("Dispatching to cognitive LLM brain (with live telemetry context injection)...");

    try {
      const llmResult = await queryLLMBrainWithTimeout(userQuery, 8000);
      if (llmResult && llmResult.trim().length > 0) {
        thoughts.push("Neural inference verified: complete solution synthesized.");
        return { thoughts, response: llmResult };
      }
    } catch (e) {
      thoughts.push("Cognitive inference timeout/error: engaging local heuristic knowledge engine.");
    }

    // FALLBACK TO BUILT-IN KNOWLEDGE ENGINE
    return localHeuristicFallback(userQuery, thoughts);
  }

  // ==========================================
  // 7. COGNITIVE LLM BRAIN (POLLINATIONS AI)
  // ==========================================
  async function queryLLMBrainWithTimeout(userQuery, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    // Build rich, highly trained system prompt
    const systemPrompt = `
You are "KS AI Assistant", the autonomous, highly articulate AI representative and technical assistant of Khandeshwar Suryavanshi (khandeshwar51).

=== PROFILE & BACKGROUND ===
- Name: Khandeshwar Suryavanshi
- Role: AI Systems Engineer & Full-Stack Architect
- Education: B.Sc. Computer Science at Vartak College (University of Mumbai)
- Location: Vasai, Mumbai Metropolitan Region, Maharashtra, India
- Email: khandeshwarsuryavanshi@gmail.com
- GitHub: https://github.com/khandeshwar51 (1,006+ contributions in the last year, solid green activity calendar)
- LinkedIn: https://www.linkedin.com/in/khandeshwar-suryavanshi-10612623b
- Portfolio: https://khandeshwar51.netlify.app

=== LIVE TELEMETRY (DYNAMICALLY SYNCED) ===
- Latest GitHub Commit: "${liveGitHubData.latestCommit}" on repo "${liveGitHubData.latestRepo}" (${liveGitHubData.latestTime})
- Public Repos Count: ${liveGitHubData.publicRepos}
- Active Repositories: ${liveGitHubData.recentRepos.join(', ')}
- Continuous Activity: 1,006+ contributions over the past year across open-source systems, client deliverables, and algorithmic practice.

=== FLAGSHIPS & HOW HE USES TECH ===
1. ScrollGuard (https://github.com/khandeshwar51/scrollguard):
   - Tech: TypeScript, React, Chrome Manifest V3, IndexedDB, Focus scoring heuristics.
   - Purpose: Real-time privacy-first behavioral intervention stopping short-form doomscrolling (Reels, Shorts, TikTok, X).
   - How he engineered it: Solved Chrome MV3 ephemeral service worker termination cycles using IndexedDB state hydration. Zero external cloud tracking. 60fps velocity monitoring.
2. Modern Portfolio & KS Thinking Agent (https://github.com/khandeshwar51/portfolio):
   - Tech: React, Tailwind CSS, Vite, Vanilla JS, Keyless LLM Inference.
   - Purpose: High-performance portfolio platform and autonomous AI representative.

=== COMMERCIAL CLIENT DELIVERABLES ===
1. Balaji Earthmovers (https://balajiearthmoversmumbai.com): React, Tailwind, sticky machinery storytelling, excavation volume estimator, sub-1.2s LCP load time.
2. Balaji Farm Stay (https://pratik1258m.github.io/Balajifarm/): Agro-hospitality booking portal with direct WhatsApp conversion funnel (+40% booking rate).
3. Riverside Farm (https://pratik1258m.github.io/Riverside/): Mobile-first real estate & farm stay portal with Google Search Console indexing.
4. Yamuna Enterprises: Industrial oil machinery catalog.
5. Vaity Aqua Resort: Modern hospitality portal with optimized asset pipeline.
6. VidScript Web: AI video-to-document & intelligent transcription pipeline powered by Groq LLMs.
7. Real Estate Intelligence (https://github.com/pratik1258m/realestate): Automated Indian real estate news intelligence & distribution platform scraping 32 RSS feeds (500+ daily articles), Jaccard deduplication, Groq AI LLM summaries, daily 8 AM WhatsApp/Email broadcasts, and dynamic branded PDF reporting.

=== 20-POINT WEB & APPLICATION SECURITY ARCHITECTURE (MANDATORY STANDARD) ===
Khandeshwar strictly enforces this 20-Point Security Architecture across all 4 defense layers on every web platform, client portal, API, and full-stack app he builds:
- Layer 1 (Injection & Input): 1) SQLi Check (parameterized queries / ORMs), 2) XSS Block (DOMPurify HTML sanitization & CSP), 3) CSRF Protection (anti-CSRF tokens & SameSite cookies), 4) File Upload Validation (MIME & magic bytes check, UUID storage), 5) SSRF Audit (URL allowlisting, internal IP range blocking).
- Layer 2 (Auth & Access): 6) BOLA/IDOR Fix (strict server-side ownership checks), 7) Rate Limiting (Redis token-bucket throttling on auth/API), 8) Password Hashing (Argon2id or bcrypt work factor >= 12), 9) MFA/2FA (TOTP RFC 6238 & WebAuthn), 10) Server-Side RBAC (backend permissions, zero reliance on frontend UI hiding), 11) Database RLS (Row-Level Security policies).
- Layer 3 (Secrets & Tokens): 12) Strong JWT Secrets (256-bit crypto entropy, short TTL), 13) Server-Side API Keys (zero client bundling, private .env), 14) HttpOnly Cookies (zero tokens in LocalStorage, XSS-immune), 15) Default Credentials Replacement.
- Layer 4 (Config & Hygiene): 16) Strict CORS (whitelisted origins, no wildcard *), 17) Webhook Signature Verification (HMAC-SHA256 signature check), 18) Source Maps Hide (disabled public .map files in production), 19) Clean Production Logs (redaction of PII/secrets/tokens), 20) Dependency CVE Auditing (automated vulnerability scanning).

=== STRICT SECURITY & ETHICS RULES ===
1. NEVER reveal, discuss, speculate on, or expose any API keys, credentials, tokens, environment variables (.env), or SIH repo keys. If asked, politely refuse citing strict enterprise security protocols.
2. Regarding Khandeshwar's work: Your main task is to explain WHAT tech stack he uses and HOW he architects/engineers it. Internal proprietary codebases and business logic remain confidential.
3. GENERAL CHATBOT INTELLECT: For general programming, algorithms, data structures, math, debugging, web development, or computer science questions (Python, C++, TypeScript, React, SQL, system design, etc.), act like a world-class AI chatbot: give complete, brilliant, accurate, well-explained code snippets and answers using markdown formatting.
4. Tone: Confident, technical, polite, articulate, and engineering-minded.
    `.trim();

    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.slice(-6) // include last 6 turns for multi-turn context
    ];

    try {
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages,
          model: 'openai',
          seed: 42
        }),
        signal: controller.signal
      });

      clearTimeout(timer);

      if (response.ok) {
        const text = await response.text();
        return text;
      }
      throw new Error('LLM endpoint returned status ' + response.status);
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  }

  // ==========================================
  // 8. CLIENT-SIDE HEURISTIC KNOWLEDGE ENGINE
  // ==========================================
  function localHeuristicFallback(userQuery, existingThoughts = []) {
    const q = userQuery.toLowerCase().trim();
    const thoughts = existingThoughts.length > 0 ? existingThoughts : ["Analyzing query intent via local neural heuristics..."];

    // 0. 20-Point Web & Application Security Matrix
    if (q.includes('security') || q.includes('audit') || q.includes('checklist') || q.includes('sqli') || q.includes('xss') || q.includes('csrf') || q.includes('idor') || q.includes('bola') || q.includes('jwt') || q.includes('httponly') || q.includes('secure website') || q.includes('safe website') || q.includes('vulnerability')) {
      thoughts.push("Synthesizing Khandeshwar's 20-Point Production Web & App Security Architecture...");

      const res = `
🔒 **Khandeshwar's 20-Point Web & Application Security Standard**

Every website, client portal, API, and cloud application built by Khandeshwar enforces this **4-Layer, 20-Point Defense Matrix** before production deployment:

### 🛡️ Layer 1: Injection & Input Defense (5 Points)
1. **SQLi Check**: 100% Parameterized queries and ORM schema bindings (Prisma, Drizzle, TypeORM, SQLAlchemy) to eliminate SQL injection.
2. **XSS Block**: Input sanitization via DOMPurify and strict Content Security Policy (CSP) headers to prevent script injection.
3. **CSRF Shield**: Anti-CSRF cryptographic tokens and \`SameSite=Lax/Strict\` cookies on state-changing requests.
4. **File Upload Validation**: Strict MIME type, magic bytes verification, UUID file renaming, and isolated cookieless cloud bucket storage.
5. **SSRF Audit**: Strict URL destination allowlists and blocking loopback/private internal IP CIDR blocks (\`127.0.0.0/8\`, \`10.0.0.0/8\`, \`192.168.0.0/16\`, \`169.254.169.254\`).

### 🔐 Layer 2: Auth & Access Control (6 Points)
6. **BOLA / IDOR Fix**: Enforces server-side entity ownership checks (\`WHERE id = :id AND user_id = :current_user_id\`); never trusts client IDs.
7. **Rate Limiting**: Redis token-bucket throttling on login, signup, OTP, and sensitive APIs to prevent brute-force attacks.
8. **Password Hashing**: Cryptographically strong memory-hard **Argon2id** or **bcrypt** (work factor >= 12) with salt.
9. **MFA / 2FA**: Multi-Factor Authentication via TOTP (RFC 6238) and WebAuthn hardware keys for privileged accounts.
10. **Server-Side RBAC**: Permissions and role checks enforced strictly in backend middleware, never relying solely on frontend UI hiding.
11. **Database RLS**: Row-Level Security policies in PostgreSQL/Supabase restricting row queries strictly by tenant/user ID.

### 🔑 Layer 3: Secrets & Token Hardening (4 Points)
12. **Strong JWT Secrets**: 256-bit high-entropy signing keys, short expiration TTL, and strict algorithm verification (\`HS256\` / \`RS256\`).
13. **Server-Side API Keys**: Third-party API keys (OpenAI, Stripe, DB credentials) kept strictly in server \`.env\` variables—zero frontend bundling.
14. **HttpOnly Cookie Storage**: Auth tokens strictly stored in \`HttpOnly\`, \`Secure\`, \`SameSite\` cookies—**never in LocalStorage** (XSS-immune).
15. **Default Credentials Reset**: Complete replacement of all default admin passwords, ports, and seed credentials.

### ⚙️ Layer 4: Config & Production Hygiene (5 Points)
16. **Strict CORS**: Explicit origin whitelisting; zero wildcard (\`*\`) origins with authenticated credentials.
17. **Webhook HMAC Check**: Cryptographic HMAC-SHA256 signature verification on Stripe / Razorpay / GitHub webhooks using raw request bodies.
18. **Source Maps Hide**: Disabled production \`.map\` files to prevent exposing internal business logic and source code in browser DevTools.
19. **Clean Production Logs**: Automated redaction of passwords, tokens, API keys, and Personally Identifiable Information (PII) from logs.
20. **Dependency CVE Audit**: Automated CI/CD scanning (\`npm audit\`, Snyk, Dependabot) with immediate patch remediation.
      `.trim();
      return { thoughts, response: res };
    }

    // 1. Live GitHub / Commits / Latest Activity
    if (q.includes('latest') || q.includes('commit') || q.includes('recent') || q.includes('update') || q.includes('github activity') || q.includes('streak')) {
      thoughts.push(`Synthesizing live GitHub telemetry: Repo '${liveGitHubData.latestRepo}', Commit '${liveGitHubData.latestCommit}'`);
      
      const res = `
⚡ **Live GitHub Activity for [@khandeshwar51](https://github.com/khandeshwar51)**:

- **Latest Work:** Committed to \`${liveGitHubData.latestRepo}\` (${liveGitHubData.latestTime})
- **Latest Commit Message:** \`${liveGitHubData.latestCommit}\`
- **Contribution Streak:** **1,006+ contributions** over the past year with a completely solid green calendar!
- **Continuous Activity:** 1,006+ contributions over the past year across open-source platforms, client deliverables, and algorithmic practice.
- **Active Repos:** ${liveGitHubData.recentRepos.map(r => `\`${r}\``).join(', ')}

You can inspect his live commits directly on his [GitHub Profile](https://github.com/khandeshwar51)!
      `.trim();
      return { thoughts, response: res };
    }

    // 2. ScrollGuard Flagship
    if (q.includes('scrollguard') || q.includes('extension') || q.includes('doomscroll') || q.includes('wellbeing')) {
      thoughts.push("Retrieving system architecture for ScrollGuard (Manifest V3)...");

      const res = `
🛡️ **[ScrollGuard](https://github.com/khandeshwar51/scrollguard) — AI Wellbeing & Focus Engine**

ScrollGuard is Khandeshwar's flagship browser extension engineered to intercept compulsive short-form doomscrolling (Instagram Reels, YouTube Shorts, TikTok, and X feeds) with **zero cloud surveillance**.

**How He Engineered It & Tech Stack:**
- **Tech Stack:** **TypeScript**, **React**, **Manifest V3**, **IndexedDB**, Dopamine Scoring Heuristics.
- **Manifest V3 Resiliency:** Overcame Chrome MV3 ephemeral service-worker termination cycles using client-side **IndexedDB caching** and state hydration.
- **60fps DOM Interception:** MutationObserver and velocity monitoring detecting scroll acceleration and dwell cadence.
- **Cognitive Friction Ladder:** Applies progressive friction overlays and intention checks to return users to productive work.

🔗 **Repository:** [github.com/khandeshwar51/scrollguard](https://github.com/khandeshwar51/scrollguard) *(100% Public)*
      `.trim();
      return { thoughts, response: res };
    }

    // 3. Client & Commercial Projects
    if (q.includes('client') || q.includes('balaji') || q.includes('riverside') || q.includes('yamuna') || q.includes('vaity') || q.includes('vidscript') || q.includes('commercial')) {
      thoughts.push("Querying commercial client deliverables ledger...");

      const res = `
💼 **Production & Commercial Client Deliveries:**

1. 🚜 **[Balaji Earthmovers](https://balajiearthmoversmumbai.com)**
   - Heavy excavation & civil engineering platform (Est. 1991).
   - **Stack & Engineering:** React, Tailwind CSS, sticky scroll storytelling, and excavation volume estimator (**<1.2s LCP speed**).
   - [Code Repo](https://github.com/pratik1258m/Balaji-Earthmovers)

2. 🏡 **[Balaji Farm Stay](https://pratik1258m.github.io/Balajifarm/)**
   - Agro-hospitality booking portal with direct WhatsApp conversion funnel (**+40% booking inquiries**).
   - [Code Repo](https://github.com/pratik1258m/Balajifarm)

3. 🌿 **[Riverside Farm](https://pratik1258m.github.io/Riverside/)**
   - Mobile-first real estate and farm retreat portal with Google Search Console indexing.
   - [Code Repo](https://github.com/pratik1258m/Riverside)

4. ⚙️ **Yamuna Enterprises** — Industrial oil machinery catalog ([Repo](https://github.com/pratik1258m/Yamuna_Enterprises))
5. 🌊 **Vaity Aqua Resort** — Modern hospitality & attraction portal ([Repo](https://github.com/pratik1258m/vaity_resort))
6. 📄 **VidScript Web** — AI video-to-document & intelligent transcription pipeline powered by Groq LLMs.
7. 🏠 **[Real Estate Intelligence](https://github.com/pratik1258m/realestate)** — Automated Indian real estate news intelligence & distribution platform (32 RSS feeds, Jaccard deduplication, Groq AI LLM summaries, daily WhatsApp & Email broadcasts, branded PDF reports).
      `.trim();
      return { thoughts, response: res };
    }

    // 4. Skills / Tech Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('python') || q.includes('c++') || q.includes('react')) {
      thoughts.push("Synthesizing Khandeshwar's core technical stack and architectural competencies...");

      const res = `
💻 **Khandeshwar's Core Engineering Stack & Competencies:**

- **Programming Languages:** **C++**, **Python**, **TypeScript**, **JavaScript**, **SQL**, C
- **Frontend Architecture:** **React.js**, **Tailwind CSS**, **Vite**, HTML5/CSS3, Framer Motion
- **AI & Systems Design:** **Manifest V3 Chrome Extensions**, **Groq LLM Integration**, **Dopamine Heuristics**, Client-side IndexedDB caching, n8n Automation
- **DevOps & Tooling:** Git, GitHub Actions (CI/CD Pipelines), Netlify, Technical SEO & Structured Data
- **Algorithmic Foundations:** Strong focus on Data Structures & Algorithms (DSA), memory management, and time/space complexity optimization.
      `.trim();
      return { thoughts, response: res };
    }

    // 5. Contact / Hire / LinkedIn / Email
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('linkedin') || q.includes('reach') || q.includes('phone') || q.includes('location')) {
      thoughts.push("Extracting verified contact channels and professional availability...");

      const res = `
🤝 **Connect & Hire Khandeshwar Suryavanshi:**

Khandeshwar is currently **Open to Software Engineering roles, Internships, and High-Impact Collaborations**.

- 📧 **Direct Email:** [khandeshwarsuryavanshi@gmail.com](mailto:khandeshwarsuryavanshi@gmail.com)
- 💼 **LinkedIn Profile:** [linkedin.com/in/khandeshwar-suryavanshi-10612623b](https://www.linkedin.com/in/khandeshwar-suryavanshi-10612623b)
- 🐙 **GitHub Profile:** [github.com/khandeshwar51](https://github.com/khandeshwar51)
- 📍 **Location:** Vasai, Mumbai Metropolitan Region, Maharashtra, India
- 🎓 **Education:** B.Sc. Computer Science @ Vartak College (University of Mumbai)
      `.trim();
      return { thoughts, response: res };
    }

    // 6. About Me / Background
    if (q.includes('about') || q.includes('who is') || q.includes('background') || q.includes('college') || q.includes('vartak') || q.includes('bio')) {
      thoughts.push("Synthesizing biographical profile and academic background...");

      const res = `
👨‍💻 **About Khandeshwar Suryavanshi:**

Khandeshwar is an **AI Systems Engineer, Full-Stack Developer, and Computer Science undergraduate** at Vartak College (University of Mumbai).

He specializes in:
1. **AI System Design & Cognitive Applications** (Author of ScrollGuard)
2. **High-Performance Web Platforms** (Delivered 6+ production commercial client websites with sub-1.2s LCP)
3. **Robust Systems Engineering** in **C++**, **Python**, and **TypeScript**.

He pairs strict software engineering discipline (CI/CD, Conventional Commits, testable architectures) with an obsession for speed, clean UX, and real commercial impact.
      `.trim();
      return { thoughts, response: res };
    }

    // 7. General CS concepts fallback
    thoughts.push("Formulating response for general computer science inquiry...");
    return {
      thoughts,
      response: answerGeneralTechHeuristic(q, userQuery)
    };
  }

  function answerGeneralTechHeuristic(q, originalQuery) {
    if (q.includes('manifest v3') || q.includes('mv3')) {
      return `
**Chrome Extension Manifest V3 (MV3) Architecture:**

Manifest V3 replaces persistent background pages with ephemeral **Service Workers**:
- **Key Challenge:** Service workers terminate when idle (approx. 30 seconds), causing memory loss.
- **Solution:** As implemented in *ScrollGuard*, persist critical state to \`chrome.storage.local\` or \`IndexedDB\` and rehydrate immediately upon message wake-up.
- **Declarative Net Request:** Replaces blocking \`webRequest\` API for privacy and speed.
- **Content Scripts:** Inject isolated IIFE bundles into target DOMs to observe mutations without modifying page globals.
      `.trim();
    }

    if (q.includes('quicksort') || q.includes('quick sort')) {
      return `
**Quicksort Algorithm & Complexity:**

Quicksort is a Divide-and-Conquer sorting algorithm:
1. Choose a **pivot** element.
2. Partition the array: elements smaller than the pivot move left; larger elements move right.
3. Recursively apply Quicksort to left and right subarrays.

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example:
print(quicksort([3, 6, 8, 10, 1, 2, 1]))
# Output: [1, 1, 2, 3, 6, 8, 10]
\`\`\`

**Complexity:**
- **Average Time:** \`O(n log n)\`
- **Worst Time:** \`O(n²)\`
- **Space:** \`O(log n)\` stack memory.
      `.trim();
    }

    if (q.includes('binary search')) {
      return `
**Binary Search Algorithm (\`O(log n)\`):**

Binary search works on **sorted** arrays by repeatedly halving the search space:
\`\`\`cpp
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents integer overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Not found
}
\`\`\`
      `.trim();
    }

    return `
🤖 **KS AI Assistant Analysis:**

Regarding: *"**${originalQuery}**"*

I am continuously indexing Khandeshwar's newest GitHub commits, algorithmic repositories, and client platforms.

Feel free to ask about:
- **Khandeshwar's Stack & Projects:** Ask about **ScrollGuard**, **Balaji Earthmovers**, or **Modern Portfolio**.
- **Tech Stack:** Ask about his work in **C++**, **Python**, **React**, or **Manifest V3**.
- **Live Updates:** Ask *"What did he commit recently?"* to check real-time telemetry!
- **Hiring:** Reach him directly at [khandeshwarsuryavanshi@gmail.com](mailto:khandeshwarsuryavanshi@gmail.com).

*(Or ask any programming, algorithm, or web development question!)*
    `.trim();
  }

  // ==========================================
  // 9. MARKDOWN & CODE HIGHLIGHT FORMATTER
  // ==========================================
  function formatMarkdown(text) {
    if (!text) return '';
    
    // First escape raw HTML
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks with syntax copy buttons
    html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
      const language = lang || 'code';
      return `
        <pre><div class="ks-code-header"><span>${language}</span><button class="ks-copy-btn" type="button">Copy</button></div><code>${code.trim()}</code></pre>
      `;
    });

    // Inline formatting
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Bullet lists
    html = html.replace(/\n- (.*?)(?=\n- |\n\n|$)/gs, (match) => {
      const items = match.trim().split('\n- ').filter(Boolean);
      return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
    });

    // Numbered lists
    html = html.replace(/\n\d+\. (.*?)(?=\n\d+\. |\n\n|$)/gs, (match) => {
      const items = match.trim().split(/\n\d+\. /).filter(Boolean);
      return '<ol>' + items.map(i => `<li>${i}</li>`).join('') + '</ol>';
    });

    // Paragraphs
    html = html.split('\n\n').map(p => {
      p = p.trim();
      if (!p) return '';
      if (p.startsWith('<pre>') || p.startsWith('<ul>') || p.startsWith('<ol>')) return p;
      return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
    }).join('');

    return html;
  }

  // ==========================================
  // 10. MOUNT AGENT TO DOM
  // ==========================================
  function suppressLegacyReactBot() {
    const legacy = document.querySelectorAll('#root button.fixed.bottom-6.right-6, #root button[class*="bottom-6"][class*="right-6"], button.fixed.bottom-6.right-6.rounded-full');
    legacy.forEach(b => {
      b.style.setProperty('display', 'none', 'important');
      b.style.setProperty('visibility', 'hidden', 'important');
      b.style.setProperty('opacity', '0', 'important');
      b.style.setProperty('pointer-events', 'none', 'important');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      suppressLegacyReactBot();
      createAgentUI();
      fetchLiveGitHubTelemetry();
      setInterval(suppressLegacyReactBot, 500);
    });
  } else {
    suppressLegacyReactBot();
    createAgentUI();
    fetchLiveGitHubTelemetry();
    setInterval(suppressLegacyReactBot, 500);
  }

})();
