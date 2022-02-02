

async function getCart(userID, token) {
  try {
    const response = await fetch(`/api/cart/user/${userID}`, {
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${token}`
      }
    });
    const result = await response.json()
    return result;
  } catch (error) {
    console.error(error);
  }
}


async function removeCartItem(userID, productID, token, cart, setCart) {

  try {

    const apiResponse = await fetch(`/api/cart/products/${productID}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userID
      })
    });

    const parsedApiResponse = await apiResponse.json();
    const newCart = cart.filter(item => {
      return item.productID !== parsedApiResponse.productID
    });
    setCart(newCart)

  } catch (error) {
    console.error(error)
  }
};


async function changeItemQuantity(userID, productID, token, setTempQuantity, quantity, cart, setCart) {

  try {

    if (quantity < 1) {
      removeCartItem(userID, productID, token, cart, setCart)
      return
    }
    const response = await fetch(`/api/cart/products/${productID}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userID,
        quantity
      })
    });
    const result = await response.json();
    setTempQuantity(result.quantity)

  } catch (error) {
    console.error(error)
  }
};

export {
  getCart,
  removeCartItem,
  changeItemQuantity
}