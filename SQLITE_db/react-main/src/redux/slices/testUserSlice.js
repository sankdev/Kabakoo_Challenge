import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("DATAREDUXTOLKIT",data)
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', JSON.stringify(data.id));
        return data.user;
      } 
        return rejectWithValue(data.message);
     
        
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
 
    isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user=null
    },
    setUser: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
     
    },
    postUser: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.user=action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setLoading, setError, setUser, logout,postUser,loginUser
 } = authSlice.actions;

 export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.test.isLoading;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;