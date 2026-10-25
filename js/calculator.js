// TMT weight calculator: weight per metre (kg) = d² / 162
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var mode = 'bars';
  var kgPerM = function (d) { return d * d / 162; };
  var fmt = function (n, dp) {
    return n.toLocaleString('en-IN', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  };

  function calc() {
    var d = +$('dia').value;
    var len = +$('len').value || 0;
    var barKg = kgPerM(d) * len;
    $('r-bar').textContent = fmt(barKg, 2) + ' kg (' + fmt(kgPerM(d), 3) + ' kg/m × ' + fmt(len, 1) + ' m)';

    if (mode === 'bars') {
      var n = Math.max(0, Math.floor(+$('count').value || 0));
      var kg = n * barKg;
      $('r-label').textContent = 'Total weight';
      $('r-main').textContent = kg >= 1000 ? fmt(kg / 1000, 3) + ' t' : fmt(kg, 1) + ' kg';
      $('r-sub').textContent = fmt(n, 0) + ' bars of ' + d + ' mm = ' + fmt(kg, 1) + ' kg';
    } else {
      var kgWanted = (+$('wt').value || 0) * +$('unit').value;
      var bars = barKg > 0 ? kgWanted / barKg : 0;
      $('r-label').textContent = 'Number of bars';
      $('r-main').textContent = fmt(Math.round(bars), 0) + ' bars';
      $('r-sub').textContent = fmt(kgWanted, 0) + ' kg of ' + d + ' mm ≈ ' + fmt(bars, 1) + ' bars of ' + fmt(len, 1) + ' m';
    }
  }

  document.querySelectorAll('.seg button').forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.dataset.mode;
      document.querySelectorAll('.seg button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      document.querySelectorAll('[data-for]').forEach(function (f) { f.hidden = f.dataset.for !== mode; });
      calc();
    });
  });
  ['dia', 'count', 'wt', 'unit', 'len'].forEach(function (id) { $(id).addEventListener('input', calc); });
  calc();

})();
