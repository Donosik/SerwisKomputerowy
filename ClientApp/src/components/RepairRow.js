import axios from "axios";


export function RepairRow ({ repair,removeFromData }) {

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }
    async function deleteElement()
    {
        setAuthToken(localStorage.getItem("token"))
        await axios.delete('/repair/'+repair.id)
        removeFromData(repair.id)
    }

    // TODO: Trzeba status na enuma przerobić
    return (
        <tr>
            <td>{repair.id}</td>
            <td>{ repair.status }</td>
            <td>{ repair.client.firstName ?? "-" }</td>
            <td>{ repair.client.lastName ?? "-" }</td>
            <td>{ repair.equipment.name ?? "-" }</td>
            <td>
                {localStorage.getItem("role") > 0 && <button className='label-button'>EDYTUJ</button>}
                <button className='label-button'>SZCZEGÓŁY</button>
                {localStorage.getItem("role") > 0 && <button className='label-button' onClick={deleteElement}>USUŃ</button>}
            </td>
        </tr>
    )
}