import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export function RepairRow ({ repair,removeFromData }) {
    const navigate = useNavigate()

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }
    function editElement()
    {
        navigate('/naprawy/edycja/' + repair.id)
    }
    async function deleteElement()
    {
        setAuthToken(localStorage.getItem("token"))
        await axios.delete('/repair/'+repair.id)
        removeFromData(repair.id)
    }
    let status = () => {
        return repair.status
    }

    function castToString(status) {
        if (status === 0) {
            return 'skonczone'
        }
        else if (status === 1) {
            return 'przyjete'
        }
        //TODO: dorobic statusy
        // Pamietac ze na backendzie tez sa te wartosci
    }
    
    return (
        <tr>
            <td>{repair.id}</td>
            <td>{ castToString(repair.status) }</td>
            <td>{ repair.client.firstName ?? "-" }</td>
            <td>{ repair.client.lastName ?? "-" }</td>
            <td>{ repair.equipment.name ?? "-" }</td>
            <td>
                {localStorage.getItem("role") > 0 && <button className='label-button' onClick={editElement}>EDYTUJ</button>}
                <button className='label-button'>SZCZEGÓŁY</button>
                {localStorage.getItem("role") > 0 && <button className='label-button' onClick={deleteElement}>USUŃ</button>}
            </td>
        </tr>
    )
}