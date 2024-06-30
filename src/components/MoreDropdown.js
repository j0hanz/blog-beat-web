import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/MoreDropdown.module.css';

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <FontAwesomeIcon
    icon={faEllipsisV}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: 'fixed' }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
