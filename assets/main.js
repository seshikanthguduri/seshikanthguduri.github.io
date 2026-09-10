(function () {
  'use strict';

  /* Theme toggle */
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  function renderToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  renderToggleIcon();
  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      renderToggleIcon();
    });
  }

  /* Mobile nav */
  var navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Header hide on scroll down */
  var header = document.getElementById('siteHeader');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (header) {
      if (y > lastY && y > 120) header.classList.add('site-header--hidden');
      else header.classList.remove('site-header--hidden');
    }
    lastY = y;
  }, { passive: true });

  /* Typing role rotation */
  var roles = [
    'Senior Platform Engineer',
    'Site Reliability Engineer',
    'Kubernetes & Cloud Architect',
    'DevSecOps Practitioner'
  ];
  var el = document.getElementById('typedRole');
  if (el) {
    var ri = 0, ci = roles[0].length, deleting = false;

    function tick() {
      var word = roles[ri];
      if (!deleting) {
        ci++;
        if (ci > word.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        ci--;
        if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
      }
      el.textContent = roles[ri].slice(0, ci);
      setTimeout(tick, deleting ? 35 : 65);
    }
    el.textContent = roles[0];
    setTimeout(tick, 2200);
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (elm) { io.observe(elm); });
  } else {
    revealEls.forEach(function (elm) { elm.classList.add('is-visible'); });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
