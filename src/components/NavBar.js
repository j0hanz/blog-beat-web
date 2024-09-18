import React, { useState, useEffect } from 'react';
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
  faPersonWalkingArrowRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import logoOnly from '../assets/logoOnly.webp';
import defaultProfileImage from '../assets/nobody.webp';
import styles from './styles/NavBar.module.css';
import TooltipWrapper from './TooltipWrapper';
import Icon from './Icon';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import About from '../pages/About';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();
  const toggleOffcanvas = () => setShowOffcanvas((prev) => !prev);
  const toggleAboutModal = () => setShowAbout((prev) => !prev);

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
      toast.info('You have logged out!');
      navigate('/');
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const generateNavItem = (to, icon, label, handleClick) => (
    <NavLink
      className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
      to={to}
      onClick={handleClick}
    >
      <FontAwesomeIcon size="lg" icon={icon} />
      <span className="mx-auto">{label}</span>
      <FontAwesomeIcon size="lg" icon={faAngleRight} />
    </NavLink>
  );

  const loggedInIcons = (
    <>
      {generateNavItem('/feed', faBarsStaggered, 'Feed', toggleOffcanvas)}
      {generateNavItem('/liked', faThumbsUp, 'Liked', toggleOffcanvas)}
      {generateNavItem('/favorites', faStar, 'Favorites', toggleOffcanvas)}
      <hr />
      {generateNavItem(
        `/profiles/${currentUser?.profile_id}/edit`,
        faUserEdit,
        'Edit Profile',
        toggleOffcanvas
      )}
      {generateNavItem(
        `/profiles/${currentUser?.profile_id}/edit/password`,
        faKey,
        'Update Password',
        toggleOffcanvas
      )}
      <hr />
      <NavLink
        className={`${styles.NavLink} text-white d-flex align-items-center btn btn-dark rounded p-2 border my-2`}
        to="/"
        onClick={handleSignOut}
      >
        <FontAwesomeIcon size="lg" icon={faSignOutAlt} />
        <span className="mx-auto">Sign out</span>
        <FontAwesomeIcon size="lg" icon={faAngleRight} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      {generateNavItem(
        '/signin',
        faArrowRightToBracket,
        'Login',
        toggleOffcanvas
      )}
      {generateNavItem('/signup', faUserPlus, 'Sign Up', toggleOffcanvas)}
    </>
  );

  return (
    <>
      <Navbar className="navbar-dark bg-dark fixed-top py-3">
        <Container fluid>
          <NavLink to="/" className="position-relative">
            <img
              src={logo}
              alt="Logo"
              className={`position-absolute translate-middle-y top-0 start-0 ${styles.logoNav}`}
            />
            <img
              src={logoOnly}
              alt="Logo Only"
              className={`position-absolute translate-middle-y top-0 start-0 ${styles.logoNavMobile}`}
            />
          </NavLink>

          <Nav>
            <NavLink to="/" className={styles.navLinkEffect}>
              <TooltipWrapper message="Home">
                <FontAwesomeIcon
                  className="mx-4 mx-md-5"
                  icon={faHouse}
                  size="lg"
                />
              </TooltipWrapper>
            </NavLink>
            <div className={styles.navLinkEffect} onClick={toggleAboutModal}>
              <TooltipWrapper message="About">
                <FontAwesomeIcon
                  className="mx-4 mx-md-5"
                  icon={faCircleInfo}
                  size="lg"
                />
              </TooltipWrapper>
            </div>
            <NavLink to="/posts/create" className={styles.navLinkEffect}>
              <TooltipWrapper message="New Post">
                <FontAwesomeIcon
                  className="mx-4 mx-md-5"
                  icon={faSquarePlus}
                  size="lg"
                />
              </TooltipWrapper>
            </NavLink>
          </Nav>
          <div className="position-relative">
            <Nav.Link
              onClick={toggleOffcanvas}
              className="position-absolute translate-middle-y top-0 end-0"
            >
              {currentUser ? (
                <Icon
                  src={currentUser?.profile_image || defaultProfileImage}
                  height={30}
                />
              ) : (
                <FontAwesomeIcon
                  className={styles.navLinkEffect}
                  icon={faPersonWalkingArrowRight}
                  size="lg"
                />
              )}
            </Nav.Link>
          </div>
          <Offcanvas
            show={showOffcanvas}
            onHide={toggleOffcanvas}
            placement="end"
            className={`bg-dark text-white ${styles.offcanvasWidth}`}
          >
            <Offcanvas.Header>
              {currentUser ? (
                <>
                  <TooltipWrapper message="Profile">
                    <NavLink to={`/profiles/${currentUser?.profile_id}/`}>
                      <Icon
                        src={currentUser?.profile_image || defaultProfileImage}
                        height={55}
                      />
                    </NavLink>
                  </TooltipWrapper>
                  <Offcanvas.Title className="mx-auto">
                    {currentUser?.username}
                  </Offcanvas.Title>
                </>
              ) : (
                <div className="text-center w-100">
                  <img src={logo} alt="Logo" className={styles.logoOffcanvas} />
                </div>
              )}
              <Button
                variant="link"
                className="text-white btn-outline-secondary btn-sm ms-auto"
                onClick={toggleOffcanvas}
              >
                <FontAwesomeIcon size="lg" icon={faTimes} />
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
      <About show={showAbout} handleClose={toggleAboutModal} />
    </>
  );
};

export default NavBar;
