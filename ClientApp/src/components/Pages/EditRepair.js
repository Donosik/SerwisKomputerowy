import {useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios";
import {NavMenu} from "../Components/NavMenu";
import "../Css/login.css"

export function EditRepair() {

    const [inputs, setInputs] = useState({})

    let {id} = useParams()
    const navigate = useNavigate()
    const [repairData, setRepairData] = useState()
    const [clients, setClients] = useState([])

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }
    
    function inputsToRepairData()
    {
        const status=parseInt(inputs.status)
        if(!isNaN(status))
        {
            repairData.status=status
        }
        repairData.acceptanceTime=inputs.acceptanceTime
        repairData.guaranteeTime=inputs.guaranteeTime
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

    async function editRepair() {
        await axios.put('/repair/'+repairData.id+'/'+inputs.clientId)
        repairData.client=null;
        await axios.put('/repair',repairData)
    }

    useEffect(() => {
        getRepair()
        getClients()
    }, [])

    useEffect(() => {
        if (repairData === undefined)
            return
        const name1 = "clientId"
        const value1 = repairData.client.id
        setInputs(values => ({...values, [name1]: value1}))
        const name2 = "status"
        const value2 = repairData.status
        setInputs(values => ({...values, [name2]: value2}))
        const name3 = "acceptanceTime"
        const value3 = repairData.acceptanceTime.substring(0, 10)
        setInputs(values => ({...values, [name3]: value3}))
        const name4 = "guaranteeTime"
        const value4 = repairData.guaranteeTime.substring(0, 10)
        setInputs(values => ({...values, [name4]: value4}))
    }, [repairData])

    const handleSubmit = (event) => {
        event.preventDefault()
        const fun = async()=>
        {
            await editRepair()
            navigate('/naprawy')
        }
        inputsToRepairData()
        fun()
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <>
            <NavMenu/>
            <div>
            <div>
                <form>
                    <label>
                        Klient:
                        <select name="clientId" value={inputs.clientId || ""} onChange={handleChange}>
                            {clients.map((client, id) => (
                                <option key={id} value={client.id}>{client.firstName + ' ' + client.lastName}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Status:
                        <select name="status" value={inputs.status || ""} onChange={handleChange}>
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

                        />
                    </label>
                    <label>
                        Koniec gwarancji:
                        <input
                            type="date"
                            name="guaranteeTime"
                            value={inputs.guaranteeTime || ""}
                            onChange={handleChange}

                        />
                    </label>
                    <button className="button-class" onClick={handleSubmit}>Zapisz zmiany</button>
                </form>
            </div>
            <div>
                Osoby odpowiedzialne:
            </div>
            <div>
                Części wymienne:
            </div>
        </div>
            </>
    )
}
