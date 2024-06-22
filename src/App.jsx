import { useEffect, useState } from "react"
import Search from "./components/Search"
import Table from "./components/Table"

export default function App() {
  
  const [countries, setCountries] = useState([])
  const [selectOption, setSelectedOption] = useState('population')
  const [sortOrder, setSortOrder] = useState('des');

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const url = "https://restcountries.com/v3.1/all"
    const res = await fetch(url)
    const data = await res.json()
    setCountries(data)
  }

  // State derivado
  const num_countries = countries.length;

  function sortProducts(countries, selectOption, sortOrder){
    console.log(countries);
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

  function handleChangeRegion(event){
    const checked = event.target.checked;
    const id = event.target.id;
    const filterRegions = countries.filter(item => item.region === id);
    console.log(filterRegions);
    setCountries(filterRegions)
  }

  return (
    <div className='container page page--out'>
      <header className='page__header'>
        <span>Found {num_countries} countries</span>
        <Search />
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
              <input type="checkbox" id="Americas" onChange={e => handleChangeRegion(e)} />
              <label htmlFor="Americas">Americas</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="Antarctic" onChange={e => handleChangeRegion(e)} />
              <label htmlFor="Antarctic">Antarctic</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="Africa" onChange={e => handleChangeRegion(e)} />
              <label htmlFor="Africa">Africa</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="Asia" onChange={e => handleChangeRegion(e)} />
              <label htmlFor="Asia">Asia</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="Europe" onChange={e => handleChangeRegion(e)} />
              <label htmlFor="Europe">Europe</label>
            </div>
            <div className="regions__option">
              <input type="checkbox" id="Oceania" onChange={e => handleChangeRegion(e)} />
              <label htmlFor="Oceania">Oceania</label>
            </div>
          </section>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          ...
        </div>
      </aside>
      <main className='page__main'>
        <Table countries={sortedProducts} />
      </main>
    </div>
  )
}
