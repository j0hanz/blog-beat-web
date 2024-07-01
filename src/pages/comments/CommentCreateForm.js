import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import styles from './styles/CommentCreateEditForm.module.css';
import { axiosRes } from '../../api/axiosDefaults';

function CommentCreateForm(props) {
  const { post, setPost, setComments } = props;
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post('/comments/', {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`mt-3 ${styles.CommentCard}`}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                placeholder="Write a comment..."
                as="textarea"
                value={content}
                onChange={handleChange}
                rows={2}
                className="bg-dark text-white"
              />
            </InputGroup>
          </Form.Group>
          <div className="d-flex justify-content-end mt-2">
            <Button
              className={styles.Button}
              disabled={!content.trim()}
              type="submit"
            >
              Post
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CommentCreateForm;
