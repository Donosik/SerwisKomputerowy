import {NavMenu} from "./NavMenu";
import {useState} from "react";

export function Naprawy()
{
    const [renderBool,setRenderBool]=useState(true)
    function szukajHandler()
    {
        console.log("szukaj")
        setRenderBool(true)
    }
    function dodajHandler()
    {
        console.log("dodaj")
        setRenderBool(false)
    }
    
    return(
        <>
            <NavMenu/>
            Naprawy Test
            <button onClick={szukajHandler}>szukaj</button>
            <button onClick={dodajHandler}>dodaj</button>
            {renderBool?<SzukajRender/>:<DodajRender/>}
        </>
    );
}

function SzukajRender()
{
    return(
        <>
            render szukania
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