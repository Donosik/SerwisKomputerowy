import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./login.css"

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

export function Login() {

    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginFailed, setIsLoginFailed] = useState(false)

    const checkRole = async () => {
        const result=await axios.get('/user/me')
        localStorage.setItem("role", result.data.role)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/user/login', { login, password })
            const token = response.data

            localStorage.setItem("token", token)
            setAuthToken(token)
            await checkRole()

            navigate("/naprawy")
            setIsLoginFailed(false)
            
        } catch (error) {
            setIsLoginFailed(true)
            console.log(error)
        }
    }

    
    return (
        <>
           
            <div className="auth-page">
                <div className="navBar">
                <h1 className="text-welcome">WWW.KOMPUTEROWO.PL</h1>
                </div>
                <div className="container page d-flex justify-content-center align-items-center min-vh-100">
                    <div className="row">
                        <div className="login-box">
                            <h2 className="text-login">LOGOWANIE</h2>
                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Login"
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={ login }
                                            onChange={ e => setLogin(e.target.value) }
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input   
                                            placeholder="Hasło"
                                            className="form-control form-control-lg"
                                            type="password"
                                            value={ password }
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </fieldset>

                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="button-login btn btn-lg pull-xs-right" onClick={handleSubmit}>
                                            Zaloguj
                                        </button>

                                    </div>
                                    <div className="forgot-pass d-flex justify-content-center align-items-center">
                                        <a href="/rejestracja"> Nie posiadasz konta?</a>
                                    </div>
                                    {isLoginFailed ?
                                        <div className="login-failed d-flex justify-content-center align-items-center">Login failed</div>
                                        : null}
                                    <div className="forgot-pass d-flex justify-content-center align-items-center">
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
