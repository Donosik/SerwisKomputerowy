import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import { NavMenu } from "../Components/NavMenu";
import "../Css/details.css"

export function DetailsRepair() {
    const [inputs, setInputs] = useState({})

    let { id } = useParams()
    const navigate = useNavigate()
    const [repairData, setRepairData] = useState()
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
        setRepairData(result.data)
    }

    async function getWorkers() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/worker/repair/' + id)
        setWorkers(result.data)
    }
    async function getPart() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/part/repair' + id)
        setParts(result.data)
    }

    async function getAction() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/action/repair' + id)
        setActions(result.data)
    }
    useEffect(() => {
        getRepair()
        getWorkers()
        getPart()
        getAction()
    }, [])

    return (
        <>
            <NavMenu />
            <br />
            <hr />
            <p>INFORMACJE O NAPRAWIE <br /></p>
            <hr />
            <table>
                <tr>
                    <th>ID naprawy</th>
                    <th>Data przyjęcia</th>
                    <th>Data skończenia</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>{repairData ? repairData.id : ''}</td>
                    <td>{repairData ? repairData.acceptanceTime : ''}</td>
                    <td>{repairData ? repairData.guaranteeTime : ''}</td>
                    <td>{repairData ? repairData.status : ''}</td>
                </tr>
            </table>
            <br />
            <hr />
            <p>OPIS NAPRAWY <br /></p>
            <hr />
            <table>
                <tr>
                    <th>Czynności</th>
                </tr>
                <tr>
                    <td>{actions ? actions.description : ''}</td>
               </tr> 
            </table>
            <br />
            <hr />
            <p>INFORMACJE O CZĘŚCIACH <br /></p>
            <hr />
            <table>
                <tr>
                    <th>Numer Seryjny</th>
                    <th>Nazwa Części</th>
                    <th>Koszt części</th>
                    <th>Koszt robocizny</th>
                </tr>
                {parts.map((part) => (
                    <tr key={part.id}>
                        <td>{ part.serialNumber}</td>
                        <td>{ part.partName}</td>
                        <td>{ part.cost}</td>
                        <td>{ part.costOfWork}</td>
                        <td>{ part.cost + part.costOfWork}</td>
                    </tr>
                ))}
                <tr>
                    <td>RAZEM: {parts.map(part => part.cost).reduce((cost, sum) => cost + sum) + parts.map(part => part.costOfWork).reduce((costOfWork, sum) => costOfWork + sum)}</td>
                </tr>
            </table>
            <br />
            <hr />
            <p> INFORMACJE O SPRZĘCIE <br /></p>
            <hr />
            <table>
                <tr className="table-title">
                    <th>Nazwa sprzętu</th>
                    <th>Typ sprzętu</th>
                    <th>Data produkcji</th>
                </tr>
                <tr>
                    <td>{repairData ? repairData.equipment.name : ''}</td>
                    <td>{repairData ? repairData.equipment.type : ''}</td>
                    <td>{repairData ? repairData.equipment.productionDate : ''}</td>
                </tr>
            </table>

            <br />
            <hr />
            <p> INFORMACJE O KLIENCIE <br /></p>
            <hr />

            <table>
                <tr className="table-title">
                    <th>ID klienta</th>
                    <th>Klient</th>
                </tr>
                <tr>
                    <td>{repairData ? repairData.client.id : ''}</td>
                    <td>{repairData ? repairData.client.firstName + " " + repairData.client.lastName : ''}</td>
                </tr>
            </table>

            <br />
            <hr />
            <p> INFORMACJE O PRACOWNIKACH <br /></p>
            <hr />
            <table>
                <tr className="table-title">
                    <th>Pracownik</th>
                    <th>Rola pracowników</th>
                </tr>
                {workers.map((worker) => (
                    <tr key={worker.id}>
                        <td>{worker.firstName + " " + worker.lastName}</td>
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
                    </tr>
                ))}
            </table>
        </>
    )
}