import { token } from 'morgan';
import React, { useEffect, useContext } from 'react';
import { getCart } from '../api/cartAPI';
import { authContext } from './AuthProvider';
import { cartContext } from './CartProvider';

const Cart = () => {
    const { user, token } = useContext(authContext);
    const { cart, setCart } = useContext(cartContext);
    // const userID = user.id
    console.log(cart);


    useEffect(() => {
        (async() => {
            const newCart = await getCart(1, token)
            setCart(newCart)
        })()
    }, []);


    return (
        <div>
            <h1></h1>
        </div>
    )
};

export default Cart; 

// pull in cart context 'import'
// pull in Auth provider context and get the user 
// fetch to get the cart based off of user 