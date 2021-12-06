import { useState, createContext } from "react"

export const authContext = createContext()

const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)

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