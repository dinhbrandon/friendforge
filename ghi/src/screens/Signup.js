import React from 'react'
import signupperson from "./images/signupperson.png";
import "./style/signup.css"

function Signup() {
  return (
    <>
      <div className='signup-body'>
        <div className='body-fix'>
          <div>
            <img src={signupperson}/>
          </div>

          <div>
            <h2 className='center-txt'>Join Friend Forge!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit lorem sed iaculis pellentesque. Nulla ipsum quam, faucibus mollis justo id, euismod finibus eros. Donec tempus metus at eros rutrum fringilla.</p>
          </div>
        </div>
      </div>

      <div className='signup-form-body'>
        <form className="signup-form">


            <input className="signup-input" type="text" placeholder="First Name"/>
            <input className="signup-input" type="text" placeholder="Last Name"/>
            <input className="signup-input" type="text" placeholder="User Name"/>
            <input className="signup-input" type="text" placeholder="Phone Number"/>
            <input className="signup-input" type="email" placeholder="Email"/>
            <input className="signup-input" type="password" placeholder="Password"/>
            <input className="signup-input" type="text" placeholder="Birthdate"/>


            <button className="signup-button">Join now!</button>
        </form>
      </div>
    </>
  )
}

export default Signup
