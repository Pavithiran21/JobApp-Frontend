/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../Utils/Apiroute';


export const ProfileView = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);



    useEffect(()=>{
        GetProfile(id);
    },[id])
    
    const handleCloseButtonClick = () => {
        navigate('/admin-dashboard');
    };
    
    const GetProfile = async () => {
    
        try{
    
          const response = await axios.get(`${API}/api/profiles/view-profile/${id}`, {
            headers: {
              authorization: window.localStorage.getItem('token'),
          }});
          console.log(response);
          if(response.data.status){
            setProfile(response.data)
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:response.data.message ,
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK',
            });
    
          }
        }
        catch(err){
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please check it.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
    
        }
      
    }

    const formatDOB = (dobString) => {
        const dob = new Date(dobString);
        const day = dob.getDate().toString().padStart(2, '0');
        const month = (dob.getMonth() + 1).toString().padStart(2, '0');
        const year = dob.getFullYear();
    
        return `${day}-${month}-${year}`;
    };
      
    return (
    
        <Container fluid>
            {profile && profile.data &&(
                <>
               <Row>
                 <h1 className='text-center text-primary'>Admin View Profile</h1>
                </Row>
                
                <Row className='mt-1'>
                    <Row>
                     <h2>Basic Details</h2>

                    </Row>
                    <Row className='mx-auto'>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} sm={12} md={6}  lg={4}>
                                    <p><b>FirstName :</b> {profile.data.firstname}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}  lg={4}>
                                    <p><b>LastName :</b> {profile.data.lastname}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}  lg={4}>
                                    <p><b>Email :</b> {profile.data.email}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={6}   lg={4}>
                                    <p><b>Contact Number :</b> {profile.data.contact}</p>
                                    </Col>
                                    
                                </Row>
                            </Card.Body>
                        </Card>

                    </Row>

                    <Row>
                     <h2>Personal Details</h2>

                    </Row>
                    <Row className='mx-auto'>
                        <Card >
                            <Card.Body>
                                <Row>
                                    <Col xs={12} sm={12} md={6}   lg={4}>
                                    <p><b>Gender :</b> {profile.data.gender}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={4}>
                                    <p><b>Martial Status :</b> {profile.data.martialStatus}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={4}>
                                    <p><b>Date Of Birth :</b> {formatDOB(profile.data.dob)}</p>
                                    </Col>
                                </Row>
                                <Row>
                                
                                    <p><b>Address For Communication :</b> {profile.data.address}</p>
                                    

                                </Row>
                                <Row>
                                
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>City :</b> {profile.data.city}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>PinCode :</b> {profile.data.pincode}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                    </Row>
                    <Row>
                        <Row className='mt-4' >
                            <h1 className='text-center'>Educational Details</h1>
                        </Row>

                        <Row>
                         <h2>SSLC Details</h2>

                        </Row>
                        <Row className='mx-auto'>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>School Name :</b> {profile.data.sslc}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Board :</b> {profile.data.sslcboard}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Percentage :</b> {profile.data.sslcPercent}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Year Of Passing :</b> {profile.data.sslcPassedout}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                        </Row>
                        
                        <Row>
                         <h2>HSC or Diploma Details</h2>

                        </Row>
                        <Row className='mx-auto'>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>School Name :</b> {profile.data.hsc}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Board :</b> {profile.data.hscboard}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Percentage :</b> {profile.data.hscPercent}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                          <p><b>Year Of Passing :</b> {profile.data.hscPassedout}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                        </Row>



                        <Row>
                         <h2>Highest Graduation Details</h2>

                        </Row>
                        <Row  className='mx-auto'>
                            <Card >
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Graduation :</b> {profile.data.graduation}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Qualification :</b> {profile.data.qualification}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Specialization :</b> {profile.data.specialization}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>University :</b> {profile.data.university}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                        <p><b>Course Type :</b> {profile.data.coursetype}</p>
                                        </Col>
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                          <p><b>Percentage :</b> {profile.data.percentage}</p>
                                        </Col>
                                        
                                    </Row>
                                    <Row>
                                       
                                        <Col xs={12} sm={12} md={6}   lg={4}>
                                         <p><b>Year Of Passing :</b> {profile.data.collegepassedout}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                        </Row>

                    </Row>
                   
                    


                    <Row>
                     <h2 className='text-center  mt-4'>Personal Skills & Projects</h2>

                    </Row>
                    
                    <Row className='mx-auto'>
                        <Card >
                            <Card.Body>
                                <Row>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Skills :</b> {profile.data.skill}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Langauages Known:</b> {profile.data.languages}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>LinkedIn Profile URL:</b> {profile.data.linkedinProfile}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Project Title :</b> {profile.data.projectname}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    
                                    <Col xs={12} sm={12} md={6}   lg={12}>
                                    <p><b>Project Description :</b> {profile.data.projectdescription}</p>
                                    </Col>
                                    
                                </Row>
                            </Card.Body>
                        </Card>

                    </Row>



                    <Row>
                     <h2 className='text-center mt-4'>Experience</h2>

                    </Row>
                    <Row  className='mx-auto'>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Experience-Level :</b> {profile.data.experience}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Year of Experience :</b> {profile.data.yearofexperience}</p>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Company Name :</b> {profile.data.companyname}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}   lg={6}>
                                    <p><b>Designation :</b> {profile.data.designation}</p>
                                    </Col>
                                    
                                </Row>
                            </Card.Body>
                        </Card>

                    </Row>
                    
                  
                </Row>
                <Row className='text-center m-3'>
                
                    <Col  className='d-flex justify-content-around'>
                        <Button variant='outline-danger' onClick={handleCloseButtonClick}>
                          Close
                        </Button>
                    </Col>
                </Row>
                

                </>
            )}

        





           
        </Container>


    )
  
}
