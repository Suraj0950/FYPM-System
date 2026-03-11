import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    selected: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default projectSlice.reducer;