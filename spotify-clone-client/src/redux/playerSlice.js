import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios"; // Ensure axiosInstance is correctly imported

export const fetchSongById = createAsyncThunk(
  "songs/fetchSongById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/songs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching song by id"
      );
    }
  }
);

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: {},
    queue: [],
    repeatingQueue:[],
    isPlaying: false,
    isPlayer: false,
    currentIndex: -1,
    loading: false,
    error: null,
  },
  reducers: {
    setPlayerState: (state, action) => {
      const { queue, currentSong, currentIndex, isPlaying } = action.payload;
      state.queue = queue || []; 
      state.currentSong = currentSong || {};
      state.currentIndex = currentIndex ?? -1;
      state.isPlaying = isPlaying;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    setTogglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlayNextSong: (state, action) => {
      if (state.queue.length === 0) return;
      // if (action.payload === 0) return state.currentIndex = 0;

      const nextIndex = (state.currentIndex + 1) % state.queue.length;
      state.currentIndex = nextIndex;
      state.currentSong = state.queue[nextIndex];
      state.isPlaying = true;
    },

    setPlayPreviousSong: (state) => {
      if (state.queue.length === 0) return;

      const prevIndex =
        state.currentIndex === 0
          ? state.queue.length - 1
          : state.currentIndex - 1;
      state.currentIndex = prevIndex;
      state.currentSong = state.queue[prevIndex];
      state.isPlaying = true;
    },
    setRepeatSong: (state, action) => {
    
        if (state.repeatingQueue.length === 0) {
            
            state.repeatingQueue = action.payload;
            state.currentSong = state.repeatingQueue[0];
        } else {
            state.repeatingQueue = [];
            state.currentSong = state.queue[state.currentIndex+1];
        }
    },
    setPlayerVisibility: (state, action) => {
      state.isPlayer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongById.fulfilled, (state, action) => {
        state.currentSong = action.payload;
        state.loading = false;
        console.log("Fetched song:", action.payload);
      })

      .addCase(fetchSongById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setPlayerState,
  setCurrentSong,
  setPlayNextSong,
  setTogglePlay,
  setPlayPreviousSong,
  setPlayerVisibility,
  setRepeatSong,
} = playerSlice.actions;

export default playerSlice.reducer;
