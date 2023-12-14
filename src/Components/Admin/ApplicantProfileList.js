/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form, Pagination } from 'react-bootstrap';
import { AdminNavbar } from './AdminNavbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../Utils/Apiroute';
import Swal from 'sweetalert2';

export const ApplicantProfileList = () => {
  const navigate = useNavigate();
  const [filterKeyword, setFilterKeyword] = useState('');
  const [AllProfile, setAllProfile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  useEffect(() => {
      GetAllProfile();
  }, []);
  
  const formatDOB = (dobString) => {
    const dob = new Date(dobString);
    const day = dob.getDate().toString().padStart(2, '0');
    const month = (dob.getMonth() + 1).toString().padStart(2, '0');
    const year = dob.getFullYear();

    return `${day}-${month}-${year}`;
  };
  

  const GetAllProfile = async () => {
      try {
        const response = await axios.get(`${API}/api/profiles/all-profile/`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        });
  
        if (response.data.status) {
          console.log(response.data)
          console.log(response.data.data)
          setAllProfile(response.data.data);
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



  const searchProfile = async () => {

    try {
      if (filterKeyword.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Enter the Firstname",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        
      }
      else{
        const response = await axios.get(`${API}/api/profiles/search-profile`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
          
          params: {
            firstname: filterKeyword,
          },
        
        });
        if (response.data.status) {
          console.log(response.data.data);
          setAllProfile(response.data.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        } else {
          setAllProfile([]);
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



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(AllProfile.length / itemsPerPage);
  const indexOfLastProfile = currentPage * itemsPerPage;
  const indexOfFirstProfile = indexOfLastProfile - itemsPerPage;
  const currentProfile = AllProfile.slice(indexOfFirstProfile, indexOfLastProfile);



  


  return(
    <>
     <AdminNavbar/>
     <Container fluid className='dashboard'>
        <Row>
          <Col>
            <h1 className='text-center text-white'>All Profiles</h1>
          </Col>
        </Row>
        <Row className='m-1'>
            <Col className=''>
              <Form>
                <Row>
                  <Col sm={12} md={10} lg={10} className='m-1'>
                    <Form.Control
                      type='search'
                      placeholder='Search for a Firstname'
                      aria-label='Search'
                      value={filterKeyword}
                      onChange={(e) => setFilterKeyword(e.target.value)}
                      
                    />
                  </Col>
                  <Col className='m-1'>
                    <Button variant='outline-danger' onClick={searchProfile}>Search</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          
          {Array.isArray(currentProfile) && currentProfile.length > 0 ? (
            <Row>
            {currentProfile.map((employee, index)=>(
              <Col key={index} sm={12} lg={6} md={6}>
                  <Card className='m-3'>
                      <Card.Body>
                          <Card.Title>
                              <Row>
                                  <Col>
                                    <h2 className='text-center'>{employee.firstname} {employee.lastname}</h2>
                                  </Col>
                                  
                              </Row>
                              
                          </Card.Title>
                          <Card.Text>
                              <Row>
                                  <Col>
                                      <h4>DOB</h4>
                                  </Col>
                                  <Col>
                                      <p>{formatDOB(employee.dob)}</p>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <h4>Degree</h4>
                                  </Col>
                                  <Col>
                                      <p>{employee.qualification}</p>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <h4>City</h4>
                                  </Col>
                                  <Col>
                                      <p>{employee.city}</p>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <h4>Email</h4>
                                  </Col>
                                  <Col>
                                      <p>{employee.email}</p>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <h4>Contact</h4>
                                  </Col>
                                  <Col>
                                      <p>{employee.contact}</p>
                                  </Col>
                              </Row>
                              <Row className='text-center'>
                                <Col>
                                  <Link to={`/view-profile/${employee._id}`}>
                                    <Button variant='outline-success'>View</Button>
                                  </Link>  
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
                  <h1>No Profiles Found</h1>
                </Col>
              </Row>
            )
          }
            
          
          

        

     </Container>
    </>
  )
}
