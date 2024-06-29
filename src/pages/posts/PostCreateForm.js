import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Image,
} from 'react-bootstrap';

import Upload from '../../assets/upload.png';
import styles from './styles/PostCreateForm.module.css';
import Asset from '../../components/Asset';

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
  });

  const { title, content, image } = postData;
  const imageInput = useRef(null);
  const navigate = useNavigate();

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
    formData.append('content', content);
    if (imageInput.current.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      const { data } = await axios.post('/posts/', formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

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
          </Col>
        </Row>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
            <div className="text-center">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  className={styles.FormControl}
                />
              </Form.Group>
              {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="content"
                  value={content}
                  onChange={handleChange}
                  className={styles.FormControl}
                />
              </Form.Group>
              {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
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
