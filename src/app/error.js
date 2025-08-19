'use client';

export default function Error({error,reset}){
    return (
        <div className="text-center p-12">
            <h2 className="text-red-600 text-2xl">Something went wrong!</h2>
            <p>{error.message}</p>
            <button onClick={()=> reset()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Try Again
            </button>
        </div>
    );
}