import React from 'react'
import people from "./people.png"


function GroupCard() {
  return (
    <>
      <div className="card card-5">
        <h3 className="title">Group Name</h3>
        <img src={people} alt="people" className="card-img"/>
        {/* <div className="card-text">Ut aliquip ex ea commodo consequat. Duis aute irure dolor</div> */}
        <a className="card-link" href="#">Join Group</a>
      </div>

    </>
  )
}

export default GroupCard
