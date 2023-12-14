/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { faBuilding, faMap } from '@fortawesome/free-regular-svg-icons';
import { faBookReader, faGraduationCap, faIndianRupee, faPhone } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../Utils/Apiroute';


export const ApplicantView = () => {

  const {id} = useParams();
  
  const navigate = useNavigate();

  const [JobData, setJobData] = useState([]); 

  useEffect(()=>{
    GetJobDetails(id);
  },[])


  const GetJobDetails = async () => {

    try{

      const response = await axios.get(`${API}/api/jobs/view-job/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
      }});
      console.log(response);
      if(response.data.status){
        setJobData(response.data)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
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


  const Apply = async () => {
    const userId = window.localStorage.getItem("id");
    const MyProfile = window.localStorage.getItem("ProfileId");
    const JobProfile = id;

    try{
    
      const response = await axios.post(`${API}/api/applications/add-application`,{userId,MyProfile,JobProfile},{
        headers: {
          authorization: window.localStorage.getItem('token'),
      }});
      console.log(response);
      if(response.data.status){
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/applicant-dashboard");
        })
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


  return (
    <Container fluid>
      {JobData && JobData.data && (
        <>
          <Row>
            <h1 className='text-center text-primary'>View Job</h1>
          </Row>
          <Row>
            <Col>
              <Card className="m-2">
                <Card.Body>
                  <Card.Title>
                    <h1 className='text-center text-success'>{JobData.data.Role}</h1>
                      
                   
                  </Card.Title>
                  <Card.Text>
                    <Row className=''>
                      <Col>
                       <p><FontAwesomeIcon icon={faBuilding}/>&nbsp;{JobData.data.CompanyName}</p>
                       <p><FontAwesomeIcon icon={faMap} />&nbsp;{JobData.data.Location}</p>
                      </Col>
                    </Row>
                    <hr />

                  </Card.Text>
                  <Card.Text>
                    <h3>Recruiter Details:</h3>
                    <Row>
                      <Col>
                       <p>{JobData.data.HR_Name}</p>
                       <p>{JobData.data.email}</p>
                       <p><FontAwesomeIcon icon={faPhone}/>&nbsp;{JobData.data.phone_number}</p>
                      </Col>
                    </Row>
                    <hr />
                  </Card.Text>
                  
                  <Card.Text>
                    
                    <h3 className=''>Qualification : </h3>
                     <Row>
                     
                        <Col  className='m-1'>
                          <FontAwesomeIcon icon={faGraduationCap} style={{float:"right"}}/>     
                        </Col>
                        <Col>
                          <p className=''>{JobData.data.Qualification}</p> 
              
                        </Col>
                     </Row>
                      <Row>
                     
                        <Col className='m-1'>
                         <FontAwesomeIcon icon={faBookReader} style={{float:"right"}}/>    
                                
                        </Col>
                        <Col>
                          <p className=''>{JobData.data.Specialization}</p>
                      
                        </Col>
                      </Row>
                    
                      
                    
                    <hr />

                    <h3 className=''>Full Job Description :</h3>
                    <div>
                      <p className='text-center'>{JobData.data.Description}</p>

                      <Row>
                        <Col>
                            <div className='d-flex flex-row m-1'>
                            <h6 className=''>
                              Job-Type:
                            </h6>
                            <p className=''>&nbsp;{JobData.data.JobType}</p>
                          </div>
                          <div className='d-flex flex-row m-1'>
                          <h6>
                            Job-Mode :
                          </h6>
                            <p>&nbsp;{JobData.data.JobMode}</p> 
                          </div>

                        </Col>
                        <Col>
                        <div className='d-flex flex-row m-1'>
                        <h6>
                          Salary:
                        </h6>
                        <p>&nbsp;<FontAwesomeIcon icon={faIndianRupee}/> {JobData.data.Salary}</p>
                      </div>
                      <div className='d-flex flex-row m-1'>
                       <h6>
                         Experience : 
                       </h6>
                        <p className='' > &nbsp;{JobData.data.Experience}</p> 
                      </div>
                        </Col>
                        
                      </Row>


                      

                      
                      
                      

                    </div>
                    
                    
                  </Card.Text>
                  <Row className='text-center button-row'>
                    <Col>
                     <Link to={'/all-jobs/'}>
                      <Button variant="outline-danger">Back</Button>
                     </Link>
                      
                    </Col>
                    <Col>
                    <Button
                     variant={'outline-primary'}
                      onClick={Apply}
                       
                    >
                     Apply
                    </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );




};




