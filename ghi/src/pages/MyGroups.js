import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../components/useProfile";
import people from "./images/people.png";
import ConfirmLeave from "../components/mygroups/confirmLeave";

function MyGroups() {
    const [groups, setGroups] = useState([]);
    const [groupToLeave, setGroupToLeave] = useState(null);
    const { token } = useToken();
    const { profile } = useProfile(token);

    const loadGroups = async (id) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/profile/${id}/groups`,
            {
                credentials: "include",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setGroups(data);
        }
    };

    useEffect(() => {
        if (profile && profile.id) {
            const id = profile.id;
            loadGroups(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    const handleLeaveGroup = (group) => {
        setGroupToLeave(group);
    };

    const handleLeaveConfirmed = (groupId) => {
        setGroups(groups.filter(group => group.id !== groupId));
        setGroupToLeave(null);
    };

    const handleLeaveCanceled = () => {
        setGroupToLeave(null);
    };

    return (
        <div className="flex w-auto">
            <div className="carousel bg-base w-full">
                {groups.map((group) => (
                    <div key={group.id} className="hover:scale-105 transition-transform duration-200 carousel-item mr-6 mb-4 mt-4">
                        <a href={`/friendforge/group/${group.id}`}>
                            <div className="card flex flex-col justify-center items-center w-100 h-100">
                                <h2 className="text-xl font-medium title-font text-secondary">
                                    {group.name ? group.name : `${group.focus} #00${group.id}`}
                                </h2>
                                <figure>
                                    <img
                                    alt={group.name || "My Group"}
                                    src={group.icon_photo || people}
                                    className="w-40 h-40 object-cover mask mask-hexagon"
                                    />
                                </figure>
                                <div className="avatar-group -space-x-6 mt-2">
                                    {group.members.map((member, index) => (
                                        <div key={index} className="avatar">
                                            <div className="w-12">
                                                <img src={member.profile_photo} alt={`Member ${member.first_name} ${member.last_name}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </a>
                        <button className="badge badge-sm" onClick={() => handleLeaveGroup(group)}>
                            X
                        </button>
                    </div>
                ))}
                {groupToLeave && <ConfirmLeave group={groupToLeave} onCancel={handleLeaveCanceled} onConfirm={handleLeaveConfirmed} />}
            </div>
        </div>
    );
}

export default MyGroups;
