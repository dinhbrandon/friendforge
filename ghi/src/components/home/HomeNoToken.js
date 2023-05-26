import React from 'react'
import HomeStats from './HomeStats'
import Steps from './Steps'
import stepone from "./stepone.png";
import steptwo from "./steptwo.png";
import stepthree from "./stepthree.png";
import people1 from "./people1.png";
import chat from "./chat.png";

function HomeNoToken() {
  return (
<>
      <div className="hero bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={people1} className="max-w-sm" />
          <div>
            <h1 className="text-5xl font-bold">Gathering Made Easy!</h1>
            <p className="py-10">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
        </div>
      </div>

      <div className="hero gradient-bg">
        <div className="hero-overlay bg-opacity-10"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold pt-20">Get matched with people just like you!</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <HomeStats />
          </div>
        </div>
      </div>

      <div className="hero bg-base-200">
        <Steps />
      </div>
    </>
  )
}

export default HomeNoToken
