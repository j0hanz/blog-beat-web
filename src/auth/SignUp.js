import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRedirect } from '../hooks/useRedirect';
import SignUpForm from '../forms/SignUpForm';

/* SignUp component for user registration */
function SignUp() {
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
    <SignUpForm
      showModal={showModal}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleLogin={handleLogin}
      username={username}
      password1={password1}
      password2={password2}
      renderError={renderError}
    />
  );
}

export default SignUp;
