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
      <div className='flex flex-col items-center'>
        {!hasProfile ? (
          <div className='card w-96 glass hover:scale-100 justify-center items-center'>
            <button className='mt-5 btn btn-primary' onClick={() => navigate('signup/profile')}>Create profile</button>
          </div>
        ) : (
          <div className="flex">
            <div className="">
              <MyFriends />
            </div>
            <div className="grid grid-auto">
              <div className="">
                <Forge />
              </div>
              <div className="">
                <MyGroups />
              </div>
            </div>

          </div>
        )}
      </div>
    )}
  </UserProfileValidator>
);

}

export default HomeToken;
