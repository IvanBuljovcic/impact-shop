type ProductPriceProps = {
  price: number | string;
  currency: string; // TODO: add symbols instead of simple text
};

const ProductPrice = ({ price, currency }: ProductPriceProps) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return null;
  }

  return (
    <p className="font-bold text-current text-lg">
      {currency} {numericPrice?.toFixed(2)}
    </p>
  );
};

export default ProductPrice;
