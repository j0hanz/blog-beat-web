import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faEdit,
  faTrashAlt,
  faIdCard,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/MoreDropdown.module.css';
import { useNavigate } from 'react-router-dom';

/* ThreeDots component function using forwardRef */
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <FontAwesomeIcon
    className="btn btn-outline-light p-1 ms-1"
    icon={faEllipsis}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

/* UserEditProfile component function using forwardRef */
const UserEditProfile = React.forwardRef(({ onClick }, ref) => (
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

/* MoreDropdown component function */
export const MoreDropdown = ({ handleEdit, handleShowConfirm }) => {
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
          <span>Edit</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleShowConfirm}
          aria-label="delete"
        >
          <FontAwesomeIcon
            className={`fa-lg ${styles.faTrashAlt}`}
            icon={faTrashAlt}
          />
          <span>Delete</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/* ProfileEditDropdown component function */
export const ProfileEditDropdown = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={UserEditProfile} />
      <Dropdown.Menu className={`text-center ${styles.DropdownMenu}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <FontAwesomeIcon className={`fa-lg ${styles.faEdit}`} icon={faEdit} />
          <span>Edit Profile</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <FontAwesomeIcon
            className={`fa-lg ${styles.faIdCard}`}
            icon={faIdCard}
          />
          <span>Change Username</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <FontAwesomeIcon className={`fa-lg ${styles.faKey}`} icon={faKey} />
          <span>Change Password</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
