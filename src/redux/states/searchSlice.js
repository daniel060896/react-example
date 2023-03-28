import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchPhotos } from "./../../services/flickr";

const initialState = {
  page: 1,
  pageSize: 12,
  pages: 1,
  tag: "",
  status: "idle",
  objects: [],
  error_details: null,
};

export const searchPhotosAsync = createAsyncThunk(
  "search/searchPhotos",
  async ({ tag, page, pageSize }) => {
    const response = await searchPhotos({ tag, page, pageSize });
    return response;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setError: (state) => {
      state.status = "error";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPhotosAsync.pending, (state, action) => {
        state.status = "loading";
        state.page = action.meta.arg.page;
        state.pageSize = action.meta.arg.pageSize;
        state.tag = action.meta.arg.tag;
      })
      .addCase(searchPhotosAsync.fulfilled, (state, action) => {
        if (
          state.status === "loading" &&
          state.page === action.meta.arg.page &&
          state.pageSize === action.meta.arg.pageSize &&
          state.tag === action.meta.arg.tag
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
export const searchState = (state) => state.search;
export const searchStateTag = (state) => state.search.tag;
export default searchSlice.reducer;
