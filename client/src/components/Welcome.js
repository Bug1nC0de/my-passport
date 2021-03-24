import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { login } from '../actions/auth';

const Welcome = ({ isAuth, login }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="mt-3" xs={12} md={6}>
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
            Sign In Below: or <Link to="/register">Register</Link>
          </h5>
          <hr />
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="username"
                value={username}
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
            <Button variant="success btn-block mt-2" type="submit">
              Submit <i className="fas fa-arrow-circle-right ml-3"></i>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Welcome);
