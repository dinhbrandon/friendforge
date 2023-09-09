// HeaderToken.js
import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/UserProvider";

function HeaderToken() {
    const { logout } = useToken();
    const { profile } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!profile) {
        return (
            <a 
            href="/friendforge/"
            onClick={handleLogout}>
                <label htmlFor="my-modal-4" className="btn btn-outline rounded-btn">
                    LOG OUT
                </label>
            </a>
        );
    }

    return (
        <>
            <div className="menu menu-horizontal px-1 text-base-content ">
                <a
                    href="/friendforge/"
                    className="btn btn-ghost rounded-btn"
                >
                    HOME
                </a>

                <a
                    href="/friendforge/"
                    className="btn btn-ghost rounded-btn"
                >
                    NOTIFICATIONS
                </a>

                <a
                    href="/friendforge/"
                    className="btn btn-ghost rounded-btn"
                >
                    MESSAGES
                </a>

            </div>
            <div className="dropdown dropdown-end">
                <label
                    tabIndex="0"
                    className="btn btn-ghost btn-circle avatar mx-2"
                >
                    <div className="w-10 rounded-full ">
                        <img src={profile.profile_photo} alt="profile" />
                    </div>
                </label>
                <ul
                    tabIndex="0"
                    className="mt-3 p-5 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52 text-base-content z-[1]"
                >
                    <li>Welcome, {profile.first_name} {profile.last_name}!</li>
                    <li>
                        <a href={`/friendforge/profile/${profile.username}`}>Profile</a>
                    </li>
                    <li>
                        <a href={`/friendforge/friends/`}>Friends</a>
                    </li>
                    <li>
                        <a href={`/friendforge/mygroups/`}>My groups</a>
                    </li>
                    <li>
                        <a href="/friendforge/">Settings - in dev.</a>
                    </li>
                    <li>
                        <a 
                        href="/friendforge/"
                        onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default HeaderToken;
