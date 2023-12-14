import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../Utils/Apiroute';
import { AdminNavbar } from '../Admin/AdminNavbar';


export const CreateJob = () => {
  const validate = yup.object({
    CompanyName: yup.string().min(10, 'Must be 10 characters or more').required('Company Name is required'),
    Role: yup.string().min(5, 'Job Role should be minimum 5 characters').required('Job Role is required'),
    Description: yup.string().min(20, 'Job description should be more than 20 characters').required('Job Description is required'),
    HR_Name: yup.string().min(5, 'Recruiter Name should be more than 5 characters').required('Recruiter is required'),
    phone_number: yup.string().matches(/^\d{10}$/, 'Phone Number should be valid').required('Phone Number is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    Location: yup.string().min(5, 'Job Location should be more than 5 characters').required('Job Location is required'),
    JobType: yup.string().required('Job Type is required. Please select one'),
    JobMode:yup.string().required("Job Mode is Required.Please Select required one"),
    Experience:yup.string().required("Job Experience is Required.Please Select required one"),
    Salary: yup.string().min(5, 'Salary range should be more than 5 characters').required('Salary is required'),
    Qualification:yup.string().min(2,' Qualification should be more than 2 character').required('Qualification is required'),
    Specialization:yup.string().min(2,'Specialization should be more than 4 character').required('Specialization is required')
  });

  const navigate = useNavigate();


  const SubmitHandler = async (data) => {
    try {
      // Make an API request to add the product on the backend
      const response = await axios.post(`${API}/api/jobs/admin/create-job`, data,{
        headers: {
          authorization:window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        console.log(response);
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/admin-dashboard/");
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
    } catch (error) {
      console.log(error);
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
      <AdminNavbar />
      <Container fluid className='dashboard'>
        <Row>
          <Col>
            <h1 className="text-center m-3">Create A Job</h1>
          </Col>
        </Row>
        <Row className="">
          <Col className='m-3 p-2'>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                
                  <Formik
                    initialValues={{
                      CompanyName: '',
                      Role: '',
                      Description: '',
                      HR_Name: '',
                      phone_number: '',
                      email: '',
                      Location: '',
                      JobType: '',
                      JobMode:'',
                      Experience:'',
                      Salary:'',
                      Qualification:'',
                      Specialization:''
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                      console.log(values);
                      let data = {
                        CompanyName: values.CompanyName,
                        Role: values.Role,
                        Salary:values.Salary,
                        Description: values.Description,
                        email: values.email,
                        HR_Name: values.HR_Name,
                        phone_number: values.phone_number,
                        Location: values.Location,
                        JobType: values.JobType,
                        Qualification:values.Qualification,
                        Specialization:values.Specialization,
                        JobMode:values.JobMode,
                        Experience:values.Experience
                      };
                      SubmitHandler(data);
                    }}
                  >
                    {({ errors, touched}) => (
                      <Form>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Company Name</label>
                              <Field
                                name="CompanyName"
                                className={`form-control ${errors.CompanyName && touched.CompanyName ? 'is-invalid' : ''}`}
                                type="text"
                                placeholder="Enter the Company Name"
                                required
                              />
                              {errors.CompanyName && touched.CompanyName && <div className="invalid-feedback">{errors.CompanyName}</div>}
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Job Role</label>
                              <Field
                                name="Role"
                                type="text"
                                className={`form-control ${errors.Role && touched.Role ? 'is-invalid' : ''}`}
                                placeholder="Enter the Job Role"
                                required
                              />
                              {errors.Role && touched.Role && <div className="invalid-feedback">{errors.Role}</div>}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                        
                            <div className="form-group">
                              <label>Job Description</label>
                              <Field
                                name="Description"
                                type="text"
                                component="textarea"
                                className={`form-control ${errors.Description && touched.Description ? 'is-invalid' : ''}`}
                                placeholder="Enter the Job Description"
                                required
                              />
                              {errors.Description && touched.Description && <div className="invalid-feedback">{errors.Description}</div>}
                            </div>
                          
                        </Row>
                        <Row>
                        <Col>
                            <div className="form-group">
                              <label>RecruiterName</label>
                              <Field
                                name="HR_Name"
                                type="text"
                                className={`form-control ${errors.HR_Name && touched.HR_Name ? 'is-invalid' : ''}`}
                                placeholder="Enter the RecruiterName"
                                required
                              />
                              {errors.HR_Name && touched.HR_Name && <div className="invalid-feedback">{errors.HR_Name}</div>}
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Phone Number</label>
                              <Field
                                name="phone_number"
                                type="text"
                                className={`form-control ${errors.phone_number && touched.phone_number ? 'is-invalid' : ''}`}
                                placeholder="Enter the Phone Number"
                                required
                              />
                              {errors.phone_number && touched.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                         
                          <Col>
                            <div className="form-group">
                              <label>Email</label>
                              <Field
                                name="email"
                                type="text"
                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                placeholder="Enter the Email"
                                required
                              />
                              {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Job Location</label>
                              <Field
                                name="Location"
                                type="text"
                                className={`form-control ${errors.Location && touched.Location ? 'is-invalid' : ''}`}
                                placeholder="Enter the Job Location"
                                required
                              />
                              {errors.Location && touched.Location && <div className="invalid-feedback">{errors.Location}</div>}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          
                          <Col>
                            <div className="form-group">
                              <label>Job Type</label>
                              <Field
                                name="JobType"
                                as="select"
                                className={`form-control ${errors.JobType && touched.JobType ? 'is-invalid' : ''}`}
                                required
                              >
                                
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                              </Field>
                              {errors.JobType && touched.JobType && <div className="invalid-feedback">{errors.JobType}</div>}
                            </div>
                          </Col>

                          <Col>
                            <div className="form-group">
                              <label>Job Mode</label>
                              <Field
                                name="JobMode"
                                as="select"
                                className={`form-control ${errors.JobMode && touched.JobMode ? 'is-invalid' : ''}`}
                                required
                              >
                                <option value="">Select Job Mode </option>
                                <option value="Work From Office">Work From Office</option>
                                <option value="Work From Home">Work From Home</option>
                                <option value="Remote">Remote</option>
                              </Field>
                              {errors.JobMode  && touched.JobMode  && <div className="invalid-feedback">{errors.JobMode }</div>}
                            </div>
                        </Col>
                        </Row>
                      
                        <Row>
                          
                          <Col>
                                <div className="form-group">
                                    <label>Qualification</label>
                                    <Field 
                                        name="Qualification" 
                                        as="select" 
                                        className={`form-control  ${errors.Qualification && touched.Qualification ? 'is-invalid' : ''}`} 
                                    
                                
                                        required
                                    >
                                         <option value="">Select Qualification</option>
                                          <option value="B.E">B.E</option>
                                          <option value="B.Tech">B.Tech</option>
                                          <option value="B.A">B.A</option>
                                          <option value="B.Com">B.Com</option>
                                          <option value="B.Sc">B.Sc</option>
                                          <option value="B.Ed">B.Ed</option>
                                          <option value="M.E">M.E</option>
                                          <option value="M.Tech">M.Tech</option>
                                          <option value="M.A">M.A</option>
                                          <option value="M.Com">M.Com</option>
                                          <option value="M.Sc">M.Sc</option>
                                          <option value="M.Ed">M.Ed</option>
                                    </Field>
                                    
                                    
                                    {errors.Qualification && touched.Qualification && <div className="invalid-feedback">{errors.Qualification}</div>}
                                </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Specialization</label>
                              
                              <Field
                                name="Specialization"
                                type="text"
                                className={`form-control ${errors.Specialization && touched.Specialization ? 'is-invalid' : ''}`}
                                placeholder="Enter the Specialization"
                                required
                              />
                              {errors.Specialization && touched.Specialization && <div className="invalid-feedback">{errors.Specialization}</div>}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                              <div className="form-group">
                                <label>Job Salary</label>
                                
                                <Field
                                  name="Salary"
                                  type="text"
                                  
                                  className={`form-control ${errors.Salary && touched.Salary ? 'is-invalid' : ''}`}
                                  placeholder="Enter the Job Salary/Month"
                                  required
                                />
                                {errors.Salary && touched.Salary && <div className="invalid-feedback">{errors.Salary}</div>}
                              </div>
                          </Col>
                          

                          <Col>
                              <div className="form-group">
                                <label>Job Experience</label>
                                <Field
                                  name="Experience"
                                  as="select"
                                  className={`form-control ${errors.Experience && touched.Experience ? 'is-invalid' : ''}`}
                                  required
                                >
                                  <option value="">Select Job Experience year</option>
                                  <option value="Fresher">Fresher</option>
                                  <option value="1 years">1 years</option>
                                  <option value="2 years">2 years</option>
                                  <option value="3 years">3 years</option>
                                  <option value="4 years&above">4 years and above</option>

                                </Field>
                                {errors.Experience && touched.Experience && <div className="invalid-feedback">{errors.Experience}</div>}
                              </div>
                          </Col>
                        </Row>
                        <Row className='text-center'>
                          <Col>
                            <div className='text-center'>
                              <Button variant='outline-success' className='m-2' type='submit'>Create</Button>
                              <Button variant='outline-danger' className='m-2' type='reset'>Reset</Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};


 




                             
