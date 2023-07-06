import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react"
import axios from "axios";
import {NavMenu} from "../Components/NavMenu";
import "../Css/details.css"

export function DetailsRepair() {
    const [inputs, setInputs] = useState({})

    let {id} = useParams()
    const navigate = useNavigate()
    const [repairData, setRepairData] = useState([])
    const [workers, setWorkers] = useState([])
    const [parts, setParts] = useState([])
    const [actions, setActions] = useState([])

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }

    async function getRepair() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/repair/' + id)
        await setRepairData(result.data)
    }

    async function getWorkers() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/worker/repair/' + id)
        await setWorkers(result.data)
    }

    async function getPart() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/part/repair/' + id)
        await setParts(result.data)
    }

    async function getAction() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/action/repair/' + id)
        await setActions(result.data)
    }

    useEffect(() => {
        getRepair()
        getWorkers()
        getPart()
        getAction()
    }, [])

    function castToString(status) {
        if (status === 0) {
            return 'skonczone'
        } else if (status === 1) {
            return 'przyjete'
        }
        //TODO: dorobic statusy
        // Pamietac ze na backendzie tez sa te wartosci
    }

    return (
        <>
            <NavMenu/>
            <br/>
            <hr/>
            <p>INFORMACJE O NAPRAWIE <br/></p>
            <hr/>
            <table>
                <thead>
                <tr>
                    <th>ID naprawy</th>
                    <th>Data przyjęcia</th>
                    <th>Data skończenia</th>
                    <th>Status</th>
                    <th>Czy gwarancja</th>
                    <th>Data gwarancji</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{repairData ? repairData.id : ''}</td>
                    <td>{repairData && repairData.acceptanceTime ? repairData.acceptanceTime.slice(0, 10) : ''} </td>
                    <td>{repairData && repairData.returnTime ? repairData.returnTime.slice(0, 10) : ''} </td>
                    <td>{castToString(repairData.status)}</td>
                    <td>{repairData ? (repairData.isGuarantee === true ? "tak" : "nie") : ''}</td>
                    <td>{repairData && repairData.guaranteeTime ? repairData.guaranteeTime.slice(0, 10) : '-'} </td>
                   
                </tr>
                </tbody>
            </table>
            <br/>
            <hr/>
            <p>OPIS NAPRAWY <br/></p>
            <hr/>
            <table>
                <thead>
                <tr>
                    <th>Pracownik</th>
                    <th>Rola pracowników</th>
                    <th>Czynności</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                {workers.map((worker) => (
                        <td key = {worker.id}>{worker.firstName + " " + worker.lastName}</td>
                ))}
                    {workers.map((worker) => (
                        <td key = {worker.id}>{(() => {
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
                    ))}
                {actions.map((action)=>(
                    <td key={action.id}>
                        {action ? action.description : ''}
                    </td>
                ))}
                </tr>
                </tbody>
            </table>
            <br/>
            <hr/>
            <p>INFORMACJE O CZĘŚCIACH <br/></p>
            <hr/>
            <table>
                <thead>
                <tr>
                    <th>Numer Seryjny</th>
                    <th>Nazwa Części</th>
                    <th>Koszt części</th>
                    <th>Koszt robocizny</th>
                </tr>
                </thead>
                <tbody>
                {parts.map((part) => (
                    <tr key={part.id}>
                        <td>{part ? part.serialNumber : ''}</td>
                        <td>{part ? part.partName : ''}</td>
                        <td>{part ? part.cost + " PLN": ''}</td>
                        <td>{part ? part.costOfWork + " PLN": ''}</td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td>RAZEM:</td>
                    <td> {parts ? parts.map(part => part.cost).reduce((cost, sum) => cost + sum, 0) + parts.map(part => part.costOfWork).reduce((costOfWork, sum) => costOfWork + sum, 0) + " PLN" : ''}</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <hr/>
            <p> INFORMACJE O SPRZĘCIE <br/></p>
            <hr/>
            <table>
                <thead>
                <tr className="table-title">
                    <th>Nazwa sprzętu</th>
                    <th>Typ sprzętu</th>
                    <th>Data produkcji</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{repairData.equipment ? repairData.equipment.name : ''}</td>
                    <td>{repairData.equipment ? repairData.equipment.type : ''}</td>
                    <td>{repairData.equipment && repairData.equipment.productionDate ? repairData.equipment.productionDate.slice(0, 10) : ''} </td>
                </tr>
                </tbody>
            </table>

            <br/>
            <hr/>
            <p> INFORMACJE O KLIENCIE <br/></p>
            <hr/>

            <table>
                <thead>
                <tr className="table-title">
                    <th>ID klienta</th>
                    <th>Klient</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{repairData.client ? repairData.client.id : ''}</td>
                    <td>{repairData.client ? repairData.client.firstName + " " + repairData.client.lastName : ''}</td>
                </tr>
                </tbody>
            </table>
            <br/>
        </>
    )
}