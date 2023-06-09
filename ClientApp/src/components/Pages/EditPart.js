import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
import { NavMenu } from "../Components/NavMenu";
import "../Css/login.css"

export function EditPart() {
    const [inputs, setInputs] = useState({})
    const [checked, setChecked] = useState(false)

    let { id } = useParams()
    const navigate = useNavigate()
    const [part, setPart] = useState()

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }

    function inputsToPartData() {
        part.serialNumber = inputs.serialNumber
        part.cost = inputs.cost
        part.costOfWork = inputs.costOfWork
        part.partName = inputs.partName
        inputs.isUsed === "on" ? part.isUsed = true : part.isUsed = false;
    }

    async function getPart() {
        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/part/' + id)
        setPart(result.data)
    }

    async function editPart() {
        await axios.put('/part', part)
    }

    function handleCheckboxChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "isUsed") {
            setChecked(true)
            if (inputs.isUsed === "on") {
                value = "off"
                setChecked(false)
            }
        }
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getPart()
        //setInputs(values => ({ ...values, ["isUsed"]: part.isUsed === true ? "on" : "off" }))
    }, [])

    useEffect(() => {
        if (part === undefined)
            return
        const name1 = "partName"
        const value1 = part.partName
        setInputs(values => ({ ...values, [name1]: value1 }))
        const name2 = "cost"
        const value2 = part.cost
        setInputs(values => ({ ...values, [name2]: value2 }))
        const name3 = "costOfWork"
        const value3 = part.costOfWork
        setInputs(values => ({ ...values, [name3]: value3 }))
        const name4 = "serialNumber"
        const value4 = part.serialNumber
        setInputs(values => ({ ...values, [name4]: value4 }))
        const name5 = "isUsed"
        const value5 = part.isUsed
        setInputs(values => ({ ...values, [name5]: value5 === true ? "on" : "off" }))
        setChecked(value5)
    }, [part])

    const handleSubmit = (event) => {
        event.preventDefault()
        const fun = async () => {
            await editPart()
            navigate('/magazyn')
        }
        inputsToPartData()
        fun()
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <NavMenu />
            
            <div style={{ border: "1px solid black", padding: "10px", marginRight: "600px"}}>
                <form>
                    <p className="services-title"> EDYCJA CZĘŚCI </p>
                    <label>
                        Nazwa czesci:
                        <input
                            type="text"
                            name="partName"
                            value={inputs.partName || ""}
                            onChange={handleChange}
                            style={{ marginBottom: "10px", width: "100%" }}
                        />
                    </label>
                    <label>
                        Koszt czesci:
                        <input
                            type="number"
                            name="cost"
                            value={inputs.cost || ""}
                            onChange={handleChange}
                            style={{ marginBottom: "10px", width: "100%" }}
                        />
                    </label>
                    <label>
                        Koszt robocizny:
                        <input
                            type="number"
                            name="costOfWork"
                            value={inputs.costOfWork || ""}
                            onChange={handleChange}
                            style={{ marginBottom: "10px", width: "100%" }}
                        />
                    </label>

                    <label>
                        Numer seryjny:
                        <input
                            type="number"
                            name="serialNumber"
                            value={inputs.serialNumber || ""}
                            onChange={handleChange}
                            style={{ marginBottom: "10px", width: "100%" }}
                        />
                    </label>
                    <label>
                        Czy użyta: <br/>
                        <input type="checkbox" name="isUsed" onChange={handleCheckboxChange} checked={checked === true} />
                    </label>
                    <button
                        className="button-class"
                        onClick={handleSubmit}
                        style={{ width: "100%" }}
                    >
                        Zapisz zmiany
                    </button>
                </form>
            </div>
        </>
    )
}
