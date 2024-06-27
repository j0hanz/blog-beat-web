import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles/Signup.module.css";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header className="d-flex justify-content-center p-3 bg-dark position-relative">
        <Modal.Title className="text-center">Sign Up</Modal.Title>
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
            <Form.Label className="d-none">Username</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUserPlus} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Create Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group controlId="password1" className="mb-3">
            <Form.Label className="d-none">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group controlId="password2" className="mb-3">
            <Form.Label className="d-none">Confirm password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </InputGroup>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              className={`btn-outline-primary btn-lg ${styles.buttonOutlinePrimary}`}
              type="submit"
            >
              Sign Up
            </Button>
          </div>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
          <p className="mt-4">
            Already have an account?{" "}
            <span className="mt-2">
              <Link
                to="/signin"
                onClick={handleClose}
                className="btn btn-outline-light"
              >
                Login here!
              </Link>
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpForm;
