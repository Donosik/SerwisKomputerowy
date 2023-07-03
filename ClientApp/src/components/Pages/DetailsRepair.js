import {useNavigate, useParams} from "react-router-dom";
import {NavMenu} from "../Components/NavMenu";
import "../Css/details.css"

export function DetailsRepair()
{
    let{id}=useParams()
    const navigate=useNavigate()
    return(
        <>
            <NavMenu/>
            <br/>
            <hr/>
            <p>INFORMACJE O NAPRAWIE <br/></p>
            <hr/>
            <table>
                <tr>
                    <th>ID naprawy</th>
                    <th>Data przyjęcia</th>
                    <th>Data skończenia</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2023-07-01</td>
                    <td>2023-07-10</td>
                    <td>Zakończona</td>
                </tr>
            </table>
            <br/>
            <hr/>
            <p> INFORMACJE O SPRZĘCIE <br/></p>
            <hr/>
            <table>
                <tr className="table-title">
                    <th>Nazwa sprzętu</th>
                    <th>Typ sprzętu</th>
                    <th>Numer seryjny (ID)</th>
                    <th>Data produkcji</th>
                    <th>Data końca gwarancji</th>
                    <th>Gwarancja</th>
                </tr>
                <tr>
                    <td>Laptop</td>
                    <td>Komputer</td>
                    <td>12345</td>
                    <td>2022-01-01</td>
                    <td>2024-01-01</td>
                    <td>Tak</td>
                </tr>
            </table>
            
            <br/>
            <hr/>
            <p> INFORMACJE O KLIENCIE <br/></p>
            <hr/>

            <table>
                <tr className="table-title">
                    <th>ID klienta</th>
                    <th>Imię klienta</th>
                    <th>Nazwisko klienta</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Jan</td>
                    <td>Kowalski</td>
                </tr>
            </table>
            
            <br/>
            <hr/>
            <p> INFORMACJE O PRACOWNIKACH <br/></p>
            <hr/>
            <table>
                <tr className="table-title">
                    <th>Pracownik</th>
                    <th>Rola pracowników</th>
                    <th>Część do wymiany</th>
                    <th>Nowa część</th>
                    <th>Koszt części</th>
                    <th>Koszt robocizny</th>
                </tr>
                <tr>
                    <td>John Smith</td>
                    <td>Mechanik</td>
                    <td>Silnik</td>
                    <td>Nowy silnik</td>
                    <td>500 zł</td>
                    <td>200 zł</td>
                </tr>
            </table>
            <br/>
            
            <hr/>
            <p> INFORMACJE O KOSZTACH <br/></p>
            <hr/>
            <table>
                <tr className="table-title">
                    <th>Koszt części</th>
                    <th>Koszt robocizny</th>
                    <th>Razem</th>
                </tr>
                <tr>
                    <td>800 zł</td>
                    <td>350 zł</td>
                    <td>1150 zł</td>
                </tr>
            </table>
            
            <br/>
            <br/>
        </>
    )
}