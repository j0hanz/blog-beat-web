import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Confirms.module.css';

/* Confirm component */
const Confirm = ({ show, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header
        className={`d-flex justify-content-center p-3 border-0 ${styles.modalBodyBg} position-relative`}
      >
        <Modal.Title className="text-center">Confirm Deletion</Modal.Title>
        <Button
          variant="link"
          className="text-white position-absolute end-0 top-0 btn-outline-secondary btn-sm"
          onClick={onCancel}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={`text-center ${styles.modalBodyBg}`}>
        <p>Are you sure you want to delete?</p>
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-secondary"
            className={`mx-2 ${styles.buttonOutlinePrimary}`}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className={`mx-2 ${styles.buttonOutlinePrimary}`}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Confirm;
