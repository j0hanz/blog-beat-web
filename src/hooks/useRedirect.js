import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shouldRefreshToken, removeTokenTimestamp } from '../utils/utils';
import { toast } from 'react-toastify';

/* Custom hook to redirect user based on authentication status */
export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  /* Redirect user based on authentication status */
  useEffect(() => {
    const handleMount = async () => {
      try {
        if (shouldRefreshToken()) {
          await axios.post('/dj-rest-auth/token/refresh/');
        }
        if (userAuthStatus === 'loggedIn') {
          navigate('/');
          return;
        }
      } catch (err) {
        removeTokenTimestamp();
        if (userAuthStatus === 'loggedOut') {
          navigate('/');
          return;
        }
        console.error('Redirection error:', err);
        toast.error('An error occurred. Please try again.');
      }
    };
    handleMount();
  }, [navigate, userAuthStatus]);
};
