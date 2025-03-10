import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './albumSlice';

const store = configureStore({
  reducer: {
    albums: albumsReducer
  }
});

export default store;

