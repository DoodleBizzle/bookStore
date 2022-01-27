

async function getSingleProduct(productID) {

  try {

    const apiResponse = await fetch(`/api/products/${productID}`)
    const parsedApiResponse = await apiResponse.json()
    return parsedApiResponse

  } catch (error) {
    console.error(error)
  }

}

async function addProductToCart(productID, user, token) {

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
  
}

async function getProducts () {
  const apiResponse = await fetch('/api/products', {
      headers: {
          'Content-Type': 'application/json'
      }
  })
  const productData = await apiResponse.json()
  return productData
}

export {
  getSingleProduct,
  addProductToCart,
  getProducts
}