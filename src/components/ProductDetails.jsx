import {useState, useEffect} from "react"
import {useParams} from "react-router"

const ProductDetails = () => {

    const {productID} = useParams()
    const [product, setProduct] = useState({}) 

    useEffect(() => {

        const getSingleProduct = async () => {
            
            const apiResponse = await fetch(`http://localhost:3000/api/products/${productID}`)
            const parsedApiResponse = await apiResponse.json()
            setProduct(parsedApiResponse)
            
        }

        getSingleProduct()

    }, [])

    return <>
        <img src={product.cover_url} />
        <h1>{product.title}</h1>
        <h2>by {product.author}</h2>
        <h3>Price: ${product.price}</h3>
        <h3>{product.stock} left in stock</h3>
        <br />
        <h2>Synopsis: </h2>
        <p>{product.description}</p>
<<<<<<< HEAD
=======
        
>>>>>>> b9d0cc619082676c0a115f95ca89ab030fa6b51d
    </>

}

export default ProductDetails