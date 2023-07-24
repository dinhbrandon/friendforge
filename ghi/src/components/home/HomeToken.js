import React from 'react';
import Forge from '../../screens/Forge';
import MyGroups from '../../screens/MyGroups';
import { useNavigate } from 'react-router-dom';
import UserProfileValidator from '../userProfileValidator'; // Import the UserProfileValidator component
import MyFriends from '../friend/myFriends';

function HomeToken() {
  const navigate = useNavigate();
  return (
    <UserProfileValidator>
      {hasProfile => (
        <div className='flex items-center justify-center'>
          {!hasProfile ? (
            // If there's no profile, redirect to profile creation
            <div className='card w-96 glass hover:scale-100 justify-center items-center'>
              {/* Optionally, you can add a link/button to navigate to the profile creation page */}
              <button className='mt-5 btn btn-primary' onClick={() => navigate('signup/profile')}>Create profile</button>
            </div>
          ) : (
            // If there is a profile, display the home page components
            <>
              <div>
                <Forge />
              </div>
              <div>
                <MyGroups />
              </div>
              <div>
                <MyFriends />
              </div>
            </>
          )}
        </div>
      )}
    </UserProfileValidator>
  );
}

export default HomeToken;
