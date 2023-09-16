// import { useState } from 'react';
// import Popper from '@material-ui/core/Popper';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

// // 
// const handleVerification = () => {
//   const existingMatricules = generateControlCode();
//   let matriculeValide = false;
//   let missingChars = '';
//   let invalidLastChar = '';
//   let validLastChar = '';
  
//   for (let i = 0; i < existingMatricules.length; i += 1) {
//     if (existingMatricules[i] === inputValue) {
//       matriculeValide = true;
//       break;
//     } else if (!matriculeValide && existingMatricules[i].startsWith(inputValue)) {
//       // Calculate the missing characters for the current matricule and the verification matricule
//       const firstMatricule = existingMatricules[i];
//       const secondMatricule = inputValue;
//       missingChars = '';
//       for (let j = 0; j < firstMatricule.length; j += 1) {
//         if (firstMatricule.toString().charAt(j) !== secondMatricule.toString().charAt(j)) {
//           missingChars += firstMatricule.charAt(j);
//         } else {
//           missingChars += '-';
//         }
//       }
//       invalidLastChar = inputValue.charAt(inputValue.length - 1);
//       validLastChar = firstMatricule.charAt(firstMatricule.length - 1);
//       break;
//     }
//   }

//   if (matriculeValide) {
//     setPopupMessage(`Matricule ${inputValue} valide !`);
//   } else {
//     setPopupMessage(`Matricule ${inputValue} invalide. Le dernier caractère devrait être ${validLastChar}, mais vous avez entré ${invalidLastChar}.`);
//   }
  
//   setVerifMatricule(inputValue);
//   setCaracteresManquants(missingChars)
 
//   handleClick1();
// };

// useEffect(() => {
//   const existingMatricules = generateControlCode();
//   let matriculeValide = false;
//   let missingChars = '';
//   let invalidLastChar = '';
//   let validLastChar = '';
  
//   for (let i = 0; i < existingMatricules.length; i += 1) {
//     if (existingMatricules[i] === inputValue) {
//       matriculeValide = true;
//       break;
//     } else if (!matriculeValide && existingMatricules[i].startsWith(inputValue)) {
//       // Calculate the missing characters for the current matricule and the verification matricule
//       const firstMatricule = existingMatricules[i];
//       const secondMatricule = inputValue;
//       missingChars = '';
//       for (let j = 0; j < firstMatricule.length; j += 1) {
//         if (firstMatricule.toString().charAt(j) !== secondMatricule.toString().charAt(j)) {
//           missingChars += firstMatricule.charAt(j);
//         } else {
//           missingChars += '-';
//         }
//       }
//       invalidLastChar = inputValue.charAt(inputValue.length - 1);
//       validLastChar = firstMatricule.charAt(firstMatricule.length - 1);
//       setCaracteresManquants(missingChars)
//       break;
//     }
//   }

//   if (matriculeValide) {
//     setPopupMessage(`Matricule ${inputValue} valide !`);
//   } else {
//     setPopupMessage(`Matricule ${inputValue} invalide. Le dernier caractère devrait être ${validLastChar}, mais vous avez entré ${invalidLastChar}.`);
//   }
  
//   setVerifMatricule(inputValue);
//   setCaracteresManquants(missingChars)
 
  
  
// }, [inputValue,caracteresManquants]);
<div>
<button type="button" onClick={() => setShowPopup(true)}>Générer un nouveau matricule</button>
{showPopup && (
  <div className="popup">
    <label htmlFor="sessionSuffix">
      Suffixe de session :
      <input
      id="sessionSuffix"
        type="text"
        value={sessionSuffix}
        onChange={(e) => setSessionSuffix(e.target.value)}
      />
    </label>
    <label htmlFor="academiePrefix">
      Préfixe d'académie :
      <input
      id="academiePrefix"
        type="text"
        value={academiePrefix}
        onChange={(e) => setAcademiePrefix(e.target.value)}
      />
    </label>
    <label htmlFor="nationalite">
      Nationalité :
      <input
      id="nationalite"
        type="text"
        value={nationalite}
        onChange={(e) => setNationalite(e.target.value)}
      />
    </label >
    <label htmlFor="sex">
      Sexe :
      <input
      id="sex"
        type="text"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
      />
    </label>
    <button type="button" onClick={handleGenerateClick}>Générer</button>
    <button type="button" onClick={handlePopup}>Annuler</button>
  </div>
)}
{generatedMatricule && <p>Matricule généré : {generatedMatricule}</p>}
</div>
const generateNouveauMatricul = () => {
  const matriculeNumber = (data.length - 1).toString().padStart(5, '0');
  const digitSum = matriculeNumber
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  const charCode = Math.floor((digitSum / 10) * 25) + 65;
  const char = String.fromCharCode(charCode);

  const sessionSuffixLastTwoChars = sessionSuffix?.slice(-2) || '';
  const academiePrefixFirstChar = academiePrefix?.charAt(0) || '';
  const nationaliteFirstChar = nationalite?.charAt(0) || '';
  const sexFirstChar = sex?.charAt(0) || '';

  const sequentialCode = sequentialNumber.toString().padStart(5, '0');
  const sequentialCharCode = (parseInt(sequentialCode, 10) % 26) + 65;
  const sequentialChar = String.fromCharCode(sequentialCharCode);

  const matricule =
    sessionSuffixLastTwoChars +
    academiePrefixFirstChar +
    nationaliteFirstChar +
    sexFirstChar +
    matriculeNumber +
    char +
    sequentialChar;

  setGeneratedMatricule(matricule);
  setSequentialNumber(sequentialNumber + 1);
  return matricule;
};
