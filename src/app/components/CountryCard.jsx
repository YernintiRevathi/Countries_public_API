'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CountryCard({country}){
    const [formattedPopulation, setFormattedPopulation] = useState(
        country.population.toString() // Initially, use a simple non-formatted string
    ); 

    useEffect(()=>{
        setFormattedPopulation(country.population.toLocaleString());
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
            <p className="text-gray-700">Population: {formattedPopulation}</p>
            <p className="text-gray-700">{country.region}</p>
        </div>
    );
}