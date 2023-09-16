"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectError = exports.selectLoading = exports.selectUsers = exports.clearError = exports.setError = exports.setLoading = exports.updateUser = exports.fetchUsers = void 0;

var _toolkit = require("@reduxjs/toolkit");

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
// const myApi = createApi({
//   reducerPath: 'myApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/app' }),
//   endpoints: (builder) => ({
//     saveData: builder.mutation({
//       query: (data) => ({
//         url: '/postetud',
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }),
//     }),
//   }),
// });
// export const { useSaveDataMutation } = myApi;
// const etudiantSlice = createSlice({
//   name: 'database',
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       (action) => action.type.endsWith('/pending'),
//       (state) => {
//         state.loading = true;
//         state.error = null;
//       }
//     );
//     builder.addMatcher(
//       (action) => action.type.endsWith('/fulfilled'),
//       (state, action) => {
//         state.data = action.payload;
//         state.loading = false;
//         state.error = null;
//       }
//     );
//     builder.addMatcher(
//       (action) => action.type.endsWith('/rejected'),
//       (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       }
//     );
//   },
// });
// export default etudiantSlice.reducer;
// Action creator asynchrone pour récupérer les utilisateurs
var fetchUsers = (0, _toolkit.createAsyncThunk)('users/fetchUsers', function _callee(_, _ref) {
  var rejectWithValue, token, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rejectWithValue = _ref.rejectWithValue;
          _context.prev = 1;
          token = localStorage.getItem('token');
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("http://localhost:3001/app/all-user", {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          }));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          console.log("ReduxUser", data);
          return _context.abrupt("return", data.allUser);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", rejectWithValue(_context.t0.message));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}); // Action creator asynchrone pour mettre à jour un utilisateur

exports.fetchUsers = fetchUsers;
var updateUser = (0, _toolkit.createAsyncThunk)('users/updateUser', function _callee2(_ref2, _ref3) {
  var userId, token, nom, email, password, rejectWithValue, response, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = _ref2.userId, token = _ref2.token, nom = _ref2.nom, email = _ref2.email, password = _ref2.password;
          rejectWithValue = _ref3.rejectWithValue;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetch("http://localhost:3001/app/updateuser/".concat(userId), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer ".concat(token)
            },
            body: JSON.stringify({
              nom: nom,
              email: email,
              password: password
            })
          }));

        case 5:
          response = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context2.sent;

          if (!response.ok) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", data);

        case 11:
          return _context2.abrupt("return", rejectWithValue(data.message));

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", rejectWithValue(_context2.t0.message));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 14]]);
});
exports.updateUser = updateUser;
var initialState = {
  users: [],
  loading: false,
  error: null
};
var usersSlice = (0, _toolkit.createSlice)({
  name: 'users',
  initialState: initialState,
  reducers: {
    setLoading: function setLoading(state) {
      state.loading = true;
    },
    setError: function setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: function clearError(state) {
      state.error = null;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchUsers.pending, function (state) {
      state.loading = true;
    }).addCase(fetchUsers.fulfilled, function (state, action) {
      state.users = action.payload;
      state.loading = false;
    }).addCase(fetchUsers.rejected, function (state, action) {
      state.error = action.payload;
      state.loading = false;
    }).addCase(updateUser.pending, function (state) {
      state.loading = true;
    }).addCase(updateUser.fulfilled, function (state, action) {
      console.log(action.payload); // Faites quelque chose avec les données mises à jour

      state.loading = false;
    }).addCase(updateUser.rejected, function (state, action) {
      state.error = action.payload;
      state.loading = false;
    });
  }
});
var _usersSlice$actions = usersSlice.actions,
    setLoading = _usersSlice$actions.setLoading,
    setError = _usersSlice$actions.setError,
    clearError = _usersSlice$actions.clearError;
exports.clearError = clearError;
exports.setError = setError;
exports.setLoading = setLoading;

var selectUsers = function selectUsers(state) {
  return state.etud.users;
};

exports.selectUsers = selectUsers;

var selectLoading = function selectLoading(state) {
  return state.etud.loading;
};

exports.selectLoading = selectLoading;

var selectError = function selectError(state) {
  return state.etud.error;
};

exports.selectError = selectError;
var _default = usersSlice.reducer;
exports["default"] = _default;