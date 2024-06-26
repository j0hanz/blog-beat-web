import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faEdit,
  faTrashAlt,
  faEllipsisVertical,
  faIdCard,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/MoreDropdown.module.css';
import { useNavigate } from 'react-router-dom';

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <FontAwesomeIcon
    className="btn btn-outline-light p-1"
    icon={faEllipsis}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

const VerticalThreeDots = React.forwardRef(({ onClick }, ref) => (
  <FontAwesomeIcon
    className="btn btn-outline-light p-1"
    icon={faEllipsisVertical}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown drop="start">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={`text-center ${styles.DropdownMenu}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <FontAwesomeIcon className={`fa-lg ${styles.faEdit}`} icon={faEdit} />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <FontAwesomeIcon
            className={`fa-lg ${styles.faTrashAlt}`}
            icon={faTrashAlt}
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const navigate = useNavigate();

  console.log(`ProfileEditDropdown ID: ${id}`);

  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={VerticalThreeDots} />
      <Dropdown.Menu className={`text-center ${styles.DropdownMenu}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => {
            console.log(`Navigating to /profiles/${id}/edit`);
            navigate(`/profiles/${id}/edit`);
          }}
          aria-label="edit-profile"
        >
          <FontAwesomeIcon className={`fa-lg ${styles.faEdit}`} icon={faEdit} />
          <span className={styles.DropdownItem}>edit profile</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => {
            console.log(`Navigating to /profiles/${id}/edit/username`);
            navigate(`/profiles/${id}/edit/username`);
          }}
          aria-label="edit-username"
        >
          <FontAwesomeIcon
            className={`fa-lg ${styles.faIdCard}`}
            icon={faIdCard}
          />
          <span className={styles.DropdownItem}>change username</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => {
            console.log(`Navigating to /profiles/${id}/edit/password`);
            navigate(`/profiles/${id}/edit/password`);
          }}
          aria-label="edit-password"
        >
          <FontAwesomeIcon className={`fa-lg ${styles.faKey}`} icon={faKey} />
          <span className={styles.DropdownItem}>change password</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
