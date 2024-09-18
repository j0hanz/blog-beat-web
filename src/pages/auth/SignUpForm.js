import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faKey, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, InputGroup, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './styles/Signup.module.css';
import { useRedirect } from '../../hooks/useRedirect';

/* SignUpForm component for user registration */
function SignUpForm() {
  useRedirect('loggedIn');

  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  /* Handle input change */
  const handleChange = ({ target: { name, value } }) => {
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      toast.success('Account created successfully! Please login.');
      navigate('/signin');
    } catch (err) {
      setErrors(err.response?.data || {});
      toast.error('An error occurred. Please try again.');
    }
  };

  /* Handle modal close */
  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  /* Handle login button click */
  const handleLogin = () => {
    setShowModal(false);
    navigate('/signin');
  };

  /* Render error messages */
  const renderError = (errorKey) =>
    errors[errorKey]?.map((message, idx) => (
      <Alert variant="warning" key={idx}>
        {message}
      </Alert>
    ));

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header className="d-flex justify-content-center p-3 bg-dark position-relative border-0">
        <Modal.Title className="text-center">Sign Up</Modal.Title>
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
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUserPlus} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Create Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </InputGroup>
            {renderError('username')}
          </Form.Group>

          <Form.Group controlId="password1" className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </InputGroup>
            {renderError('password1')}
          </Form.Group>

          <Form.Group controlId="password2" className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </InputGroup>
            {renderError('password2')}
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              className={`btn-outline-primary btn-lg ${styles.buttonOutlinePrimary}`}
              type="submit"
            >
              Sign Up
            </Button>
          </div>

          {renderError('non_field_errors')}

          <div className="mt-4">
            Already have an account?
            <p>
              <Button
                variant="outline-light"
                className="mt-3"
                onClick={handleLogin}
              >
                Login here!
              </Button>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpForm;
