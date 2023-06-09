﻿import { NavMenu } from "../Components/NavMenu";
import { useState, useEffect } from "react";
import axios from "axios"

import { CreateRenderer } from "../Components/CreateRenderer"
import { SearchRenderer } from "../Components/SearchRenderer"
import "../Css/repair.css"

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
            <p className='services-title'> NAPRAWY </p>
            <button className='button-add' onClick={searchHandler}>SZUKAJ</button>
            { (role > 0) && <button className='button-add' onClick={createHandler}>DODAJ</button>}


            <br /><br />
            {renderBool ? <SearchRenderer /> : <CreateRenderer callback={searchHandler} />}
        </>
    
    );
}