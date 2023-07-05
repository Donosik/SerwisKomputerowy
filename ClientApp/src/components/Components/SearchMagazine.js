import { useState } from "react";
import axios from "axios";

export function SearchMagazine()
{
    const [checked, setChecked] = useState(false)
    const [searchString, setSearchString] = useState("")
    
    function handleCheck()
    {
        if(checked===true)
            setChecked(false)
        else 
            setChecked(true)
    }

    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    const handleSearchQueryChange = (event) => {
        setSearchString(event.currentTarget.value)
    }

    const handleSubmit = async () => {
        let isUsed
        if (checked) {
            isUsed = true
        } else {
            isUsed = false
        }

        setAuthToken(localStorage.getItem("token"))
        const result = await axios.get('/repair/table')
        setData(result.data)
        
    }
    
    return(
        <>
            <p className="services-title"> WYSZUKIWANIE CZĘŚCI </p>
            <label>
                Nazwa części :
                <input type="text" onChange={handleSearchQueryChange} />
            </label> 
            <label>
                Czy użyta:
                <input type="checkbox" name="isUsed" onChange={handleCheck} checked={checked === true} />
                <button className="button-class" onClick={handleSubmit}> WYSZUKAJ </button>
            </label>
            <table>
                <thead>
                <tr>
                    <th>Nazwa części</th>
                    <th>Numer seryjny</th>
                    <th>Koszt części</th>
                    <th>Koszt wymiany</th>
                    <th>ID naprawy</th>
                    <th>Czy dostępna</th>
                    <th>Działania</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Przykładowa część 1</td>
                    <td>123456</td>
                    <td>100</td>
                    <td>50</td>
                    <td>1</td>
                    <td>Tak</td>
                    <td>Te same przyciski co przy naprawach</td>
                </tr>
                <tr>
                    <td>Przykładowa część 2</td>
                    <td>789012</td>
                    <td>200</td>
                    <td>75</td>
                    <td>2</td>
                    <td>Nie</td>
                    <td>Te same przyciski co przy naprawach</td>
                </tr>

                </tbody>
            </table>
        </>
    )
}