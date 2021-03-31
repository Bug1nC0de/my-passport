import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from '../actions/auth';
import { setNote } from '../actions/note';

const Register = ({ register, setNote }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setNote('Passwords do not match', 'danger fixed-top');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="mt-3" xs={12} md={6}>
          <Form onSubmit={onSubmit}>
            <Card.Header>
              <Row>
                <Col>
                  <h5 align="center">Sign In with social: </h5>
                </Col>
                <Col align="center">
                  <a href="/auth/facebook" className="btn btn-outline-primary">
                    <i className="fab fa-facebook-f"></i>
                  </a>{' '}
                  <a href="/auth/google" className="btn btn-outline-danger">
                    <i className="fab fa-google"></i>
                  </a>
                </Col>
              </Row>
            </Card.Header>
            <h5 align="center">
              Create a User or <Link to="/">Sign In</Link>
            </h5>
            <hr />
            <Form.Group>
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group></Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Button variant="success btn-block mt-2" type="submit">
              Submit <i className="fas fa-arrow-circle-right ml-3"></i>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, { register, setNote })(Register);
