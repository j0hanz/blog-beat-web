import React, { useState } from 'react';
import styles from './styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import {
  Card,
  Col,
  Container,
  Row,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faThumbsUp as faThumbsUpSolid,
  faLocationDot,
  faStar as faStarFilled,
} from '@fortawesome/free-solid-svg-icons';
import {
  faThumbsUp as faThumbsUpRegular,
  faStar as faStarRegular,
} from '@fortawesome/free-regular-svg-icons';
import { axiosRes } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import { MoreDropdown } from '../../components/MoreDropdown';
import Confirm from '../../components/Confirms';

/* IconButton component for rendering icon buttons with tooltips */
const IconButton = ({ onClick, icon, className, tooltip, disabled }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
    <span
      onClick={disabled ? null : onClick}
      className={`${styles.iconButton} ${className}`}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </span>
  </OverlayTrigger>
);

/* PostHeader component for rendering the post header */
const PostHeader = ({
  profile_id,
  profile_image,
  owner,
  location,
  updated_at,
  is_owner,
  postPage,
  handleEdit,
  handleShowConfirm,
}) => (
  <Card.Body className="p-3">
    <Row className="align-items-center">
      <Col xs="auto" className="d-flex align-items-center">
        <Link to={`/profiles/${profile_id}`}>
          <Icon src={profile_image} height={40} />
          <span className={`px-2 ${styles.Username}`}>{owner}</span>
        </Link>
      </Col>
      <Col className="p-0" />
      <Col xs="auto" className="d-flex justify-content-end align-items-center">
        {location && (
          <>
            <FontAwesomeIcon className="mx-1" icon={faLocationDot} size="sm" />
            <span className="me-2">{location}</span>
          </>
        )}
        <span className={`text-white-50 ${styles.UpdatedAt}`}>
          {updated_at}
        </span>
        {is_owner && postPage && (
          <MoreDropdown
            handleEdit={handleEdit}
            handleShowConfirm={handleShowConfirm}
          />
        )}
      </Col>
    </Row>
  </Card.Body>
);

/* PostFooter component for rendering the post footer */
const PostFooter = ({
  is_owner,
  like_id,
  handleLike,
  handleUnlike,
  currentUser,
  likes_count,
  comments_count,
  id,
  handleFavorite,
  handleUnfavorite,
  is_favourited,
}) => (
  <Card.Footer className="p-3 d-flex justify-content-between align-items-center">
    <Col className="d-flex align-items-center">
      <IconButton
        onClick={is_owner ? null : like_id ? handleUnlike : handleLike}
        icon={like_id ? faThumbsUpSolid : faThumbsUpRegular}
        className={`${styles.faThumbsUp} ${like_id ? styles.liked : ''}`}
        tooltip={
          is_owner
            ? "Can't like your own post"
            : like_id
              ? 'Remove like'
              : currentUser
                ? 'Like this post'
                : 'Sign in to like posts'
        }
        disabled={is_owner}
      />
      <span className="ms-1">{likes_count}</span>
    </Col>

    <Col className="text-center">
      <Link to={`/posts/${id}`}>
        <IconButton
          icon={faComments}
          className={styles.faComments}
          tooltip="View comments"
        />
      </Link>
      <span>{comments_count}</span>
    </Col>

    <Col className="text-end">
      <IconButton
        onClick={is_favourited ? handleUnfavorite : handleFavorite}
        icon={is_favourited ? faStarFilled : faStarRegular}
        className={is_favourited ? styles.faStarFilled : styles.faStar}
        tooltip={
          currentUser
            ? is_favourited
              ? 'Remove from favorites'
              : 'Add to favorites'
            : 'Log in to favorite this post!'
        }
        disabled={!currentUser}
      />
    </Col>
  </Card.Footer>
);

/* Post component for rendering a post */
const Post = ({
  id,
  owner,
  profile_id,
  profile_image,
  comments_count,
  likes_count,
  like_id,
  title,
  location,
  content,
  image,
  updated_at,
  postPage,
  setPosts,
  is_favourited,
}) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  /* Handle post edit */
  const handleEdit = () => navigate(`/posts/${id}/edit`);

  /* Handle post delete */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      toast('Post deleted successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete post!');
    }
  };

  /* Show confirmation modal */
  const handleShowConfirm = () => setShowConfirm(true);
  /* Cancel confirmation modal */
  const handleCancelConfirm = () => setShowConfirm(false);
  /* Confirm delete action */
  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirm(false);
  };

  /* Handle post like */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  /* Handle post unlike */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  /* Handle post favorite */
  const handleFavorite = async () => {
    try {
      await axiosRes.post(`/posts/${id}/favourite/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id ? { ...post, is_favourited: true } : post
        ),
      }));
      toast.success('Post added to favorites!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to favorites!');
    }
  };

  /* Handle post unfavorite */
  const handleUnfavorite = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/favourite/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id ? { ...post, is_favourited: false } : post
        ),
      }));
      toast.success('Post removed from favorites!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from favorites!');
    }
  };

  return (
    <Container fluid className="my-4 px-0">
      <Card className={styles.Post}>
        <PostHeader
          profile_id={profile_id}
          profile_image={profile_image}
          owner={owner}
          location={location}
          updated_at={updated_at}
          is_owner={is_owner}
          postPage={postPage}
          handleEdit={handleEdit}
          handleShowConfirm={handleShowConfirm}
        />

        {image && (
          <Link to={`/posts/${id}`}>
            <Card.Img className={styles.CardImg} src={image} alt={title} />
          </Link>
        )}

        {title && <Card.Title className="text-center my-2">{title}</Card.Title>}

        {content && (
          <Card.Text className={`px-3 ${styles.ContentText}`}>
            {content}
          </Card.Text>
        )}

        <PostFooter
          is_owner={is_owner}
          like_id={like_id}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          currentUser={currentUser}
          likes_count={likes_count}
          comments_count={comments_count}
          id={id}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
          is_favourited={is_favourited}
        />
      </Card>

      <Confirm
        show={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelConfirm}
      />
    </Container>
  );
};

export default Post;
