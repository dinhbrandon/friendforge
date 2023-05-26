import React from 'react'
import CreateProfileForm from '../components/authorization/CreateProfileForm'

function CreateProfile() {
  return (
    <>
    <div className="hero bg-base-100">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <h1 className="text-5xl font-bold">Create Your Profile!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>

      <CreateProfileForm />
    </>
  )
}

export default CreateProfile
