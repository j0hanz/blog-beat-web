import React, { useState } from 'react';
import { Navbar, Nav, Offcanvas, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faArrowRightToBracket,
  faUserPlus,
  faCircleInfo,
  faSquarePlus,
  faTimes,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import nobody from '../assets/nobody.webp';
import styles from './styles/NavBar.module.css';
import TooltipWrapper from './TooltipWrapper';
import { useCurrentUser } from '../contexts/CurrentUserContext'; // Correct import

const NavBar = () => {
  const currentUser = useCurrentUser();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toggleOffcanvas = () => setShow(!show);
  const handleNavLinkClick = (path) => {
    toggleOffcanvas();
    navigate(path);
  };
  const loggedInIcons = (
    <>
      <Nav.Link
        onClick={() => handleNavLinkClick('/profile')}
        className="text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2"
      >
        <FontAwesomeIcon className="fa-xl" icon={faUserPlus} />
        <span className="mx-auto">{currentUser?.username}</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </Nav.Link>
    </>
  );
  const loggedOutIcons = (
    <>
      <Nav.Link
        onClick={() => handleNavLinkClick('/login')}
        className="text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2"
      >
        <FontAwesomeIcon className="fa-xl" icon={faArrowRightToBracket} />
        <span className="mx-auto">Login</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </Nav.Link>
      <Nav.Link
        onClick={() => handleNavLinkClick('/signup')}
        className="text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2"
      >
        <FontAwesomeIcon className="fa-xl" icon={faUserPlus} />
        <span className="mx-auto">Sign Up</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </Nav.Link>
    </>
  );
  return (
    <Navbar className="navbar-dark bg-dark">
      <Container fluid>
        <Nav.Link href="/">
          <img src={logo} alt="Logo" className={styles.logoNav} />
        </Nav.Link>
        <Nav className="mx-auto">
          <Nav.Link href="/" className={styles.navLinkEffect}>
            <TooltipWrapper message="Home">
              <FontAwesomeIcon className="fa-xl mx-3 mx-md-5" icon={faHouse} />
            </TooltipWrapper>
          </Nav.Link>
          <Nav.Link href="/about" className={styles.navLinkEffect}>
            <TooltipWrapper message="About">
              <FontAwesomeIcon
                className="fa-xl mx-3 mx-md-5"
                icon={faCircleInfo}
              />
            </TooltipWrapper>
          </Nav.Link>
          <Nav.Link href="/newpost" className={styles.navLinkEffect}>
            <TooltipWrapper message="New Post">
              <FontAwesomeIcon
                className="fa-xl mx-3 mx-md-5"
                icon={faSquarePlus}
              />
            </TooltipWrapper>
          </Nav.Link>
        </Nav>
        <Button variant="outline-dark p-1" onClick={toggleOffcanvas}>
          <TooltipWrapper message="Profile">
            <img
              src={nobody}
              alt="Profile"
              className={`${styles.nobodyImg} rounded-circle`}
            />
          </TooltipWrapper>
        </Button>
        <Offcanvas
          show={show}
          onHide={toggleOffcanvas}
          placement="end"
          className={`bg-dark text-white ${styles.offcanvasWidth}`}
        >
          <Offcanvas.Header>
            <img
              src={nobody}
              alt="Profile"
              className={`${styles.nobodyImgToggle} rounded`}
            />
            <Offcanvas.Title className="mx-auto">User</Offcanvas.Title>
            <Button
              variant="link"
              className="text-white btn-outline-secondary btn-sm"
              onClick={toggleOffcanvas}
            >
              <FontAwesomeIcon className="fa-lg" icon={faTimes} />
            </Button>
          </Offcanvas.Header>
          <hr />
          <Offcanvas.Body className={styles.offcanvasBody}>
            <Nav className="flex-column">
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
