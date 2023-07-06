import { useState } from "react";
import axios from "axios";
import { PartRow } from "./PartRow";

export function SearchMagazine() {
    const [checked, setChecked] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [parts, setParts] = useState([]);

    function handleCheck() {
        setChecked(!checked);
    }

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    const handleSearchQueryChange = (event) => {
        setSearchString(event.currentTarget.value);
    };

    const handleSubmit = async () => {
        let isUsed = checked ? true : false;

        setAuthToken(localStorage.getItem("token"));
        const result = await axios.get(
            "/part/isUsed/" + isUsed + "/" + searchString
        );
        setParts(result.data);
        console.log(result.data);
    };

    function removeFromData(index) {
        const newData = parts.filter((_, i) => i !== index);
        setParts(newData);
        window.location.reload()
    }

    return (
        <>
            <p className="services-title"> WYSZUKIWANIE CZĘŚCI </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label>
                    Nazwa części:
                    <input
                        type="text"
                        onChange={handleSearchQueryChange}
                        style={{ width: "200px" }}
                    />
                </label>
                <label>
                    Czy użyta:
                    <input
                        type="checkbox"
                        name="isUsed"
                        onChange={handleCheck}
                        checked={checked === true}
                    />
                </label>
                <button
                    className="button-class"
                    onClick={handleSubmit}
                    style={{ marginLeft: "10px" }}
                >
                    WYSZUKAJ
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nazwa części</th>
                    <th>Numer seryjny</th>
                    <th>Koszt części</th>
                    <th>Koszt wymiany</th>
                    <th>ID naprawy</th>
                    <th>Czy użyta</th>
                    <th>Działania</th>
                </tr>
                </thead>
                <tbody>
                {parts.map((part, id) => (
                    <PartRow part={part} key={part.id} removeFromData={removeFromData} />
                ))}
                </tbody>
            </table>
        </>
    );
}
