import React from 'react'
import signupperson from "./images/signupperson.png";
import SignupForm from '../components/authorization/SignupForm';



function Signup() {
  return (
    <>
    <div className="hero bg-base-100">
      <div className="hero-content flex-col lg:flex-row">
        <img src={signupperson} className="max-w-sm" />
        <div>
          <h1 className="text-5xl font-bold">Join Friend Forge!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
      </div>
    </div>
      <SignupForm />
    </>
  )
}

export default Signup
