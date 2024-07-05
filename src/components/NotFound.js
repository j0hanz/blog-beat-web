import React from 'react';
import NoResults from '../assets/no-results.png';
import styles from './styles/NotFound.module.css';
import Asset from './Asset';

/* NotFound component to display a 'page not found' message */
const NotFound = () => {
  return (
    <div className={`d-flex flex-column align-items-center ${styles.NotFound}`}>
      <Asset
        src={NoResults}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    </div>
  );
};

export default NotFound;
