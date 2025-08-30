import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AdvertFilters from "../AdvertFilters";
import authReducer from "../../store/slices/authSlice";
import advertsReducer from "../../store/slices/advertsSlice";
import tagsReducer from "../../store/slices/tagsSlice";

const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      adverts: advertsReducer,
      tags: tagsReducer,
    },
    preloadedState: {
      tags: {
        items: ["mobile", "lifestyle", "motor", "work", "laptop"],
        status: "succeeded" as const,
        error: null,
      },
    },
  });
};

describe("AdvertFilters Component", () => {
  it("should match snapshot", () => {
    const store = createTestStore();

    const { container } = render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render all filter options", () => {
    const store = createTestStore();

    const { getByText } = render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    expect(getByText("Tags")).toBeInTheDocument();
    expect(getByText("Type")).toBeInTheDocument();
    expect(getByText("Clear")).toBeInTheDocument();

    expect(getByText("mobile")).toBeInTheDocument();
    expect(getByText("lifestyle")).toBeInTheDocument();
    expect(getByText("motor")).toBeInTheDocument();

    expect(getByText("All")).toBeInTheDocument();
    expect(getByText("Sale")).toBeInTheDocument();
    expect(getByText("Buy")).toBeInTheDocument();
  });
});
