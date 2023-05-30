import React from 'react'
import useToken from "@galvanize-inc/jwtdown-for-react";
import HeaderGroups from './HeaderGroups'
import { useNavigate } from "react-router-dom";
import useUser from '../useUser'

function HeaderToken() {
  const { token, logout } = useToken()
  const { user } = useUser(token)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <ul className="menu menu-horizontal px-1 text-base-content">
        <li><a href='/'>Home</a></li>
        <li><a href='/forge'>Forge</a></li>
      </ul>
      <HeaderGroups />
      <div className="dropdown dropdown-end">
        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="" />
          </div>
        </label>
        <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52 text-base-content">
          <li>Welcome {user.username}</li>
          <li><a href=''>Profile</a></li>
          <li><a href=''>Settings</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </>
  )
}

export default HeaderToken
