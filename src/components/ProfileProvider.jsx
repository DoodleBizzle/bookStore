import { useState, createContext, useEffect, useContext } from "react";
import {authContext} from "./AuthProvider"
import { getUserAddress } from "../API-Fetch/profileAPI";

export const profileContext = createContext();

const ProfileProvider = ({ children }) => {
  const {token} = useContext(authContext)
  const [address, setAddress] = useState({})
  const [editAddress, setEditAddress] = useState(false)

  useEffect( async () => {
    
      const result = await getUserAddress(token)
      setAddress(result)
    
  },[token, editAddress])
  
  const contextValue = {
    address,
    setAddress,
    editAddress,
    setEditAddress
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