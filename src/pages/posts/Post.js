import React from 'react';
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
import { faComments, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';

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
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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

  return (
    <Container className="mt-4">
      <Card className={`${styles.Post}`}>
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
              <Link
                to={`/profiles/${profile_id}`}
                className="d-flex align-items-center"
              >
                <Icon src={profile_image} height={35} />
                <span>{owner}</span>
              </Link>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <span className="text-white-50 mx-2">{updated_at}</span>
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </Col>
          </Row>
          <hr />
        </Card.Body>
        {image && (
          <Link to={`/posts/${id}`}>
            <Card.Img className={styles.CardImg} src={image} alt={title} />
          </Link>
        )}
        {title && <Card.Title className="text-center my-3">{title}</Card.Title>}
        <Card.Body>
          {content && <Card.Text>{content}</Card.Text>}
          <hr />
          <div className={styles.PostBar}>
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
            <Link to={`/posts/${id}`}>
              <FontAwesomeIcon
                className={`fa-xl ${styles.faComments}`}
                icon={faComments}
              />
            </Link>
            <span>{comments_count}</span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Post;
