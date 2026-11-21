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
