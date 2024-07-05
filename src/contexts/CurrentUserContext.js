import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

/* Hook to use current user context */
export const useCurrentUser = () => useContext(CurrentUserContext);
/* Hook to use set current user context */
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/* CurrentUserProvider component to manage current user state */
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  /* Function to handle component mount */
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (!currentUser) {
          return config;
        }
        try {
          await axios.post('/dj-rest-auth/token/refresh/');
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              navigate('/signin');
              toast.error('Session expired. Please sign in again.');
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        toast.error('Request failed. Please try again.');
        return Promise.reject(err);
      },
    );
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && currentUser) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
                toast.error('Session expired. Please sign in again.');
              }
              return null;
            });
          }
          return axios(err.config);
        }
        toast.error('Response failed. Please try again.');
        return Promise.reject(err);
      },
    );
  }, [currentUser, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
