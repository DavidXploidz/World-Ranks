import { useEffect, useState } from "react"
import Search from "./components/Search"
import Table from "./components/Table"

export default function App() {
  
  const [countries, setCountries] = useState([])
  const [defaultCountries, setDefaultCountries] = useState([])
  const [selectOption, setSelectedOption] = useState('population')
  const [sortOrder, setSortOrder] = useState('des');
  const [filters, setFilters] = useState({
    americas: false,
    antarctic: false,
    africa: false,
    asia: false,
    europe: false,
    oceania: false,
    independent: false,
    member: false
  }); //Yo se que si las quito sigue funcionando solo las pongo para recordarlo mas grafico
  const [typing, setTyping] = useState('')

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const filteredCountries = defaultCountries.filter(item => {
      if (filters.americas && item.region !== 'Americas') {
        return false;
      }
      if (filters.antarctic && item.region !== 'Antarctic') {
        return false;
      }
      if (filters.africa && item.region !== 'Africa') {
        return false;
      }
      if (filters.asia && item.region !== 'Asia') {
        return false;
      }
      if (filters.europe && item.region !== 'Europe') {
        return false;
      }
      if (filters.oceania && item.region !== 'Oceania') {
        return false;
      }
      if (filters.independent && !item.independent) {
        return false;
      }
      if (filters.member && item.independent) {
        return false;
      }
      return true;
    });
    setCountries(filteredCountries);
  }, [filters, defaultCountries]);

  // Escuchar por cambios en typing
  useEffect(() => {
    // Es importante que la info en search como en este metodo este en minusculas para que coincida
    const typingData = defaultCountries.filter((item) => item.name.common.toLowerCase().includes(typing) );
    setCountries(typingData)
  }, [typing])
  

  const getData = async () => {
    const url = "https://restcountries.com/v3.1/all"
    const res = await fetch(url)
    const data = await res.json()
    setDefaultCountries(data)
    setCountries(data)
  }

  // State derivado
  const num_countries = countries.length;

  function sortProducts(countries, selectOption, sortOrder){
    return [...countries].sort((a, b) => {
      const valueA = selectOption.split('.').reduce((acc, key) => acc[key], a);
      const valueB = selectOption.split('.').reduce((acc, key) => acc[key], b);
  
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  const sortedProducts = sortProducts(countries, selectOption, sortOrder);

  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilters({ ...filters, [id]: checked });
  };

  return (
    <div className='container page page--out'>
      <header className='page__header'>
        <span>Found {num_countries} countries</span>
        <Search setTyping={setTyping} />
      </header>
      <aside className='page__aside'>
        <div>
          <label htmlFor="sort">Sort by</label>
          <select name="sort" id="sort" onChange={e => setSelectedOption(e.target.value)} >
            <option value="population">Population</option>
            <option value="name.common">Name</option>
            <option value="area">Area</option>
            <option value="region">Region</option>
          </select>
        </div>
        <div>
          <label htmlFor="region">Region</label>
          <section className="regions">
            <div className="regions__option">
              <input type="checkbox" id="americas" checked={filters.americas} onChange={handleFilterChange} />
              <label htmlFor="americas">Americas</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="antarctic" checked={filters.antarctic} onChange={handleFilterChange} />
              <label htmlFor="antarctic">Antarctic</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="africa" checked={filters.africa} onChange={handleFilterChange} />
              <label htmlFor="africa">Africa</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="asia" checked={filters.asia} onChange={handleFilterChange} />
              <label htmlFor="asia">Asia</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="europe" checked={filters.europe} onChange={handleFilterChange} />
              <label htmlFor="europe">Europe</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="oceania" checked={filters.oceania} onChange={handleFilterChange} />
              <label htmlFor="oceania">Oceania</label>
            </div>
          </section>
        </div>
        <div>
          <label htmlFor="status">Status {typing}</label>
          <div className="status">
            <input type="checkbox" id="member" checked={filters.member} onChange={handleFilterChange}  />
            <label htmlFor="member">Member of the United Nations</label>
          </div>
          <div className="status">
            <input type="checkbox" id="independent" checked={filters.independent} onChange={handleFilterChange} />
            <label htmlFor="independent">Independent</label>
          </div>
        </div>
      </aside>
      <main className='page__main'>
        <Table countries={sortedProducts} />
      </main>
    </div>
  )
}
