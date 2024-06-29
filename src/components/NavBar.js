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
  faUserEdit,
  faKey,
  faBarsStaggered,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
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

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [show, setShow] = useState(false);
  const toggleOffcanvas = () => setShow(!show);

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to="/feed"
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon
          className={`fa-xl ${styles.faBarsStaggered}`}
          icon={faBarsStaggered}
        />
        <span className="mx-auto">Feed</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to="/liked"
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon
          className={`fa-xl ${styles.faThumbsUp}`}
          icon={faThumbsUp}
        />
        <span className="mx-auto">Liked</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
      <hr />
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to={`/profiles/${currentUser?.profile_id}/edit`}
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon className="fa-xl" icon={faUserEdit} />
        <span className="mx-auto">Edit Profile</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to={`/profiles/${currentUser?.profile_id}/password`}
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon className={`fa-xl ${styles.faKey}`} icon={faKey} />
        <span className="mx-auto">Update Password</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
      <hr />
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to="/"
        onClick={() => {
          handleSignOut();
        }}
      >
        <FontAwesomeIcon
          className={`fa-xl ${styles.faSignOutAlt}`}
          icon={faSignOutAlt}
        />
        <span className="mx-auto">Sign out</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to="/signin"
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon className="fa-xl" icon={faArrowRightToBracket} />
        <span className="mx-auto">Login</span>
        <FontAwesomeIcon className="fa-xl" icon={faAngleRight} />
      </NavLink>
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to="/signup"
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
              <FontAwesomeIcon className="fa-xl mx-3 mx-md-5" icon={faHouse} />
            </TooltipWrapper>
          </NavLink>
          <NavLink to="/about" className={styles.navLinkEffect}>
            <TooltipWrapper message="About">
              <FontAwesomeIcon
                className="fa-xl mx-3 mx-md-5"
                icon={faCircleInfo}
              />
            </TooltipWrapper>
          </NavLink>
          <NavLink to="/posts/create" className={styles.navLinkEffect}>
            <TooltipWrapper message="New Post">
              <FontAwesomeIcon
                className="fa-xl mx-3 mx-md-5"
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
