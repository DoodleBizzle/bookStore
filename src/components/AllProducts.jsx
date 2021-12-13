import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../styles/all-products.css'

const AllProducts = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const getProducts = async () => {
            const apiResponse = await fetch('/api/products', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const productData = await apiResponse.json()
            console.log(productData)
            setProducts(productData)
        }

        getProducts()

    }, [])

    console.log(products)

    return <>
        <div className='product-container-parent'>
            <div className='product-container'>
                {products.map((product) => (
                    <div className='single-product' key={product.id}>
                        <div className='img-container'>
                            <img className='product-cover' src={product.cover_url} />
                        </div>
                        <div className='text-container'>
                            <h2>{product.title}</h2>
                            <h4>by {product.author}</h4>
                            <h4>Format: {product.format}</h4>
                            <h4>$ {product.price}</h4>
                            <Link to={`/products/${product.id}`}>
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
}

export default AllProducts

