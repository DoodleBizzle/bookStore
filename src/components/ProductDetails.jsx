import { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { authContext } from "./AuthProvider"
import '../styles/productDetails.css'

const ProductDetails = () => {

    const { productID } = useParams()
    const [product, setProduct] = useState({})
    const { user, token, isLoggedIn } = useContext(authContext)
    const history = useHistory()

    useEffect(() => {

        const getSingleProduct = async () => {

            const apiResponse = await fetch(`/api/products/${productID}`)
            const parsedApiResponse = await apiResponse.json()
            setProduct(parsedApiResponse)

        }

        getSingleProduct()

    }, [])

    const addItemToCart = async () => {

        const apiResponse = await fetch(`/api/cart/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productID: productID,
                userID: user.id,
                quantity: 1
            })
        })

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
                        {isLoggedIn ? <button className='addToCart' type='button' onClick={addItemToCart}>Add to Cart</button> : null}
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