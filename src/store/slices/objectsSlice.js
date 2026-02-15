import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getObjects, addObject, updateObject } from "../../api"; 

// Fetch all objects
export const fetchObjects = createAsyncThunk(
  "objects/fetchObjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getObjects();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new object
export const createObject = createAsyncThunk(
  "objects/createObject",
  async (objectData, { rejectWithValue, getState }) => {
    try {
      // Designer validation
      const state = getState();
      const designerExists = state.designers.list.some(
        d => d.id === objectData.designerId || d.id === objectData.designer?.id
      );

      if (!designerExists) throw new Error("Selected designer does not exist");

      // Create object
      const newObject = {
        ...objectData,
        position: objectData.position || [0, 0, 0],
      };

      const response = await addObject(newObject); 
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update existing object
export const updateObjectThunk = createAsyncThunk(
  "objects/updateObject",
  async (objectData, { rejectWithValue, getState }) => {
    try {
      if (objectData.designerId || objectData.designer) {
        const state = getState();
        const designerId = objectData.designerId || objectData.designer?.id;
        const designerExists = state.designers.list.some(d => d.id === designerId);
        if (!designerExists) throw new Error("Selected designer does not exist");
      }

      const updatedObject = { ...objectData };
      const response = await updateObject(updatedObject); 
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const objectsSlice = createSlice({
  name: "objects",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    selectedObject: null,
    lastUpdated: null,
  },
  reducers: {
    setSelectedObject: (state, action) => { state.selectedObject = action.payload; },
    clearSelectedObject: (state) => { state.selectedObject = null; },
    clearObjects: (state) => {
      state.list = [];
      state.status = "idle";
      state.error = null;
      state.selectedObject = null;
    },
    updateObjectPosition: (state, action) => {
      const { id, position } = action.payload;
      const object = state.list.find(obj => obj.id === id);
      if (object) {
        object.position = position;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Objects
      .addCase(fetchObjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchObjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.map(obj => ({
          ...obj,
          position: obj.position || [0, 0, 0],
        }));
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchObjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch objects";
      })

      // Create Object
      .addCase(createObject.fulfilled, (state, action) => {
        state.list.push({
          ...action.payload,
          position: action.payload.position || [0, 0, 0],
        });
        state.lastUpdated = new Date().toISOString();
      })

      // Update Object
      .addCase(updateObjectThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(obj => obj.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = {
            ...action.payload,
            position: action.payload.position || [0, 0, 0],
          };
        }
        state.lastUpdated = new Date().toISOString();
      });
  },
});

// Actions & selectors
export const {
  setSelectedObject,
  clearSelectedObject,
  clearObjects,
  updateObjectPosition,
} = objectsSlice.actions;

export const selectAllObjects = (state) => state.objects.list;
export const selectObjectsByDesigner = (state, designerId) =>
  state.objects.list.filter(obj => obj.designerId === designerId || obj.designer?.id === designerId);

export default objectsSlice.reducer;
