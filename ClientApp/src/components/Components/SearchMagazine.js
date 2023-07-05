export function SearchMagazine()
{
    return(
        <>
            <p className="services-title"> WYSZUKIWANIE CZĘŚCI </p>
            <label>
                Nazwa części :
                <input type="text" /> <button className="button-class"> WYSZUKAJ </button>
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