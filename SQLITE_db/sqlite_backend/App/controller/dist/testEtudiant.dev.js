// const Etudiant = require('../model/etudiant.model');
// const etudImportExcelController = async(req,res) =>{
//     const { etudiants } = req.body; // tableau des étudiants importés
//     try {
//       // Supprime tous les étudiants existants dans la base de données
//       await Etudiant.destroy({
//         where: {},
//         truncate: true
//       });
//       // Insère les nouveaux étudiants dans la base de données
//       await Etudiant.bulkCreate(etudiants);
//       res.status(200).json({ message: 'Données importées avec succès' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement des données' });
//     }
//   }
// module.exports = {etudImportExcelController};
"use strict";