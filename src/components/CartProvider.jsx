import { useState, createContext } from "react";

export const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const contextValue = {
    cart,
    setCart
  }

  return <>
    <cartContext.Provider value={contextValue}>
      {children}
    </cartContext.Provider>
  </>

}

export default CartProvider;