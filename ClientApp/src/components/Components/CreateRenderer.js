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
            setInputs(values => ({...values, ["status"]: "1"}))
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
        await axios.put('/repair/'+response.data+'/'+choosenClient)
    }
    function handleSubmit(event) {
        event.preventDefault()
        createRepair()
    }

    //TODO: Pamietac że tu też są typy napraw i statusy
    return (
        <>
            <form>
                <p>INFORMACJE O SPRZĘCIE <br/></p>
                Typ sprzętu: ma być listą <br/>
                Nazwa sprzętu: do wpisania<br/>
                Rok produkcji sprzętu: <br/> <br/>
                
                <p>INFORMACJE O NAPRAWIE <br/></p>
                <label>
                    Typ naprawy:
                    <select name="type" value={inputs.type || ""} onChange={handleChange}>
                        <option value="0">zwykła</option>
                        <option value="1">niezwykła</option>
                    </select>
                </label>
                <label>
                    Czy jest gwarancja:
                    <input type="checkbox" name="isGuarantee" onChange={handleChange}/>
                </label>
                <label>
                    Data gwarancjii udzielonej po naprawie:
                    <input
                        type="date"
                        name="guaranteeTime"
                        value={inputs.guaranteeTime || ""}
                        onChange={handleChange}

                    />
                </label>
                <label>
                    Data przyjęcia:
                    <input
                        type="date"
                        name="acceptanceTime"
                        value={inputs.acceptanceTime || ""}
                        onChange={handleChange}

                    />
                </label>
                <label>
                    Data zwrotu:
                    <input
                        type="date"
                        name="returnTime"
                        value={inputs.returnTime || ""}
                        onChange={handleChange}

                    />
                </label>
                <label>
                    Status:
                    <select name="status" value={inputs.status || ""} onChange={handleChange}>
                        <option value="0">skonczone</option>
                        <option value="1">przyjete</option>
                    </select>
                </label>
                <label>
                    Wybierz klienta:
                    <select name="clientId" value={choosenClient || ""} onChange={changeClient}>
                        {clients.map((client, id) => (
                            <option key={id} value={client.id}>{client.firstName + ' ' + client.lastName + ' ('+client.user.login+')'}</option>
                        ))}
                    </select>
                </label>
                <button className="button-class" onClick={handleSubmit}>Stwórz naprawę</button>
            </form>
        </>
    )
}