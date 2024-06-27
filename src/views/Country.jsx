import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Country() {
    const {id} = useParams();
    const [country, setCountry] = useState([]);
    const [languages, setLanguages] = useState([]);
    // const [continents, setContinents] = useState([]);

    useEffect(() => {
        getData()
      }, [])

    const getData = async () => {
        try {
            const url = `https://restcountries.com/v3.1/name/${id}?fullText=true`
            const res = await fetch(url)
            const data = await res.json()
            setCountry(data)
            // setContinents(Object.values(country[0]?.continents))
        } catch (error) {
            console.log(error);
        }
    }

    function formatArray(array){
        console.log(array);
        return Object.values(array)
    }

  return (
    <div className='container container--sm page--bg page--out'>
        <div className='country'>
            <header className='country__header'>
                <figure>
                    <img src={country[0]?.flags.png} alt={country[0]?.flags.alt} />
                </figure>
                <h2>{country[0]?.name.common}</h2>
                <p>{country[0]?.name.official}</p>
            </header>
            <div className='country__stats'>
                <div className='bg'>
                    Population <span>{country[0]?.population.toLocaleString()}</span>
                </div>
                <div className='bg'>
                    Area (km<sup>2</sup>) <span>{country[0]?.area.toLocaleString()}</span>
                </div>
            </div>
            <ul className='country__info'>
                <li>Capital <span>{country[0]?.capital}</span></li>
                <li>Subregion <span>{country[0]?.subregion}</span></li>
                {/* <li>Language <span>{Object.values(country[0]?.languages)}</span></li> */}
                {/* <li>Continents <span>{Object.values(country[0]?.continents)}</span></li> */}
                {/* <li>Neighbouring Countries <span>{Object.values(country[0]?.continents)}</span></li> */}
            </ul>
        </div>
    </div>
  )
}
