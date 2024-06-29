import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="h-100 w-100">
        <Col className="py-2 p-0 p-lg-2 d-flex justify-content-center align-items-center">
          {post.results.length > 0 ? (
            <Post {...post.results[0]} setPosts={setPost} postPage />
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
