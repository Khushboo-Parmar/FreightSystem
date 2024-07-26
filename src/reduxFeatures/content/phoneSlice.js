
import { createSlice } from "@reduxjs/toolkit";

const phoneSlice = createSlice({
  name: 'phone',
  initialState: {
    phoneNumber: '',
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setPhoneNumber } = phoneSlice.actions;

export default phoneSlice.reducer;
