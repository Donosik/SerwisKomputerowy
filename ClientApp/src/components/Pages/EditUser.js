import { NavMenu } from "../Components/NavMenu";
import { UserRow } from "../Components/UserRow"
import "../Css/EditUser.css"
import axios from "axios"
import { useState, useEffect } from "react"
import {SearchWorker} from "../Components/SearchWorker";
import {AddWorker} from "../Components/AddWorker";

export function EditUser() {
    const [renderBool, setRenderBool] = useState(true)

    function searchHandler() {
        setRenderBool(true)
    }
    function createHandler() {
        setRenderBool(false)
    }

    return (
        <>
            <NavMenu />
            <p className='services-title'> ZARZĄDZAJ UŻYTKOWNIKAMI </p>
            <button className="button-class" onClick={searchHandler}>Szukaj</button> 
            <button className="button-class" onClick={createHandler}>Dodaj pracownika</button>
            <br /><br />
            {renderBool?<SearchWorker/>:<AddWorker/>}
        </>
    )
}
