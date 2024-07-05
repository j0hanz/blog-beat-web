import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './styles/Asset.module.css';

/* Asset component function */
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-5`}>
      {spinner && <Spinner animation="border" className={styles.spinner} />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
