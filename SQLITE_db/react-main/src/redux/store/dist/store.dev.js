"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _reduxPersist = require("redux-persist");

var _userSlice = _interopRequireDefault(require("../slices/userSlice"));

var _testUserSlice = _interopRequireDefault(require("../slices/testUserSlice"));

var _etudiantSlice = _interopRequireDefault(require("../slices/etudiantSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var persistConfig = {
  key: "root",
  version: 1,
  storage: _storage["default"]
};
var reducers = (0, _toolkit.combineReducers)({
  user: _userSlice["default"],
  test: _testUserSlice["default"],
  etud: _etudiantSlice["default"]
});
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, reducers);
var store = (0, _toolkit.configureStore)({
  reducer: persistedReducer,
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [_reduxPersist.FLUSH, _reduxPersist.REHYDRATE, _reduxPersist.PAUSE, _reduxPersist.PERSIST, _reduxPersist.PURGE, _reduxPersist.REGISTER]
      }
    });
  }
});
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;