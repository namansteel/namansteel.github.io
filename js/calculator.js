// TMT weight calculator: weight per metre (kg) = d² / 162
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var mode = 'bars';
  var kgPerM = function (d) { return d * d / 162; };
  var fmt = function (n, dp) {
    return n.toLocaleString('en-IN', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  };

  // Labels follow the page language (English page or Hindi सरिया वजन page)
  var T = document.documentElement.lang === 'hi' ? {
    kg: ' किलो', t: ' टन', m: ' मी', total: 'कुल वजन', count: 'सरिया की संख्या', bars: ' सरिया',
    barsOf: function (n, d, kg) { return d + 'mm के ' + n + ' सरिया = ' + kg + ' किलो'; },
    kgOf: function (kg, d, b, len) { return d + 'mm के ' + kg + ' किलो ≈ ' + b + ' सरिया (' + len + ' मी)'; }
  } : {
    kg: ' kg', t: ' t', m: ' m', total: 'Total weight', count: 'Number of bars', bars: ' bars',
    barsOf: function (n, d, kg) { return n + ' bars of ' + d + ' mm = ' + kg + ' kg'; },
    kgOf: function (kg, d, b, len) { return kg + ' kg of ' + d + ' mm ≈ ' + b + ' bars of ' + len + ' m'; }
  };

  function calc() {
    var d = +$('dia').value;
    var len = +$('len').value || 0;
    var barKg = kgPerM(d) * len;
    $('r-bar').textContent = fmt(barKg, 2) + T.kg + ' (' + fmt(kgPerM(d), 3) + T.kg + '/m × ' + fmt(len, 1) + T.m + ')';

    if (mode === 'bars') {
      var n = Math.max(0, Math.floor(+$('count').value || 0));
      var kg = n * barKg;
      $('r-label').textContent = T.total;
      $('r-main').textContent = kg >= 1000 ? fmt(kg / 1000, 3) + T.t : fmt(kg, 1) + T.kg;
      $('r-sub').textContent = T.barsOf(fmt(n, 0), d, fmt(kg, 1));
    } else {
      var kgWanted = (+$('wt').value || 0) * +$('unit').value;
      var bars = barKg > 0 ? kgWanted / barKg : 0;
      $('r-label').textContent = T.count;
      $('r-main').textContent = fmt(Math.round(bars), 0) + T.bars;
      $('r-sub').textContent = T.kgOf(fmt(kgWanted, 0), d, fmt(bars, 1), fmt(len, 1));
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
