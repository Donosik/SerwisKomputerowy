import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {NavMenu} from "../Components/NavMenu";


const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

export function Raport() {
    return (
        <>
            <NavMenu />
            <div>
                <p className='services-title'> RAPORTY </p>
                <label>
                    Data od:
                    <input
                        type="date"
                        name="acceptanceTime"
                    />
                </label>
                    <label>
                        Data do:
                        <input
                            type="date"
                            name="acceptanceTime"
                        />
                </label>
                Wybierz pracowika: <select></select> 
                ID naprawy: <select></select>
                ID klienta / Imię + Nazwisko: <select></select>
                
                <table>
                    <thead>
                    <tr>
                        <th>Pracownik</th>
                        <th>ID naprawy</th>
                        <th>Imię i nazwisko klienta</th>
                        <th>Data przyjęcia</th>
                        <th>Data skończenia</th>
                        <th>Części naprawione</th>
                        <th>Cena naprawy</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>John Smith</td>
                        <td>123456</td>
                        <td>Jan Kowalski</td>
                        <td>2023-06-15</td>
                        <td>2023-06-20</td>
                        <td>Turbina, Zawieszenie</td>
                        <td>$500</td>
                    </tr>
                    <tr>
                        <td>Jane Doe</td>
                        <td>789012</td>
                        <td>Anna Nowak</td>
                        <td>2023-06-25</td>
                        <td>2023-07-01</td>
                        <td>Silnik, Hamulce</td>
                        <td>$800</td>
                    </tr>
                    </tbody>
                </table> <br/>
                <button>Pobierz PDF</button>
        </div>    
            </>
    );
}
