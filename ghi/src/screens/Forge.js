import React from 'react'
import GroupCard from '../components/forge/groupcard'
import './style/forge.css'

function Forge() {
  return (
    <>
    <div className='top-body'>
      <h2>Forge!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis interdum ex. Fusce rhoncus blandit porta.
      </p>
    </div>
    <div className='card-diplay'>
      <GroupCard />
    </div>

    </>
  )
}

export default Forge
