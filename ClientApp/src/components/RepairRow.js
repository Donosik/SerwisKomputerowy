

export function RepairRow ({ repair }) {


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
                {localStorage.getItem("role") > 0 && <button className='label-button'>USUŃ</button>}
            </td>
        </tr>
    )
}