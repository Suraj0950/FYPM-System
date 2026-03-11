import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const requestSlice = createSlice({
  name: "request",
  initialState: {
    list: [],
    selected: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default requestSlice.reducer;