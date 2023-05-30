import React, { useState, useEffect }  from 'react'
import "./adminpages.css"

function AdminGroups() {
  const [group, setGroup] = useState([])

  async function loadGroup() {
    const response = await fetch('http://localhost:8000/groups')
    if (response.ok) {
      const data = await response.json()
      setGroup(data)
    }
  }

  useEffect(() => {
    loadGroup()
  }, [])


  return (
    <>
      <div className='admin-top'>
        <h2>Groups</h2>
        <a href='/admin'>Back to admin pannel</a>
      </div>

      <div className='admin-body'>
        <div className='admin-list'>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Group ID</th>
              <th scope="col">Group Name</th>
            </tr>
          </thead>
          <tbody>

            {group.map((groups) => (
              <tr key={groups.id}>
                <th>{groups.id}</th>
                <td>{groups.name}</td>
              </tr>
            ))}


          </tbody>
        </table>

        </div>

      </div>
    </>
  )
}

export default AdminGroups
