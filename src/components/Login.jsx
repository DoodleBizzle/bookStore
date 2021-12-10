import { useState, useContext } from "react"
import {useHistory} from 'react-router-dom'
import { authContext } from "./AuthProvider"

const Login = () => {
    const history = useHistory()
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const {updateAuth} = useContext(authContext)

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
            history.push('/')
        }
        attemptLogin()
    }

    return <>
        <div className='pageContainer'>
            <div className='loginFormContainer'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Email' value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                    <input type='password' placeholder='Password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
                    <button type='submit'>Click me!</button>
                </form>
            </div>
        </div>
    </>
}

export default Login