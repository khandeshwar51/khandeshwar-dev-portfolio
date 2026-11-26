/**
 * Galaxy + Programmer Theme Atmosphere Engine
 * Khandeshwar Suryavanshi Portfolio
 *
 * Architecture:
 * - Galaxy Atmosphere (nebulae, ringed planet, orbital paths): Active across all pages for consistent cosmic depth.
 * - Programmer Panels (3D VS Code explorer, React atom, Code editor, terminal with typing, TS, GitHub):
 *   Exclusively scoped to the Home page hero component via route-level lifecycle management.
 *   Unmounts and stops all animations/timers when navigating to /about, /education, /skills, /projects, /contact.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Phrases to cycle through in the terminal panel (slow, professional, subtle)
  var TERMINAL_PHRASES = [
    'Build. Deploy. Grow.',
    'AI Systems & Modern Web Platforms.',
    'Engineering high-impact solutions.',
    'const createBetterWeb = () => <Dream />;'
  ];

  var panelsMounted = false;
  var typewriterTimer = null;
  var programmerParallaxHandler = null;

  function isHomeRoute() {
    var p = (window.location.pathname || '/').toLowerCase();
    if (p.length > 1 && p.endsWith('/')) {
      p = p.slice(0, -1);
    }
    var h = (window.location.hash || '').toLowerCase();
    // Exclude subpages explicitly
    if (p.indexOf('/about') !== -1 || p.indexOf('/education') !== -1 || p.indexOf('/skills') !== -1 || p.indexOf('/projects') !== -1 || p.indexOf('/contact') !== -1) {
      return false;
    }
    if (h.indexOf('about') !== -1 || h.indexOf('education') !== -1 || h.indexOf('skills') !== -1 || h.indexOf('projects') !== -1 || h.indexOf('contact') !== -1) {
      return false;
    }
    return p === '/' || p === '' || p === '/index.html' || p === '/portfolio' || p === '/portfolio/index.html';
  }

  function findHeroContainer() {
    var hero = document.querySelector('.min-h-screen.flex.items-center.justify-center');
    if (hero) return hero;
    var candidates = document.querySelectorAll('.min-h-screen');
    for (var i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (c.classList.contains('flex') && c.classList.contains('items-center') && c.classList.contains('justify-center')) {
        return c;
      }
    }
    return null;
  }

  /* -------------------------------------------------------------
   * 1. Global Galaxy Atmosphere (Persistent on all pages)
   * ------------------------------------------------------------- */
    function getGalaxyBackdropHTML() {
    return [
      '<!-- Deep Space Nebula Glow & Readability Layers -->',
      '<div class="ks-nebula-layer">',
      '  <div class="ks-nebula ks-nebula-hero-glow"></div>',
      '  <div class="ks-nebula ks-nebula-center"></div>',
      '</div>'
    ].join('\n');
  }

  function mountAtmosphere() {
    var existing = document.getElementById('ks-galaxy-backdrop');
    if (existing) return existing;

    var container = document.createElement('div');
    container.id = 'ks-galaxy-backdrop';
    container.className = 'ks-galaxy-backdrop';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = getGalaxyBackdropHTML();

    var root = document.getElementById('root');
    if (root && root.parentNode) {
      root.parentNode.insertBefore(container, root);
    } else {
      document.body.appendChild(container);
    }

    return container;
  }

  /* -------------------------------------------------------------
   * 2. Home Page Only: Floating Programmer Clusters, Planets & Lunar Landscape
   * ------------------------------------------------------------- */
    function getProgrammerPanelsHTML() {
    return [
      '<!-- Left Developer Cluster: 3D VS Code Explorer Window & Symbols -->',
      '<div class="ks-left-cluster" id="ks-left-cluster">',
      '  <!-- Floating </> Badge -->',
      '  <div class="ks-badge-code" title="Clean Code">&lt;/&gt;</div>',
      '  <!-- VS Code Explorer Window -->',
      '  <div class="ks-vscode-window">',
      '    <div class="ks-window-header">',
      '      <div class="ks-header-left">',
      '        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">',
      '          <path d="M17.583 0l-9.875 9.167L3.417 5.5 0 8.083l5.583 4.25L0 16.583 3.417 19.167l4.291-3.667L17.583 24 24 21.083V2.917L17.583 0zm0 4.167v15.666l-6.416-5.416 6.416-10.25z"/>',
      '        </svg>',
      '        <span>Explorer</span>',
      '      </div>',
      '      <div class="ks-window-dots">',
      '        <span class="ks-dot ks-dot-red"></span>',
      '        <span class="ks-dot ks-dot-yellow"></span>',
      '        <span class="ks-dot ks-dot-green"></span>',
      '      </div>',
      '    </div>',
      '    <ul class="ks-file-tree">',
      '      <li class="ks-file-item"><span class="ks-folder-icon">▾</span> src</li>',
      '      <li class="ks-file-item ks-indent-1"><span class="ks-folder-icon">▾</span> components</li>',
      '      <li class="ks-file-item ks-indent-1"><span class="ks-folder-icon">▾</span> pages</li>',
      '      <li class="ks-file-item ks-indent-1"><span class="ks-folder-icon">▾</span> utils</li>',
      '      <li class="ks-file-item ks-indent-2 ks-active-file"><span class="ks-react-icon">⚛</span> App.tsx</li>',
      '      <li class="ks-file-item ks-indent-2"><span class="ks-react-icon">⚛</span> index.tsx</li>',
      '    </ul>',
      '  </div>',
      '  <!-- Floating React Atom Symbol -->',
      '  <div class="ks-react-atom-wrap" title="React.js Ecosystem">',
      '    <svg class="ks-react-atom-svg" viewBox="0 0 100 100" fill="none">',
      '      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00E5E5" stroke-width="2.5" opacity="0.9" />',
      '      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00E5E5" stroke-width="2.5" opacity="0.9" transform="rotate(60 50 50)" />',
      '      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00E5E5" stroke-width="2.5" opacity="0.9" transform="rotate(120 50 50)" />',
      '      <circle cx="50" cy="50" r="6" fill="#00CFFF" />',
      '    </svg>',
      '  </div>',
      '</div>',
      '',
      '<!-- Right Developer Cluster: 3D Code Editor, Terminal, TS, GitHub -->',
      '<div class="ks-right-cluster" id="ks-right-cluster">',
      '  <!-- Floating Badges -->',
      '  <div class="ks-right-badges">',
      '    <div class="ks-badge-ts" title="TypeScript">TS</div>',
      '    <div class="ks-badge-github" title="GitHub Open Source">',
      '      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">',
      '        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>',
      '      </svg>',
      '    </div>',
      '  </div>',
      '  <!-- Code Editor Window -->',
      '  <div class="ks-editor-window">',
      '    <div class="ks-editor-header">',
      '      <div class="ks-window-dots">',
      '        <span class="ks-dot ks-dot-red"></span>',
      '        <span class="ks-dot ks-dot-yellow"></span>',
      '        <span class="ks-dot ks-dot-green"></span>',
      '      </div>',
      '      <span class="ks-tab-pill">',
      '        <span style="color:#00E5E5;">⚛</span> App.tsx',
      '      </span>',
      '    </div>',
      '    <pre class="ks-code-body">',
      '<span class="ks-code-line"><span class="ks-ln">1</span></span>',
      '<span class="ks-code-line"><span class="ks-ln">2</span>  <span class="ks-syn-kw">const</span> <span class="ks-syn-fn">createBetterWeb</span> <span class="ks-syn-op">=</span> () <span class="ks-syn-op">=&gt;</span> <span class="ks-syn-op">{</span></span>',
      '<span class="ks-code-line"><span class="ks-ln">3</span>    <span class="ks-syn-kw">return</span> (</span>',
      '<span class="ks-code-line"><span class="ks-ln">4</span>      <span class="ks-syn-tag">&lt;</span><span class="ks-syn-comp">Dream</span> <span class="ks-syn-tag">/&gt;</span></span>',
      '<span class="ks-code-line"><span class="ks-ln">5</span>    );</span>',
      '<span class="ks-code-line"><span class="ks-ln">6</span>  <span class="ks-syn-op">}</span>;</span>',
      '</pre>',
      '  </div>',
      '  <!-- Mini Terminal Panel -->',
      '  <div class="ks-terminal-window">',
      '    <div class="ks-terminal-header">',
      '      <span>terminal &mdash; zsh</span>',
      '      <span style="color:#00E5A3;">● active</span>',
      '    </div>',
      '    <div class="ks-terminal-body">',
      '      <span class="ks-terminal-prompt">&gt;</span>',
      '      <span class="ks-terminal-text" id="ks-terminal-typewriter">Build. Deploy. Grow.</span>',
      '      <span class="ks-terminal-cursor"></span>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function mountProgrammerPanels(targetContainer) {
    if (!isHomeRoute()) return;

    var container = targetContainer || findHeroContainer();
    if (!container) return;

    var existing = document.getElementById('ks-programmer-panels');
    if (existing) {
      if (existing.parentElement !== container) {
        container.appendChild(existing);
      }
      panelsMounted = true;
      initTypewriter();
      initProgrammerParallax();
      return;
    }

    var wrap = document.createElement('div');
    wrap.id = 'ks-programmer-panels';
    wrap.className = 'ks-programmer-panels';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = getProgrammerPanelsHTML();

    container.appendChild(wrap);
    panelsMounted = true;

    initTypewriter();
    initProgrammerParallax();
  }

    function unmountProgrammerPanels() {
    if (typewriterTimer) {
      clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }

    if (programmerParallaxHandler) {
      window.removeEventListener('mousemove', programmerParallaxHandler);
      programmerParallaxHandler = null;
    }

    var panels = document.getElementById('ks-programmer-panels');
    if (panels) panels.remove();

    var ids = ['ks-left-cluster', 'ks-right-cluster'];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });

    panelsMounted = false;
  }

  // Typewriter Loop for Terminal Panel
  function initTypewriter() {
    if (typewriterTimer) {
      clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }
    var el = document.getElementById('ks-terminal-typewriter');
    if (!el || prefersReducedMotion.matches) return;

    var phraseIndex = 0;
    var charIndex = el.textContent.length;
    var isDeleting = true;
    var typingSpeed = 65;

    function tick() {
      if (!panelsMounted) return;
      if (document.hidden) {
        typewriterTimer = setTimeout(tick, 1000);
        return;
      }

      var currentPhrase = TERMINAL_PHRASES[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentPhrase.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % TERMINAL_PHRASES.length;
          typewriterTimer = setTimeout(tick, 600);
          return;
        }
      } else {
        charIndex++;
        el.textContent = currentPhrase.substring(0, charIndex);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          typewriterTimer = setTimeout(tick, 4500);
          return;
        }
      }

      var delay = isDeleting ? 30 : typingSpeed;
      typewriterTimer = setTimeout(tick, delay);
    }

    typewriterTimer = setTimeout(tick, 3500);
  }

    // Subtle Mouse Parallax for Programmer Panels on Desktop
  function initProgrammerParallax() {
    if (prefersReducedMotion.matches) return;
    if (programmerParallaxHandler) return;

    var leftCluster = document.getElementById('ks-left-cluster');
    var rightCluster = document.getElementById('ks-right-cluster');
    if (!leftCluster && !rightCluster) return;

    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var isTicking = false;

    programmerParallaxHandler = function (e) {
      if (!panelsMounted || window.innerWidth < 1024) return;
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('mousemove', programmerParallaxHandler, { passive: true });

    function updateParallax() {
      if (!panelsMounted) {
        isTicking = false;
        return;
      }
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (leftCluster) {
        leftCluster.style.marginLeft = (currentX * -18) + 'px';
        leftCluster.style.marginTop = (currentY * -14) + 'px';
      }

      if (rightCluster) {
        rightCluster.style.marginRight = (currentX * 18) + 'px';
        rightCluster.style.marginTop = (currentY * -14) + 'px';
      }

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    }
  }

  // Route-Level Navigation Interceptor & Auto-Sync
  var isSyncing = false;
  // Route-Level Navigation Interceptor & Auto-Sync
  var isSyncing = false;

  // Sync Hero content to match reference layout perfectly:
  // Subtitle: "AI System Developer, Full-Stack Architect & Software Engineer"
  // Bio: "AI System Developer & Full-Stack Web Architect based in Mumbai. I engineer high-performance commercial web platforms, autonomous AI automation systems, and scalable production software for businesses & startups."
  function syncHeroContent(hero) {
    if (!hero) return;
    var pList = hero.querySelectorAll('p');
    for (var i = 0; i < pList.length; i++) {
      var p = pList[i];
      var txt = (p.textContent || '').trim();
      // Subtitle detection (exclude the bio paragraph)
      if (txt.indexOf('Developer') !== -1 && (txt.indexOf('Architect') !== -1 || txt.indexOf('AI') !== -1 || txt.indexOf('Full-Stack') !== -1)) {
        if (!p.classList.contains('text-lg') && p.textContent !== 'Full-Stack Developer, AI Systems & Software Engineering') {
          p.classList.add('ks-hero-subtitle');
          p.textContent = 'Full-Stack Developer, AI Systems & Software Engineering';
        }
      }
      // Bio description detection
      if (txt.indexOf('building') !== -1 || txt.indexOf('autonomous systems') !== -1 || txt.indexOf('Vartak') !== -1 || txt.indexOf('student') !== -1 || txt.indexOf('commercial') !== -1 || txt.indexOf('Architect based in Mumbai') !== -1) {
        var professionalBio = 'AI System Developer & Full-Stack Web Architect based in Mumbai. I engineer high-performance commercial web platforms, autonomous AI automation systems, and scalable production software for businesses & startups.';
        if (p.textContent !== professionalBio) {
          p.classList.add('ks-hero-bio');
          p.textContent = professionalBio;
        }
      }
    }

    // Ensure Explore Projects button has the arrow "Explore Projects →"
    var projBtn = hero.querySelector('a[href="/projects"] button, a[href*="projects"] button');
    if (projBtn) {
      var btnText = projBtn.innerText || projBtn.textContent || '';
      if (btnText.indexOf('→') === -1) {
        var lastNode = projBtn.lastChild;
        if (lastNode && lastNode.nodeType === 3) {
          lastNode.nodeValue = 'Explore Projects →';
        }
      }
    }
  }

  /* -------------------------------------------------------------
   * 3. Projects Page: Commercial Client Deliveries Matrix & Cards
   * ------------------------------------------------------------- */
  function isProjectsRoute() {
    var p = (window.location.pathname || '').toLowerCase();
    var h = (window.location.hash || '').toLowerCase();
    return p.indexOf('/projects') !== -1 || h.indexOf('projects') !== -1;
  }

  function getClientMatrixHTML() {
    return [
      '<div class="ks-client-matrix-section" id="ks-client-matrix-section">',
      '  <div class="ks-matrix-header-bar">',
      '    <div class="ks-matrix-title-area">',
      '      <div class="ks-matrix-badge">',
      '        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
      '        <span>Production Deliveries Ledger</span>',
      '      </div>',
      '      <h3 class="ks-matrix-title">Client Deliveries &amp; Commercial Systems Matrix</h3>',
      '    </div>',
      '    <span class="ks-matrix-count-badge">6 Verified Deployments</span>',
      '  </div>',
      '  <div class="ks-matrix-table-wrap">',
      '    <table class="ks-matrix-table">',
      '      <thead>',
      '        <tr>',
      '          <th style="width: 22%;">Client Project</th>',
      '          <th style="width: 24%;">Focus &amp; Scope</th>',
      '          <th style="width: 38%;">Deliverables &amp; Quantifiable Impact</th>',
      '          <th style="width: 16%;">Stack</th>',
      '        </tr>',
      '      </thead>',
      '      <tbody>',
      '        <!-- 1. Balaji Earthmovers -->',
      '        <tr>',
      '          <td class="ks-td-project">',
      '            <div class="ks-proj-name-row"><span class="ks-proj-icon">🚜</span><span class="ks-proj-name">Balaji Earthmovers</span></div>',
      '            <div class="ks-td-actions">',
      '              <a href="https://balajiearthmoversmumbai.com" target="_blank" rel="noopener noreferrer" class="ks-action-live orange">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
      '                Live Site',
      '              </a>',
      '              <a href="https://github.com/pratik1258m/Balaji-Earthmovers" target="_blank" rel="noopener noreferrer" class="ks-action-repo">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '                Repository',
      '              </a>',
      '            </div>',
      '          </td>',
      '          <td class="ks-td-focus">Heavy Earthmoving &amp; Civil Engineering Platform (Est. 1991)</td>',
      '          <td class="ks-td-deliverables">Engineered sticky scroll-pinned excavation storytelling, Volvo/Komatsu fleet spec sheets, landmark project ledger, and interactive volume estimation desk (&lt;1.2s LCP load time).</td>',
      '          <td class="ks-td-stack"><span class="ks-table-tag">React</span><span class="ks-table-tag">Tailwind CSS</span><span class="ks-table-tag">Interactive UI</span></td>',
      '        </tr>',
      '        <!-- 2. Balaji Farm Stay -->',
      '        <tr>',
      '          <td class="ks-td-project">',
      '            <div class="ks-proj-name-row"><span class="ks-proj-icon">🏡</span><span class="ks-proj-name">Balaji Farm Stay</span></div>',
      '            <div class="ks-td-actions">',
      '              <a href="https://pratik1258m.github.io/Balajifarm/" target="_blank" rel="noopener noreferrer" class="ks-action-live green">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      '                Live Demo',
      '              </a>',
      '              <a href="https://github.com/pratik1258m/Balajifarm" target="_blank" rel="noopener noreferrer" class="ks-action-repo">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '                Repository',
      '              </a>',
      '            </div>',
      '          </td>',
      '          <td class="ks-td-focus">Tourism &amp; Agro-Hospitality Portal</td>',
      '          <td class="ks-td-deliverables">Developed conversion-focused responsive design with interactive photo showcase and direct WhatsApp booking funnel (+40% booking inquiry conversion).</td>',
      '          <td class="ks-td-stack"><span class="ks-table-tag">Responsive Web</span><span class="ks-table-tag">WhatsApp Funnel</span><span class="ks-table-tag">Technical SEO</span></td>',
      '        </tr>',
      '        <!-- 3. Riverside Farm -->',
      '        <tr>',
      '          <td class="ks-td-project">',
      '            <div class="ks-proj-name-row"><span class="ks-proj-icon">🌿</span><span class="ks-proj-name">Riverside Farm</span></div>',
      '            <div class="ks-td-actions">',
      '              <a href="https://pratik1258m.github.io/Riverside/" target="_blank" rel="noopener noreferrer" class="ks-action-live blue">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      '                Live Demo',
      '              </a>',
      '              <a href="https://github.com/pratik1258m/Riverside" target="_blank" rel="noopener noreferrer" class="ks-action-repo">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '                Repository',
      '              </a>',
      '            </div>',
      '          </td>',
      '          <td class="ks-td-focus">Real Estate &amp; Farm Stay Portal</td>',
      '          <td class="ks-td-deliverables">Built mobile-first booking experience, speed-optimized UI, lead capture funnels, and Google Search Console indexing for high local search visibility.</td>',
      '          <td class="ks-td-stack"><span class="ks-table-tag">Mobile-First</span><span class="ks-table-tag">Lead Funnels</span><span class="ks-table-tag">Search Console</span></td>',
      '        </tr>',
      '        <!-- 4. Yamuna Enterprises -->',
      '        <tr>',
      '          <td class="ks-td-project">',
      '            <div class="ks-proj-name-row"><span class="ks-proj-icon">⚙️</span><span class="ks-proj-name">Yamuna Enterprises</span></div>',
      '            <div class="ks-td-actions">',
      '              <a href="https://github.com/pratik1258m/Yamuna_Enterprises" target="_blank" rel="noopener noreferrer" class="ks-action-repo">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '                Repository',
      '              </a>',
      '            </div>',
      '          </td>',
      '          <td class="ks-td-focus">Oil Machinery Manufacturing Enterprise</td>',
      '          <td class="ks-td-deliverables">Architected industrial equipment catalog, structured product presentation, Search Console indexing, and custom domain routing.</td>',
      '          <td class="ks-td-stack"><span class="ks-table-tag">Catalog Architecture</span><span class="ks-table-tag">SEO Indexing</span><span class="ks-table-tag">Performance</span></td>',
      '        </tr>',
      '        <!-- 5. VidScript Web -->',
      '        <tr>',
      '          <td class="ks-td-project">',
      '            <div class="ks-proj-name-row"><span class="ks-proj-icon">📄</span><span class="ks-proj-name">VidScript Web</span></div>',
      '            <div class="ks-td-actions">',
      '              <span class="ks-action-private">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
      '                Private Repo',
      '              </span>',
      '            </div>',
      '          </td>',
      '          <td class="ks-td-focus">AI Video-to-Document &amp; Intelligent Transcription</td>',
      '          <td class="ks-td-deliverables">Architected full-stack pipeline for video audio ingestion, verbatim transcript generation, executive AI summaries via Groq LLMs, and multi-format export (PDF, DOCX, Excel).</td>',
      '          <td class="ks-td-stack"><span class="ks-table-tag">Python</span><span class="ks-table-tag">GenAI / NLP</span><span class="ks-table-tag">Groq LLMs</span><span class="ks-table-tag">Document Pipelines</span></td>',
      '        </tr>',
      '        <!-- 6. Real Estate Intelligence -->',
      '        <tr>',
      '          <td class="ks-td-project">',
      '            <div class="ks-proj-name-row"><span class="ks-proj-icon">🏢</span><span class="ks-proj-name">Real Estate Intelligence</span></div>',
      '            <div class="ks-td-actions">',
      '              <span class="ks-action-private">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
      '                Private Repo',
      '              </span>',
      '              <a href="https://github.com/pratik1258m/realestate" target="_blank" rel="noopener noreferrer" class="ks-action-repo">',
      '                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '                Repository',
      '              </a>',
      '            </div>',
      '          </td>',
      '          <td class="ks-td-focus">Automated Real Estate News Intelligence &amp; Distribution Platform</td>',
      '          <td class="ks-td-deliverables">Scrapes 500+ daily articles from 32 RSS feeds, Jaccard deduplication, Groq AI LLM summaries, daily 8 AM WhatsApp/Email broadcasts, and branded PDF reports.</td>',
      '          <td class="ks-td-stack"><span class="ks-table-tag">Python</span><span class="ks-table-tag">Groq AI</span><span class="ks-table-tag">Node.js</span><span class="ks-table-tag">WhatsApp API</span><span class="ks-table-tag">jsPDF</span></td>',
      '        </tr>',
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function getYamunaCardHTML() {
    return [
      '<div class="ks-project-card ks-injected-card" data-filter="Client Projects" id="ks-card-yamuna">',
      '  <div class="ks-accent-bar" style="background: linear-gradient(90deg, #f59e0b, #10b981);"></div>',
      '  <div class="ks-proj-body">',
      '    <div class="ks-proj-header">',
      '      <div>',
      '        <div class="ks-proj-pills">',
      '          <span class="ks-meta-pill" style="background: rgba(16,185,129,0.16); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.35);">Client Project</span>',
      '          <span class="ks-meta-pill" style="background: rgba(51,65,85,0.75); color: #cbd5e1; border: 1px solid rgba(148,163,184,0.22);">Client Delivery • Oil Machinery Manufacturing</span>',
      '          <span class="ks-meta-pill" style="background: rgba(168,85,247,0.16); color: #e9d5ff; border: 1px solid rgba(168,85,247,0.32);">Industrial Catalog • Custom Routing</span>',
      '        </div>',
      '        <h3 class="text-3xl font-bold text-white" style="line-height: 1.25;">Yamuna Enterprises</h3>',
      '      </div>',
      '      <div class="ks-proj-actions">',
      '        <a href="https://github.com/pratik1258m/Yamuna_Enterprises" target="_blank" rel="noopener noreferrer" class="ks-btn-secondary" style="display:inline-flex;align-items:center;gap:0.4rem;">',
      '          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '          Repository',
      '        </a>',
      '        <span class="ks-verified-badge" style="display:inline-flex;align-items:center;gap:0.35rem;">',
      '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
      '          Verified Client Delivery',
      '        </span>',
      '      </div>',
      '    </div>',
      '    <p class="text-gray-300" style="font-size: 1rem; line-height: 1.65;">',
      '      Architected industrial equipment catalog, structured product presentation, Search Console indexing, and custom domain routing for a commercial oil machinery enterprise.',
      '    </p>',
      '    <div class="ks-how-box">',
      '      <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #ffffff; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem;">',
      '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
      '        How It Works — System Architecture &amp; Flow',
      '      </h4>',
      '      <div class="ks-steps-grid cols-3">',
      '        <div class="ks-step-card"><span class="ks-step-num">01. Equipment Showcase</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Structured catalog architecture highlighting edible oil extraction machinery, cold press units, and technical specifications.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">02. Search Console SEO</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Configured Google Search Console indexing and schema markup for targeted industrial B2B machinery buyer queries.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">03. Performance Routing</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Zero-overhead static distribution with clean custom domain routing and instant mobile spec sheet loading.</p></div>',
      '      </div>',
      '    </div>',
      '    <div class="ks-proj-matrix">',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #60a5fa; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Key Features</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Industrial equipment catalog &amp; machinery showcase</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Custom domain routing &amp; DNS architecture</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Google Search Console structured indexing</span></li>',
      '        </ul>',
      '      </div>',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #c084fc; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Engineering Challenges</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #c084fc; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Organizing complex industrial specifications for mobile readability</span></li>',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #c084fc; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Achieving organic search rankings for niche machinery terms</span></li>',
      '        </ul>',
      '      </div>',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #34d399; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Results &amp; Outcomes</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #34d399; margin-top: 0.45rem; flex-shrink: 0;"></span><span>High organic search indexing across industrial machinery keywords</span></li>',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #34d399; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Instant mobile spec retrieval for client inquiries</span></li>',
      '        </ul>',
      '      </div>',
      '    </div>',
      '    <div class="ks-tech-row">',
      '      <span class="ks-tech-pill">Catalog Architecture</span>',
      '      <span class="ks-tech-pill">SEO Indexing</span>',
      '      <span class="ks-tech-pill">Performance</span>',
      '      <span class="ks-tech-pill">DNS &amp; Routing</span>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function getVidScriptCardHTML() {
    return [
      '<div class="ks-project-card ks-injected-card" data-filter="Client Projects" id="ks-card-vidscript">',
      '  <div class="ks-accent-bar" style="background: linear-gradient(90deg, #38bdf8, #818cf8);"></div>',
      '  <div class="ks-proj-body">',
      '    <div class="ks-proj-header">',
      '      <div>',
      '        <div class="ks-proj-pills">',
      '          <span class="ks-meta-pill" style="background: rgba(16,185,129,0.16); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.35);">Client Project</span>',
      '          <span class="ks-meta-pill" style="background: rgba(51,65,85,0.75); color: #cbd5e1; border: 1px solid rgba(148,163,184,0.22);">AI Architecture • Video-to-Document</span>',
      '          <span class="ks-meta-pill" style="background: rgba(168,85,247,0.16); color: #e9d5ff; border: 1px solid rgba(168,85,247,0.32);">Groq LLMs • Multi-Format Export</span>',
      '        </div>',
      '        <h3 class="text-3xl font-bold text-white" style="line-height: 1.25;">VidScript Web</h3>',
      '      </div>',
      '      <div class="ks-proj-actions">',
      '        <span class="ks-action-private" style="padding: 0.45rem 0.85rem; font-size: 0.85rem; border-radius: 0.5rem;">',
      '          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
      '          Private Commercial Repo',
      '        </span>',
      '        <span class="ks-verified-badge" style="display:inline-flex;align-items:center;gap:0.35rem;">',
      '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
      '          Verified Client Delivery',
      '        </span>',
      '      </div>',
      '    </div>',
      '    <p class="text-gray-300" style="font-size: 1rem; line-height: 1.65;">',
      '      Architected full-stack pipeline for video audio ingestion, verbatim transcript generation, executive AI summaries via Groq LLMs, and multi-format export (PDF, DOCX, Excel).',
      '    </p>',
      '    <div class="ks-how-box">',
      '      <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #ffffff; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem;">',
      '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
      '        How It Works — System Architecture &amp; Flow',
      '      </h4>',
      '      <div class="ks-steps-grid cols-4">',
      '        <div class="ks-step-card"><span class="ks-step-num">01. Audio Ingestion</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Ingests video &amp; audio streams and extracts high-fidelity audio tracks for transcription processing.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">02. Transcription &amp; NLP</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Generates timestamped verbatim transcripts with speaker separation and entity extraction.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">03. Groq LLM Synthesizer</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Executes ultra-low latency summarization and structured document generation via Groq LLMs.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">04. Multi-Format Exporter</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Compiles formatted documents into styled PDF reports, DOCX briefings, and Excel matrices.</p></div>',
      '      </div>',
      '    </div>',
      '    <div class="ks-proj-matrix">',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #60a5fa; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Key Features</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Video/audio ingestion pipeline</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Groq LLM executive brief generation</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Multi-format export (PDF, DOCX, Excel)</span></li>',
      '        </ul>',
      '      </div>',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #c084fc; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Engineering Challenges</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #c084fc; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Processing long-form video audio efficiently without memory overflow</span></li>',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #c084fc; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Maintaining structured formatting and tone in LLM summaries</span></li>',
      '        </ul>',
      '      </div>',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #34d399; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Results &amp; Outcomes</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #34d399; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Ultra-fast transcript and summary turnaround using Groq inference</span></li>',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #34d399; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Production-ready document generation across 3 formats</span></li>',
      '        </ul>',
      '      </div>',
      '    </div>',
      '    <div class="ks-tech-row">',
      '      <span class="ks-tech-pill">Python</span>',
      '      <span class="ks-tech-pill">GenAI / NLP</span>',
      '      <span class="ks-tech-pill">Groq LLMs</span>',
      '      <span class="ks-tech-pill">Document Pipelines</span>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function getRealEstateCardHTML() {
    return [
      '<div class="ks-project-card ks-injected-card" data-filter="Client Projects" id="ks-card-realestate">',
      '  <div class="ks-accent-bar" style="background: linear-gradient(90deg, #10b981, #06b6d4);"></div>',
      '  <div class="ks-proj-body">',
      '    <div class="ks-proj-header">',
      '      <div>',
      '        <div class="ks-proj-pills">',
      '          <span class="ks-meta-pill" style="background: rgba(16,185,129,0.16); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.35);">Client Project</span>',
      '          <span class="ks-meta-pill" style="background: rgba(51,65,85,0.75); color: #cbd5e1; border: 1px solid rgba(148,163,184,0.22);">Data Engineering • Intelligence Automation</span>',
      '          <span class="ks-meta-pill" style="background: rgba(168,85,247,0.16); color: #e9d5ff; border: 1px solid rgba(168,85,247,0.32);">500+ Daily Articles • 32 Feeds</span>',
      '        </div>',
      '        <h3 class="text-3xl font-bold text-white" style="line-height: 1.25;">Real Estate Intelligence</h3>',
      '      </div>',
      '      <div class="ks-proj-actions">',
      '        <a href="https://github.com/pratik1258m/realestate" target="_blank" rel="noopener noreferrer" class="ks-btn-secondary" style="display:inline-flex;align-items:center;gap:0.4rem;">',
      '          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      '          Repository',
      '        </a>',
      '        <span class="ks-verified-badge" style="display:inline-flex;align-items:center;gap:0.35rem;">',
      '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
      '          Verified Client Delivery',
      '        </span>',
      '      </div>',
      '    </div>',
      '    <p class="text-gray-300" style="font-size: 1rem; line-height: 1.65;">',
      '      Automated real estate intelligence platform scraping 500+ daily articles from 32 RSS feeds, utilizing Jaccard deduplication, Groq AI LLM summaries, daily 8 AM WhatsApp/Email broadcasts, and branded PDF reports.',
      '    </p>',
      '    <div class="ks-how-box">',
      '      <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #ffffff; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1rem;">',
      '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
      '        How It Works — System Architecture &amp; Flow',
      '      </h4>',
      '      <div class="ks-steps-grid cols-4">',
      '        <div class="ks-step-card"><span class="ks-step-num">01. Feed Aggregator</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Ingests over 500 daily market articles from 32 curated real estate RSS feeds across India.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">02. Jaccard Deduplication</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Eliminates syndicated and duplicate stories with text tokenization and Jaccard similarity metrics.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">03. Groq AI Distillation</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Synthesizes top regulatory, market, and infrastructure moves into concise executive briefs.</p></div>',
      '        <div class="ks-step-card"><span class="ks-step-num">04. Automated Broadcast</span><p class="text-gray-300 text-sm" style="line-height: 1.55;">Generates branded PDF reports and broadcasts daily 8:00 AM updates via WhatsApp API and Email.</p></div>',
      '      </div>',
      '    </div>',
      '    <div class="ks-proj-matrix">',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #60a5fa; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Key Features</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>32-feed RSS ingestion scraping 500+ daily articles</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Jaccard similarity deduplication</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Daily 8 AM automated WhatsApp &amp; Email broadcasts</span></li>',
      '          <li class="text-gray-300 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #60a5fa; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Dynamic branded PDF generation</span></li>',
      '        </ul>',
      '      </div>',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #c084fc; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Engineering Challenges</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #c084fc; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Handling irregular RSS XML formats and eliminating syndicated wire duplicates</span></li>',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #c084fc; margin-top: 0.45rem; flex-shrink: 0;"></span><span>Ensuring automated 8:00 AM broadcast cron reliability on production servers</span></li>',
      '        </ul>',
      '      </div>',
      '      <div class="ks-matrix-panel">',
      '        <h4 style="display: flex; align-items: center; gap: 0.5rem; color: #34d399; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Results &amp; Outcomes</h4>',
      '        <ul class="space-y-2">',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #34d399; margin-top: 0.45rem; flex-shrink: 0;"></span><span>500+ articles filtered into a 2-minute daily executive digest</span></li>',
      '          <li class="text-gray-400 text-sm" style="display: flex; align-items: flex-start; gap: 0.5rem;"><span style="width: 6px; height: 6px; border-radius: 9999px; background: #34d399; margin-top: 0.45rem; flex-shrink: 0;"></span><span>100% automated morning broadcast pipeline</span></li>',
      '        </ul>',
      '      </div>',
      '    </div>',
      '    <div class="ks-tech-row">',
      '      <span class="ks-tech-pill">Python</span>',
      '      <span class="ks-tech-pill">Groq AI</span>',
      '      <span class="ks-tech-pill">Node.js</span>',
      '      <span class="ks-tech-pill">WhatsApp API</span>',
      '      <span class="ks-tech-pill">jsPDF</span>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  var isProjectsSyncing = false;
  function syncProjectsPage() {
    if (isProjectsSyncing) return;
    if (!isProjectsRoute()) {
      var table = document.getElementById('ks-client-matrix-section');
      if (table && table.parentNode) table.parentNode.removeChild(table);
      var injectedWrap = document.getElementById('ks-injected-cards-wrap');
      if (injectedWrap && injectedWrap.parentNode) injectedWrap.parentNode.removeChild(injectedWrap);
      var injected = document.querySelectorAll('.ks-injected-card');
      for (var i = 0; i < injected.length; i++) {
        if (injected[i].parentNode) injected[i].parentNode.removeChild(injected[i]);
      }
      return;
    }

    isProjectsSyncing = true;
    try {
      // 1. Mount Client Deliveries Matrix Table
      var banner = document.querySelector('.ks-client-banner');
      if (banner && !document.getElementById('ks-client-matrix-section')) {
        var wrap = document.createElement('div');
        wrap.innerHTML = getClientMatrixHTML();
        var tableEl = wrap.firstElementChild;
        banner.insertAdjacentElement('afterend', tableEl);
      }

      // 2. Identify active filter & update button text (guarded to prevent infinite MutationObserver loop)
      var filterBtns = document.querySelectorAll('.ks-filter-btn');
      var activeFilter = 'All';
      for (var b = 0; b < filterBtns.length; b++) {
        var btn = filterBtns[b];
        var txt = btn.textContent || '';
        if ((txt.indexOf('All Projects') !== -1 || txt === 'All') && txt !== 'All Projects (9)') {
          btn.textContent = 'All Projects (9)';
          txt = 'All Projects (9)';
        } else if (txt.indexOf('Client Projects') !== -1 && txt !== 'Client Projects (6)') {
          btn.textContent = 'Client Projects (6)';
          txt = 'Client Projects (6)';
        }
        if (btn.classList.contains('active')) {
          if (txt.indexOf('Interactive') !== -1) {
            activeFilter = 'Interactive Web';
          } else if (txt.indexOf('Client') !== -1) {
            activeFilter = 'Client Projects';
          } else {
            activeFilter = 'All';
          }
        }
      }

      // 3. Inject Missing Cards in a separate sibling wrapper (never inside React's keyed list)
      var filterBar = document.querySelector('.ks-filter-bar');
      if (filterBar) {
        var cardsContainer = filterBar.nextElementSibling;
        if (cardsContainer && cardsContainer.id !== 'ks-injected-cards-wrap') {
          var showInjected = activeFilter === 'All' || activeFilter === 'Client Projects';
          var wrapEl = document.getElementById('ks-injected-cards-wrap');
          if (!wrapEl) {
            wrapEl = document.createElement('div');
            wrapEl.id = 'ks-injected-cards-wrap';
            wrapEl.style.display = showInjected ? 'flex' : 'none';
            wrapEl.style.flexDirection = 'column';
            wrapEl.style.gap = '2.25rem';
            wrapEl.style.marginTop = '2.25rem';
            wrapEl.innerHTML = [
              getYamunaCardHTML(),
              getVidScriptCardHTML(),
              getRealEstateCardHTML()
            ].join('\n');
            cardsContainer.insertAdjacentElement('afterend', wrapEl);
          } else {
            var desiredDisplay = showInjected ? 'flex' : 'none';
            if (wrapEl.style.display !== desiredDisplay) {
              wrapEl.style.display = desiredDisplay;
            }
          }
        }
      }

      // 4. Link Neumorphic Snake Arcade card to its dedicated GitHub repository
      var snakeRepoUrl = 'https://github.com/khandeshwar51/neumorphic-snake-arcade';
      var projCards = document.querySelectorAll('.ks-project-card:not(.ks-injected-card)');
      for (var c = 0; c < projCards.length; c++) {
        var cardTitle = projCards[c].querySelector('h3');
        if (cardTitle && cardTitle.textContent.indexOf('Neumorphic Snake Arcade') !== -1) {
          var ghBtn = projCards[c].querySelector('a.ks-btn-secondary');
          if (ghBtn && ghBtn.getAttribute('href') !== snakeRepoUrl) {
            ghBtn.setAttribute('href', snakeRepoUrl);
          }
        }
      }

      // 5. Scroll smoothly to the filtered Client Projects when "View Client Projects →" CTA is clicked
      var ctaPill = document.querySelector('.ks-cta-pill');
      if (ctaPill && !ctaPill.getAttribute('data-ks-scroll-bound')) {
        ctaPill.setAttribute('data-ks-scroll-bound', 'true');
        ctaPill.addEventListener('click', function () {
          setTimeout(function () {
            var target = document.querySelector('.ks-filter-bar');
            if (target) {
              var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
              window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
            }
          }, 60);
        });
      }
    } finally {
      isProjectsSyncing = false;
    }
  }

  function syncProgrammerPanels() {
    if (isSyncing) return;
    isSyncing = true;
    try {
      var home = isHomeRoute();

      if (document.body) {
        document.body.classList.toggle('ks-is-home', home);
        document.body.classList.toggle('ks-is-subpage', !home);
      }

      if (!home) {
        unmountProgrammerPanels();
      } else {
        var hero = findHeroContainer();
        if (hero) {
          hero.style.paddingTop = '';
          syncHeroContent(hero);
          var existing = document.getElementById('ks-programmer-panels');
          if (!existing) {
            mountProgrammerPanels(hero);
          } else if (existing.parentElement !== hero) {
            hero.appendChild(existing);
          }
        }
      }

      syncProjectsPage();

    } finally {
      isSyncing = false;
    }
  }

  window.addEventListener('popstate', syncProgrammerPanels);
  window.addEventListener('resize', function () {
    var hero = findHeroContainer();
    if (hero) syncHeroContent(hero);
  }, { passive: true });

  var origPushState = history.pushState;
  history.pushState = function () {
    var res = origPushState.apply(this, arguments);
    syncProgrammerPanels();
    return res;
  };

  var origReplaceState = history.replaceState;
  history.replaceState = function () {
    var res = origReplaceState.apply(this, arguments);
    syncProgrammerPanels();
    return res;
  };

  // Observe DOM mutations to keep panels synchronized with React client-side transitions
  if (typeof MutationObserver !== 'undefined') {
    var domObserver = new MutationObserver(function () {
      syncProgrammerPanels();
    });
    var observeTarget = document.getElementById('root') || document.body || document.documentElement;
    if (observeTarget) {
      domObserver.observe(observeTarget, { childList: true, subtree: true });
    }
  }

  // Expose global controller
  window.KSHomeProgrammerPanels = {
    mount: mountProgrammerPanels,
    unmount: unmountProgrammerPanels,
    sync: syncProgrammerPanels,
    syncProjects: syncProjectsPage,
    isMounted: function () { return panelsMounted; },
    isHomeRoute: isHomeRoute
  };

  /* -------------------------------------------------------------
   * Global Floating WhatsApp Conversion CTA
   * ------------------------------------------------------------- */
  function mountWhatsAppCTA() {
    if (document.getElementById('ks-floating-whatsapp')) return;

    var wa = document.createElement('a');
    wa.id = 'ks-floating-whatsapp';
    wa.href = 'https://wa.me/917796441723?text=Hi%20Khandeshwar,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Chat with Khandeshwar on WhatsApp');
    wa.innerHTML = '<span class="ks-wa-pulse" aria-hidden="true"></span><svg class="ks-wa-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.16 7C9.02 7 8.79 7.05 8.6 7.26C8.41 7.47 7.86 7.99 7.86 9.04C7.86 10.09 8.63 11.1 8.74 11.25C8.85 11.4 10.23 13.53 12.35 14.45C14.12 15.21 14.48 15.06 14.86 15.03C15.24 15 16.08 14.54 16.25 14.05C16.42 13.56 16.42 13.14 16.37 13.05C16.32 12.96 16.18 12.9 15.95 12.79C15.72 12.68 14.59 12.12 14.38 12.05C14.17 11.98 14.02 11.94 13.87 12.17C13.72 12.4 13.29 12.9 13.16 13.05C13.03 13.2 12.9 13.22 12.67 13.11C12.44 13 11.7 12.76 10.82 11.98C10.13 11.37 9.67 10.61 9.53 10.38C9.39 10.15 9.51 10.03 9.63 9.91C9.74 9.8 9.87 9.62 10 9.47C10.13 9.32 10.17 9.21 10.26 9.02C10.35 8.83 10.31 8.67 10.24 8.53C10.17 8.39 9.63 7.06 9.4 6.51C9.18 5.97 8.95 6.05 8.79 6.04C8.63 6.03 8.44 6.03 8.25 6.03L9.16 7Z"/></svg><span>WhatsApp</span>';
    document.body.appendChild(wa);
  }

  // Initialization
  function init() {
    mountAtmosphere();
    mountWhatsAppCTA();
    syncProgrammerPanels();

    var checks = 0;
    var timer = setInterval(function () {
      checks++;
      syncProgrammerPanels();
      if (checks >= 10) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
