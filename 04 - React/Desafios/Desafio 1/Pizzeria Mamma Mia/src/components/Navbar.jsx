import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../assets/css/Navbar.css";
import formattedTotal from '../utils/utility';

export default function PizzeriaNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // //este es para simular que si le da iniciar sesion entraria a la sesion y cambiaria a cerrar sesion
    const logIn = () => setIsLoggedIn(!isLoggedIn); 


    return (
        <>
            <Navbar  variant='dark' className='navbar-transparent'>
                <Container>
                    <Navbar.Brand>Pizzeria Mamma Mia</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>Home 🍕</Nav.Link>
                        <Nav.Link>{isLoggedIn ? "Register 🔑" : "Profile 🙍"}</Nav.Link>
                        <Nav.Link onClick={logIn}>{isLoggedIn ? "Login 🔑" : "Logout 🔐"}</Nav.Link>
                    </Nav>
                            <Navbar.Brand className='justify-content-end fw-bold fs-6'>
                                <Nav.Link>🛒Total: </Nav.Link> ${formattedTotal}
                            </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};
