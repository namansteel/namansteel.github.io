// Naman Steel — shared page behaviour
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Highlight today in the shop hours list (list starts on Monday)
  var hours = document.querySelectorAll('.hours li');
  if (hours.length === 7) hours[(new Date().getDay() + 6) % 7].classList.add('today');

  // Count call and directions clicks in Google Analytics
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a || typeof gtag !== 'function') return;
    if (a.href.indexOf('tel:') === 0) gtag('event', 'call_click', { page_path: location.pathname });
    else if (a.href.indexOf('g.co/kgs') !== -1) gtag('event', 'directions_click', { page_path: location.pathname });
  });
})();
