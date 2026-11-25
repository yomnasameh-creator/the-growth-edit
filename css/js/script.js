/* THE GROWTH EDIT: lightweight site script (no libraries) */
(function () {
  'use strict';

  /* 1. Mobile navigation toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!toggle || !nav) { return; }
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    var label = toggle.querySelector('.nav-toggle-label');
    if (label) { label.textContent = open ? 'Close' : 'Menu'; }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setMenu(false); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) { setMenu(false); }
    });
  }

  /* 2. Header shadow after scrolling */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* 3. Current year in the footer */
  var years = document.querySelectorAll('[data-year]');
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = new Date().getFullYear();
  }

  /* 4. Demo forms (front-end only: nothing is stored or sent) */
  var forms = document.querySelectorAll('form[data-demo-form]');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = form.querySelector('[data-form-status]');
      if (!status) { return; }

      status.classList.remove('is-error', 'is-success');

      if (!form.checkValidity()) {
        status.textContent = form.getAttribute('data-error') ||
          'Please fill in all required fields with valid information.';
        status.classList.add('is-error');
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) { firstInvalid.focus(); }
        return;
      }

      status.textContent = form.getAttribute('data-success') ||
        'Thank you! This form is a design preview only, so nothing was saved or sent.';
      status.classList.add('is-success');
      form.reset();
    });
  });

  /* 5. Gentle reveal-on-scroll for cards */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(items, function (item) { observer.observe(item); });
  } else {
    Array.prototype.forEach.call(items, function (item) { item.classList.add('is-visible'); });
  }
})();
