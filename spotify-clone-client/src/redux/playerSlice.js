import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance } from "@/lib/axios"; // Ensure axiosInstance is correctly imported

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

const playerSlice = createSlice({
    name: "player",
    initialState: {
      currentSong: {},
      queue: [], // ✅ Ensure queue is initialized as an array
      isPlaying: false,
      currentIndex: -1,
      loading: false,
      error: null,
    },
  reducers: {
    setPlayerState: (state, action) => {
        const { queue, currentSong, currentIndex, isPlaying } = action.payload;
        state.queue = queue || []; // ✅ Prevent undefined by defaulting to an empty array
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
    setPlayNextSong: (state) => {
      if (state.queue.length === 0) return;
      const nextIndex = state.currentIndex + 1;
      if (nextIndex < state.queue.length) {
        state.currentIndex = nextIndex;
        state.currentSong = state.queue[nextIndex];
        state.isPlaying = true;
      }
    },
    setPlayPreviousSong: (state) => {
      if (state.queue.length === 0) return;
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentIndex = prevIndex;
        state.currentSong = state.queue[prevIndex];
        state.isPlaying = true;
      }
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

export const { setPlayerState, setCurrentSong, setPlayNextSong, setTogglePlay, setPlayPreviousSong } = playerSlice.actions;

export default playerSlice.reducer;