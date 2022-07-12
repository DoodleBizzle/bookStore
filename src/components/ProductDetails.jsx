import { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { authContext } from "./AuthProvider"
import { getSingleProduct, addProductToCart } from "../API-Fetch/productsAPI"


const ProductDetails = () => {

    const { productID } = useParams()
    const [product, setProduct] = useState({})
    const { user, token, isLoggedIn } = useContext(authContext)
    const history = useHistory()

    useEffect(() => {

        (async () => {
            const newProduct = await getSingleProduct(productID)
            setProduct(newProduct)
        })()

    }, [])

    const addToCart = async () => {
        addProductToCart(productID, user, token)
        setTimeout(() => history.push('/'), 1000)
    }

    return (
        <>
            <div className='container'>
                <img className="img-fluid" src={product.cover_url} />
                <h2>{product.title}</h2>
                <h4>by {product.author}</h4>
                <h4>Price: ${product.price}</h4>
                {isLoggedIn ? <button className='addToCart' type='button' onClick={addToCart}>Add to Cart</button> : null}
                <h2>Synopsis: </h2>
                <p>{product.description}</p>
            </div>
        </>
    )
}

export default ProductDetails