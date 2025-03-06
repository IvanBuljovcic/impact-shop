import SearchProducts from "@/components/Search/search-products";

const Search = async ({ params }: { params: Promise<{ query: string }> }) => {
  const { query } = await params;

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen align-top">
      <div className="p-8 rounded-lg w-full">
        <h1 className="mb-6 text-3xl text-center">
          Showing results for: <span className="font-bold">{query}</span>
        </h1>

        <SearchProducts query={query} />
      </div>
    </div>
  );
};

export default Search;
