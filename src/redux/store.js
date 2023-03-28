import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./states/searchSlice";
import homeSlice from "./states/homeSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    home: homeSlice,
  },
});
