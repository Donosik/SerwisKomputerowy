import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Css/register.css";

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export function Register() {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [registerFailed, setRegisterFailed] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja imienia i nazwiska
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setRegisterFailed("Znaki specjalne i liczby nie są dopuszczone w imieniu i nazwisku");
            return;
        }

        try {
            if (
                login.length >= 3 &&
                password.length >= 3 &&
                firstName.length >= 1 &&
                lastName.length >= 1
            ) {
                const response = await axios.post("/user/register", {
                    login,
                    password,
                    firstName,
                    lastName,
                });

                navigate("/logowanie");
                setRegisterFailed("");
            } else if (firstName.length <= 1 || lastName.length <= 1) {
                setRegisterFailed("Pola imię i nazwisko muszą być wypełnione");
            } else {
                setRegisterFailed("Login i hasło muszą mieć minimum 3 znaki");
            }
        } catch (error) {
            setRegisterFailed("Podany login już istnieje w bazie");
            console.log(error);
        }
    };

    return (
        <>
            <div className="auth-page">
                <div className="navBar">
                    <h1 className="text-welcome">WWW.KOMPUTEROWO.PL</h1>
                </div>
                <div className="container page d-flex justify-content-center align-items-center min-vh-100">
                    <div className="row">
                        <div className="reg-box">
                            <h2 className="text-login">REJESTRACJA</h2>
                            <h5 className="text-login2">
                                1. Login musi być unikalny, min 3 znaki
                                <br />
                                2. Hasło min 3 znaki<br />
                                3. Imie i nazwisko muszą zawierać tylko litery
                            </h5>
                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Login"
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={login}
                                            onChange={(e) => setLogin(e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Imię"
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            pattern="[A-Za-z\s]*"
                                            title="Imię nie może zawierać liczb ani znaków specjalnych"
                                            required
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Nazwisko"
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            pattern="[A-Za-z\s]*"
                                            title="Nazwisko nie może zawierać liczb ani znaków specjalnych"
                                            required
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Hasło"
                                            className="form-control form-control-lg"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </fieldset>

                                    <div className="d-flex justify-content-center align-items-center">
                                        <button
                                            className="button-login btn btn-lg pull-xs-right"
                                            onClick={handleSubmit}
                                        >
                                            Zarejestruj się
                                        </button>
                                    </div>
                                    <div className="forgot-pass d-flex justify-content-center align-items-center">
                                        <a href="/logowanie"> Masz już konto?</a>
                                    </div>
                                    <div className="login-failed d-flex justify-content-center align-items-center">
                                        <br />
                                        {registerFailed}
                                    </div>
                                    <div className="forgot-pass d-flex justify-content-center align-items-center"></div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
