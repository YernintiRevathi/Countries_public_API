// We import the CountryList component, which will handle all the interactive parts.
import CountryList from './components/CountryList';

/**
 * This is an asynchronous function responsible for fetching all country data.
 * Because this is a Server Component, this function runs on the server,
 * not in the user's browser.
 */
async function getCountries() {
  // This is the updated API endpoint. The '?fields=' query parameter is now
  // required by the API to specify exactly which data points we need.
  // This makes the API response smaller and faster.
  const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3';

  // A try...catch block is used for robust error handling. If anything goes
  // wrong inside the 'try' block, the 'catch' block will execute.
  try {
    // 'fetch' is the standard way to make network requests. 'await' pauses the
    // function until the request is complete and a response is received.
    const res = await fetch(apiUrl);

    // This is a crucial check. 'res.ok' is true if the HTTP status code is
    // successful (e.g., 200). If it's an error (e.g., 404, 500), this will be false.
    if (!res.ok) {
      // We create a new error with a descriptive message. 'throw' stops the
      // function and triggers the 'catch' block.
      throw new Error(`Failed to fetch data. Status: ${res.status} ${res.statusText}`);
    }

    // 'res.json()' reads the response from the API and parses it as JSON,
    // which is a format JavaScript can easily work with (an array of objects).
    const data = await res.json();
    return data;

  } catch (error) {
    // If an error was thrown, we log it to the server's terminal for debugging.
    console.error("Error in getCountries:", error);
    // We re-throw the error. In Next.js, this will be caught by the framework,
    // which will then automatically display your `error.js` component.
    throw error;
  }
}

/**
 * This is the main component for our homepage. It's an `async` component
 * because it needs to `await` the data from the getCountries function.
 */
export default async function HomePage() {
  // We call our data-fetching function and wait for the results. The 'countries'
  // variable will hold the array of country data.
  const countries = await getCountries();

  // The component returns JSX, which looks like HTML.
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Countries of the World
      </h1>

      {/* Here, we render our interactive CountryList component. */}
      {/* We pass the 'countries' data we fetched on the server down to the
          client component as a prop. This is the standard pattern for passing
          data from the server to the client in the Next.js App Router. */}
      <CountryList countries={countries} />
    </main>
  );
}

