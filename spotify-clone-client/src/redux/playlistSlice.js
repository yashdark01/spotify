import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/albums");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch albums");
    }
  }
);

export const fetchAlbumById = createAsyncThunk(
  "albums/fetchAlbumById", 
  async (id, { rejectWithValue }) => {
    console.log("fetchAlbumById", id);
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching album by id");
    }
  }
);

export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching songs");
    }
  }
);

export const fetchSongById = createAsyncThunk(
  "songs/fetchSongById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/songs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching song by id");
    }
  }
);

export const fetchFeaturedSongs = createAsyncThunk(
  "songs/fetchFeaturedSongs",
  async (_, { rejectWithValue }) => {
    console.log("fetchFeaturedSongs");
    try {
      const response = await axiosInstance.get("/songs/featured");
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error :   : : ", error)
      return rejectWithValue(error.response?.data || "Error fetching featured songs");
    }
  }
);

export const fetchMadeForYouSongs = createAsyncThunk(
  "songs/fetchMadeForYouSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching made for you songs");
    }
  }
);


export const fetchTrendingSongs = createAsyncThunk(
  "songs/fetchTrendingSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/trending");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching trending songs");
    }
  }
);


const initialState = {
  albums: [],
  album: {},
  songs: [],
  song: {},
  featuredSong: [],
  madeForYouSongs: [],
  trendingSongs: [],
  albumsLoading: false,
  albumLoading: false,
  songsLoading: false,
  songLoading: false,
  featuredSongLoading: false,
  madeForYouSongsLoading: false,
  trendingSongsLoading: false,
  loading: false,
  error: null,
};


const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.albumsLoading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload || [];
        state.albumsLoading = false;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.albumsLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAlbumById.pending, (state) => {
        state.albumLoading = true;
        state.error = null;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.album = action.payload || {};
        state.albumLoading = false;
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        state.albumLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSongs.pending, (state) => {
        state.songsLoading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songs = action.payload || [];
        state.songsLoading = false;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.songsLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSongById.pending, (state) => {
        state.songLoading = true;
        state.error = null;
      })
      .addCase(fetchSongById.fulfilled, (state, action) => {
        state.song = action.payload || {};
        state.songLoading = false;
      })
      .addCase(fetchSongById.rejected, (state, action) => {
        state.songLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedSongs.pending, (state) => {
        state.featuredSongLoading = true;
        state.error = null;
        console.log("featured pending");
      })
      .addCase(fetchFeaturedSongs.fulfilled, (state, action) => {
        state.featuredSong = action.payload || [];
        state.featuredSongLoading = false;
        console.log("featured fulfilled");
      })
      .addCase(fetchFeaturedSongs.rejected, (state, action) => {
        state.featuredSongLoading = false;
        state.error = action.payload;
        console.log("featured rejected");
      })
      .addCase(fetchMadeForYouSongs.pending, (state) => {
        state.madeForYouSongsLoading = true;
        state.error = null;
      })
      .addCase(fetchMadeForYouSongs.fulfilled, (state, action) => {
        state.madeForYouSongs = action.payload || [];
        state.madeForYouSongsLoading = false;
      })
      .addCase(fetchMadeForYouSongs.rejected, (state, action) => {
        state.madeForYouSongsLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrendingSongs.pending, (state) => {
        state.trendingSongsLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingSongs.fulfilled, (state, action) => {
        state.trendingSongs = action.payload || [];
        state.trendingSongsLoading = false;
      })
      .addCase(fetchTrendingSongs.rejected, (state, action) => {
        state.trendingSongsLoading = false;
        state.error = action.payload;
      });
  },
});

export default playlistsSlice.reducer;
