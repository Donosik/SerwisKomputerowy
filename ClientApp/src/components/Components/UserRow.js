import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"

export function UserRow({worker, removeFromData}) {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})
    const [checked,setChecked] = useState(false)

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }

    async function deleteElement() {
        setAuthToken(localStorage.getItem("token"))
        await axios.delete('/worker/' + worker.id)
        removeFromData(worker.id)
    }

    async function saveChanges() {
        let isAdmin
        if (inputs.isAdmin === "on")
            isAdmin = true
        else
            isAdmin = false
        await axios.put('worker/' + worker.id + '/specialization/' + inputs.specialization)
        await axios.put('worker/' + worker.id + '/admin/' + isAdmin)
        window.location.reload()
    }

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "isAdmin")
        {
            setChecked(true)
            if (inputs.isAdmin === "on") 
            {
                value = "off"
                setChecked(false)
            }
        }
        setInputs(values => ({...values, [name]: value}))
    }

    useEffect(() => {
        setInputs(values => ({...values, ["isAdmin"]: worker.user.role === 2 ? "on" : "off"}))
        worker.user.role === 2 ? setChecked(true) : setChecked(false)
        setInputs(values => ({...values, ["specialization"]: worker.specialization}))
    }, [])

    return (
        <tr>
            
            <td>{worker.id ?? ""}</td>
            <td>{worker.user.login ?? ""}</td>
            <td>{worker.firstName ?? ""}</td>
            <td>{worker.lastName ?? ""}</td>
            <td>{(() => {
                switch (worker.specialization) {
                    case 0:
                        return "elektronik"
                    case 1:
                        return "drukarki"
                    case 2:
                        return "AGD"
                    case 3:
                        return "telefony"
                    case 4:
                        return "oprogramowanie"
                    case 5:
                        return "sieci komputerowe"
                    case 6:
                        return "odzyskiwanie danych"
                }
            })()}</td>
            <td>
                <select name="specialization" value={inputs.specialization || ""} onChange={handleChange}>
                    <option value="0">elektronik</option>
                    <option value="1">drukarki</option>
                    <option value="2">AGD</option>
                    <option value="3">telefony</option>
                    <option value="4">oprogramowanie</option>
                    <option value="5">sieci komputerowe</option>
                    <option value="6">odzyskiwanie danych</option>
                </select>
            </td>
            <td>
                <input type="checkbox" name="isAdmin" onChange={handleChange} checked={checked === true}/>
            </td>
            <td>
                {localStorage.getItem("role") > 0 &&
                    <button className='button-class' onClick={saveChanges}>ZAPISZ ZMIANY</button>}
                {localStorage.getItem("role") > 0 &&
                    <button className='button-class' onClick={deleteElement}>USUŃ</button>}
            </td>
        </tr>
    )
}