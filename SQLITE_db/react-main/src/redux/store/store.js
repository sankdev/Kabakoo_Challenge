import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import users from "../slices/userSlice"
import testUserSlice from "../slices/testUserSlice";
import usersSlice from "../slices/etudiantSlice";
import  getUserSlice from "../slices/getUserSlice"




const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducers = combineReducers({
  user:users,
  list:getUserSlice,
  test: testUserSlice,
 etud: usersSlice
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);