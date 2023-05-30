import React, { useState, useEffect } from 'react'
import people from "./people.png"


function GroupCard() {

  const [groups, setGroup] = useState([])

  // load the list of focuses
  async function loadGroups() {
    const response = await fetch('http://localhost:8000/groups')
    if (response.ok) {
      const data = await response.json()
      setGroup(data)
    }
  }
  

  useEffect(() => {
    loadGroups()
  }, [])


  return (
    <>

    {groups.map((group) => (
      <div className="card card-5">
        <h3 className="title">{group.name}</h3>
        <h1 className="subheading">Group Focus: </h1>
        <h1 className="subheading">Members: </h1>
        <img src={people} alt="people" className="card-img"/>
        {/* <div className="card-text">Ut aliquip ex ea commodo consequat. Duis aute irure dolor</div> */}
        <a className="card-link" href="#">Join Group</a>
      </div>
    ))}
    

    </>
  )
}

export default GroupCard
