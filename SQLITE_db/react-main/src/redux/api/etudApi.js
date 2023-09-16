import axios from 'axios';

export const etudApi = {
  
  etudiant: async (matricule,matriculeBac,nom,prenom,sexe,
    nationalite,codeNationalite,dateNaissance,nomMere, prenomMere,
    nomPere,prenomPere,matriculeDef,sessionDef,centreExamenDef,sessionBac,
    mentionBac,serieBac,placeNum,status,moyenneBac,lieuNaissance,scolariteLyc,
    centreExamenBac,inscriptibilite,academie,lycee) => {
    const response = await axios.post('http://localhost:3001/app/postetud', {matricule,matriculeBac,nom,prenom,sexe,
      nationalite,codeNationalite,dateNaissance,nomMere, prenomMere,
      nomPere,prenomPere,matriculeDef,sessionDef,centreExamenDef,sessionBac,
      mentionBac,serieBac,placeNum,status,moyenneBac,lieuNaissance,scolariteLyc,
      centreExamenBac,inscriptibilite,academie,lycee });
    return response;
  },
};
