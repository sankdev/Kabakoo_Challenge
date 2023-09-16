// const {Sequelize }=require('sequelize')
//  const  sequelize= new Sequelize('test_db' ,'user','pass',{
//     dialect:'sqlite',
//     host:'./config/dev.sqlite',
//     useNullAsDefault:true
//  })


 const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './config/dev.sqlite',
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((error) => {
    console.error('Unable to sync models with the database:', error);
  });
  module.exports=sequelize;