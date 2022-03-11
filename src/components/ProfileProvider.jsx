import { useState, createContext, useEffect, useContext } from "react";
import {authContext} from "./AuthProvider"
import { getUserAddress } from "../API-Fetch/profileAPI";

export const profileContext = createContext();

const ProfileProvider = ({ children }) => {
  const {token} = useContext(authContext)
  const [address, setAddress] = useState({})
  const [editAddress, setEditAddress] = useState(false)
  const [addNewAddress, setAddNewAddress] = useState(false)

  useEffect( async () => {
    
      const result = await getUserAddress(token)
      if (result.length !== 0){
      const userAddress = result[0]
      setAddress(userAddress)
      }
  },[token, editAddress,addNewAddress])
  
  const contextValue = {
    address,
    setAddress,
    editAddress,
    setEditAddress,
    addNewAddress,
    setAddNewAddress
  }; 

  return (
    <>
      <profileContext.Provider value={contextValue}>
        {children}
      </profileContext.Provider>
    </>
  );
};

export default ProfileProvider;