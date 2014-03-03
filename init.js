module.exports = function () {
  var myth = require('myth');
  var fromTextElement = document.getElementById('from');
  var toTextElement = document.getElementById('to');
  var errorElement = document.getElementById('error');
  var values = {};

  function getUrlValues() {
    var paramStringMatch = document.location.href.match(/\?(.*)$/);
    var urlSearch = '';
    var valuesArray = [];
    var values = {};

    if (null === paramStringMatch) {
      return values;
    }
    urlSearch = paramStringMatch[1];
    valuesArray = urlSearch.split('&');

    for(var i = 0; i < valuesArray.length; i++){
      var keyValArray = valuesArray[i].split('=');
      values[keyValArray[0]] = keyValArray[1];
    }

    return values;
  }
  values = getUrlValues();


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

  if (null !== fromTextElement) {
    if ('m' in values) {
      fromTextElement.value = decodeURIComponent(values.m);
    }

    fromTextElement.addEventListener('change', updateCSS);
    fromTextElement.addEventListener('keyup', updateCSS);
    updateCSS();
  }
};