import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { authContext } from './AuthProvider'
import { registerUser } from "../API-Fetch/usersAPI";

const Register = () => {
  const [apiMessage, setApiMessage] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setToken } = useContext(authContext)

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
    <div className="container">
      <h1 className="text-center">Register User</h1>
      <div className="row row-cols-3 justify-content-center">
        <form className='row justify-content-center' onSubmit={handleSubmit}>
          <input
            className='mb-3'
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className='mb-3'
            value={password}
            type="password"
            minLength="8"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="text-center">  
          <button type="Submit" className="btn btn-outline-dark">
            Register
          </button>
          </div>
        </form>
      </div>
    </div>
    <h1 className='apiMessage text-center'>{apiMessage}</h1>
  </>
};

export default Register;
