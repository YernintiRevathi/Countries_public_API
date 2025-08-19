// This is a directive that marks this as a Client Component. It's required for error components
//  because they need to be interactive (using the onClick event handler).

'use client';

export default function Error({error,reset}){
    // This is another special Next.js file. It's automatically shown when an error is thrown in a Server Component.
    // Next.js automatically passes in two props: error (an object containing the error message) and 
    // reset (a function that, when called, will try to re-render the page).
    return (
        <div className="text-center p-12">
            <h2 className="text-red-600 text-2xl">Something went wrong!</h2>
            <p>{error.message}</p>
            {/* Displays the specific error message (e.g., "Failed to fetch data") to the user. */}
            <button onClick={()=> reset()} 
            
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Try Again
            </button>
            {/* This is an event handler. When the user clicks the button, it calls the reset function provided by Next.js, 
            attempting the data fetch and page render again. */}
        </div>
    );
}