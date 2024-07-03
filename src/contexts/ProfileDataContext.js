import { createContext, useContext, useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from './CurrentUserContext';
import { followHelper, unfollowHelper } from '../utils/utils';
import { toast } from 'react-toastify';

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post('/followers/', {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id),
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id),
          ),
        },
      }));
      toast.success(
        `You now follow ${clickedProfile.owner || clickedProfile.username}.`,
      );
    } catch (err) {
      console.error('Failed to follow the profile:', err);
      toast.error('Failed to follow the profile. Please try again.');
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile),
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile),
          ),
        },
      }));
      toast.info(
        `You have unfollowed ${
          clickedProfile.owner || clickedProfile.username
        }.`,
      );
    } catch (err) {
      console.error('Failed to unfollow the profile:', err);
    }
  };

  useEffect(() => {
    const fetchPopularProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          '/profiles/?ordering=-followers_count',
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.error('Failed to fetch popular profiles:', err);
        toast.error('Unable to load popular profiles.');
      }
    };

    if (currentUser) {
      fetchPopularProfiles();
    }
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
