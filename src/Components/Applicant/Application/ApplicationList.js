/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API } from '../../Utils/Apiroute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { ApplicantNavbar } from '../Dashboard/ApplicantNavbar';

export const ApplicationList = () => {
  const [MyApplication, SetMyApplication] = useState([]);
  const navigate = useNavigate();

  const formatDOB = (dobString) => {
    const dob = new Date(dobString);
    const day = dob.getDate().toString().padStart(2, '0');
    const month = (dob.getMonth() + 1).toString().padStart(2, '0');
    const year = dob.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    GetAllApplications();
  }, []);

  const  ViewApplications = (id)=>{
    navigate(`/applicant/view-application/${id}`)
  }

  const GetAllApplications = async () => {
    const userId = window.localStorage.getItem("id");

    try {
      const response = await axios.get(`${API}/api/applications/my-applications/${userId}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      console.log(response);

      if (response.data.status) {
        // Fetch job details for each application
        const applicationsWithDetails = await Promise.all(response.data.data.map(async (application) => {
          try {
            const jobProfileResponse = await axios.get(`${API}/api/jobs/view-job/${application.JobProfile}`, {
              headers: {
                authorization: window.localStorage.getItem('token'),
              },
            });
            console.log(jobProfileResponse);

            if (jobProfileResponse.data.status) {
              // Merge job profile details into the application object
              return {
                ...application,
                JobProfileDetails: jobProfileResponse.data.data,
              };
            } else {
              console.error("Error fetching job profile details:", jobProfileResponse.data.message);
              return application;
            }
          } catch (error) {
            console.error("Error fetching job profile details:", error);
            return application;
          }
        }));

        SetMyApplication(applicationsWithDetails);

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
        }).then(() => {
          navigate('/applicant-dashboard/');
        });
      }
    } catch (error) {
      console.error(error);
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
      <ApplicantNavbar/>
      <Container fluid>
            <Row>
                <h1 className='text-danger text-center'>My Applications</h1>
            </Row>
            {Array.isArray(MyApplication) && MyApplication.length > 0 ? (
                MyApplication.map((application) => (
                <div key={application._id} onClick={() => ViewApplications(application._id)}>
                    <Row className='p-2'>
                    <Card >
                        <Card.Body>
                        <Row>
                        
                            <Col sm={12} md={6} lg={6}>
                            {application.JobProfileDetails && (
                                <div>
                                <p className=''><b>Company Name:</b> {application.JobProfileDetails.CompanyName}</p>
                                <p className=''><b>Role:</b> {application.JobProfileDetails.Role}</p>
                                <p><b>Salary:</b> <FontAwesomeIcon icon={faIndianRupee} />&nbsp;{application.JobProfileDetails.Salary}</p>
                                
                                
                                </div>
                            )}
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                            <p ><b>Applications Status :</b>{application.ApplicationStatus}</p>
                            <p><b>Application Date :</b>{formatDOB(application.AppliedDate)}</p>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                    </Row>
                </div>
                ))
            ) : (
                <Row className='m-auto p-auto'>
                <Col className='text-center'>
                    <h1>No Applications Found</h1>
                </Col>
                </Row>
            )}
      </Container>
    </>
   
  );
};


