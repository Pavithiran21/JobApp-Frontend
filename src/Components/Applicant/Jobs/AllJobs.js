/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign, faLocationDot, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { API } from '../../Utils/Apiroute';
import { ApplicantNavbar } from '../Dashboard/ApplicantNavbar';


export const AllJobs = () => {

  const navigate = useNavigate();
  const [filterKeyword, setFilterKeyword] = useState('');
  const [AllJobs, setAllJobs] = useState([]);




  useEffect(() => {
    GetAllJobs();
  }, []);


  const GetAllJobs = async () => {
    try {
      const response = await axios.get(`${API}/api/jobs/all-jobs`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        setAllJobs(response.data.data);
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


  const searchJobs = async () => {

    try {
      if (filterKeyword.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Enter the Role",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        
      }
      else{
        const response = await axios.get(`${API}/api/jobs/search-job`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
          
          params: {
            Role: filterKeyword,
          },
        
        });
        if (response.data.status) {
          console.log(response.data.data);
          setAllJobs(response.data.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        } else {
          setAllJobs([]);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }

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

  const ViewJob = (id) => {
    navigate(`/applicant/view-job/${id}`);
  };



  
  return (
    <>
      <ApplicantNavbar/>
      <Container fluid>
        <Row>
          <Col className='text-center'><h1>All JOBS</h1></Col>
        </Row>
       
        <Row>
          <Col className='ms-auto m-3'>
            <Form>
              <Row>
                <Col sm={12} md={10} lg={10} className='m-1'>
                  <Form.Control
                    type='search'
                    placeholder='Search for a Job'
                    aria-label='Search'
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)}
                    
                  />
                </Col>
                <Col className='m-1'>
                  <Button variant='outline-danger' onClick={searchJobs}>Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      
        {Array.isArray(AllJobs) && AllJobs.length > 0 ? (
          <Row>
            {AllJobs.map(job=>(
              <Col sm={12} md={6} lg={4} className='mb-3 '>
                <Card   className='custom-card' onClick={() => ViewJob(job._id)}>
                  <Card.Body>
                    <Card.Text>
                        <h2 className='text-center'>{job.Role}</h2>
                    </Card.Text>
                    <Card.Text>
                    <h4>{job.CompanyName}</h4>
                    </Card.Text>
                    <Card.Text>
                    <FontAwesomeIcon icon={faLocationDot}/>&nbsp;{job.Location}
                    </Card.Text>
                    <Card.Text>
                    <FontAwesomeIcon icon={faSuitcase}/>&nbsp;{job.Experience}
                    </Card.Text>
                    <Card.Text>
                    <FontAwesomeIcon icon={faIndianRupeeSign}/>&nbsp;{job.Salary}
                    </Card.Text>
                    

                  </Card.Body>
                
                </Card>
              </Col>




                  
              
              

            ))}
           
          </Row>
          
        ):(
          <Row>
            <Col className='text-center'>
               <h1>No Jobs Found</h1>
            </Col>
          </Row>
        )}
       
      </Container>
    </>


  )
}
