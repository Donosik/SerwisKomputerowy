import { NavMenu } from "../Components/NavMenu";
import { UserRow } from "../Components/UserRow"
import "../Css/EditUser.css"
import axios from "axios"
import { useState, useEffect } from "react"

export function EditUser() {
    const [data, setData] = useState([])
    const [role, setRole] = useState(0)

    const fetchWorkers = async () => {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/worker')
        setData(result.data)
    }

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    //async function deleteWorker(workerId) {
    //    setAuthToken(localStorage.getItem("token"))
    //    await axios.delete('/worker/' + workerId)
    //    window.location.reload()
    //}

    function removeFromData(index) {
        const newData = data.filter((_, i) => i !== index)
        setData(newData)
        window.location.reload()
    }

    useEffect(() => {
        fetchWorkers()
        setRole(Number(localStorage.getItem("role")))
    }, [])

    return (
        <>
            <NavMenu />

            Szukaj po Loginie:<input /> <button className="button-class">Szukaj</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Aktualna Specjalizacja</th>
                        <th>Nowa Specjalizacja</th>
                        <th>Czy admin</th>
                        <th>AKCJA</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((worker, id) => (
                        <UserRow worker={worker} key={worker.id} removeFromData={removeFromData} />
                    ))}
                </tbody>
            </table>
            <br />
        </>
    )
}
