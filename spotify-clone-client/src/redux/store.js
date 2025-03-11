import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './playlistSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    albums: albumsReducer,
    users: userReducer,
    auth: authReducer
  }
});

export default store;

