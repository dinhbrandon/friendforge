import React, { useState, useEffect } from 'react'
import people from "./people.png"
import useUser from '../useUser'
import useToken from "@galvanize-inc/jwtdown-for-react";


function GroupCard() {
  const { token } = useToken()
  const { user } = useUser(token)

  const [groups, setGroup] = useState([])


  async function loadGroups() {
    const response = await fetch('http://localhost:8000/groups')
    if (response.ok) {
      const data = await response.json()
      setGroup(data)
    }
  }

  //takes in two arguments: groupID followed by userAcctID
  async function addMember(group_id) {
    const response = await fetch('http://localhost:8000/group/member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ group_id }),
  });
    if (response.ok) {
      const data = await response.json()
      loadGroups();
    }
  }


  useEffect(() => {
    loadGroups();
  }, [])


  return (
    <>

    {groups.map((group) => (
      <div className="card card-5">
        <h3 className="title">{group.name}</h3>
        <h1 className="subheading">Group Focus: {group.focus} </h1>
        <h1 className="subheading">Members: {group.number_of_members}/5 </h1>
        <img src={people} alt="people" className="card-img"/>
        {/* <div className="card-text">Ut aliquip ex ea commodo consequat. Duis aute irure dolor</div> */}
        <a className="card-link" onClick={() => {

          console.log(group.id);
          addMember(group.id);
          }}>Join Group</a>
      </div>
      
    ))}

    </>
  )
}
//onChange={() => addMember(group.id, userId)}

export default GroupCard
