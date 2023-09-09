import React, { useContext, createContext } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext();

export function UserProvider({ children }) {
    const { token } = useAuthContext();

    const { data: user, error: userError} = useQuery(["user", token], async () => {
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
            credentials: "include",
            headers: {
                Authorization: `bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        const result = await res.json();
        return result.account;
    }, {
        enabled: !!token,
        // TODO: Remove me before Query 5
        // This is temporary to find errors
        onError: console.error
    });

    const { data: profile, error: profileError} = useQuery(["profile", user?.id, token], async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_HOST}/get_profile/${user.id}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch profile");
        }
        const profileData = await res.json();
        return profileData;
    }, {
        enabled: !!user?.id && !!token,
        onError: console.error
    });

    console.log(token)
    console.log("user", user)
    console.log("profile", profile)

    if (userError || profileError) {
        return <div>
            Failed to load user
            {userError && <><h1>userError</h1><pre>{JSON.stringify(userError, null, 2)}</pre></>}
            {profileError && <><h1>profileError</h1><pre>{JSON.stringify(profileError, null, 2)}</pre></>}
        </div>;
    }

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
