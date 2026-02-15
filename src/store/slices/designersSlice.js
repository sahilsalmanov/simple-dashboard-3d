import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDesigners, addDesigner } from "../../api";

// Fetch designers
export const fetchDesigners = createAsyncThunk(
  "designers/fetchDesigners", 
  async () => {
    const response = await getDesigners();
    return response;
  }
);

// Create designer
export const createDesigner = createAsyncThunk(
  "designers/createDesigner",
  async (designer) => {
    const response = await addDesigner(designer);
    return response;
  }
);

const designersSlice = createSlice({
  name: "designers",
  initialState: {
    list: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDesigners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchDesigners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDesigner.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default designersSlice.reducer;
