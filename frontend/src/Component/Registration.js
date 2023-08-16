import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';


const Registration = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if any required fields are empty
    if (email.trim() === '' || firstName.trim() === '' || lastName.trim() === '' || birthdate.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // check if password and confirm password fields match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // continue with form submission if all required fields are filled in and passwords match
    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('birthdate', birthdate);
    formData.append('photo', photo);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    axios.post('http://127.0.0.1:8000/api/registrations/', formData)
      .then(response => {
        // handle success
        console.log(response);
        window.location.href = `/graduatePrograms/${response.data.id}`;
      })
      .catch(error => {
        // handle error
        console.error('There was an error!', error);
        setErrorMessage('An error occurred while submitting the form');
      });
  };
  
    return (
      <Container>
        <Row className="justify-content-md-center mb-3">
        <Col md={6}>
          <h1 className="text-center mb-4">Registration Form</h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formBasicEmail" className="mb-3">
          <FloatingLabel label="Email address"> 
          <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
  
        <Form.Group controlId="formBasicFirstName" className="mb-3">
          <FloatingLabel label="First Name">
          <Form.Control type="text" placeholder="Enter first name" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
  
        <Form.Group controlId="formBasicLastName" className="mb-3">
          <FloatingLabel label="Last Name">
          <Form.Control type="text" placeholder="Enter last name" name="first_name"  value={firstName} onChange={(e) => setLastName(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
  
        <Form.Group controlId="formBasicBirthdate" className="mb-3"> 
          <FloatingLabel label="Birthdate">
          <Form.Control type="date" placeholder="Enter birthdate" name="birthdate"  value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="formBasicPhoto" className="mb-3">
          <FloatingLabel label="Profile Photo"> 
          <Form.Control
          type="file" name="photo" onChange={(e) => setPhoto(e.target.files[0])}/>
         </FloatingLabel>
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <FloatingLabel label="Password">
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
  
        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
          <FloatingLabel label="Confirm Password">
          <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FloatingLabel>
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {errorMessage && <p>{errorMessage}</p>}

      </Form>
      </Col>
      </Row>
    </Container>
    );
  }

export default Registration;
