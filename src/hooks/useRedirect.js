import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook to handle redirecting based on user authentication status
export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          navigate("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          navigate("/");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
