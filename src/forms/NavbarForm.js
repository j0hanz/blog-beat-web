import React from 'react';
import { Navbar, Nav, Offcanvas, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCircleInfo,
  faSquarePlus,
  faTimes,
  faPersonWalkingArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.webp';
import logoOnly from '../assets/logoOnly.webp';
import defaultProfileImage from '../assets/nobody.webp';
import styles from '../components/styles/NavBar.module.css';
import TooltipWrapper from '../components/TooltipWrapper';
import Icon from '../components/Icon';

const NavbarForm = ({
  currentUser,
  toggleOffcanvas,
  showOffcanvas,
  toggleAboutModal,
  loggedInIcons,
  loggedOutIcons,
}) => (
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
  </>
);

export default NavbarForm;
