

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
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '../api/userApi';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
    currentUser: null,
    isLoggedIn: false
};

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await authApi.loginIn(email, password);
 
  return response.data;
  
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.currentUser=action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout,loginUser } = authSlice.actions;

export default authSlice.reducer;