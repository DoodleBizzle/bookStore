import { token } from 'morgan';
import React, { useEffect, useContext } from 'react';
import { getCart } from '../api/cartAPI';
import { authContext } from './AuthProvider';
import { cartContext } from './CartProvider';

const Cart = () => {
    const { user, token } = useContext(authContext);
    const { cart, setCart, cartTotal, getCartTotal } = useContext(cartContext);
    const userID = user.id

    console.log(cart);
    console.log(cartTotal);
    // console.log(cart[0].price);

    useEffect(() => {
        (async() => {
            const newCart = await getCart(userID, token)
            getCartTotal(newCart);
            setCart(newCart)
        })()

    }, []);


    return (
        <div>
            <h1>Cart</h1>
        </div>
    )
};

export default Cart; 

// pull in cart context 'import'
// pull in Auth provider context and get the user 
// fetch to get the cart based off of user 