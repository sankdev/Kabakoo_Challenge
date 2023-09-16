"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes,
    Sequelize = _require.Sequelize;

var sequelize = require('../db/conection.js');

var Etudiant = sequelize.define("Etudiant", {
  codeControl: {
    type: DataTypes.STRING
  },
  matricules: {
    type: DataTypes.STRING
  },
  matriculeBac: {
    type: DataTypes.STRING
  },
  nom: {
    type: DataTypes.STRING
  },
  prenom: {
    type: DataTypes.STRING
  },
  sexe: {
    type: DataTypes.STRING
  },
  nationalite: {
    type: DataTypes.STRING
  },
  codeNationalite: {
    type: DataTypes.STRING
  },
  dateNaissance: {
    type: DataTypes.DATE
  },
  nomMere: {
    type: DataTypes.STRING
  },
  prenomMere: {
    type: DataTypes.STRING
  },
  nomPere: {
    type: DataTypes.STRING
  },
  prenomPere: {
    type: DataTypes.STRING
  },
  matriculeDef: {
    type: DataTypes.STRING
  },
  sessionDef: {
    type: DataTypes.STRING
  },
  centreDef: {
    type: DataTypes.STRING
  },
  sessionBac: {
    type: DataTypes.STRING
  },
  mentionBac: {
    type: DataTypes.STRING
  },
  serieBac: {
    type: DataTypes.STRING
  },
  placeNum: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  moyenneBac: {
    type: DataTypes.STRING
  },
  lieuNaissance: {
    type: DataTypes.STRING
  },
  scolariteLyc: {
    type: DataTypes.STRING
  },
  centreBac: {
    type: DataTypes.STRING
  },
  inscriptibilite: {
    type: DataTypes.BOOLEAN
  },
  academie: {
    type: DataTypes.STRING
  },
  lycee: {
    type: DataTypes.STRING
  },
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
}); // async function reinitializeTable(model) {
//   await model.drop();
//   await model.sync({ force: true });
// }
// reinitializeTable(Etudiant)

module.exports = Etudiant;