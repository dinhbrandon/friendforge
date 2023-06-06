import React from 'react'
import GroupCard from '../components/forge/groupcard'
import './style/forge.css'
import people from "../components/forge/people.png";
import ForgeGroup from '../components/forge/enterforge';

function Forge() {
  return (
    <>
    <div class="h-screen flex items-center justify-center">
      <div className="card w-96 glass">
        <figure><img src={people}/></figure>
          <div className="card-body">
            <h2 className="card-title">Welcome to the forge</h2>
              <p>Select a group focus</p>
                <ForgeGroup />
          </div>
      </div>
    </div>

    </>
  )
}

export default Forge
