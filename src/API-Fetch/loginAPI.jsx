export async function attemptLogin (email, password) {

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