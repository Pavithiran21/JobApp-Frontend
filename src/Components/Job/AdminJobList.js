/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEye } from '@fortawesome/free-regular-svg-icons';
import {  faDeleteLeft, faFilePen, faPenClip } from '@fortawesome/free-solid-svg-icons';

import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Form, Pagination } from 'react-bootstrap';
import { AdminNavbar } from '../Admin/AdminNavbar';
import { API } from '../Utils/Apiroute';

export const AdminJobList = () => {
    const navigate = useNavigate();
    const [AllJobs, setAllJobs] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
  
    useEffect(() => {
      GetAllJobs();
    }, []);
  
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
  
  
    
    const EditJob = (id) => {
      navigate(`/admin/edit-job/${id}`);
    };
  
  
    const ViewJob = (id) => {
      navigate(`/view-job/${id}`);
    };
  
  
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
  
    const totalPages = Math.ceil(AllJobs.length / jobsPerPage);
    const indexOfLastjob = currentPage * jobsPerPage;
    const indexOfFirstjob = indexOfLastjob - jobsPerPage;
    const currentJobs = AllJobs.slice(indexOfFirstjob, indexOfLastjob);
  
    
  
  
  
    const DeleteJob = (id) =>{
        axios.delete(`${API}/api/jobs/admin/delete-job/${id}`,{
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
              GetAllJobs();
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
              <h1 className='text-center text-white'>All Jobs</h1>
            </Col>
          </Row>
          <Row className='m-1'>
            <Col className=''>
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
          <Row>
            <Col>
             <Link to={'/admin/create-job'}><Button className='m-1 pl-2' style={{float:"right"}}><FontAwesomeIcon icon={faFilePen}/> Create Job</Button></Link> 
            </Col>
          </Row>
          {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
            <Row className='m-1 p-2'>
            <Col>
               <Table striped bordered hover responsive className='text-center bg-white'>
                <thead>
                   <tr>
                    <th>S.No</th>
                    <th>Company Name</th>
                    <th>Job Role</th>
                    <th>Recruiter Name</th>
                    <th>Job Location</th>
                    <th>Job Type</th>
                    <th>Job Mode</th>
                    <th>Action</th>
                   </tr>
  
                </thead>
                <tbody>
                  {currentJobs.map((job,index)=>(
                    <tr key={job.id}>
                      <td>{index + 1 + indexOfFirstjob}</td>
                      <td>{job.CompanyName}</td>
                      <td>{job.Role}</td>
                      <td>{job.HR_Name}</td>
                      <td>{job.Location}</td>
                      <td>{job.JobType}</td>
                      <td>{job.JobMode}</td>
                      <td>
                        <div  style={{cursor:"pointer"}} className='d-flex flex-row justify-content-center' >
                          <FontAwesomeIcon icon={faPenClip} className='m-2' style={{color:"green"}} onClick={() => EditJob(job._id)}/>
                          <FontAwesomeIcon icon={faEye} className='m-2' style={{color:"blue"}} onClick={() => ViewJob(job._id)}/>
                          <FontAwesomeIcon icon={faDeleteLeft} className='m-2' style={{color:"red"}} onClick={() => DeleteJob(job._id)}/>
                        </div>
                      </td>
  
                    </tr>
                  ))}
                  <tr>
                    
                    
                    
                  </tr>
  
                </tbody>
  
               </Table>
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
            </Col>
          </Row>
          ):(
            <Row className='m-auto p-auto'>
              <Col className='text-center'>
                 <h1>No Jobs Found</h1>
              </Col>
            </Row>
          )};
          
  
         </Container>
      </>
    )
}
