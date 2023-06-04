import { useEffect, useState } from "react";
import useUser from "./useUser";

function useProfile(token) {
  const [profile, setProfile] = useState([]);
  const [id, setId] = useState("");
  const { user } = useUser(token);

  const getID = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/profile_id/get?user_id=${user.id}`,
      {
        credentials: "include",
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      setId(data);
    }
  };

  const getProfile = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/profile/${id}`, {
      credentials: "include",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setProfile(data);
    }
  };

  useEffect(() => {
    if (user.id) {
      getID();
    }
  }, [user.id, token]);

  useEffect(() => {
    if (id) {
      getProfile();
    }
  }, [id, token]);

  return { profile };
}

export default useProfile;
