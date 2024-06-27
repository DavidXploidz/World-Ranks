import React from 'react'
import { Link } from 'react-router-dom'

export default function Table({ countries }) {

    const styles = {
        td_short : {
            maxWidth: '250px',
        }
    }

  return (
    <div className='table-container'>
        <table>
            <thead>
                <tr>
                    <th>Flag</th>
                    <th className='sticky-left'>Name</th>
                    <th>Population</th>
                    <th>Area(km<sup>2</sup>)</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country, index) => {
                    return (
                    <tr key={index}>
                        <td>
                            <Link to={`/country/${country.name.common.toLowerCase()}`}>
                                <img className="flag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                            </Link>
                        </td>
                        <td className='sticky-left' style={styles.td_short}>{country.name.common}</td>
                        <td>{country.population.toLocaleString()}</td>
                        <td>{country.area.toLocaleString()}</td>
                        <td>{country.region}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}
