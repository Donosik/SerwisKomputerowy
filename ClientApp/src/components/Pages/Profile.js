import {NavMenu} from "../Components/NavMenu";
import "../Css/Profile.css"
import {useEffect, useState} from "react";
import axios from "axios";

export function Profile() {
    const [user, setUser] = useState(null)
    const [role,setRole]=useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const setAuthToken = token => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else
            delete axios.defaults.headers.common["Authorization"];
    }

    async function getWorker() {
        const response=await axios.get('/worker/me/'+user.id)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
    }

    async function getClient() {
        const response=await axios.get('/client/me/'+user.id)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
    }

    async function getUser() {
        const response = await axios.get('/user/me')
        setUser(response.data)
        console.log(response.data.role)
        if(response.data.role===2)
            setRole("Administrator")
        else if(response.data.role===1)
            setRole("Pracownik")
        else if(response.data.role===0)
            setRole("Klient")
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem("token"))
        getUser()
    }, [])

    useEffect(() => {
        if (user === null)
            return
        if (user.role === 0)
            getClient()
        else
            getWorker()

    }, [user])

    return (
        <>
            <NavMenu/>
            <p className='services-title'> PROFIL </p>
            <div className="profile-frame">
                <div className="profile-info">
                    <p className="color1">IMIĘ: {firstName??""}</p>
                    <p className="color2">NAZWISKO: {lastName??""}</p>
                    <p className="color3">ROLA: {role??""}</p>
                </div>
            </div>
        </>
    );
}