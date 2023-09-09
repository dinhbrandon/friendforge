import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useUserContext } from "../../hooks/UserProvider";


function MyFriends(){
    const [friends, setFriends] = useState([]);
    const { token } = useAuthContext();
    const { profile } = useUserContext();

    const loadFriends = async (id) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/friendship/${id}`,
        {
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
        }
    );
        if (response.ok) {
            const data = await response.json();
            setFriends(data);
        }
    };

    useEffect(() => {
    if (profile) {
        loadFriends(profile.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [profile]);

    return(
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side"> 
                <ul className="menu p-4 w-50 h-full text-base-content">
                    <li className="text-xl">My Friends</li>
                    {friends.map((friend) => {
                        return(
                            <li key={friend.id}>
                                <a href={`/friendforge/profile/${friend.username}`}>
                                    <div className="mask mask-squircle w-8 h-8">
                                        <img src={friend.profile_photo} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    <div>
                                        {friend.first_name} {friend.last_name}
                                    </div>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MyFriends;
