import {NavMenu} from "../Components/NavMenu";

export function EditUser()
{
    return(
        <>
            <NavMenu/>

            Szukaj po Loginie:<input/> <button>Szukaj</button>
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
                        <button>USUŃ</button>
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
                        <button>USUŃ</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>
            <button>ZAPISZ ZMIANY</button>
        </>
    )
}