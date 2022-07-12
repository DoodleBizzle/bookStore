import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../API-Fetch/productsAPI"


const AllProducts = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        (async () => {
            const productList = await getProducts()
            setProducts(productList)
        })()

    }, [])

    return <>
        <div className='container '>
            <div className='d-grid gap-3'>
                {products.map((product) => (
                    <div className='border-bottom border-dark ' key={product.id}>
                        <Link to={`/products/${product.id}`} ><img className='img-fluid' src={product.cover_url} /></Link>
                        <h2>{product.title}</h2>
                        <h4>by {product.author}</h4>
                        <h4>Format: {product.format}</h4>
                        <h4>$ {product.price}</h4>
                        <Link className='text-decoration-none fw-bold link-dark' to={`/products/${product.id}`}>
                            Product Details
                        </Link>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default AllProducts

