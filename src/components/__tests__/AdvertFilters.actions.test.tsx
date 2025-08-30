import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AdvertFilters from "../AdvertFilters";
import authReducer from "../../store/slices/authSlice";
import advertsReducer from "../../store/slices/advertsSlice";
import tagsReducer from "../../store/slices/tagsSlice";

describe("AdvertFilters Component - Actions", () => {
  let store: ReturnType<typeof createTestStore>;

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

  beforeEach(() => {
    store = createTestStore();
  });

  it("should render filter options correctly", () => {
    render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();

    expect(screen.getByText("mobile")).toBeInTheDocument();
    expect(screen.getByText("lifestyle")).toBeInTheDocument();
    expect(screen.getByText("motor")).toBeInTheDocument();
  });

  it("should change sale filter value", () => {
    render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    const saleSelect = screen.getByLabelText("Type");
    fireEvent.change(saleSelect, { target: { value: "true" } });

    expect(saleSelect).toHaveValue("true");
  });

  it("should toggle tag selection", () => {
    render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    const mobileCheckbox = screen.getByDisplayValue("mobile");
    fireEvent.click(mobileCheckbox);

    expect(mobileCheckbox).toBeChecked();
  });

  it("should reset filters when clear button is clicked", () => {
    render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    const saleSelect = screen.getByLabelText("Type");
    const mobileCheckbox = screen.getByDisplayValue("mobile");

    fireEvent.change(saleSelect, { target: { value: "true" } });
    fireEvent.click(mobileCheckbox);

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    expect(saleSelect).toHaveValue("all");
    expect(mobileCheckbox).not.toBeChecked();
  });

  it("should handle multiple tag selections", () => {
    render(
      <Provider store={store}>
        <AdvertFilters />
      </Provider>
    );

    const mobileCheckbox = screen.getByDisplayValue("mobile");
    const lifestyleCheckbox = screen.getByDisplayValue("lifestyle");

    fireEvent.click(mobileCheckbox);
    fireEvent.click(lifestyleCheckbox);

    expect(mobileCheckbox).toBeChecked();
    expect(lifestyleCheckbox).toBeChecked();
  });
});
