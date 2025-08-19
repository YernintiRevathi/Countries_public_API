import CountryCard from "./components/CountryCard";
import CountryList from "./components/CountryList";

async function getCountries() {
  console.log('Fetching countries data...');
  try {
    const res= await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3');
    console.log(' Fetching done.Response status:', res.status,res.statusText);
    if (!res.ok){
      throw new Error(`Failed to fetch data.Status:${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export default async function HomePage(){
  const countries= await getCountries();
  console.log(`[SERVER LOG] Fetched ${countries.length} countries successfully.`);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Countries of the world
      </h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country)=>(
          <CountryCard key={country.cca3} country={country} />
        ))} 
      </div> */}
      {/* Pass the server-fetched data as a prop*/}
      <CountryList countries={countries}/>
      
    </main>
  );
    
}