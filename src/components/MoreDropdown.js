import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/MoreDropdown.module.css';

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

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="start">
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
