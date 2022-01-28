import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import {authContext} from './AuthProvider'
import { registerUser } from "../API-Fetch/usersAPI";
import '../styles/login.css'


const Register = () => {
  const [apiMessage, setApiMessage] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const {setToken} = useContext(authContext)

  async function handleSubmit(event) {
    event.preventDefault();

    const data = await registerUser(email, password)
    
    const token = data.token
    setApiMessage(data.message)
    setToken(data.token)
    localStorage.setItem('token', token)
    if (data.token) setTimeout(() => history.push('/'), 1000)
  }

  return <>
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='form-input'
          value={email}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className='form-input'
          value={password}
          type = "password"
          minLength = "8"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="Submit" className="form-submit">
          Register
        </button>
      </form>
      <h1 className='apiMessage'>{apiMessage}</h1>
  </>
};

export default Register;
