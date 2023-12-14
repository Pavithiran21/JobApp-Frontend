/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Pagination } from 'react-bootstrap';
import { AdminNavbar } from './AdminNavbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../Utils/Apiroute';
import Swal from 'sweetalert2';



export const AllApplication = () => {
  // const {id} = useParams();
  const navigate = useNavigate();
  const [AllApplications, setAllApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
      GetAllApplications();
  }, []);

  const handleUpdateOrderStatus = async (id) => {
    try {
      const response = await axios.put(`${API}/api/applications/application-status/${id}`,{},{
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      console.log(response.data);
      if (response.data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        GetAllApplications(); // Refresh order details after updating status
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
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
  
  



  const GetAllApplications = async () => {
    try {
      const response = await axios.get(`${API}/api/applications/admin/all-applications/`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
  
      if (response.data.status) {
        const applicationsWithDetails = await Promise.all(response.data.data.map(async (application) => {
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
  
            if (jobProfileResponse.data.status && userResponse.data.status && profileResponse.data.status) {
              return {
                ...application,
                JobProfileDetails: jobProfileResponse.data.data,
                UserDetails: userResponse.data.data,
                ProfileDetails: profileResponse.data.data,
              };
            } else {
              console.error("Error fetching details:", jobProfileResponse.data.message);
              return application;
            }
          } catch (error) {
            console.error("Error fetching details:", error);
            return application;
          }
        }));
  
        setAllApplications(applicationsWithDetails);
  
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
          navigate('/admin-dashboard/');
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
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(AllApplications.length / itemsPerPage);
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplication = AllApplications.slice(indexOfFirstApplication, indexOfLastApplication);




  const DeleteApplication = (id) =>{
    axios.delete(`${API}/api/applications/delete-application/${id}`,{
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
          GetAllApplications();
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




  return (
    <>
     <AdminNavbar/>
     <Container fluid className='dashboard'>
        <Row>
          <Col>
            <h1 className='text-center text-white'>All Applications</h1>
          </Col>
        </Row>
        {Array.isArray(currentApplication) && currentApplication.length > 0 ? (
          <Row>
          {currentApplication.map((applicant, index) => (
            <Col key={index} sm={12} lg={6} md={6}>
              <Card className='m-3'>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col>
                        <h2>{applicant.UserDetails && applicant.UserDetails.firstname}</h2>
                      </Col>
                      <Col>
                       <h2>{applicant.UserDetails && applicant.UserDetails.lastname}</h2>
                      </Col>
                    </Row>
                    
                  </Card.Title>
                  <Card.Text>
                    <Row>
                    
                      <Col>
                        <p><b>Company Name</b></p>
                      </Col>
                      <Col>
                        <p>{applicant.JobProfileDetails && applicant.JobProfileDetails.CompanyName}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                       <p><b>Role</b></p>
                        
                      </Col>
                      <Col>
                        <p>{applicant.JobProfileDetails && applicant.JobProfileDetails.Role}</p>
                      </Col>
                    </Row>



                    <Row>
                      <Col>
                       <p><b>Job Type</b></p>
                        
                      </Col>
                      <Col>
                        <p>{applicant.JobProfileDetails && applicant.JobProfileDetails.JobType}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                       <p><b>Job Status</b></p>
                        
                      </Col>
                      <Col>
                        <p>{applicant.JobProfileDetails && applicant.JobProfileDetails.JobMode}</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                       <p><b>Email</b></p>
                        
                      </Col>
                      <Col>
                        <p>{applicant.UserDetails && applicant.UserDetails.email}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                       <p><b>Contact</b></p>
                        
                      </Col>
                      <Col>
                        <p>{applicant.ProfileDetails && applicant.ProfileDetails.contact}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                       <p><b>Application Status</b></p>
                        
                      </Col>
                      <Col>
                        <p>{applicant.ApplicationStatus}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                       <p><b>Update Status</b></p>               
                      </Col>
                      <Col>
                        <Button variant='outline-primary' onClick={() => handleUpdateOrderStatus(applicant._id)}>{applicant.ApplicationStatus}</Button>
                      </Col>
                    </Row>
                    <Row className='text-center'>
                      <Col>
                        <Link to={`/admin/view-application/${applicant._id}`}>
                          <Button variant='outline-success'>View</Button>
                        </Link>
                          
                      </Col>
                      
                        
                      <Col>
                        <Button variant='outline-danger' onClick={() => DeleteApplication(applicant._id)}>Delete</Button>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

         <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
          </div>
        </Row>
        ):(
          <Row className='m-auto p-auto'>
            <Col className='text-center'>
               <h1>No Applications Found</h1>
            </Col>
          </Row>
        )};
     </Container>

     
    </>
  )
}


