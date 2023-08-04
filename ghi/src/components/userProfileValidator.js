import { useState, useEffect } from 'react';
import useUser from './useUser';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
const UserProfileValidator = ({ children }) => {
  const { token } = useAuthContext();
  const { user } = useUser(token);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Return early if the user or user.id is not defined yet
    if (!user || !user.id) {
      return;
    }

    fetch(`${process.env.REACT_APP_API_HOST}/get_profile/${user.id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [user, token]);

  return children(hasProfile);
};

export default UserProfileValidator;
