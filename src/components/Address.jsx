import { useContext } from "react"
import { profileContext } from "./ProfileProvider"
import AddressForm from "./AddressForm"

const Address = () => {
  const {address, setEditAddress} = useContext(profileContext)

  return (
    <>
      {Object.keys(address).length === 0 ?
        <AddressForm/>
        :
        <>
        <h2>Address</h2>
        <h4>First Name: {`${address.first_name}`}</h4>
        <h4>Last Name: {`${address.last_name}`}</h4>
        <h4>Street: {`${address.street_address}`}</h4>
        <h4>City: {`${address.city}`}</h4>
        <h4>State: {`${address.state}`}</h4>
        <h4>Zip code: {`${address.zip_code}`}</h4>
        <button onClick={()=> setEditAddress(true)} >Edit Address</button>
        </>
      }
    </>
  )
}

export default Address;