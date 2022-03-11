async function getUserAddress (token) {
  try {
    const response = await fetch(`/api/profile`, {
      headers: {
        "Content-Type": "Application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const result = response.json();
    return result
  } catch (error) {
    console.error(error)
  }
}

async function changeAddress (token, first_name, last_name, street, city, state, zip) {
  
  try {
    const response = await fetch(`/api/profile/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name,
        last_name,
        street,
        city,
        state,
        zip
      })
    });
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

async function addingNewAddress (token, user_id, first_name, last_name, street, city, state, zip) {

  try {
    const response = await fetch(`/api/profile/address`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id,
        first_name,
        last_name,
        street,
        city,
        state,
        zip
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

export {
  getUserAddress,
  changeAddress,
  addingNewAddress
}