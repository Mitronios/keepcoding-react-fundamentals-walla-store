import type { RootState } from "../index";

export const selectTags = (state: RootState) => state.tags;
export const selectTagsItems = (state: RootState) => state.tags.items;
export const selectTagsStatus = (state: RootState) => state.tags.status;
export const selectTagsError = (state: RootState) => state.tags.error;

export const selectIsTagsLoading = (state: RootState) =>
  state.tags.status === "loading";
export const selectIsTagsSucceeded = (state: RootState) =>
  state.tags.status === "succeeded";
export const selectIsTagsFailed = (state: RootState) =>
  state.tags.status === "failed";

export const selectUniqueTags = (state: RootState) =>
  Array.from(new Set(state.tags.items));

export const selectSortedTags = (state: RootState) =>
  [...state.tags.items].sort();

export const selectTagsBySearch = (state: RootState, searchText: string) =>
  state.tags.items.filter((tag) =>
    tag.toLowerCase().includes(searchText.toLowerCase())
  );
