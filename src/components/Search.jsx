import iconSearch from '../assets/Search.svg'

export default function Search({ setTyping }) {

  return (
    <div className="search">
        <figure>
            <img src={iconSearch} alt="icon search" />
        </figure>
        <input type="search" placeholder='Search by Name, Region, Subregion' onChange={e => setTyping(e.target.value.toLowerCase())} />
    </div>
  )
}
