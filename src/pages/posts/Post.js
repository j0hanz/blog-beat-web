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
  faThumbsUp,
  faLocationDot,
  faStar,
  faStar as faStarFilled,
} from '@fortawesome/free-solid-svg-icons';
import { axiosRes } from '../../api/axiosDefaults';
import { toast } from 'react-toastify';
import { MoreDropdown } from '../../components/MoreDropdown';
import Confirm from '../../components/Confirms';

const Post = (props) => {
  const {
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
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      toast('Post deleted successfully!');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete post!');
    }
  };

  const handleShowConfirm = () => setShowConfirm(true);
  const handleCancelConfirm = () => setShowConfirm(false);
  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirm(false);
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = async () => {
    try {
      await axiosRes.post(`/posts/${id}/favourite/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id ? { ...post, is_favourited: true } : post;
        }),
      }));
      toast.success('Post added to favorites!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to add to favorites!');
    }
  };

  const handleUnfavorite = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/favourite/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id ? { ...post, is_favourited: false } : post;
        }),
      }));
      toast.success('Post removed from favorites!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to remove from favorites!');
    }
  };

  return (
    <Container className="my-4">
      <Card className={`${styles.Post}`}>
        <Card.Body className="p-2">
          <Row>
            <Col xs="auto">
              <Link to={`/profiles/${profile_id}`}>
                <Icon src={profile_image} height={35} />
                <span className="mx-2">{owner}</span>
              </Link>
            </Col>
            <Col>{/* Leaves empty. */}</Col>
            <Col
              xs="auto"
              className="d-flex justify-content-end align-items-center"
            >
              {location && (
                <>
                  <FontAwesomeIcon
                    className="fa-md mx-1"
                    icon={faLocationDot}
                  />
                  <span className="me-3">{location}</span>
                </>
              )}
              <span className="text-white-50">{updated_at}</span>
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleShowConfirm={handleShowConfirm}
                />
              )}
            </Col>
          </Row>
        </Card.Body>

        {image && (
          <Link to={`/posts/${id}`}>
            <Card.Img className={styles.CardImg} src={image} alt={title} />
          </Link>
        )}
        {title && (
          <Card.Title className="text-center mb-0 mt-2">{title}</Card.Title>
        )}
        <hr />
        {content && <Card.Text>{content}</Card.Text>}
        <hr />
        <Card.Body className="p-2">
          <Row>
            <Col className={styles.PostBar}>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <FontAwesomeIcon
                    className={`fa-xl ${styles.faThumbsUp}`}
                    icon={faThumbsUp}
                  />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <FontAwesomeIcon
                    className={`fa-xl ${styles.faThumbsUp} ${styles.liked}`}
                    icon={faThumbsUp}
                  />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <FontAwesomeIcon
                    className={`fa-xl ${styles.faThumbsUp}`}
                    icon={faThumbsUp}
                  />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <FontAwesomeIcon className="fa-xl" icon={faThumbsUp} />
                </OverlayTrigger>
              )}
              <span>{likes_count}</span>
            </Col>
            <Col>
              <Link to={`/posts/${id}`}>
                <FontAwesomeIcon
                  className={`fa-xl ${styles.faComments}`}
                  icon={faComments}
                />
              </Link>
              <span>{comments_count}</span>
            </Col>
            <Col>
              {is_favourited ? (
                <span onClick={handleUnfavorite}>
                  <FontAwesomeIcon
                    className={`fa-xl text-warning`}
                    icon={faStarFilled}
                  />
                </span>
              ) : (
                <span onClick={handleFavorite}>
                  <FontAwesomeIcon
                    className={`fa-xl ${styles.faStar}`}
                    icon={faStar}
                  />
                </span>
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
    </Container>
  );
};

export default Post;
