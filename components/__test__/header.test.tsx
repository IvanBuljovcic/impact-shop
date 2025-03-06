import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Header from "../header";
import Link from "next/link";

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

describe("Unit tests", () => {
  test("renders logo correctly", () => {
    render(<Header />);

    expect(screen.getByTestId("app-header__root-link")).toHaveTextContent("Impact shop");
  });

  test("renders search input with correct attributes", () => {
    render(<Header />);

    const searchInput = screen.getByTestId("app-header__form-input");

    expect(searchInput).toHaveAttribute("type", "text");
    expect(searchInput).toHaveAttribute("name", "query");
    expect(searchInput).toHaveAttribute("placeholder", "Search for products");
  });

  test("renders cart link with correct content", () => {
    render(<Header />);
    const cartContainer = screen.getByTestId("app-header__cart");

    expect(cartContainer).toHaveTextContent("Cart");

    const trolleyIcon = screen.getByTestId("trolley-icon");
    expect(trolleyIcon).toBeInTheDocument();
  });

  test("applies custom className when provided", () => {
    const customClass = "test-custom-class";
    render(<Header className={customClass} />);

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
    render(<Header />);

    const searchInput = screen.getByTestId("app-header__form-input");
    const searchForm = screen.getByTestId("app-header__form");

    expect(searchForm).toHaveAttribute("action", "/search");

    await user.type(searchInput, "samsung");
    expect(searchInput).toHaveValue("samsung");
  });

  test("logo link navigates to home page with correct href", () => {
    render(<Header />);
    const logoLink = screen.getByTestId("app-header__root-link");

    // Directly check the href attribute
    expect(logoLink).toHaveAttribute("href", "/");

    // Verify Link component was called with correct props
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "/",
        children: expect.anything(),
      }),
      {}
    );
  });
});

describe("Accessibility tests", () => {
  test("is tab navigable", async () => {
    const user = userEvent.setup();

    render(<Header />);
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
