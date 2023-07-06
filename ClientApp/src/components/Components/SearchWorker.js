import axios from "axios";
import {UserRow} from "./UserRow";
import {useEffect, useState} from "react";

export function SearchWorker()
{
    const [data, setData] = useState([])
    const [role, setRole] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.currentTarget.value)
    }

    const fetchWorkers = async () => {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/worker')
        setData(result.data)
    }

    const filterBySearchQuery = (repair) => {
        if (searchQuery === "") {
            return repair
        }
        else if (repair.lastName.toString().toLowerCase().includes(searchQuery.toLowerCase())) {
            return repair
        }
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

    return(
        <>
            <p>WYSZUKIWARKA PRACOWNIKÓW <br/></p>            Szukaj po Nazwisku:<input onChange={handleSearchQueryChange} />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Aktualna Specjalizacja</th>
                    <th>Nowa Specjalizacja</th>
                    <th>Czy admin</th>
                    <th>AKCJA</th>
                </tr>
                </thead>
                <tbody>
                {data.filter(filterBySearchQuery).map((worker, id) => (
                    <UserRow worker={worker} key={worker.id} removeFromData={removeFromData} />
                ))}
                </tbody>
            </table>
            <br />
        </>
    )
}