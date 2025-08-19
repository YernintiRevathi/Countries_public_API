'use client';

import {useState,useEffect} from 'react';
import CountryCard from './CountryCard';

export default function CountryList({countries}){
    const [search,setsearch]=useState('');
    const [currentPage,setCurrentPage]=useState(1);
    const itemsPerPage=20;

    useEffect(()=>{
        setCurrentPage(1);
    },[search]);

    const countryList=Array.isArray(countries)?countries:[];

    const filteredCountries=countryList.filter((country)=>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    const lastItemIndex=currentPage*itemsPerPage;
    const firstItemIndex=lastItemIndex-itemsPerPage;
    const currentItems=filteredCountries.slice(firstItemIndex,lastItemIndex);
    const totalPages=Math.ceil(filteredCountries.length/itemsPerPage);

    return (
        <div>
            <input 
                type="text"    
                placeholder="search for a country"
                className="w-full max-w-sm  mx-auto block p-3 mb-8 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                onChange={(e)=>setsearch(e.target.value)}
                value={search}
            />

            {/* RENDER 1: Display the countries for the current page */}
            {currentItems.length > 0 ?(
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                    {currentItems.map((country)=>(
                        <CountryCard key={country.cca3} country={country} />
                    ))} 
                </div>
            ):(
                <p className="text-center text-gray-500 ">No countries found!</p>
            )}
            
             {/* RENDER 2: Pagination Controls */}
             <div className="flex justify-center items-center gap-4 mt-12">
                <button 
                    onClick={()=>setCurrentPage((prev)=>Math.max(prev-1,1))}
                    disabled={currentPage===1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disable:bg-gray-300">
                    Previous
                </button>

                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                
                <button 
                    onClick={()=>setCurrentPage((next)=>Math.min(next+1,totalPages))}
                    disabled={currentPage===totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disable:bg-gray-300">
                    Next
                </button>
             </div>
        </div>
    );

 }