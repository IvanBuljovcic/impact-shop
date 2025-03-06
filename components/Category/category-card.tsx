import Link from "next/link";

type CategoryCardProps = {
  categorie: string;
};

const CategoryCard = ({ categorie }: CategoryCardProps) => {
  return (
    <Link
      href={`/category/${categorie}`}
      className="group flex flex-col bg-primary hover:bg-secondary shadow-sm hover:shadow-md px-4 py-2 border border-card-border rounded-lg h-full overflow-hidden text-secondary-foreground transition-all duration-200"
    >
      <h2 className="text-current text-xl">{categorie}</h2>
    </Link>
  );
};
export default CategoryCard;
