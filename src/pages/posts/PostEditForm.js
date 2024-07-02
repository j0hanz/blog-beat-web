import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

function PostEditForm() {
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
  const { id } = useParams();

  useEffect(() => {
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

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

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
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
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
      <div className="float-end">
        <Button variant="outline-light mx-3" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="outline-primary text-white" type="submit">
          Save
        </Button>
      </div>
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

export default PostEditForm;
