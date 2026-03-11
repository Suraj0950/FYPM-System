import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    assignedStudents: [],
    files: [],
    pendingRequests: [],
    dashboardStats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default teacherSlice.reducer;