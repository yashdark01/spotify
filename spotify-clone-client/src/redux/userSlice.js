import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/user');
        // console.log("Fetched Users: ", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Error fetching users");
      }
    }
  );

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload || [];
                // console.log("User data in fulfilled: ", state.users);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;