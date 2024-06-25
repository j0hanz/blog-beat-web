import React from 'react';
import styles from './styles/Icon.module.css';

const Icon = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Icon}
        src={src}
        height={height}
        width={height}
        alt="Icon"
      />
      {text}
    </span>
  );
};

export default Icon;
