import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/CommentCreateEditForm.module.css';
import { axiosRes } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';

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
      toast.error('Failed to add comment. Please try again.');
    }
  };

  return (
    <Card className={`mt-3 ${styles.CommentCard}`}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faComment} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Write a comment..."
                as="textarea"
                value={content}
                onChange={handleChange}
                rows={2}
                className={`bg-dark text-white ${styles.Form}`}
              />
            </InputGroup>
          </Form.Group>
          <div className="d-flex justify-content-end mt-2">
            <Button
              variant="outline-primary text-white"
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
