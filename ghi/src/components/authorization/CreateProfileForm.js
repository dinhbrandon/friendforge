import React, { useState, useEffect } from 'react'

function CreateProfileForm() {
  const [interest, setInterest] = useState([])

  // load the list of focuses
  async function loadInterest() {
    const response = await fetch('http://localhost:8000/api/interests')
    if (response.ok) {
      const data = await response.json()
      setInterest(data)
    }
  }

  useEffect(() => {
    loadInterest()
  }, [])



  return (
    <>
      <form className='profile-form'>
        <div>
          gdfgdfgdfgdfgdf
        </div>
        <div className='block interest-list'>
          {interest.map((type) => (
            <label className="material-checkbox" key={type.id}>
              <input type="checkbox" />
              <span className="checkmark"></span>
              {type.name}
            </label>
          ))}

        </div>

        <div className='divider'></div>

        <div className='block'>

          <label htmlFor="about" className='display-block'>About Me:</label>
          <textarea id="about" name="about" required minLength="100" maxLength="5000" className='profile-input' placeholder='About me...' />

        </div>

        <div className='block'>
          <label htmlFor="photo" className='display-block'>Profile Photo</label>
          <input className="photo" type="text" placeholder="URL"/>
        </div>
        <div>
          <button className='button-style'>To the Forge!</button>
        </div>
      </form>
    </>
  )
}

export default CreateProfileForm
