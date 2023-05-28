import axios from "axios"

import "./login.css"

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

//TODO: endpoint dla tego axiosa
const handleSubmit = (login, password) => {
    const loginPayload = {
        login: "admin",
        password: "123"
    }

    axios.post("/user", loginPayload)
        .then(response => {
            const token = response.data.token;

            localStorage.setItem("token", token)

            setAuthToken(token)
            console.log(token)
            console.log("DHUIDHAWOUIDAWFD")

            window.location.href = "/"
        }).catch(console.log("duhiafbae"))
}

export function Login() {
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
                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Login"
                                            className="form-control form-control-lg"
                                            type="text"
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Hasło"
                                            className="form-control form-control-lg"
                                            type="password"/>
                                    </fieldset>

                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="button-login btn btn-lg pull-xs-right" type="submit">
                                            Zaloguj
                                        </button>

                                    </div>
                                    <div className="forgot-pass d-flex justify-content-center align-items-center">
                                        <a> Zapomniałeś hasła?</a>
                                    </div>
                                    <div className="forgot-pass d-flex justify-content-center align-items-center">
                                        <a> Nie posiadasz konta?</a>
                                    </div>

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
