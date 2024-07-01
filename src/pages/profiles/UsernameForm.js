import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import { axiosRes } from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';

const UsernameForm = () => {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    console.log(
      `UsernameForm useEffect: Checking profile ownership for ID: ${id}`,
    );
    console.log(
      `UsernameForm useEffect: Current User Profile ID: ${currentUser?.profile_id}`,
    );
    if (id === undefined) {
      console.error('UsernameForm: ID is undefined!');
      return;
    }
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      navigate('/');
    }
  }, [currentUser, navigate, id]);

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
      navigate(-1);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
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
            <Button onClick={() => navigate(-1)}>cancel</Button>
            <Button type="submit">save</Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
