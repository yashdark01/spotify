import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

export const fetchAlbums = createAsyncThunk(
  "user/fetchAlbums",
  async (_, { rejectWithValue }) => { // ✅ No need for userId
    try {
      const response = await axiosInstance.get("/albums");
      console.log("Albums: ", response.data);
      return response.data; // ✅ Ensure it always returns an array
    } catch (error) {
      console.log(error.response?.data || "Error fetching albums");
      return rejectWithValue(error.response?.data || "Error fetching albums");
    }
  }
);

export const fetchAlbumById = createAsyncThunk(
  "user/fetchAlbumById",
  async (id, { rejectWithValue }) => {
    console.log("Album id: ", id);
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      console.log("Album: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching album by id");
      return rejectWithValue(error.response?.data || "Error fetching album by id");
    }
  }
);

export const fetchSongs = createAsyncThunk(
  "user/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs");
      console.log("Songs: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching songs");
      return rejectWithValue(error.response?.data || "Error fetching songs");
    }
  }
);

export const fetchSongById = createAsyncThunk(
  "user/fetchSongById",
  async (id, { rejectWithValue }) => {
    console.log("Song id: ", id);
    try {
      const response = await axiosInstance.get(`/songs/${id}`);
      console.log("Song: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching song by id");
      return rejectWithValue(error.response?.data || "Error fetching song by id");
    }
  }
);



const initialState = {
  albums: [],
  album: {},
  songs:[],
  song:{}, 
  loading: false,
  error: null,
};


const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.loading = true;
      console.log("Pending");
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload || []; // ✅ Ensure action.payload is always an array
      state.loading = false;
      console.log("albums-fullfilled");
    });
    builder.addCase(fetchAlbums.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("rejected");
    });
    builder.addCase(fetchAlbumById.pending, (state) => {
      state.loading = true;
      console.log("Pending");
    });
    builder.addCase(fetchAlbumById.fulfilled, (state, action) => {
      state.album = action.payload || {};
      state.loading = false;
      console.log("Album - fullfilled");
    });
    builder.addCase(fetchAlbumById.rejected, (state) => {
      state.loading = false;
      state.error = action.payload;
      console.log("rejected");
    })
    builder.addCase(fetchSongs.pending, (state) => {
      state.loading = true;
      console.log("Pending");
    });

    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.songs = action.payload || []; // ✅ Ensure action.payload is always an array
      state.loading = false;
      console.log("songs-fullfilled");
    });

    builder.addCase(fetchSongs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("rejected");
    });
    builder.addCase(fetchSongById.pending, (state) => {
      state.loading = true;
      console.log("Pending");
    });
    builder.addCase(fetchSongById.fulfilled, (state, action) => {
      state.song = action.payload || {};
      state.loading = false;
      console.log("Song - fullfilled");
    });
    builder.addCase(fetchSongById.rejected, (state) => {
      state.loading = false;
      state.error = action.payload;
      console.log("rejected");
    });

  },
});

export default albumsSlice.reducer;