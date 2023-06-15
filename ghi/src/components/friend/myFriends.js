import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../useProfile";

function MyFriends(){
    const [friends, setFriends] = useState([]);
    const { token } = useToken();
    const { profile } = useProfile(token);

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
            console.log(data)
            setFriends(data);
        }
    };

    useEffect(() => {
    if (profile && profile.id) {
        const id = profile.id;
        loadFriends(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [profile]);
    return(
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side"> 
                <ul className="menu p-4 w-80 h-full text-base-content">
                    <li className="text-xl">My Friends</li>
                    {friends.map((friend) => {
                        return(
                            <li>
                                <a href="/friendforge/friends">
                                    <div className="mask mask-squircle w-8 h-8">
                                        <img src={friend.profile_photo} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    <div>
                                        {friend.first_name} {friend.last_name}
                                    </div>
                                </a>
                            </li>
                        )
                    }

                    )}
                </ul>
            </div>
        </div>
    )
}

export default MyFriends;