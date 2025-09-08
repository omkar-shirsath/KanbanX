import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';


const HeaderBar = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirects to the Login page
  };

  const handleSignupClick = () => {
    navigate('/signup');
  }

  const handleHomeClick = () => {
    navigate('/')
  }
  return (
    <>

      <Navbar expand="lg" className="bg w-full px-5 text-white pb-3 pt-2 fixed-top bg-white shadow-md" >
        <Container>
          <Navbar.Brand onClick={handleHomeClick} className='cursor-pointer' style={{ fontWeight: "800", fontSize: "25px", color: "#fe7a6e" }}>

            <span style={{ color: "#5158ef" }}>Kanban</span >X

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="button-header flex gap-4">
              <button onClick={handleSignupClick} type="button" className="btn btn-primary">Sign up</button>
              <button onClick={handleLoginClick} type="button" className="btn btn-secondary  ">Log in</button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>

  )
}

export default HeaderBar
