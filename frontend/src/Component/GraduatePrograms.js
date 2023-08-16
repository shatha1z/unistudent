import React, { useState  } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function GraduatePrograms() {
  const { id } = useParams();
  const [levelOfStudy, setLevelOfStudy] = useState('');
  const [program, setProgram] = useState('');
  const [facultyDivision, setFacultyDivision] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [student, setStudent] = useState(id);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!levelOfStudy || !program || !facultyDivision) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    axios.post("http://127.0.0.1:8000/api/graduate-programs/", {
        level_of_study: levelOfStudy,
        program_name: program,
        faculty_division: facultyDivision,
        student: student,
      })
      .then((response) => {
        console.log(response.data);
        window.location.href = `/login/`;
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <Container>
        <Row className="justify-content-md-center mb-3">
        <Col md={6}>
          <h1 className="text-center mb-4">Graduate Programs</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="levelOfStudy" className="mb-3">
          <FloatingLabel label="Level of Study:">
          <Form.Select as="select" value={levelOfStudy} onChange={(event) => setLevelOfStudy(event.target.value)}>
            <option value="">Select Level of Study</option>
            <option value="MSc">Master's Level</option>
            <option value="PhD">Doctorate Level</option>
          </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="program" className="mb-3">
          <FloatingLabel label="Program:">
          <Form.Select as="select" value={program} onChange={(event) => setProgram(event.target.value)}>
            <option value="">Select Program</option>
            <option value="computer-science">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="mathematics">Mathematics</option>
            <option value="business-administration">Business Administration</option>
            <option value="health-sciences">Health Sciences</option>
          </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="facultyDivision" className="mb-3">
          <FloatingLabel label="Faculty/Division:">
          <Form.Select as="select" value={facultyDivision} onChange={(event) => setFacultyDivision(event.target.value)}>
            <option value="">Select Faculty/Division</option>
            <option value="information">Information</option>
            <option value="science">Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="health-sciences">Health Sciences</option>
          </Form.Select>
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

export default GraduatePrograms;
