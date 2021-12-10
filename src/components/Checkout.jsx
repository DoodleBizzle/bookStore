import { useContext } from "react"
import { cartContext } from "./CartProvider"
import { authContext } from "./AuthProvider"


const Checkout = () => {

    const { cart, setCart } = useContext(cartContext)
    const { user } = useContext(authContext)

    return <>
        <h1>Checkout</h1>
    </>

}

export default Checkout