import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';
import CommentCreateForm from '../comments/CommentCreateForm';
import Comment from '../comments/Comment';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="h-100 w-100">
        <Col className="py-2 p-0 p-lg-2 d-flex flex-column justify-content-center align-items-center">
          {post.results.length > 0 ? (
            <>
              <Post {...post.results[0]} setPosts={setPost} postPage />
              <Container className="mt-4">
                {currentUser ? (
                  <CommentCreateForm
                    profile_id={currentUser.profile_id}
                    profileImage={profile_image}
                    post={id}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ) : comments.results.length ? (
                  'Comments'
                ) : null}
                {comments.results.length ? (
                  comments.results.map((comment) => (
                    <Comment key={comment.id} {...comment} />
                  ))
                ) : (
                  <div className="d-flex justify-content-center mt-3">
                    {currentUser ? (
                      <span>No comments yet, be the first to comment!</span>
                    ) : (
                      <span>No comments... yet</span>
                    )}
                  </div>
                )}
              </Container>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
