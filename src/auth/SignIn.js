import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSetCurrentUser } from '../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../utils/utils';
import SignInForm from '../forms/SignInForm';

/* SignIn component for user login */
function SignIn() {
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
    /* Check that required fields are provided */
    if (!signInData.username || !signInData.password) {
      toast.error('Please enter both username and password.');
      return;
    }
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      toast.success('Logged in successfully!');
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data || {});
      console.error('Login error:', err);
      toast.error('Failed to log in. Please check your credentials.');
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
    <SignInForm
      showModal={showModal}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleSignUp={handleSignUp}
      username={username}
      password={password}
      renderError={renderError}
    />
  );
}

export default SignIn;
