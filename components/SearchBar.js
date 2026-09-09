export default function SearchBar({ query = "", location = "" }) {
  return (
    <form
      action="/jobs"
      className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm md:flex-row"
    >
      <input
        name="q"
        defaultValue={query}
        placeholder="Job title, skills or keywords"
        className="h-12 flex-1 rounded-xl bg-gray-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />

      <input
        name="location"
        defaultValue={location}
        placeholder="Location"
        className="h-12 rounded-xl bg-gray-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 md:w-56"
      />

      <button
        type="submit"
        className="h-12 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}