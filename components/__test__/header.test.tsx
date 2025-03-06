import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Header from "../Header/header";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React from "react";

const mockStore = configureStore({
  reducer: {
    cart: (state = { items: [] }) => state,
  },
  preloadedState: {
    cart: { items: [] },
  },
});

// Mock for getCartTotalItemCount selector
vi.mock("@/store/slices/cart-slice", () => ({
  getCartTotalItemCount: () => 0,
}));

// Mock for useAppSelector
vi.mock("@/store", () => ({
  useAppSelector: (selector: () => void) => selector(),
}));

vi.mock("next/form", () => ({
  __esModule: true,
  default: vi.fn(({ children, ...props }) => <form {...props}>{children}</form>),
}));

vi.mock("@sanity/icons", () => ({
  TrolleyIcon: vi.fn().mockImplementation(() => <svg data-testid="trolley-icon" />),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}));

// Mock HeaderSearch component
vi.mock("./header-search", () => ({
  __esModule: true,
  default: () => (
    <form data-testid="app-header__form" action="/search">
      <input type="text" name="query" placeholder="Search for products" data-testid="app-header__form-input" />
    </form>
  ),
}));

// Helper function to render with Redux Provider
const renderWithProvider = (ui: React.ReactNode) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe("Unit tests", () => {
  test("renders logo correctly", () => {
    renderWithProvider(<Header />);

    expect(screen.getByTestId("app-header__root-link")).toHaveTextContent("Impact shop");
  });

  test("renders search input with correct attributes", () => {
    renderWithProvider(<Header />);

    const searchInput = screen.getByTestId("app-header__form-input");

    expect(searchInput).toHaveAttribute("type", "text");
    expect(searchInput).toHaveAttribute("name", "query");
    expect(searchInput).toHaveAttribute("placeholder", "Search for products");
  });

  test("renders cart link with correct content", () => {
    renderWithProvider(<Header />);
    const cartContainer = screen.getByTestId("app-header__cart");

    expect(cartContainer).toHaveTextContent("Go to cart");
  });

  test("applies custom className when provided", () => {
    const customClass = "test-custom-class";
    renderWithProvider(<Header className={customClass} />);

    const header = screen.getByTestId("app-header");
    expect(header).toHaveClass(customClass);
  });
});

describe("Integration tests", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  test("search form has correct action and can submit", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Header />);

    const searchInput = screen.getByTestId("app-header__form-input");
    const searchForm = screen.getByTestId("app-header__form");

    expect(searchForm).toHaveAttribute("action", "/search?query=");

    await user.type(searchInput, "samsung");
    expect(searchInput).toHaveValue("samsung");
  });
});

describe("Accessibility tests", () => {
  test("is tab navigable", async () => {
    const user = userEvent.setup();

    renderWithProvider(<Header />);
    const logoLink = screen.getByTestId("app-header__root-link");
    const searchInput = screen.getByPlaceholderText("Search for products");
    const cartLink = screen.getByTestId("app-header__cart-link");

    await user.tab();
    expect(logoLink).toHaveFocus();

    await user.tab();
    expect(searchInput).toHaveFocus();

    await user.tab();
    expect(cartLink).toHaveFocus();
  });
});
