import { axiosReq } from '../api/axiosDefaults';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

// Constants
const PROFILE_ID = 'id';
const FOLLOWERS_COUNT = 'followers_count';
const FOLLOWING_COUNT = 'following_count';
const IS_OWNER = 'is_owner';
const ACCESS_TOKEN_KEY = 'my-app-auth';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

// Token management
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp > Date.now() / 1000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

export const shouldRefreshToken = () => !isTokenValid(getAccessToken());

export const getTokenExpirationTime = (token) => {
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error getting token expiration time:', error);
    return null;
  }
};

// Profile helpers
export const followHelper = (profile, clickedProfile, following_id) => {
  if (!profile || !clickedProfile || typeof following_id !== 'number') {
    throw new Error('Invalid arguments for followHelper');
  }

  const updatedProfile = { ...profile };

  if (updatedProfile[PROFILE_ID] === clickedProfile[PROFILE_ID]) {
    updatedProfile[FOLLOWERS_COUNT] =
      (updatedProfile[FOLLOWERS_COUNT] || 0) + 1;
    updatedProfile.following_id = following_id;
  } else if (updatedProfile[IS_OWNER]) {
    updatedProfile[FOLLOWING_COUNT] =
      (updatedProfile[FOLLOWING_COUNT] || 0) + 1;
  }

  return updatedProfile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  if (!profile || !clickedProfile) {
    throw new Error('Invalid arguments for unfollowHelper');
  }

  const updatedProfile = { ...profile };

  if (updatedProfile[PROFILE_ID] === clickedProfile[PROFILE_ID]) {
    updatedProfile[FOLLOWERS_COUNT] = Math.max(
      (updatedProfile[FOLLOWERS_COUNT] || 1) - 1,
      0
    );
    updatedProfile.following_id = null;
  } else if (updatedProfile[IS_OWNER]) {
    updatedProfile[FOLLOWING_COUNT] = Math.max(
      (updatedProfile[FOLLOWING_COUNT] || 1) - 1,
      0
    );
  }

  return updatedProfile;
};

// Data fetching
export const fetchMoreData = async (resource, setResource) => {
  if (!resource?.next || !setResource) return;

  try {
    const { data } = await axiosReq.get(resource.next);
    const { next, results } = data;
    const existingIds = new Set(resource.results.map((item) => item?.id));
    const newResults =
      results?.filter((item) => item?.id && !existingIds.has(item.id)) || [];

    setResource((prevResource) => ({
      ...prevResource,
      next,
      results: [...(prevResource?.results || []), ...newResults],
    }));
  } catch (err) {
    console.error('Error fetching more data:', err);
  }
};

// PropTypes
followHelper.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    followers_count: PropTypes.number,
    following_count: PropTypes.number,
    is_owner: PropTypes.bool,
  }).isRequired,
  clickedProfile: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  following_id: PropTypes.number.isRequired,
};

unfollowHelper.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    followers_count: PropTypes.number,
    following_count: PropTypes.number,
    is_owner: PropTypes.bool,
  }).isRequired,
  clickedProfile: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

fetchMoreData.propTypes = {
  resource: PropTypes.shape({
    next: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setResource: PropTypes.func.isRequired,
};
