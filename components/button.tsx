import { cn } from "@/utils/classnames";
import React from "react";

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const className = cn(
    "flex sm:flex-none justify-center sm:justify-start items-center space-x-2 bg-button hover:opacity-50 px-4 py-2 rounded font-bold text-button-foreground transition-opacity cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed",
    props.className
  );

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
