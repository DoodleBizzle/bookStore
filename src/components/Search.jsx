import { useState } from "react"
import { useHistory} from "react-router";
import { useContext } from "react";
import { searchContext } from "./SearchProvider";



const Search = () => {
  const [term, setTerm] = useState("");
  const history = useHistory();
  const {setSearchResult} = useContext(searchContext)

  const query = new URLSearchParams({term});

  const submitSearch = (event) =>{
    if(event.key === "Enter"){
      setSearchResult([])
      event.preventDefault();
      history.push(`/search?${query.toString()}`)
      setTerm('')
    }
  }
  
  return(
    <div className="search">
      <form>
        <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        onKeyDown={submitSearch}
        placeholder="Search">
        </input>
      </form>
    </div>
  )
}

export default Search;