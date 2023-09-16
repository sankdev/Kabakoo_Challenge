"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.loginUser = exports.postUser = exports.logout = exports.setUser = exports.setError = exports.setLoading = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  currentUser: null,
  isLoggedIn: false
};
var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoading: function setLoading(state) {
      state.isLoading = true;
    },
    setError: function setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUser: function setUser(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.currentUser = action.payload;
    },
    postUser: function postUser(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: function logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    loginUser: function loginUser(state, action) {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.user = action.payload;
    }
  }
});
var _authSlice$actions = authSlice.actions,
    setLoading = _authSlice$actions.setLoading,
    setError = _authSlice$actions.setError,
    setUser = _authSlice$actions.setUser,
    logout = _authSlice$actions.logout,
    postUser = _authSlice$actions.postUser,
    loginUser = _authSlice$actions.loginUser;
exports.loginUser = loginUser;
exports.postUser = postUser;
exports.logout = logout;
exports.setUser = setUser;
exports.setError = setError;
exports.setLoading = setLoading;
var _default = authSlice.reducer;
exports["default"] = _default;