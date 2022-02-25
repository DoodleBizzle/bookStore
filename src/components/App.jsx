import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import '../styles/globals.css'
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';
import SearchProvider from './SearchProvider';
import ProfileProvider from './ProfileProvider';
import Login from './Login';
import AllProducts from './AllProducts';
import NavBar from './NavBar';
import Register from './Register';
import Cart from './Cart'
import ProductDetails from './ProductDetails';
import SearchResult from './SearchResult';
import Profile from './Profile';


const App = () => {

  return <>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <ProfileProvider>
            <Router>
              <NavBar />
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
                  <ProductDetails />
                </Route>
                <Route path='/search'>
                  <SearchResult />
                </Route>
                <Route path='/profile'>
                  <Profile />
                </Route>
              </Switch>
            </Router>
          </ProfileProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </>
}

export default App;