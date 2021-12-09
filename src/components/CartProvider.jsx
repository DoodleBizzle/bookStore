import { useState, createContext } from "react";

export const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [cartTotal, setCartTotal] = useState(0);

  
  const getCartTotal = (cart) => {
    let total = 0;
    for(let i = 0; i < cart.length; i++){
      total += cart[i].price;
    } setCartTotal(total);
  };
  
  
  const contextValue = {
    cart,
    setCart, 
    cartTotal, 
    setCartTotal,
    getCartTotal
  }

  return <>
    <cartContext.Provider value={contextValue}>
      {children}
    </cartContext.Provider>
  </>

}

export default CartProvider;