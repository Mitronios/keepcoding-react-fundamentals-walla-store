import { describe, it, expect } from "vitest";
import {
  selectFilteredAdverts,
  selectSaleAdverts,
  selectBuyAdverts,
  selectFilteredAdvertsCount,
} from "../advertsSelectors";
import type { RootState } from "../../index";

describe("Adverts Selectors", () => {
  const mockState: RootState = {
    auth: {
      token: null,
      isAuthenticated: false,
      user: null,
      status: "idle",
      error: null,
    },
    adverts: {
      items: [
        {
          id: "1",
          createdAt: "2024-01-01T00:00:00Z",
          name: "iPhone 15 Pro",
          sale: true,
          price: 999,
          tags: ["mobile", "lifestyle"],
          photo: null,
        },
        {
          id: "2",
          createdAt: "2024-01-01T00:00:00Z",
          name: "MacBook Air M2",
          sale: false,
          price: 1199,
          tags: ["laptop", "work"],
          photo: null,
        },
        {
          id: "3",
          createdAt: "2024-01-01T00:00:00Z",
          name: "Samsung Galaxy S24",
          sale: true,
          price: 799,
          tags: ["mobile", "android"],
          photo: null,
        },
      ],
      selectedAdvert: null,
      filters: {},
      pagination: {
        page: 1,
        limit: 10,
        total: 3,
        hasMore: false,
      },
      status: "succeeded",
      error: null,
      createStatus: "idle",
      deleteStatus: "idle",
    },
    tags: {
      items: ["mobile", "lifestyle", "laptop", "work", "android"],
      status: "succeeded",
      error: null,
    },
  };

  describe("selectFilteredAdverts", () => {
    it("should return all adverts when no filters are applied", () => {
      const result = selectFilteredAdverts(mockState);
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe("iPhone 15 Pro");
      expect(result[1].name).toBe("MacBook Air M2");
      expect(result[2].name).toBe("Samsung Galaxy S24");
    });

    it("should filter by name", () => {
      const stateWithNameFilter: RootState = {
        ...mockState,
        adverts: {
          ...mockState.adverts,
          filters: { name: "iPhone" },
        },
      };

      const result = selectFilteredAdverts(stateWithNameFilter);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("iPhone 15 Pro");
    });

    it("should filter by sale type", () => {
      const stateWithSaleFilter: RootState = {
        ...mockState,
        adverts: {
          ...mockState.adverts,
          filters: { sale: true },
        },
      };

      const result = selectFilteredAdverts(stateWithSaleFilter);
      expect(result).toHaveLength(2);
      expect(result.every((advert) => advert.sale)).toBe(true);
    });

    it("should filter by tags", () => {
      const stateWithTagsFilter: RootState = {
        ...mockState,
        adverts: {
          ...mockState.adverts,
          filters: { tags: ["mobile"] },
        },
      };

      const result = selectFilteredAdverts(stateWithTagsFilter);
      expect(result).toHaveLength(2);
      expect(result.every((advert) => advert.tags.includes("mobile"))).toBe(
        true
      );
    });

    it("should combine multiple filters", () => {
      const stateWithMultipleFilters: RootState = {
        ...mockState,
        adverts: {
          ...mockState.adverts,
          filters: {
            name: "iPhone",
            sale: true,
            tags: ["mobile"],
          },
        },
      };

      const result = selectFilteredAdverts(stateWithMultipleFilters);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("iPhone 15 Pro");
    });
  });

  describe("selectSaleAdverts", () => {
    it("should return only sale adverts", () => {
      const result = selectSaleAdverts(mockState);
      expect(result).toHaveLength(2);
      expect(result.every((advert) => advert.sale)).toBe(true);
      expect(result.map((advert) => advert.name)).toEqual([
        "iPhone 15 Pro",
        "Samsung Galaxy S24",
      ]);
    });
  });

  describe("selectBuyAdverts", () => {
    it("should return only buy adverts", () => {
      const result = selectBuyAdverts(mockState);
      expect(result).toHaveLength(1);
      expect(result.every((advert) => !advert.sale)).toBe(true);
      expect(result[0].name).toBe("MacBook Air M2");
    });
  });

  describe("selectFilteredAdvertsCount", () => {
    it("should return correct count for unfiltered adverts", () => {
      const result = selectFilteredAdvertsCount(mockState);
      expect(result).toBe(3);
    });

    it("should return correct count for filtered adverts", () => {
      const stateWithFilter: RootState = {
        ...mockState,
        adverts: {
          ...mockState.adverts,
          filters: { sale: true },
        },
      };

      const result = selectFilteredAdvertsCount(stateWithFilter);
      expect(result).toBe(2);
    });
  });
});
