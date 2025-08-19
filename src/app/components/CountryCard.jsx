// This must be a Client Component because we need to use React Hooks (`useState`, `useEffect`)
// to safely handle client-side-only formatting and prevent hydration errors.
'use client';

// We need these hooks to manage the component's state and side effects.
import { useState, useEffect } from 'react';
// We use the optimized Image component from Next.js.
import Image from 'next/image';

// This component receives a single 'country' object as a prop.
export default function CountryCard({ country }) {
  // THE HYDRATION FIX:
  // We create a state variable to hold the population string.
  //
  // PROBLEM: `country.population.toLocaleString()` can produce different string formats on the
  // server (e.g., "1,18,18,618") versus the browser (e.g., "11,818,618"). This mismatch
  // causes a React Hydration Error.
  //
  // SOLUTION:
  // Step 1: Initialize the state with a "safe" value that is identical on both server and client.
  // `toString()` is safe because it's just the plain number as a string.
  const [formattedPopulation, setFormattedPopulation] = useState(
    country.population.toString()
  );

  // Step 2: Use the `useEffect` hook. This code will run ONLY in the browser, AFTER the
  // initial render and hydration are safely complete.
  useEffect(() => {
    // Inside the effect, we can now safely use the browser-specific `toLocaleString()`
    // and update our state. React will then re-render the component with the nicely formatted string.
    setFormattedPopulation(country.population.toLocaleString());
    // The dependency array tells React to only re-run this effect if `country.population` changes.
  }, [country.population]);

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
      <Image
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        width={100}
        height={60}
        className="w-full h-32 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-bold mb-2 text-gray-900">{country.name.common}</h2>
      {/* We render the state variable. It will show the plain number for a millisecond,
          then instantly update to the formatted version. The user won't notice the flash,
          but React will be happy because the initial render matched the server. */}
      <p className="text-gray-700">Population: {formattedPopulation}</p>
      <p className="text-gray-700">Region: {country.region}</p>
    </div>
  );
}