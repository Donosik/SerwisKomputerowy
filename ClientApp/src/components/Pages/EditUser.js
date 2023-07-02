import {NavMenu} from "../Components/NavMenu";
import "../Css/EditUser.css"
export function EditUser()
{
    return(
        <>
            <NavMenu/>
            
            Szukaj po Loginie:<input/> <button className="button-class">Szukaj</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Aktualna Rola</th>
                    <th>Nowa Rola</th>
                    <th>AKCJA</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Ala</td>
                    <td>Kowalska</td>
                    <td>
                        Użytkownik
                    </td>
                    <td>
                        <select name="uprawnienia">
                        </select>
                    </td>
                    <td>
                        <button className="button-class">USUŃ</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Jan</td>
                    <td>Nowak</td>
                    <td>
                        Użytkownik
                    </td>
                    <td>
                        <select name="uprawnienia">
                        </select>
                    </td>
                    <td>
                        <button className="button-class">USUŃ</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>
            <button className="button-class">ZAPISZ ZMIANY</button>
        </>
    )
}