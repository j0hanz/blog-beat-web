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
  faSignOutAlt,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../assets/logo.webp';
import nobody from '../assets/nobody.webp';
import styles from './styles/NavBar.module.css';
import TooltipWrapper from './TooltipWrapper';
import Icon from './Icon';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import axios from 'axios';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toggleOffcanvas = () => setShow(!show);
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  const loggedInIcons = (
    <>
      <NavLink
        to="/"
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        onClick={handleSignOut}
      >
        <FontAwesomeIcon className="fa-xl" icon={faSignOutAlt} />
        Sign out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        onClick={toggleOffcanvas}
      >
        <Icon
          src={currentUser?.profile_image || nobody}
          text="Profile"
          height={40}
        />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/login"
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon className="fa-xl" icon={faArrowRightToBracket} />
        <span className="mx-auto">Login</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
      <NavLink
        to="/signup"
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon className="fa-xl" icon={faUserPlus} />
        <span className="mx-auto">Sign Up</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
    </>
  );
  return (
    <Navbar className="navbar-dark bg-dark">
      <Container fluid>
        <Nav.Link href="/">
          <img src={logo} alt="Logo" className={styles.logoNav} />
        </Nav.Link>
        <Nav className="mx-auto">
          <NavLink to="/" className={styles.navLinkEffect}>
            <TooltipWrapper message="Home">
              <FontAwesomeIcon className="fa-xl mx-4 mx-md-5" icon={faHouse} />
            </TooltipWrapper>
          </NavLink>
          <NavLink to="/about" className={styles.navLinkEffect}>
            <TooltipWrapper message="About">
              <FontAwesomeIcon
                className="fa-xl mx-4 mx-md-5"
                icon={faCircleInfo}
              />
            </TooltipWrapper>
          </NavLink>
          <NavLink to="/newpost" className={styles.navLinkEffect}>
            <TooltipWrapper message="New Post">
              <FontAwesomeIcon
                className="fa-xl mx-4 mx-md-5"
                icon={faSquarePlus}
              />
            </TooltipWrapper>
          </NavLink>
        </Nav>
        <Button variant="outline-dark p-1" onClick={toggleOffcanvas}>
          <TooltipWrapper message="Profile">
            <Icon
              src={currentUser ? currentUser.profile_image || nobody : nobody}
              height={35}
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
            <Icon
              src={currentUser ? currentUser.profile_image || nobody : nobody}
              height={55}
            />
            <Offcanvas.Title className="mx-auto">
              {currentUser ? currentUser.username : 'User'}
            </Offcanvas.Title>
            <Button
              variant="link"
              className="text-white btn-outline-secondary btn-sm ms-auto"
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
