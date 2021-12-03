import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getMessage } from '../api';

// This is just a sample App component, replace it with your own.
const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // This is a sample of querying our API for a message
    getMessage()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  }, []);

  return <>
    <h1>Hello, World!</h1>
    <h2>{message}</h2>
    <Router>
      {/* Navbar */}
      <Switch>
        <Route exact path='/'>
          {/* <Home /> */}
        </Route>
        <Route path='/login'>
          {/* <Login /> */}
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
  </>
}

export default App;