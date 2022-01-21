import React from 'react'
import {
    Routes,
    Route
  } from "react-router-dom";
import { Navbar,Nav, NavLink,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Container from "react-bootstrap/Container";
// import Home from './DepositMoney';
// import AboutUs from './MyAccount';
// import ContactUs from './SendMoney';

function BootstrapNavbar () {

    return(
        <Navbar style={{backgroundColor:'greenyellow',overflow:'hidden',display:'flex',flexDirection:'column'}} >
            <Container >
                <Navbar.Brand href="/boot" style={{marginLeft:'10px'}}>CashApp</Navbar.Brand>
                {/* <Navbar.Toggle /> */}
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <NavLink href='/'>
                    <Button variant="outline-success">SignOut</Button>
                </NavLink>

            </Container>
        
        </Navbar>
    )  
    
}

export default BootstrapNavbar;