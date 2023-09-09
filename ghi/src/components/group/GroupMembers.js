import React, { useState, useEffect, useCallback } from "react";
import { useUserContext } from "../../hooks/UserProvider";
import GroupEditModal from "./GroupEditModal";

function GroupMembers({ token, groupId }) {
    const [members, setMembers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [groupFocus, setGroupFocus] = useState("");
    const [groupIcon, setGroupIcon] = useState("");
    const [groupLocation, setGroupLocation] = useState("");
    const [friendshipStatuses, setFriendshipStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const { profile } = useUserContext();

    const loadMembers = useCallback(async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/groups/id/${groupId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setMembers(data.members);
            setGroupName(data.name);
            setGroupFocus(data.focus);
            setGroupIcon(data.icon_photo)
            setGroupLocation(data.location)
        }
    }, [token, groupId]);

    useEffect(() => {
        if (token) {
            loadMembers();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [token, loadMembers]);


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
        console.log("Successfully sent request");
        setFriendshipStatuses(prevStatuses => ({ ...prevStatuses, [receiver_id]: "Pending Friendship" }));
        } else{
            console.log("Could not send friend request");
        }
    }

    async function getFriendshipStatus(receiver_id) {
        const url = `${process.env.REACT_APP_API_HOST}/friendship/check/${profile.id}/${receiver_id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
        //   console.log(profile.id,"is", data, "with", receiver_id)
          setFriendshipStatuses(prevStatuses => ({ ...prevStatuses, [receiver_id]: `${data.relationship_status}` }));
        } else {
          console.log("Failed to fetch friendship status");
          setFriendshipStatuses(prevStatuses => ({ ...prevStatuses, [receiver_id]: "Not Friends" }));
        }
    }

    useEffect(() => {
        async function updateFriendshipStatuses() {
            if (profile) { // eslint-disable-next-line react-hooks/exhaustive-deps
                await Promise.all(members.map(member => getFriendshipStatus(member.id)));
                setLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        updateFriendshipStatuses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [members, profile]);


    if (loading) {
        return <div>Loading...</div>;
    }
    
return (
    <div className="bg-base-100 text-center p-100 w-1/5 relative">
        <div className="flex justify-center">
            <h1 className="text-2xl text-primary text-accent font-bold">
                {groupName ? groupName : `${groupFocus} #00${groupId}`}
            </h1>
            <button onClick={() => window.my_modal_3.showModal()} className=" h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <dialog id="my_modal_3" className="modal-box bg-base">
                <button 
                className="btn btn-sm btn-circle btn-white absolute right-2 top-2"
                onClick={() => window.my_modal_3.close()}
                >
                    x
                </button>
                <GroupEditModal token={token} groupId={groupId} groupName={groupName} groupIcon={groupIcon} refreshGroup={loadMembers} />
            </dialog>
        </div>
        <h2 className="text-md opacity-50">{groupFocus}</h2>
        <h2 className="text-md opacity-50">{groupLocation}</h2>
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
                            <div className="text-sm opacity-50">{member.location}</div>
                            {member.about_me}
                            <a
                                className="link link-accent"
                                href={`/friendforge/profile/${member.username}`}
                            >
                                View Full Profile
                            </a>
                            {friendshipStatuses[member.id] === "Not Friends" && member.id !== profile.id &&
                              <a
                                  className="link link-accent" onClick={(e) => sendFriendRequest(e, member.id)}
                                  href="/friendforge/"
                              >
                                  Add friend
                              </a>
                            }
                            {friendshipStatuses[member.id] === "Pending Friendship" &&
                              <span className="">Friendship Status: Pending</span>
                            }
                            {friendshipStatuses[member.id] === "Friends" &&
                              <span className="">Friendship Status: Friends</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

}

export default GroupMembers;
