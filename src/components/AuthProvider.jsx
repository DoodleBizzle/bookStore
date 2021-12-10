import { useState, createContext, useEffect } from "react"

export const authContext = createContext()

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
            setUser(result.user)
            console.log(result)
        })()
    },[token])

    const updateAuth = (user, token) => {
        setToken(token)
        setUser(user)
        localStorage.setItem('token', token)
    }

    const contextValue = {
        token,
        user,
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