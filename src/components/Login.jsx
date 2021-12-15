import { useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { authContext } from "./AuthProvider"
import '../styles/login.css'

const Login = () => {
    const history = useHistory()
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const { updateAuth } = useContext(authContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        const attemptLogin = async () => {

            const apiResponse = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-type': 'Application/json' },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            })

            const parsedApiResponse = await apiResponse.json()
            updateAuth(parsedApiResponse.user, parsedApiResponse.token)
            if (parsedApiResponse) { history.push('/') }
        }
        attemptLogin()
    }

    return <>
        <form className='form' onSubmit={handleSubmit}>
            <input className='form-input' type='text' placeholder='Email' value={emailInput} onChange={e => setEmailInput(e.target.value)} />
            <input className='form-input' type='password' placeholder='Password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
            <button className='form-submit' type='submit'>Login!</button>
        </form>
    </>
}

export default Login