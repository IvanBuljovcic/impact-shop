import SearchProducts from "@/components/Search/search-products";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Search = async (props: any) => {
  // Props set as any
  // 
  // previous definition of props as { searchParams: { query: string }}
  // was causing the build to fail due to missmatch of generated types
  // 
  // after investigating for more then an hour,
  // this solution with `any` is a bandage until a proper solution
  // of the issue can be understood and found

  const { query } = await props.searchParams!

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
