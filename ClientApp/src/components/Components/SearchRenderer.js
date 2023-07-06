import { useState, useEffect } from "react";
import axios from "axios"
import { RepairRow } from "./RepairRow"
import "../Css/repair.css"

export function SearchRenderer() {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [role, setRole] = useState(0)
    const [checked,setChecked]= useState(false)
    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    const fetchRepairs = async () => {
        setAuthToken(localStorage.getItem("token"))
        let result
        if(localStorage.getItem("role") > 0)
            result=await axios.get('/repair/table/'+checked)
        else {
            const me=await axios.get('/user/me')
            const myId=me.data.id
            result=await axios.get('/repair/client/'+myId)
        }
        await setData(result.data)
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
        , [checked])



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
    
    function checkedChange(e)
    {
        if(checked)
            setChecked(false)
        else 
            setChecked(true)
    }

    return (
        <>
            <p>WYSZUKIWARKA NAPRAW <br/></p>
            <div>
                
                <form>
                    <label>
                        Numer naprawy:
                        <input type="text" onChange={handleSearchQueryChange} />
                        <br />
                        Pokaż wszystkie naprawy:
                        <input type="checkbox" onChange={checkedChange}/>
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