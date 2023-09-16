"use strict";

// const User=require('../test_sequelize/model/user.model')
// const checkRole = (role) => (req, res, next) => {
//     User.findById(req.user.id, (err, user) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       if (user.role !== role) {
//         return res.status(401).send('Unauthorized');
//       }
//       next();
//     });
//   };
//   module.exports=checkRole
var jwt = require('jsonwebtoken');

var asyncHandler = require('express-async-handler');

var UserModel = require('../App/model/user.model.js');

var authMiddleware = asyncHandler(function _callee(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context.next = 17;
            break;
          }

          token = req.headers.authorization.split(' ')[1];
          _context.prev = 2;

          if (!token) {
            _context.next = 10;
            break;
          }

          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 7;
          return regeneratorRuntime.awrap(UserModel.findOne({
            where: {
              id: decoded.id
            }
          }));

        case 7:
          user = _context.sent;
          req.user = user;
          next();

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          throw new Error('Not authorized, please log in again');

        case 15:
          _context.next = 18;
          break;

        case 17:
          throw new Error('No token attached to this header');

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
var isAdmin = asyncHandler(function _callee2(req, res, next) {
  var email, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.user.email;
          _context2.next = 3;
          return regeneratorRuntime.awrap(UserModel.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          user = _context2.sent;

          if (!(user.role !== 'admin')) {
            _context2.next = 8;
            break;
          }

          throw new Error("Vous n'êtes pas un admin");

        case 8:
          next();

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = {
  authMiddleware: authMiddleware,
  isAdmin: isAdmin
};