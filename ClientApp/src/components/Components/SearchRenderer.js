﻿import { useState, useEffect } from "react";
import axios from "axios"
import { RepairRow } from "./RepairRow"
import "../Css/repair.css"

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

    function removeFromData(index)
    {
        const newData=data.filter((_,i)=>i!==index)
        setData(newData)
        window.location.reload()
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
                        {data.filter(filterBySearchQuery).map((repair, id) => (
                            <RepairRow repair={repair} key={repair.id} removeFromData={removeFromData}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}