import React from 'react';
import { Form, Button, InputGroup, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/SignInForm.module.css';

const SignInForm = ({
  showModal,
  handleClose,
  handleSubmit,
  handleChange,
  handleSignUp,
  username,
  password,
  renderError,
}) => (
  <Modal show={showModal} onHide={handleClose} centered>
    <Modal.Header className="d-flex justify-content-center p-3 bg-dark position-relative border-0">
      <Modal.Title className="text-center">Login</Modal.Title>
      <Button
        variant="link"
        className="text-white position-absolute end-0 top-0 btn-outline-secondary btn-sm"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </Modal.Header>
    <Modal.Body className={`text-center ${styles.modalHeadBg}`}>
      <Form className="m-3" onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </InputGroup>
          {renderError('username')}
        </Form.Group>

        <Form.Group controlId="password" className="mb-4">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </InputGroup>
          {renderError('password')}
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            className={`btn-outline-primary btn-lg ${styles.buttonOutlinePrimary}`}
            type="submit"
          >
            Login
          </Button>
        </div>

        {renderError('non_field_errors')}

        <div className="mt-4">
          Don't have an account?
          <p>
            <Button
              variant="outline-light"
              className="mt-3"
              onClick={handleSignUp}
            >
              Sign up now!
            </Button>
          </p>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);

export default SignInForm;
