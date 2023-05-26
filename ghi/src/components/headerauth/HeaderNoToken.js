import React from 'react'
import LoginForm from '../authorization/LoginForm'

function HeaderNoToken() {
  return (
    <>
    <ul className="menu menu-horizontal px-1">
      <li><label><a href="/signup">Sign Up</a></label></li>
      <li>
        <label htmlFor="my-modal-4">Log In</label>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <LoginForm />
          </label>
        </label>
      </li>
    </ul>


    </>
  )
}

export default HeaderNoToken
