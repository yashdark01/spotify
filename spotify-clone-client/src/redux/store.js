import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './playlistSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
    users: userReducer,
    auth: authReducer
  }
});

export default store;

