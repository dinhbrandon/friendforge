import { useEffect, useState } from "react";

// this grabs the data from the logged in user and returns in in a dictionary so we can use the users data in other components

const useUser = (token) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const result = await res.json();
      setUser(result.account);
    };

    if (token) {
      getUser();
    }
  }, [token]);
  return { user: user };
};

export default useUser;
