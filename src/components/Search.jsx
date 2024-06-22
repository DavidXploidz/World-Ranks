import iconSearch from '../assets/Search.svg'

export default function Search() {
  return (
    <div className="search">
        <figure>
            <img src={iconSearch} alt="icon search" />
        </figure>
        <input type="search" placeholder='Search by Name, Region, Subregion' />
    </div>
  )
}
