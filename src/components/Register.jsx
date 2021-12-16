import React, { useState } from "react";
import { useHistory } from "react-router";
import '../styles/login.css'

// pull in auth provider 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    const token = data.token;
    console.log(token);
    window.localStorage.setItem("token", token);
    data.token
      ? (alert(data.message), history.push("/Login"))
      : alert(data.message);
  }

  return (
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='form-input'
          value={email}
          placeholder="Account Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          className='form-input'
          value={password}
          type = "password"
          minLength = "8"
          placeholder="Account Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button type="Submit" className="form-submit">
          Register
        </button>
      </form>
  );
};

export default Register;
