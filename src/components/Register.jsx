import React from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    // if(password === confirmPassword) {
    //     setDoPasswordMatch(true);
    // }

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
    <div>
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
