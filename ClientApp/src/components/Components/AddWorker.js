import { useState } from "react";
import axios from "axios";

export function AddWorker() {
    const [login, setLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [specialization, setSpecialization] = useState("0");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const spec = parseInt(specialization);

        if (
            firstName.length < 3 ||
            lastName.length < 3 ||
            !/^[a-zA-Z]+$/.test(firstName) ||
            !/^[a-zA-Z]+$/.test(lastName)
        ) {
            setErrorMessage(
                "Imię i nazwisko powinny zawierać minimum 3 litery (bez liczb i znaków specjalnych)."
            );
            return;
        }

        if (login.length < 3 || password.length < 3) {
            setErrorMessage("Login i hasło powinny zawierać minimum 3 znaki.");
            return;
        }

        try {
            // Sprawdzenie unikalności loginu

            const response = await axios.post("/worker", {
                firstName,
                lastName,
                birthdate,
                specialization: spec,
                user: {
                    login,
                    password,
                    role: 1,
                },
            });
            if (response.status=== 400) {
            setErrorMessage("Podany login jest już zajęty.");}

            // Pomyślnie dodano pracownika
            setLogin("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setBirthdate("");
            setSpecialization("0");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Pracownik o podanym loginie juz istnieje");
        }
    };

    // Define the styles as JavaScript objects
    const formStyle = {
        border: "1px solid black",
        padding: "20px",
        marginRight: "800px",
    };

    const inputStyle = {
        marginBottom: "10px",
        padding: "5px",
        width: "100%",
    };

    const selectStyle = {
        marginBottom: "10px",
        padding: "5px",
        width: "100%",
    };

    const errorStyle = {
        textAlign: "center",
        color: "red",
    };

    return (
        <>
            <form style={formStyle} onSubmit={handleFormSubmit}>
                <p className="services-title"> DODAWANIE PRACOWNIKA </p>
                <span>
          1. Imię i nazwisko min 3 litery (nie dopuszcza się liczb i znaków) <br />
          2. Hasło i login minimum 3 znaki<br />
          3. Login musi być unikalny <br />
          <br />
        </span>
                {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Login:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input
                        style={inputStyle}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Imię:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nazwisko:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data urodzenia:</label>
                    <input
                        style={inputStyle}
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Specjalizacja:</label>
                    <select
                        style={selectStyle}
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                    >
                        <option value="0">elektronik</option>
                        <option value="1">drukarki</option>
                        <option value="2">AGD</option>
                        <option value="3">telefony</option>
                        <option value="4">oprogramowanie</option>
                        <option value="5">sieci komputerowe</option>
                        <option value="6">odzyskiwanie danych</option>
                    </select>
                </div>
                <br />
                <button className="button-class" type="submit">
                    DODAJ DO BAZY
                </button>
            </form>
        </>
    );
}

