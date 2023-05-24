import React, { useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from "react-router-dom";
import signupperson from "./signupperson.png";

function SignupForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ date_of_birth, setDOB ] = useState('')
  const [ first_name, setFirstName ] = useState('')
  const [ last_name, setLastName ] = useState('')
  const [ phone_number, setPhoneNumber ] = useState('')
  const { register } = useToken()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const accountData = {
      email: email,
      username: username,
      password: password,
      date_of_birth: date_of_birth,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number
    }
    register(accountData, 'http://localhost:8000/users')
    e.target.reset()
    navigate('/signup/profile')
    }


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
        <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>


            <input className="signup-input" type="text" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}} />
            <input className="signup-input" type="text" placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}} />
            <input className="signup-input" type="text" placeholder="User Name" onChange={(e) => {setUsername(e.target.value)}} />
            <input className="signup-input" type="tel" placeholder="Phone Number" onChange={(e) => {setPhoneNumber(e.target.value)}} />
            <input className="signup-input" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
            <input className="signup-input" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
            <input className="signup-input" type="date" placeholder="Birthdate" onChange={(e) => {setPhoneNumber(e.target.value)}} />


            <button className="signup-button" type='submit' value='register'>Join now!</button>
        </form>
      </div>
    </>
  )
}

export default SignupForm
