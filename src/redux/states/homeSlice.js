import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPhotos } from "./../../services/flickr";

const initialState = {
  page: 1,
  pageSize: 12,
  pages: 1,
  status: "idle",
  objects: [],
  error_details: null,
};

export const getPhotosAsync = createAsyncThunk(
  "home/getPhotos",
  async ({ page, pageSize }) => {
    const response = await getPhotos({ page, pageSize });
    return response;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setError: (state) => {
      state.status = "error";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosAsync.pending, (state, action) => {
        state.status = "loading";
        state.page = action.meta.arg.page;
        state.pageSize = action.meta.arg.pageSize;
      })
      .addCase(getPhotosAsync.fulfilled, (state, action) => {
        if (
          state.status === "loading" &&
          state.page === action.meta.arg.page &&
          state.pageSize === action.meta.arg.pageSize
        ) {
          if ("error" in action.payload) {
            state.status = "error";
            state.error_details = action.payload.error;
          } else {
            state.status = "finished";
            state.objects = action.payload.result.data;
            state.pages = action.payload.result.pages;
          }
        }
      });
  },
});

export const homeState = (state) => state.home;

export default homeSlice.reducer;
