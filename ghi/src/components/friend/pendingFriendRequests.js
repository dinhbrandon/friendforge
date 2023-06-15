import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../useProfile";

function PendingRequests(){
  const [friendRequests, setFriendRequests] = useState([]);
  const { token } = useToken();
  const { profile } = useProfile(token);

  const loadFriendRequests = async (id) => {
  const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/friendship/${id}/requests`,
        {
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    if (response.ok) {
        const data = await response.json();
        setFriendRequests(data);
    }
    };
    
  useEffect(() => {
      if (profile && profile.id) {
          const id = profile.id;
          loadFriendRequests(id);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);



    async function acceptFriendRequestSubmit(e, senderId) {
      e.preventDefault();

      const url = `${process.env.REACT_APP_API_HOST}/friendship/${profile.id}/${senderId}/accept`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        loadFriendRequests(profile.id)
      } else{
          console.log("Could not accept friend request");
      }

    }

    async function rejectFriendRequestSubmit(e, senderId) {
      e.preventDefault();

      const url = `${process.env.REACT_APP_API_HOST}/friendship/${profile.id}/${senderId}/reject`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        loadFriendRequests(profile.id)
      } else{
          console.log("Could not reject friend request");
      }

    }

  

    return(
<div className="overflow-x-auto">
  <table className="table table-auto">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {friendRequests.map((friendRequest) => {
        if (friendRequest.request_info[4] === "Pending") {
          return (
            <div key={friendRequest.request_info[0]}>
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={friendRequest.profile_photo} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{friendRequest.first_name} {friendRequest.last_name}</div>
                      <div className="text-sm opacity-50">{friendRequest.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>
                    {friendRequest.request_info[3]}
                  </p>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs" onClick={(e) => acceptFriendRequestSubmit(e, friendRequest.request_info[1])}>Accept</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs" onClick={(e) => rejectFriendRequestSubmit(e, friendRequest.request_info[1])}>Reject</button>
                </th>
              </tr>
            </div>
          );
        }
      })}
    </tbody>
  </table>
</div>

    )
}

export default PendingRequests