import { useContext } from "react";
import { authContext } from "./AuthProvider"
import { profileContext } from "./ProfileProvider";
import EditAddress from "./EditAddress";
import Address from "./Address";

const Profile = () => {
  const {user} = useContext(authContext)
  const {address, editAddress, setEditAddress} = useContext(profileContext)
  

  return (
    <>
      { user === null ?
        null
        :
        <h3>Email: {`${user.email}`}</h3>
      }
      { editAddress 
        ?
        <EditAddress />
        :
        <Address/>
      }
    </>
  )
}

export default Profile;