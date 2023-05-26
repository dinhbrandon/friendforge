import React, { useState, useEffect } from 'react'
import CreateInterest from './createpages/CreateInterest'
import "./adminpages.css"

function AdminInterests() {
  const [interest, setInterest] = useState([])

  const loadInterests = async () => {
    const response = await fetch('http://localhost:8000/api/interests')
    if (response.ok) {
      const data = await response.json()
      setInterest(data)
    }
  }
  useEffect(() => {
    loadInterests()
  }, [])

  return (
    <>
      <div className='admin-top'>
        <h2>Interests</h2>
        <a href='/admin'>Back to admin pannel</a>
      </div>

      <div className='admin-body'>
        <div className='admin-list'>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Interest ID</th>
              <th scope="col">Interest Name</th>
            </tr>
          </thead>
          <tbody>

            {interest.map((type) => (
              <tr key={type.id}>
                <th>{type.id}</th>
                <td>{type.name}</td>
              </tr>
            ))}


          </tbody>
        </table>

        </div>

        <div className='admin-create'>
          <CreateInterest />
        </div>
      </div>
    </>
  )
}

export default AdminInterests
