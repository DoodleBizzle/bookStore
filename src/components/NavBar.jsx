import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "./AuthProvider";
import { cartContext } from "./CartProvider";
import { profileContext } from "./ProfileProvider";
import Search from './Search'
import '../styles/navbar.css'

//TODO have Profile Navlink reset states from forms so they don't appear

const NavBar = () => {
  const { isLoggedIn, setUser } = useContext(authContext)
  const { setAddress } = useContext(profileContext)
  const { cart } = useContext(cartContext)

  const handleClick = () => {
    localStorage.removeItem('token')
    setUser("")
    setAddress({})
  }

  const countItem = (items) => {
    let count = 0
    for (const item of items) {
      count += item.quantity
    }
    return count
  }

  return (
    <nav className="navbar navbar-dark fixed-top bg-dark">
      <NavLink className='nav-link ' to="/products"><h2>Endless Worlds Bookstore</h2></NavLink>
      <Search />
      <div className='nav-right d-flex flex-row align-items-center'>
        {isLoggedIn ?
          <>
            <NavLink className='nav-link' to='/profile'><h2>Profile</h2></NavLink>
            <NavLink to="/cart"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            </NavLink>
            <div>{countItem(cart)}</div>
            <NavLink className='nav-link' to="/" onClick={handleClick}><h2>Logout</h2></NavLink>
          </>
          :
          <>
            <NavLink className='nav-link' to="/login"><h2>Login</h2></NavLink>
            <NavLink className='nav-link' to="/register"><h2>Register</h2></NavLink>
          </>}
      </div>
    </nav>
  )
}

export default NavBar; 