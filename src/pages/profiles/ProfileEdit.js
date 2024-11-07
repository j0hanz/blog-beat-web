import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';
import { toast } from 'react-toastify';
import ProfileEditForm from '../../forms/ProfileEditForm';

/* ProfileEdit component for editing user profile */
const ProfileEdit = () => {
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

  return (
    <ProfileEditForm
      showModal={true}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      profileData={profileData}
      imageFile={imageFile}
      renderErrorMessages={renderErrorMessages}
      isSubmitting={isSubmitting}
      loading={loading}
    />
  );
};

export default ProfileEdit;
