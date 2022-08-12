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
    setAddress(newAddress)
    setEditAddress(false)
  }

  return (
    <>
      <h2 className="text-center">Change Address</h2>
      <div className="row row-cols-3 justify-content-center">
        <form className="row mb-3 justify-content-center" onSubmit={handleEditSubmit}>
          <label>First Name:
          </label>
          <input
            className="mb-3"
            type='text'
            value={tempFirstName}
            onChange={e => setTempFirstName(e.target.value)} />
          <label>Last Name:
          </label>
          <input
            className="mb-3"
            type='text'
            value={tempLastName}
            onChange={e => setTempLastName(e.target.value)} />
          <label>Street:
          </label>
          <input
            className="mb-3"
            type='text'
            value={tempStreet}
            onChange={e => setTempStreet(e.target.value)} />
          <label>City:
          </label>
          <input
            className="mb-3"
            type='text'
            value={tempCity}
            onChange={e => setTempCity(e.target.value)} />
          <label>State:
          </label>
          <input
            className="mb-3"
            type='text'
            value={tempState}
            onChange={e => setTempState(e.target.value)} />
          <label>Zip Code:
          </label>
          <input
            className="mb-3"
            type='text'
            minLength="5"
            maxLength="5"
            value={tempZip}
            onChange={e => setTempZip(e.target.value)} />
          <div className="text-center">
            <button
              type='submit'
              className="btn btn-outline-dark" >Submit</button>
            <button
              type="button"
              className="btn btn-outline-dark ms-3"
              onClick={() => { setEditAddress(false) }} >Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditAddress;