export async function getCart(userID, token) {
  try {
    const response = await fetch(`/api/cart/user/${userID}`, {
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${token}`
      }
    });
    const result = await response.json()
    return result;
  } catch (error) {
    console.error(error);
  }
}


