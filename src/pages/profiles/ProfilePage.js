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
import NoResults from '../../assets/no-results.png';
import { ProfileEditDropdown } from '../../components/MoreDropdown';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching profile data for ID: ${id}`);
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        console.log('Fetched profile data:', pageProfile);
        console.log('Fetched profile posts:', profilePosts);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
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
            !profile?.is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${styles.Button} ${styles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${styles.Button} ${styles.Black}`}
                onClick={() => handleFollow(profile)}
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
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      <div className="d-flex justify-content-center">
        {profilePosts.results.length ? (
          <InfiniteScroll
            children={profilePosts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setProfilePosts} />
            ))}
            dataLength={profilePosts.results.length}
            loader={<Asset spinner />}
            hasMore={!!profilePosts.next}
            next={() => fetchMoreData(profilePosts, setProfilePosts)}
          />
        ) : (
          <Asset
            src={NoResults}
            message={`No results found, ${profile?.owner} hasn't posted yet.`}
          />
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
