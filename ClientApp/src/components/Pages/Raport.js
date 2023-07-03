import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
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
    const [reportData, setReportData] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [repairIDs, setRepairIDs] = useState([]);
    const [clientIDs, setClientIDs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Pobierz pracowników z bazy danych
                const workersResponse = await axios.get("/workers");
                setWorkers(workersResponse.data);

                // Pobierz ID napraw z bazy danych
                const repairIDsResponse = await axios.get("/repairIDs");
                setRepairIDs(repairIDsResponse.data);

                // Pobierz ID klientów z bazy danych
                const clientIDsResponse = await axios.get("/clientIDs");
                setClientIDs(clientIDsResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const startDate = e.target.elements.startDate.value;
        const endDate = e.target.elements.endDate.value;
        const workerID = e.target.elements.workerID.value;
        const repairID = e.target.elements.repairID.value;
        const clientID = e.target.elements.clientID.value;

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
            setReportData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        const tableData = reportData.map((row) => [
            row.worker,
            row.repairId,
            row.client,
            row.startDate,
            row.endDate,
            row.repairedParts,
            row.repairCost,
        ]);

        doc.autoTable({
            head: [
                ["Pracownik", "ID naprawy", "Imie i nazwisko klienta", "Data przyjecia", "Data skonczenia", "Czesci naprawione", "Cena naprawy"],
            ],
            body: tableData,
        });

        doc.save("Raport.pdf");
    };


    return (
        <>
            <NavMenu />
            <div>
                <p className="services-title">RAPORTY</p>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Data od:
                        <input type="date" name="startDate" />
                    </label>
                    <label>
                        Data do:
                        <input type="date" name="endDate" />
                    </label>
                    Wybierz pracownika:
                    <select name="workerID">
                        <option value="-1">Wszyscy</option>
                        {workers.map((worker) => (
                            <option key={worker.id} value={worker.id}>
                                {worker.name}
                            </option>
                        ))}
                    </select>
                    ID naprawy:
                    <select name="repairID">
                        <option value="-1">Wszystkie</option>
                        {repairIDs.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>
                    ID klienta / Imię + Nazwisko:
                    <select name="clientID">
                        <option value="-1">Wszyscy</option>
                        {clientIDs.map((id) => (
                            <option key={id} value={id}>
                                {id}
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
                            <th>Części naprawione</th>
                            <th>Cena naprawy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.worker}</td>
                                <td>{row.repairId}</td>
                                <td>{row.client}</td>
                                <td>{row.startDate}</td>
                                <td>{row.endDate}</td>
                                <td>{row.repairedParts}</td>
                                <td>{row.repairCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <button className="button-class" onClick={handleDownloadPDF}>
                    Pobierz PDF
                </button>
                <button type="submit" className="button-class">
                    Wyświetl raport
                </button>
            </div>
        </>
    );
}
