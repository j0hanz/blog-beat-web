import React, { useState, useRef } from 'react';
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
import { useRedirect } from '../../hooks/useRedirect';
import { toast } from 'react-toastify';

/* PostCreateForm component for creating a new post */
function PostCreateForm() {
  useRedirect('loggedOut');
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
    const formData = new FormData();

    formData.append('title', title);
    formData.append('location', location);
    formData.append('content', content);
    if (imageInput.current.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post('/posts/', formData);
      toast('Post created successfully!');
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        toast.error('Failed to create post. Please try again.');
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title" className="mb-3">
        <Form.Label className="d-none">Title</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faFileAlt} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
            className={styles.FormControl}
          />
        </InputGroup>
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group controlId="location" className="mb-3">
        <Form.Label className="d-none">Location</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={handleChange}
            className={styles.FormControl}
          />
        </InputGroup>
        {errors?.location?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group controlId="content" className="mb-4">
        <Form.Label className="d-none">Content</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faFileAlt} />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Content"
            name="content"
            value={content}
            onChange={handleChange}
            className={styles.FormControl}
          />
        </InputGroup>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Button
        variant="outline-warning text-white"
        onClick={() => navigate(-1)}
        className="mx-3 btn-lg"
      >
        Cancel
      </Button>
      <Button variant="outline-primary" className="mx-3 btn-lg" type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        className={`${styles.Container} d-flex flex-column justify-content-center`}
      >
        <Row>
          <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
            <Form.Group className="text-center">
              <div
                className={styles.ImageWrapper}
                onClick={() => imageInput.current.click()}
              >
                {image ? (
                  <figure>
                    <Image className={styles.Image} src={image} rounded />
                    <div className={styles.Placeholder}>
                      Click to change the image
                    </div>
                  </figure>
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
              </div>
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
        <Row>
          <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
            {textFields}
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PostCreateForm;
