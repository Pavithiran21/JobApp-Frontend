/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../../Utils/Apiroute';
import { ApplicantNavbar } from '../Dashboard/ApplicantNavbar';

export const ViewProfile = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);



    useEffect(()=>{
        GetProfile(id);
    },[id])

    
    const EditProfile = () => {
        // Navigate to the admin dashboard route
        navigate(`/edit-profile/${id}`);
    };
    

    const DeleteProfile = () =>{
        axios.delete(`${API}/api/profiles/delete-profile/${id}`,{
        headers: {
            authorization:window.localStorage.getItem('token'),
        },
        })
        .then((response)=>{
        console.log(response)
        console.log(id);
        if(response.data.status){
            console.log(response.data);
            Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            }).then(()=>{
                navigate('/applicant-dashboard/')
           
            })
        }
        else {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Delete cannot be found.",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
            });
        }
        })
        .catch((error)=>{
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please check it.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
        })

    }

    
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
        <>
              <ApplicantNavbar/>
        <Container fluid>
            {profile && profile.data &&(
                <>
                <Row>
                   <h1 className='text-center text-primary'>View Profile</h1>
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
                
                
                <Row className='text-center m-3 '>
                    <Col>
                     <Button variant='outline-success' onClick={EditProfile}>Edit</Button>
                    </Col>
                    <Col>
                     <Button variant='outline-danger' onClick={() => DeleteProfile(id)}>Delete</Button>
                    </Col>
                </Row>

                </>
            )}
      
            
        </Container>

        </>

      
    
    )





    

    
}





















// {
//     "firstname":"Arun",
//     "lastname":"Kumar",
//     "email":"arun21@gmail.com",
//     "gender":"Male",
//     "contact":"9876543222",
//     "address":"613,Subbhulakshmi Street,Gandhi Nagar,Sathyamangalam",
//     "martialStatus":"Single",
//     "dob":"21-10-1997",
//     "city":"Erode",
//     "pincode":"638402",
//     "sslc":"SRM Matriculation Hr.Sec School",
//     "sslcboard":"State-Board","sslcPassedout":"2013","sslcPercent":"78.5","hsc":"SRM Matriculation Hr.Sec School","hscboard":"State-Board","hscPercent":"2015","hscPassedout":"2015",
//       "graduation":"Under-Graduate","coursetype":"Full-time","university":"Anna University","collegename":"KRP College of Engineering","specialization":"Computer Science","qualification":"B.E","percentage":"78","collegepassedout":"2019",
//       "skill":"ReactJs,NodeJs,MongoDB,MySQL","languages":"Tamil,English","projectname":"Computer Marketing","projectdescription":"Computer marketers strive to develop brand loyalty, which keeps consumers purchasing from their company whenever they upgrade or replace their computers. Because computers are big-ticket items, rather than impulse purchases, brand loyalty is often the deciding factor in consumer purchases",
//       "linkedinProfile":"www.linkedin.com/varun@21","experience":"Experience","yearofexperience":"2 years","companyname":"RP Networks","designation":"Developer","userId":"6576f7ed10b5d54f06cb3b34"
// }