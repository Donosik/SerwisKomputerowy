import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export function PartRow({ part, removeFromData }) {
    const navigate = useNavigate()

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }

    function editElement() {
        navigate('/???/???/' + part.id)
    }

    async function deleteElement() {
        setAuthToken(localStorage.getItem("token"))
        await axios.delete('/part/' + part.id)
        removeFromData(part.id)
    }

    return (
        <tr>
            <td>{part.partName}</td>
            <td>{part.serialNumber}</td>
            <td>{part.cost}</td>
            <td>{part.costOfWork}</td>
            <td>DUPAAAA</td>
            <td>{part.isUsed === true ? "Tak" : "Nie"}</td>
            <td>
                <button className='button-class' onClick={editElement}>EDYTUJ</button>
                <button className='button-class' onClick={deleteElement}>USUŃ</button>
            </td>
        </tr>
    )
}