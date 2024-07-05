import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import styles from './styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={`footer bg-dark text-white py-2 ${styles.footer}`}>
      <Container>
        <Row className="align-items-center">
          <Col className="px-0">
            <p className="mb-0 text-white-50">
              <FontAwesomeIcon className="fa-sm px-1" icon={faCopyright} />
              2024 Blog Beat
            </p>
          </Col>
          <Col className="px-0 text-end">
            <div className={`fa-lg ${styles.socialLinks}`}>
              {[
                {
                  href: 'https://www.facebook.com',
                  icon: faFacebook,
                  label: 'Facebook',
                },
                {
                  href: 'https://github.com/j0hanz/blog-beat-web',
                  icon: faGithub,
                  label: 'GitHub',
                },
                {
                  href: 'https://www.instagram.com',
                  icon: faInstagram,
                  label: 'Instagram',
                },
              ].map(({ href, icon, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
