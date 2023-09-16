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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action creator asynchrone pour récupérer les utilisateurs
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/app/all-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("ReduxUser",data)
      return data.allUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action creator asynchrone pour mettre à jour un utilisateur
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, token, nom, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/app/updateuser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nom, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } 
        return rejectWithValue(data.message);
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// pour modifier le role d'un user 
export const updateRoleUser = createAsyncThunk(
  'users/updateRoleUser',
  async ({ id, role ,token}, { rejectWithValue }) => {
   
    try {
      const response = await fetch(`http://localhost:3001/app/updaterole/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Erreur lors de la mise à jour de l\'utilisateur');
    }
  }
);
const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
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
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.users=[];
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload); // Faites quelque chose avec les données mises à jour
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
       })
       .addCase(updateRoleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoleUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(updateRoleUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
      
  },
});

export const { setLoading, setError, clearError } = usersSlice.actions;

export const selectUsers = (state) => state.etud.users;
export const selectLoading = (state) => state.etud.loading;
export const selectError = (state) => state.etud.error;

export default usersSlice.reducer;

