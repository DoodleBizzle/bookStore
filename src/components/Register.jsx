import React, { useState } from "react";
import { useHistory } from "react-router";

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
    // console.log(data);
    const token = data.token;
    // console.log(token);
    window.localStorage.setItem("token", token);
    data.token
      ? (alert(data.message), history.push("/Login"))
      : alert(data.message);
  }

  return (
    <div className='page-container'>
      <h6 id="title">Register here!</h6>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          placeholder="Account Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          value={password}
          type = "password"
          minLength = "8"
          placeholder="Account Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button type="Submit" className="registerButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
