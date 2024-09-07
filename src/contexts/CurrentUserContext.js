import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import axios from 'axios';
import { axiosRes, axiosReq } from '../api/axiosDefaults';

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await axiosRes.get('/dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.error('Error fetching current user:', err);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const refreshAuthToken = async () => {
    try {
      await axios.post('/dj-rest-auth/token/refresh/');
    } catch (err) {
      console.error('Error refreshing token:', err);
      setCurrentUser(null);
      throw err;
    }
  };

  const setupInterceptors = useCallback(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (currentUser) {
          await refreshAuthToken();
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && currentUser) {
          try {
            await refreshAuthToken();
            return axios(err.config);
          } catch (error) {
            console.error('Error refreshing token:', error);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser]);

  useEffect(() => {
    const cleanupInterceptors = setupInterceptors();
    return cleanupInterceptors;
  }, [setupInterceptors]);

  const contextValue = useMemo(() => currentUser, [currentUser]);
  const setContextValue = useMemo(() => setCurrentUser, []);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <SetCurrentUserContext.Provider value={setContextValue}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
