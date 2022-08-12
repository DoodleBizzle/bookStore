import { useState, createContext, useEffect } from "react"

export const authContext = createContext()
//TODO modularize fetch
const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    
    useEffect(()=>{
        (async ()=>{
            const response = await fetch('/api/users/authenticate',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            if (result.user) setUser(result.user) 
        })()
    },[token])

    const updateAuth = (user, token) => {
        setToken(token)
        setUser(user)
        localStorage.setItem('token', token)
    }

    const contextValue = {
        token,
        setToken,
        user,
        setUser,
        updateAuth,
        isLoggedIn : Boolean(user)
    }

    return <>
        <authContext.Provider value={contextValue}>
            {children}
        </authContext.Provider>
    </>

}

export default AuthProvider