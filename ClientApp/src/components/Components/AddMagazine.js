import { useState } from "react";
import axios from "axios";

export function AddMagazine() {
    const [SerialNumber, setSerialNumber] = useState("");
    const [PartName, setPartName] = useState("");
    const [Cost, setCost] = useState("");
    const [IsUsed, setIsUsed] = useState("off");
    const [CostOfWork, setCostOfWork] = useState("");
    const [checked, setChecked] = useState(false);
    const [errors, setErrors] = useState({});

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

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else delete axios.defaults.headers.common["Authorization"];
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setAuthToken(localStorage.getItem("token"));

        // Reset errors
        setErrors({});

        // Validate input fields
        const validationErrors = {};

        if (!/^\d+$/.test(SerialNumber)) {
            validationErrors.serialNumber = "Numer seryjny może zawierać tylko cyfry.";
        }

        if (!/^\d+$/.test(Cost)) {
            validationErrors.cost = "Koszt może zawierać tylko cyfry.";
        }

        if (!/^\d+$/.test(CostOfWork)) {
            validationErrors.costOfWork =
                "Koszt robocizny może zawierać tylko cyfry.";
        }

        if (Object.keys(validationErrors).length > 0) {
            // There are validation errors
            setErrors(validationErrors);
            return;
        }

        // Check if SerialNumber is unique
        try {
            const response = await axios.get(`/part/${SerialNumber}`);
            if (response.data.exists) {
                validationErrors.serialNumber = "Numer seryjny musi być unikalny.";
                setErrors(validationErrors);
                return;
            }
        } catch (error) {
            console.error("Error checking SerialNumber uniqueness:", error);
            // Handle the error
        }

        let isUsedBool = false;
        if (IsUsed === "on") {
            isUsedBool = true;
        } else {
            isUsedBool = false;
        }

        const response = await axios.post("/part", {
            SerialNumber,
            PartName,
            Cost,
            CostOfWork,
            isUsed: isUsedBool,
        });

        // Handle the response...
    };

    function handleChangeIsUsed(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "isUsed") {
            setChecked(true);
            if (IsUsed === "on") {
                value = "off";
                setChecked(false);
            }
        }
        setIsUsed(value);
    }

    return (
        <>
            <form style={formStyle} onSubmit={handleFormSubmit}>
                <p className="services-title">DODAWANIE CZĘŚCI</p>
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                        NUMER SERYJNY
                    </label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={SerialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        required
                    />
                    {errors.serialNumber && (
                        <p style={errorStyle}>{errors.serialNumber}</p>
                    )}
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
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                    {errors.cost && <p style={errorStyle}>{errors.cost}</p>}
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
                    {errors.costOfWork && (
                        <p style={errorStyle}>{errors.costOfWork}</p>
                    )}
                </div>
                <div>
                    <label>CZY UŻYTA:</label>
                    <input
                        type="checkbox"
                        name="isUsed"
                        onChange={handleChangeIsUsed}
                        checked={checked === true}
                    />
                </div>

                <br />
                <button className="button-class" type="submit">
                    DODAJ DO BAZY
                </button>
            </form>
        </>
    );
}
