import {useState, useEffect} from "react"

const AllProducts = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const getProducts = async () => {
            const apiResponse = await fetch('/api/products/', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const productData = await apiResponse.json()
            setProducts(productData)
        }
        
        getProducts()

    }, [])

    console.log(products)

    return <>
        <h1>Products</h1>
        {products.map((product) => (
            <div key={product.id}>
                <img src={product.cover_url} />
                <h2>{product.title}</h2>
                <h4>by {product.author}</h4>
                <h4>Format: {product.format}</h4>
                <h4>$ {product.price}</h4>
            </div>
        ))}
    </>
}

export default AllProducts

