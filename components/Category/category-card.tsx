import Link from "next/link";

type CategoryCardProps = {
  categorie: string;
};

const CategoryCard = ({ categorie }: CategoryCardProps) => {
  return (
    <Link
      href={`/category/${categorie}`}
      className="group flex flex-col bg-primary hover:bg-secondary shadow-sm hover:shadow-md p-4 border border-card-border rounded-lg h-full overflow-hidden text-secondary-foreground transition-all duration-200"
    >
      <h1 className="text-current text-2xl">{categorie}</h1>
    </Link>
  );
};
export default CategoryCard;
