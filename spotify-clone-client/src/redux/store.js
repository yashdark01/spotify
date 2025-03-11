import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './playlistSlice';

const store = configureStore({
  reducer: {
    albums: albumsReducer
  }
});

export default store;

