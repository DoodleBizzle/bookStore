import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import '../styles/globals.css'
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';
import Login from './Login';
import AllProducts from './AllProducts';
import NavBar from './NavBar';
import Register from './Register';
import Cart from './Cart'
import ProductDetails from './ProductDetails';

// This is just a sample App component, replace it with your own.
const App = () => {


  return <>
    <AuthProvider>
      <CartProvider>
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path='/'>
          <AllProducts />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/cart'>
          <Cart />
          </Route>
          <Route exact path='/products'>
            <AllProducts />
          </Route>
          <Route path='/products/:productID'>
            <ProductDetails/>
          </Route>
          <Route path='/search'>
            {/* <SearchResults /> */}
          </Route>
          <Route path='/genres/:genreID'>
            {/* <AllProducts /> */}
          </Route>
        </Switch>
      </Router>
      </CartProvider>
    </AuthProvider>
  </>
}

export default App;