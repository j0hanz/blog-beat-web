import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles/Login.module.css';
import { SetCurrentUserContext } from '../../contexts/CurrentUserContext';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = loginData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const setCurrentUser = useContext(SetCurrentUserContext);
  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', loginData, {
        withCredentials: true,
      });
      setCurrentUser(data.user);
      navigate('/');
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };
  const handleClose = () => {
    navigate('/');
  };
  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header className="d-flex justify-content-center p-3 bg-dark position-relative">
        <Modal.Title className="text-center">Login</Modal.Title>
        <Button
          variant="link"
          className="text-white position-absolute end-0 top-0 btn-outline-secondary btn-sm"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={`text-center ${styles.modalHeadBg}`}>
        <Form className="m-3" onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label className="d-none">Username</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group controlId="password" className="mb-4">
            <Form.Label className="d-none">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              className={`btn-outline-primary btn-lg ${styles.buttonOutlinePrimary}`}
              type="submit"
            >
              Login
            </Button>
          </div>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
          <p className="mt-4">
            Don't have an account?{' '}
            <p className="mt-2">
              <Link
                to="/signup"
                onClick={handleClose}
                className="btn btn-outline-light"
              >
                Sign up now!
              </Link>
            </p>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
