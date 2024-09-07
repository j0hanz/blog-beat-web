import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Image,
  InputGroup,
} from 'react-bootstrap';
import Upload from '../../assets/upload.png';
import styles from './styles/PostCreateForm.module.css';
import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';

function PostCreateForm() {
  // State for form errors and post data
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: '',
    location: '',
    content: '',
    image: '',
  });

  const { title, location, content, image } = postData;
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
    }
  };

  // Render text input fields
  const renderTextField = (name, placeholder, icon, as = 'input', rows) => (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label className="d-none">{placeholder}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={icon} />
        </InputGroup.Text>
        <Form.Control
          as={as}
          rows={rows}
          type="text"
          placeholder={placeholder}
          name={name}
          value={postData[name]}
          onChange={handleChange}
          className={styles.FormControl}
        />
      </InputGroup>
      {errors[name]?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </Form.Group>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        className={`d-flex flex-column justify-content-center ${styles.Container}`}
      >
        {/* Image upload section */}
        <Row>
          <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
            <Form.Group className="text-center">
              {image ? (
                <div
                  className={styles.ImageWrapper}
                  onClick={() => imageInput.current.click()}
                >
                  <figure>
                    <Image className={styles.Image} src={image} fluid rounded />
                    <div className={styles.Placeholder}>
                      Click to change the image
                    </div>
                  </figure>
                </div>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click to upload an image" />
                </Form.Label>
              )}
              <Form.Control
                type="file"
                id="image-upload"
                accept="image/*"
                className="d-none"
                ref={imageInput}
                onChange={handleChangeImage}
              />
              {image && (
                <div className="d-flex justify-content-center mt-2">
                  <Button
                    variant="outline-light"
                    onClick={handleRemoveImage}
                    className="ml-2"
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        {/* Form fields */}
        <Row>
          <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
            <div className="text-center">
              {renderTextField('title', 'Title', faFileAlt)}
              {renderTextField('location', 'Location', faMapMarkerAlt)}
              {renderTextField('content', 'Content', faFileAlt, 'textarea', 6)}
              <Button
                variant="outline-warning text-white"
                onClick={() => navigate(-1)}
                className="mx-3 btn-lg"
              >
                Cancel
              </Button>
              <Button
                variant="outline-primary"
                className="mx-3 btn-lg"
                type="submit"
              >
                Create
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PostCreateForm;
