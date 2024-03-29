import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import { getCart, removeCartItem, changeItemQuantity } from "../API-Fetch/cartAPI";
import { authContext } from "./AuthProvider";
import { cartContext } from "./CartProvider";


//TODO fix checkout and cart item count
//TODO create custom css for plus minus buttons 

const Cart = () => {
  const { user, token, isLoggedIn } = useContext(authContext);
  const { cart, setCart } = useContext(cartContext);
  const [tempQuantity, setTempQuantity] = useState({})
  const [displayModal, setDisplayModal] = useState(false)
  const history = useHistory()

  useEffect(() => {
    {
      isLoggedIn ? (async () => {
        const newCart = await getCart(user.id, token);
        getCartTotal(newCart);
        setCart(newCart);
      })() : null
    }
  }, [user, tempQuantity, isLoggedIn]);

  if (!isLoggedIn) {
    return <>
      <h1>Please login to access your cart!</h1>
    </>
  }


  const getCartTotal = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += (Number(cart[i].price) * cart[i].quantity);
    }
    return total;
  };


 /* const modal = document.getElementById("checkoutModal")
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  */

  const toggleModal = () => {
    setDisplayModal(true)
  }

  /*
  const confirmOrder = () => {
    const userID = user.id
    const resetCart = async (userID) => {
      const apiResponse = await fetch(`/api/cart/user/${userID}/checkout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
    }
    resetCart(userID)
    setDisplayModal(false)
    setTimeout(() => history.push('/'), 1000)
  }
  */

  return (
    <div className="container" >
      <div className="d-grid gap-3" >
        {cart.map((product) => (
          <div className='border-bottom border-dark' key={product.id}>
            <div className="img-container" >
              <img className="product-cover" src={product.cover_url} />
            </div>
            <div className="pb-3" >
              <h2>{product.title}</h2>
              <h4>by {product.author}</h4>
              <h4>Format: {product.format}</h4>
              <h4>$ {product.price}</h4>
              <h4 className="product-quantity" >Quantity:
                <button
                  className="quantity-button btn btn-outline-dark"
                  type="button"
                  onClick={() => changeItemQuantity(product.userID, product.productID, token, setTempQuantity, (product.quantity -= 1), cart, setCart)}
                > - </button>
                {product.quantity}
                <button
                  className="quantity-button btn btn-outline-dark"
                  type="button"
                  onClick={() => changeItemQuantity(product.userID, product.productID, token, setTempQuantity, (product.quantity += 1), cart, setCart)}
                > + </button>
              </h4>
              <button
                className="remove-button btn btn-outline-dark"
                type='button'
                onClick={() => removeCartItem(product.userID, product.productID, token, cart, setCart)}
              >Remove from Cart</button>
            </div>
          </div>
        ))}
        <div className='pb-3'>
          {cart.length ?
            <>
              <h4 className="total">Cart Total: ${getCartTotal(cart).toFixed(2)}</h4>
              <button className='checkout btn btn-outline-dark' type='button' onClick={toggleModal}>Checkout!</button>
            </>
            :
            <h1 className='position-absolute top-0 start-50 translate-middle'>Please Add Items To Your Cart</h1>}
        </div>
        {/* <div className={displayModal ? 'checkoutModal show' : 'checkoutModal hide'}>
          <div className='modalContent'>
            <h2>Thanks for shopping with Endless Worlds, {user.email}!</h2>
            <h4>Cart Total: ${getCartTotal(cart).toFixed(2)}</h4>
            <button className='confirmOrder' onClick={confirmOrder} type='button'>Confirm Order!</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;