import axios from "axios"
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"
import { NavMenu } from "../Components/NavMenu";
import "../Css/EditUser.css"
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

export function Raport() {
    
    const [inputs, setInputs] = useState({});
    const [reportData, setReportData] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [repairIDs, setRepairIDs] = useState([]);
    const [clientIDs, setClientIDs] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            try {

                // Pobierz pracowników z bazy danych
                const workersIDsResponse = await axios.get("/worker");
                setWorkers(workersIDsResponse.data);

                // Pobierz ID napraw z bazy danych
                const repairIDsResponse = await axios.get("/repair");
                setRepairIDs(repairIDsResponse.data);

                // Pobierz ID klientów z bazy danych
                const clientIDsResponse = await axios.get("/client");
                setClientIDs(clientIDsResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const startDate = inputs.startDate;
        const endDate   = inputs.endDate;
        const workerID  = inputs.workerID;
        const repairID  = inputs.repairID;
        const clientID  = inputs.clientID;

        try {
            const response = await axios.get("/raport", {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    workerID: workerID,
                    repairID: repairID,
                    clientID: clientID,
                },
            });
            await setReportData(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        const tableData = reportData.map((row) => [
            row.worker.firstName + " " + row.worker.lastName,
            row.repair.id,
            row.repair.client.firstName + " " + row.repair.client.lastName,
            row.repair.acceptanceTime.substring(0,10),
            row.repair.returnTime.substring(0,10),
        ]);

        doc.autoTable({
            head: [
                ["Pracownik", "ID naprawy", "Imie i nazwisko klienta", "Data przyjecia", "Data skonczenia"],
            ],
            body: tableData
        });

        doc.save("Raport.pdf");
    };


    return (
        <>
            <NavMenu />
            <div>
                <p className="services-title">RAPORTY</p>
                <form>
                    <label>
                        Data od:
                        <input type="date" name="startDate" onChange={handleChange} />
                    </label>
                    <label>
                        Data do:
                        <input type="date" name="endDate" onChange={handleChange}/>
                    </label>
                    Wybierz pracownika:
                    <select name="workerID" onChange={handleChange}>
                        <option value="-1">Wszyscy</option>
                        {workers.map((worker,id) => (
                            <option key={worker.id} value={worker.id}>
                                {worker.firstName}
                            </option>
                        ))}
                    </select>
                    ID naprawy:
                    <select name="repairID" onChange={handleChange}>
                        <option value="-1">Wszystkie</option>
                        {repairIDs.map((repair,id) => (
                            <option key={repair.id} value={repair.id}>
                                {id+1}
                            </option>
                        ))}
                    </select>
                    ID klienta / Imię + Nazwisko:
                    <select name="clientID" onChange={handleChange}>
                        <option value="-1">Wszyscy</option>
                        {clientIDs.map((client,id) => (
                            <option key={client.id} value={client.id}>
                                {client.firstName+" "+client.lastName}
                            </option>
                        ))}
                    </select>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Pracownik</th>
                            <th>ID naprawy</th>
                            <th>Imię i nazwisko klienta</th>
                            <th>Data przyjęcia</th>
                            <th>Data skończenia</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reportData.map((row) => (
                        <tr>
                            <td>{row.worker ? row.worker.firstName + " " + row.worker.lastName: ""}</td>
                            <td>{row.repair ? row.repair.id: ""}</td>
                            <td>{row.repair && row.repair.client ? row.repair.client.firstName + " " + row.repair.client.lastName: ""}</td>
                            <td>{row.repair ? row.repair.acceptanceTime: ""}</td>
                            <td>{row.repair ? row.repair.returnTime: ""}</td>
                            
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br />
                <button className="button-class" onClick={handleDownloadPDF}>
                    Pobierz PDF
                </button>
                <button className="button-class" onClick={handleFormSubmit}>
                    Wyświetl raport
                </button>
            </div>
        </>
    );
}
