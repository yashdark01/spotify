import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './playlistSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import playerReducer from './playerSlice';


const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
    users: userReducer,
    auth: authReducer,
    player: playerReducer

  }
});

export default store;

