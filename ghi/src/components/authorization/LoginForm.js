import React, { useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import "../style/loginform.css"

// this will log in a user and set the token in local storage
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useToken()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    e.target.reset()
    console.log(e)
  }



  return (
    <>
          <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
            <p>
              Log In
            </p>
              <input name='email' type="text" className='small-input' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" className='small-input' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              <button className='button-1' type='submit' value='login'>Log In</button>

              <p>Dont have an account? <a href='/signup'>Join now!</a> </p>
          </form>
    </>
  )
}

export default LoginForm
