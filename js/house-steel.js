// House steel estimator: rule of thumb 3.5–4.5 kg of TMT per sq ft of built-up area
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var LOW = 3.5, HIGH = 4.5;
  var fmt = function (n, dp) {
    return n.toLocaleString('en-IN', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  };

  function calc() {
    var total = Math.max(0, +$('h-area').value || 0) * +$('h-floors').value;
    var lo = total * LOW, hi = total * HIGH;
    $('h-main').textContent = fmt(lo / 1000, 1) + ' – ' + fmt(hi / 1000, 1) + ' t';
    $('h-sub').textContent = 'About ' + fmt(lo, 0) + ' – ' + fmt(hi, 0) + ' kg of TMT steel';
    $('h-area-total').textContent = fmt(total, 0) + ' sq ft';
  }

  ['h-area', 'h-floors'].forEach(function (id) { $(id).addEventListener('input', calc); });
  calc();
})();
