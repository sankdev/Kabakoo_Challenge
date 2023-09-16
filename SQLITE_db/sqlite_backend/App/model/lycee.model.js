const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/conection.js');

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
      createdAt: {
        type:DataTypes.DATE
      },
      updateAt:{
        type:DataTypes.DATE
      },
      createdBy: true,
      updateBy:true
   
    });
    // async function reinitializeTable(model) {
    //   await model.drop();
    //   await model.sync({ force: true });
    // }
    // reinitializeTable(Lycee)
    module.exports = Lycee