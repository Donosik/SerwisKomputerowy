import {Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import '../Css/NavMenu.css';
import axios from "axios";
import {useEffect} from "react";

export function NavMenu() {
    const navigate = useNavigate()

    function checkIfLogged() {
        if (localStorage.getItem("token") === null)
            navigate('/')
    }
    
    useEffect(checkIfLogged,[])
    function logoutHandler() {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container
                    light>
                <NavbarBrand className="color1">KOMPUTEROWO.PL</NavbarBrand>
                {localStorage.getItem("role") > 1 && <NavItem>
                    <NavLink tag={Link} className="text-dark color4" to="/edytuj">Zarządzaj pracownikami</NavLink>
                </NavItem>}
                {localStorage.getItem("role") > 1 &&<NavItem>
                    <NavLink tag={Link} className="text-dark color4" to="/raport">Raporty</NavLink>
                </NavItem>}
                <NavItem>
                    <NavLink tag={Link} className="text-dark color5" to="/naprawy">Naprawy</NavLink>
                </NavItem>
                {localStorage.getItem("role") > 0 &&<NavItem>
                    <NavLink tag={Link} className="text-dark color1" to="/magazyn">Magazyn częsci</NavLink>
                </NavItem>}
                <NavItem>
                    <NavLink tag={Link} className="text-dark color3" to="/chat">Wiadomości</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark color2" to="/profil">Profil</NavLink>
                </NavItem>
                <button className="button-class" onClick={logoutHandler}>Wyloguj</button>
            </Navbar>
        </header>

    )
}
