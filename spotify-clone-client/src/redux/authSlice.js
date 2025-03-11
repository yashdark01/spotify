import { axiosInstance } from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAdminStatus = createAsyncThunk(
    'usersjd/checkAdminStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/check');
            console.log("response", response.data);  // Fix: Directly use response.data
            console.log("data.admin", response.data.admin);
            return response.data.admin;
        } catch (error) {
            console.error("Admin check error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const initialState = {
    isAdmin: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAdminStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAdminStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdmin = action.payload;
            })
            .addCase(checkAdminStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;