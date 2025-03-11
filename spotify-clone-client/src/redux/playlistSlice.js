import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (_, { getState, rejectWithValue }) => {
    const { albums } = getState().albums;
    if (albums.length > 0) return albums; // Prevent refetching if already loaded

    try {
      const response = await axiosInstance.get("/albums");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch albums");
    }
  }
);

export const fetchAlbumById = createAsyncThunk(
  "user/fetchAlbumById",
  async (id, { rejectWithValue }) => {
    // console.log("Album id: ", id);
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      // console.log("Album: ", response.data);
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
      // console.log("Songs: ", response.data);
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
    // console.log("Song id: ", id);
    try {
      const response = await axiosInstance.get(`/songs/${id}`);
      // console.log("Song: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching song by id");
      return rejectWithValue(error.response?.data || "Error fetching song by id");
    }
  }
);

export const fetchFeaturedSongs = createAsyncThunk(
  "user/fetchFeaturedSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/featured");
      // console.log("Featured Songs: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching featured songs");
      return rejectWithValue(error.response?.data || "Error fetching featured songs");
    }
  }
);

export const fetchMadeForYouSongs = createAsyncThunk(
  "user/fetchMadeForYouSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      // console.log("Made For You Songs: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching made for you songs");
      return rejectWithValue(error.response?.data || "Error fetching made for you songs");
    }
  }
);


export const fetchTrendingSongs = createAsyncThunk(
  "user/fetchTrendingSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/songs/trending");
      // console.log("Trending Songs: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || "Error fetching trending songs");
      return rejectWithValue(error.response?.data || "Error fetching trending songs");
    }
  }
);


const initialState = {
  albums: [],
  album: {},
  songs:[],
  song:{}, 
  featuredSong:[],
  madeForYouSongs:[],
  trendingSongs:[],
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
      // console.log("Pending");
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload || [];
      state.loading = false;
      // console.log("albums-fullfilled");
    });
    builder.addCase(fetchAlbums.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    });
    builder.addCase(fetchAlbumById.pending, (state) => {
      // state.loading = true;
      // console.log("Pending");
    });
    builder.addCase(fetchAlbumById.fulfilled, (state, action) => {
      state.album = action.payload || {};
      // state.loading = false;
      // console.log("Album - fullfilled");
    });
    builder.addCase(fetchAlbumById.rejected, (state) => {
      // state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    })
    builder.addCase(fetchSongs.pending, (state) => {
      state.loading = true;
      // console.log("Pending");
    });

    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.songs = action.payload || [];
      state.loading = false;
      // console.log("songs-fullfilled");
    });

    builder.addCase(fetchSongs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    });
    builder.addCase(fetchSongById.pending, (state) => {
      state.loading = true;
      // console.log("Pending");
    });
    builder.addCase(fetchSongById.fulfilled, (state, action) => {
      state.song = action.payload || {};
      state.loading = false;
      // console.log("Song - fullfilled");
    });
    builder.addCase(fetchSongById.rejected, (state) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    });
    builder.addCase(fetchFeaturedSongs.pending, (state) => {
      state.loading = true;
      // console.log("Pending");
    });
    builder.addCase(fetchFeaturedSongs.fulfilled, (state, action) => {
      state.featuredSong = action.payload || [];
      state.loading = false;
      // console.log("featuredSong-fullfilled");
    });
    builder.addCase(fetchFeaturedSongs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    });
    builder.addCase(fetchMadeForYouSongs.pending, (state) => {
      state.loading = true;
      // console.log("Pending");
    });
    builder.addCase(fetchMadeForYouSongs.fulfilled, (state, action) => {
      state.madeForYouSongs = action.payload || [];
      state.loading = false;
      // console.log("madeForYouSongs-fullfilled");
    });
    builder.addCase(fetchMadeForYouSongs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    });
    builder.addCase(fetchTrendingSongs.pending, (state) => {
      state.loading = true;
      // console.log("Pending");
    });
    builder.addCase(fetchTrendingSongs.fulfilled, (state, action) => {
      state.trendingSongs = action.payload || []; 
      state.loading = false;
      // console.log("trendingSongs-fullfilled");
    });

    builder.addCase(fetchTrendingSongs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log("rejected");
    });
    
  },
});

export default albumsSlice.reducer;