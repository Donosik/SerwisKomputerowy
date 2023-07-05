import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import {NavMenu} from "../Components/NavMenu";
import "../Css/details.css"

export function DetailsRepair()
{
    const [inputs, setInputs] = useState({})

    let { id } = useParams()
    const navigate = useNavigate()
    const [repairData, setRepairData] = useState()
    const [clients, setClients] = useState([])
    const [workers, setWorkers] = useState([])
    const [parts, setParts] = useState([])

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

    async function getClients() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/client')
        setClients(result.data)
    }

    async function getWorkers() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/worker')
        setWorkers(result.data)
    }
    async function getPart() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/part')
        setParts(result.data)
    }
    useEffect(() => {
        getRepair()
        getClients()
        getWorkers()
    }, [])

    return(
        <>
            <NavMenu/>
            <br/>
            <hr/>
            <p>INFORMACJE O NAPRAWIE <br/></p>
            <hr/>
            <table>
                <tr>
                    <th>ID naprawy</th>
                    <th>Data przyjęcia</th>
                    <th>Data skończenia</th>
                    <th>Status</th>
                    <th>Część do wymiany</th>
                    <th>Nowa część</th>
                </tr>
                <tr>
                    <td>{repairData ? repairData.id : ''}</td>
                    <td>{repairData ? repairData.acceptanceTime : ''}</td>
                    <td>{repairData ? repairData.guaranteeTime : ''}</td>
                    <td>{repairData ? repairData.status : ''}</td>
                </tr>
            </table>
            <br/>
            <hr/>
            <p> INFORMACJE O SPRZĘCIE <br/></p>
            <hr/>
            <table>
                <tr className="table-title">
                    <th>Nazwa sprzętu</th>
                    <th>Typ sprzętu</th>
                    <th>Numer seryjny (ID)</th>
                    <th>Data produkcji</th>
                    <th>Data końca gwarancji</th>
                    <th>Gwarancja</th>
                </tr>
                <tr>
                    <td>{repairData ? repairData.equipment.name : ''}</td>
                    <td>{repairData ? repairData.equipment.type : ''}</td>
                    <td>{repairData ? repairData.equipment.serialNumber : ''}</td>
                    <td>{repairData ? repairData.equipment.productionDate : ''}</td>
                    <td>{repairData ? repairData.equipment.warrantyEndDate : ''}</td>
                    <td>{repairData ? repairData.equipment.warranty ? 'Tak' : 'Nie' : ''}</td>
                </tr>
            </table>
            
            <br/>
            <hr/>
            <p> INFORMACJE O KLIENCIE <br/></p>
            <hr/>

            <table>
                <tr className="table-title">
                    <th>ID klienta</th>
                    <th>Imię klienta</th>
                    <th>Nazwisko klienta</th>
                </tr>
                <tr>
                    <td>{repairData ? repairData.client.id : ''}</td>
                    <td>{repairData ? repairData.client.firstName + " " + repairData.client.lastName : ''}</td>
                    <td>{repairData ? repairData.client.lastName : ''}</td>
                </tr>
            </table>
            
            <br/>
            <hr/>
            <p> INFORMACJE O PRACOWNIKACH <br/></p>
            <hr/>
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
            <br/>
            
            <hr/>
            <p> INFORMACJE O KOSZTACH <br/></p>
            <hr/>
            <table>
                <tr className="table-title">
                    <th>Koszt części</th>
                    <th>Koszt robocizny</th>
                    <th>Razem</th>
                </tr>
                <tr>
                    <td>{parts.cost}</td>
                    <td>{parts.costOfWork}</td>
                    <td>{parts.cost + parts.costOfWork}</td>
                </tr>
            </table>
            
            <br/>
            <br/>
        </>
    )
}