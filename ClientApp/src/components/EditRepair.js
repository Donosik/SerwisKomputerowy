import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "../../../node_modules/axios/index"

export function EditRepair() {

    const [inputs, setInputs] = useState({})
    
    let { id}=useParams()
    const navigate = useNavigate()
    const [repairData, setRepairData] = useState()
    const [clients, setClients] = useState()

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    async function getRepair() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/repair/'+id)
        setRepairData(result.data)
        console.log(result.data)
    }

    async function getClients() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/client')
        setClients(result.data)
        console.log(result.data)
    }
    
    async function editRepair() {
        await axios.put('/repair', repairData)
    }

    useEffect(() => {
        getRepair()
        getClients()
        //editRepair()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(inputs)
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    
    return (
        <div>
            <div>
                DUPAAAA
            </div>    
            <form>
                <label>
                    Klient:
                    <select name="clientId" value={inputs.ClientId || ""} onChange={handleChange}>
                        {clients.map((client, id) => (
                            <option value={client.Id}>{client.FirstName + ' ' + client.LastName}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Status:
                    <select name="Status" value={inputs.Status || ""} onChange={ handleChange }>
                        <option value="0">skonczone</option>
                        <option value="1">przyjete</option>
                    </select>
                </label>
                <label>
                    Data przyjêcia:
                    <input
                        type="date"
                        name="AcceptanceTime"
                        value={inputs.AcceptanceTime || ""}
                        onChange={handleChange}
                        
                    />
                </label>
                <label>
                    Koniec gwarancji:
                    <input
                        type="date"
                        name="GuaranteeTime"
                        value={inputs.GuaranteeTime || ""}
                        onChange={handleChange}
                        
                    />
                </label>
                <button onClick={ handleSubmit }>Zapisz zmiany</button>
            </form>
        </div>
    )
}
