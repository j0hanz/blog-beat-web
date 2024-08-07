import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { MoreDropdown } from '../../components/MoreDropdown';
import CommentEditForm from './CommentEditForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import styles from './styles/Comment.module.css';
import Confirm from '../../components/Confirms';

/* Comment component to display a single comment */
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  /* State to manage edit form visibility */
  const [showEditForm, setShowEditForm] = useState(false);
  /* State to manage confirmation modal visibility */
  const [showConfirm, setShowConfirm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  /* Handle comment deletion */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /* Show confirmation modal */
  const handleShowConfirm = () => setShowConfirm(true);
  /* Cancel confirmation modal */
  const handleCancelConfirm = () => setShowConfirm(false);
  /* Confirm and delete the comment */
  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirm(false);
  };

  return (
    <>
      <Card className={`bg-dark my-4 ${styles.CommentCard}`}>
        <Card.Body>
          <Row>
            <Col xs="auto" className="text-center m-auto">
              <Link to={`/profiles/${profile_id}`}>
                <Icon
                  src={profile_image}
                  height={45}
                  className="rounded-circle"
                />
              </Link>
            </Col>
            <Col className="align-self-center">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className={styles.Owner}>{owner}</span>
                  <span className={`text-white-50 ${styles.Date}`}>
                    {updated_at}
                  </span>
                </div>
                {is_owner && !showEditForm && (
                  <MoreDropdown
                    handleEdit={() => setShowEditForm(true)}
                    handleShowConfirm={handleShowConfirm}
                  />
                )}
              </div>
              {showEditForm ? (
                <CommentEditForm
                  id={id}
                  profile_id={profile_id}
                  content={content}
                  setComments={setComments}
                  show={showEditForm}
                  handleClose={() => setShowEditForm(false)}
                />
              ) : (
                <p className="text-white fw-light">{content}</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Confirm
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelConfirm}
      />
    </>
  );
};

export default Comment;
