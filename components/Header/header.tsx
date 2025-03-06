import Link from "next/link";
import { cn } from "@/utils/classnames";
import GoToCart from "../go-to-cart";
import HeaderSearch from "./header-search";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const headerClass = cn("flex flex-wrap justify-between items-center col-span-8 px-4 py-4 md:py-2 bg-primary", className);

  return (
    <header className={headerClass} data-testid="app-header">
      <div className="flex flex-wrap justify-between items-center gap-3 w-full">
        <div className="order-1">
          <Link
            href="/"
            className="hover:opacity-50 mx-auto sm:mx-0 font-bold text-button-foreground text-2xl transition-opacity cursor-pointer"
            data-testid="app-header__root-link"
          >
            Impact shop
          </Link>
        </div>

        <div className="flex-auto order-3 md:order-2 shrink-0">
          <HeaderSearch />
        </div>

        <div className="order-2 md:order-3">
          <GoToCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
