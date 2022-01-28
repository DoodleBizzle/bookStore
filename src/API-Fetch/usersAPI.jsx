async function attemptLogin(email, password) {

  try {

    const apiResponse = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const parsedApiResponse = await apiResponse.json()
    return parsedApiResponse

  } catch (error) {
    console.error(error)
  }

}

async function registerUser(email, password) {
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

  const userData = await response.json();
  return userData
}

export {
  attemptLogin,
  registerUser
}