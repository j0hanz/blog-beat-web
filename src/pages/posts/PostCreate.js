import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import PostCreateForm from '../../forms/PostCreateForm';

function PostCreate() {
  // State for form errors and post data
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

  // Handle input changes
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Handle image upload
  const handleChangeImage = useCallback(
    (event) => {
      if (event.target.files.length) {
        URL.revokeObjectURL(image);
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);

        setPostData((prevData) => ({
          ...prevData,
          image: imageUrl,
        }));
      }
    },
    [image]
  );

  // Handle image removal
  const handleRemoveImage = useCallback(() => {
    URL.revokeObjectURL(image);
    setPostData((prevData) => ({
      ...prevData,
      image: '',
    }));

    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [image]);

  // Handle form submission
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
      const { data } = await axiosReq.post('/posts/', formData);
      toast.success('Post created successfully!');
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.error(err);
      if (err.response?.status !== 401) {
        setErrors(
          err.response?.data || { general: ['An unexpected error occurred.'] }
        );
        toast.error('Failed to create post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostCreateForm
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

export default PostCreate;
