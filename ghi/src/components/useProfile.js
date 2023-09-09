import { useEffect, useState } from "react";
import useUser from "./useUser";

function useProfile(token) {
    const [profile, setProfile] = useState([]);
    const [id] = useState("");
    const { user } = useUser(token);

    const getProfile = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_HOST}/get_profile/${user.id}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            setProfile(data);
        }
    };

    // const getProfile = async () => {
    //     const res = await fetch(
    //         `${process.env.REACT_APP_API_HOST}/profile/${id}`,
    //         {
    //             credentials: "include",
    //             headers: {
    //                 Authorization: `bearer ${token}`,
    //             },
    //         }
    //     );
    //     if (res.ok) {
    //         const data = await res.json();
    //         setProfile(data);
    //     }
    // };

    const updateProfile = async () => {
        if (user.id) {
            await getProfile();
        }
        if (id) {
            await getProfile();
        }
    };

    useEffect(() => {
        updateProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id, token]);

    // useEffect(() => {
    //     if (user.id) {
    //         getID();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user.id, token]);

    useEffect(() => {
        if (id) {
            getProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, token]);

    return { profile, updateProfile };
}

export default useProfile;
