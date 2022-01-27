import { useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { authContext } from "./AuthProvider"
import { attemptLogin } from "../API-Fetch/loginAPI"
import '../styles/login.css'

const Login = () => {
    const history = useHistory()
    const [apiMessage, setApiMessage] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const { updateAuth } = useContext(authContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const login = await attemptLogin(emailInput, passwordInput)

        setApiMessage(login.message)
        updateAuth(login.user, login.token)
        
        if (login.message === "You're logged in!") { setTimeout(() => history.push('/'), 1000) }
    }

    return <>
        <form className='form' onSubmit={handleSubmit}>
            <input className='form-input' type='text' placeholder='Email' value={emailInput} onChange={e => setEmailInput(e.target.value)} />
            <input className='form-input' type='password' placeholder='Password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
            <button className='form-submit' type='submit'>Login!</button>
        </form>
        <h1 className='apiMessage'>{apiMessage}</h1>
    </>
}

export default Login