import React from 'react'
import useToken from "@galvanize-inc/jwtdown-for-react";
import stepone from "./images/stepone.png";
import steptwo from "./images/steptwo.png";
import stepthree from "./images/stepthree.png";
import LoginForm from '../components/authorization/LoginForm'
import LoggedIn from '../components/authorization/LoggedIn'
import "./style/home.css"

function Home() {
  const { token } = useToken()
  return (
    <>

    <div className='home-body'>
      <div>
        <h2>Gathering Made Easy!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit lorem sed iaculis pellentesque. Nulla ipsum quam, faucibus mollis justo id, euismod finibus eros. Donec tempus metus at eros rutrum fringilla.<br/><br/>

          Aenean velit lectus, consectetur et pellentesque id, lacinia a lectus. Donec vel purus justo. Nunc venenatis, leo in posuere consequat, ex mauris mattis dolor, vitae viverra quam odio viverra sem. Proin vel nibh nec nisi porta auctor. Etiam iaculis aliquet odio eu accumsan.
        </p>
      </div>
      <div>
        {!token && <LoginForm />}
        {token && <LoggedIn />}

      </div>
    </div>

    <div className='gradient-bg'>
      <div className='step-text'>
        <h1>How Friend Forge Works!</h1>
        <p>
          Meet a new group of friends who are looking for someone just like you!
        </p>
      </div>

      <div className='home-steps'>
        <div className='how-step'>
          <img src={stepone}/>
          <p>
            Sign up for an account and let us know your interests!
          </p>
        </div>

        <div className='how-step'>
          <img src={steptwo}/>
          <p>
            Look for groups full of people just like you!
          </p>
          </div>

        <div className='how-step'>
          <img src={stepthree}/>
          <p>
            Make friends with your new group!
          </p>
          </div>
      </div>

    </div>

    </>
  )
}

export default Home
