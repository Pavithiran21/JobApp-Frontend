import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik,Field,Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import { API } from "../Utils/Apiroute";


export const Register = () =>{
    const validate =  yup.object({
        firstname: yup.string().min(4, "Must be 4 characters or more").required("Firstname is required"),
        lastname: yup.string().min(4, "Must be 4 characters or more").required("Lastname is required"),
        username: yup.string().min(5, "Must be 6 characters or more").required("Username is required"),
        email: yup.string().email("Email is invalid").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 charaters").required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Confirm password is required"),
        
      });
    
      const Navigate = useNavigate();
    
      const SubmitHandler = async (data) => {
        try {
          
          let response = await axios.post(`${API}/api/users/register`, data);
      
          if (response.data.status) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => {
              console.log(response.data)
              Navigate("/");
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
        } 
        catch (error) {
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
          <Container fluid className='bg-main justify-content-center align-items-center d-flex' >
            <Row>
              <Col>
               <h1 className='text-white text-center'>JOB SEARCH</h1>
                <div className='form-value'>
                  
                  <Formik 
                    initialValues={{ firstname:'',lastname:'',username:'', email:'', password:'', confirmPassword:''}}
                    validationSchema = {validate}
                    onSubmit = {values =>{
                    console.log(values);
                    let data = {
                      firstname:values.firstname,
                      lastname:values.lastname,
                      username:values.username,
                      email:values.email,
                      password:values.password,
                      confirmPassword:values.confirmPassword,
                      terms:true
                    };
                     SubmitHandler(data);
                    }}
                  >
                    {({ errors, touched  }) => (
                      
    
                      <Form className="form-value form-group" >
                        <h2 className="text-center">SIGN UP</h2>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label className='text-left'>Firstname</label>
                              <Field
                                name="firstname"
                                className={`form-control ${errors.firstname && touched.firstname ? 'is-invalid' : ''}`}
                                type="text"
                                placeholder="Enter the Firstname"
                                required
                              />
                              {errors.firstname && touched.firstname && (
                                <div className="invalid-feedback">{errors.firstname}</div>
                              )}
                            </div>
                          </Col>
                          <Col>
                            <div className="form-group">
                              <label>Lastname</label>
                              <Field
                                name="lastname"
                                className={`form-control ${errors.lastname && touched.lastname ? 'is-invalid' : ''}`}
                                type="text"
                                placeholder="Enter the Lastname"
                                required
                              />
                              {errors.lastname && touched.lastname && (
                                <div className="invalid-feedback">{errors.lastname}</div>
                              )}
                            </div>
                          </Col>
                        </Row>
    
                        <div className="form-group">
                          <label>Username</label>
                          <Field
                            name="username"
                            className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder="Enter the Username"
                            required
                          />
                          {errors.username && touched.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                          )}
                        </div>
    
                        <div className="form-group">
                          <label>Email</label>
                          <Field
                            name="email"
                            type="email"
                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                            placeholder="Enter the Email"
                            required
                          />
                          {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
    
                        <div className="form-group">
                          <label>Password</label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                            placeholder="Enter the Password"
                            required
                          />
                          {errors.password && touched.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                          )}
                        </div>
    
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={`form-control ${
                              errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                            }`}
                            placeholder="Enter the Confirm Password"
                            required
                          />
                          {errors.confirmPassword && touched.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <Field
                           name="terms" 
                           type='checkbox'
                            
                          required
                          />
                          
                          <label className='m-1'>Accept Terms & Conditions</label>
                          {errors.terms && touched.terms && (
                            <div className="invalid-feedback">{errors.terms}</div>
                          )}
    
                        </div>
    
                        <div className="text-center">
                        
                          <Button variant="primary" type='submit' className='m-2'>Submit</Button>
                          <Button variant='danger' type='reset' className=''>Reset</Button>
                        </div>
    
                        <p className="text-center">
                          Already Registered? <a href="/" className="success" style={{textDecoration:"none"}}>Click here to Login</a>
                        </p>
                      </Form>
    
                      
                    )}
                  
    
                  
                  </Formik>
    
                </div>
              </Col>
            </Row>
          </Container>
        </>
          
       
       
      )
}