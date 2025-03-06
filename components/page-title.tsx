import { cn } from "@/utils/classnames";

type PageTitleProps = {
  title: string;
  className?: string;
};

const PageTitle = ({ title, className }: PageTitleProps) => {
  const titleClass = cn("text-primary text-4xl text-center", className);

  return <h1 className={titleClass}>{title}</h1>;
};

export default PageTitle;
