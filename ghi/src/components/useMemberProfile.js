import React, { useState, useEffect } from "react";

function useMemberProfile({ profileId, token }) {
    const [userProfile, setUserProfile] = useState([]);

    const getUserProfile = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/profile/${profileId}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
        }
    };

    useEffect(() => {
        if (profileId && token) {
            getUserProfile();
        }
    }, [token, profileId]);

    return { userProfile };
}

export default useMemberProfile;
