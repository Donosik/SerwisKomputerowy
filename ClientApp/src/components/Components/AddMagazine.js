import { useState } from "react";
import axios from "axios"

export function AddMagazine()
{
 
    const [SerialNumber, setSerialNumber] = useState();
    const [PartName, setPartName] = useState("");
    const [Cost, setCost] = useState();
    const [IsUsed, setIsUsed] = useState("off");
    const [CostOfWork, setCostOfWork] = useState();
    const [checked, setChecked] = useState(false)
            
    // Define the styles as JavaScript objects
    const formStyle = {
        border: "1px solid black",
        padding: "20px",
        marginRight: "800px",
    };

    const inputStyle = {
        marginBottom: "10px",
        padding: "5px",
        width: "100%",
    };

    const selectStyle = {
        marginBottom: "10px",
        padding: "5px",
        width: "100%",
    };

    const errorStyle = {
        textAlign: "center",
        color: "red",
    };

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setAuthToken(localStorage.getItem("token"))
        let isUsedBool = false;
        if (IsUsed === "on")
            isUsedBool = true
        else
            isUsedBool = false

        const response = await axios.post("/part", {
            SerialNumber,
            PartName,
            Cost,
            CostOfWork,
            "isUsed":isUsedBool
        })
    };

    function handleChangeIsUsed(event) {
        let name = event.target.name
        let value = event.target.value
        if (name === "isUsed") {
            setChecked(true)
            if (IsUsed === "on") {
                value = "off"
                setChecked(false)
            }
        }
        setIsUsed(value)
    }
    
    return(
        <>
            <form style={formStyle} onSubmit={handleFormSubmit}>
                <p className="services-title"> DODAWANIE CZĘŚCI </p>
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>NUMER SERYJNY</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={SerialNumber}
                        onChange={(e) => setSerialNumber(parseInt(e.target.value))}
                        required
                    /> 
                </div>
                <div>
                    <label>NAZWA:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={PartName}
                        onChange={(e) => setPartName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>KOSZT</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={Cost}
                        onChange={(e) => setCost(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>KOSZT ROBOCIZNY:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={CostOfWork}
                        onChange={(e) => setCostOfWork(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>CZY UŻYTA:</label>
                    <input type="checkbox" name="isUsed" onChange={handleChangeIsUsed} checked={checked === true} />
                </div>
                
                <br />
                <button className="button-class" type="submit">
                    DODAJ DO BAZY
                </button>
            </form>
        </>
    )
}