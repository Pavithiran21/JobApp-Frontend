import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

import Card from 'react-bootstrap/Card';
import axios from 'axios'

import Swal from 'sweetalert2'
import { API } from '../Utils/Apiroute'
import { AdminNavbar } from './AdminNavbar';

export const AdminDashboard = () => {


  const [username, setUsername] = useState();
  const [totalJobs, setTotaljob] = useState();
  const [totalApplications, setTotalApplication] = useState();
  const [applicationSelected, setTotalApplicationShort] = useState();
  const [totalProfile, setTotalProfile] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);



  const AdminDashboardCount = () => {
    axios
      .get(`${API}/api/profiles/admin-dashboard/`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        const { totalJobs, totalApplications, applicationSelected, totalProfile} = response.data.data;
        console.log(response.data.data);
  
        setTotaljob(totalJobs);
        setTotalApplication(totalApplications);
        setTotalProfile(totalProfile);
        setTotalApplicationShort(applicationSelected);
  
        if (response.data.status) {
          console.log(response);
          console.log(response.data);
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
    AdminDashboardCount();
  }, []);




  return (
    <>
     <AdminNavbar/>
      <Container fluid className='dashboard'>
        <Row className=''>
          <Col sm={12}>
            <h1 className='text-center text-white'>Admin Dashboard</h1>
          </Col>
          <Col sm={12}><p className='text-center text-white'> Hello  <b>{username}</b>,Welcome to the Admin Dashboard</p></Col>
        </Row>
        <Row className='m-3 p-2'>
            <Col sm={3}   className='m-auto p-2 '>
              <Card className='text-center'>
                <Card.Body>
                  <Card.Title>
                    <h1 className=''>Total Jobs Created</h1>
                  </Card.Title>
                  <Card.Text>
                   <span style={{fontSize:"45px"}} className='text-success'><b>{totalJobs}</b></span>
                  </Card.Text>
                </Card.Body>
                
              </Card>
             
            </Col>
            <Col sm={3}   className='m-auto p-2'>
              <Card  className='text-center'>
                <Card.Body>
                  <Card.Title>
                   <h1>Total  Shortlisted</h1>
                  </Card.Title>
                  <Card.Text>
                   <span style={{fontSize:"45px"}} className='text-primary'><b>{applicationSelected}</b></span>
                  </Card.Text>
                </Card.Body>
              

              </Card>
             
            </Col>
            <Col sm={3}   className='m-auto p-2'>
              <Card  className='text-center'>
                <Card.Body>
                  <Card.Title>
                   <h1>Total Users Profile </h1>
                  </Card.Title>
                  <Card.Text>
                   <span style={{fontSize:"45px"}} className='text-danger'><b>{totalProfile}</b></span>
                  </Card.Text>

                </Card.Body>
                
                

              </Card>
             
            </Col>
            <Col sm={3}   className='m-auto p-2'>
             <Card className='text-center'>
              
              <Card.Body>
                <Card.Title>
                  <h1>Total Jobs Applied</h1>
                </Card.Title>
                <Card.Text>
                  <span style={{fontSize:"45px"}} className='text-success'><b>{totalApplications}</b></span>
                </Card.Text>

              </Card.Body>
               
             </Card>
            
            </Col>
        </Row>
      </Container>
    </>
  )


}

