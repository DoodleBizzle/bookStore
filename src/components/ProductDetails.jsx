import {useParams} from "react-router"

const ProductDetails = () => {

    const {productID} = useParams()

    return <>
        <h1>Product Details!</h1>

    </>

}

export default ProductDetails