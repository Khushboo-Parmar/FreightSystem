import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token:null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const { setUser, clearUser, updateUser} = userSlice.actions;
export default userSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: null,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         clearUser: (state) => {
//             state.user = null;
//         },
//         updateUser: (state, action) => {
//             state.user = action.payload;
//         },
//     },
// });

// export const { setUser, clearUser, updateUser} = userSlice.actions;
// export default userSlice.reducer;
