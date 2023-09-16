const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/conection');
const Lycee = require('./lycee.model.js');
const Etudiant = require('./etudiant.model.js');

class Academie extends Model {}

Academie.init({
  nom: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  },
  ville: {
    type: DataTypes.STRING
  },
  adresse: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Academie',
  timestamps: false,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  updatedBy: true
});

// Une académie peut avoir plusieurs lycées
Academie.hasMany(Lycee, { as: 'Lycees', foreignKey: 'academieId' });

// Un lycée appartient à une seule académie
Lycee.belongsTo(Academie, { as: 'Academie', foreignKey: 'academieId' });

// Un étudiant peut être inscrit dans une académie
Etudiant.belongsTo(Academie, { as: 'Academie', foreignKey: 'academieId' });

module.exports = Academie;
// Etudiant
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/conection.js');
const Lycee=require('./lycee.model.js')
const Academie=require('./academie.model.js')

    const Etudiant = sequelize.define("Etudiant", {
      matricule: {
        type: DataTypes.STRING
      },
      matriculeBac: {
        type: DataTypes.STRING
      }
      ,
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
         academie:{
        type:DataTypes.STRING
      },
      lycee:{
        type:DataTypes.STRING
      },
    



      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      createdBy: 'createdBy',
      updatedBy: 'updatedBy'
      
   
    });

    Etudiant.belongsTo(Lycee, { foreignKey: 'centreBac' });
Etudiant.belongsTo(Academie, { foreignKey: 'academie' });
    // async function reinitializeTable(model) {
    //   await model.drop();
    //   await model.sync({ force: true });
    // }
    // reinitializeTable(Etudiant)
    module.exports = Etudiant
    // Lycee 
    const { DataTypes, Sequelize } = require('sequelize');
    const sequelize = require('../db/conection.js');
    const Academie = require('./academie.model');
    
     class Lycee extends Sequelize.Model {}
    
    Lycee.init({
      nom: {
        type: DataTypes.STRING
      },
      abbrev: {
        type: DataTypes.STRING
      },
      academie_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Academie,
          key: 'id'
        }
      },
      adresse: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      modelName: 'Lycee'
    });
    
    Lycee.belongsTo(Academie, { foreignKey: 'academie_id' });
    
    module.exports = Lycee;
    