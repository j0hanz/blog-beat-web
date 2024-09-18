import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  Button,
  Image,
  Alert,
  Container,
  Modal,
  InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGlobe,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { axiosReq } from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';
import { CountryDropdown } from 'react-country-region-selector';
import styles from './styles/ProfileEditForm.module.css';
import { toast } from 'react-toastify';
import Asset from '../../components/Asset';

/* ProfileEditForm component for editing user profile */
const ProfileEditForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    country: '',
    bio: '',
    image: '',
  });

  const { first_name, last_name, country, bio, image } = profileData;

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  /* Fetch profile data from the server */
  const fetchProfileData = useCallback(async () => {
    if (currentUser?.profile_id?.toString() !== id) {
      navigate('/');
      return;
    }

    try {
      const { data } = await axiosReq.get(`/profiles/${id}/`);
      setProfileData({
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        bio: data.bio,
        image: data.image,
      });
      setLoading(false);
    } catch (err) {
      navigate('/');
    }
  }, [currentUser, id, navigate]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  /* Handle modal close */
  const handleClose = () => navigate(-1);

  /* Handle input change */
  const handleChange = ({ target: { name, value } }) => {
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Handle image change */
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setProfileData((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('country', country);
    formData.append('bio', bio);

    if (imageFile.current.files[0]) {
      formData.append('image', imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));
      toast.success('Profile updated successfully!');
      navigate(`/profiles/${id}`);
    } catch (err) {
      setErrors(err.response?.data || {});
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Render error messages */
  const renderErrorMessages = (field) =>
    errors[field]?.map((message, idx) => (
      <Alert variant="warning" key={idx}>
        {message}
      </Alert>
    ));

  /* Render text field */
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
              setProfileData((prevState) => ({ ...prevState, country: val }))
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
