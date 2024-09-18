import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/CommentCreateEditForm.module.css';
import { axiosRes } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';

/* CommentCreateForm component for creating a new comment */
function CommentCreateForm(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post, setPost, setComments } = props;
  /* State to manage the content of the comment */
  const [content, setContent] = useState('');

  /* Handle input change */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /* Handle form submission */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
              disabled={!content.trim() || isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                'Post'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
export default CommentCreateForm;
