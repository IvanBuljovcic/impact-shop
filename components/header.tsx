import React from "react";
import Link from "next/link";
import Form from "next/form";
import { cn } from "@/utils/classnames";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const headerClass = cn("flex flex-wrap justify-between items-center col-span-8 px-4 py-2 bg-primary", className);

  return (
    <header className="bg-primary" data-testid="app-header">
      <div className="flex flex-wrap justify-between items-center gap-3 w-full">
        <Link
          href="/"
          className="hover:opacity-50 mx-auto sm:mx-0 font-bold text-button-foreground text-2xl transition-opacity cursor-pointer"
          data-testid="app-header__root-link"
        >
          Impact shop
        </Link>

        <Form action="/search" className="flex sm:flex-1 justify-center mt-2 sm:mt-0 w-full sm:w-auto" data-testid="app-header__form">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-secondary-foreground focus:ring-opacity-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-foreground w-full max-w-4xl text-secondary"
            data-testid="app-header__form-input"
          />
        </Form>

        <div className="flex flex-1 sm:flex-none items-center space-x-4 mt-4 sm:mt-0" data-testid="app-header__cart">
          <Link
            href="/cart"
            className="relative flex flex-1 sm:flex-none justify-center sm:justify-start items-center space-x-2 bg-button hover:opacity-50 px-4 py-2 rounded font-bold text-button-foreground transition-opacity"
            data-testid="app-header__cart-link"
          >
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
