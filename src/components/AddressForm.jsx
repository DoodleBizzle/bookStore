import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import { profileContext } from "./ProfileProvider";
import { addingNewAddress } from "../API-Fetch/profileAPI";

const AddressForm = () => {
  const { token, user } = useContext(authContext);
  const { address, setAddress, addNewAddress, setAddNewAddress } = useContext(profileContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addedAddress = await addingNewAddress(
      token,
      user.id,
      firstName,
      lastName,
      street,
      city,
      state,
      zip
    )
    setAddress(addedAddress)
    setAddNewAddress(false)
  }

  return (
    <>
      {addNewAddress ?
        <>
          <h2 className="text-center">Add Address</h2>
          <div className="row row-cols-3  justify-content-center">
            <form className="row mb-3 justify-content-center" onSubmit={handleSubmit}>
              <label>First Name:
              </label>
              <input
                className="mb-3"
                type='text'
                value={firstName}
                onChange={e => setFirstName(e.target.value)} />
              <label>Last Name:
              </label>
              <input
                className="mb-3"
                type='text'
                value={lastName}
                onChange={e => setLastName(e.target.value)} />
              <label>Street:
              </label>
              <input
                className="mb-3"
                type='text'
                value={street}
                onChange={e => setStreet(e.target.value)} />
              <label>City:
              </label>
              <input
                className="mb-3"
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)} />
              <label>State:
              </label>
              <input
                className="mb-3"
                type='text'
                value={state}
                onChange={e => setState(e.target.value)} />
              <label>Zip Code:
              </label>
              <input
                className="mb-3"
                type='text'
                minLength="5"
                maxLength="5"
                value={zip}
                onChange={e => setZip(e.target.value)} />
              <div className="text-center">
                <button
                  type='submit'
                  className="btn btn-outline-dark" >Submit</button>
                <button
                  type="button"
                  className="btn btn-outline-dark ms-3"
                  onClick={() => { setAddNewAddress(false) }} >Cancel</button>
              </div>
            </form>
          </div>
        </>
        :
        <button type="button" className="btn btn-outline-dark" onClick={() => { setAddNewAddress(true) }} >Add Address</button>
      }
    </>
  )
}

export default AddressForm;