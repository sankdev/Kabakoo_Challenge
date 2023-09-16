"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authApi = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authApi = {
  loginIn: function loginIn(email, password) {
    var response;
    return regeneratorRuntime.async(function loginIn$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].post('login', {
              email: email,
              password: password
            }));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
}; // import axios from 'axios';
// const authApi = async ({ username, password }) => {
//   try {
//     const response = await axios.post('http://localhost:3001/app/login', {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (err) {
//     throw new Error(err.response.data.error);
//   }
// };
// export default authApi;

exports.authApi = authApi;