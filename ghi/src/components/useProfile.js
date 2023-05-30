import { useEffect, useState } from "react";
import useUser from "./useUser";

function useProfile(token) {
  const [profile, setProfile] = useState([]);
  const [id, setId] = useState("");
  const { user } = useUser(token);

  const getID = async () => {
    const res = await fetch(
      `http://localhost:8000/profile_id/get?user_id=${user.id}`,
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
    const res = await fetch(`http://localhost:8000/profile/${id}`, {
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

  if (user.id) {
    getID();
  }
  if (id) {
    getProfile();
  }

  return { profile };
}

export default useProfile;
