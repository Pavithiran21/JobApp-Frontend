
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { API } from '../Utils/Apiroute';

export const AdminApplicationView = () => {
    const { id } = useParams();
    const [ApplicationDetails, setApplicationDetails] = useState({ data: {} });

    useEffect(() => {
     GetApplication(id);
    }, [id]);

    const formatDOB = (dobString) => {
        const dob = new Date(dobString);
        const day = dob.getDate().toString().padStart(2, '0');
        const month = (dob.getMonth() + 1).toString().padStart(2, '0');
        const year = dob.getFullYear();

        return `${day}-${month}-${year}`;
    };



  const GetApplication = async (applicationId) => {
    try {
      const applicationResponse = await axios.get(`${API}/api/applications/view-application/${applicationId}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (applicationResponse.data.status) {
        const application = applicationResponse.data.data;
        try {
          const jobProfileResponse = await axios.get(`${API}/api/jobs/view-job/${application.JobProfile}`, {
            headers: {
              authorization: window.localStorage.getItem('token'),
            },
          });

          const userResponse = await axios.get(`${API}/api/users/user-details/${application.userId}`, {
            headers: {
              authorization: window.localStorage.getItem('token'),
            },
          });

          const profileResponse = await axios.get(`${API}/api/profiles/view-profile/${application.MyProfile}`, {
            headers: {
              authorization: window.localStorage.getItem('token'),
            },
          });

          console.log('Application:', application);

          if (jobProfileResponse.data.status && userResponse.data.status && profileResponse.data.status) {
            setApplicationDetails({
              ...applicationResponse.data,
              data: {
                ...application,
                JobProfileDetails: jobProfileResponse.data.data,
                UserDetails: userResponse.data.data,
                ProfileDetails: profileResponse.data.data,
              },
            });

            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: applicationResponse.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          } else {
            console.error("Error fetching details:", jobProfileResponse.data.message);
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: applicationResponse.data.message,
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please check it.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center">
        
        {ApplicationDetails.data && (
          <Row className='p-2'>
            <Row>
             <h1 className='text-danger text-center'>View Application</h1>
            </Row>
            <Col>
            <Card>
                <Card.Body>
                    <Row>
                     <h3>Basic Details</h3>
                    </Row>
                    <Row>
                        <Col>
                         {ApplicationDetails.data.UserDetails &&(
                            <div>
                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                       <p>
                                         <b>FirstName:</b> {ApplicationDetails.data.UserDetails.firstname}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                    <p>
                                      <b>LastName:</b> {ApplicationDetails.data.UserDetails.lastname}
                                    </p>
                                       
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                      <p>
                                         <b>Email:</b> {ApplicationDetails.data.UserDetails.email}
                                      </p>
                                    </Col>
                                </Row>
                               
                               
                               
                            </div>
                         )}
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <h3>Job Details</h3>
                    </Row>
                
                    <Row>
                        <Col>
                            {ApplicationDetails.data.JobProfileDetails && (
                            <div>
                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                        <p className=''>
                                           <b>Company Name:</b> {ApplicationDetails.data.JobProfileDetails.CompanyName}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                       <p className=''>
                                         <b>Role:</b> {ApplicationDetails.data.JobProfileDetails.Role}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                        <p className=''>
                                          <b>Location:</b> {ApplicationDetails.data.JobProfileDetails.Location}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                      <p className=''>
                                          <b>Job-Type:</b> {ApplicationDetails.data.JobProfileDetails.JobType}
                                        </p>
                                    </Col >
                                    <Col sm={12} md={6} lg={6}>
                                      <p className=''>
                                        <b>Mode of Work:</b> {ApplicationDetails.data.JobProfileDetails.JobMode}
                                        </p>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                   <Col sm={12} md={6} lg={6}>
                                       <p>
                                        <b>Salary:</b> <FontAwesomeIcon icon={faIndianRupee} />{' '}
                                        {ApplicationDetails.data.JobProfileDetails.Salary}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={6} lg={6}> 
                                       <p className=''>
                                          <b>Experience:</b> {ApplicationDetails.data.JobProfileDetails.Experience}
                                        </p>
                               
                                    </Col>
                                </Row>
                               
                                
                                
                            </div>
                            )}
                        </Col>
                        
                    </Row>
                    <hr/>
                    <Row>
                        <h3>My Profile</h3>
                    </Row>
                    <Row>
                        <Col >
                          {ApplicationDetails.data.ProfileDetails && (
                            <div>
                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                       <p>
                                            <b>Contact:</b>  {ApplicationDetails.data.ProfileDetails.contact}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                         <p>
                                            <b>City:</b>  {ApplicationDetails.data.ProfileDetails.city}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                        <p>
                                            <b>Graduation:</b>  {ApplicationDetails.data.ProfileDetails.graduation}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                         <p>
                                            <b>Qualification:</b>  {ApplicationDetails.data.ProfileDetails.qualification}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                        <p>
                                            <b>Specialization:</b>  {ApplicationDetails.data.ProfileDetails.specialization}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}> 
                                       <p>
                                            <b>Percentage:</b>  {ApplicationDetails.data.ProfileDetails.percentage}
                                        </p>
                                    </Col>
                                    
                                </Row>
                                
                                <Row>

                                    <Col sm={12} md={4} lg={4}>
                                    <p>
                                        <b>Experience:</b>  {ApplicationDetails.data.ProfileDetails.experience}
                                    </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                       <p>
                                            <b>LinkedIn Profile URL:</b>  {ApplicationDetails.data.ProfileDetails.linkedinProfile}
                                        </p>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                        <p>
                                            <b>Skills:</b>  {ApplicationDetails.data.ProfileDetails.skill}
                                        </p>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                    <p>
                                        <b>Applications Status :</b> {ApplicationDetails.data.ApplicationStatus}
                                    </p>
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <p>
                                            <b>Application Date :</b> {formatDOB(ApplicationDetails.data.AppliedDate)}
                                        </p>
                                    </Col>
                                </Row>
                               
                               
                                
                                
                                
                               
                                
                                
                                
                               
                            </div>
                          )}
                        </Col>
                    </Row>
                    
              </Card.Body>
            </Card>


            
            <Row className='m-3 text-center'>
                <Col>
                   <Link to='/admin/all-applications/'>
                        <Button variant="outline-danger">
                            Close 
                        </Button>
                   </Link>
                   
                </Col>
              </Row>
            </Col>



            


            
            
            
           
          </Row>
        )}
      </Container>
    </>
  );
  
}
