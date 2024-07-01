import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import Asset from '../../components/Asset';
import styles from './styles/ProfilePage.module.css';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import {
  useProfileData,
  useSetProfileData,
} from '../../contexts/ProfileDataContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../posts/Post';
import { fetchMoreData } from '../../utils/utils';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const handleFollow = async () => {
    try {
      const { data } = await axiosReq.post('/followers/', {
        followed: profile.id,
      });
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: [
            {
              ...profile,
              followers_count: profile.followers_count + 1,
              following_id: data.id,
            },
          ],
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axiosReq.delete(`/followers/${profile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: [
            {
              ...profile,
              followers_count: profile.followers_count - 1,
              following_id: null,
            },
          ],
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const mainProfile = (
    <>
      <Row className="px-3 mx-auto text-center justify-content-center">
        <Col lg={3} className="d-flex justify-content-center">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6} className="d-flex flex-column align-items-center">
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters w-100">
            <Col xs={4} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col
          lg={3}
          className="d-flex justify-content-center align-items-center"
        >
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${styles.Button} ${styles.BlackOutline}`}
                onClick={handleUnfollow}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${styles.Button} ${styles.Black}`}
                onClick={handleFollow}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
      <div className="d-flex justify-content-center">
        {profilePosts.results.length ? (
          <InfiniteScroll
            dataLength={profilePosts.results.length}
            next={() => fetchMoreData(profilePosts, setProfilePosts)}
            hasMore={!!profilePosts.next}
            loader={<Asset spinner />}
          >
            {profilePosts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setProfilePosts} />
            ))}
          </InfiniteScroll>
        ) : (
          <Asset spinner />
        )}
      </div>
    </>
  );

  return (
    <Row className="d-flex justify-content-center text-center mx-auto">
      <Col lg={10}>
        <Container className={styles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
}

export default ProfilePage;
