import React from 'react'
import * as yup from 'yup';
import axios from 'axios';
import { Formik,Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Container, Col} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ApplicantNavbar } from '../Dashboard/ApplicantNavbar';
import { API } from '../../Utils/Apiroute';


export const CreateProfile = () => { 
    const validate = yup.object({
        firstname: yup.string().min(4, 'Must be 4 characters or more').required('FirstName is required'),
        lastname: yup.string().min(4, 'Must be 4 characters or more').required('LastName is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        gender: yup.string().required('Gender is required.Please Select one'),
        city: yup.string().min(3, 'City should be minimum 3 characters').required('City is required'),
        contact: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,"Invalid Phone number").required('Phone Number is required'),
        martialStatus:yup.string().required('Marital Status  is required.Please Select one'),
        dob: yup.date().max(new Date(Date.now() - 567648000000), 'You must be at least 18 years old').required('Date of Birth is required'),
        address:yup.string().min(20, 'Address should be minimum 20 characters').required('Address is required'),
        pincode:yup.string().length(6, 'Pincode should be exactly 6 digits').matches(/^[0-9]{6}$/,'Must be exactly 6 digits').required('PinCode is required'),
        sslc:yup.string().min(8, 'SSLC Name should be minimum 8 characters').required('SSLC is required'),
        hsc:yup.string().min(8, 'HSC Name should be minimum 8 characters').required('HSC is required'),
        sslcboard:yup.string().required('SSLC Board is required.Please Select anyone!!'),
        sslcPercent:yup.number().typeError('Percentage should be a number').min(0, 'Percentage should be greater than or equal to 0').max(100, 'Percentage should be less than or equal to 100').required('Percentage is required'),
        sslcPassedout:yup.number().integer('Passedout should be a valid year').min(1995, 'Passedout year should be after 1995').max(new Date().getFullYear(), 'Passedout year should not exceed the current year').required('Passed Out is required'),
        hscboard:yup.string().required('HSC Board is required.Please select anyone!!'),
        hscPercent:yup.number().typeError('Percentage should be a number').min(0, 'Percentage should be greater than or equal to 0').max(100, 'Percentage should be less than or equal to 100').required('HSC/Diploma Percentage is required'),
        hscPassedout:yup.number().integer('Passedout should be a valid year').min(1995, 'Passedout year should be after 1995').max(new Date().getFullYear(), 'Passedout year should not exceed the current year').required('HSC/Diploma Passed Out is required'),
        graduation:yup.string().required('Highest Graduation is Required.Please select anyone !!!'),
        qualification:yup.string().required('Highest Qualification is required.Please select anyone !!!'),
        coursetype:yup.string().required('Course Type is required.Please select anyone !!!'),
        university:yup.string().min(3, 'University should be minimum 3 characters').required('University is required'),
        specialization:yup.string().min(5, 'Specialization should be minimum 5 characters').max(50,'Specialization should not be  more than 50 characters').required('Specialization is required'),
        percentage:yup.number().typeError('Percentage should be a number').min(0, 'Percentage should be greater than or equal to 0').max(100, 'Percentage should be less than or equal to 100').required('Graduation Percentage is required'),
        collegepassedout:yup.number().integer('Passedout should be a valid year').min(1995, 'Passedout year should be after 1995').max(new Date().getFullYear(), 'Passedout year should not exceed the current year').required('Graduation Passed Out is required'),
        skill: yup.string().min(5, 'Skills should be minimum 5 characters').required('SkillSet is required'),
        languages: yup.string().min(5, 'Language should be minimum 5 characters').required('Languages is required'),
        linkedinProfile:yup.string().min(15,"LinkedIn Profile with http should be more than 15 characters").max(50,"LinkedIn Profile with http should not be more than 50 characters").required('LinkedIn Profile  is required'),
        projectname:yup.string().min(8, 'Project Name should be minimum 8 characters').max(20,'Project Name should not be more than 20 characters').required('Project Name is required'),
        projectdescription:yup.string().min(20, 'Project Description  should be minimum 20 characters').required('Project Description is required'),
        experience: yup.string().required('Experience  is required.Please Select one'),
        yearofexperience: yup.string().required('Year of Experiences is required.If Fresher select "None"'),
        companyname:yup.string().required('Company Name is required. If Fresher enter "None"'),
        designation: yup.string().required('Job Role is required. If Fresher enter "None"'),
    });



    const navigate = useNavigate();
    
    
    const SubmitHandler = async(data) =>{
        

        try{
            const userId = window.localStorage.getItem('id');
            data.userId = userId;

            const response = await axios.post(`${API}/api/profiles/add-profile`,data,{
                headers:{
                    authorization:window.localStorage.getItem('token'),
                },
            })
            console.log(response);
            if (response.data.status) {
                window.localStorage.setItem("ProfileId",response.data.data._id);
                console.log(response);
                console.log(response.data);
                Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                }).then(() => {
                navigate("/applicant-dashboard");
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
        catch(err){
            console.log(err);
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

        
        <>
            <ApplicantNavbar/>
            <Container fluid>
            <Row>
                <Col>
                <h1 className="text-center text-primary  m-1">Create Profile</h1>
                </Col>
            </Row>
            <Row className='m-4 p-2'>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Formik
                                    initialValues={{
                                        firstname:'',
                                        lastname:'',
                                        email:'',
                                        contact:'',
                                        city:'',
                                        gender:'',
                                        martialStatus:'',
                                        dob:'',
                                        address:'',
                                        pincode:'',
                                        sslc:'',
                                        hsc:'',
                                        sslcboard:'',
                                        sslcPercent:'',
                                        sslcPassedout:'',
                                        hscboard:'',
                                        hscPercent:'',
                                        hscPassedout:'',
                                        qualification:'',
                                        graduation:'',
                                        coursetype:'',
                                        university:'',
                                        specialization:'',
                                       
                                        percentage:'',
                                        collegepassedout:'',
                                        skill:'',
                                        languages:'',
                                        projectname:'',
                                        projectdescription:'',
                                        linkedinProfile:'',
                                        experience:'',
                                        companyname:'',
                                        yearofexperience:'',
                                        designation:''
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values) => {
                                        console.log(values);
                                        let data = {
                                            firstname:values.firstname,
                                            lastname:values.lastname,
                                            email:values.email,
                                            contact:values.contact,          
                                            gender:values.gender,
                                            martialStatus:values.martialStatus,
                                            dob:values.dob,
                                            address:values.address,
                                            city:values.city,
                                            pincode:values.pincode,
                                            sslc:values.sslc,
                                            hsc:values.hsc,
                                            sslcboard:values.sslcboard,
                                            sslcPercent:values.sslcPercent,
                                            sslcPassedout:values.sslcPassedout,
                                            hscboard:values.hscboard,
                                            hscPercent:values.hscPercent,
                                            hscPassedout:values.hscPassedout,
                                            qualification:values.qualification,
                                            graduation:values.graduation,
                                            coursetype:values.coursetype,
                                            university:values.university,
                                            specialization:values.specialization,
                                            percentage:values.percentage,
                                            collegepassedout:values.collegepassedout,
                                            skill:values.skill,
                                            languages:values.languages,
                                            projectname:values.projectname,
                                            projectdescription:values.projectdescription,
                                            linkedinProfile:values.linkedinProfile,
                                            experience:values.experience,
                                            companyname:values.companyname,
                                            yearofexperience:values.yearofexperience,
                                            designation:values.designation
                                        };

                                        console.log("submiited")
                                        SubmitHandler(data);
                                        
                                    }}
                                
                                >
                                    {({errors,touched})=>(
                                        <Form>
                                        <Row>                       
                                            <h3 className=''>Basic Details</h3>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <Field name="firstname" className={`form-control  ${errors.firstname && touched.firstname ? 'is-invalid' : ''}`} 
                                                    type="text" placeholder="Enter the Firstname" 
                                                
                                                    required
                                                    />
                                                    {errors.firstname && touched.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                                                </div>
                                            
                                            </Col>
                                            <Col>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <Field name="lastname" className={`form-control  ${errors.lastname && touched.lastname ? 'is-invalid' : ''}`} 
                                                    type="text" placeholder="Enter the Lastname" 
                                                
                                                    required
                                                    />
                                                    {errors.lastname && touched.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                                                </div>
                                            
                                            
                                            </Col>

                                            
                                            
                                        </Row>
                                        <Row>
                                            <Col>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <Field name="email" className={`form-control  ${errors.email && touched.email ? 'is-invalid' : ''}`} 
                                                type="email" placeholder="Enter the Email" 
                                            
                                                required
                                                />
                                                {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                            
                                             <Col>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <Field name="contact" className={`form-control  ${errors.contact && touched.contact ? 'is-invalid' : ''}`} 
                                                type="number" placeholder="Enter the PhoneNumber" 
                                            
                                                required
                                                />
                                                {errors.contact && touched.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                            </div>
                                            
                                            
                                            </Col> 

                                            
                                            
                                        </Row>
                                        <hr/>


                                        
                                         <Row>                       
                                            <h3 className=''>Personal Details</h3>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <div className="form-group">
                                                <label>Gender</label>
                                                
                                                <Field  name="gender" as="select"  className={`form-control  ${errors.gender && touched.gender ? 'is-invalid' : ''}`} required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                </Field>
                                                
                                                
                                                {errors.gender && touched.gender && <div className="invalid-feedback">{errors.gender}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                            <Col>
                                            <div className="form-group">
                                                <label>Martial Status</label>
                                                <Field name="martialStatus" as="select" className={`form-control  ${errors.martialStatus && touched.martialStatus ? 'is-invalid' : ''}`} 
                                                
                                            
                                                required
                                                >
                                                <option value="">Select  Martial Status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                </Field>
                                                {errors.martialStatus && touched.martialStatus && <div className="invalid-feedback">{errors.martialStatus}</div>}
                                            </div>
                                            
                                            </Col>
                                            <Col>
                                            <div className="form-group">
                                                <label>Date of Birth</label>
                                                <Field name="dob" className={`form-control  ${errors.dob && touched.dob ? 'is-invalid' : ''}`} 
                                                type="date"  
                                            
                                                required
                                                />
                                                {errors.dob && touched.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                            </div>
                                            
                                            
                                            </Col>

                                            
                                            
                                        </Row> 
                                         <Row>
                                            <Col>
                                            <div className="form-group">
                                                <label>Address for Communication</label>
                                                <Field name="address" component="textarea" className={`form-control  ${errors.address && touched.address ? 'is-invalid' : ''}`} 
                                                type="text" placeholder="Enter the Address for Communication" 
                                            
                                                required
                                                />
                                                {errors.address && touched.address && <div className="invalid-feedback">{errors.address}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                            <Col>
                                            <div className="form-group">
                                                <label>City</label>
                                                <Field name="city" className={`form-control  ${errors.city && touched.city ? 'is-invalid' : ''}`} 
                                                type="text" placeholder="Enter the City" 
                                            
                                                required
                                                />
                                                {errors.city && touched.city && <div className="invalid-feedback">{errors.city}</div>}
                                            </div>
                                            
                                            </Col>
                                            <Col>
                                            <div className="form-group">
                                                <label>Pin Code</label>
                                                <Field name="pincode" className={`form-control  ${errors.pincode && touched.pincode ? 'is-invalid' : ''}`} 
                                                type="text" placeholder="Enter the Pincode" 
                                            
                                                required
                                                />
                                                {errors.pincode && touched.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                                            </div>
                                            
                                            
                                            </Col>

                                            
                                            
                                        </Row>
                                        <hr/> 

                                         <Row>                       
                                            <h2 className='text-center'>Education Details</h2>
                                        </Row>

                                        <Row>                       
                                            <h3 className=''>School Details</h3>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <div className="form-group">
                                                <label>Xth</label>
                                                
                                                <Field  name="sslc" 
                                                type="text" 
                                                    placeholder="Enter the School Name"
                                                    className={`form-control  ${errors.sslc && touched.sslc ? 'is-invalid' : ''}`} 
                                                    required
                                                />
                                                {errors.sslc && touched.sslc && <div className="invalid-feedback">{errors.sslc}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                            <Col>
                                            <div className="form-group">
                                                <label>Board</label>
                                                <Field name="sslcboard" as="select" className={`form-control  ${errors.sslcboard && touched.sslcboard ? 'is-invalid' : ''}`} 
                                                
                                            
                                                required
                                                >
                                                <option value="">Select Board</option>
                                                <option value="State-Board">State Board</option>
                                                <option value="CBSE-Board">CBSE Board</option>
                                                </Field>
                                                {errors.sslcboard && touched.sslcboard && <div className="invalid-feedback">{errors.sslcboard}</div>}
                                            </div>
                                            
                                            </Col>
                                            <Col>
                                            <div className="form-group">
                                                <label>Percentage</label>
                                                <Field 
                                                name="sslcPercent" 
                                                placeholder="Enter the Percentage"
                                                className={`form-control  ${errors.sslcPercent && touched.sslcPercent? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                                />

                                                
                                                {errors.sslcPercent && touched.sslcPercent && <div className="invalid-feedback">{errors.sslcPercent}</div>}
                                            </div>
                                            
                                            
                                            </Col>

                                            
                                            
                                        </Row>
                                        <Row>
                                            <Col>
                                            <div className="form-group">
                                                <label>Year of Passing</label>
                                                <Field name="sslcPassedout" 
                                                className={`form-control  ${errors.sslcPassedout && touched.sslcPassedout ? 'is-invalid' : ''}`} 
                                                type="text" placeholder="Enter the Year of Passing" 
                                            
                                                required
                                                />
                                                {errors.sslcPassedout && touched.sslcPassedout && <div className="invalid-feedback">{errors.sslcPassedout}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                        

                                            
                                            
                                        </Row>

                                        <Row className='mt-3'> 
                                            <Col>
                                            <div className="form-group">
                                                <label>XIIth/Diploma</label>
                                                
                                                <Field  name="hsc" 
                                                type="text" 
                                                    placeholder="Enter the School/College Name"
                                                    className={`form-control  ${errors.hsc && touched.hsc ? 'is-invalid' : ''}`} 
                                                    required
                                                />
                                                {errors.hsc && touched.hsc && <div className="invalid-feedback">{errors.hsc}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                            <Col>
                                            <div className="form-group">
                                                <label>Board</label>
                                                <Field 
                                                    name="hscboard" 
                                                    as="select" 
                                                    className={`form-control  ${errors.hscboard && touched.hscboard ? 'is-invalid' : ''}`} 
                                                
                                            
                                                required
                                                >
                                                    <option value="">Select Board</option>
                                                    <option value="State-Board">State Board</option>
                                                    <option value="CBSE-Board">CBSE Board</option>
                                                
                                                </Field>
                                                {errors.hscboard && touched.hscboard && <div className="invalid-feedback">{errors.hscboard}</div>}
                                            </div>
                                            
                                            </Col>
                                            <Col>
                                            <div className="form-group">
                                                <label>Percentage</label>
                                                <Field 
                                                name="hscPercent" 
                                                placeholder="Enter the Percentage"
                                                className={`form-control  ${errors.hscPercent && touched.hscPercent ? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                                />

                                                
                                                {errors.hscPercent && touched.hscPercent && <div className="invalid-feedback">{errors.hscPercent}</div>}
                                            </div>
                                            
                                            
                                            </Col>

                                            
                                            
                                        </Row>
                                        <Row>
                                            <Col>
                                            <div className="form-group">
                                                <label>Year of Passing</label>
                                                <Field name="hscPassedout" 
                                                className={`form-control  ${errors.hscPassedout && touched.hscPassedout ? 'is-invalid' : ''}`} 
                                                type="text" placeholder="Enter the Year of Passing" 
                                            
                                                required
                                                />
                                                {errors.hscPassedout && touched.hscPassedout && <div className="invalid-feedback">{errors.hscPassedout}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                        

                                            
                                            
                                        </Row>
                                        <hr/>  
                                        

                                        <Row>                       
                                            <h3 className=''>Highest Graduation </h3>
                                        </Row>
                                        <Row>
                                        <Col>
                                            <div className="form-group">
                                                <label>Graduation</label>
                                                <Field name="graduation" as="select" className={`form-control  ${errors.graduation && touched.graduation ? 'is-invalid' : ''}`} 
                                                
                                            
                                                required
                                                >
                                                <option value="">Select Graduation</option>
                                                <option value="Under-Graduate">Under Graduate</option>
                                                <option value="Post-Graduate">Post Graduate</option>
                                                </Field>
                                                
                                                
                                                {errors.graduation && touched.graduation && <div className="invalid-feedback">{errors.graduation}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                            <Col>
                                            <div className="form-group">
                                                <label>Qualification</label>
                                                <Field 
                                                    name="qualification" 
                                                    as="select" 
                                                    className={`form-control  ${errors.qualification && touched.qualification ? 'is-invalid' : ''}`} 
                                                
                                            
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
                                                
                                                
                                                {errors.qualification && touched.qualification && <div className="invalid-feedback">{errors.qualification}</div>}
                                            </div>
                                            </Col>
                                            <Col>
                                            <div className="form-group">
                                                <label>Specialization</label>
                                                <Field 
                                                name="specialization" 
                                                placeholder="Enter the Specialization"
                                                className={`form-control  ${errors.specialization && touched.specialization ? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                                />

                                                
                                                {errors.specialization && touched.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                                            </div>
                                            
                                            
                                            </Col>


                                            

                                            
                                            
                                        </Row>
                                        <Row>
                                        <Col>
                                            <div className="form-group">
                                                <label>University</label>
                                                <Field 
                                                name="university" 
                                                placeholder="Enter the University"
                                                className={`form-control  ${errors.university && touched.university ? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                                />
                                                {errors.university && touched.university && <div className="invalid-feedback">{errors.university}</div>}
                                            </div>
                                            
                                            
                                            </Col>
                                        <Col>
                                            <div className="form-group">
                                                <label>Course Type</label>
                                                <Field 
                                                name="coursetype" 
                                                as="select"
                                                className={`form-control  ${errors.coursetype && touched.coursetype ? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                                >
                                                <option value="">Select Course Type</option>
                                                <option value="Full-time">Full Time</option>
                                                <option value="Part-time">Part Time</option>
                                                </Field>

                                                
                                                {errors.coursetype && touched.coursetype && <div className="invalid-feedback">{errors.coursetype}</div>}
                                            </div>
                                            
                                            
                                            </Col>
                                            <Col>
                                            <div className="form-group">
                                                <label>Percentage</label>
                                                <Field name="percentage" 
                                                className={`form-control  ${errors.percentage && touched.percentage ? 'is-invalid' : ''}`} 
                                                type="text" placeholder="Enter the Percentage " 
                                            
                                                required
                                                />
                                                {errors.percentage && touched.percentage && <div className="invalid-feedback">{errors.percentage}</div>}
                                            </div>
                                            </Col>
                                            
                                            
                                        

                                            
                                            
                                        </Row>
                                        <Row>
                                        <Col>
                                            <div className="form-group">
                                            <label>Year Of Passing</label>
                                            <Field 
                                                name="collegepassedout" 
                                                placeholder="Enter the Year Of Passing "
                                                className={`form-control  ${errors.collegepassedout && touched.collegepassedout? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                            />

                                            
                                            {errors.collegepassedout && touched.collegepassedout && <div className="invalid-feedback">{errors.collegepassedout}</div>}
                                            </div> 
                                        </Col>
                                        </Row>
                                        <hr/>

                                        <Row>
                                        <h2 className='text-center'>Personal Skills & Projects</h2>
                                        </Row>
                                        <Row>
                                        <Col>
                                            <div className="form-group">
                                            <label>Key Skills</label>
                                            <Field 
                                                name="skill" 
                                                placeholder="Enter the Key Skills "
                                                className={`form-control  ${errors.skill && touched.skill? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                            />

                                            
                                            {errors.skill && touched.skill && <div className="invalid-feedback">{errors.skill}</div>}
                                            </div> 
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                            <label>Languages</label>
                                            <Field 
                                                name="languages" 
                                                placeholder="Enter the Languages Known "
                                                className={`form-control  ${errors.languages && touched.languages? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                            />

                                            
                                            {errors.languages && touched.languages && <div className="invalid-feedback">{errors.languages}</div>}
                                            </div> 
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                            <label>LinkedIn Profile URL</label>
                                            <Field 
                                                name="linkedinProfile" 
                                                placeholder="Enter the LinkedIn Profile URL "
                                                className={`form-control  ${errors.linkedinProfile && touched.linkedinProfile? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                            />

                                            
                                            {errors.linkedinProfile && touched.linkedinProfile && <div className="invalid-feedback">{errors.linkedinProfile}</div>}
                                            </div> 
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col>
                                            <div className="form-group">
                                            <label>Project Name</label>
                                            <Field 
                                                name="projectname" 
                                                placeholder="Enter the Project Name "
                                                className={`form-control  ${errors.projectname && touched.projectname? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                            />

                                            
                                            {errors.projectname && touched.projectname && <div className="invalid-feedback">{errors.projectname}</div>}
                                            </div> 
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                            <label>Project Description</label>
                                            <Field 
                                                name="projectdescription" 
                                                component="textarea"
                                                placeholder="Enter the Project Description "
                                                className={`form-control  ${errors.projectdescription && touched.projectdescription? 'is-invalid' : ''}`} 
                                                type="text"  
                                            
                                                required
                                            />

                                            
                                            {errors.projectdescription && touched.projectdescription && <div className="invalid-feedback">{errors.projectdescription}</div>}
                                            </div> 
                                        </Col>
                                        </Row>
                                        <hr/>
                                      
                                        <Row>
                                            <h2 className='text-center'>Experience</h2>
                                        </Row>
                                        <Row>
                                            <div className="form-group">
                                            <label>Experience Level</label>
                                            <Field
                                                name="experience"
                                                as="select"
                                                className={`form-control ${errors.experience && touched.experience ? 'is-invalid' : ''}`}
                                                required
                                            >
                                                <option value=''>Select Experience Type</option>
                                                <option value="Fresher">Fresher</option>
                                                <option value="Experience">Experience</option>
                                            </Field>
                                            {errors.experience && touched.experience && <div className="invalid-feedback">{errors.experience}</div>}
                                            </div>
                                        </Row>

                                      
                                            
                                            <>
                                            <Row>
                                                <div className="form-group">
                                                <label>Job Experience</label>
                                                <Field
                                                    name="yearofexperience"
                                                    as="select"
                                                    className={`form-control ${errors.yearofexperience && touched.yearofexperience ? 'is-invalid' : ''}`}
                                                    required
                                                >
                                                    <option value="">Select Job Experience year</option>
                                                    <option value="None">None</option>
                                                    <option value="1 years">1 years</option>
                                                    <option value="2 years">2 years</option>
                                                    <option value="3 years">3 years</option>
                                                    <option value="4 years&above">4 years and above</option>
                                                </Field>
                                                {errors.yearofexperience && touched.yearofexperience && <div className="invalid-feedback">{errors.yearofexperience}</div>}
                                                </div>
                                            </Row>
                                            <Row>
                                                <Col>
                                                <div className="form-group">
                                                    <label>Company Name</label>
                                                    <Field
                                                    name="companyname"
                                                    placeholder="Enter the Company Name"
                                                    className={`form-control ${errors.companyname && touched.companyname ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    required
                                                    />
                                                    {errors.companyname && touched.companyname && <div className="invalid-feedback">{errors.companyname}</div>}
                                                </div>
                                                </Col>
                                                <Col>
                                                <div className="form-group">
                                                    <label>Designation</label>
                                                    <Field
                                                    name="designation"
                                                    placeholder="Enter the Designation"
                                                    className={`form-control ${errors.designation && touched.designation ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    required
                                                    />
                                                    {errors.designation && touched.designation && <div className="invalid-feedback">{errors.designation}</div>}
                                                </div>
                                                </Col>
                                            </Row>
                                            </>
                                        

                                        



                                        
                                       
                                        
                                        


                                        <Row className='text-center'>
                                            <Col>
                                                <div className='text-center'>
                                                <Button variant='outline-success' className='m-2' type='submit'> Create</Button>
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

            </Row>
            
            
            </Container>
            
        </>
    )

}








