import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/ProfileEditForm.module.css';

const UserPasswordForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: '',
    new_password2: '',
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (id === undefined) {
      console.error('UserPasswordForm: ID is undefined!');
      return;
    }
    if (currentUser?.pk?.toString() !== id) {
      navigate('/');
    }
  }, [currentUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post('/dj-rest-auth/password/change/', userData);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header
        className={`d-flex justify-content-center p-3 ${styles.modalHeadBg} position-relative`}
      >
        <Modal.Title className="text-center">Change Password</Modal.Title>
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
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
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
              variant="outline-primary"
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

export default UserPasswordForm;
