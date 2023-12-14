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


export const Forgot = () =>{

    const validate =  yup.object({
        email: yup.string().email("Email is invalid").required("Email is required"),
      });
    
      const navigate = useNavigate();
    
      const SubmitHandler = async (data) => {
        try {
          // Replace the empty string with your API endpoint to send the form data
          let response = await axios.post(`${API}/api/users/reset`, data);
          console.log(response);
      
          if (response.data.status) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: response.data.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => {
              console.log(response.data)
              navigate("/");
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
        <Container  fluid className='bg-main justify-content-center align-items-center d-flex'>
          <Row>
            <Col>
              <h1 className='text-white text-center'>JOB SEARCH</h1>
              <div className='form-value'>
            
                <Formik 
                  initialValues={{ email:''}}
                  validationSchema = {validate}
                  onSubmit = {values =>{
                  console.log(values);
                  let data = {
                    email:values.email
                    
                  };
                  SubmitHandler(data);
                  }}
                >
                {({ errors, touched  }) => (
                  <Form className="form-value form-group">
                  <h2 className="text-center">FORGOT PASSWORD</h2>
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
                  <Button variant="danger" type="submit" className='m-2 '>
                    Send Mail
                  </Button>
                </Form>
                )}
                
      
                
                </Formik>
      
              </div>
            </Col>
          </Row>
        </Container>
      )
}