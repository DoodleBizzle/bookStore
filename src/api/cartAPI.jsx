export async function getCart(userID, token) {
  try {
    const response = await fetch(`/api/cart`, {
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userID,
        token,
      }),
    });
    const result = await response.json()
    return result;
  } catch (error) {
    console.error(error);
  }
}


