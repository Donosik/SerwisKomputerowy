import { NavMenu } from "./NavMenu";
import { useState, useEffect } from "react";
import axios from "axios"

import { CreateRenderer } from "./CreateRenderer"
import { SearchRenderer } from "./SearchRenderer"
import "./repair.css"

export function Repair() {
    const [renderBool, setRenderBool] = useState(true)
    
    function searchHandler() {
        setRenderBool(true)
    }
    function createHandler() {
        setRenderBool(false)
    }

    const [role, setRole] = useState(0)

    useEffect(() => {
            setRole(Number(localStorage.getItem("role")))
        }
        , [])
    return (
        <>
            <NavMenu />
,
            <p className='services-title'> NAPRAWY </p>
            <button className='button-add' onClick={searchHandler}>SZUKAJ</button>
            { (role > 0) && <button className='button-add' onClick={createHandler}>DODAJ</button>}
            <button className='button-add' onClick={searchHandler}>WYŚWIETL WSZYSTKIE</button>


            <br /><br />
            {renderBool ? <SearchRenderer /> : <CreateRenderer />}
        </>
    
    );
}