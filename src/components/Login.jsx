import { useState, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { authContext } from "./AuthProvider"
import { attemptLogin, demoLogin } from "../API-Fetch/usersAPI"

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

    const handleDemo = async () => {

        const demo = await demoLogin()

        setApiMessage(demo.message)
        updateAuth(demo.user, demo.token)

        if (demo.message === "You're logged in!") { setTimeout(() => history.push('/'), 1000) }
    }

    return <>
        <div className="container">
            <h1 className="text-center">User Login</h1>
            <div className="row row-cols-3 justify-content-center">
                <form className='row justify-content-center' onSubmit={handleSubmit}>
                    <input className='mb-3' type='text' placeholder='Email' value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                    <input className='mb-3' type='password' placeholder='Password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
                    <div className="text-center">
                    <button className='btn btn-outline-dark' type='submit'>Login!</button>
                    <button className='btn btn-outline-dark ms-3' type='button' onClick={handleDemo} >Demo User</button>
                    </div>
                </form>
            </div>
        </div>
        <h1 className='apiMessage text-center'>{apiMessage}</h1>
    </>
}

export default Login