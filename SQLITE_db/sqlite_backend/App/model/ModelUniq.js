const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/conection.js');

const Etudiant = sequelize.define("Etudiant", {
  matricule: {
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
  sexe:{
    type:DataTypes.STRING
  },
  nationalite:{
    type:DataTypes.STRING
  },
  codeNationalite:{
    type:DataTypes.STRING
  },
  dateNaissance:{
    type:DataTypes.DATE,
  },
  nomMere:{
    type:DataTypes.STRING
  },
  prenomMere:{
    type:DataTypes.STRING
  },
  nomPere:{
    type:DataTypes.STRING
  },
  prenomPere:{
    type:DataTypes.STRING
  },
  matriculeDef:{
    type:DataTypes.STRING
  },
  sessionDef:{
    type:DataTypes.STRING
  },
  centreDef:{
    type:DataTypes.STRING
  },
  sessionBac:{
    type:DataTypes.STRING
  },
  mentionBac:{
    type:DataTypes.STRING
  },
  serieBac:{
    type:DataTypes.STRING
  },
  placeNum:{
    type:DataTypes.STRING
  },
  status:{
    type:DataTypes.STRING
  },
  moyenneBac:{
    type:DataTypes.STRING
  },
  lieuNaissance:{
    type:DataTypes.STRING
  },
  scolariteLyc:{
    type:DataTypes.STRING
  },
  centreBac:{
    type:DataTypes.STRING
  },
  inscriptibilite:{
    type:DataTypes.BOOLEAN
  },
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
});

const Academie= sequelize.define("Academie", {
  nom: {
    type:DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  },
  ville: {
    type: DataTypes.STRING
  },
  adresse: {
    type:DataTypes.STRING
  },
  timestamps: false,
  createdAt: true,
  updateAt:true,
  createdBy: true,
  updateBy:true
});

const Lycee = sequelize.define("Lycee", {
  nom: {
    type: DataTypes.STRING
  },
  abbrev: {
    type: DataTypes.STRING
  },
  academie: {
    type: DataTypes.STRING
  },
  adresse: {
    type: DataTypes.STRING
  },
  timestamps: true,
  createdAt: true,
  updateAt:true,
  createdBy: true,
  updateBy:true
});

// Define relationships
Etudiant.belongsTo(Academie, { foreignKey: 'academieId' });
Academie.hasMany(Etudiant, { foreignKey: 'academieId' });

Etudiant.belongsTo(Lycee, { foreignKey: 'lyceeId' });
Lycee.hasMany(Etudiant, { foreignKey: 'lyceeId' });

module.exports = { Etudiant, Academie, Lycee };
