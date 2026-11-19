/**
 * Starfield Engine — Khandeshwar Suryavanshi Portfolio
 * Lightweight, high-performance starry atmosphere with micro-twinkles,
 * multi-depth mouse parallax, and prefers-reduced-motion compliance.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('ks-starfield-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ks-starfield-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;
  var stars = [];
  var shootingStars = [];
  var animationFrameId = null;
  var isVisible = true;

  // Parallax coordinates (smoothed via linear interpolation)
  var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Star colors: diamond white, silver white, electric teal (#00E5E5), electric cyan (#00CFFF)
  var COLOR_PALETTES = [
    { r: 255, g: 255, b: 255 }, // Crisp White
    { r: 241, g: 245, b: 249 }, // Silver White
    { r: 0, g: 229, b: 229 },   // Electric Teal (#00E5E5)
    { r: 0, g: 207, b: 255 },   // Electric Cyan (#00CFFF)
    { r: 160, g: 235, b: 245 }  // Aqua Ice
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initStars();
    if (prefersReducedMotion.matches) {
      renderStatic();
    }
  }

  function initStars() {
    stars = [];
    // Calculate star count based on screen area (balanced density)
    var count = Math.min(Math.floor((width * height) / 8000), 160);
    if (count < 60) count = 60;

    for (var i = 0; i < count; i++) {
      var color = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      var depth = Math.random() * 0.8 + 0.2; // 0.2 (distant) to 1.0 (near)
      var baseSize = (Math.random() * 0.9 + 0.4) * (depth > 0.7 ? 1.2 : 0.9);
      var baseAlpha = Math.random() * 0.5 + 0.25;

      var isCross = depth > 0.72 && Math.random() > 0.45;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: baseSize,
        baseAlpha: baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: color,
        depth: depth,
        hasHalo: depth > 0.8 && Math.random() > 0.5,
        hasCrossGlint: isCross,
        glintScale: Math.random() * 3 + 4.5
      });
    }
  }

  function triggerShootingStar() {
    if (prefersReducedMotion.matches || shootingStars.length > 0) return;
    var startX = Math.random() * width * 0.7 + width * 0.15;
    var startY = Math.random() * height * 0.3;
    var length = Math.random() * 80 + 60;
    var angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees

    shootingStars.push({
      x: startX,
      y: startY,
      length: length,
      speed: Math.random() * 6 + 7,
      dx: Math.cos(angle),
      dy: Math.sin(angle),
      progress: 0,
      maxProgress: 45,
      alpha: 0.8
    });
  }

  // Periodic subtle shooting star (every 8 to 14 seconds)
  var shootingStarInterval = null;
  function startShootingStarTimer() {
    if (shootingStarInterval) clearInterval(shootingStarInterval);
    shootingStarInterval = setInterval(function () {
      if (isVisible && !prefersReducedMotion.matches && Math.random() > 0.35) {
        triggerShootingStar();
      }
    }, 9000);
  }

  function renderStatic() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + s.color.r + ',' + s.color.g + ',' + s.color.b + ',' + s.baseAlpha + ')';
      ctx.fill();
    }
  }

  function render(time) {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Smoothly interpolate mouse target
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    var t = time * 0.001;

    // Draw Stars
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];

      // Subtle twinkling oscillation
      var twinkle = Math.sin(t * (s.twinkleSpeed * 100) + s.twinkleOffset);
      var currentAlpha = Math.max(0.1, Math.min(0.95, s.baseAlpha + twinkle * 0.35));

      // Gentle parallax shift based on star depth
      var offsetX = s.x - (mouse.x * s.depth * 18);
      var offsetY = s.y - (mouse.y * s.depth * 18);

      // Wrap around edges seamlessly
      if (offsetX < 0) offsetX += width;
      if (offsetX > width) offsetX -= width;
      if (offsetY < 0) offsetY += height;
      if (offsetY > height) offsetY -= height;

      // Soft halo for larger focal stars
      if (s.hasHalo) {
        var haloGrad = ctx.createRadialGradient(offsetX, offsetY, 0, offsetX, offsetY, s.size * 3.5);
        haloGrad.addColorStop(0, 'rgba(' + s.color.r + ',' + s.color.g + ',' + s.color.b + ',' + (currentAlpha * 0.35) + ')');
        haloGrad.addColorStop(1, 'rgba(' + s.color.r + ',' + s.color.g + ',' + s.color.b + ', 0)');
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, s.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();
      }

      // Star core
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, s.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + s.color.r + ',' + s.color.g + ',' + s.color.b + ',' + currentAlpha + ')';
      ctx.fill();

      // Sharp 4-point cross glints (telescope diffraction spikes / lens flares)
      if (s.hasCrossGlint && currentAlpha > 0.25) {
        var glintLen = s.size * s.glintScale;
        var glintAlpha = currentAlpha * 0.75;
        ctx.save();
        ctx.strokeStyle = 'rgba(' + s.color.r + ',' + s.color.g + ',' + s.color.b + ',' + glintAlpha + ')';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        // Vertical diffraction spike
        ctx.moveTo(offsetX, offsetY - glintLen);
        ctx.lineTo(offsetX, offsetY + glintLen);
        // Horizontal diffraction spike
        ctx.moveTo(offsetX - glintLen, offsetY);
        ctx.lineTo(offsetX + glintLen, offsetY);
        ctx.stroke();

        // Extra micro diagonal glints for very prominent focal stars
        if (s.depth > 0.88 && s.size > 1.0) {
          var microLen = glintLen * 0.38;
          ctx.strokeStyle = 'rgba(' + s.color.r + ',' + s.color.g + ',' + s.color.b + ',' + (glintAlpha * 0.4) + ')';
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(offsetX - microLen, offsetY - microLen);
          ctx.lineTo(offsetX + microLen, offsetY + microLen);
          ctx.moveTo(offsetX + microLen, offsetY - microLen);
          ctx.lineTo(offsetX - microLen, offsetY + microLen);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // Draw Shooting Stars
    for (var j = shootingStars.length - 1; j >= 0; j--) {
      var ss = shootingStars[j];
      ss.progress++;
      var headX = ss.x + (ss.dx * ss.speed * ss.progress);
      var headY = ss.y + (ss.dy * ss.speed * ss.progress);
      var tailX = headX - (ss.dx * ss.length);
      var tailY = headY - (ss.dy * ss.length);

      var fade = 1 - (ss.progress / ss.maxProgress);
      if (fade <= 0) {
        shootingStars.splice(j, 1);
        continue;
      }

      var grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
      grad.addColorStop(0, 'rgba(0, 229, 229, 0)');
      grad.addColorStop(0.7, 'rgba(0, 229, 229, ' + (0.45 * fade) + ')');
      grad.addColorStop(1, 'rgba(0, 207, 255, ' + (0.95 * fade) + ')');

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function handleMouseMove(e) {
    if (prefersReducedMotion.matches) return;
    // Map mouse position to -0.5 to 0.5 range
    mouse.targetX = (e.clientX / width) - 0.5;
    mouse.targetY = (e.clientY / height) - 0.5;
  }

  function handleVisibilityChange() {
    isVisible = !document.hidden;
    if (isVisible && !prefersReducedMotion.matches) {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  }

  // Event Listeners
  window.addEventListener('resize', debounce(resize, 150));
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);

  if (prefersReducedMotion.addEventListener) {
    prefersReducedMotion.addEventListener('change', function () {
      if (prefersReducedMotion.matches) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        renderStatic();
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    });
  }

  function debounce(fn, ms) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  // Initialize
  resize();
  if (!prefersReducedMotion.matches) {
    animationFrameId = requestAnimationFrame(render);
    startShootingStarTimer();
  }
})();
