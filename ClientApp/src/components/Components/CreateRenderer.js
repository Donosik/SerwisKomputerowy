import "../Css/repair.css"
import {useEffect, useState} from "react";
import axios, {get} from "axios";

export function CreateRenderer() {
    
    const [inputs, setInputs] = useState({})
    const [clients, setClients] = useState([])
    const [choosenClient, setChoosenClient] = useState("")

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }

    useEffect(() => {
            setInputs(values => ({...values, ["type"]: "0"}))
            setInputs(values => ({...values, ["isGuarantee"]: "off"}))
            setInputs(values => ({...values, ["guaranteeTime"]: "2000-01-01"}))
            setInputs(values => ({...values, ["acceptanceTime"]: "2000-01-01"}))
            setInputs(values => ({...values, ["returnTime"]: "2000-01-01"}))
        setInputs(values => ({ ...values, ["status"]: "1" }))
        setInputs(values => ({ ...values, ["partType"]:"" }))
        setInputs(values => ({ ...values, ["name"]: "" }))
        setInputs(values => ({ ...values, ["productionDate"]: "2000-01-01" }))

            getClients()
        }
        , [])

    async function getClients() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/client');
        await setClients(result.data)
        setChoosenClient(result.data[0].id.toString()??"")
    }

    
    function changeClient(event) {
        setChoosenClient(event.target.value)
    }

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "isGuarantee")
            if (inputs.isGuarantee === "on")
                value = "off"
        setInputs(values => ({...values, [name]: value}))
    }

    async function createRepair()
    {

        const responseEquipment = await axios.post('/equipment', {
            "type": inputs.partType,
            "name": inputs.name,
            "productionDate": inputs.productionDate
        })
        const eqId = responseEquipment.data
        console.log(responseEquipment)

        const type=parseInt(inputs.type)
        const status=parseInt(inputs.status)
        let isGuarantee
        if(inputs.isGuarantee==="off")
            isGuarantee=false
        else 
            isGuarantee=true
        const response= await axios.post('/repair',{
            "type":type,
            "isGuarantee":isGuarantee,
            "guaranteeTime":inputs.guaranteeTime,
            "acceptanceTime":inputs.acceptanceTime,
            "returnTime":inputs.returnTime,
            "status":status
        })
        await axios.put('/repair/' + response.data + '/' + choosenClient)
        await axios.put('/equipment/' + eqId + '/repair/' + response.data)
    }
    function handleSubmit(event) {
        event.preventDefault()
        createRepair()
    }

    //TODO: Pamietac że tu też są typy napraw i statusy
    return (
        <><p>DODAWANIE NAPRAWY <br/></p>
            <div style={{ border: "1px solid black", marginRight: "700px" }}>

                <div style={{ marginLeft: "20px" }}>
            <form>
                <br/><p>INFORMACJE O SPRZĘCIE <br/></p>
                <label>
                    Typ sprzętu: <input
                        type="text"
                        name="partType"
                        value={inputs.partType || ""}
                        onChange={handleChange} style={{ display: "block", marginBottom: "10px" }}

                    />
                </label>
                <label>
                    Nazwa sprzętu: <input
                        type="text"
                        name="name"
                        value={inputs.name || ""}
                        onChange={handleChange} style={{ display: "block", marginBottom: "10px" }} />
                </label>
                <label>
                    Data produkcji sprzętu:
                    <input
                        type="date"
                        name="productionDate"
                        value={inputs.productionDate || ""}
                        onChange={handleChange} style={{ display: "block", marginBottom: "10px" }}

                    />
                </label>

                <br/> <p>INFORMACJE O NAPRAWIE </p>
                <label>
                    Typ naprawy:
                    <select style={{ display: "block", marginBottom: "10px" }} name="type" value={inputs.type || ""} onChange={handleChange}>
                        <option value="0">zwykła</option>
                        <option value="1">niezwykła</option>
                    </select>
                </label>
                <label>
                    Czy jest gwarancja:
                    <input type="checkbox" name="isGuarantee" onChange={handleChange} style={{ display: "block", marginBottom: "10px" }} />
                </label>
                <label>
                    Data gwarancjii udzielonej po naprawie:
                    <input
                        type="date"
                        name="guaranteeTime"
                        value={inputs.guaranteeTime || ""}
                        onChange={handleChange} style={{ display: "block", marginBottom: "10px" }}

                    />
                </label>
                <label>
                    Data przyjęcia:
                    <input
                        type="date"
                        name="acceptanceTime"
                        value={inputs.acceptanceTime || ""}
                        onChange={handleChange} style={{ display: "block", marginBottom: "10px" }}

                    />
                </label>
                <label>
                    Data zwrotu:
                    <input
                        type="date"
                        name="returnTime"
                        value={inputs.returnTime || ""}
                        onChange={handleChange} style={{ display: "block", marginBottom: "10px" }}

                    />
                </label>
                <label>
                    Status:
                    <select style={{ display: "block", marginBottom: "10px" }}  name="status" value={inputs.status || ""} onChange={handleChange}>
                        <option value="0">skonczone</option>
                        <option value="1">przyjete</option>
                    </select>
                </label>
                <label>
                    Wybierz klienta:
                    <select style={{ display: "block", marginBottom: "10px" }} name="clientId" value={choosenClient || ""} onChange={changeClient}>
                        {clients.map((client, id) => (
                            <option key={id} value={client.id}>{client.firstName + ' ' + client.lastName + ' ('+client.user.login+')'}</option>
                        ))}
                    </select>
                </label>
                <button className="button-class" onClick={handleSubmit}>Stwórz naprawę</button>
            </form>
                </div>
            </div>
        </>
    )
}