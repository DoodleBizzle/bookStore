import { searchContext } from "./SearchProvider";
import { useContext , useEffect} from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";


const SearchResult = () =>{
  const {searchResult, setSearchResult} = useContext(searchContext)
  const location = useLocation();
  console.log(location)

  useEffect(()=>{
  const getSearch = async () => {
    const response = await fetch(`/api/search${location.search}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    setSearchResult(result)
  }
  getSearch()
  },[location.search])

  console.log(searchResult)

  return(
    <>
    <div className='product-container-parent'>
            <div className='product-container'>
                {searchResult.map((product) => (
                    <div className='single-product' key={product.id}>
                        <div className='img-container'>
                            <img className='product-cover' src={product.cover_url} />
                        </div>
                        <div className='text-container'>
                            <h2>{product.title}</h2>
                            <h4>by {product.author}</h4>
                            <h4>Format: {product.format}</h4>
                            <h4>$ {product.price}</h4>
                            <Link className='product-link' to={`/products/${product.id}`}>
                                Product Details
                            </Link>
                            <div className='product-description'>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default SearchResult;