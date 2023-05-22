import React from 'react'
import "./style/loginform.css"


function LoginForm() {
  return (
    <>
          <form className="login-form">
            <p>
              Log In
            </p>
              <input type="text" className='field' placeholder="Email"/>
              <input type="password" className='field' placeholder="Password"/>
              <button className='button1'>Submit</button>

              <p>Dont have an account? <a href='/signup'>Join now!</a> </p>
          </form>
    </>
  )
}

export default LoginForm
