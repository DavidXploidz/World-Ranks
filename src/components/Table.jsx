import React from 'react'

export default function Table({ countries }) {

    const styles = {
        td_short : {
            maxWidth: '250px',
        }
    }

  return (
    <table>
        <thead>
            <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area(km2)</th>
                <th>Region</th>
            </tr>
        </thead>
        <tbody>
            {countries.map((country, index) => {
                return (
                <tr key={index}>
                    <td><img className="flag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} /></td>
                    <td style={styles.td_short}>{country.name.common}</td>
                    <td>{country.population.toLocaleString()}</td>
                    <td>{country.area.toLocaleString()}</td>
                    <td>{country.region}</td>
                </tr>
                )
            })}
        </tbody>
    </table>
  )
}
