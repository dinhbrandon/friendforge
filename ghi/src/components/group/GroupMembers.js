import React, { useState, useEffect } from "react";

function GroupMembers({ token, groupId }) {
    const [members, setMembers] = useState([]);

    async function loadMembers() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/group/${groupId}/members`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setMembers(data);
        }
    }

    useEffect(() => {
        if (token) {
            loadMembers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    async function sendFriendRequest(e, receiver_id) {
      e.preventDefault();

      const url = `${process.env.REACT_APP_API_HOST}/friendship/${receiver_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Successfully sent request")
      } else{
          console.log("Could not accept friend request");
      }

    }

    return (
        <div className="bg-base-100 text-center p-100 w-1/5">
            <h1 className="text-2xl text-primary text-accent font-bold">
                Members
            </h1>
            {members.map((member) => (
                <div
                    className="flex flex-col justify-center items-center m-5"
                    key={member.id}
                >
                    <div className="avatar m-2 ">
                        <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                            <img src={member.profile_photo} alt="user" />
                        </div>
                    </div>

                    <div className="dropdown">
                        <label
                            tabIndex={1}
                            className="link link-hover font-bold m-1"
                        >
                            {member.first_name}
                        </label>
                        <div
                            tabIndex={0}
                            className="dropdown-content card card-compact w-64 p-2 shadow bg-neutral z-[1]"
                        >
                            <div className="card-body">
                                <h3 className="text-center text-lg font-bold text-secondary">
                                    {member.first_name}
                                </h3>
                                {member.about_me}
                                <a
                                    className="link link-accent" onClick={(e) => sendFriendRequest(e, member.id)}
                                    // href="/friendforge/"
                                >
                                    Add friend
                                </a>
                                <a
                                    className="link link-accent"
                                    href="/friendforge/"
                                >
                                    View Full Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GroupMembers;
