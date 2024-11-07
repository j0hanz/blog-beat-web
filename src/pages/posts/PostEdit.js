import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import PostEditForm from '../../forms/PostEditForm';

/* PostEdit component for editing an existing post */
function PostEdit() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: '',
    location: '',
    content: '',
    image: '',
  });

  const { title, location, content, image } = postData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    /* Fetch post data when component mounts */
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, location, content, image, is_owner } = data;

        is_owner
          ? setPostData({ title, location, content, image })
          : navigate('/');
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [navigate, id]);

  /* Handle input change */
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  /* Handle image change */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /* Handle removing the image */
  const handleRemoveImage = () => {
    URL.revokeObjectURL(image);
    setPostData({
      ...postData,
      image: '',
    });
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  };

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append('title', title);
    formData.append('location', location);
    formData.append('content', content);
    if (imageInput.current.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      toast.success('Post updated successfully!');
      navigate(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        toast.error('Failed to update post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostEditForm
      postData={postData}
      errors={errors}
      handleChange={handleChange}
      handleChangeImage={handleChangeImage}
      handleRemoveImage={handleRemoveImage}
      handleSubmit={handleSubmit}
      imageInput={imageInput}
      isSubmitting={isSubmitting}
      navigate={navigate}
    />
  );
}

export default PostEdit;
