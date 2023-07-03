import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export function UserRow({ worker, removeFromData }) {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }
    async function deleteElement() {
        setAuthToken(localStorage.getItem("token"))
        await axios.delete('/worker/' + worker.id)
        removeFromData(worker.id)
    }

    async function saveChanges() {
        console.log(inputs)
        //fetch1: put zapisujacy specjalizacje
        //fetch2: zmiana czy jest adminem
    }

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "isAdmin")
            if (inputs.isAdmin === "on")
                value = "off"
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        setInputs(values => ({ ...values, ["isAdmin"]: worker.user.role === 2 ? "on" : "off" }))
        setInputs(values => ({ ...values, ["specialization"]: worker.specialization }))
    }, [])

    return (
        <tr>
            <td>{worker.id ?? ""}</td>
            <td>{worker.firstName ?? ""}</td>
            <td>{worker.lastName ?? ""}</td>
            <td>{(() => {
                switch (worker.specialization) {
                    case 0: return "electronics"
                    case 1: return "printers"
                }
            })()}</td>
            <td>
                <select name="specialization" value={inputs.specialization || ""} onChange={handleChange}>
                    <option value="0">electronics</option>
                    <option value="1">printers</option>
                </select>
            </td>
            <td>
                {worker.user.role === 2 ?
                    <input type="checkbox" name="isAdmin" onChange={handleChange} checked />
                    : <input type="checkbox" name="isAdmin" onChange={handleChange} />}    
                
            </td>
            <td>
                {localStorage.getItem("role") > 0 && <button className='button-class' onClick={saveChanges}>ZAPISZ ZMIANY</button>}
                {localStorage.getItem("role") > 0 && <button className='button-class' onClick={deleteElement}>USUŃ</button>}
            </td>
        </tr>
    )
}