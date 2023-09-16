"use strict";

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
var _require = require('sequelize'),
    DataTypes = _require.DataTypes,
    UniqueConstraintError = _require.UniqueConstraintError;

var sequelize = require('../db/conection.js');

var bcrypt = require('bcryptjs');

var crypto = require('crypto');

var UserModel = sequelize.define('User', {
  nom: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  passwordChangedAt: {
    type: DataTypes.DATE
  },
  passwordResetToken: {
    type: DataTypes.STRING
  },
  passwordResetExpire: {
    type: DataTypes.DATE
  }
}, {
  hooks: {
    beforeCreate: function beforeCreate(user) {
      var salt;
      return regeneratorRuntime.async(function beforeCreate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (user.changed('password')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(bcrypt.genSalt(10));

            case 4:
              salt = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

            case 7:
              user.password = _context.sent;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    beforeUpdate: function beforeUpdate(user) {
      var salt;
      return regeneratorRuntime.async(function beforeUpdate$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (user.changed('password')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(bcrypt.genSalt(10));

            case 4:
              salt = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

            case 7:
              user.password = _context2.sent;

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  underscored: true
});

UserModel.prototype.isPasswordMatched = function _callee(enteredPassword) {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("entreePassword", enteredPassword);
          _context3.next = 3;
          return regeneratorRuntime.awrap(bcrypt.compare(enteredPassword, this.password));

        case 3:
          return _context3.abrupt("return", _context3.sent);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
};

UserModel.prototype.createPasswordResetToken = function _callee2() {
  var resettoken;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          resettoken = crypto.randomBytes(32).toString('hex');
          this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
          this.passwordResetExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

          return _context4.abrupt("return", resettoken);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
}; // async function reinitializeTable(model) {
//       await model.drop();
//       await model.sync({ force: true }); 
//     }
//     reinitializeTable(UserModel)


module.exports = UserModel;