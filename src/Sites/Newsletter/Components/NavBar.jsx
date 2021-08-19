import React, { Profiler } from 'react'
import { Navbar, Form, Button, Nav, NavDropdown, FormControl } from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from "../../../assets/Steamconnect1.png"

function NavBar(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand onClick={() => props.nav()}>
                <img
                    src={logo}
                    width="200"
                    height="50"
                    className="d-inline-block align-middle NavImage"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                {props.user &&
                        <NavDropdown title="Your Games" id="basic-nav-dropdown">
                            <NavDropdown.Item as="button" onClick={() => props.nav("OwnedGames")}>Owned Games</NavDropdown.Item>
                            <NavDropdown.Item as="button" onClick={() => props.nav("RecentlyPlayed")}>Recently Played</NavDropdown.Item>
                            <NavDropdown.Item as="button" onClick={() => props.nav("Favorites")}>Favorites</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
                {props.user ?
                    <>
                        <a><img className="NavBarPic" src={props.user.avatar} /></a>
                        <NavDropdown title={props.user.username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </>
                    :
                    <a href="http://localhost:3001/users/auth/steam"> <img src="https://community.akamai.steamstatic.com/public/images/signinthroughsteam/sits_02.png" width="109" height="66" border="0" /> </a>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
