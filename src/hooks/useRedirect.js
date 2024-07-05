import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Custom hook to redirect user based on authentication status */
export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    /* Function to handle component mount */
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // if the user is logged in, this code will run
        if (userAuthStatus === 'loggedIn') {
          navigate('/');
        }
      } catch (err) {
        // if the user is not logged in, the code below will run instead
        if (userAuthStatus === 'loggedOut') {
          navigate('/');
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
