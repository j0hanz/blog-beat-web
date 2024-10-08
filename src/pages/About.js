import React from 'react';
import { Modal, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './styles/About.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import logo from '../assets/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faArrowRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

/* Array of team members with their roles */
const teamMembers = [
  {
    name: 'Linus Johansson',
    role: 'Founder & Creator of Blog Beat',
  },
];

/* Array of features offered by the platform */
const features = [
  'Create and share posts',
  'Comment and like',
  'Customize your profile',
  'Follow other users',
  'Save favorite posts',
  'Search for content',
];

/* About component to display information about the platform */
const About = ({ show, handleClose }) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  /* Handle navigation to sign up page */
  const handleSignUp = () => {
    handleClose();
    navigate('/signup');
  };

  /* Handle navigation to login page */
  const handleLogin = () => {
    handleClose();
    navigate('/signin');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Body className="bg-dark text-white rounded">
        <Button
          variant="link"
          className="text-white position-absolute end-0 top-0 btn-outline-secondary btn-sm"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <Container className={styles.About}>
          <Row className="text-center my-4">
            <Col>
              <img src={logo} className={styles.logo} alt="Blog Beat Logo" />
            </Col>
          </Row>
          <Row className="text-center my-4">
            <Col xs={12}>
              <p className="lead">
                Blog Beat is an interactive web application for reading,
                writing, and interacting with blog posts. It provides a
                user-friendly platform for bloggers, readers, and content
                creators to share ideas and engage with the community.
              </p>
            </Col>
          </Row>
          <Row className="my-4">
            <Col xs={12} md={6}>
              <h2 className="mb-3">About Blog Beat</h2>
              <p>
                Blog Beat provides a platform that enables people to share their
                stories, connect with others, and build a community. We believe
                in the power of storytelling and the impact it can have on our
                lives.
              </p>
              {!currentUser && (
                <>
                  <div className="mt-4">
                    <Button
                      variant="outline-light"
                      className="me-2 mb-4"
                      onClick={handleSignUp}
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                      <span className="mx-1">Sign up now!</span>
                    </Button>
                    <Button
                      variant="outline-light"
                      className="mb-4"
                      onClick={handleLogin}
                    >
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                      <span className="mx-1">Login here!</span>
                    </Button>
                  </div>
                </>
              )}
            </Col>
            <Col xs={12} md={6}>
              <h2>Features</h2>
              <ul className={styles.FeaturesList}>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            {teamMembers.map((member, index) => (
              <Col lg={4} className="mb-4" key={index}>
                <Card className={styles.TeamCard}>
                  <Card.Body className="bg-dark bg-opacity-10">
                    <Card.Title className="text-white">
                      {member.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-white-50">
                      {member.role}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default About;
