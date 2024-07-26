
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const registerUser = createAsyncThunk("content/registerUser", async (userData) => {
//     try {
//         const response = await fetch("https://freight-6.onrender.com/api/registerformdata", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userData),
//         });
//         if (!response.ok) {
//             const errorData = await response.json(); // Attempt to parse error response
//             console.error("Server error:", errorData);
//             throw new Error("Server error: " + JSON.stringify(errorData));
//         }
//         const data = await response.json();
//         console.log("User registered successfully with redux =", data);
//         return data;
//     } catch (error) {
//         console.error("Failed to register user: ", error);
//         throw error;
//     }
// });


// const contentSlice = createSlice({
//     name: "register",
//     initialState: {
//         isLoading: false,
//         isSuccess: false,
//         isError: false,
//         contents: {},
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.contents = action.payload;
//             })
//             .addCase(registerUser.rejected, (state) => {
//                 state.isLoading = false;
//                 state.isError = true;
//             });
//     },
// });

// export default contentSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk("content/registerUser", async (userData) => {
    try {
        const response = await fetch(`http://192.168.0.192:3000/api/signup/${phoneNumber}`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json(); // Attempt to parse error response
            console.error("Server error:", errorData);
            throw new Error("Server error: " + JSON.stringify(errorData));
        }
        const data = await response.json();
        console.log("User registered successfully with redux =", data);
        return data;
    } catch (error) {
        console.error("Failed to register user: ", error);
        throw error;
    }
});


const contentSlice = createSlice({
    name: "register",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        contents: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.contents = action.payload;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default contentSlice.reducer;