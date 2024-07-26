
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchComplaints = createAsyncThunk('complaints/fetchComplaints', async (createdBy) => {
  const response = await fetch(`http://192.168.0.192:3000/api/complaints?userId=${createdBy}`);
  // const response = await fetch(`https://freight-6.onrender.com/api/complaints?userId=${createdBy}`);
  const data = await response.json();
console.log('data response in complaints slice ')
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch complaints');
  }

  return data.complaints;
});

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState: {
    complaints: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default complaintsSlice.reducer;
