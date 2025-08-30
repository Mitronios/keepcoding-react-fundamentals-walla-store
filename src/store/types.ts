import type { RootState, AppDispatch } from "./index";

export type AppState = RootState;
export type AppDispatchType = AppDispatch;

export interface AsyncState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface FiltersState {
  name?: string;
  sale?: boolean;
  price?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
}
