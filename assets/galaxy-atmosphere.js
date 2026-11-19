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
    var hero = document.querySelector('.min-h-screen.flex.items-center.justify-center.relative.overflow-hidden');
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
      '<!-- SVG Definitions & Gradients -->',
      '<svg width="0" height="0" style="position:absolute;visibility:hidden;" aria-hidden="true">',
      '  <defs>',
      '    <linearGradient id="ks-grad-orbit-cyan" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#00CFFF" stop-opacity="0.9" />',
      '      <stop offset="50%" stop-color="#00E5E5" stop-opacity="0.55" />',
      '      <stop offset="100%" stop-color="#008F9C" stop-opacity="0" />',
      '    </linearGradient>',
      '    <linearGradient id="ks-grad-orbit-teal" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#00E5E5" stop-opacity="0.85" />',
      '      <stop offset="60%" stop-color="#008F9C" stop-opacity="0.45" />',
      '      <stop offset="100%" stop-color="#00CFFF" stop-opacity="0" />',
      '    </linearGradient>',
      '    <linearGradient id="ks-grad-lunar-rim" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#00CFFF" stop-opacity="0.95" />',
      '      <stop offset="45%" stop-color="#00E5E5" stop-opacity="0.8" />',
      '      <stop offset="75%" stop-color="#008F9C" stop-opacity="0.35" />',
      '      <stop offset="100%" stop-color="#00E5E5" stop-opacity="0" />',
      '    </linearGradient>',
      '    <radialGradient id="ks-grad-planet-mid" cx="32%" cy="28%" r="68%">',
      '      <stop offset="0%" stop-color="#00CFFF" stop-opacity="0.85" />',
      '      <stop offset="22%" stop-color="#008F9C" stop-opacity="0.7" />',
      '      <stop offset="55%" stop-color="#07171D" stop-opacity="0.92" />',
      '      <stop offset="100%" stop-color="#02090D" stop-opacity="1" />',
      '    </radialGradient>',
      '    <radialGradient id="ks-grad-planet-upper" cx="38%" cy="30%" r="65%">',
      '      <stop offset="0%" stop-color="#00E5E5" stop-opacity="0.7" />',
      '      <stop offset="25%" stop-color="#008F9C" stop-opacity="0.55" />',
      '      <stop offset="60%" stop-color="#081A22" stop-opacity="0.9" />',
      '      <stop offset="100%" stop-color="#02090D" stop-opacity="1" />',
      '    </radialGradient>',
      '    <radialGradient id="ks-grad-planet-br" cx="30%" cy="30%" r="70%">',
      '      <stop offset="0%" stop-color="#00CFFF" stop-opacity="0.95" />',
      '      <stop offset="25%" stop-color="#00E5E5" stop-opacity="0.8" />',
      '      <stop offset="55%" stop-color="#061820" stop-opacity="0.95" />',
      '      <stop offset="100%" stop-color="#02090D" stop-opacity="1" />',
      '    </radialGradient>',
      '    <linearGradient id="ks-grad-lunar-body" x1="0%" y1="0%" x2="50%" y2="100%">',
      '      <stop offset="0%" stop-color="#0a1d27" stop-opacity="0.95" />',
      '      <stop offset="40%" stop-color="#06151c" stop-opacity="0.98" />',
      '      <stop offset="100%" stop-color="#02090d" stop-opacity="1" />',
      '    </linearGradient>',
      '  </defs>',
      '</svg>',
      '<!-- 1. Deep Space Teal & Cyan Nebulae Layers -->',
      '<div class="ks-nebula-layer">',
      '  <div class="ks-nebula ks-nebula-cyan"></div>',
      '  <div class="ks-nebula ks-nebula-teal"></div>',
      '  <div class="ks-nebula ks-nebula-aurora"></div>',
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
      '<!-- Glowing Cyan Orbital Beams -->',
      '<svg class="ks-orbital-paths" viewBox="0 0 1440 900" preserveAspectRatio="none">',
      '  <path class="ks-orbit-line ks-orbit-cyan" d="M -60 260 C 180 180, 280 480, 520 420 S 760 300, 920 340" />',
      '  <path class="ks-orbit-line ks-orbit-teal" d="M 1500 240 C 1260 160, 1140 460, 900 440 S 680 320, 500 360" />',
      '  <path class="ks-orbit-line ks-orbit-cyan ks-orbit-lower" d="M -40 540 C 140 520, 260 620, 480 660 S 800 780, 1100 760" />',
      '</svg>',
      '',
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
      '<!-- Mid-Left Floating Planet (Placed down and away from React Atom to prevent crowding) -->',
      '<div class="ks-planet-mid-left" id="ks-planet-mid-left" title="Cosmic Orbit">',
      '  <svg viewBox="0 0 160 160" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <circle cx="80" cy="80" r="56" fill="url(#ks-grad-planet-mid)" />',
      '    <circle cx="80" cy="80" r="56" stroke="rgba(0, 207, 255, 0.45)" stroke-width="1.2" />',
      '    <!-- Subtle Crescent Atmospheric Rim -->',
      '    <path d="M 32 54 A 56 56 0 0 1 118 36" stroke="#00CFFF" stroke-width="3" stroke-linecap="round" opacity="0.9" filter="drop-shadow(0 0 10px #00E5E5)" />',
      '    <!-- Subtle Planetary Surface Texture Line -->',
      '    <path d="M 40 85 Q 80 75 120 85" stroke="rgba(0, 229, 229, 0.25)" stroke-width="1.2" opacity="0.5" />',
      '  </svg>',
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
      '</div>',
      '',
      '<!-- Upper-Right Floating Planet (Between Heading & Code Editor) -->',
      '<div class="ks-planet-upper-right" id="ks-planet-upper-right">',
      '  <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <circle cx="50" cy="50" r="32" fill="url(#ks-grad-planet-upper)" />',
      '    <circle cx="50" cy="50" r="32" stroke="rgba(0, 229, 229, 0.4)" stroke-width="1" />',
      '    <path d="M 24 38 A 32 32 0 0 1 72 26" stroke="#00E5E5" stroke-width="2" stroke-linecap="round" opacity="0.8" filter="drop-shadow(0 0 8px #00CFFF)" />',
      '  </svg>',
      '</div>',
      '',
      '<!-- Bottom-Left Cinematic Lunar/Planetary Horizon Landscape with Craters & Cyan Rim Glow -->',
      '<div class="ks-lunar-surface" id="ks-lunar-surface">',
      '  <svg viewBox="0 0 640 280" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" class="ks-lunar-svg">',
      '    <!-- Outer Atmospheric Cyan Haze -->',
      '    <path d="M -40 280 C 60 70, 260 40, 540 180 L 560 280 Z" fill="url(#ks-grad-lunar-rim)" opacity="0.25" filter="blur(16px)" />',
      '    <!-- Lunar Terrain Body -->',
      '    <path d="M -20 280 L -20 130 Q 90 40 250 65 T 540 190 L 560 280 Z" fill="url(#ks-grad-lunar-body)" />',
      '    <!-- Secondary Rocky Ridge with Craters -->',
      '    <path d="M -10 280 L -10 145 C 50 95, 120 80, 180 100 C 240 120, 310 90, 380 130 C 450 160, 510 210, 550 280 Z" fill="#041219" stroke="rgba(0, 229, 229, 0.4)" stroke-width="1" opacity="0.95" />',
      '    <!-- Foreground Rocky Crust with Craters -->',
      '    <ellipse cx="150" cy="125" rx="32" ry="12" fill="#02090e" stroke="rgba(0, 229, 229, 0.5)" stroke-width="1.3" transform="rotate(-6 150 125)" />',
      '    <ellipse cx="290" cy="155" rx="40" ry="14" fill="#02090e" stroke="rgba(0, 229, 229, 0.45)" stroke-width="1.3" transform="rotate(-4 290 155)" />',
      '    <ellipse cx="85" cy="180" rx="24" ry="9" fill="#010609" stroke="rgba(0, 229, 229, 0.4)" stroke-width="1.2" />',
      '    <!-- Sharp Illuminated Cyan Horizon Rim -->',
      '    <path d="M -20 130 Q 90 40 250 65 T 540 190" stroke="url(#ks-grad-lunar-rim)" stroke-width="3.5" stroke-linecap="round" filter="drop-shadow(0 0 16px #00E5E5)" />',
      '    <path d="M -10 132 Q 90 42 250 67 T 538 192" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.8" />',
      '  </svg>',
      '  <!-- Floating Asteroid Particles -->',
      '  <div class="ks-asteroid ks-ast-1"></div>',
      '  <div class="ks-asteroid ks-ast-2"></div>',
      '  <div class="ks-asteroid ks-ast-3"></div>',
      '</div>',
      '',
      '<!-- Bottom-Right Glowing Celestial Body -->',
      '<div class="ks-planet-bottom-right" id="ks-planet-bottom-right">',
      '  <svg viewBox="0 0 320 320" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <circle cx="200" cy="200" r="130" fill="url(#ks-grad-planet-br)" />',
      '    <circle cx="200" cy="200" r="130" stroke="rgba(0, 229, 229, 0.4)" stroke-width="1.5" />',
      '    <!-- Intense Cyan Rim Crescent -->',
      '    <path d="M 85 140 A 130 130 0 0 1 210 70" stroke="#00CFFF" stroke-width="3.5" stroke-linecap="round" filter="drop-shadow(0 0 20px #00E5E5)" />',
      '    <path d="M 90 145 A 130 130 0 0 1 208 75" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.75" />',
      '  </svg>',
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

    var ids = ['ks-left-cluster', 'ks-right-cluster', 'ks-planet-mid-left', 'ks-planet-upper-right', 'ks-lunar-surface', 'ks-planet-bottom-right'];
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

  // Subtle Mouse Parallax for Programmer Panels and Planets on Desktop
  function initProgrammerParallax() {
    if (prefersReducedMotion.matches) return;
    if (programmerParallaxHandler) return;

    var leftCluster = document.getElementById('ks-left-cluster');
    var rightCluster = document.getElementById('ks-right-cluster');
    var midPlanet = document.getElementById('ks-planet-mid-left');
    var upperPlanet = document.getElementById('ks-planet-upper-right');
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

      if (midPlanet) {
        midPlanet.style.transform = 'translate(' + (currentX * -12) + 'px, ' + (currentY * -10) + 'px)';
      }

      if (upperPlanet) {
        upperPlanet.style.transform = 'translate(' + (currentX * 10) + 'px, ' + (currentY * 8) + 'px)';
      }

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    }
  }

  // Subtle Mouse Parallax for Global Planetary System
  function initPlanetParallax() {
    if (prefersReducedMotion.matches) return;
    var planetSystem = document.getElementById('ks-planet-system');
    if (!planetSystem) return;

    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var isTicking = false;

    window.addEventListener('mousemove', function (e) {
      if (window.innerWidth < 1024) return;
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(function () {
          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;
          if (planetSystem) {
            planetSystem.style.transform = 'translate(' + (currentX * -12) + 'px, ' + (currentY * -10) + 'px)';
          }
          if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
            requestAnimationFrame(arguments.callee || function () {});
          } else {
            isTicking = false;
          }
        });
      }
    }, { passive: true });
  }

  // Route-Level Navigation Interceptor & Auto-Sync
  var isSyncing = false;
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
          var existing = document.getElementById('ks-programmer-panels');
          if (!existing) {
            mountProgrammerPanels(hero);
          } else if (existing.parentElement !== hero) {
            hero.appendChild(existing);
          }
        }
      }
    } finally {
      isSyncing = false;
    }
  }

  window.addEventListener('popstate', syncProgrammerPanels);

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
    isMounted: function () { return panelsMounted; },
    isHomeRoute: isHomeRoute
  };

  // Initialization
  function init() {
    mountAtmosphere();
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
