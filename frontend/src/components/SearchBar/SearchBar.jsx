import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'

function SearchBar() {
  return (
    <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
      <input type="text" placeholder="Search city" className="search-bar__input" />
      <button type="submit" className="search-bar__button" aria-label="Search">
        <FaSearch />
      </button>
    </form>
  )
}

export default SearchBar
