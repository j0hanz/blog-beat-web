import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, InputGroup, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './styles/Login.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../../utils/utils';

/* SignInForm component for user login */
function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  /* Handle modal close */
  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  /* Handle sign up button click */
  const handleSignUp = () => {
    setShowModal(false);
    navigate('/signup');
  };

  /* Handle input change */
  const handleChange = ({ target: { name, value } }) => {
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      toast.success('Logged in successfully!');
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data || {});
    }
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
            {renderError('username')}
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
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
            {renderError('password')}
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              className={`btn-outline-primary btn-lg ${styles.buttonOutlinePrimary}`}
              type="submit"
            >
              Login
            </Button>
          </div>

          {renderError('non_field_errors')}

          <div className="mt-4">
            Don't have an account?
            <p>
              <Button
                variant="outline-light"
                className="mt-3"
                onClick={handleSignUp}
              >
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
