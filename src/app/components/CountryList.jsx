// This directive at the very top is crucial. It tells Next.js that this is a
// "Client Component". This is required because we are using React Hooks
// (`useState`, `useEffect`), which are only available on the client (in the browser).
'use client';

// We import the React Hooks we need.
// - useState: To give our component "memory" (state).
// - useEffect: To run "side effects" after the component renders.
import { useState, useEffect } from 'react';
// We import the CountryCard component to render each individual country.
import CountryCard from './CountryCard';

// This component receives the full 'countries' array as a prop from page.js.
export default function CountryList({ countries }) {
  // STATE 1: For the search input. It starts as an empty string.
  // `search` holds the current value, `setSearch` is the function to update it.
  const [search, setSearch] = useState('');

  // STATE 2: For the pagination. It starts at page 1.
  // `currentPage` holds the current page number, `setCurrentPage` updates it.
  const [currentPage, setCurrentPage] = useState(1);

  // This is a "side effect". This code runs after the component renders.
  // The dependency array `[search]` means this effect will re-run *only* when
  // the `search` state variable changes.
  useEffect(() => {
    // When a user types a new search, we reset them to the first page.
    // This provides a better user experience.
    setCurrentPage(1);
  }, [search]);

  // Define how many items we want to show on each page.
  const itemsPerPage = 20;

  // This is a safety check. It ensures that `countries` is actually an array
  // before we try to use array methods on it. If not, it defaults to an empty array.
  const countryList = Array.isArray(countries) ? countries : [];

  // LOGIC 1: FILTERING
  // We filter the full list based on the user's search input.
  const filteredCountries = countryList.filter((country) =>
    // We convert both the country name and search term to lowercase for
    // case-insensitive matching.
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // LOGIC 2: PAGINATION
  // Calculate the index of the first and last items for the current page.
  // For page 1: firstItemIndex = 0, lastItemIndex = 20
  // For page 2: firstItemIndex = 20, lastItemIndex = 40
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  // The `.slice()` method extracts a portion of the filtered array.
  // This `currentItems` array will contain only the 20 countries for the current page.
  const currentItems = filteredCountries.slice(firstItemIndex, lastItemIndex);

  // Calculate the total number of pages needed to display all filtered countries.
  // `Math.ceil` rounds up to ensure we have a page for the remaining items.
  // e.g., 25 items / 20 per page = 1.25, which rounds up to 2 pages.
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  return (
    <div>
      {/* This is a "controlled component". The input's `value` is tied to our `search` state. */}
      {/* The `onChange` event fires every time the user types. */}
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full max-w-sm mx-auto block p-3 mb-8 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* We check if there are any items to display for the current page. */}
      {currentItems.length > 0 ? (
        // If yes, we render the grid and map over `currentItems` to display a CountryCard for each.
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        // If no, we display a helpful message to the user.
        <p className="text-center text-gray-500">No countries found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          // When clicked, we decrease the page number, but ensure it never goes below 1.
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          // The button is disabled if we are already on the first page.
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          // When clicked, we increase the page number, but ensure it never goes above the total number of pages.
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          // The button is disabled if we are on the last page.
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}