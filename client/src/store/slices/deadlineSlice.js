import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const deadlineSlice = createSlice({
  name: "deadline",
  initialState: {
    deadlines: [],
    nearby: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default deadlineSlice.reducer;