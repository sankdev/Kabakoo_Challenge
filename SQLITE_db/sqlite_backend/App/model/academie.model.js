const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/conection.js');

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
    //   Nationalite_Etudiant:{
    //     type:Sequelize.STRING
    //   },
    //   Date_Naissance:{
    //     type:Sequelize.DATE,
    //     allowNull:false
       
    //   },
      timestamps: false,
      createdAt: true,
      updateAt:true,
      createdBy: true,
      updateBy:true
      
   
    });
    // async function reinitializeTable(model) {
    //    await model.drop();
    //   await model.sync({ force: true });
    //  }
    //  reinitializeTable(EtudiantFam)
    
    module.exports = Academie