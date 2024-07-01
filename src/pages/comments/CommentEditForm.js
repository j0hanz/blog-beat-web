import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { axiosRes } from '../../api/axiosDefaults';
import styles from './styles/CommentCreateEditForm.module.css';

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
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
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        <button
          className="btn btn-outline-light mx-3"
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className="btn btn-outline-primary"
          disabled={!formContent.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
