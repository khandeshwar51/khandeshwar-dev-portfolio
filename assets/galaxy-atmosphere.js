/**
 * Galaxy + Programmer Theme Atmosphere Engine
 * Khandeshwar Suryavanshi Portfolio
 * Combines cosmic deep space (ringed planets, nebulae, stars) with
 * futuristic programmer elements (3D VS Code windows, Code editor,
 * terminal with typing animation, React atom, TypeScript, GitHub,
 * orbital neon lines, and cyber horizon grid).
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

  function getBackdropHTML() {
    return [
      '<!-- SVG Definitions & Gradients -->',
      '<svg width="0" height="0" style="position:absolute;visibility:hidden;" aria-hidden="true">',
      '  <defs>',
      '    <linearGradient id="ks-grad-orbit-cyan" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />',
      '      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.5" />',
      '      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />',
      '    </linearGradient>',
      '    <linearGradient id="ks-grad-orbit-purple" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.85" />',
      '      <stop offset="60%" stop-color="#818cf8" stop-opacity="0.4" />',
      '      <stop offset="100%" stop-color="#a855f7" stop-opacity="0" />',
      '    </linearGradient>',
      '    <radialGradient id="ks-grad-planet-body" cx="35%" cy="30%" r="65%">',
      '      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9" />',
      '      <stop offset="25%" stop-color="#6366f1" stop-opacity="0.75" />',
      '      <stop offset="65%" stop-color="#1e1b4b" stop-opacity="0.95" />',
      '      <stop offset="100%" stop-color="#070913" stop-opacity="1" />',
      '    </radialGradient>',
      '    <linearGradient id="ks-grad-ring" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.65" />',
      '      <stop offset="45%" stop-color="#a855f7" stop-opacity="0.5" />',
      '      <stop offset="70%" stop-color="#818cf8" stop-opacity="0.15" />',
      '      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4" />',
      '    </linearGradient>',
      '    <linearGradient id="ks-grad-grid" x1="0%" y1="0%" x2="0%" y2="100%">',
      '      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.5" />',
      '      <stop offset="30%" stop-color="#38bdf8" stop-opacity="0.3" />',
      '      <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />',
      '    </linearGradient>',
      '  </defs>',
      '</svg>',

      '<!-- 1. Deep Space Nebulae Layers -->',
      '<div class="ks-nebula-layer">',
      '  <div class="ks-nebula ks-nebula-blue"></div>',
      '  <div class="ks-nebula ks-nebula-purple"></div>',
      '  <div class="ks-nebula ks-nebula-center"></div>',
      '</div>',

      '<!-- 2. Subtle Planetary Elements (Ringed Planet & Satellite Moon) -->',
      '<div class="ks-planet-system" id="ks-planet-system">',
      '  <svg class="ks-planet-svg" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <!-- Back Half of Planetary Rings -->',
      '    <g transform="translate(130, 130) rotate(-26)">',
      '      <ellipse cx="0" cy="0" rx="118" ry="24" stroke="url(#ks-grad-ring)" stroke-width="6" opacity="0.45" stroke-dasharray="80 15 120 20" />',
      '      <ellipse cx="0" cy="0" rx="108" ry="20" stroke="url(#ks-grad-ring)" stroke-width="2.5" opacity="0.35" />',
      '    </g>',
      '    <!-- Planet Sphere with Atmospheric Glow -->',
      '    <circle cx="130" cy="130" r="58" fill="url(#ks-grad-planet-body)" />',
      '    <circle cx="130" cy="130" r="58" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.5" />',
      '    <!-- Front Half of Planetary Rings (Overlaps Planet Sphere) -->',
      '    <g transform="translate(130, 130) rotate(-26)">',
      '      <path d="M -118 0 A 118 24 0 0 0 118 0" stroke="url(#ks-grad-ring)" stroke-width="6" opacity="0.85" stroke-linecap="round" />',
      '      <path d="M -108 0 A 108 20 0 0 0 108 0" stroke="url(#ks-grad-ring)" stroke-width="2.5" opacity="0.75" />',
      '    </g>',
      '  </svg>',
      '  <div class="ks-moon"></div>',
      '</div>',

      '<!-- 3. Glowing Orbital Lines -->',
      '<svg class="ks-orbital-paths" viewBox="0 0 1440 900" preserveAspectRatio="none">',
      '  <!-- Left-to-Center Cyan Orbital Arc -->',
      '  <path class="ks-orbit-line ks-orbit-cyan" d="M -60 260 C 180 180, 280 480, 520 420 S 760 300, 920 340" />',
      '  <!-- Right-to-Center Purple Orbital Arc -->',
      '  <path class="ks-orbit-line ks-orbit-purple" d="M 1500 240 C 1260 160, 1140 460, 900 440 S 680 320, 500 360" />',
      '</svg>',

      '<!-- 4. Left Developer Cluster: 3D VS Code Explorer Window & Symbols -->',
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
      '      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38bdf8" stroke-width="2.5" opacity="0.85" />',
      '      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38bdf8" stroke-width="2.5" opacity="0.85" transform="rotate(60 50 50)" />',
      '      <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#38bdf8" stroke-width="2.5" opacity="0.85" transform="rotate(120 50 50)" />',
      '      <circle cx="50" cy="50" r="6" fill="#38bdf8" />',
      '    </svg>',
      '  </div>',
      '</div>',

      '<!-- 5. Right Developer Cluster: 3D Code Editor, Terminal, TS, GitHub -->',
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
      '        <span style="color:#38bdf8;">⚛</span> App.tsx',
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
      '      <span style="color:#4ade80;">● active</span>',
      '    </div>',
      '    <div class="ks-terminal-body">',
      '      <span class="ks-terminal-prompt">&gt;</span>',
      '      <span class="ks-terminal-text" id="ks-terminal-typewriter">Build. Deploy. Grow.</span>',
      '      <span class="ks-terminal-cursor"></span>',
      '    </div>',
      '  </div>',
      '</div>',

      '<!-- 6. Cyber Horizon Grid & Synth Mountains (Bottom) -->',
      '<div class="ks-cyber-horizon">',
      '  <svg class="ks-horizon-svg" viewBox="0 0 1440 240" preserveAspectRatio="none">',
      '    <!-- Perspective Grid Lines -->',
      '    <g stroke="url(#ks-grad-grid)" stroke-width="1.2" opacity="0.65">',
      '      <!-- Horizontal Grid Lines converging upward -->',
      '      <line x1="0" y1="239" x2="1440" y2="239" stroke-width="2" />',
      '      <line x1="0" y1="210" x2="1440" y2="210" stroke-width="1.6" />',
      '      <line x1="0" y1="185" x2="1440" y2="185" />',
      '      <line x1="0" y1="165" x2="1440" y2="165" />',
      '      <line x1="0" y1="150" x2="1440" y2="150" opacity="0.7" />',
      '      <line x1="0" y1="138" x2="1440" y2="138" opacity="0.4" />',
      '      <!-- Perspective lines radiating from center horizon -->',
      '      <line x1="720" y1="130" x2="0" y2="240" />',
      '      <line x1="720" y1="130" x2="160" y2="240" />',
      '      <line x1="720" y1="130" x2="320" y2="240" />',
      '      <line x1="720" y1="130" x2="480" y2="240" />',
      '      <line x1="720" y1="130" x2="620" y2="240" />',
      '      <line x1="720" y1="130" x2="720" y2="240" />',
      '      <line x1="720" y1="130" x2="820" y2="240" />',
      '      <line x1="720" y1="130" x2="960" y2="240" />',
      '      <line x1="720" y1="130" x2="1120" y2="240" />',
      '      <line x1="720" y1="130" x2="1280" y2="240" />',
      '      <line x1="720" y1="130" x2="1440" y2="240" />',
      '    </g>',
      '    <!-- Silhouetted Futuristic Horizon Mountains -->',
      '    <path d="M 0 160 L 140 135 L 260 152 L 390 128 L 520 148 L 640 138 L 720 144 L 810 132 L 950 150 L 1090 126 L 1220 146 L 1340 136 L 1440 155 L 1440 240 L 0 240 Z" fill="#060913" opacity="0.85" />',
      '    <path d="M 0 160 L 140 135 L 260 152 L 390 128 L 520 148 L 640 138 L 720 144 L 810 132 L 950 150 L 1090 126 L 1220 146 L 1340 136 L 1440 155" stroke="rgba(168, 85, 247, 0.4)" stroke-width="1.5" fill="none" />',
      '  </svg>',
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
    container.innerHTML = getBackdropHTML();

    var root = document.getElementById('root');
    if (root && root.parentNode) {
      root.parentNode.insertBefore(container, root);
    } else {
      document.body.appendChild(container);
    }

    return container;
  }

  // Typewriter Loop for Terminal Panel
  function initTypewriter() {
    var el = document.getElementById('ks-terminal-typewriter');
    if (!el || prefersReducedMotion.matches) return;

    var phraseIndex = 0;
    var charIndex = el.textContent.length;
    var isDeleting = true;
    var typingSpeed = 65;

    function tick() {
      if (document.hidden) {
        setTimeout(tick, 1000);
        return;
      }

      var currentPhrase = TERMINAL_PHRASES[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentPhrase.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % TERMINAL_PHRASES.length;
          setTimeout(tick, 600);
          return;
        }
      } else {
        charIndex++;
        el.textContent = currentPhrase.substring(0, charIndex);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          // Hold the complete phrase for 4.5 seconds before typing the next
          setTimeout(tick, 4500);
          return;
        }
      }

      var delay = isDeleting ? 30 : typingSpeed;
      setTimeout(tick, delay);
    }

    // Initial pause before first transition
    setTimeout(tick, 4000);
  }

  // Subtle Mouse Parallax on Desktop
  function initParallax() {
    if (prefersReducedMotion.matches) return;

    var leftCluster = document.getElementById('ks-left-cluster');
    var rightCluster = document.getElementById('ks-right-cluster');
    var planetSystem = document.getElementById('ks-planet-system');

    if (!leftCluster && !rightCluster && !planetSystem) return;

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
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });

    function updateParallax() {
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

      if (planetSystem) {
        planetSystem.style.transform = 'translate(' + (currentX * -12) + 'px, ' + (currentY * -10) + 'px)';
      }

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    }
  }

  // Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      mountAtmosphere();
      initTypewriter();
      initParallax();
    });
  } else {
    mountAtmosphere();
    initTypewriter();
    initParallax();
  }
})();
