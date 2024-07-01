import React from 'react';
import styles from './styles/Profile.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
  const { profile, imageSize = 45 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex flex-column align-items-center">
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Icon src={image} height={imageSize} />
        </Link>
        <strong className={`my-1 ${styles.WordBreak}`}>{owner}</strong>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              variant="outline-primary btn-sm"
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              variant="outline-primary btn-sm"
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
