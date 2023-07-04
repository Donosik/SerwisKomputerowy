import { useState } from "react";
import '../Css/addWorker.css';
export function AddWorker() {
    const [login, setLogin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [specialization, setSpecialization] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({
            login,
            firstName,
            lastName,
            birthdate,
            specialization,
        });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <p className='services-title'> DODAWANIE PRACOWNIKA </p>
                <div>
                    <label>Login:</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Imię:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nazwisko:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data urodzenia:</label>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Specjalizacja:</label>
                    <select
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
                <br/>
                <button class="button-class" type="submit">DODAJ DO BAZY</button>
            </form>
        </>
    );
}