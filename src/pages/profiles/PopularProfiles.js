import React from 'react';
import { Container } from 'react-bootstrap';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';
import styles from './styles/PopularProfiles.module.css';

/* PopularProfiles component to display a list of popular profiles */
const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();

  return (
    <Container fluid className={styles.Container}>
      {popularProfiles.results.length ? (
        <div className={styles.ProfilesSection}>
          <div className={`text-center py-3 ${styles.Header}`}>
            <h3>Most Followed Profiles</h3>
          </div>
          <div
            className={`d-flex flex-wrap justify-content-around ${styles.ProfilesWrapper}`}
          >
            {popularProfiles.results.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <Asset spinner />
        </div>
      )}
    </Container>
  );
};

export default PopularProfiles;
