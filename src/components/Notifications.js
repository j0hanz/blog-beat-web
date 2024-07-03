import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="dark"
      pauseOnHover
    />
  );
};

export default Notifications;
