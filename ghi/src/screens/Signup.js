import React from 'react'
import signupperson from "./images/signupperson.png";
import "./style/signup.css"

function Signup() {
  return (
    <>
      <div className='signup-body'>
        <div>
          <img src={signupperson}/>
        </div>

        <div>
          <h2 className='center-txt'>Join Friend Forge!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit lorem sed iaculis pellentesque. Nulla ipsum quam, faucibus mollis justo id, euismod finibus eros. Donec tempus metus at eros rutrum fringilla.</p>
        </div>
      </div>

      <div className='signup-form-body'>
        <form className="signup-form">


            <input className="input max-80per" type="text" placeholder="First Name"/>
            <input className="input max-80per" type="text" placeholder="Last Name"/>
            <input className="input max-80per" type="text" placeholder="User Name"/>
            <input className="input max-80per" type="text" placeholder="Phone Number"/>
            <input className="input max-80per" type="email" placeholder="Email"/>
            <input className="input max-80per" type="password" placeholder="Password"/>
            <input className="input max-80per" type="text" placeholder="Birthdate"/>


            <center><button className="signup-button">Join now!</button></center>
        </form>
      </div>
    </>
  )
}

export default Signup
