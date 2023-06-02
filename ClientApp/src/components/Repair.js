import { NavMenu } from "./NavMenu";
import { useState, useEffect } from "react";
import axios from "axios"

import { RepairRow } from "./RepairRow"
import "./repair.css"

export function Repair() {
    const [renderBool, setRenderBool] = useState(true)
    function searchHandler() {
        console.log("szukaj")
        setRenderBool(true)
    }
    function createHandler() {
        console.log("dodaj")
        setRenderBool(false)
    }

    return (
        <>
            <NavMenu />

            <p class='services-title'> NAPRAWY </p>
            <button className='button-add' onClick={searchHandler}>SZUKAJ</button>
            <button className='button-add' onClick={createHandler}>DODAJ</button>
            <button className='button-add' onClick={searchHandler}>WYŚWIETL WSZYSTKIE</button>


            <br /><br />
            {renderBool ? <SearchRenderer /> : <CreateRenderer />}
        </>
    );
}

function SearchRenderer() {
    const [data, setData] = useState([])

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
        console.log(result.data)
        //console.log(data)
    }

    useEffect(
        fetchRepairs
        , [])

    const gigaLOG = () => {
        console.log("DUPAAAAA")
        console.log(data)
    }

    useEffect(gigaLOG
    ,[data])
    
    return (
        <>

            <div>
                <form>
                    <label>
                        Numer naprawy:
                        <input type="text" />
                    </label>
                    <button type="submit">WYSZUKAJ</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Numer naprawy</th>
                            <th>Status</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Nazwa sprzętu</th>
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
                                <button className='label-button'>EDYTUJ</button>
                                <button className='label-button'>SZCZEGÓŁY</button>
                                <button className='label-button'>USUŃ</button>
                            </td>
                        </tr>
                        <tr>
                            <td>00000</td>
                            <td>Gotowe do odbioru</td>
                            <td>Jan</td>
                            <td>Kowalski</td>
                            <td>Komputerek xyz</td>
                            <td>
                                <button className='label-button'>EDYTUJ</button>
                                <button className='label-button'>SZCZEGÓŁY</button>
                                <button className='label-button'>USUŃ</button>
                            </td>
                        </tr>
                        {data.map((repair, id) => (
                        <RepairRow repair={repair} key={id} />
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}

function CreateRenderer() {
    return (
        <>
            render dodawania
        </>
    )
}