import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import useProfile from "../useProfile";


const UserPage = () => {
    const { token } = useToken();
    const { user } = useUser(token);
    const { profile } = useProfile(token);


async function loadProfileInterests() {
    const response = await fetch(
        `/profile/${process.env.REACT_APP_API_HOST}/interests`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.ok) {
        const data = await response.json();
        console.log(profile);
    }
}

useEffect(() => {
    if (token) {
        loadProfileInterests();
    }
}, [token]);

return (
        <>
        <div className="top-body">
            <h1>{profile.username}</h1>
        </div>
        <div className="img-prof">
            <img src={profile.profile_photo} />
        </div>
        <div className="mid-body">
            <h1>{profile.about_me}</h1>
        </div>
        <div className="bottom-body">
        <h2>Interests:</h2>
        <div className="interests-container">

            </ul>
        </div>
    </div>
        </>
    );
}
export default UserPage
