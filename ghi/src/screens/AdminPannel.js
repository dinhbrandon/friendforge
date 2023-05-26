import React from 'react'
import "./style/adminpannel.css"

function AdminPannel() {
  return (
    <div className='admin-pannel'>
      <h1 className='center-txt extra-p60'>Admin Pannel</h1>
      <a href='/admin/groups'>Groups</a><br/>
      <a href='/admin/focus'>Focuses</a><br/>
      <a href='/admin/interests'>Interests</a><br/>
      <a href='/admin/icons'>Group Icons</a><br/>
      <a href='/admin/names'>Group Names</a><br/>
      <a href='/admin/users'>Users</a><br/>
    </div>
  )
}

export default AdminPannel
