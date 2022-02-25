import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import { profileContext } from "./ProfileProvider";
import { changeAddress } from "../API-Fetch/profileAPI";

const EditAddress = () => {
  const { token } = useContext(authContext);
  const { address, setAddress, setEditAddress } = useContext(profileContext);
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [tempStreet, setTempStreet] = useState('');
  const [tempCity, setTempCity] = useState('');
  const [tempState, setTempState] = useState('');
  const [tempZip, setTempZip] = useState(0);

  useEffect(() => {
    setTempFirstName(address.first_name)
    setTempLastName(address.last_name)
    setTempStreet(address.street_address)
    setTempCity(address.city)
    setTempState(address.state)
    setTempZip(address.zip_code)
  }, [address])

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const newAddress = await changeAddress(
      token,
      tempFirstName,
      tempLastName,
      tempStreet,
      tempCity,
      tempState,
      tempZip
    );
    console.log("in handleEditSubmit",newAddress)
    setAddress(newAddress)
    setEditAddress(false)
  }
  
  return (
    <>
      <h2>Change Address</h2>
      <form onSubmit={handleEditSubmit}>
        <label>First Name:
          <input
            type='text'
            value={tempFirstName}
            onChange={e => setTempFirstName(e.target.value)} />
        </label>
        <label>Last Name:
          <input
            type='text'
            value={tempLastName}
            onChange={e => setTempLastName(e.target.value)} />
        </label>
        <label>Street:
          <input
            type='text'
            value={tempStreet}
            onChange={e => setTempStreet(e.target.value)} />
        </label>
        <label>City:
          <input
            type='text'
            value={tempCity}
            onChange={e => setTempCity(e.target.value)} />
        </label>
        <label>State:
          <input
            type='text'
            value={tempState}
            onChange={e => setTempState(e.target.value)} />
        </label>
        <label>Zip Code:
          <input
            type='text'
            minLength="5"
            maxLength="5"
            value={tempZip}
            onChange={e => setTempZip(e.target.value)} />
        </label>
        <button type='submit' >Submit</button>
      </form>
    </>
  )
}

export default EditAddress;