module.exports = function () {
  var myth = require('myth');
  var fromTextElement = document.getElementById('from');
  var toTextElement = document.getElementById('to');
  var errorElement = document.getElementById('error');

  function updateCSS() {
    var css = fromTextElement.value;
    errorElement.innerHTML = '';
    errorElement.className = 'hidden';
    var converted = toTextElement.value;
    try {
      converted = myth(css);
    } catch(e) {
      errorElement.className = '';
      errorElement.innerHTML = e.toString();
    }
    toTextElement.value = converted.trim();
  }

  fromTextElement.addEventListener('change', updateCSS);
  fromTextElement.addEventListener('keyup', updateCSS);
  updateCSS();
};