import "./login.css"

export function Login() {
    return (
        <>
            <div className="auth-page">
                <div className="container page d-flex justify-content-center align-items-center min-vh-100">
                    <div className="row">
                        <div className="login-box">
                            <h1 className="text-login">Logowanie</h1>
                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Email"
                                            className="form-control form-control-lg"
                                            type="text"
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            placeholder="Password"
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
