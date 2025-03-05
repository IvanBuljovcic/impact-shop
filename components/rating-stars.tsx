type RatingStarsProps = {
  rate: number;
  count: number;
};

const RatingStars = ({ rate, count }: RatingStarsProps) => {
  const starFilled = (index: number) => (
    <svg
      className="me-1 w-4 h-4 text-yellow-300"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
      key={index}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  const startEmpty = (index: number) => (
    <svg
      className="me-1 w-4 h-4 text-gray-300 dark:text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
      key={index}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  const fullStars = Math.round(Math.abs(rate));
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => starFilled(i))}
      {[...Array(emptyStars)].map((_, i) => startEmpty(i))}

      <p className="ms-1 font-medium text-gray-500 dark:text-gray-400 text-sm">{rate}</p>
      <span className="bg-gray-500 dark:bg-gray-400 mx-1.5 rounded-full w-1 h-1"></span>
      <p className="ms-1 font-medium text-gray-500 dark:text-gray-400 text-sm">{count} Ratings</p>
    </div>
  );
};

export default RatingStars;
