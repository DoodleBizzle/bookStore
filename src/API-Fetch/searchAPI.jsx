async function fetchSearch(location){

  const response = await fetch(`/api/search${location.search}`,{
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}

export {
  fetchSearch
}