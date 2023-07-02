import "../Css/repair.css"
import {useEffect, useState} from "react";

export function CreateRenderer() {

    const [inputs, setInputs] = useState({})
    
    useEffect(()=>
    {
        setInputs(values => ({...values, ["type"]: "0"}))
        setInputs(values => ({...values, ["isGuarantee"]: "off"}))
        setInputs(values => ({...values, ["guaranteeTime"]: "2000-01-01"}))
        setInputs(values => ({...values, ["acceptanceTime"]: "2000-01-01"}))
        setInputs(values => ({...values, ["returnTime"]: "2000-01-01"}))
        setInputs(values => ({...values, ["status"]: "1"}))
    }
        ,[])
    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "isGuarantee")
            if(inputs.isGuarantee==="on")
                value="off"
        setInputs(values => ({...values, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Wysyłam")
        console.log(inputs)
    }
    //TODO: Pamietac że tu też są typy napraw i statusy
    return (
        <>
            <form>
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
                    Data gwarancjii:
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
                <button onClick={handleSubmit}>Stwórz naprawę</button>
            </form>
        </>
    )
}