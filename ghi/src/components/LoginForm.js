import React from 'react'
import "./style/loginform.css"


function LoginForm() {
  return (
    <>
          <form className="login-form">
            <p>
              Log In
            </p>
              <input type="text" className='small-input' placeholder="Email"/>
              <input type="password" className='small-input' placeholder="Password"/>
              <button className='button-1'>Submit</button>

              <p>Dont have an account? <a href='/signup'>Join now!</a> </p>
          </form>
    </>
  )
}

export default LoginForm
