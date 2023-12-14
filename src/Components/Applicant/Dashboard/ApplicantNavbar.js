/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../../Utils/Apiroute';

export const ApplicantNavbar = () => {
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    const userId = window.localStorage.getItem('id');
    axios
      .get(`${API}/api/profiles/check-profile/${userId}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
        
      })
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.data);
    

        if (response.data.status) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please check it.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      });
    
  };


  useEffect(() => {
    getProfile();
  }, []);

 
  

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <Navbar bg="success" variant="success" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white">
          <i>JOB SEARCH</i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/all-jobs/">
              <Button variant="outline-light">All Jobs</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/applicant-dashboard/">
              <Button variant="outline-light">Dashboard</Button>
            </Nav.Link>
            {profile && profile[0] ? (
              <Nav.Link as={Link} to={`/applicant/view-profile/${profile[0]._id}`}>
                <Button variant="outline-light">View Profile</Button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/add-profile">
                <Button variant="outline-light">Create Profile</Button>
              </Nav.Link>
            )}

            <Nav.Link as={Link} to={`/my-applications/${window.localStorage.getItem('id')}`}>
              <Button variant="outline-light">My Applications</Button>
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <Button variant="outline-light">Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};



