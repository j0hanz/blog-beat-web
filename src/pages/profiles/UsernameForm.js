import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { axiosRes } from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/ProfileEditForm.module.css';

/* UsernameForm component for updating the username */
const UsernameForm = () => {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  /* Handle closing the form */
  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    /* Set the current username if the user ID matches */
    if (currentUser?.pk?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      navigate('/');
    }
  }, [currentUser, navigate, id]);

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put('/dj-rest-auth/user/', {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      toast.success('Username updated successfully!');
      navigate(-1);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
      toast.error('Failed to update username. Please try again.');
    }
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header
        className={`d-flex justify-content-center p-3 ${styles.modalHeadBg} position-relative`}
      >
        <Modal.Title className="text-center">Edit Username</Modal.Title>
        <Button
          variant="link"
          className="text-white position-absolute end-0 top-0 btn-outline-secondary btn-sm"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={`text-center ${styles.modalBodyBg}`}>
        <Form onSubmit={handleSubmit}>
          <Container className="text-center">
            <Form.Group className="mb-3">
              <Form.Label>Change username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              variant="outline-warning"
              onClick={handleClose}
              className="mx-3 btn-lg"
            >
              Cancel
            </Button>
            <Button
              variant="outline-primary text-white"
              type="submit"
              className="mx-3 btn-lg"
            >
              Save
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UsernameForm;
