import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      console.log('Fetched user data:', data);
      setCurrentUser(data);
      console.log('Current user state after setting data:', data);
    } catch (err) {
      console.log('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        console.log('Request Interceptor - Config:', config);
        if (shouldRefreshToken()) {
          try {
            console.log('Refreshing token');
            await axios.post('/dj-rest-auth/token/refresh/');
            console.log('Token refreshed');
          } catch (err) {
            console.log('Error refreshing token:', err);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        console.log('Request Interceptor Error:', err);
        return Promise.reject(err);
      },
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        console.log('Response Interceptor Error:', err);
        if (err.response?.status === 401) {
          try {
            console.log('Refreshing token after 401 error');
            await axios.post('/dj-rest-auth/token/refresh/');
            console.log('Token refreshed after 401 error');
          } catch (err) {
            console.log('Error refreshing token after 401 error:', err);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      },
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
