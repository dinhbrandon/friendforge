import React from 'react'

function HeaderGroups() {
  return (
      <div className="dropdown dropdown-end">
        <a tabIndex={0} className="btn btn-bg">My Groups</a>
        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
  )
}

export default HeaderGroups
