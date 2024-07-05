import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Post from './Post';
import Asset from '../../components/Asset';
import styles from './styles/PostsPage.module.css';
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import NoResults from '../../assets/no-results.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import PopularProfiles from '../profiles/PopularProfiles';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

/* PostsPage component to display a list of posts with search and filter functionality */
function PostsPage({ message, filter = '' }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');

  const currentUser = useCurrentUser();

  useEffect(() => {
    /* Fetch posts data when component mounts or dependencies change */
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100 justify-content-center mx-auto">
      <Col lg={8}>
        <div className={`mb-1 ${styles.SearchContainer}`}>
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <FontAwesomeIcon
              className={`fa-xl ${styles.SearchIcon}`}
              icon={faSearch}
            />
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search posts"
            />
          </Form>
        </div>
        <PopularProfiles />
        {!hasLoaded ? (
          <div className="d-flex justify-content-center my-1">
            <Asset spinner />
          </div>
        ) : posts.results.length ? (
          <InfiniteScroll
            dataLength={posts.results.length}
            next={() => fetchMoreData(posts, setPosts)}
            hasMore={!!posts.next}
            loader={
              <div className="d-flex justify-content-center my-4">
                <Asset spinner />
              </div>
            }
          >
            {posts.results.map((post) => (
              <div className="d-flex justify-content-center" key={post.id}>
                <Post {...post} setPosts={setPosts} />
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <Container className={styles.Content}>
            <Asset src={NoResults} message={message} />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;
