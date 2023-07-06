import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavMenu } from "../Components/NavMenu";
import "../Css/login.css";

export function EditRepair() {
    const [inputs, setInputs] = useState({});

    let { id } = useParams();
    const navigate = useNavigate();
    const [repairData, setRepairData] = useState();
    const [actionData, setActionData] = useState();
    const [clients, setClients] = useState([]);
    const [workers, setWorkers] = useState([]);

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else delete axios.defaults.headers.common["Authorization"];
    };

    function inputsToRepairData() {
        const status = parseInt(inputs.status);
        if (!isNaN(status)) {
            repairData.status = status;
        }
        repairData.acceptanceTime = inputs.acceptanceTime;
        repairData.guaranteeTime = inputs.guaranteeTime;
    }

    function inputsToActionData() {
        actionData.description = inputs.description;
        actionData.workerId = inputs.worker.id;
    }

    async function getRepair() {
        setAuthToken(localStorage.getItem("token"));
        const result = await axios.get("/repair/" + id);
        setRepairData(result.data);
    }

    async function getClients() {
        setAuthToken(localStorage.getItem("token"));
        const result = await axios.get("/client");
        setClients(result.data);
    }

    async function getWorkers() {
        setAuthToken(localStorage.getItem("token"));
        const result = await axios.get("/worker");
        await setWorkers(result.data);
        const name = "workerId";
        const value = result.data[0].id
        setInputs((values) => ({ ...values, [name]: value }));
    }

    async function editRepair() {
        await axios.put("/repair/" + repairData.id + "/" + inputs.clientId);
        repairData.client = null;
        await axios.put("/repair", repairData);
    }

    useEffect(() => {
        getRepair();
        getClients();
        getWorkers();
    }, []);

    useEffect(() => {
        if (repairData === undefined) return;
        const name1 = "clientId";
        const value1 = repairData.client.id;
        setInputs((values) => ({ ...values, [name1]: value1 }));
        const name2 = "status";
        const value2 = repairData.status;
        setInputs((values) => ({ ...values, [name2]: value2 }));
        const name3 = "acceptanceTime";
        const value3 = repairData.acceptanceTime.substring(0, 10);
        setInputs((values) => ({ ...values, [name3]: value3 }));
        const name4 = "guaranteeTime";
        const value4 = repairData.guaranteeTime.substring(0, 10);
        setInputs((values) => ({ ...values, [name4]: value4 }));
    }, [repairData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fun = async () => {
            await editRepair();
            navigate("/naprawy");
        };
        inputsToRepairData();
        fun();
    };

    const handleActionSubmit = (event) => {
        event.preventDefault();
        const fun = async () => {
            const desc = inputs.description;
            const response = await axios.post("/action", { description: desc });
            await axios.put(
                "action/" + response.data + "/" + id + "/" + inputs.workerId
            );
            navigate("/naprawy");
        };
        //inputsToActionData()
        fun();
    };
    const handlePartSubmit = (event) => {
        event.preventDefault();
        const fun = async () => {
            await axios.put(
                "part/" + inputs.serialNumber + "/toRepair/" + id
            );
            navigate("/naprawy");
        };
        fun();
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    return (
        <>
            <NavMenu />
            <div style={{ border: "1px solid black", marginRight: "700px" }}>
                
                <div style={{ marginLeft: "20px" }}>
                    <br/><p>NAPRAWA: <br/></p>
                    <form>
                        <label>
                            Klient:
                            <select
                                name="clientId"
                                value={inputs.clientId || ""}
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            >
                                {clients.map((client, id) => (
                                    <option key={id} value={client.id}>
                                        {client.firstName + " " + client.lastName}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Status:
                            <select
                                name="status"
                                value={inputs.status || ""}
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            >
                                <option value="0">skonczone</option>
                                <option value="1">przyjete</option>
                            </select>
                        </label>
                        <label>
                            Data przyjęcia:
                            <input
                                type="date"
                                name="acceptanceTime"
                                value={inputs.acceptanceTime || ""}
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            />
                        </label>
                        <label>
                            Koniec gwarancji:
                            <input
                                type="date"
                                name="guaranteeTime"
                                value={inputs.guaranteeTime || ""}
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            />
                        </label>
                        <label>
                            Data zwrotu:
                            <input
                                type="date"
                                name="returnTime"
                                value={inputs.returnTime || ""}
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            />
                        </label>
                        <button
                            className="button-class"
                            onClick={handleSubmit}
                            style={{ marginBottom: "10px" }}
                        >
                            Zapisz zmiany
                        </button>
                    </form>
                    <p>DODAWANIE AKCJI PRACOWNIKA: <br/></p>
                    <form>
                        <label>
                            Pracownik:
                            <select
                                name="workerId"
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            >
                                {workers.map((worker, id) => (
                                    <option key={id} value={worker.id}>
                                        {worker.firstName + " " + worker.lastName}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Opis czynności:
                            <textarea
                                name="description"
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            />
                        </label>
                        <button
                            className="button-class"
                            onClick={handleActionSubmit}
                            style={{ marginBottom: "10px" }}
                        >
                            Dodaj
                        </button>
                    </form>
                    <p>CZĘŚĆ DO NAPRAWY: <br/></p>
                    <form>
                        <label>
                            Numer Seryjny części:
                            <input
                                type="text"
                                name="serialNumber"
                                value={inputs.serialNumber || ""}
                                onChange={handleChange}
                                style={{ display: "block", marginBottom: "10px" }}
                            />
                        </label>
                        <button
                            className="button-class"
                            onClick={handlePartSubmit}
                            style={{ marginBottom: "10px" }}
                        >
                            Wymień
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

