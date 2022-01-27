import { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { authContext } from "./AuthProvider"
import { getSingleProduct, addProductToCart } from "../API-Fetch/productsAPI"
import '../styles/productDetails.css'

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

    return <>
        <div className='productDetails-container-parent'>
            <div className='productDetails-container'>
                <div className='img-text-container'>
                    <div className='productDetails-img'>
                        <img src={product.cover_url} />
                    </div>
                    <div>
                        <div className='productDetails-text'>
                            <h2>{product.title}</h2>
                            <h4>by {product.author}</h4>
                            <h4>Price: ${product.price}</h4>
                            {isLoggedIn ? <button className='addToCart' type='button' onClick={addToCart}>Add to Cart</button> : null}
                        </div>
                        <div className='synopsis-container'>
                            <h2>Synopsis: </h2>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProductDetails