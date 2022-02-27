import { useContext, useState } from "react";
import { authContext } from "./AuthProvider"
import { profileContext } from "./ProfileProvider";
import EditAddress from "./EditAddress";

const Profile = () => {
  const {user} = useContext(authContext)
  const {address, editAddress, setEditAddress} = useContext(profileContext)
  
  
  const editClick = () => {
    setEditAddress(true)
  }

  return (
    <>
      <h3>Email: {`${user.email}`}</h3>
      { editAddress 
        ?
        <EditAddress />
        :
        <>
        <h2>Address</h2>
        <h4>First Name: {`${address.first_name}`}</h4>
        <h4>Last Name: {`${address.last_name}`}</h4>
        <h4>Street: {`${address.street_address}`}</h4>
        <h4>City: {`${address.city}`}</h4>
        <h4>State: {`${address.state}`}</h4>
        <h4>Zip code: {`${address.zip_code}`}</h4>
        <button onClick={editClick} >Edit Address</button>
        </>
      }
    </>
  )
}

export default Profile;