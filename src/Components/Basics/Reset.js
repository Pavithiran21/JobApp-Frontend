import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Formik,Form,Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import { API } from '../Utils/Apiroute';

export const Reset = () => {

  const validate =  yup.object({
    password: yup.string().min(6, "Password must be at least 6 charaters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Confirm password is required"),
  });

  const navigate = useNavigate();
  const { resetToken } = useParams();
  const SubmitHandler = async (data) => {
    try {
      // Replace the empty string with your API endpoint to send the form data
      let response = await axios.put(`${API}/api/users/reset/${resetToken}`, data);
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
    <>
      <Container fluid className='bg-main justify-content-center align-items-center d-flex'>
        <Row>
          <Col>
          <h1 className='text-white text-center'>JOB SEARCH</h1>
            <div className='form-value'>
         
              <Formik 
                initialValues={{ password:'', confirmPassword:''}}
                validationSchema = {validate}
                onSubmit = {values =>{
                console.log(values);
                let data = {
                  
                  password:values.password,
                  confirmPassword:values.confirmPassword
                };
                SubmitHandler(data);
                }}
              >
              {({ errors, touched  }) => (
                  <Form className="form-value form-group">
                  <h2 className="text-center">RESET PASSWORD</h2>

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
                <div className="text-center ">
                  <Button variant="primary" type='submit' className='m-2'>Submit</Button>
                  <Button variant='danger' type='reset' className=''>Reset</Button>
                </div>
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
