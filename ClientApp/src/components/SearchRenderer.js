import { useState, useEffect } from "react";
import axios from "axios"
import { RepairRow } from "./RepairRow"
import "./repair.css"

export function SearchRenderer() {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [role, setRole] = useState(0)

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    const fetchRepairs = async () => {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/repair/table')
        setData(result.data)
    }

    useEffect(() => {
        fetchRepairs()
        setRole(Number(localStorage.getItem("role")))
    }
        , [])



    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.currentTarget.value)
    }

    const filterBySearchQuery = (repair) => {
        if (searchQuery === "") {
            return repair
        }
        else if (repair.id.toString().includes(searchQuery)) {
            return repair
        }
    }



    return (
        <>

            <div>
                <form>
                    <label>
                        Numer naprawy:
                        <input type="text" onChange={handleSearchQueryChange} />
                    </label>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Numer naprawy</th>
                            <th>Status</th>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Nazwa sprzetu</th>
                            <th>Działania</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>00000</td>
                            <td>Gotowe do odbioru</td>
                            <td>Jan</td>
                            <td>Kowalski</td>
                            <td>Komputerek xyz</td>
                            <td>
                                {role > 0 && <button className='label-button'>EDYTUJ</button>}
                                <button className='label-button'>SZCZEGÓŁY</button>
                                {role > 0 && <button className='label-button'>USUŃ</button>}
                            </td>
                        </tr>
                        <tr>
                            <td>00000</td>
                            <td>Gotowe do odbioru</td>
                            <td>Jan</td>
                            <td>Kowalski</td>
                            <td>Komputerek xyz</td>
                            <td>
                                {(role > 0) ? <button className='label-button'>EDYTUJ</button>:null}
                                <button className='label-button'>SZCZEGÓŁY</button>
                                {role > 0 && <button className='label-button'>USUŃ</button>}
                            </td>
                        </tr>
                        {data.filter(filterBySearchQuery).map((repair, id) => (
                            <RepairRow repair={repair} key={id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}