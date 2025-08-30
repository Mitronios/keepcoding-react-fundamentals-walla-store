import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AsyncState, PaginationState, FiltersState } from "../types";
import type { Advert, AdvertCreatePayload } from "../../interfaces/advert";
import { getAdverts } from "../../services/advertServices";
import {
  getAdvertById,
  deleteAdvertById,
} from "../../services/advertDetailService";
import { advertCreateService } from "../../services/advertCreateService";

export interface AdvertsState extends AsyncState {
  items: Advert[];
  selectedAdvert: Advert | null;
  filters: FiltersState;
  pagination: PaginationState;
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AdvertsState = {
  items: [],
  selectedAdvert: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: false,
  },
  status: "idle",
  error: null,
  createStatus: "idle",
  deleteStatus: "idle",
};

export const fetchAdverts = createAsyncThunk(
  "adverts/fetchAdverts",
  async (filters: FiltersState | undefined, { rejectWithValue }) => {
    try {
      const serviceFilters = filters
        ? {
            ...filters,
            tags: filters.tags ? filters.tags.join(",") : undefined,
          }
        : undefined;

      const adverts = await getAdverts(serviceFilters);
      return {
        adverts,
        total: adverts.length,
        page: 1,
        limit: 10,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch adverts"
      );
    }
  }
);

export const fetchAdvertDetail = createAsyncThunk(
  "adverts/fetchAdvertDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const advert = await getAdvertById(id);
      return advert;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch advert detail"
      );
    }
  }
);

export const createAdvert = createAsyncThunk(
  "adverts/createAdvert",
  async (advertData: AdvertCreatePayload, { rejectWithValue }) => {
    try {
      const newAdvert = await advertCreateService(advertData);
      return newAdvert;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create advert"
      );
    }
  }
);

export const deleteAdvert = createAsyncThunk(
  "adverts/deleteAdvert",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteAdvertById(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete advert"
      );
    }
  }
);

const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
    },
    clearDeleteStatus: (state) => {
      state.deleteStatus = "idle";
    },
    setFilters: (state, action: PayloadAction<FiltersState>) => {
      state.filters = action.payload;
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearSelectedAdvert: (state) => {
      state.selectedAdvert = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdverts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.adverts;
        state.pagination.total = action.payload.total;
        state.pagination.hasMore =
          action.payload.adverts.length === action.payload.limit;
        state.error = null;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchAdvertDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdvertDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedAdvert = action.payload;
        state.error = null;
      })
      .addCase(fetchAdvertDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    builder
      .addCase(createAdvert.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createAdvert.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
        state.pagination.total += 1;
        state.error = null;
      })
      .addCase(createAdvert.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteAdvert.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.items = state.items.filter(
          (advert) => advert.id !== action.payload
        );
        state.pagination.total = Math.max(0, state.pagination.total - 1);
        if (state.selectedAdvert?.id === action.payload) {
          state.selectedAdvert = null;
        }
        state.error = null;
      })
      .addCase(deleteAdvert.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearCreateStatus,
  clearDeleteStatus,
  setFilters,
  clearFilters,
  setPage,
  clearSelectedAdvert,
} = advertsSlice.actions;

export default advertsSlice.reducer;
