import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {NavMenu} from "../Components/NavMenu";


const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

export function Raport() {
    return (
        <>
            <NavMenu />
            <div>
            <h2>
                Dupsko
            </h2>
        </div>    
            </>
    );
}
