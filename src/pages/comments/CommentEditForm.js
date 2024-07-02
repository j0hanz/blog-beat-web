import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from './styles/CommentCreateEditForm.module.css';

function CommentEditForm(props) {
  const { id, content, show, handleClose, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: 'now',
              }
            : comment;
        }),
      }));
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        className="bg-dark text-white"
        closeVariant="white"
      >
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              className={styles.Form}
              as="textarea"
              value={formContent}
              onChange={handleChange}
              rows={2}
            />
          </Form.Group>
          <div className="float-end mt-1">
            <Button
              variant="outline-light"
              onClick={handleClose}
              className="mx-3"
            >
              Cancel
            </Button>
            <Button
              variant="outline-primary text-white"
              disabled={!formContent.trim()}
              type="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CommentEditForm;
