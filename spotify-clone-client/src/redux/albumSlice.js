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

const initialState = {
  albums: [], // ✅ Always an empty array initially
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
      console.log("fullfilled");
    });
    builder.addCase(fetchAlbums.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("rejected");
    });
  },
});

export default albumsSlice.reducer;