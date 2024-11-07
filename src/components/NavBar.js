import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faUserPlus,
  faSignOutAlt,
  faAngleRight,
  faUserEdit,
  faKey,
  faBarsStaggered,
  faThumbsUp,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';
import NavbarForm from '../forms/NavbarForm';
import About from '../pages/About';
import styles from './styles/NavBar.module.css';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();
  const toggleOffcanvas = () => setShowOffcanvas((prev) => !prev);
  const toggleAboutModal = () => setShowAbout((prev) => !prev);

  /* Handle user sign out */
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
      <NavbarForm
        currentUser={currentUser}
        toggleOffcanvas={toggleOffcanvas}
        showOffcanvas={showOffcanvas}
        toggleAboutModal={toggleAboutModal}
        loggedInIcons={loggedInIcons}
        loggedOutIcons={loggedOutIcons}
      />
      <About show={showAbout} handleClose={toggleAboutModal} />
    </>
  );
};

export default NavBar;
