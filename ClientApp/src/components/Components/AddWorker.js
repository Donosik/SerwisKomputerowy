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
                        <option value="">Wybierz specjalizację</option>
                        <option value="Specjalizacja 1">Specjalizacja 1</option>
                        <option value="Specjalizacja 2">Specjalizacja 2</option>
                        <option value="Specjalizacja 3">Specjalizacja 3</option>
                    </select>
                </div>
                <br/>
                <button class="button-class" type="submit">DODAJ DO BAZY</button>
            </form>
        </>
    );
}