// HeaderToken.js
import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
// import HeaderGroups from "./HeaderGroups";
import { useNavigate } from "react-router-dom";
import UserProfileValidator from "../userProfileValidator";
import useProfile from "../useProfile";

function HeaderToken() {
    const { token, logout } = useToken();
    const { profile } = useProfile(token);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <UserProfileValidator token={token}>
            {(hasProfile) => {
                if (hasProfile) {
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
                                    href="/friendforge/forge"
                                    className="btn btn-ghost rounded-btn"
                                >
                                    FORGE
                                </a>

                                <a
                                    href="/friendforge/friends"
                                    className="btn btn-ghost rounded-btn"
                                >
                                    FRIENDS
                                </a>
                            </div>
                            {/* <HeaderGroups /> */}
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
                                        <a href="/friendforge/">Settings</a>
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
                } else {
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
            }}
        </UserProfileValidator>
    );
}

export default HeaderToken;
