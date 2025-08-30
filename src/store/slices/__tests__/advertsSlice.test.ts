import { describe, it, expect, beforeEach } from "vitest";
import advertsReducer, {
  setFilters,
  clearFilters,
  setPage,
} from "../advertsSlice";
import type { AdvertsState } from "../advertsSlice";

describe("Adverts Slice - Reducer", () => {
  let initialState: AdvertsState;

  beforeEach(() => {
    initialState = {
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
  });

  describe("setFilters", () => {
    it("should set filters and reset page to 1", () => {
      const filters = { name: "iPhone", sale: true, tags: ["mobile"] };
      const action = setFilters(filters);
      const newState = advertsReducer(initialState, action);

      expect(newState.filters).toEqual(filters);
      expect(newState.pagination.page).toBe(1);
    });

    it("should update existing filters", () => {
      const stateWithFilters: AdvertsState = {
        ...initialState,
        filters: { name: "iPhone" },
      };

      const newFilters = { name: "MacBook", sale: false };
      const action = setFilters(newFilters);
      const newState = advertsReducer(stateWithFilters, action);

      expect(newState.filters).toEqual(newFilters);
      expect(newState.pagination.page).toBe(1);
    });
  });

  describe("clearFilters", () => {
    it("should clear all filters and reset page to 1", () => {
      const stateWithFilters: AdvertsState = {
        ...initialState,
        filters: { name: "iPhone", sale: true, tags: ["mobile"] },
        pagination: { ...initialState.pagination, page: 3 },
      };

      const action = clearFilters();
      const newState = advertsReducer(stateWithFilters, action);

      expect(newState.filters).toEqual({});
      expect(newState.pagination.page).toBe(1);
    });
  });

  describe("setPage", () => {
    it("should update the current page", () => {
      const newPage = 3;
      const action = setPage(newPage);
      const newState = advertsReducer(initialState, action);

      expect(newState.pagination.page).toBe(newPage);
    });

    it("should not affect other pagination properties", () => {
      const stateWithPagination: AdvertsState = {
        ...initialState,
        pagination: {
          page: 1,
          limit: 20,
          total: 100,
          hasMore: true,
        },
      };

      const newPage = 5;
      const action = setPage(newPage);
      const newState = advertsReducer(stateWithPagination, action);

      expect(newState.pagination.page).toBe(newPage);
      expect(newState.pagination.limit).toBe(20);
      expect(newState.pagination.total).toBe(100);
      expect(newState.pagination.hasMore).toBe(true);
    });
  });

  describe("clearSelectedAdvert", () => {
    it("should clear the selected advert", () => {
      const stateWithSelected: AdvertsState = {
        ...initialState,
        selectedAdvert: {
          id: "1",
          createdAt: "2024-01-01T00:00:00Z",
          name: "Test Advert",
          sale: true,
          price: 100,
          tags: ["test"],
          photo: null,
        },
      };

      const action = { type: "adverts/clearSelectedAdvert" };
      const newState = advertsReducer(stateWithSelected, action);

      expect(newState.selectedAdvert).toBeNull();
    });
  });

  describe("clearError", () => {
    it("should clear the error message", () => {
      const stateWithError: AdvertsState = {
        ...initialState,
        error: "Some error occurred",
      };

      const action = { type: "adverts/clearError" };
      const newState = advertsReducer(stateWithError, action);

      expect(newState.error).toBeNull();
    });
  });
});
