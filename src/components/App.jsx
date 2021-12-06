import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import AuthProvider from './AuthProvider';
import Login from './Login';

import { getMessage } from '../api';
import NavBar from './NavBar';

// This is just a sample App component, replace it with your own.
const App = () => {

  return <>
<<<<<<< HEAD
    <h1>Hello, World!</h1>
    <h2>{message}</h2>
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          {/* <Home /> */}
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          {/* <Register /> */}
        </Route>
        <Route path='/profile'>
          {/* <Profile /> */}
        </Route>
        <Route path='/cart'>
          {/* <Cart /> */}
        </Route>
        <Route path='/products'>
          {/* <AllProducts /> */}
        </Route>
        <Route path='/products/:productID'>
          {/* <ProductDetails /> */}
        </Route>
        <Route path='/search'>
          {/* <SearchResults /> */}
        </Route>
        <Route path='/genres/:genreID'>
          {/* <AllProducts /> */}
        </Route>
      </Switch>
    </Router>
=======
    <AuthProvider>
      <Router>
        {/* Navbar */}
        <Switch>
          <Route exact path='/'>
            {/* <Home /> */}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            {/* <Register /> */}
          </Route>
          <Route path='/profile'>
            {/* <Profile /> */}
          </Route>
          <Route path='/cart'>
            {/* <Cart /> */}
          </Route>
          <Route path='/products'>
            {/* <AllProducts /> */}
          </Route>
          <Route path='/products/:productID'>
            {/* <ProductDetails /> */}
          </Route>
          <Route path='/search'>
            {/* <SearchResults /> */}
          </Route>
          <Route path='/genres/:genreID'>
            {/* <AllProducts /> */}
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
>>>>>>> origin/main
  </>
}

export default App;