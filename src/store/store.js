import { configureStore } from "@reduxjs/toolkit";
import designersReducer from "./slices/designersSlice";
import objectsReducer from "./slices/objectsSlice";

export const store = configureStore({
  reducer: {
    designers: designersReducer,
    objects: objectsReducer,
  },
});
