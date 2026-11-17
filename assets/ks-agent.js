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
        name: "Engineering Journal (auto_green)",
        badge: "Automated Telemetry Sync",
        scope: "Daily CI/CD GitHub Actions telemetry synchronization logging algorithmic milestones and coding consistency.",
        tech: "GitHub Actions, Bash, Conventional Commits, Git Automation",
        repo: "https://github.com/khandeshwar51/auto_green",
        howHeUsesIt: [
          "Runs automated cron synchronization at 20:00 IST daily to maintain unbroken telemetry.",
          "Enforces strict Conventional Commits standards across all repositories."
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
    latestRepo: "auto_green",
    latestTime: "recently",
    contributions: "1,006+ green contributions (1-year streak)",
    recentRepos: ["scrollguard", "auto_green", "khandeshwar51"],
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
        if (pushEvent && pushEvent.payload && pushEvent.payload.commits && pushEvent.payload.commits.length > 0) {
          liveGitHubData.latestCommit = pushEvent.payload.commits[0].message.split('\n')[0];
          liveGitHubData.latestRepo = pushEvent.repo.name.replace('khandeshwar51/', '');
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

    #ks-agent-launcher {
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0369a1 100%);
      border: 1px solid rgba(56, 189, 248, 0.4);
      padding: 10px 18px 10px 12px;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 10px 30px -5px rgba(2, 132, 199, 0.5), 0 0 20px rgba(56, 189, 248, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }

    #ks-agent-launcher:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 35px -5px rgba(2, 132, 199, 0.7), 0 0 25px rgba(56, 189, 248, 0.4);
      border-color: rgba(56, 189, 248, 0.8);
    }

    .ks-avatar-ring {
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00C7B7, #8B5CF6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .ks-online-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      border: 2px solid #0f172a;
      box-shadow: 0 0 8px #10b981;
    }

    .ks-launcher-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .ks-launcher-title {
      font-weight: 700;
      font-size: 13px;
      background: linear-gradient(to right, #38bdf8, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.3px;
    }

    .ks-launcher-subtitle {
      font-size: 10px;
      color: #94a3b8;
    }

    #ks-agent-window {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 430px;
      max-width: calc(100vw - 32px);
      height: 640px;
      max-height: calc(100vh - 120px);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.96);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #ks-agent-window.ks-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .ks-header {
      padding: 14px 18px;
      background: rgba(30, 41, 59, 0.7);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ks-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ks-header-title {
      font-size: 14px;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: 0.2px;
    }

    .ks-header-status {
      font-size: 11px;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ks-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .ks-header-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
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
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }

    .ks-live-ribbon {
      background: linear-gradient(90deg, rgba(2, 132, 199, 0.15), rgba(124, 58, 237, 0.15));
      border-bottom: 1px solid rgba(56, 189, 248, 0.2);
      padding: 6px 16px;
      font-size: 11px;
      color: #38bdf8;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ks-live-ribbon a {
      color: #a855f7;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }

    .ks-live-ribbon a:hover {
      color: #c084fc;
      text-decoration: underline;
    }

    .ks-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scroll-behavior: smooth;
    }

    .ks-messages::-webkit-scrollbar {
      width: 5px;
    }

    .ks-messages::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
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
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: #ffffff;
      border-radius: 16px 16px 4px 16px;
      padding: 10px 14px;
      font-size: 13px;
      line-height: 1.45;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
    }

    .ks-msg-bot {
      align-self: flex-start;
      max-width: 94%;
    }

    .ks-msg-bot .ks-bubble {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
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
      color: #38bdf8;
      text-decoration: underline;
    }
    .ks-bubble code {
      background: rgba(15, 23, 42, 0.8);
      color: #38bdf8;
      padding: 2px 5px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
    }
    .ks-bubble pre {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.1);
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
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .ks-copy-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #38bdf8;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ks-copy-btn:hover {
      background: rgba(255, 255, 255, 0.2);
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
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(139, 92, 246, 0.35);
      border-radius: 12px;
      overflow: hidden;
      font-size: 11px;
    }

    .ks-thought-header {
      padding: 6px 10px;
      background: rgba(139, 92, 246, 0.12);
      color: #c084fc;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;
      font-weight: 600;
    }

    .ks-thought-content {
      padding: 8px 10px;
      color: #94a3b8;
      border-top: 1px solid rgba(139, 92, 246, 0.2);
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
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(15, 23, 42, 0.6);
    }

    .ks-chips::-webkit-scrollbar {
      display: none;
    }

    .ks-chip {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94a3b8;
      border-radius: 9999px;
      padding: 4px 10px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .ks-chip:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: #38bdf8;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .ks-footer {
      padding: 12px 14px;
      background: rgba(15, 23, 42, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ks-input {
      flex: 1;
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 13px;
      color: #f8fafc;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .ks-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
    }

    .ks-send-btn {
      background: linear-gradient(135deg, #0284c7, #7c3aed);
      border: none;
      color: #ffffff;
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
      box-shadow: 0 0 15px rgba(2, 132, 199, 0.5);
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
  `;
  document.head.appendChild(styleEl);

  // ==========================================
  // 4. UI CREATION & EVENT LISTENERS
  // ==========================================
  function createAgentUI() {
    const root = document.createElement('div');
    root.id = 'ks-agent-root';

    root.innerHTML = `
      <div id="ks-agent-launcher" title="Open KS Thinking Agent">
        <div class="ks-avatar-ring">
          🧠
          <div class="ks-online-dot"></div>
        </div>
        <div class="ks-launcher-text">
          <span class="ks-launcher-title">KS Thinking Agent</span>
          <span class="ks-launcher-subtitle">Ask anything • Live sync</span>
        </div>
      </div>

      <div id="ks-agent-window">
        <div class="ks-header">
          <div class="ks-header-left">
            <div class="ks-avatar-ring" style="width:32px;height:32px;font-size:16px;">
              🧠
              <div class="ks-online-dot" style="width:8px;height:8px;"></div>
            </div>
            <div>
              <div class="ks-header-title">KS Thinking Agent</div>
              <div class="ks-header-status">Autonomous Brain • Live Synced</div>
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
              👋 <b>Hi! I am the KS Thinking Agent</b> — Khandeshwar's autonomous AI representative and full-spectrum coding assistant.
              <br/><br/>
              <b>What I do:</b>
              <ul>
                <li>🛡️ <b>Projects &amp; Architectures:</b> Explain what tech stack Khandeshwar uses and how he architects systems (ScrollGuard, auto_green, commercial portals).</li>
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
          <div class="ks-chip" data-q="Explain how Manifest V3 works in Chrome extensions">🧠 Chrome MV3</div>
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
            <span>🧠 Reasoning Chain (${thoughts.length} steps)</span>
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
        <span>🧠</span>
        <span id="${id}-text" style="font-size:12px;color:#38bdf8;">KS Agent is activating cognitive brain...</span>
      </div>
    `;
    container.appendChild(thinkDiv);
    container.scrollTop = container.scrollHeight;

    // Animate thinking steps
    setTimeout(() => {
      const el = document.getElementById(`${id}-text`);
      if (el) el.textContent = 'Inspecting live GitHub telemetry & security boundaries...';
    }, 600);

    setTimeout(() => {
      const el = document.getElementById(`${id}-text`);
      if (el) el.textContent = 'Synthesizing neural reasoning & formulating verified response...';
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
You are "KS Thinking Agent", the autonomous, highly articulate AI representative and technical assistant of Khandeshwar Suryavanshi (khandeshwar51).

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
- Daily Automation: "auto_green" runs daily GitHub Actions cron sync at 20:00 IST for continuous engineering journal telemetry.

=== FLAGSHIPS & HOW HE USES TECH ===
1. ScrollGuard (https://github.com/khandeshwar51/scrollguard):
   - Tech: TypeScript, React, Chrome Manifest V3, IndexedDB, Focus scoring heuristics.
   - Purpose: Real-time privacy-first behavioral intervention stopping short-form doomscrolling (Reels, Shorts, TikTok, X).
   - How he engineered it: Solved Chrome MV3 ephemeral service worker termination cycles using IndexedDB state hydration. Zero external cloud tracking. 60fps velocity monitoring.
2. auto_green (https://github.com/khandeshwar51/auto_green):
   - Automated CI/CD journal tracking daily engineering practice and Conventional Commits.

=== COMMERCIAL CLIENT DELIVERABLES ===
1. Balaji Earthmovers (https://balajiearthmoversmumbai.com): React, Tailwind, sticky machinery storytelling, excavation volume estimator, sub-1.2s LCP load time.
2. Balaji Farm Stay (https://pratik1258m.github.io/Balajifarm/): Agro-hospitality booking portal with direct WhatsApp conversion funnel (+40% booking rate).
3. Riverside Farm (https://pratik1258m.github.io/Riverside/): Mobile-first real estate & farm stay portal with Google Search Console indexing.
4. Yamuna Enterprises: Industrial oil machinery catalog.
5. Vaity Aqua Resort: Modern hospitality portal with optimized asset pipeline.
6. VidScript Web: AI video-to-document & intelligent transcription pipeline powered by Groq LLMs.
7. Real Estate Intelligence (https://github.com/pratik1258m/realestate): Automated Indian real estate news intelligence & distribution platform scraping 32 RSS feeds (500+ daily articles), Jaccard deduplication, Groq AI LLM summaries, daily 8 AM WhatsApp/Email broadcasts, and dynamic branded PDF reporting.

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

    // 1. Live GitHub / Commits / Latest Activity
    if (q.includes('latest') || q.includes('commit') || q.includes('recent') || q.includes('update') || q.includes('github activity') || q.includes('streak')) {
      thoughts.push(`Synthesizing live GitHub telemetry: Repo '${liveGitHubData.latestRepo}', Commit '${liveGitHubData.latestCommit}'`);
      
      const res = `
⚡ **Live GitHub Activity for [@khandeshwar51](https://github.com/khandeshwar51)**:

- **Latest Work:** Committed to \`${liveGitHubData.latestRepo}\` (${liveGitHubData.latestTime})
- **Latest Commit Message:** \`${liveGitHubData.latestCommit}\`
- **Contribution Streak:** **1,006+ contributions** over the past year with a completely solid green calendar!
- **Daily Telemetry:** Automated via \`auto_green\` workflow running daily at 20:00 IST to log continuous milestones.
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
🧠 **KS Thinking Agent Analysis:**

Regarding: *"**${originalQuery}**"*

I am continuously indexing Khandeshwar's newest GitHub commits, algorithmic repositories, and client platforms.

Feel free to ask about:
- **Khandeshwar's Stack & Projects:** Ask about **ScrollGuard**, **Balaji Earthmovers**, or **auto_green**.
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createAgentUI();
      fetchLiveGitHubTelemetry();
    });
  } else {
    createAgentUI();
    fetchLiveGitHubTelemetry();
  }

})();
