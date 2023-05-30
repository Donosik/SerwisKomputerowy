import {NavMenu} from "./NavMenu";
import {useState} from "react";
import "./repair.css"

export function Repair()
{
    const [renderBool,setRenderBool]=useState(true)
    function szukajHandler()
    {
        setRenderBool(true)
    }
    function dodajHandler()
    {
        setRenderBool(false)
    }
    
    return(
        <>
            <NavMenu/>
            
                <p class='services-title'> NAPRAWY </p>
                <button class='button-add' onClick={szukajHandler}>SZUKAJ</button>
                <button class='button-add' onClick={dodajHandler}>DODAJ</button>
                <button className='button-add' onClick={szukajHandler}>WYŚWIETL WSZYSTKIE</button>
            
            
                <br /><br />
            {renderBool?<SzukajRender/>:<DodajRender/>}
        </>
    );
}

function SzukajRender()
{
    return(
        <>
            <div>
                <form>
                    <label>
                        Numer naprawy:
                        <input type="text"/>
                    </label>
                    <button type="submit">WYSZUKAJ</button>
                </form>

                <table>
                    <thead>
                    <tr>
                        <th>Numer naprawy</th>
                        <th>Status</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Nazwa sprzętu</th>
                        <th>Działania</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>00000</td>
                            <td>Gotowe do odbioru</td>
                            <td>Jan</td>
                            <td>Kowalski</td>
                            <td>Komputerek xyz</td>
                            <td>
                                <button class='label-button'>EDYTUJ</button>
                                <button class='label-button'>SZCZEGÓŁY</button>
                                <button class='label-button'>USUŃ</button>
                            </td>
                        </tr>
                 
                    </tbody>
                </table>
            </div>
        </>
    )
}

function DodajRender()
{
    return(
        <>
            render dodawania
        </>
    )
}