
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const complainUser = createAsyncThunk("content/complainUser", async (userData) => {
    try {
        const response = await fetch("http://192.168.0.192:3000/api/complainFormData", {
        // const response = await fetch("https://freight-6.onrender.com/api/complainFormData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("User complain successfully with redux =", data);
        return data;
    } catch (error) {
        console.error("Failed to complain: ", error);
        throw error;
    }
});

const complainSlice = createSlice({
    name: "complain",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        contents: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(complainUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(complainUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.contents = action.payload;
            })
            .addCase(complainUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default complainSlice.reducer;
