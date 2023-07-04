import {useState} from "react";

export function AddMagazine()
{
 
        const [SerialNumber, setSerialNumber] = useState("");
        const [PartName, setPartName] = useState("");
        const [Cost, setCost] = useState("");
        const [IsUsed, setIsUsed] = useState("");
        const [CostOfWork, setCostOfWork] = useState("");
            
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
    return(
        <>
            <form style={formStyle} onSubmit={handleFormSubmit}>
                <p className="services-title"> DODAWANIE CZĘŚCI </p>
                
                {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>NUMER SERYJNY</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>NAZWA:</label>
                    <input
                        style={inputStyle}
                        type="password"
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
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>KOSZT ROBOCIZNY:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={CostOfWork}
                        onChange={(e) => setCostOfWork(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>CZY UŻYTA:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={CostOfWork}
                        onChange={(e) => setCostOfWork(e.target.value)}
                        required
                    />
                </div>
                
                <br />
                <button className="button-class" type="submit">
                    DODAJ DO BAZY
                </button>
            </form>
        </>
    )
}