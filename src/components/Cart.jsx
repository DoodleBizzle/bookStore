import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../api/cartAPI";
import { authContext } from "./AuthProvider";
import { cartContext } from "./CartProvider";
import '../styles/cart.css'

const Cart = () => {
  const { user, token } = useContext(authContext);
  const { cart, setCart } = useContext(cartContext);
  const [tempQuantity, setTempQuantity] = useState({})


  useEffect(() => {
    {
      user.id ? (async () => {
        const newCart = await getCart(user.id, token);
        getCartTotal(newCart);
        setCart(newCart);
      })() : null
    }
  }, [user, tempQuantity]);


  const getCartTotal = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += (Number(cart[i].price) * cart[i].quantity);
    }
    return total;
  };


  const removeCartItem = async (userID, productID) => {
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
    console.log(parsedApiResponse)
    const newCart = cart.filter(item => {
      return item.productID !== parsedApiResponse.productID
    });
    setCart(newCart)
  };


  const changeQuantity = async (userID, productID, quantity) => {
    if (quantity < 1) { removeCartItem(userID, productID) }
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
    console.log(result)
  };

  console.log(cart)


  return (
    <div className="product-container-parent" >
      <div className="product-container" >
        {cart.map((product) => (
          <div className='single-product' key={product.id}>
            <div className="img-container" >
              <img className="product-cover" src={product.cover_url} />
            </div>
            <div className="text-container" >
              <h2>{product.title}</h2>
              <h4>by {product.author}</h4>
              <h4>Format: {product.format}</h4>
              <h4>$ {product.price}</h4>
              <h4 className="product-quantity" >Quantity:
                <button className="quantity-button" type="button" onClick={() => changeQuantity(product.userID, product.productID, (product.quantity -= 1))}
                > - </button>
                {product.quantity}
                <button className="quantity-button" type="button" onClick={() => changeQuantity(product.userID, product.productID, (product.quantity += 1))}
                > + </button>
              </h4>
              <button className="remove-button" type='button' onClick={() => removeCartItem(product.userID, product.productID)}
              >Remove from Cart</button>
            </div>
          </div>
        ))}
        {cart.length ? <h4 className="total" >Cart Total: ${getCartTotal(cart).toFixed(2)}</h4> : <h1 className="need-products" >Please Add Items To Your Cart</h1>}
      </div>
    </div>
  );
};

export default Cart;


