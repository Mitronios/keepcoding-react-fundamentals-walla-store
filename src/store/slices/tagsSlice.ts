import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AsyncState } from "../types";
import { getAvailableTags } from "../../services/advertServices";

export interface TagsState extends AsyncState {
  items: string[];
}

const initialState: TagsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const tags = await getAvailableTags();
      return tags;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch tags"
      );
    }
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = tagsSlice.actions;
export default tagsSlice.reducer;
