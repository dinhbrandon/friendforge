import { useEffect, useState } from "react";


// this grabs the data from the logged in user and returns in in a dictionary so we can use the users data in other components

const useUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('http://localhost:8000/token', {
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
