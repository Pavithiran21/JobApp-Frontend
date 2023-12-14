/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Swal from 'sweetalert2';


import { ApplicantNavbar } from './ApplicantNavbar'; // Assuming you have an ApplicantNavbar component
import { API } from '../../Utils/Apiroute';


export const ApplicantDashboard = () => {
  const [username, setUsername] = useState();
  const [totalApplications, setTotalApplications] = useState();
  const [rejectedApplications, setRejectedApplications] = useState();
  const [shortlistApplications, setShortlistApplications] = useState();
  const [viewedApplications, setViewedApplications] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  

  const Dashboard = () => {
    const userId = window.localStorage.getItem('id');
    axios
      .get(`${API}/api/applications/applicant-dashboard/${userId}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
        
      })
      .then((response) => {
        const { totalApplications,shortlistApplications,viewedApplications,rejectedApplications } = response.data.data;
        console.log(response.data);
        setTotalApplications(totalApplications);
        setRejectedApplications(rejectedApplications);
        setShortlistApplications(shortlistApplications);
        setViewedApplications(viewedApplications);

        if (response.data.status) {
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
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please check it.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      });
  };

  useEffect(() => {
    Dashboard();
  }, []);

  return (
    <>
      <ApplicantNavbar />
      <Container fluid>
        <Row className="">
          <Col sm={12}>
            <h1 className="text-center">Applicant Dashboard</h1>
          </Col>
          <Col sm={12}>
            <p className="text-center">
              Hello <b>{username}</b>, Welcome to the Applicant Dashboard
            </p>
          </Col>
        </Row>
        <Row className="m-3 p-2">
          <Col sm={3} className="m-auto p-2">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>
                  <h1>Total Applications</h1>
                </Card.Title>
                <Card.Text>
                  <span style={{ fontSize: "45px" }} className="text-success">
                    <b>{totalApplications}</b>
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={3} className="m-auto p-2">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>
                  <h1>Shortlisted Applications</h1>
                </Card.Title>
                <Card.Text>
                  <span style={{ fontSize: "45px" }} className="text-primary">
                    <b>{shortlistApplications}</b>
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={3} className="m-auto p-2">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>
                  <h1> Rejected Applications</h1>
                </Card.Title>
                <Card.Text>
                  <span style={{ fontSize: "45px" }} className="text-danger">
                    <b>{rejectedApplications}</b>
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={3} className="m-auto p-2">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>
                  <h1> Viewed Applications </h1>
                </Card.Title>
                <Card.Text>
                  <span style={{ fontSize: "45px" }} className="text-success">
                    <b>{viewedApplications}</b>
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};



