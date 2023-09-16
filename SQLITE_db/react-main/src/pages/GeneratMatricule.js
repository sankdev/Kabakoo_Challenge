// import React, { useState } from "react";
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from "@material-ui/core";
// import axios from "axios";

// const GeneratMtricule = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [sessionSuffix, setSessionSuffix] = useState("");
//   const [academiePrefix, setAcademiePrefix] = useState("");
//   const [nationalite, setNationalite] = useState("");
//   const [sex, setSex] = useState("");
//   const [sexe, setSexe] = useState("");

//   const [codeSequentiel, setCodeSequentiel] = useState("");
//   const [generatedMatricule, setGeneratedMatricule] = useState("");
//   const [sessions, setSessions] = useState("");
//   const [CodeAcademie, setCodeAcademie] = useState("");
//   const [CodeNationalite, setCodeNationalite] = useState("");

//   const handleCloseP = () => {
//     setShowPopup(false);
//   };

//   const handleClickOpen = () => {
//     setShowPopup(true);
//   };

//   useEffect(() => {
//     axios.get("http://localhost:3001/app/etudiant")
//       .then((response) => {
//         setSessions(response.data.sessionBac);
//         setCodeAcademie(response.data.academie);
//         setCodeNationalite(response.data.CodeNationalites);
//         setSexe(response.data.sexe)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   const handleGenerateClick = () => {
//     const matricule = generateNouveauMatricul({
//       sessionSuffix,
//       academiePrefix,
//       nationalite,
//       sex,
//       codeSequentiel,
//     });
//     setGeneratedMatricule(matricule);
//   };
  

//   return (
//     <div>
//       <Button variant="contained" onClick={handleClickOpen}>
//         Générer un nouveau matricule
//       </Button>
//       <Dialog open={showPopup} onClose={handleCloseP}>
//         <DialogTitle>Générer un nouveau matricule</DialogTitle>
//         <DialogContent>
//           <TextField
//             select
//             label="Suffixe de session"
//             value={sessionSuffix}
//             onChange={(e) => setSessionSuffix(e.target.value)}
//             fullWidth
//           >
//           {sessions.map((session) => (
//             <MenuItem key={session} value={session}>
//               {session}
//             </MenuItem>
//           ))}
//           </TextField>
//           <TextField
//             select
//             label="Préfixe d'académie"
//             value={academiePrefix}
//             onChange={(e) => setAcademiePrefix(e.target.value)}
//             fullWidth
//           >
//           {CodeAcademie.map((academie) => (
//             <MenuItem key={academie} value={academie}>
//               {academie}
//             </MenuItem>
//           ))}
//           </TextField>
//           <TextField
//             select
//             label="Nationalité"
//             value={nationalite}
//             onChange={(e) => setNationalite(e.target.value)}
//             fullWidth
//           >
//           {CodeNationalite.map((nationalite) => (
//             <MenuItem key={nationalite} value={nationalite}>
//               {nationalite}
//               </MenuItem>
//               ))}
//           </TextField>
//           <TextField
//             select
//             label="Sexe"
//             value={sex}
//             onChange={(e) => setSex(e.target.value)}
//             fullWidth
//           >
//           {sexe.map((sex) => (
//             <MenuItem key={sex} value={sex}>
//               {sex}
//               </MenuItem>
//               ))}
//           </TextField>
//           <TextField
//             label="codeSequentiel"
//             value={codeSequentiel}
//             onChange={(e) => setCodeSequentiel(e.target.value)}
//             fullWidth
//           />
//           {generatedMatricule !=null && (
//             <Typography>Matricule généré : {generatedMatricule}</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Annuler</Button>
//           <Button onClick={handleGenerateClick} color="primary">
//             Générer
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
// export default GeneratMtricule;