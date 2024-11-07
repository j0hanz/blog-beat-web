import React from 'react';
import {
  Form,
  Button,
  Image,
  Container,
  Modal,
  InputGroup,
} from 'react-bootstrap';
import Asset from '../components/Asset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGlobe,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { CountryDropdown } from 'react-country-region-selector';
import styles from './styles/ProfileEditForm.module.css';

const ProfileEditForm = ({
  showModal,
  handleClose,
  handleSubmit,
  handleChange,
  handleImageChange,
  profileData,
  imageFile,
  renderErrorMessages,
  isSubmitting,
  loading,
}) => {
  const { first_name, last_name, country, bio, image } = profileData;

  const renderTextField = (label, icon, type, value, name, placeholder) => (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={icon} />
        </InputGroup.Text>
        <Form.Control
          type={type}
          value={value}
          onChange={handleChange}
          name={name}
          placeholder={placeholder}
        />
      </InputGroup>
      {renderErrorMessages(name)}
    </Form.Group>
  );

  const textFields = (
    <>
      {renderTextField(
        'First Name',
        faUser,
        'text',
        first_name,
        'first_name',
        'First Name'
      )}
      {renderTextField(
        'Last Name',
        faUser,
        'text',
        last_name,
        'last_name',
        'Last Name'
      )}
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGlobe} />
          </InputGroup.Text>
          <CountryDropdown
            value={country}
            onChange={(val) =>
              handleChange({ target: { name: 'country', value: val } })
            }
            className="form-control"
          />
        </InputGroup>
        {renderErrorMessages('country')}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faPen} />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            value={bio}
            onChange={handleChange}
            name="bio"
            rows={5}
            placeholder="Bio"
          />
        </InputGroup>
        {renderErrorMessages('bio')}
      </Form.Group>
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="outline-warning"
          onClick={handleClose}
          className="btn-lg"
        >
          Cancel
        </Button>
        <Button
          variant="outline-primary text-white"
          type="submit"
          className="btn-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
            </>
          ) : (
            'Save'
          )}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {loading ? (
        <Asset spinner />
      ) : (
        <Modal show={true} onHide={handleClose} centered>
          <Modal.Header
            className={`d-flex justify-content-center p-3 border-0 ${styles.modalHeadBg} position-relative`}
          >
            <Modal.Title className="text-center">Edit Profile</Modal.Title>
            <Button
              variant="link"
              className="text-white position-absolute end-0 top-0 btn-outline-secondary btn-sm"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Modal.Header>
          <Modal.Body className={`text-center mx-auto ${styles.modalBodyBg}`}>
            <Form onSubmit={handleSubmit}>
              <Container className="text-center">
                <Form.Group>
                  {image && (
                    <figure>
                      <Image src={image} rounded fluid />
                    </figure>
                  )}
                  {renderErrorMessages('image')}
                  <Form.Label className="my-auto" htmlFor="image-upload">
                    Change the image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image-upload"
                    ref={imageFile}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                {textFields}
              </Container>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProfileEditForm;
