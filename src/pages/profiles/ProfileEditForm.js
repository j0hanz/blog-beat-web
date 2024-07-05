import React, { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    /* Fetch profile data when component mounts */
    const handleMount = async () => {
      if (currentUser?.pk?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { first_name, last_name, country, bio, image } = data;
          setProfileData({
            first_name,
            last_name,
            country,
            bio,
            image,
          });
          setLoading(false);
        } catch (err) {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  /* Handle closing the form */
  const handleClose = () => {
    navigate(-1);
  };

  /* Handle input change */
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('country', country);
    formData.append('bio', bio);

    if (imageFile?.current?.files[0]) {
      formData.append('image', imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      toast.success('Profile updated successfully!');
      navigate('/profiles/' + id);
    } catch (err) {
      setErrors(err.response?.data);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const textFields = (
    <>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faUser} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={first_name}
            onChange={handleChange}
            name="first_name"
            placeholder="First Name"
          />
        </InputGroup>
      </Form.Group>
      {errors?.first_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faUser} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={last_name}
            onChange={handleChange}
            name="last_name"
            placeholder="Last Name"
          />
        </InputGroup>
      </Form.Group>
      {errors?.last_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faGlobe} />
          </InputGroup.Text>
          <CountryDropdown
            value={country}
            onChange={(val) => setProfileData({ ...profileData, country: val })}
            className="form-control"
          />
        </InputGroup>
      </Form.Group>
      {errors?.country?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      </Form.Group>
      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        variant="outline-warning"
        onClick={handleClose}
        className="mx-3 btn-lg"
      >
        Cancel
      </Button>
      <Button
        variant="outline-primary text-white"
        type="submit"
        className="mx-3 btn-lg"
      >
        Save
      </Button>
    </>
  );

  return (
    <>
      {loading ? (
        <Asset spinner />
      ) : (
        <Modal show={true} onHide={handleClose} centered>
          <>
            <Modal.Header
              className={`d-flex justify-content-center p-3 ${styles.modalHeadBg} position-relative`}
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
                    {errors?.image?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                    <Form.Label className="my-auto" htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="image-upload"
                      ref={imageFile}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files.length) {
                          setProfileData({
                            ...profileData,
                            image: URL.createObjectURL(e.target.files[0]),
                          });
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mt-3">{textFields}</div>
                </Container>
              </Form>
            </Modal.Body>
          </>
        </Modal>
      )}
    </>
  );
};

export default ProfileEditForm;
