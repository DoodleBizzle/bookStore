import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import { profileContext } from "./ProfileProvider";
import { addingNewAddress } from "../API-Fetch/profileAPI";

const AddressForm = () => {
  const {token, user} = useContext(authContext);
  const { address, setAddress,addNewAddress, setAddNewAddress } = useContext(profileContext);
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
    { addNewAddress ?
      <>
      <h2>Add Address</h2>
      <form className="row row-cols-1 gap-3 mb-3" onSubmit={handleSubmit}>
        <label>First Name:
          <input
            type='text'
            value={firstName}
            onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>Last Name:
          <input
            type='text'
            value={lastName}
            onChange={e => setLastName(e.target.value)} />
        </label>
        <label>Street:
          <input
            type='text'
            value={street}
            onChange={e => setStreet(e.target.value)} />
        </label>
        <label>City:
          <input
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)} />
        </label>
        <label>State:
          <input
            type='text'
            value={state}
            onChange={e => setState(e.target.value)} />
        </label>
        <label>Zip Code:
          <input
            type='text'
            minLength="5"
            maxLength="5"
            value={zip}
            onChange={e => setZip(e.target.value)} />
        </label>
      </form>
      <button type='submit' className="btn btn-outline-dark" >Submit</button>
      <button type="button" className="btn btn-outline-dark ms-3" onClick={()=>{setAddNewAddress(false)}} >Cancel</button>
    </>
    :
      <button  type="button" className="btn btn-outline-dark" onClick={()=>{setAddNewAddress(true)}} >Add Address</button>
    }
  </>
  )
}

export default AddressForm;