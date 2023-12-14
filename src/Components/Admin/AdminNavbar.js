import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/esm/Button';

export const AdminNavbar = () => {


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/'; 
  };
  
    return (
    
        <>
         
          
          <Navbar collapseOnSelect  bg="danger" variant="danger"   expand="lg" sticky='top'>
                <Container fluid>
                  <Navbar.Brand href="/" className='navbar-title text-white'>Job Board</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav  className="ms-auto">
                      
                      <Nav.Link href="/admin-dashboard/"><Button variant='outline-light'>Dashboard</Button></Nav.Link>
                      <Nav.Link href="/admin-job-list/"><Button variant='outline-light'>Jobs List</Button></Nav.Link>
                      <Nav.Link href="/admin/all-profile/"><Button variant='outline-light'>Employees List</Button></Nav.Link>
                      <Nav.Link href="/admin/all-applications/"><Button variant='outline-light'>Applications List</Button></Nav.Link>
                      <Nav.Link onClick={handleLogout}><Button variant='outline-light'>Logout</Button></Nav.Link>
                      
                    </Nav>
    
                    
                    
                  </Navbar.Collapse>
                </Container>
    
            </Navbar>
        </>
    )
  
}
