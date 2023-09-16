import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

 // pour affichage d'un utilisateur
export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/app/getuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
     
      console.log("databaseUser",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    userDetails: [],
    loading: false,
    error: null,
  };
  
  const getUsersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setLoading: (state) => {
        state.loading = true;
      },
      setError: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
          state.userDetails = [action.payload];
          state.loading = false;
        })
        .addCase(fetchUserDetails.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        });
        
    },
  });
  
  export const { setLoading, setError, clearError } = getUsersSlice.actions;
  
  export const getUser = (state) => state.list.userDetails;
  export const getLoading = (state) => state.auth.loading;
  export const getError = (state) => state.list.error;
export default getUsersSlice.reducer;