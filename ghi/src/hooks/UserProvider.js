import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const { token } = useAuthContext();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});

    console.log(token)
    console.log("user", user)
    console.log("profile", profile)

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
            credentials: "include",
            headers: {
                Authorization: `bearer ${token}`,
            },
        });
        const result = await response.json();
        setUser(result.account);
    };

    const getProfile = async (userId) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_HOST}/get_profile/${userId}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            }
        );
        if (res.ok) {
            const profileData = await res.json();
            setProfile(profileData);
        }
    };

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    useEffect(() => {
        if (user.id) {
            getProfile(user.id);
        }
    }, [user]);




    return (
        <UserContext.Provider value={{ user, profile }}>
            {children}
        </UserContext.Provider>
    );
}

// Create a hook that components can use to access the user data
export function useUserContext() {
    return useContext(UserContext);
}
