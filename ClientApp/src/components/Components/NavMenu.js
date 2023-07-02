import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../Css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/" className="color1">SerwisKomputerowy</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">

                            <NavItem>
                                <NavLink tag={Link} className="text-dark color4" to="/edytuj">Zarządzaj użytkownikami</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark color4" to="/raport">Raporty</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark color5" to="/naprawy">Naprawy</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark color1" to="/magazyn">Magazyn częsci</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark color3" to="/chat">Wiadomości</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark color2" to="/profil">Profil</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark color2" to="/profil">|   WYLOGUJ</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>

        );
    }
}
