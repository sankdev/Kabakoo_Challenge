// const { DataTypes, UniqueConstraintError } = require('sequelize');
// const sequelize = require('../db/conection.js');

// const UserModel=sequelize.define('User',{
//     nom:{
//         type:DataTypes.STRING
//     },
//     email:{
//         type:DataTypes.STRING ,
//         unique:true
//     },
//     password:{type:DataTypes.INTEGER},
//     role:{
//         type:DataTypes.ENUM,
//         values:['admin','user'],
//         defaultValue:'user'

//     }
//    ,
//    active:{
//         type:DataTypes.BOOLEAN,
//         defaultValue:false
//    },



// },{
//     underscored:true
// }
   

    
// );
// async function reinitializeTable(model) {
//       await model.drop();
//       await model.sync({ force: true });
//     }
//     reinitializeTable(UserModel)
// module.exports=UserModel
// test 
const { DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require('../db/conection.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const UserModel=sequelize.define(
    'User',
    {
      nom: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
      },
      passwordResetExpire: {
        type: DataTypes.DATE,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (!user.changed('password')) {
            return;
          } 
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (!user.changed('password')) {
            return;
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
      underscored: true,
    }
  );
  
  UserModel.prototype.isPasswordMatched = async function (enteredPassword) {
    console.log("entreePassword", enteredPassword);
    console.log("comparaison", this.password);
    console.log("entree", enteredPassword);
    
    const isMatched = await bcrypt.compare(enteredPassword, this.password);
    console.log("ismatched",isMatched)
    return isMatched;
    
  };
  
  
  UserModel.prototype.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordResetExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    return resettoken;
  };

// async function reinitializeTable(model) {
//       await model.drop();
//       await model.sync({ force: true }); 
//     }
//     reinitializeTable(UserModel)
module.exports=UserModel 

// const { DataTypes, UniqueConstraintError } = require('sequelize');
// const sequelize = require('../db/conection.js');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');


// const UserModel=sequelize.define(
//     'User',
//     {
//       nom: {
//         type: DataTypes.STRING,
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//       },
//       role: {
//         type: DataTypes.ENUM('admin', 'user'),
//         defaultValue: 'user',
//       },
//       active: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       passwordChangedAt: {
//         type: DataTypes.DATE,
//       },
//       passwordResetToken: {
//         type: DataTypes.STRING,
//       },
//       passwordResetExpire: {
//         type: DataTypes.DATE,
//       },
//     },
//     {
//       hooks: {
//         async beforeCreate(user) {
//           if (user.changed('password') && user.password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(user.password, salt);
//           }
//         },
//         async beforeUpdate(user) {
//           if (user.changed('password') && user.password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(user.password, salt);
//           }
//         }
//       },
//       underscored: true,
//     }
//   );
  
//   UserModel.prototype.isPasswordMatched = async function (enteredPassword) {
//    // console.log("entreePassword",enteredPassword)
//     return await bcrypt.compare(enteredPassword, this.password);
    
//   }; 
  
//   UserModel.prototype.createPasswordResetToken = async function () {
//     const resettoken = crypto.randomBytes(32).toString('hex');
//     this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
//     this.passwordResetExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
//     return resettoken;
//   };

// // async function reinitializeTable(model) {
// //       await model.drop();
// //       await model.sync({ force: true }); 
// //     }
// //     reinitializeTable(UserModel)
// module.exports=UserModel 