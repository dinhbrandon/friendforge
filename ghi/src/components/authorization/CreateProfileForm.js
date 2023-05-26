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
    <div className="hero gradient-bg " >
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content w-3/4">
        <div className='w-full'>

          <form>

            <div>
              <h1 className='text-4xl my-5' >Interests</h1>
            </div>

            <div className='grid grid-cols-4 gap-5px grid-flow-row justify-center'>
              {interest.map((type) => (
              <div className='flex justify-center'>
                <label className="justify-center label"  key={type.id}>
                  <span className="label-text mx-5">{type.name}</span>
                  <input type="checkbox" class="checkbox checkbox-secondary" />
                </label>
              </div>
              ))}

            </div>
            <div className="divider"></div>

            <div className="form-control">
              <label className="label">
                <span className="label-text mt-10">Your bio</span>
              </label>
              <textarea className="textarea textarea-bordered textarea-primary textarea-lg" id="about" name="about" required minLength="100" maxLength="5000" placeholder='About me...' ></textarea>
            </div>

            <div className='form-control'>
              <label className="label">
                <span className="label-text mt-10">Profile Photo URL</span>
              </label>
              <input className="input input-bordered input-primary w-full" type="text" placeholder="URL"/>
            </div>

            <div>
              <button className='btn btn-primary my-10'>To the Forge!</button>
            </div>

          </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default CreateProfileForm
