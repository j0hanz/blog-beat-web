import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosRes, axiosReq } from '../api/axiosDefaults';
import { followHelper, unfollowHelper } from '../utils/utils';
import { useCurrentUser } from './CurrentUserContext';
import { toast } from 'react-toastify';

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Custom hooks to access profile data and related functions
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  // Handle following a profile
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post('/followers/', {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
      toast.success(
        `You now follow ${clickedProfile.owner || clickedProfile.username}.`
      );
    } catch (err) {
      console.error('Failed to follow the profile:', err);
      toast.error('Failed to follow the profile. Please try again.');
    }
  };

  // Handle unfollowing a profile
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
      toast.info(
        `You have unfollowed ${
          clickedProfile.owner || clickedProfile.username
        }.`
      );
    } catch (err) {
      console.error('Failed to unfollow the profile:', err);
      toast.error('Failed to unfollow the profile. Please try again.');
    }
  };

  // Fetch popular profiles
  useEffect(() => {
    const fetchPopularProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          '/profiles/?ordering=-followers_count'
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularProfiles();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
