const AllProducts = () => {

    const getProducts = async () => {

        const apiResponse = await fetch('/api/products/', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const productData = await apiResponse.json()
        console.log(productData)
    }

    getProducts()

    return <>
        <h1>Products</h1>
    </>

}

export default AllProducts