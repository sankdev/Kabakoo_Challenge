"use strict";

var _react = require("react");

var _Popper = _interopRequireDefault(require("@material-ui/core/Popper"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 
var handleVerification = function handleVerification() {
  var existingMatricules = generateControlCode();
  var matriculeValide = false;
  var missingChars = '';
  var invalidLastChar = '';
  var validLastChar = '';

  for (var i = 0; i < existingMatricules.length; i += 1) {
    if (existingMatricules[i] === inputValue) {
      matriculeValide = true;
      break;
    } else if (!matriculeValide && existingMatricules[i].startsWith(inputValue)) {
      // Calculate the missing characters for the current matricule and the verification matricule
      var firstMatricule = existingMatricules[i];
      var secondMatricule = inputValue;
      missingChars = '';

      for (var j = 0; j < firstMatricule.length; j += 1) {
        if (firstMatricule.toString().charAt(j) !== secondMatricule.toString().charAt(j)) {
          missingChars += firstMatricule.charAt(j);
        } else {
          missingChars += '-';
        }
      }

      invalidLastChar = inputValue.charAt(inputValue.length - 1);
      validLastChar = firstMatricule.charAt(firstMatricule.length - 1);
      break;
    }
  }

  if (matriculeValide) {
    setPopupMessage("Matricule ".concat(inputValue, " valide !"));
  } else {
    setPopupMessage("Matricule ".concat(inputValue, " invalide. Le dernier caract\xE8re devrait \xEAtre ").concat(validLastChar, ", mais vous avez entr\xE9 ").concat(invalidLastChar, "."));
  }

  setVerifMatricule(inputValue);
  setCaracteresManquants(missingChars);
  handleClick1();
};

useEffect(function () {
  var existingMatricules = generateControlCode();
  var matriculeValide = false;
  var missingChars = '';
  var invalidLastChar = '';
  var validLastChar = '';

  for (var i = 0; i < existingMatricules.length; i += 1) {
    if (existingMatricules[i] === inputValue) {
      matriculeValide = true;
      break;
    } else if (!matriculeValide && existingMatricules[i].startsWith(inputValue)) {
      // Calculate the missing characters for the current matricule and the verification matricule
      var firstMatricule = existingMatricules[i];
      var secondMatricule = inputValue;
      missingChars = '';

      for (var j = 0; j < firstMatricule.length; j += 1) {
        if (firstMatricule.toString().charAt(j) !== secondMatricule.toString().charAt(j)) {
          missingChars += firstMatricule.charAt(j);
        } else {
          missingChars += '-';
        }
      }

      invalidLastChar = inputValue.charAt(inputValue.length - 1);
      validLastChar = firstMatricule.charAt(firstMatricule.length - 1);
      setCaracteresManquants(missingChars);
      break;
    }
  }

  if (matriculeValide) {
    setPopupMessage("Matricule ".concat(inputValue, " valide !"));
  } else {
    setPopupMessage("Matricule ".concat(inputValue, " invalide. Le dernier caract\xE8re devrait \xEAtre ").concat(validLastChar, ", mais vous avez entr\xE9 ").concat(invalidLastChar, "."));
  }

  setVerifMatricule(inputValue);
  setCaracteresManquants(missingChars);
}, [inputValue, caracteresManquants]);