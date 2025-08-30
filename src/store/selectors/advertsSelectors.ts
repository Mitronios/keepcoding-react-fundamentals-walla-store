import type { RootState } from "../index";

export const selectAdverts = (state: RootState) => state.adverts;
export const selectAdvertsItems = (state: RootState) => state.adverts.items;
export const selectSelectedAdvert = (state: RootState) =>
  state.adverts.selectedAdvert;
export const selectAdvertsFilters = (state: RootState) => state.adverts.filters;
export const selectAdvertsPagination = (state: RootState) =>
  state.adverts.pagination;
export const selectAdvertsStatus = (state: RootState) => state.adverts.status;
export const selectAdvertsError = (state: RootState) => state.adverts.error;
export const selectCreateStatus = (state: RootState) =>
  state.adverts.createStatus;
export const selectDeleteStatus = (state: RootState) =>
  state.adverts.deleteStatus;

export const selectIsAdvertsLoading = (state: RootState) =>
  state.adverts.status === "loading";
export const selectIsAdvertsSucceeded = (state: RootState) =>
  state.adverts.status === "succeeded";
export const selectIsAdvertsFailed = (state: RootState) =>
  state.adverts.status === "failed";
export const selectIsCreateLoading = (state: RootState) =>
  state.adverts.createStatus === "loading";
export const selectIsCreateSucceeded = (state: RootState) =>
  state.adverts.createStatus === "succeeded";
export const selectIsCreateFailed = (state: RootState) =>
  state.adverts.createStatus === "failed";
export const selectIsDeleteLoading = (state: RootState) =>
  state.adverts.deleteStatus === "loading";
export const selectIsDeleteSucceeded = (state: RootState) =>
  state.adverts.deleteStatus === "succeeded";
export const selectIsDeleteFailed = (state: RootState) =>
  state.adverts.deleteStatus === "failed";

export const selectFilteredAdverts = (state: RootState) => {
  const { items, filters } = state.adverts;

  if (
    !filters.name &&
    !filters.sale &&
    !filters.price &&
    !filters.tags?.length
  ) {
    return items;
  }

  return items.filter((advert) => {
    if (
      filters.name &&
      !advert.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }

    if (filters.sale !== undefined && advert.sale !== filters.sale) {
      return false;
    }

    if (filters.price) {
      const price = parseFloat(filters.price);
      if (!isNaN(price) && advert.price !== price) {
        return false;
      }
    }

    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) =>
        advert.tags.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });
};

export const selectSaleAdverts = (state: RootState) =>
  state.adverts.items.filter((advert) => advert.sale);

export const selectBuyAdverts = (state: RootState) =>
  state.adverts.items.filter((advert) => !advert.sale);

export const selectFilteredAdvertsCount = (state: RootState) =>
  selectFilteredAdverts(state).length;
