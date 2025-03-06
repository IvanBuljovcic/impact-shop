"use client";

import Form from "next/form";
import { useState } from "react";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <Form
      action={`/search?query=${query}`}
      className="flex sm:flex-1 justify-center mt-2 sm:mt-0 w-full sm:w-auto"
      data-testid="app-header__form"
    >
      <input
        type="text"
        name="query"
        placeholder="Search for products"
        className="bg-secondary-foreground focus:ring-opacity-50 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-foreground w-full max-w-4xl text-secondary"
        data-testid="app-header__form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Form>
  );
};

export default HeaderSearch;
