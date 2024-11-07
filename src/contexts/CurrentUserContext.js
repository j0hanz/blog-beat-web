import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useNavigate } from 'react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

/* Context to store the current user data */
export const CurrentUserContext = createContext();
/* Context to set the current user data */
export const SetCurrentUserContext = createContext();

/* Hook to access current user context */
export const useCurrentUser = () => useContext(CurrentUserContext);
/* Hook to access set current user context */
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const isInterceptorSetup = useRef(false);

  /* Fetch current user data on mount */
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setCurrentUser(null);
    }
  };

  /* Run handleMount on component mount */
  useEffect(() => {
    handleMount();
  }, []);

  /* Setup axios interceptors for request and response */
  useEffect(() => {
    if (!isInterceptorSetup.current) {
      isInterceptorSetup.current = true;

      /* Request interceptor to refresh token if needed */
      axiosReq.interceptors.request.use(
        async (config) => {
          if (shouldRefreshToken() && !isRefreshing) {
            setIsRefreshing(true);
            try {
              await axios.post('/dj-rest-auth/token/refresh/');
            } catch (err) {
              setCurrentUser(null);
              removeTokenTimestamp();
              navigate('/signin');
              return Promise.reject(err);
            } finally {
              setIsRefreshing(false);
            }
          }
          return config;
        },
        (err) => Promise.reject(err)
      );

      /* Response interceptor to handle 401 errors and refresh token if needed */
      axiosRes.interceptors.response.use(
        (response) => response,
        async (err) => {
          if (
            err.response?.status === 401 &&
            shouldRefreshToken() &&
            !isRefreshing
          ) {
            setIsRefreshing(true);
            try {
              await axios.post('/dj-rest-auth/token/refresh/');
              return axios(err.config);
            } catch (refreshErr) {
              setCurrentUser(null);
              removeTokenTimestamp();
              navigate('/signin');
              return Promise.reject(refreshErr);
            } finally {
              setIsRefreshing(false);
            }
          }
          return Promise.reject(err);
        }
      );
    }
  }, [navigate, isRefreshing]);

  /* Memoized context values to avoid re-renders */
  const providerValue = useMemo(() => currentUser, [currentUser]);
  const providerSetCurrentUserValue = useMemo(
    () => setCurrentUser,
    [setCurrentUser]
  );

  return (
    <CurrentUserContext.Provider value={providerValue}>
      <SetCurrentUserContext.Provider value={providerSetCurrentUserValue}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
