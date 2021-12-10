import React, { useEffect, useContext } from "react";
import { getCart } from "../api/cartAPI";
import { authContext } from "./AuthProvider";
import { cartContext } from "./CartProvider";

const Cart = () => {
  const { user, token } = useContext(authContext);
  const { cart, setCart } = useContext(cartContext);

  const getCartTotal = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += Number(cart[i].price);
    }
    return total;
  };

  //   console.log(getCartTotal(cart));

  useEffect(() => {
    (async () => {
      const newCart = await getCart(user.id, token);
      getCartTotal(newCart);
      setCart(newCart);
    })();
  }, []);

  const removeCartItem = async (cartItemID, productID) =>{
    const apiResponse = await fetch(`/api/cart/products/${productID}`, {
        method: "DELETE", 
        headers: {'Content-Type': 'Application/json',
        'Authorization': `Bearer ${token}`}, 
        body: JSON.stringify({cartItemID})
    })

    const parsedApiResponse = await apiResponse.json();
    console.log(parsedApiResponse);
  }

  console.log(cart)

  return (
    <div>

      {cart && cart.map((product) => (
        <div key={product.id}>
          <img src={product.cover_url} />
          <h2>{product.title}</h2>
          <h4>by {product.author}</h4>
          <h4>Format: {product.format}</h4>
          <h4>$ {product.price}</h4>
          <button type='button' onClick={() => removeCartItem(product.id, product.productID)}>Remove from Cart</button>
        </div>
      ))}

      <h4>Cart Total: ${getCartTotal(cart).toFixed(2)}</h4>
    </div>
  );
};

export default Cart;

// pull in cart context 'import'
// pull in Auth provider context and get the user
// fetch to get the cart based off of user
