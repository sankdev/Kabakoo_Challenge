"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.loginUser = exports.logout = exports.authSlice = exports.login = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _userApi = require("../api/userApi");

// import axios from 'axios';
// export const login = createAsyncThunk(
//   'user/login',
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:3001/app/login', {
//         username,
//         password,
//       });
//       return response.data;
//     } catch (err) {
//       if (err.response) {
//         return rejectWithValue(err.response.data);
//       }
//       throw err;
//     }
//   }
// );
// const utilisateurSlice = createSlice({
//   name: 'user',
//   initialState: {
//     loading: false,
//     currentUser: [],
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.currentUser = null;
//     },
//         fetchDataSuccess: (state, action) => {
//           state.currentUser = action.payload || [];
//           console.log(fetchDataSuccess);
//         },
//   },
//   extraReducers: {
//     [login.pending]: (state) => {
//       state.loading = true;
//     },
//     [login.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.currentUser = action.payload;
//       state.error = null;
//     },
//     [login.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });
// export const { logout } = utilisateurSlice.actions;
// export default utilisateurSlice.reducer;
// export const selectCurrentUser = (state) => state.currentUser;
// export const selectLoading = (state) => state.user.loading;
// export const selectError = (state) => state.user.error;
var initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  currentUser: null,
  isLoggedIn: false
};
var login = (0, _toolkit.createAsyncThunk)('auth/login', function _callee(_ref) {
  var email, password, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = _ref.email, password = _ref.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_userApi.authApi.loginIn(email, password));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = login;
var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: function logout(state) {
      state.user = null;
    },
    loginUser: function loginUser(state, action) {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(login.pending, function (state) {
      state.isLoading = true;
      state.error = null;
    }).addCase(login.fulfilled, function (state, action) {
      state.isLoading = false;
      state.user = action.payload;
      state.currentUser = action.payload;
    }).addCase(login.rejected, function (state, action) {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});
exports.authSlice = authSlice;
var _authSlice$actions = authSlice.actions,
    logout = _authSlice$actions.logout,
    loginUser = _authSlice$actions.loginUser;
exports.loginUser = loginUser;
exports.logout = logout;
var _default = authSlice.reducer;
exports["default"] = _default;