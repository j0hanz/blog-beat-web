import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, InputGroup, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './styles/Login.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from "../../utils/utils";

/* SignInForm component for user login */
function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn');

  /* State to manage sign in data */
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = signInData;

  /* State to manage errors */
  const [errors, setErrors] = useState({});
  /* State to manage modal visibility */
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  /* Function to handle closing the modal */
  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  /* Function to handle sign up redirection */
  const handleSignUp = () => {
    setShowModal(false);
    navigate('/signup');
  };

  /* Function to handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      toast.success('Logged in successfully!');
      setTokenTimestamp(data);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  /* Function to handle input change */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
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
          <div className="mt-4">
            Don't have an account?{' '}
            <p className="mt-3">
              <Button variant="outline-light" onClick={handleSignUp}>
                Sign up now!
              </Button>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignInForm;
