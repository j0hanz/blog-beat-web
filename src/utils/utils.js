import jwtDecode from 'jwt-decode';
import { axiosReq } from '../api/axiosDefaults';

/* Function to fetch more data and update the resource state */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.error('Error fetching more data:', err);
  }
};

/* Helper function to update profile data when a user is followed */
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
      ? { ...profile, following_count: profile.following_count + 1 }
      : profile;
};

/* Helper function to update profile data when a user is unfollowed */
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
      ? { ...profile, following_count: profile.following_count - 1 }
      : profile;
};

/* Set the token timestamp in local storage */
export const setTokenTimestamp = (data) => {
  try {
    if (!data?.refresh) {
      throw new Error('No refresh token provided');
    }
    const decoded = jwtDecode(data.refresh);
    if (!decoded?.exp) {
      throw new Error('Invalid token format');
    }
    localStorage.setItem('refreshTokenTimestamp', decoded.exp);
  } catch (err) {
    console.error('Token timestamp error:', err);
    removeTokenTimestamp();
  }
};

/* Check if token should be refreshed based on timestamp */
export const shouldRefreshToken = () => {
  try {
    const timestamp = localStorage.getItem('refreshTokenTimestamp');
    if (!timestamp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return Number(timestamp) - currentTime < 300;
  } catch (err) {
    console.error('Refresh check error:', err);
    return false;
  }
};

/* Remove token timestamp from local storage */
export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};
