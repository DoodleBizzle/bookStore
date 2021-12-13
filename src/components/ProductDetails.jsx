import {useState, useEffect, useContext} from "react"
import {useParams} from "react-router"
import { authContext } from "./AuthProvider"

const ProductDetails = () => {

    const {productID} = useParams()
    const [product, setProduct] = useState({})
    const {user, token} =  useContext(authContext)

    useEffect(() => {

        const getSingleProduct = async () => {
            
            const apiResponse = await fetch(`http://localhost:3000/api/products/${productID}`)
            const parsedApiResponse = await apiResponse.json()
            setProduct(parsedApiResponse)
            
        }

        getSingleProduct()

    }, [])

    const addItemToCart = async () => {

        const apiResponse = await fetch(`http://localhost:3000/api/cart/products`, {
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

        const parsedApiResponse = await apiResponse.json()
        console.log(parsedApiResponse)

    }

    return <>
        <img src={product.cover_url} />
        <h1>{product.title}</h1>
        <h2>by {product.author}</h2>
        <h3>Price: ${product.price}</h3>
        <h3>{product.stock} left in stock</h3>
        <button type='button' onClick={addItemToCart}>Add to Cart</button>
        <br />
        <h2>Synopsis: </h2>
        <p>{product.description}</p>
    </>

}

export default ProductDetails