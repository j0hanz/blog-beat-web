import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
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
import { FaFacebookF, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';

const socialMediaIcons = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  website: <FaGlobe />,
};

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results || [];
  const is_owner = currentUser?.username === profile?.owner;

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

  const mainProfile = (
    <>
      {is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row className="px-3 mx-auto text-center justify-content-center">
        <Col lg={3} className="d-flex justify-content-center">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt={`${profile?.first_name} ${profile?.last_name}`}
          />
        </Col>
        <Col lg={6} className="d-flex flex-column align-items-center">
          <Row className="w-100 justify-content-center">
            <Col xs={12} sm={4} className="my-2">
              <div className="font-weight-bold">
                <div>Name:</div>
                {profile?.first_name} {profile?.last_name}
              </div>
            </Col>
            <Col xs={12} sm={4} className="my-2">
              <div>Country:</div>
              <div>{profile?.country}</div>
            </Col>
            <Col xs={12} sm={4} className="my-2">
              <div>Bio:</div>
              <div>{profile?.bio}</div>
            </Col>
          </Row>
          {profile?.social_media_links &&
            profile.social_media_links.map((link, index) => (
              <a
                key={index}
                href={link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2"
              >
                {socialMediaIcons[link?.platform?.toLowerCase()] || <FaGlobe />}
                {link?.platform}
              </a>
            ))}
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
          {currentUser && !is_owner && (
            <Button
              className={`${styles.Button} ${
                profile?.following_id ? styles.BlackOutline : styles.Black
              }`}
              onClick={() =>
                profile?.following_id
                  ? handleUnfollow(profile)
                  : handleFollow(profile)
              }
            >
              {profile?.following_id ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </Col>
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
