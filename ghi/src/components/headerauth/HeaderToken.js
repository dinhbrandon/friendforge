import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import HeaderGroups from "./HeaderGroups";
import { useNavigate } from "react-router-dom";
import useUser from "../useUser";
import useProfile from "../useProfile";

function HeaderToken() {
  const { token, logout } = useToken();
  const { user } = useUser(token);
  const { profile } = useProfile(token);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // console.log(profile);

  console.log(profile);

  return (
    <>
      <div className="menu menu-horizontal px-1 text-base-content ">
        <a href="/" className="btn btn-ghost rounded-btn">
          HOME
        </a>

        <a href="/forge" className="btn btn-ghost rounded-btn">
          FORGE
        </a>
      </div>
      <HeaderGroups />
      <div className="dropdown dropdown-end">
        <label tabIndex="0" className="btn btn-ghost btn-circle avatar mx-2">
          <div className="w-10 rounded-full ">
            <img src={profile.profile_photo} />
          </div>
        </label>
        <ul
          tabIndex="0"
          className="mt-3 p-5 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52 text-base-content z-[1]"
        >
          <li>Welcome {user.username}!</li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="">Settings</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeaderToken;
