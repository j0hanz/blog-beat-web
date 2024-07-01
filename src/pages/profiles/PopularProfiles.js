import React from 'react';
import { Container } from 'react-bootstrap';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from './styles/PopularProfiles.module.css'; // Import the CSS module

const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();

  const filteredProfiles = popularProfiles.results.filter(
    (profile) => profile.owner !== currentUser?.username,
  );

  return (
    <Container>
      {filteredProfiles.length ? (
        <>
          <div className={`text-center py-3 ${styles.Header}`}>
            <hr />
            <h3>Most Followed Profiles</h3>
          </div>
          <div
            className={`d-flex flex-wrap justify-content-around bg-dark py-4 ${styles.PopularProfilesBorder}`}
          >
            {filteredProfiles.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
          </div>
          <hr />
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <Asset spinner />
        </div>
      )}
    </Container>
  );
};

export default PopularProfiles;
