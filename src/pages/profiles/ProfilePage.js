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
      <Row className="px-3 mx-auto text-center justify-content-center">
        <Col
          lg={3}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt={`${profile?.first_name} ${profile?.last_name}`}
          />
          <div className={styles.ProfileOwner}>{profile?.owner}</div>
          <div className="mt-1">
            {is_owner && <ProfileEditDropdown id={profile?.id} />}
          </div>
          <div className="mt-2">
            {currentUser && !is_owner && (
              <Button
                variant={
                  profile?.following_id
                    ? 'outline-secondary'
                    : 'outline-primary'
                }
                onClick={() =>
                  profile?.following_id
                    ? handleUnfollow(profile)
                    : handleFollow(profile)
                }
              >
                {profile?.following_id ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
        </Col>
        <Col className="mt-2">
          <Row className="justify-content-center no-gutters">
            <Col xs={4} className="my-2 text-center">
              <div className="h5">{profile?.posts_count}</div>
              <div className={styles.ProfileStats}>Posts</div>
            </Col>
            <Col xs={4} className="my-2 text-center">
              <div className="h5">{profile?.followers_count}</div>
              <div className={styles.ProfileStats}>Followers</div>
            </Col>
            <Col xs={4} className="my-2 text-center">
              <div className="h5">{profile?.following_count}</div>
              <div className={styles.ProfileStats}>Following</div>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-center">
            <Col className="my-2 text-center">
              <div className="font-weight-bold">
                {profile?.first_name} {profile?.last_name}
              </div>
            </Col>
            <Col className="my-2 text-center">
              <div>{profile?.country}</div>
            </Col>
          </Row>
          <hr />
          <Row className="w-100 justify-content-center">
            <Col xs={12} sm={4} className="my-2 text-center">
              <div>About me:</div>
              <div>{profile?.bio}</div>
            </Col>
          </Row>
          <Row className="w-100 justify-content-center">
            <Col xs={12} sm={4} className="my-2 text-center">
              {profile?.social_media_links &&
                profile.social_media_links.map((link, index) => (
                  <a
                    key={index}
                    href={link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center gap-2"
                  >
                    {socialMediaIcons[link?.platform?.toLowerCase()] || (
                      <FaGlobe />
                    )}
                    {link?.platform}
                  </a>
                ))}
            </Col>
          </Row>
        </Col>
        <Col
          lg={3}
          className="d-flex justify-content-center align-items-center"
        ></Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
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
    </>
  );
  return (
    <Row className="d-flex justify-content-center text-center mx-auto">
      <Col>
        <Container fluid className={styles.Content}>
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
    </Row>
  );
}

export default ProfilePage;
