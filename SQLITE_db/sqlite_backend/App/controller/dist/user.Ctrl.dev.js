"use strict";

var db = require('../db/conection');

var login = require('../model/user.model.js');

var bcrypt = require('bcryptjs');

var loginCtr = function loginCtr(req, res) {
  var _req$body, email, password, emailExist, validPass;

  return regeneratorRuntime.async(function loginCtr$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // const {_id}=req.param.id

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(login.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          emailExist = _context.sent;

          if (emailExist) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send('email n existe pas'));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, emailExist.password));

        case 9:
          validPass = _context.sent;

          if (validPass) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).send('le mot de passe est invalide'));

        case 12:
          res.status(200).send(emailExist);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          res.send(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
}; // exports.getAdminDashboard = async (req, res) => {
//     // Check if the user has the admin role
//     const user = await login.findByPk(req.userId);
//     if (user.role !== 'admin') {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
// Admin-only functionality
// ...
// };


var register = function register(req, res) {
  var salt, hashedPassword, Login, saveLoging;
  return regeneratorRuntime.async(function register$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 2:
          salt = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 5:
          hashedPassword = _context2.sent;
          Login = new login({
            nom: req.body.nom,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            active: req.body.active
          });
          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Login.save());

        case 10:
          saveLoging = _context2.sent;
          res.send(saveLoging);
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](7);
          res.status(400).send(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

var getUser = function getUser(req, res) {
  var id, user;
  return regeneratorRuntime.async(function getUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(login.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          user = _context3.sent;
          res.status(200).send(user);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var updateUser = function updateUser(req, res) {
  var id, user;
  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(login.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).send('User not found'));

        case 7:
          user.nom = req.body.nom;
          user.email = req.body.email;
          user.role = req.body.role;
          user.active = req.body.active;
          _context4.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.status(200).send(user);
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](1);
          res.status(400).send(_context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

var modifierUser = function modifierUser(req, res) {
  var id, _req$body2, email, password, user, emailExist, validPass;

  return regeneratorRuntime.async(function modifierUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(login.findOne({
            where: {
              id: id
            }
          }));

        case 5:
          user = _context5.sent;

          if (user) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).send('User not found'));

        case 8:
          if (!(email && email !== user.email)) {
            _context5.next = 14;
            break;
          }

          _context5.next = 11;
          return regeneratorRuntime.awrap(login.findOne({
            where: {
              email: email
            }
          }));

        case 11:
          emailExist = _context5.sent;

          if (!emailExist) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", res.status(400).send('Email already in use'));

        case 14:
          if (!password) {
            _context5.next = 20;
            break;
          }

          _context5.next = 17;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 17:
          validPass = _context5.sent;

          if (validPass) {
            _context5.next = 20;
            break;
          }

          return _context5.abrupt("return", res.status(400).send('Invalid password'));

        case 20:
          // Update user details
          user.nom = req.body.nom;
          user.email = email || user.email;
          user.role = req.body.role;
          user.active = req.body.active;
          _context5.next = 26;
          return regeneratorRuntime.awrap(user.save());

        case 26:
          res.status(200).send(user);
          _context5.next = 32;
          break;

        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](2);
          res.status(400).send(_context5.t0);

        case 32:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 29]]);
};

var deleteUser = function deleteUser(req, res) {
  var id, user;
  return regeneratorRuntime.async(function deleteUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(login.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          user = _context6.sent;

          if (user) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).send('User not found'));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(user.destroy());

        case 9:
          res.status(200).send('User deleted successfully');
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          res.status(400).send(_context6.t0);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

module.exports = {
  loginCtr: loginCtr,
  register: register,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  modifierUser: modifierUser
};