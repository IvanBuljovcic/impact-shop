"use client";

const GoBack = () => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.history.back();
      }}
      className="text-primary text-sm"
    >
      Go back
    </a>
  );
};
export default GoBack;
